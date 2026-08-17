/**
 * Trägt **neue** Artikel in `src/content/commentary.ts` und die zugehörigen
 * Datierungen in `src/content/datings.ts` ein.
 *
 * Das Gegenstück zu `patch-commentary.mjs`: Jenes vertieft vorhandene Artikel,
 * dieses legt neue an. Beide Dateien werden am Ende ergänzt – die Reihenfolge
 * innerhalb der Sammlung spielt für die Anzeige keine Rolle, weil `commentaryFor`
 * über Buch, Kapitel und Vers sucht.
 *
 * Aufruf: node scripts/add-commentary.mjs <datei-mit-artikeln.mjs>
 *
 * Die Datei exportiert `ARTICLES` als Array. Jeder Eintrag entspricht einem
 * `CommentaryEntry` und trägt zusätzlich `dating` mit `events`, `written` und
 * `epoch` – das wandert nach `datings.ts`, nicht in den Artikel.
 *
 * Geprüft wird alles, was sich vor dem Schreiben prüfen lässt: Pflichtfelder,
 * Überschneidungen mit vorhandenen Abschnitten, Zitate im Titel, Anhaltspunkte
 * der Urtext-Wörter, Stellenangaben der Querverweise und Absätze, die dasselbe
 * sagen. Der Grund ist praktisch: Findet `check-references.mjs` diese Fehler
 * erst hinterher, muss die Korrektur in einer Datei mit über anderthalb
 * Millionen Zeichen erfolgen statt in der Vorlage, aus der die Artikel kommen.
 * Nichts wird geschrieben, solange eine Beanstandung offen ist.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { doppelteAbsaetze, fehlendeAnhaltspunkte, stelleFehlt } from './lib/textpruefung.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const COMMENTARY_FILE = join(ROOT, 'src', 'content', 'commentary.ts');
const DATINGS_FILE = join(ROOT, 'src', 'content', 'datings.ts');

const file = process.argv[2];
if (!file) {
  console.error('Aufruf: node scripts/add-commentary.mjs <artikel.mjs>');
  process.exit(2);
}
const { ARTICLES } = await import(resolve(file));

/** Text in ein einzeiliges TypeScript-Literal übersetzen. */
function lit(text) {
  return `'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
}

let commentary = readFileSync(COMMENTARY_FILE, 'utf8');
let datings = readFileSync(DATINGS_FILE, 'utf8');

/* -------------------------------------------------------------- Prüfungen */

const beanstandungen = [];

/**
 * Die Versbereiche des vorhandenen Bestandes.
 *
 * Die Sammlung wird hier nicht gebündelt, sondern gelesen: Die Datei hat ein
 * festes Format, und ein Auszug aus vier Zeilen genügt, um zu wissen, welcher
 * Abschnitt schon belegt ist. Das ist der häufigste Fehler beim Nachtragen –
 * ein neuer Bereich überdeckt einen älteren Artikel zu einem einzelnen Vers.
 */
const belegt = [];
for (const m of commentary.matchAll(
  /^ {4}book: '([^']+)',\n {4}chapter: (\d+),\n {4}from: (\d+),\n {4}to: (\d+),\n {4}title: '((?:[^'\\]|\\.)*)'/gm,
)) {
  belegt.push({
    book: m[1],
    chapter: Number(m[2]),
    from: Number(m[3]),
    to: Number(m[4]),
    title: m[5].replace(/\\'/g, "'"),
  });
}
if (belegt.length === 0) throw new Error('Der Bestand ließ sich nicht lesen');

const PFLICHT = ['book', 'chapter', 'from', 'to', 'title', 'historicalShort', 'historicalLong'];
for (const a of ARTICLES) {
  const key = `${a.book} ${a.chapter},${a.from}`;
  const melde = (text) => beanstandungen.push(`${key}: ${text}`);

  for (const feld of PFLICHT) {
    if (!a[feld]) melde(`"${feld}" fehlt`);
  }
  if (!a.world?.length) melde('keine Notiz zur Welt des Textes');
  if (!a.terms?.length) melde('kein Wort aus dem Urtext');
  if (!a.reception) melde('keine Wirkungsgeschichte');
  if (!a.interpretations || a.interpretations.length < 3) melde('weniger als drei Auslegungen');
  if (!a.dating) melde('keine Datierung');
  if (datings.includes(`  '${key}': {`)) melde('Datierung gibt es schon');
  if (!a.book || !a.chapter || !a.from || !a.to) continue;

  // Der Abschnitt selbst muss es geben, und er muss frei sein.
  const fehler = stelleFehlt(a.book, a.chapter, a.to);
  if (fehler) {
    melde(fehler);
    continue;
  }
  if (a.to < a.from) melde('der Versbereich läuft rückwärts');
  for (const b of belegt) {
    if (b.book === a.book && b.chapter === a.chapter && a.from <= b.to && b.from <= a.to) {
      melde(`überschneidet sich mit "${b.title}" (${b.from}–${b.to})`);
    }
  }
  for (const b of ARTICLES) {
    if (b === a) continue;
    if (b.book === a.book && b.chapter === a.chapter && a.from <= b.to && b.from <= a.to) {
      melde(`überschneidet sich mit "${b.title}" aus demselben Stapel`);
    }
  }

  // Zitate im Titel und Anhaltspunkte der Urtext-Wörter müssen im Bereich stehen.
  for (const was of fehlendeAnhaltspunkte(a)) {
    melde(`${was} steht so nicht in ${a.book} ${a.chapter},${a.from}–${a.to}`);
  }

  // Querverweise, die es nicht gibt, fallen sonst erst am Ende auf.
  for (const ref of a.crossRefs ?? []) {
    const fehlt = stelleFehlt(ref.book, ref.chapter, ref.verse);
    if (fehlt) melde(`Querverweis: ${fehlt}`);
  }

  // Kein Absatz darf wiederholen, was ein anderer schon sagt.
  for (const kette of doppelteAbsaetze(a)) {
    melde(`zwei Absätze sagen dasselbe – „…${kette}…“`);
  }
}

if (beanstandungen.length > 0) {
  console.error(`Nichts geschrieben. ${beanstandungen.length} Beanstandungen:\n`);
  for (const b of beanstandungen) console.error(`  - ${b}`);
  process.exit(1);
}

/* ---------------------------------------------------------------- Artikel */

const bloecke = ARTICLES.map((a) => {
  const zeilen = [
    '  {',
    `    book: ${lit(a.book)},`,
    `    chapter: ${a.chapter},`,
    `    from: ${a.from},`,
    `    to: ${a.to},`,
    `    title: ${lit(a.title)},`,
    '    historicalShort:',
    `      ${lit(a.historicalShort)},`,
    '    historicalLong:',
    `      ${lit(a.historicalLong)},`,
    '    reception:',
    `      ${lit(a.reception)},`,
    '    world: [',
  ];
  for (const w of a.world) {
    zeilen.push('      {', `        aspect: ${lit(w.aspect)},`, `        text: ${lit(w.text)},`, '      },');
  }
  zeilen.push('    ],', '    terms: [');
  for (const t of a.terms) {
    zeilen.push('      {', `        word: ${lit(t.word)},`);
    if (t.rendered) zeilen.push(`        rendered: ${lit(t.rendered)},`);
    zeilen.push(`        note: ${lit(t.note)},`, '      },');
  }
  zeilen.push('    ],', '    interpretations: [');
  for (const i of a.interpretations) {
    zeilen.push('      {', `        tradition: ${lit(i.tradition)},`, `        text: ${lit(i.text)},`, '      },');
  }
  zeilen.push('    ],');
  if (a.crossRefs?.length) {
    zeilen.push('    crossRefs: [');
    for (const x of a.crossRefs) {
      const note = x.note ? `, note: ${lit(x.note)}` : '';
      zeilen.push(`      { book: ${lit(x.book)}, chapter: ${x.chapter}, verse: ${x.verse}${note} },`);
    }
    zeilen.push('    ],');
  }
  zeilen.push('  },');
  return zeilen.join('\n');
});

// Die Sammlung endet mit einer Zeile, die genau `];` lautet.
const ende = commentary.lastIndexOf('\n];');
if (ende < 0) throw new Error('Ende der Sammlung nicht gefunden');
commentary =
  commentary.slice(0, ende) +
  '\n' +
  `  /* ---------------------------------------------- Nachtrag: ${ARTICLES.length} Abschnitte */\n` +
  bloecke.join('\n') +
  commentary.slice(ende);

/* ------------------------------------------------------------ Datierungen */

const dBloecke = ARTICLES.map((a) => {
  const z = [`  '${a.book} ${a.chapter},${a.from}': {`];
  if (a.dating.events) z.push(`    events: ${lit(a.dating.events)},`);
  if (a.dating.written) z.push(`    written: ${lit(a.dating.written)},`);
  if (a.dating.epoch) z.push(`    epoch: ${lit(a.dating.epoch)},`);
  z.push('  },');
  return z.join('\n');
});

const dEnde = datings.lastIndexOf('\n};');
if (dEnde < 0) throw new Error('Ende der Datierungen nicht gefunden');
datings = datings.slice(0, dEnde) + '\n' + dBloecke.join('\n') + datings.slice(dEnde);

writeFileSync(COMMENTARY_FILE, commentary);
writeFileSync(DATINGS_FILE, datings);

const verse = ARTICLES.reduce((n, a) => n + (a.to - a.from + 1), 0);
console.log(
  `Angelegt: ${ARTICLES.length} Artikel zu ${verse} Versen, ` +
    `${ARTICLES.reduce((n, a) => n + a.world.length, 0)} Notizen zur Welt, ` +
    `${ARTICLES.reduce((n, a) => n + a.terms.length, 0)} Urtext-Wörter, ` +
    `${ARTICLES.reduce((n, a) => n + a.interpretations.length, 0)} Auslegungen`,
);
