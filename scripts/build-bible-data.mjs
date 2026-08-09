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
 * Der Verzeichnisname eines Buches steht in der Sprache der Übersetzung; welche
 * Spalte der Buchliste ihn liefert, entscheidet die Übersetzungs-Kennung.
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

/**
 * Welche Spalte der Buchliste den Verzeichnisnamen im Rohbestand liefert.
 * Die Quelle benennt ihre Verzeichnisse in der Sprache der jeweiligen
 * Übersetzung – „1.mose“ dort, „genesis“ hier.
 */
const SOURCE_COLUMN = { luther1912: 4, kjv: 5 };
const sourceColumn = SOURCE_COLUMN[translationId] ?? 4;

/** Entfernt Reste von Auszeichnungen und normalisiert Leerraum. */
function cleanVerse(text) {
  return String(text)
    .replace(/\{[^}]*\}/g, '')       // Strong-Nummern u. Ä.
    .replace(/<[^>]*>/g, '')          // XML-/HTML-Reste
    .replace(/¶/g, '')                // Absatzzeichen der King-James-Ausgabe
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Im englischen Bestand hängen die Randbemerkungen der Übersetzer ohne
 * Trennung am Versende, eingeleitet von der eigenen Stellenangabe – etwa
 * „…their possessions.1.17 deliverance: or, they that escape“. Sie gehören
 * nicht zum Bibeltext und werden abgeschnitten.
 *
 * Der Marker ist eindeutig: Er besteht aus der Kapitel- und Versnummer des
 * Verses selbst. Im Rumpf der King-James-Verse kommt überhaupt keine Ziffer
 * vor, im Luthertext taucht das Muster nirgends auf – ein Fehlschnitt ist
 * damit ausgeschlossen.
 */
function stripMarginalNotes(text, chapter, verse) {
  const at = text.indexOf(`${chapter}.${verse} `);
  return at > 0 ? text.slice(0, at).trim() : text;
}

/**
 * Etliche Verse tragen am Anfang einen Marker wie „[32:1]“ oder „(024:2)“. Er
 * nennt die abweichende Zählung der gedruckten deutschen Ausgabe – die Quelle
 * nummeriert die Dateien nach der international üblichen Zählung. Der Marker
 * wird aus dem Fließtext genommen und getrennt festgehalten, damit die
 * Leseansicht sauber bleibt und der Hinweis trotzdem nicht verlorengeht.
 *
 * Die eckige Klammer steht im Luthertext, die runde mit führenden Nullen in
 * der Elberfelder Ausgabe. In sieben Versen der Elberfelder steht mitten im
 * Text ein zweiter Marker: Dort fasst diese Ausgabe zwei Verse der anderen
 * Zählung zusammen. Solche Marker werden entfernt – im Fließtext wären sie
 * nicht als Zählhinweis zu erkennen, und die Teilung, auf die sie zeigen, gibt
 * es in unserer Nummerierung ohnehin nicht.
 */
function extractAltNumbering(text) {
  const match = text.match(/^[[(](\d+):(\d+)[\])]\s*/);
  const rest = (match ? text.slice(match[0].length) : text)
    .replace(/\(\d+:\d+\)\s*/g, '')
    .trim();
  if (!match) return { text: rest, alt: null };
  // Führende Nullen weg: „024“ meint Kapitel 24.
  const kapitel = Number.parseInt(match[1], 10);
  const vers = Number.parseInt(match[2], 10);
  return { text: rest, alt: `${kapitel},${vers}` };
}

const index = [];
let totalVerses = 0;
let altCount = 0;
const problems = [];

for (const book of BOOKS) {
  const [id, name, abbr, group] = book;
  const source = book[sourceColumn];
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
  /** Abweichende Luther-Zählung, Schlüssel „kapitel.vers“. */
  const altNumbering = {};

  for (const chapterNumber of chapterNumbers) {
    const raw = JSON.parse(readFileSync(join(chapterDir, `${chapterNumber}.json`), 'utf8'));
    const rows = raw.data ?? raw.verses ?? [];

    // Nach Versnummer einsortieren, damit der Array-Index der Nummer entspricht.
    const verses = [];
    for (const row of rows) {
      const number = Number.parseInt(row.verse, 10);
      if (!Number.isInteger(number) || number < 1) continue;
      // Der englische Bestand führt jeden Vers doppelt auf, beide Male mit
      // demselben Wortlaut. Weil nach Versnummer einsortiert wird, überschreibt
      // der zweite Eintrag den ersten und richtet keinen Schaden an.
      const cleaned = stripMarginalNotes(cleanVerse(row.text), chapterNumber, number);
      const { text, alt } = extractAltNumbering(cleaned);
      verses[number - 1] = text;
      if (alt) altNumbering[`${chapterNumber}.${number}`] = alt;
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

  altCount += Object.keys(altNumbering).length;

  writeFileSync(
    join(outDir, `${id}.json`),
    JSON.stringify({
      id,
      name,
      abbr,
      chapters,
      ...(Object.keys(altNumbering).length > 0 ? { alt: altNumbering } : {}),
    }),
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
console.log(`Luther-Zählung abweichend: ${altCount} Verse`);

if (problems.length > 0) {
  console.log(`\nAuffälligkeiten (${problems.length}):`);
  for (const p of problems.slice(0, 20)) console.log(`  - ${p}`);
  if (problems.length > 20) console.log(`  … und ${problems.length - 20} weitere`);
}
