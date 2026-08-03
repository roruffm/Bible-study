/**
 * Erzeugt die Kartengrundlage für das Kartenmodul.
 *
 * Quelle: Natural Earth (gemeinfrei), Landflächen und Seen in 1:50 Mio.
 * Der Weltdatensatz ist mit knapp 3 MB viel zu groß. Er wird deshalb auf den
 * Ausschnitt der biblischen Welt zugeschnitten und anschließend vereinfacht –
 * übrig bleiben wenige Dutzend Kilobyte, die sich mitliefern lassen.
 *
 * Aufruf: node scripts/build-map-data.mjs
 * Ergebnis: public/karten/regionen.json
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'karten');

const SOURCES = {
  land: 'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/50m/physical/ne_50m_land.json',
  seen: 'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/50m/physical/ne_50m_lakes.json',
};

/** Ausschnitt: von Italien bis Mesopotamien, von Ägypten bis Makedonien. */
const BOX = { west: 10, east: 50, south: 22, north: 46 };

/** Vereinfachungsschwelle in Grad – grob 3 km. */
const TOLERANCE = 0.03;

/* ----------------------------------------- Zuschnitt (Sutherland–Hodgman) */

const INSIDE = {
  west: (p) => p[0] >= BOX.west,
  east: (p) => p[0] <= BOX.east,
  south: (p) => p[1] >= BOX.south,
  north: (p) => p[1] <= BOX.north,
};

/** Schnittpunkt der Strecke a→b mit der Kante `edge`. */
function intersect(a, b, edge) {
  if (edge === 'west' || edge === 'east') {
    const x = edge === 'west' ? BOX.west : BOX.east;
    return [x, a[1] + ((b[1] - a[1]) * (x - a[0])) / (b[0] - a[0])];
  }
  const y = edge === 'south' ? BOX.south : BOX.north;
  return [a[0] + ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]), y];
}

function clipRing(ring) {
  let output = ring;
  for (const edge of ['west', 'east', 'south', 'north']) {
    const input = output;
    output = [];
    if (input.length === 0) break;

    for (let i = 0; i < input.length; i++) {
      const current = input[i];
      const previous = input[(i + input.length - 1) % input.length];
      const currentIn = INSIDE[edge](current);
      const previousIn = INSIDE[edge](previous);

      if (currentIn) {
        if (!previousIn) output.push(intersect(previous, current, edge));
        output.push(current);
      } else if (previousIn) {
        output.push(intersect(previous, current, edge));
      }
    }
  }
  return output;
}

/* -------------------------------------- Vereinfachung (Douglas–Peucker) */

function perpendicularDistance(point, start, end) {
  const [x, y] = point;
  const [x1, y1] = start;
  const [x2, y2] = end;
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) return Math.hypot(x - x1, y - y1);
  const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
  const clamped = Math.max(0, Math.min(1, t));
  return Math.hypot(x - (x1 + clamped * dx), y - (y1 + clamped * dy));
}

function simplify(points, tolerance) {
  if (points.length < 3) return points;

  let maxDistance = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const distance = perpendicularDistance(points[i], points[0], points[points.length - 1]);
    if (distance > maxDistance) {
      maxDistance = distance;
      index = i;
    }
  }

  if (maxDistance <= tolerance) return [points[0], points[points.length - 1]];

  return [
    ...simplify(points.slice(0, index + 1), tolerance).slice(0, -1),
    ...simplify(points.slice(index), tolerance),
  ];
}

const round = (value) => Math.round(value * 1000) / 1000;

/* ------------------------------------------------------------ Verarbeitung */

function ringsOf(geometry) {
  if (geometry.type === 'Polygon') return geometry.coordinates;
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.flat();
  return [];
}

async function collect(url, minimumArea) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} → ${response.status}`);
  const data = await response.json();

  const result = [];
  for (const feature of data.features ?? []) {
    for (const ring of ringsOf(feature.geometry ?? {})) {
      const clipped = clipRing(ring);
      if (clipped.length < 4) continue;

      const simplified = simplify(clipped, TOLERANCE).map((p) => [round(p[0]), round(p[1])]);
      if (simplified.length < 4) continue;

      // Winzige Splitter tragen nichts bei und kosten nur Platz.
      if (Math.abs(shoelace(simplified)) < minimumArea) continue;
      result.push(simplified);
    }
  }
  return result;
}

/** Doppelte Fläche eines Rings – nur zum Aussortieren, Vorzeichen egal. */
function shoelace(ring) {
  let sum = 0;
  for (let i = 0; i < ring.length; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % ring.length];
    sum += x1 * y2 - x2 * y1;
  }
  return sum / 2;
}

console.log('Lade Natural-Earth-Daten …');
const land = await collect(SOURCES.land, 0.02);
const seen = await collect(SOURCES.seen, 0.05);

const output = { box: BOX, land, seen };
mkdirSync(OUT_DIR, { recursive: true });
const file = join(OUT_DIR, 'regionen.json');
writeFileSync(file, JSON.stringify(output));

const points = [...land, ...seen].reduce((n, ring) => n + ring.length, 0);
console.log(`Landflächen : ${land.length} Ringe`);
console.log(`Seen        : ${seen.length} Ringe`);
console.log(`Stützpunkte : ${points}`);
console.log(`Datei       : ${file} (${(JSON.stringify(output).length / 1024).toFixed(0)} KB)`);
