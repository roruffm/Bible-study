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
 * Geprüft wird hier nur die Form: dass Pflichtfelder da sind und dass der
 * Abschnitt nicht schon existiert. Alles Inhaltliche – Stellenangaben, Zitate
 * im Titel, Anhaltspunkte der Urtext-Wörter, doppelte Absätze – prüft
 * `check-references.mjs`.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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

/* ------------------------------------------------------------ Formprüfung */

const PFLICHT = ['book', 'chapter', 'from', 'to', 'title', 'historicalShort', 'historicalLong'];
for (const a of ARTICLES) {
  const key = `${a.book} ${a.chapter},${a.from}`;
  for (const feld of PFLICHT) {
    if (!a[feld]) throw new Error(`${key}: "${feld}" fehlt`);
  }
  // Die Mindesttiefe, die check-references verlangt – hier schon gemeldet,
  // damit der Fehler an der Quelle auftaucht und nicht erst am Ende.
  if (!a.world?.length) throw new Error(`${key}: keine Notiz zur Welt des Textes`);
  if (!a.terms?.length) throw new Error(`${key}: kein Wort aus dem Urtext`);
  if (!a.reception) throw new Error(`${key}: keine Wirkungsgeschichte`);
  if (!a.interpretations || a.interpretations.length < 3) {
    throw new Error(`${key}: weniger als drei Auslegungen`);
  }
  if (!a.dating) throw new Error(`${key}: keine Datierung`);
  if (commentary.includes(`    book: '${a.book}',\n    chapter: ${a.chapter},\n    from: ${a.from},`)) {
    throw new Error(`${key}: gibt es schon`);
  }
  if (datings.includes(`  '${key}': {`)) throw new Error(`${key}: Datierung gibt es schon`);
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
