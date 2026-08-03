/**
 * Baut die App zu **einer einzigen HTML-Datei** zusammen.
 *
 * Ergebnis: `dist-single/lumina.html` – enthält Skript, Stile und den
 * vollständigen Bibeltext. Die Datei läuft per Doppelklick im Browser, ohne
 * Server und ohne Netzverbindung, und lässt sich so auch verschicken.
 *
 * Der Bibeltext (rund 4 MB JSON) würde die Datei unnötig aufblähen und wird
 * deshalb gzip-komprimiert und base64-kodiert eingebettet; die App entpackt
 * ihn beim Start über die DecompressionStream-Schnittstelle des Browsers.
 *
 * Aufruf: npm run build:single   (führt vorher den normalen Build aus)
 */

import { execSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const OUT_DIR = join(ROOT, 'dist-single');
const TRANSLATION = process.argv[2] ?? 'luther1912';

console.log('Baue die App …');
execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });

/* ------------------------------------------------ Bibeltext einsammeln */

const bibleDir = join(ROOT, 'public', 'bibel', TRANSLATION);
const index = JSON.parse(readFileSync(join(bibleDir, 'index.json'), 'utf8'));

const books = {};
for (const file of readdirSync(bibleDir)) {
  if (!file.endsWith('.json') || file === 'index.json') continue;
  const book = JSON.parse(readFileSync(join(bibleDir, file), 'utf8'));
  books[book.id] = book;
}

// Die Kartengrundlage muss ebenfalls mit hinein, sonst bleibt die Karte in
// der Einzeldatei leer.
let karten;
try {
  karten = JSON.parse(readFileSync(join(ROOT, 'public', 'karten', 'regionen.json'), 'utf8'));
} catch {
  console.log('Hinweis: keine Kartendaten gefunden – zuerst "node scripts/build-map-data.mjs".');
}

const payloadJson = JSON.stringify({ index, books, karten });
const payload = gzipSync(Buffer.from(payloadJson, 'utf8'), { level: 9 }).toString('base64');

console.log(
  `Bibeltext: ${index.books.length} Bücher, ` +
    `${(payloadJson.length / 1024 / 1024).toFixed(1)} MB → ` +
    `${(payload.length / 1024 / 1024).toFixed(1)} MB eingebettet`,
);

/* ------------------------------------ Skript und Stile hineinschreiben */

let html = readFileSync(join(DIST, 'index.html'), 'utf8');

// Verweise auf Fremddateien durch deren Inhalt ersetzen.
html = html.replace(
  /<script[^>]*src="([^"]+)"[^>]*><\/script>/g,
  (match, src) => {
    const path = join(DIST, src.replace(/^\//, ''));
    try {
      return `<script type="module">${readFileSync(path, 'utf8')}</script>`;
    } catch {
      return match;
    }
  },
);

html = html.replace(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, (match, href) => {
  const path = join(DIST, href.replace(/^\//, ''));
  try {
    return `<style>${readFileSync(path, 'utf8')}</style>`;
  } catch {
    return match;
  }
});

// Manifest und Icon zeigen ins Leere, sobald die Datei allein steht.
html = html.replace(/<link[^>]*rel="manifest"[^>]*>/g, '');
html = html.replace(/<link[^>]*rel="icon"[^>]*>/g, () => {
  const svg = readFileSync(join(ROOT, 'public', 'favicon.svg'), 'utf8');
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`;
  return `<link rel="icon" type="image/svg+xml" href="${dataUri}">`;
});

// Die Nutzlast muss vor dem App-Skript stehen.
html = html.replace(
  '</head>',
  `<script>window.__LUMINA_PAYLOAD__=${JSON.stringify(payload)};</script>\n</head>`,
);

mkdirSync(OUT_DIR, { recursive: true });
const outFile = join(OUT_DIR, 'lumina.html');
writeFileSync(outFile, html);

console.log(`\nFertig: ${outFile}`);
console.log(`Größe : ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(1)} MB`);

/* ------------------------------------------------------ Fragment-Fassung */

// Manche Umgebungen betten eine Seite in ihr eigenes Grundgerüst ein und
// vertragen deshalb kein zweites <html>/<head>/<body>. Dafür entsteht
// zusätzlich eine Fassung, die nur den Inhalt enthält.
const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? '';
const body = html.match(/<body>([\s\S]*?)<\/body>/)?.[1] ?? '';

// Aus dem Kopf übernehmen wir, was auch im Rumpf wirkt.
const keep = [...head.matchAll(/<(title|style|script)\b[\s\S]*?<\/\1>/g)].map((m) => m[0]);

const fragmentFile = join(OUT_DIR, 'lumina-fragment.html');
writeFileSync(fragmentFile, `${keep.join('\n')}\n${body.trim()}\n`);

console.log(`Fragment: ${fragmentFile}`);
console.log(`Größe   : ${(Buffer.byteLength(readFileSync(fragmentFile)) / 1024 / 1024).toFixed(1)} MB`);

// Absicherung: In der fertigen Datei darf keine Anforderung an eine
// Fremddatei mehr übrig bleiben. Geprüft wird nur das Markup – innerhalb der
// eingebetteten Skripte und Stile stehen zwangsläufig ähnliche Zeichenfolgen.
const markup = html
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<style[\s\S]*?<\/style>/g, '');
const leftovers = [...markup.matchAll(/(?:src|href)="(?!data:|#|https?:)([^"]+)"/g)].map((m) => m[1]);
if (leftovers.length > 0) {
  console.log(`\nWarnung – noch nicht eingebettete Verweise: ${leftovers.join(', ')}`);
  process.exitCode = 1;
}
