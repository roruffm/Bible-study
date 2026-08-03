import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { JOURNEYS, findJourney } from '../content/journeys';
import { findLexiconEntry, places } from '../content/lexicon';
import { useAsync } from '../hooks/useStore';
import { layoutLabels } from '../lib/mapLabels';
import { loadRegions, type MapRegions } from '../lib/mapData';

/**
 * Kartenmodul. Die Küstenlinien stammen aus Natural Earth (gemeinfrei) und
 * liegen bereits auf den Ausschnitt der biblischen Welt zugeschnitten vor
 * (siehe scripts/build-map-data.mjs). Gezeichnet wird als SVG – das bleibt
 * scharf, klein und kommt ohne Kartendienst aus.
 */

const WIDTH = 1000;

export default function MapPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, loading, error } = useAsync<MapRegions>(() => loadRegions(), []);

  const journeyId = searchParams.get('reise');
  const placeId = searchParams.get('ort');
  const journey = journeyId ? findJourney(journeyId) : undefined;
  const focusPlace = placeId ? findLexiconEntry(placeId) : undefined;
  const [hover, setHover] = useState<string | null>(null);

  const box = data?.box;
  const height = box ? Math.round((WIDTH * (box.north - box.south)) / (box.east - box.west)) : 600;

  /** Geografische Koordinaten in Bildpunkte umrechnen. */
  const project = useMemo(() => {
    if (!box) return null;
    return ([lon, lat]: [number, number]): [number, number] => [
      ((lon - box.west) / (box.east - box.west)) * WIDTH,
      ((box.north - lat) / (box.north - box.south)) * height,
    ];
  }, [box, height]);

  const toPath = (rings: [number, number][][]) =>
    project
      ? rings
          .map(
            (ring) =>
              'M' +
              ring
                .map((point) => project(point).map((n) => n.toFixed(1)).join(','))
                .join('L') +
              'Z',
          )
          .join('')
      : '';

  const shownPlaces = journey ? [] : places();

  /**
   * Bei einer Reise auf deren Gebiet zoomen – sonst verliert sich die Route
   * in leerer Fläche. Der Zoom geschieht über das viewBox; damit Schrift und
   * Punkte dabei nicht mitwachsen, werden ihre Größen mit `unit` gerechnet.
   */
  const view = useMemo(() => {
    if (!project || !journey) return { x: 0, y: 0, w: WIDTH, h: height };

    const points = journey.stops.map((stop) => project(stop.coords));
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    const padX = (Math.max(...xs) - Math.min(...xs)) * 0.12 + 60;
    const padY = (Math.max(...ys) - Math.min(...ys)) * 0.12 + 40;

    return {
      x: Math.min(...xs) - padX,
      y: Math.min(...ys) - padY,
      w: Math.max(...xs) - Math.min(...xs) + padX * 2,
      h: Math.max(...ys) - Math.min(...ys) + padY * 2,
    };
  }, [project, journey, height]);

  const unit = view.w / WIDTH;

  /** Mehrfach angefahrene Orte zu einer Beschriftung zusammenfassen. */
  const journeyPoints = useMemo(() => {
    if (!project || !journey) return [];
    const byPlace = new Map<string, { x: number; y: number; numbers: number[]; name: string }>();

    journey.stops.forEach((stop, i) => {
      const key = stop.coords.join(',');
      const existing = byPlace.get(key);
      if (existing) existing.numbers.push(i + 1);
      else {
        const [x, y] = project(stop.coords);
        byPlace.set(key, { x, y, numbers: [i + 1], name: stop.name });
      }
    });

    return [...byPlace.values()];
  }, [project, journey]);

  const journeyLabels = useMemo(
    () =>
      layoutLabels(
        journeyPoints.map((p) => ({ x: p.x, y: p.y, text: `${p.numbers.join('., ')}. ${p.name}` })),
        unit,
      ),
    [journeyPoints, unit],
  );

  const placeLabels = useMemo(
    () =>
      project
        ? layoutLabels(
            shownPlaces.map((place) => {
              const [x, y] = project(place.coords!);
              return { x, y, text: place.term };
            }),
            unit,
          )
        : [],
    // shownPlaces ist bei jeder Auswertung neu, hängt aber nur an `journey`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [project, journey, unit],
  );

  function setParam(key: string, value: string | null) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    // Reise und Ort schließen einander aus.
    next.delete(key === 'reise' ? 'ort' : 'reise');
    setSearchParams(next, { replace: true });
  }

  return (
    <div>
      <Link className="btn btn--ghost btn--sm" to="/studium" style={{ marginBottom: '1rem' }}>
        ← Studium
      </Link>

      <h1 className="page-title">Karte</h1>
      <p className="page-lead">
        Die Welt der Bibel von Rom bis Mesopotamien. Wähle eine Reise oder tippe einen Ort an, um
        ihn nachzuschlagen.
      </p>

      <div className="search__filters">
        <button
          type="button"
          className={`chip${!journey ? ' chip--active' : ''}`}
          onClick={() => setParam('reise', null)}
        >
          Orte der Bibel
        </button>
        {JOURNEYS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`chip${journey?.id === item.id ? ' chip--active' : ''}`}
            onClick={() => setParam('reise', item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>

      {error && <div className="notice">Die Kartendaten konnten nicht geladen werden.</div>}
      {loading && (
        <div className="empty">
          <span className="spinner" /> Karte wird geladen …
        </div>
      )}

      {data && project && box && (
        <>
          <div className="map">
            <svg
              viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
              className="map__svg"
              role="img"
              aria-label={
                journey ? `Karte: ${journey.title}` : 'Karte der biblischen Welt mit Orten'
              }
            >
              <rect
                x={view.x}
                y={view.y}
                width={view.w}
                height={view.h}
                className="map__sea"
              />
              <path d={toPath(data.land)} className="map__land" style={{ strokeWidth: unit }} />
              <path d={toPath(data.seen)} className="map__sea-inner" />

              {journey && (
                <>
                  <path
                    d={
                      'M' +
                      journey.stops
                        .map((stop) => project(stop.coords).map((n) => n.toFixed(1)).join(','))
                        .join('L')
                    }
                    className="map__route"
                    style={{
                      stroke: journey.color,
                      strokeWidth: 2.5 * unit,
                      strokeDasharray: `${7 * unit} ${5 * unit}`,
                    }}
                  />
                  {journeyPoints.map((point, i) => {
                    const label = journeyLabels[i];
                    return (
                      <g key={`${point.name}-${i}`} className="map__stop">
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r={6 * unit}
                          style={{ fill: journey.color, strokeWidth: 1.5 * unit }}
                        />
                        <text
                          x={label.labelX}
                          y={label.labelY}
                          textAnchor={label.anchor}
                          className="map__label"
                          style={{ fontSize: 11 * unit, strokeWidth: 3 * unit }}
                        >
                          {label.text}
                        </text>
                      </g>
                    );
                  })}
                </>
              )}

              {shownPlaces.map((place, i) => {
                const label = placeLabels[i];
                if (!label) return null;
                const active = focusPlace?.id === place.id || hover === place.id;
                return (
                  <g
                    key={place.id}
                    className={`map__place${active ? ' map__place--active' : ''}`}
                    onClick={() => setParam('ort', place.id)}
                    onMouseEnter={() => setHover(place.id)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <circle
                      cx={label.x}
                      cy={label.y}
                      r={(active ? 8 : 5) * unit}
                      style={{ strokeWidth: 1.5 * unit }}
                    />
                    <text
                      x={label.labelX}
                      y={label.labelY}
                      textAnchor={label.anchor}
                      className="map__label"
                      style={{ fontSize: 11 * unit, strokeWidth: 3 * unit }}
                    >
                      {place.term}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <p className="settings-row__hint" style={{ marginTop: '0.6rem' }}>
            Küstenlinien: Natural Earth (gemeinfrei), auf den Ausschnitt zugeschnitten und
            vereinfacht. Antike Ortslagen sind teils nur ungefähr bestimmbar.
          </p>
        </>
      )}

      {journey && (
        <section style={{ marginTop: '1.75rem' }}>
          <div className="library__head">
            <h3>{journey.title}</h3>
            <span className="library__count">{journey.period}</span>
          </div>
          <p className="page-lead">{journey.summary}</p>
          <Link className="btn btn--sm" to={`/bibel/${journey.ref.book}/${journey.ref.chapter}`}>
            Im Bibeltext nachlesen
          </Link>

          <div className="card" style={{ marginTop: '1rem' }}>
            {journey.stops.map((stop, i) => (
              <div className="day" key={`${stop.name}-${i}`}>
                <span
                  className="day__check day__check--done"
                  style={{ background: journey.color, borderColor: journey.color }}
                >
                  {i + 1}
                </span>
                <div className="day__body">
                  <div className="day__title">{stop.name}</div>
                  {stop.note && <p className="day__note">{stop.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {focusPlace && (
        <section className="card" style={{ marginTop: '1.5rem', padding: '1.1rem' }}>
          <div className="lex-entry__head">
            <h3 className="lex-entry__term">{focusPlace.term}</h3>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => setParam('ort', null)}
            >
              Schließen
            </button>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>{focusPlace.short}</p>
          {focusPlace.today && (
            <p className="settings-row__hint">
              <strong>Heute: </strong>
              {focusPlace.today}
            </p>
          )}
          <div className="day__portions">
            {(focusPlace.refs ?? []).map((ref) => (
              <Link
                key={`${ref.book}${ref.chapter}${ref.verse}`}
                className="chip"
                to={`/bibel/${ref.book}/${ref.chapter}?vers=${ref.verse}`}
              >
                Nachlesen
              </Link>
            ))}
            <Link className="chip" to={`/lexikon?eintrag=${focusPlace.id}`}>
              Im Lexikon
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
