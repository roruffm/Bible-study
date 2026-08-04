import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

/** Der Kartenort zu einer Station, falls es einen gibt. */
function placeAt(coords: [number, number]): MapPlace | undefined {
  return PLACES.find(
    (place) =>
      Math.abs(place.coords[0] - coords[0]) < SAME_PLACE &&
      Math.abs(place.coords[1] - coords[1]) < SAME_PLACE,
  );
}

/** Entfernung zweier Punkte auf der Kugel in Kilometern. */
function distanceKm([lon1, lat1]: [number, number], [lon2, lat2]: [number, number]): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/** Luftlinie über alle Stationen einer Route. */
function journeyLength(journey: Journey): number {
  let sum = 0;
  for (let i = 1; i < journey.stops.length; i++) {
    sum += distanceKm(journey.stops[i - 1].coords, journey.stops[i].coords);
  }
  return sum;
}

/** Stufen für den Maßstabsbalken. */
const SCALE_STEPS = [10, 20, 50, 100, 200, 500, 1000, 2000];

const ZOOM_MIN = 1;
const ZOOM_MAX = 20;

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
  const baseView = useMemo((): View => {
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
    const fitted = fitAspect({ x: x1, y: y1, w: x2 - x1, h: y2 - y1 });

    // Ein einzeln gewählter Ort rückt in die Mitte – sonst sucht man ihn im
    // Ausschnitt, und beim Vergrößern verschwindet er ganz aus dem Bild.
    if (focusPlace) {
      const [fx, fy] = project(focusPlace.coords);
      return { ...fitted, x: fx - fitted.w / 2, y: fy - fitted.h / 2 };
    }
    return fitted;
  }, [project, box, journey, viewId, height, focusPlace]);

  /**
   * Freie Bewegung über dem eingestellten Ausschnitt: Ziehen verschiebt,
   * Mausrad und die Knöpfe vergrößern. Der Zustand bleibt bewusst außerhalb
   * der Adresse – geteilt wird der Ausschnitt, nicht jeder Zwischenschritt.
   */
  const [nav, setNav] = useState({ scale: 1, dx: 0, dy: 0 });

  // Ein neuer Ausschnitt oder eine neue Route setzt die Bewegung zurück.
  useEffect(() => {
    setNav({ scale: 1, dx: 0, dy: 0 });
  }, [viewId, journeyId]);

  const view = useMemo((): View => {
    const w = baseView.w / nav.scale;
    const h = baseView.h / nav.scale;
    // Die Mitte darf die Gesamtkarte nicht verlassen, sonst zieht man ins Leere.
    const cx = Math.min(Math.max(baseView.x + baseView.w / 2 + nav.dx, 0), WIDTH);
    const cy = Math.min(Math.max(baseView.y + baseView.h / 2 + nav.dy, 0), height);
    return { x: cx - w / 2, y: cy - h / 2, w, h };
  }, [baseView, nav, height]);

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
   * Ausdünnen: Zwei Punkte, die auf dem Bildschirm aufeinanderliegen, sind
   * kein Gewinn – Jerusalem und das Kidrontal trennen zwei Kilometer. Wichtige
   * Orte behalten ihren Platz, die übrigen erscheinen beim Hineinzoomen.
   */
  const drawnPlaces = useMemo(() => {
    if (!project) return [] as MapPlace[];
    const minGap = 11 * unit;
    const kept: [number, number][] = [];
    const out: MapPlace[] = [];

    for (const place of [...shownPlaces].sort((a, b) => (a.rank ?? 2) - (b.rank ?? 2))) {
      if (place.kind === 'region') {
        out.push(place);
        continue;
      }
      const [x, y] = project(place.coords);
      const tooClose = kept.some(([kx, ky]) => Math.abs(kx - x) < minGap && Math.abs(ky - y) < minGap);
      if (tooClose && place.id !== focusPlace?.id) continue;
      kept.push([x, y]);
      out.push(place);
    }
    return out;
  }, [shownPlaces, project, unit, focusPlace]);

  /**
   * Beschriftungen der Orte. Wichtige Orte kommen zuerst dran, damit ihnen
   * auf der gedrängten Gesamtkarte der Platz zufällt; wer keinen findet,
   * bleibt ein Punkt ohne Namen und wird erst beim Hineinzoomen lesbar.
   */
  const placeLabels = useMemo(() => {
    const byId = new Map<string, PlacedLabel>();
    if (!project) return byId;

    const laid = layoutLabels(
      drawnPlaces.map((place) => {
        const [x, y] = project(place.coords);
        return { x, y, text: place.name, fixed: place.kind === 'region' };
      }),
      unit,
      clip,
    );
    drawnPlaces.forEach((place, i) => byId.set(place.id, laid[i]));
    return byId;
  }, [project, drawnPlaces, unit, clip]);

  const hiddenLabels = useMemo(
    () => [...placeLabels.values()].filter((label) => label.crowded).length,
    [placeLabels],
  );

  const hiddenPlaces = shownPlaces.length - drawnPlaces.length;

  /** Freitextsuche über alle Orte, unabhängig vom Ausschnitt. */
  const found = useMemo(() => {
    const needle = normalize(query.trim());
    if (needle.length < 2) return [];
    return PLACES.filter((place) =>
      normalize(`${place.name} ${place.short} ${place.today ?? ''}`).includes(needle),
    ).slice(0, 12);
  }, [query]);

  const nameOf = (bookId: string) => index?.books.find((b) => b.id === bookId)?.name ?? bookId;

  /* ------------------------------------------------ Ziehen und Vergrößern */

  const svgRef = useRef<SVGSVGElement | null>(null);
  const drag = useRef<{ x: number; y: number; moved: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  /** Ein Bildschirmpixel in Zeichenkoordinaten – abhängig von der Anzeigebreite. */
  const pixelToUnit = useCallback(
    () => view.w / (svgRef.current?.getBoundingClientRect().width || WIDTH),
    [view.w],
  );

  const zoomBy = useCallback((factor: number) => {
    setNav((prev) => ({
      ...prev,
      scale: Math.min(Math.max(prev.scale * factor, ZOOM_MIN), ZOOM_MAX),
    }));
  }, []);

  // Das Mausrad muss die Seite am Scrollen hindern; das geht nur mit einem
  // Zuhörer, der ausdrücklich nicht passiv ist.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    function onWheel(event: WheelEvent) {
      event.preventDefault();
      zoomBy(event.deltaY < 0 ? 1.18 : 1 / 1.18);
    }
    svg.addEventListener('wheel', onWheel, { passive: false });
    return () => svg.removeEventListener('wheel', onWheel);
  }, [zoomBy, data]);

  function onPointerDown(event: React.PointerEvent<SVGSVGElement>) {
    drag.current = { x: event.clientX, y: event.clientY, moved: 0 };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const state = drag.current;
    if (!state) return;
    const scale = pixelToUnit();
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    state.moved += Math.abs(dx) + Math.abs(dy);
    state.x = event.clientX;
    state.y = event.clientY;
    setNav((prev) => ({ ...prev, dx: prev.dx - dx * scale, dy: prev.dy - dy * scale }));
  }

  function onPointerUp(event: React.PointerEvent<SVGSVGElement>) {
    setDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
    // Nach einem echten Zug darf der Klick keinen Ort öffnen.
    setTimeout(() => {
      drag.current = null;
    }, 0);
  }

  /** Wahr, wenn gerade gezogen und nicht geklickt wurde. */
  const wasDragged = () => (drag.current?.moved ?? 0) > 6;

  function openPlace(id: string) {
    if (wasDragged()) return;
    setParams({ ort: id, reise: null });
  }

  const moved = nav.scale !== 1 || nav.dx !== 0 || nav.dy !== 0;

  /**
   * Maßstabsbalken. Er macht Entfernungen ablesbar – dass zwischen Nazareth
   * und Jerusalem nur 150 Kilometer liegen, ist für das Verständnis der
   * Evangelien wichtiger als jede Ortsangabe.
   */
  const scaleBar = useMemo(() => {
    if (!box) return null;
    const centerLat = box.north - ((view.y + view.h / 2) / height) * (box.north - box.south);
    const degPerUnit = (box.east - box.west) / WIDTH;
    const kmPerUnit = degPerUnit * 111.32 * Math.cos((centerLat * Math.PI) / 180);
    const target = view.w * 0.22 * kmPerUnit;
    const km = SCALE_STEPS.find((step) => step >= target) ?? SCALE_STEPS[SCALE_STEPS.length - 1];
    return { km, length: km / kmPerUnit };
  }, [box, view, height]);

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
            <div className="map__tools">
              <button
                type="button"
                className="map__tool"
                onClick={() => zoomBy(1.5)}
                aria-label="Vergrößern"
                title="Vergrößern"
              >
                +
              </button>
              <button
                type="button"
                className="map__tool"
                onClick={() => zoomBy(1 / 1.5)}
                aria-label="Verkleinern"
                title="Verkleinern"
              >
                −
              </button>
              {moved && (
                <button
                  type="button"
                  className="map__tool map__tool--wide"
                  onClick={() => setNav({ scale: 1, dx: 0, dy: 0 })}
                >
                  Ansicht zurücksetzen
                </button>
              )}
            </div>
            <svg
              ref={svgRef}
              viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
              className={`map__svg${dragging ? ' map__svg--dragging' : ''}`}
              role="img"
              aria-label={
                journey ? `Karte: ${journey.title}` : 'Karte der biblischen Welt mit Orten'
              }
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
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
              {drawnPlaces.map((place) => {
                if (place.kind !== 'region') return null;
                const label = placeLabels.get(place.id);
                if (!label || label.crowded) return null;
                const active = focusPlace?.id === place.id || hover === place.id;
                return (
                  <g
                    key={place.id}
                    data-ort={place.id}
                    className={`map__region${active ? ' map__region--active' : ''}`}
                    onClick={() => openPlace(place.id)}
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

              {drawnPlaces.map((place) => {
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
                    data-ort={place.id}
                    className={`map__place map__place--${place.kind}${
                      active ? ' map__place--active' : ''
                    }`}
                    onClick={() => openPlace(place.id)}
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

              {/* Maßstab */}
              {scaleBar && (
                <g className="map__scale" style={{ pointerEvents: 'none' }}>
                  <line
                    x1={view.x + 16 * unit}
                    y1={view.y + view.h - 16 * unit}
                    x2={view.x + 16 * unit + scaleBar.length}
                    y2={view.y + view.h - 16 * unit}
                    style={{ strokeWidth: 2 * unit }}
                  />
                  <line
                    x1={view.x + 16 * unit}
                    y1={view.y + view.h - 20 * unit}
                    x2={view.x + 16 * unit}
                    y2={view.y + view.h - 12 * unit}
                    style={{ strokeWidth: 2 * unit }}
                  />
                  <line
                    x1={view.x + 16 * unit + scaleBar.length}
                    y1={view.y + view.h - 20 * unit}
                    x2={view.x + 16 * unit + scaleBar.length}
                    y2={view.y + view.h - 12 * unit}
                    style={{ strokeWidth: 2 * unit }}
                  />
                  <text
                    x={view.x + 16 * unit + scaleBar.length / 2}
                    y={view.y + view.h - 24 * unit}
                    textAnchor="middle"
                    className="map__label"
                    style={{ fontSize: 10 * unit, strokeWidth: 3 * unit }}
                  >
                    {scaleBar.km} km
                  </text>
                </g>
              )}
            </svg>
          </div>

          {!journey && (hiddenLabels > 0 || hiddenPlaces > 0) && (
            <p className="settings-row__hint" style={{ marginTop: '0.6rem' }}>
              In diesem Ausschnitt ist kein Platz für {hiddenPlaces > 0 && <>{hiddenPlaces} Orte</>}
              {hiddenPlaces > 0 && hiddenLabels > 0 && ' und '}
              {hiddenLabels > 0 && <>{hiddenLabels} Namen</>}. Ziehen, das Mausrad oder ein engerer
              Ausschnitt holt sie hervor.
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
          <p className="settings-row__hint">
            <strong>{journey.stops.length} Stationen · </strong>
            rund {Math.round(journeyLength(journey) / 10) * 10} km Luftlinie über alle Etappen –
            zu Fuß und zu Schiff ein Vielfaches an tatsächlichem Weg.
          </p>
          <Link className="btn btn--sm" to={`/bibel/${journey.ref.book}/${journey.ref.chapter}`}>
            Im Bibeltext nachlesen
          </Link>

          <div className="card" style={{ marginTop: '1rem' }}>
            {journey.stops.map((stop, i) => {
              const stopPlace = placeAt(stop.coords);
              const leg = i > 0 ? distanceKm(journey.stops[i - 1].coords, stop.coords) : 0;
              return (
                <div className="day" key={`${stop.name}-${i}`}>
                  <span
                    className="day__check day__check--done"
                    style={{ background: journey.color, borderColor: journey.color }}
                  >
                    {i + 1}
                  </span>
                  <div className="day__body">
                    <div className="day__title">
                      {stop.name}
                      {leg > 0 && (
                        <span className="settings-row__hint"> · {Math.round(leg)} km</span>
                      )}
                    </div>
                    {stop.note && <p className="day__note">{stop.note}</p>}
                    {stopPlace && (
                      <button
                        type="button"
                        className="chip"
                        onClick={() => setParams({ ort: stopPlace.id, reise: null })}
                      >
                        Ort auf der Karte
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
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
