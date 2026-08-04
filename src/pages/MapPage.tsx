import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { JOURNEYS, findJourney, type Journey } from '../content/journeys';
import { findLexiconEntry } from '../content/lexicon';
import {
  MAP_VIEWS,
  PLACES,
  PLACE_KIND_LABEL,
  PLACE_KIND_PLURAL,
  findPlace,
  type MapPlace,
  type PlaceKind,
} from '../content/places';
import { useAsync, useBibleIndex } from '../hooks/useStore';
import { layoutLabels, type PlacedLabel } from '../lib/mapLabels';
import { loadRegions, type MapRegions } from '../lib/mapData';
import { normalize } from '../lib/reference';

/**
 * Kartenmodul. Die Küstenlinien stammen aus Natural Earth (gemeinfrei) und
 * liegen bereits auf den Ausschnitt der biblischen Welt zugeschnitten vor
 * (siehe scripts/build-map-data.mjs). Gezeichnet wird als SVG – das bleibt
 * scharf, klein und kommt ohne Kartendienst aus.
 *
 * Drei Zustände stehen in der Adresse und sind damit teilbar: der gewählte
 * Ausschnitt (`ausschnitt`), eine Route (`reise`) und ein einzelner Ort
 * (`ort`), dazu die Art der angezeigten Orte (`art`).
 */

const WIDTH = 1000;

/**
 * Seitenverhältnis der Darstellung. Ohne diese Vorgabe wäre der Ausschnitt
 * „Israel“ dreimal so hoch wie breit und auf dem Bildschirm ein schmaler
 * Streifen von 1700 Pixeln Höhe. Zu schmale Ausschnitte werden deshalb zur
 * Seite hin, zu flache nach oben und unten aufgefüllt.
 */
const ASPECT = 1000 / 620;

interface View {
  x: number;
  y: number;
  w: number;
  h: number;
}

function fitAspect(view: View): View {
  if (view.w / view.h < ASPECT) {
    const w = view.h * ASPECT;
    return { ...view, x: view.x - (w - view.w) / 2, w };
  }
  const h = view.w / ASPECT;
  return { ...view, y: view.y - (h - view.h) / 2, h };
}

const KINDS: PlaceKind[] = ['stadt', 'region', 'berg', 'gewaesser', 'insel'];

/** Wie nah eine Station an einem Ort liegen muss, um als derselbe zu gelten. */
const SAME_PLACE = 0.08;

function journeysThrough(place: MapPlace): Journey[] {
  return JOURNEYS.filter((journey) =>
    journey.stops.some(
      (stop) =>
        Math.abs(stop.coords[0] - place.coords[0]) < SAME_PLACE &&
        Math.abs(stop.coords[1] - place.coords[1]) < SAME_PLACE,
    ),
  );
}

export default function MapPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, loading, error } = useAsync<MapRegions>(() => loadRegions(), []);
  const { data: index } = useBibleIndex();

  const journeyId = searchParams.get('reise');
  const placeId = searchParams.get('ort');
  const viewId = searchParams.get('ausschnitt') ?? 'welt';
  const kindFilter = searchParams.get('art') as PlaceKind | null;

  const journey = journeyId ? findJourney(journeyId) : undefined;
  const focusPlace = placeId ? findPlace(placeId) : undefined;
  const [hover, setHover] = useState<string | null>(null);
  const [query, setQuery] = useState('');

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
              ring.map((point) => project(point).map((n) => n.toFixed(1)).join(',')).join('L') +
              'Z',
          )
          .join('')
      : '';

  /**
   * Der Bildausschnitt. Eine gewählte Route bestimmt ihn selbst – sonst
   * verliert sie sich in leerer Fläche. Ein einzeln gewählter Ort rückt in
   * die Mitte. Sonst gilt der eingestellte Ausschnitt.
   */
  const view = useMemo(() => {
    if (!project || !box) return { x: 0, y: 0, w: WIDTH, h: height };

    if (journey) {
      const points = journey.stops.map((stop) => project(stop.coords));
      const xs = points.map((p) => p[0]);
      const ys = points.map((p) => p[1]);
      const padX = (Math.max(...xs) - Math.min(...xs)) * 0.12 + 60;
      const padY = (Math.max(...ys) - Math.min(...ys)) * 0.12 + 40;
      return fitAspect({
        x: Math.min(...xs) - padX,
        y: Math.min(...ys) - padY,
        w: Math.max(...xs) - Math.min(...xs) + padX * 2,
        h: Math.max(...ys) - Math.min(...ys) + padY * 2,
      });
    }

    const preset = MAP_VIEWS.find((v) => v.id === viewId) ?? MAP_VIEWS[0];
    const [west, south, east, north] = preset.bounds;
    const [x1, y1] = project([west, north]);
    const [x2, y2] = project([east, south]);
    return fitAspect({ x: x1, y: y1, w: x2 - x1, h: y2 - y1 });
  }, [project, box, journey, viewId, height]);

  /** Größe eines Bildschirmpixels in Zeichenkoordinaten. */
  const unit = view.w / WIDTH;

  /** Breite des Ausschnitts in Längengraden – Maßstab für die Landschaften. */
  const viewDegrees = box ? (view.w / WIDTH) * (box.east - box.west) : 40;

  /** Nur Orte zeigen, die im gewählten Ausschnitt tatsächlich liegen. */
  const shownPlaces = useMemo(() => {
    if (journey || !project) return [];
    return PLACES.filter((place) => {
      if (kindFilter && place.kind !== kindFilter) return false;
      // Eine Landschaft erscheint erst, wenn sie im Ausschnitt auch etwas
      // ausmacht – sonst klebt „Galiläa“ als Punktname auf der Weltkarte.
      if (place.kind === 'region' && (place.span ?? 1) < viewDegrees * 0.06) return false;
      const [x, y] = project(place.coords);
      return x >= view.x && x <= view.x + view.w && y >= view.y && y <= view.y + view.h;
    });
  }, [journey, project, view, kindFilter, viewDegrees]);

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

  /** Sichtbarer Bereich – Beschriftungen dürfen nicht darüber hinausragen. */
  const clip = useMemo(
    () => ({ x1: view.x, y1: view.y, x2: view.x + view.w, y2: view.y + view.h }),
    [view],
  );

  const journeyLabels = useMemo(
    () =>
      layoutLabels(
        journeyPoints.map((p) => ({ x: p.x, y: p.y, text: `${p.numbers.join('., ')}. ${p.name}` })),
        unit,
        clip,
      ),
    [journeyPoints, unit, clip],
  );

  /**
   * Beschriftungen der Orte. Wichtige Orte kommen zuerst dran, damit ihnen
   * auf der gedrängten Gesamtkarte der Platz zufällt; wer keinen findet,
   * bleibt ein Punkt ohne Namen und wird erst beim Hineinzoomen lesbar.
   */
  const placeLabels = useMemo(() => {
    const byId = new Map<string, PlacedLabel>();
    if (!project) return byId;

    const ordered = [...shownPlaces].sort((a, b) => (a.rank ?? 2) - (b.rank ?? 2));
    const laid = layoutLabels(
      ordered.map((place) => {
        const [x, y] = project(place.coords);
        return { x, y, text: place.name, fixed: place.kind === 'region' };
      }),
      unit,
      clip,
    );
    ordered.forEach((place, i) => byId.set(place.id, laid[i]));
    return byId;
  }, [project, shownPlaces, unit, clip]);

  const hiddenLabels = useMemo(
    () => [...placeLabels.values()].filter((label) => label.crowded).length,
    [placeLabels],
  );

  /** Freitextsuche über alle Orte, unabhängig vom Ausschnitt. */
  const found = useMemo(() => {
    const needle = normalize(query.trim());
    if (needle.length < 2) return [];
    return PLACES.filter((place) =>
      normalize(`${place.name} ${place.short} ${place.today ?? ''}`).includes(needle),
    ).slice(0, 12);
  }, [query]);

  const nameOf = (bookId: string) => index?.books.find((b) => b.id === bookId)?.name ?? bookId;

  /**
   * Adressparameter setzen. Mehrere Änderungen müssen in einem Schritt
   * passieren, sonst überschreibt der zweite Aufruf den ersten – er läge
   * noch der alten Adresse zugrunde.
   */
  function setParams(changes: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    setSearchParams(next, { replace: true });
  }

  /** Der engste voreingestellte Ausschnitt, der den Ort enthält. */
  function viewFor(place: MapPlace): string {
    const [lon, lat] = place.coords;
    const fitting = MAP_VIEWS.filter(
      (v) => lon >= v.bounds[0] && lon <= v.bounds[2] && lat >= v.bounds[1] && lat <= v.bounds[3],
    );
    if (fitting.length === 0) return 'welt';
    return fitting.reduce((best, v) =>
      v.bounds[2] - v.bounds[0] < best.bounds[2] - best.bounds[0] ? v : best,
    ).id;
  }

  /**
   * Einen Ort aus der Suche auswählen: Er wird markiert, und der Ausschnitt
   * springt auf den engsten, in dem er liegt – sonst sucht man ihn auf der
   * Gesamtkarte vergeblich.
   */
  function focusOn(place: MapPlace) {
    setQuery('');
    setParams({ ort: place.id, reise: null, ausschnitt: viewFor(place), art: null });
  }

  const routes = focusPlace ? journeysThrough(focusPlace) : [];

  return (
    <div>
      <Link className="btn btn--ghost btn--sm" to="/studium" style={{ marginBottom: '1rem' }}>
        ← Studium
      </Link>

      <h1 className="page-title">Karte</h1>
      <p className="page-lead">
        {PLACES.length} Orte und Landschaften, {JOURNEYS.length} Wege – von Abrahams Aufbruch aus
        Ur über den Auszug aus Ägypten bis zu den Reisen des Paulus. Wähle einen Ausschnitt, eine
        Route oder tippe einen Ort an.
      </p>

      <div style={{ position: 'relative', marginBottom: '0.85rem' }}>
        <input
          className="input"
          placeholder="Ort suchen – Jerusalem, Ninive, Patmos …"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {found.length > 0 && (
          <div className="card" style={{ padding: '0.4rem', marginTop: '0.4rem' }}>
            {found.map((place) => (
              <button
                key={place.id}
                type="button"
                className="jump__item"
                onClick={() => focusOn(place)}
              >
                <strong>{place.name}</strong>
                <small>{PLACE_KIND_LABEL[place.kind]}</small>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Ausschnitte */}
      <div className="search__filters">
        {MAP_VIEWS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`chip${!journey && viewId === item.id ? ' chip--active' : ''}`}
            onClick={() => setParams({ reise: null, ausschnitt: item.id })}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Routen */}
      <div className="search__filters">
        <span className="settings-row__hint" style={{ alignSelf: 'center' }}>
          Wege:
        </span>
        {JOURNEYS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`chip${journey?.id === item.id ? ' chip--active' : ''}`}
            onClick={() =>
              setParams({ reise: journey?.id === item.id ? null : item.id, ort: null })
            }
            style={
              journey?.id === item.id ? undefined : { borderLeft: `3px solid ${item.color}` }
            }
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Art der Orte */}
      {!journey && (
        <div className="search__filters">
          <button
            type="button"
            className={`chip${!kindFilter ? ' chip--active' : ''}`}
            onClick={() => setParams({ art: null })}
          >
            Alle
          </button>
          {KINDS.map((value) => (
            <button
              key={value}
              type="button"
              className={`chip${kindFilter === value ? ' chip--active' : ''}`}
              onClick={() => setParams({ art: kindFilter === value ? null : value })}
            >
              {PLACE_KIND_PLURAL[value]}
            </button>
          ))}
          <span className="settings-row__hint" style={{ alignSelf: 'center' }}>
            {shownPlaces.length} im Ausschnitt
          </span>
        </div>
      )}

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
              <rect x={view.x} y={view.y} width={view.w} height={view.h} className="map__sea" />
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

              {/* Landschaften zuerst, damit Ortspunkte darüber liegen. */}
              {shownPlaces.map((place) => {
                if (place.kind !== 'region') return null;
                const label = placeLabels.get(place.id);
                if (!label || label.crowded) return null;
                const active = focusPlace?.id === place.id || hover === place.id;
                return (
                  <g
                    key={place.id}
                    className={`map__region${active ? ' map__region--active' : ''}`}
                    onClick={() => setParams({ ort: place.id, reise: null })}
                    onMouseEnter={() => setHover(place.id)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <text
                      x={label.labelX}
                      y={label.labelY}
                      textAnchor="middle"
                      className="map__label map__label--region"
                      style={{ fontSize: 12 * unit, strokeWidth: 3.5 * unit }}
                    >
                      {place.name}
                    </text>
                  </g>
                );
              })}

              {shownPlaces.map((place) => {
                if (place.kind === 'region') return null;
                const label = placeLabels.get(place.id);
                if (!label) return null;
                const active = focusPlace?.id === place.id || hover === place.id;
                // Kein Platz für den Namen: Der Punkt bleibt, anklickbar und
                // beim Überfahren beschriftet.
                const showLabel = !label.crowded || active;
                return (
                  <g
                    key={place.id}
                    className={`map__place map__place--${place.kind}${
                      active ? ' map__place--active' : ''
                    }`}
                    onClick={() => setParams({ ort: place.id, reise: null })}
                    onMouseEnter={() => setHover(place.id)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <circle
                      cx={label.x}
                      cy={label.y}
                      r={(active ? 8 : 5) * unit}
                      style={{ strokeWidth: 1.5 * unit }}
                    />
                    {showLabel && (
                      <text
                        x={label.labelX}
                        y={label.labelY}
                        textAnchor={label.anchor}
                        className="map__label"
                        style={{ fontSize: 11 * unit, strokeWidth: 3 * unit }}
                      >
                        {place.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {!journey && hiddenLabels > 0 && (
            <p className="settings-row__hint" style={{ marginTop: '0.6rem' }}>
              {hiddenLabels} Namen haben in diesem Ausschnitt keinen Platz. Die Punkte sind
              trotzdem da – ein engerer Ausschnitt oder ein Klick zeigt sie.
            </p>
          )}

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
            <h3 className="lex-entry__term">{focusPlace.name}</h3>
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              {focusPlace.fact && <span className="mention__fact">{focusPlace.fact}</span>}
              <span className="chip chip--kind-ort">{PLACE_KIND_LABEL[focusPlace.kind]}</span>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => setParams({ ort: null })}
              >
                Schließen
              </button>
            </div>
          </div>

          <p>{focusPlace.short}</p>
          {focusPlace.long && <p style={{ color: 'var(--text-muted)' }}>{focusPlace.long}</p>}
          {focusPlace.today && (
            <p className="settings-row__hint">
              <strong>Heute: </strong>
              {focusPlace.today}
            </p>
          )}

          <div className="section-title" style={{ marginTop: '1.1rem' }}>
            Im Bibeltext
          </div>
          {focusPlace.refs.map((ref) => (
            <Link
              key={`${ref.book}${ref.chapter}${ref.verse}`}
              className="xref"
              to={`/bibel/${ref.book}/${ref.chapter}?vers=${ref.verse}`}
            >
              <strong>
                {nameOf(ref.book)} {ref.chapter},{ref.verse}
              </strong>
              {ref.note && <span> — {ref.note}</span>}
            </Link>
          ))}

          {routes.length > 0 && (
            <>
              <div className="section-title" style={{ marginTop: '1.1rem' }}>
                Wege über diesen Ort
              </div>
              <div className="day__portions">
                {routes.map((route) => (
                  <button
                    key={route.id}
                    type="button"
                    className="chip"
                    style={{ borderLeft: `3px solid ${route.color}` }}
                    onClick={() => setParams({ reise: route.id, ort: null })}
                  >
                    {route.title}
                  </button>
                ))}
              </div>
            </>
          )}

          {focusPlace.lexicon && findLexiconEntry(focusPlace.lexicon) && (
            <Link
              className="btn btn--ghost btn--sm"
              to={`/lexikon?eintrag=${focusPlace.lexicon}`}
              style={{ marginTop: '0.9rem' }}
            >
              Im Lexikon nachschlagen →
            </Link>
          )}
        </section>
      )}
    </div>
  );
}
