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

import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';
import { buildSync } from 'esbuild';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TRANSLATION = process.argv[2] ?? 'luther1912';

const index = JSON.parse(
  readFileSync(join(ROOT, 'public', 'bibel', TRANSLATION, 'index.json'), 'utf8'),
);
const books = new Map(index.books.map((b) => [b.id, b]));

/**
 * Lädt ein Inhaltsmodul. Es wird gebündelt statt nur übersetzt, damit auch
 * Module mit eigenen Importen (etwa lexicon → realia) auflösbar bleiben.
 */
const temp = mkdtempSync(join(tmpdir(), 'entgegen-check-'));
async function loadContent(name) {
  const file = join(temp, `${name}.mjs`);
  buildSync({
    entryPoints: [join(ROOT, 'src', 'content', `${name}.ts`)],
    outfile: file,
    bundle: true,
    format: 'esm',
    platform: 'neutral',
    logLevel: 'silent',
  });
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

/*
 * Zwei Artikel zu demselben Abschnitt sind fast immer ein Versehen: Im
 * Vers-Panel erschienen sie untereinander, und beide beanspruchten dieselbe
 * Datierung. Überlappende Versbereiche im selben Kapitel fallen genauso auf.
 */
{
  const gesehen = new Map();
  for (const entry of COMMENTARY) {
    const key = `${entry.book} ${entry.chapter},${entry.from}`;
    if (gesehen.has(key)) {
      problems.push(
        `Artikel "${entry.title}": beginnt an derselben Stelle wie "${gesehen.get(key)}"`,
      );
    } else {
      gesehen.set(key, entry.title);
    }
  }

  const proKapitel = new Map();
  for (const entry of COMMENTARY) {
    const key = `${entry.book} ${entry.chapter}`;
    if (!proKapitel.has(key)) proKapitel.set(key, []);
    proKapitel.get(key).push(entry);
  }
  for (const list of proKapitel.values()) {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i];
        const b = list[j];
        if (a.from <= b.to && b.from <= a.to) {
          problems.push(
            `Artikel "${a.title}" (${a.from}–${a.to}) und "${b.title}" (${b.from}–${b.to}) ` +
              `überschneiden sich in ${a.book} ${a.chapter}`,
          );
        }
      }
    }
  }
}

/* ----------------------------------------------------------- Lexikon */

const { LEXICON } = await loadContent('lexicon');
for (const entry of LEXICON) {
  for (const ref of entry.refs ?? []) {
    check(`Lexikon "${entry.term}"`, ref.book, ref.chapter, ref.verse);
  }
}

/* -------------------------------------------------------------- Karte */

const { PLACES, MAP_VIEWS } = await loadContent('places');
const placeIds = new Set();
for (const place of PLACES) {
  if (placeIds.has(place.id)) problems.push(`Ort "${place.name}": Kennung "${place.id}" doppelt`);
  placeIds.add(place.id);

  // Der erste Ausschnitt ist die Gesamtkarte – wer dort nicht hineinfällt,
  // ist auf keiner Ansicht zu sehen.
  const [lon, lat] = place.coords;
  const [w, s, e, n] = MAP_VIEWS[0].bounds;
  if (lon < w || lon > e || lat < s || lat > n) {
    problems.push(`Ort "${place.name}": liegt außerhalb des Kartenausschnitts`);
  }

  if (!place.refs || place.refs.length === 0) {
    problems.push(`Ort "${place.name}": keine Bibelstelle hinterlegt`);
  }
  for (const ref of place.refs ?? []) {
    check(`Ort "${place.name}"`, ref.book, ref.chapter, ref.verse);
  }
}

/*
 * Die Luther-Schreibweisen müssen im Text tatsächlich vorkommen – sonst
 * greift der Abgleich in der Leseansicht ins Leere und niemand merkt es.
 * Geprüft wird gegen den vollständigen Bibeltext.
 */
const chapterText = new Map();
let placeChapters = 0;
for (const book of index.books) {
  const data = JSON.parse(readFileSync(join(ROOT, 'public', 'bibel', TRANSLATION, `${book.id}.json`), 'utf8'));
  data.chapters.forEach((verses, i) => chapterText.set(`${book.id} ${i + 1}`, verses.join(' ')));
}
const allText = [...chapterText.values()].join(' ');

function occurrences(term) {
  const clean = term.replace(/\s*\(.*\)$/, '').trim();
  const escaped = clean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(?<![\\wÄÖÜäöüß])${escaped}(?![\\wÄÖÜäöüß])`, 'g');
  return (allText.match(re) ?? []).length;
}

for (const place of PLACES) {
  for (const alias of place.aliases ?? []) {
    if (occurrences(alias) === 0) {
      problems.push(`Ort "${place.name}": Schreibweise "${alias}" kommt im Text nicht vor`);
    }
  }
}

// Wie viele Kapitel bekommen dadurch einen Kartenbezug?
{
  const terms = new Map();
  for (const place of PLACES) {
    if (place.noMatch) continue;
    for (const term of [place.name, ...(place.aliases ?? [])]) {
      const clean = term.replace(/\s*\(.*\)$/, '').trim();
      if (clean && !terms.has(clean)) terms.set(clean, place);
    }
  }
  const escaped = [...terms.keys()]
    .sort((a, b) => b.length - a.length)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(?<![\\wÄÖÜäöüß])(${escaped.join('|')})(?![\\wÄÖÜäöüß])`);
  for (const text of chapterText.values()) if (re.test(text)) placeChapters++;
}

// Ein `lexicon`-Verweis muss den Eintrag auch treffen.
const lexiconIds = new Set((await loadContent('lexicon')).LEXICON.map((e) => e.id));
for (const place of PLACES) {
  if (place.lexicon && !lexiconIds.has(place.lexicon)) {
    problems.push(`Ort "${place.name}": Lexikoneintrag "${place.lexicon}" gibt es nicht`);
  }
}

// Jede Route muss auf ein Kapitel zeigen, das es gibt.
const { JOURNEYS } = await loadContent('journeys');
for (const journey of JOURNEYS) {
  check(`Route "${journey.title}"`, journey.ref.book, journey.ref.chapter);
  if (journey.stops.length < 2) problems.push(`Route "${journey.title}": zu wenige Stationen`);
  for (const stop of journey.stops) {
    const [lon, lat] = stop.coords;
    const [w, s, e, n] = MAP_VIEWS[0].bounds;
    if (lon < w || lon > e || lat < s || lat > n) {
      problems.push(`Route "${journey.title}", Station "${stop.name}": außerhalb der Karte`);
    }
  }
}

/* --------------------------------------------------------- Zeitleiste */

const { TIMELINE } = await loadContent('timeline');
for (const event of TIMELINE) {
  if (event.ref) {
    check(`Zeitleiste "${event.label}"`, event.ref.book, event.ref.chapter, event.ref.verse);
  }
  // Der Ortsbezug verbindet Zeitleiste und Karte – ein Tippfehler darin
  // führte auf eine leere Kartentafel.
  if (event.place && !placeIds.has(event.place)) {
    problems.push(`Zeitleiste "${event.label}": Ort "${event.place}" gibt es nicht`);
  }
}

/* ---------------------------------------------------------- Synopse */

const { SYNOPSIS, SYNOPSIS_SECTIONS, GOSPELS } = await loadContent('synopsis');
const pericopeIds = new Set();
let synopsisRefs = 0;

for (const pericope of SYNOPSIS) {
  const where = `Perikope "${pericope.title}"`;
  if (pericopeIds.has(pericope.id)) problems.push(`${where}: Kennung doppelt`);
  pericopeIds.add(pericope.id);

  if (!SYNOPSIS_SECTIONS.includes(pericope.section)) {
    problems.push(`${where}: Abschnitt "${pericope.section}" ist nicht vorgesehen`);
  }

  let columns = 0;
  for (const gospel of GOSPELS) {
    const passage = pericope[gospel.key];
    if (!passage) continue;
    columns++;
    synopsisRefs += 2;
    check(`${where} (${gospel.label})`, gospel.id, passage.chapter, passage.from);
    check(`${where} (${gospel.label})`, gospel.id, passage.chapter, passage.to);
    if (passage.to < passage.from) {
      problems.push(`${where} (${gospel.label}): Versbereich läuft rückwärts`);
    }
  }
  if (columns === 0) problems.push(`${where}: keine einzige Stelle angegeben`);
}

/*
 * Zwei Fehler, die beim Schreiben leicht passieren und im fertigen Vergleich
 * sofort auffallen:
 *
 * 1. Ein Abschnitt beginnt mitten im Satz. In der Gegenüberstellung steht
 *    dann eine Spalte, die mit einem Kleinbuchstaben anfängt.
 * 2. Eine Anmerkung zitiert etwas, das im Text so nicht steht. Bei einer
 *    Übersetzung von 1912 ist das schnell passiert – „darnach“ statt
 *    „danach“, „Hebe dich“ statt „Weiche von mir“.
 */
const gospelText = new Map();
for (const gospel of GOSPELS) {
  const data = JSON.parse(
    readFileSync(join(ROOT, 'public', 'bibel', TRANSLATION, `${gospel.id}.json`), 'utf8'),
  );
  gospelText.set(gospel.id, data.chapters);
}

/** Für den Vergleich: Groß/klein, Umlaute und Zeichensetzung ausblenden. */
function loose(value) {
  return value
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

for (const pericope of SYNOPSIS) {
  const where = `Perikope "${pericope.title}"`;
  let volltext = '';

  for (const gospel of GOSPELS) {
    const passage = pericope[gospel.key];
    if (!passage) continue;
    const verses = gospelText.get(gospel.id)[passage.chapter - 1] ?? [];
    const erster = verses[passage.from - 1] ?? '';
    if (/^[a-zäöüß]/.test(erster)) {
      problems.push(
        `${where} (${gospel.label} ${passage.chapter},${passage.from}): beginnt mitten im Satz`,
      );
    }
    volltext += ' ' + verses.slice(passage.from - 1, passage.to).join(' ');
  }

  // Zitate in der Anmerkung müssen in einer der Spalten wirklich stehen.
  for (const zitat of (pericope.note ?? '').matchAll(/„([^“]{15,})“/g)) {
    const gesucht = loose(zitat[1].replace(/\s*…\s*$/, ''));
    if (!loose(volltext).includes(gesucht)) {
      problems.push(`${where}: Zitat „${zitat[1]}“ steht so in keinem der Abschnitte`);
    }
  }
}

/* ----------------------------------------------- Zitate in Artikeltiteln */

/*
 * Viele Artikel tragen ein Bibelwort als Titel. Steht dort eine leicht
 * geglättete oder aus dem Gedächtnis zitierte Fassung, führt das in die Irre:
 * Der Leser sucht den Satz im Kapitel darunter und findet ihn nicht. Deshalb
 * muss jedes Zitat in Anführungszeichen wörtlich im Versbereich des Artikels
 * stehen – Zeichensetzung und Groß/klein ausgenommen.
 */
for (const entry of COMMENTARY) {
  const zitate = [...entry.title.matchAll(/„([^“]{8,})“/g)];
  // Dasselbe gilt für den Anhaltspunkt, den ein Urtext-Wort im deutschen Text
  // nennt: Wer „bei Luther ‚schuf‘“ liest, muss „schuf“ im Abschnitt finden.
  const woerter = (entry.terms ?? []).filter((t) => t.rendered);
  if (zitate.length === 0 && woerter.length === 0) continue;

  const data = JSON.parse(
    readFileSync(join(ROOT, 'public', 'bibel', TRANSLATION, `${entry.book}.json`), 'utf8'),
  );
  const abschnitt = loose(
    (data.chapters[entry.chapter - 1] ?? []).slice(entry.from - 1, entry.to).join(' '),
  );

  for (const zitat of zitate) {
    if (!abschnitt.includes(loose(zitat[1].replace(/\s*…\s*$/, '')))) {
      problems.push(
        `Artikel "${entry.title}": das Zitat steht so nicht in ${entry.book} ${entry.chapter},${entry.from}–${entry.to}`,
      );
    }
  }
  for (const term of woerter) {
    if (!abschnitt.includes(loose(term.rendered))) {
      problems.push(
        `Artikel "${entry.title}": „${term.rendered}“ (zu ${term.word}) steht so nicht in ` +
          `${entry.book} ${entry.chapter},${entry.from}–${entry.to}`,
      );
    }
  }
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
  PLACES.reduce((n, p) => n + p.refs.length, 0) +
  JOURNEYS.length +
  TIMELINE.filter((e) => e.ref).length +
  synopsisRefs +
  DAILY_VERSES.length;

/* ------------------------------------------------ Mindesttiefe */

// Was einmal erreicht ist, soll nicht unbemerkt wieder wegfallen: Jeder
// Artikel braucht einen ausführlichen Teil und mindestens drei Auslegungen
// aus verschiedenen Traditionen.
for (const entry of COMMENTARY) {
  if (!entry.historicalLong) {
    problems.push(`Artikel "${entry.title}": kein ausführlicher Kontext`);
  }
  if (entry.interpretations.length < 3) {
    problems.push(
      `Artikel "${entry.title}": nur ${entry.interpretations.length} Auslegungen (mindestens 3)`,
    );
  }
  const traditionen = new Set(entry.interpretations.map((i) => i.tradition));
  if (traditionen.size !== entry.interpretations.length) {
    problems.push(`Artikel "${entry.title}": Tradition doppelt genannt`);
  }
  for (const term of entry.terms ?? []) {
    // Ohne Sprachangabe steht ein fremdes Wort ohne Anhaltspunkt da.
    if (!/^(hebr\.|aram\.|griech\.|lat\.)/.test(term.word)) {
      problems.push(`Artikel "${entry.title}": „${term.word}“ ohne Sprachangabe`);
    }
  }
}

/*
 * Kein Absatz darf wiederholen, was ein anderer im selben Artikel schon sagt.
 *
 * Beim Nachtragen von Absätzen ist genau das passiert: Wer den bestehenden
 * Text nicht daneben legt, schreibt ihn ein zweites Mal. Für den Leser sieht
 * das aus wie ein Fehler in der App, und es ist auch einer. Verglichen werden
 * Ketten von acht Wörtern – kürzere Übereinstimmungen sind bei einem Thema
 * unvermeidlich, längere sind es nicht.
 */
{
  const KETTE = 8;
  const ketten = (text) => {
    const w = loose(text).split(' ').filter(Boolean);
    const out = new Set();
    for (let i = 0; i + KETTE <= w.length; i++) out.add(w.slice(i, i + KETTE).join(' '));
    return out;
  };
  for (const entry of COMMENTARY) {
    const teile = [
      entry.historicalShort,
      ...(entry.historicalLong ?? '').split(/\n\s*\n/),
      ...(entry.reception ?? '').split(/\n\s*\n/),
    ].filter((t) => t && t.trim());
    for (let a = 0; a < teile.length; a++) {
      for (let b = a + 1; b < teile.length; b++) {
        const gemeinsam = [...ketten(teile[a])].filter((k) => ketten(teile[b]).has(k));
        if (gemeinsam.length > 0) {
          problems.push(
            `Artikel "${entry.title}": zwei Absätze sagen dasselbe – „…${gemeinsam[0]}…“`,
          );
        }
      }
    }
  }
}

// Jedes Buch braucht Standardliteratur – sie ist der Rückfall für alle
// Artikel, die nichts Eigenes nennen, und für Verse ganz ohne Artikel.
const { BOOK_PROFILES } = await loadContent('bookProfiles');
for (const book of index.books) {
  const profile = BOOK_PROFILES[book.id];
  if (!profile) {
    problems.push(`Buch "${book.name}": kein Steckbrief`);
  } else if (!profile.literature?.length) {
    problems.push(`Buch "${book.name}": keine Literaturangabe im Steckbrief`);
  }
}

/* ------------------------------------------- Zeitliche Einordnung */

const { DATINGS, datingKey } = await loadContent('datings');
const missingDating = COMMENTARY.filter(
  (e) => !DATINGS[datingKey(e.book, e.chapter, e.from)],
);
for (const entry of missingDating) {
  problems.push(`Artikel "${entry.title}": keine zeitliche Einordnung hinterlegt`);
}

// Umgekehrt: verwaiste Datierungen zeigen auf einen Artikel, den es nicht gibt.
const articleKeys = new Set(COMMENTARY.map((e) => datingKey(e.book, e.chapter, e.from)));
for (const key of Object.keys(DATINGS)) {
  if (!articleKeys.has(key)) problems.push(`Datierung "${key}": kein passender Artikel`);
}

// Die Epoche muss es in der Zeitleiste geben, sonst geht der Sprung ins Leere.
const { EPOCHS } = await loadContent('timeline');
const epochIds = new Set(EPOCHS.map((e) => e.id));
for (const [key, dating] of Object.entries(DATINGS)) {
  if (dating.epoch && !epochIds.has(dating.epoch)) {
    problems.push(`Datierung "${key}": Epoche "${dating.epoch}" gibt es nicht`);
  }
}

/* ------------------------------------------------------- Abdeckung */

const booksWithArticle = new Set(COMMENTARY.map((e) => e.book));
const withoutArticle = index.books.filter((b) => !booksWithArticle.has(b.id));
const versesWithArticle = COMMENTARY.reduce((n, e) => n + (e.to - e.from + 1), 0);
const interpretations = COMMENTARY.reduce((n, e) => n + e.interpretations.length, 0);

console.log(`Übersetzung : ${TRANSLATION}`);
console.log(`Geprüft     : ${checked} Stellenangaben`);
console.log(
  `Artikel     : ${COMMENTARY.length} zu ${versesWithArticle} Versen, ` +
    `${interpretations} Auslegungen`,
);
console.log(
  `Bücher      : ${booksWithArticle.size} von ${index.books.length} haben einen Artikel` +
    (withoutArticle.length > 0 ? ` (ohne: ${withoutArticle.map((b) => b.name).join(', ')})` : ''),
);
console.log(
  `Datierungen : ${COMMENTARY.length - missingDating.length} von ${COMMENTARY.length} Artikeln`,
);
{
  const vier = COMMENTARY.filter((e) => e.interpretations.length >= 4).length;
  const traditionen = new Set(COMMENTARY.flatMap((e) => e.interpretations.map((i) => i.tradition)));
  console.log(
    `Auslegungen : ${interpretations} aus ${traditionen.size} Traditionen, ` +
      `${vier} Artikel mit vier oder mehr`,
  );
}
{
  // Umfang des Fließtextes – die Zahl, an der sich ablesen lässt, ob die
  // Artikel wirklich wachsen oder nur mehr werden.
  const zeichen = COMMENTARY.reduce(
    (n, e) =>
      n +
      e.historicalShort.length +
      (e.historicalLong?.length ?? 0) +
      (e.reception?.length ?? 0) +
      e.interpretations.reduce((m, i) => m + i.text.length, 0) +
      (e.terms ?? []).reduce((m, t) => m + t.note.length, 0),
    0,
  );
  const mitUrtext = COMMENTARY.filter((e) => e.terms?.length).length;
  const mitWirkung = COMMENTARY.filter((e) => e.reception).length;
  console.log(
    `Umfang      : ${Math.round(zeichen / 1000)} Tsd. Zeichen Artikeltext, ` +
      `im Schnitt ${Math.round(zeichen / COMMENTARY.length)} je Artikel`,
  );
  console.log(
    `Vertiefung  : ${mitUrtext} Artikel mit Urtext-Wörtern, ` +
      `${mitWirkung} mit Wirkungsgeschichte`,
  );
}
console.log(
  `Karte       : ${PLACES.length} Orte und ${JOURNEYS.length} Wege, ` +
    `${PLACES.filter((p) => p.long).length} Orte mit Hintergrundtext`,
);
console.log(
  `Ortsbezug   : ${placeChapters} von ${chapterText.size} Kapiteln nennen einen Ort der Karte`,
);
console.log(
  `Zeit + Ort  : ${TIMELINE.filter((e) => e.place).length} von ${TIMELINE.length} Ereignissen sind verortet`,
);
{
  const mehrfach = SYNOPSIS.filter(
    (p) => GOSPELS.filter((g) => p[g.key]).length > 1,
  ).length;
  console.log(
    `Synopse     : ${SYNOPSIS.length} Abschnitte, ${mehrfach} davon in mehreren Evangelien`,
  );
}

if (problems.length === 0) {
  console.log('Ergebnis    : alle Angaben existieren ✓');
} else {
  console.log(`Ergebnis    : ${problems.length} Beanstandungen\n`);
  for (const problem of problems) console.log(`  - ${problem}`);
  process.exitCode = 1;
}
