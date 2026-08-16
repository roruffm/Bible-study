/**
 * Zeigt, welche Verse noch keinen Kontextartikel haben.
 *
 * Das Ziel ist die lückenlose Abdeckung; solange sie nicht erreicht ist,
 * braucht es eine Liste, die sagt, was fehlt. Dieses Skript nennt je Buch den
 * Anteil und die konkreten Lücken – Kapitel und Versbereiche, in denen kein
 * Artikel greift. Wer den Bestand ausbaut, kann daran ablesen, wo anzusetzen
 * ist, und hinterher prüfen, ob eine Lücke wirklich geschlossen wurde.
 *
 * Aufruf:
 *   node scripts/check-coverage.mjs            # Neues Testament
 *   node scripts/check-coverage.mjs at         # Altes Testament
 *   node scripts/check-coverage.mjs alle       # beides
 *   node scripts/check-coverage.mjs nt hebr    # nur ein Buch, mit allen Lücken
 */

import { buildSync } from 'esbuild';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Die Artikelsammlung ist TypeScript – für Node erst bündeln. */
async function ladeArtikel() {
  const dir = mkdtempSync(join(tmpdir(), 'abdeckung-'));
  const datei = join(dir, 'commentary.mjs');
  try {
    buildSync({
      entryPoints: [join(ROOT, 'src', 'content', 'commentary.ts')],
      outfile: datei,
      bundle: true,
      format: 'esm',
      platform: 'node',
      logLevel: 'silent',
    });
    const { COMMENTARY } = await import(pathToFileURL(datei).href);
    return COMMENTARY;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const argumente = process.argv.slice(2).map((a) => a.toLowerCase());
const testamente = argumente.includes('alle')
  ? ['AT', 'NT']
  : argumente.includes('at')
    ? ['AT']
    : ['NT'];
const nurBuch = argumente.find((a) => !['at', 'nt', 'alle'].includes(a));

const index = JSON.parse(
  readFileSync(join(ROOT, 'public', 'bibel', 'luther1912', 'index.json'), 'utf8'),
);
const COMMENTARY = await ladeArtikel();

/** Zusammenhängende Versbereiche ohne Artikel, kapitelweise. */
function luecken(buch, artikel) {
  const offen = [];
  for (let kapitel = 1; kapitel <= buch.chapters; kapitel++) {
    const verse = buch.verses[kapitel - 1];
    const belegt = new Set();
    for (const e of artikel) {
      if (e.chapter !== kapitel) continue;
      for (let v = e.from; v <= e.to; v++) belegt.add(v);
    }
    let start = null;
    for (let v = 1; v <= verse + 1; v++) {
      const frei = v <= verse && !belegt.has(v);
      if (frei && start === null) start = v;
      if (!frei && start !== null) {
        offen.push({ kapitel, von: start, bis: v - 1 });
        start = null;
      }
    }
  }
  return offen;
}

let gesamtVerse = 0;
let gesamtBelegt = 0;
const zeilen = [];

for (const buch of index.books) {
  if (!testamente.includes(buch.testament)) continue;
  if (nurBuch && buch.id !== nurBuch) continue;

  const artikel = COMMENTARY.filter((e) => e.book === buch.id);
  const verse = buch.verses.reduce((n, v) => n + v, 0);
  const belegt = artikel.reduce((n, e) => n + (e.to - e.from + 1), 0);
  gesamtVerse += verse;
  gesamtBelegt += belegt;

  const offen = luecken(buch, artikel);
  const groesste = [...offen].sort((a, b) => b.bis - b.von - (a.bis - a.von)).slice(0, nurBuch ? 999 : 3);

  zeilen.push({
    name: buch.name,
    anteil: (belegt / verse) * 100,
    artikel: artikel.length,
    belegt,
    verse,
    fehlend: verse - belegt,
    offen: offen.length,
    groesste: groesste.map((l) => `${l.kapitel},${l.von}${l.bis > l.von ? `-${l.bis}` : ''}`),
  });
}

zeilen.sort((a, b) => a.anteil - b.anteil);

console.log(`Abdeckung: ${testamente.join(' + ')}${nurBuch ? ` / ${nurBuch}` : ''}\n`);
for (const z of zeilen) {
  console.log(
    `${z.anteil.toFixed(1).padStart(5)} %  ${z.name.padEnd(20)} ` +
      `${String(z.artikel).padStart(3)} Artikel  ` +
      `${String(z.belegt).padStart(4)}/${String(z.verse).padEnd(4)} Verse  ` +
      `${String(z.fehlend).padStart(4)} offen in ${String(z.offen).padStart(3)} Stücken` +
      (z.groesste.length ? `  – größte: ${z.groesste.join(', ')}` : ''),
  );
}

const fehlend = gesamtVerse - gesamtBelegt;
console.log(
  `\nGesamt: ${gesamtBelegt} von ${gesamtVerse} Versen = ${((gesamtBelegt / gesamtVerse) * 100).toFixed(1)} %, ` +
    `${fehlend} offen`,
);
if (fehlend > 0 && !nurBuch) {
  // Bei rund zwanzig Versen je Artikel – dem bisherigen Schnitt – lässt sich
  // abschätzen, was bis zur Lückenlosigkeit noch zu schreiben ist.
  console.log(`Bei etwa zwanzig Versen je Artikel fehlen noch rund ${Math.ceil(fehlend / 20)} Artikel.`);
}
const vollstaendig = zeilen.filter((z) => z.fehlend === 0);
if (vollstaendig.length > 0) {
  console.log(`Lückenlos: ${vollstaendig.map((z) => z.name).join(', ')}`);
}
