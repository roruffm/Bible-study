/**
 * Prüft **jede** Stellenangabe der redaktionellen Inhalte gegen den
 * tatsächlichen Bibeltext.
 *
 * Bei mehreren hundert Verweisen auf Bücher, Kapitel und Verse ist ein
 * Zahlendreher nur eine Frage der Zeit – und im fertigen Produkt landet man
 * dann auf einem leeren Kapitel oder am falschen Vers. Das Skript vergleicht
 * alle Angaben mit `public/bibel/<übersetzung>/index.json` und meldet, was
 * nicht existiert.
 *
 * Aufruf: node scripts/check-references.mjs
 * Rückgabewert 1, sobald etwas nicht stimmt – so lässt es sich in eine
 * Prüfkette einhängen.
 */

import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TRANSLATION = process.argv[2] ?? 'luther1912';

const index = JSON.parse(
  readFileSync(join(ROOT, 'public', 'bibel', TRANSLATION, 'index.json'), 'utf8'),
);
const books = new Map(index.books.map((b) => [b.id, b]));

/** Lädt ein TypeScript-Inhaltsmodul, indem es vorher übersetzt wird. */
const temp = mkdtempSync(join(tmpdir(), 'lumina-check-'));
async function loadContent(name) {
  const source = readFileSync(join(ROOT, 'src', 'content', `${name}.ts`), 'utf8');
  const { code } = transformSync(source, { loader: 'ts', format: 'esm' });
  const file = join(temp, `${name}.mjs`);
  writeFileSync(file, code);
  return import(pathToFileURL(file).href);
}

const problems = [];

/** Prüft eine einzelne Stelle. `verse` und `toChapter` sind wahlfrei. */
function check(where, bookId, chapter, verse, options = {}) {
  const book = books.get(bookId);
  if (!book) {
    problems.push(`${where}: Buch "${bookId}" gibt es nicht`);
    return;
  }
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > book.chapters) {
    problems.push(
      `${where}: ${book.name} hat ${book.chapters} Kapitel, angegeben ist ${chapter}`,
    );
    return;
  }
  const verseCount = book.verses[chapter - 1];
  if (verse !== undefined && (verse < 1 || verse > verseCount)) {
    problems.push(
      `${where}: ${book.name} ${chapter} hat ${verseCount} Verse, angegeben ist ${verse}`,
    );
  }
  if (options.toChapter !== undefined && options.toChapter > book.chapters) {
    problems.push(
      `${where}: ${book.name} hat ${book.chapters} Kapitel, Bereich endet bei ${options.toChapter}`,
    );
  }
}

/* --------------------------------------------------------- Lesepläne */

const { READING_PLANS } = await loadContent('readingPlans');
let portionCount = 0;

for (const plan of READING_PLANS) {
  if (!plan.curated) continue;

  if (plan.curated.length !== plan.days) {
    problems.push(
      `Plan "${plan.title}": ${plan.days} Tage angekündigt, ${plan.curated.length} vorhanden`,
    );
  }

  plan.curated.forEach((day, i) => {
    if (day.portions.length === 0) {
      problems.push(`Plan "${plan.title}" Tag ${i + 1}: kein Abschnitt`);
    }
    for (const portion of day.portions) {
      portionCount++;
      const where = `Plan "${plan.title}" Tag ${i + 1}`;
      check(where, portion.book, portion.from, portion.verseFrom, { toChapter: portion.to });
      if (portion.verseTo !== undefined) {
        check(where, portion.book, portion.from, portion.verseTo);
        if (portion.verseFrom !== undefined && portion.verseTo < portion.verseFrom) {
          problems.push(`${where}: Versbereich läuft rückwärts`);
        }
      }
      if (portion.to < portion.from) {
        problems.push(`${where}: Kapitelbereich läuft rückwärts`);
      }
    }
  });
}

/* -------------------------------------------------------- Kommentare */

const { COMMENTARY } = await loadContent('commentary');
for (const entry of COMMENTARY) {
  const where = `Artikel "${entry.title}"`;
  check(where, entry.book, entry.chapter, entry.from);
  check(where, entry.book, entry.chapter, entry.to);
  if (entry.to < entry.from) problems.push(`${where}: Versbereich läuft rückwärts`);
  for (const xref of entry.crossRefs ?? []) {
    check(`${where} (Querverweis)`, xref.book, xref.chapter, xref.verse);
  }
}

/* ----------------------------------------------------------- Lexikon */

const { LEXICON } = await loadContent('lexicon');
for (const entry of LEXICON) {
  for (const ref of entry.refs ?? []) {
    check(`Lexikon "${entry.term}"`, ref.book, ref.chapter, ref.verse);
  }
}

/* --------------------------------------------------------- Zeitleiste */

const { TIMELINE } = await loadContent('timeline');
for (const event of TIMELINE) {
  if (!event.ref) continue;
  check(`Zeitleiste "${event.label}"`, event.ref.book, event.ref.chapter, event.ref.verse);
}

/* ------------------------------------------------------ Vers des Tages */

const { DAILY_VERSES } = await loadContent('verseOfDay');
for (const daily of DAILY_VERSES) {
  check(`Vers des Tages`, daily.ref.book, daily.ref.chapter, daily.ref.verse);
}

/* -------------------------------------------------------------- Ausgabe */

rmSync(temp, { recursive: true, force: true });

const checked =
  portionCount +
  COMMENTARY.length * 2 +
  COMMENTARY.reduce((n, e) => n + (e.crossRefs?.length ?? 0), 0) +
  LEXICON.reduce((n, e) => n + (e.refs?.length ?? 0), 0) +
  TIMELINE.filter((e) => e.ref).length +
  DAILY_VERSES.length;

console.log(`Übersetzung : ${TRANSLATION}`);
console.log(`Geprüft     : ${checked} Stellenangaben`);

if (problems.length === 0) {
  console.log('Ergebnis    : alle Angaben existieren ✓');
} else {
  console.log(`Ergebnis    : ${problems.length} Beanstandungen\n`);
  for (const problem of problems) console.log(`  - ${problem}`);
  process.exitCode = 1;
}
