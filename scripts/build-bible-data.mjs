/**
 * Wandelt den Rohdatenbestand einer Bibelübersetzung in das kompakte
 * App-Format um.
 *
 * Aufruf:
 *   node scripts/build-bible-data.mjs <quellverzeichnis> [übersetzungs-id]
 *
 * Erwartete Quellstruktur (wldeh/bible-api):
 *   <quelle>/books/<buch>/chapters/<kapitel>.json  →  { data: [{ verse, text }] }
 *
 * Ergebnis:
 *   public/bibel/<id>/<buchId>.json   { id, name, chapters: [ [vers, …], … ] }
 *   public/bibel/<id>/index.json      Buch-Metadaten inkl. Kapitel-/Verszahlen
 *
 * Versnummern werden nicht gespeichert – sie ergeben sich aus dem Index im
 * Array. Das spart rund ein Drittel der Dateigröße.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BOOKS, GROUPS } from './books.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const sourceDir = process.argv[2];
const translationId = process.argv[3] ?? 'luther1912';

if (!sourceDir) {
  console.error('Quellverzeichnis fehlt.\nAufruf: node scripts/build-bible-data.mjs <quelle> [id]');
  process.exit(1);
}

const outDir = join(ROOT, 'public', 'bibel', translationId);
mkdirSync(outDir, { recursive: true });

/** Entfernt Reste von Auszeichnungen und normalisiert Leerraum. */
function cleanVerse(text) {
  return String(text)
    .replace(/\{[^}]*\}/g, '')       // Strong-Nummern u. Ä.
    .replace(/<[^>]*>/g, '')          // XML-/HTML-Reste
    .replace(/\s+/g, ' ')
    .trim();
}

const index = [];
let totalVerses = 0;
const problems = [];

for (const [id, name, abbr, group, source] of BOOKS) {
  const chapterDir = join(sourceDir, 'books', source, 'chapters');

  let chapterFiles;
  try {
    chapterFiles = readdirSync(chapterDir).filter((f) => f.endsWith('.json'));
  } catch {
    problems.push(`Buch "${name}": Verzeichnis nicht gefunden (${chapterDir})`);
    continue;
  }

  // Kapitel numerisch sortieren – readdir liefert "10" vor "2".
  const chapterNumbers = chapterFiles
    .map((f) => Number.parseInt(f, 10))
    .filter((n) => Number.isInteger(n))
    .sort((a, b) => a - b);

  const chapters = [];

  for (const chapterNumber of chapterNumbers) {
    const raw = JSON.parse(readFileSync(join(chapterDir, `${chapterNumber}.json`), 'utf8'));
    const rows = raw.data ?? raw.verses ?? [];

    // Nach Versnummer einsortieren, damit der Array-Index der Nummer entspricht.
    const verses = [];
    for (const row of rows) {
      const number = Number.parseInt(row.verse, 10);
      if (!Number.isInteger(number) || number < 1) continue;
      verses[number - 1] = cleanVerse(row.text);
    }

    for (let i = 0; i < verses.length; i++) {
      if (verses[i] === undefined) {
        verses[i] = '';
        problems.push(`${name} ${chapterNumber},${i + 1}: Vers fehlt in der Quelle`);
      }
    }

    if (chapterNumber !== chapters.length + 1) {
      problems.push(`${name}: Kapitel ${chapterNumber} folgt nicht lückenlos`);
    }

    chapters.push(verses);
    totalVerses += verses.length;
  }

  writeFileSync(
    join(outDir, `${id}.json`),
    JSON.stringify({ id, name, abbr, chapters }),
  );

  index.push({
    id,
    name,
    abbr,
    group,
    testament: GROUPS.find((g) => g.id === group)?.testament ?? 'AT',
    chapters: chapters.length,
    verses: chapters.map((c) => c.length),
  });
}

writeFileSync(
  join(outDir, 'index.json'),
  JSON.stringify({ translation: translationId, groups: GROUPS, books: index }, null, 0),
);

console.log(`Übersetzung : ${translationId}`);
console.log(`Bücher      : ${index.length} / ${BOOKS.length}`);
console.log(`Kapitel     : ${index.reduce((n, b) => n + b.chapters, 0)}`);
console.log(`Verse       : ${totalVerses}`);

if (problems.length > 0) {
  console.log(`\nAuffälligkeiten (${problems.length}):`);
  for (const p of problems.slice(0, 20)) console.log(`  - ${p}`);
  if (problems.length > 20) console.log(`  … und ${problems.length - 20} weitere`);
}
