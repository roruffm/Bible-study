import { loadAllBooks, loadIndex } from './bibleData';
import type { BookMeta, SearchHit } from './types';

/**
 * Volltextsuche über alle 31.102 Verse. Beim ersten Aufruf wird der komplette
 * Text geladen und ein normalisierter Index aufgebaut; danach läuft jede
 * Suche rein im Speicher und damit auch ohne Netzverbindung.
 */

interface IndexedVerse {
  bookId: string;
  bookName: string;
  bookAbbr: string;
  group: string;
  testament: string;
  chapter: number;
  verse: number;
  text: string;
  /** Kleingeschrieben, ohne Umlaute – für den Vergleich. */
  haystack: string;
}

let corpus: IndexedVerse[] | null = null;
let corpusPromise: Promise<IndexedVerse[]> | null = null;

export interface SearchFilter {
  testament?: 'AT' | 'NT';
  bookId?: string;
}

export function isCorpusReady(): boolean {
  return corpus !== null;
}

export function buildCorpus(
  onProgress?: (loaded: number, total: number) => void,
): Promise<IndexedVerse[]> {
  if (corpus) return Promise.resolve(corpus);
  if (corpusPromise) return corpusPromise;

  corpusPromise = (async () => {
    const index = await loadIndex();
    const metaById = new Map<string, BookMeta>(index.books.map((b) => [b.id, b]));
    const books = await loadAllBooks(onProgress);

    const verses: IndexedVerse[] = [];
    for (const book of books) {
      const meta = metaById.get(book.id);
      book.chapters.forEach((chapterVerses, chapterIdx) => {
        chapterVerses.forEach((text, verseIdx) => {
          if (!text) return;
          verses.push({
            bookId: book.id,
            bookName: book.name,
            bookAbbr: book.abbr,
            group: meta?.group ?? '',
            testament: meta?.testament ?? 'AT',
            chapter: chapterIdx + 1,
            verse: verseIdx + 1,
            text,
            haystack: normalizeForSearch(text),
          });
        });
      });
    }
    corpus = verses;
    return verses;
  })();

  corpusPromise.catch(() => {
    corpusPromise = null;
  });
  return corpusPromise;
}

/** Wie `normalize`, behält aber Wortgrenzen als Leerzeichen. */
function normalizeForSearch(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export interface SearchResult {
  hits: SearchHit[];
  total: number;
  /** Suchbegriffe in normalisierter Form – für die Hervorhebung. */
  terms: string[];
}

export async function search(
  query: string,
  filter: SearchFilter = {},
  limit = 150,
): Promise<SearchResult> {
  const verses = await buildCorpus();

  const phraseMatch = query.trim().match(/^"(.+)"$/);
  const phrase = phraseMatch ? normalizeForSearch(phraseMatch[1]) : null;
  const terms = phrase
    ? [phrase]
    : normalizeForSearch(query).split(' ').filter((t) => t.length > 1);

  if (terms.length === 0) return { hits: [], total: 0, terms: [] };

  const hits: SearchHit[] = [];

  for (const verse of verses) {
    if (filter.testament && verse.testament !== filter.testament) continue;
    if (filter.bookId && verse.bookId !== filter.bookId) continue;

    let score = 0;
    let matchesAll = true;

    for (const term of terms) {
      const position = verse.haystack.indexOf(term);
      if (position === -1) {
        matchesAll = false;
        break;
      }
      // Ganze Wörter wiegen schwerer als Treffer mitten im Wort.
      const isWordStart = position === 0 || verse.haystack[position - 1] === ' ';
      const after = verse.haystack[position + term.length];
      const isWordEnd = after === undefined || after === ' ';
      score += isWordStart && isWordEnd ? 3 : isWordStart ? 2 : 1;
    }

    if (!matchesAll) continue;
    if (phrase) score += 4;
    // Kürzere Verse mit gleicher Trefferzahl sind meist die passenderen.
    score += Math.max(0, 3 - verse.haystack.length / 120);

    hits.push({
      ref: { book: verse.bookId, chapter: verse.chapter, verse: verse.verse },
      bookName: verse.bookName,
      bookAbbr: verse.bookAbbr,
      text: verse.text,
      score,
    });
  }

  const total = hits.length;
  hits.sort((a, b) => b.score - a.score);
  return { hits: hits.slice(0, limit), total, terms };
}

/** Zerlegt einen Verstext in Treffer- und Normalabschnitte. */
export function splitByTerms(text: string, terms: string[]): { text: string; hit: boolean }[] {
  if (terms.length === 0) return [{ text, hit: false }];

  const haystack = normalizeForSearch(text);
  // Die Normalisierung kann die Länge verändern (z. B. "ä" → "ae"); deshalb
  // wird über eine Positionszuordnung zurück auf den Originaltext abgebildet.
  const map: number[] = [];
  let normalized = '';
  for (let i = 0; i < text.length; i++) {
    const piece = normalizeForSearch(text[i]);
    for (let k = 0; k < piece.length; k++) map.push(i);
    normalized += piece;
  }
  // Führende/abschließende Leerzeichen von `haystack` ignorieren wir hier,
  // weil `normalized` zeichenweise aufgebaut wurde.
  void haystack;

  const ranges: [number, number][] = [];
  for (const term of terms) {
    let from = 0;
    for (;;) {
      const at = normalized.indexOf(term, from);
      if (at === -1) break;
      const start = map[at];
      const end = map[Math.min(at + term.length - 1, map.length - 1)] + 1;
      if (start !== undefined) ranges.push([start, end]);
      from = at + term.length;
    }
  }

  if (ranges.length === 0) return [{ text, hit: false }];
  ranges.sort((a, b) => a[0] - b[0]);

  const parts: { text: string; hit: boolean }[] = [];
  let cursor = 0;
  for (const [start, end] of ranges) {
    if (end <= cursor) continue;
    const from = Math.max(start, cursor);
    if (from > cursor) parts.push({ text: text.slice(cursor, from), hit: false });
    parts.push({ text: text.slice(from, end), hit: true });
    cursor = end;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), hit: false });
  return parts;
}

/* ------------------------------------------------------------ Konkordanz */

export interface ConcordanceBook {
  bookId: string;
  bookName: string;
  bookAbbr: string;
  testament: string;
  hits: SearchHit[];
}

export interface Concordance {
  /** Das gesuchte Wort in der Form, in der gezählt wurde. */
  word: string;
  total: number;
  /** Wie viele der 66 Bücher das Wort enthalten. */
  bookCount: number;
  books: ConcordanceBook[];
}

/**
 * Alle Vorkommen eines Wortes, nach Büchern gruppiert.
 *
 * Anders als die Suche sortiert die Konkordanz nicht nach Relevanz, sondern
 * behält die biblische Reihenfolge: Wer wissen will, wie sich der Gebrauch
 * eines Begriffs von der Tora bis zu den Briefen verschiebt, braucht genau
 * diese Reihenfolge – und die Verteilung über die Bücher ist selbst schon
 * eine Aussage.
 *
 * Gezählt wird das **ganze Wort**; „Bund“ trifft nicht „Bundeslade“. Sonst
 * wäre jede Zahl irreführend.
 */
export async function concordance(word: string): Promise<Concordance> {
  const verses = await buildCorpus();
  const needle = normalizeForSearch(word);

  const empty: Concordance = { word: word.trim(), total: 0, bookCount: 0, books: [] };
  if (needle.length < 2) return empty;

  const byBook = new Map<string, ConcordanceBook>();
  let total = 0;

  for (const verse of verses) {
    // Ganze Wörter: Der Vergleich läuft auf der normalisierten Fassung, in
    // der Wörter durch einzelne Leerzeichen getrennt sind.
    const padded = ` ${verse.haystack} `;
    const occurrences = padded.split(` ${needle} `).length - 1;
    if (occurrences === 0) continue;

    total += occurrences;
    let entry = byBook.get(verse.bookId);
    if (!entry) {
      entry = {
        bookId: verse.bookId,
        bookName: verse.bookName,
        bookAbbr: verse.bookAbbr,
        testament: verse.testament,
        hits: [],
      };
      byBook.set(verse.bookId, entry);
    }
    entry.hits.push({
      ref: { book: verse.bookId, chapter: verse.chapter, verse: verse.verse },
      bookName: verse.bookName,
      bookAbbr: verse.bookAbbr,
      text: verse.text,
      score: occurrences,
    });
  }

  return {
    word: word.trim(),
    total,
    bookCount: byBook.size,
    books: [...byBook.values()],
  };
}
