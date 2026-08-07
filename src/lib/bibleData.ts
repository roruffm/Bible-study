import { embeddedPayload, isSingleFile } from './embedded';
import type { BibleIndex, BookContent, BookMeta, VerseRef } from './types';

export { isSingleFile } from './embedded';

/**
 * Zugriff auf den Bibeltext. Bücher werden einzeln und erst bei Bedarf geladen
 * und danach im Speicher gehalten – so bleibt der erste Seitenaufruf klein,
 * während wiederholtes Blättern ohne Netzwerkzugriff auskommt.
 */

export const TRANSLATION = 'luther1912';

export const TRANSLATION_LABEL = 'Luther 1912';

const BASE = `${import.meta.env.BASE_URL}bibel/${TRANSLATION}`;

let indexPromise: Promise<BibleIndex> | null = null;
const bookPromises = new Map<string, Promise<BookContent>>();

export function loadIndex(): Promise<BibleIndex> {
  const local = embeddedPayload();
  if (local) return local.then((data) => data.index);

  if (!indexPromise) {
    indexPromise = fetch(`${BASE}/index.json`).then((r) => {
      if (!r.ok) throw new Error(`Bibel-Index nicht gefunden (${r.status})`);
      return r.json() as Promise<BibleIndex>;
    });
    // Ein fehlgeschlagener Ladeversuch darf sich nicht dauerhaft festsetzen.
    indexPromise.catch(() => {
      indexPromise = null;
    });
  }
  return indexPromise;
}

export function loadBook(bookId: string): Promise<BookContent> {
  const local = embeddedPayload();
  if (local) {
    return local.then((data) => {
      const book = data.books[bookId];
      if (!book) throw new Error(`Buch "${bookId}" nicht gefunden`);
      return book;
    });
  }

  let promise = bookPromises.get(bookId);
  if (!promise) {
    promise = fetch(`${BASE}/${bookId}.json`).then((r) => {
      if (!r.ok) throw new Error(`Buch "${bookId}" nicht gefunden (${r.status})`);
      return r.json() as Promise<BookContent>;
    });
    promise.catch(() => bookPromises.delete(bookId));
    bookPromises.set(bookId, promise);
  }
  return promise;
}

/* -------------------------------------------------------- Vergleichstext */

/**
 * Neben dem Luthertext liegt eine zweite Übersetzung bereit, die im Vers-Panel
 * zum Vergleich eingeblendet wird. Sie stammt aus demselben Rohdatenbestand und
 * folgt derselben Kapitel- und Verszählung – der Vers mit einer bestimmten
 * Nummer ist in beiden Ausgaben derselbe.
 *
 * Zwei Einschränkungen bleiben: In den Psalmen zählt der deutsche Text die
 * Überschrift zum ersten Vers, die englische Ausgabe setzt sie davor; und an
 * einigen Stellen ziehen die Ausgaben die Versgrenze verschieden. Deshalb kann
 * man im Panel zum Nachbarvers weiterblättern.
 */
export const COMPARISON = 'kjv';

export const COMPARISON_LABEL = 'King James Version';

export const COMPARISON_NOTE = 'Englisch, Ausgabe von 1769 – gemeinfrei';

const COMPARISON_BASE = `${import.meta.env.BASE_URL}bibel/${COMPARISON}`;

const comparisonPromises = new Map<string, Promise<BookContent>>();

/**
 * Steht der Vergleichstext zur Verfügung? In der Einzeldatei-Fassung nicht:
 * Sie trägt nur den Luthertext im Gepäck und würde sonst doppelt so groß.
 */
export function hasComparison(): boolean {
  return !isSingleFile();
}

/** Lädt ein Buch des Vergleichstextes – wie `loadBook`, nur aus dem zweiten Bestand. */
export function loadComparisonBook(bookId: string): Promise<BookContent> {
  if (!hasComparison()) {
    return Promise.reject(new Error('Der Vergleichstext ist in dieser Fassung nicht enthalten.'));
  }

  let promise = comparisonPromises.get(bookId);
  if (!promise) {
    promise = fetch(`${COMPARISON_BASE}/${bookId}.json`).then((r) => {
      if (!r.ok) throw new Error(`Vergleichstext zu "${bookId}" nicht gefunden (${r.status})`);
      return r.json() as Promise<BookContent>;
    });
    promise.catch(() => comparisonPromises.delete(bookId));
    comparisonPromises.set(bookId, promise);
  }
  return promise;
}

/** Lädt alle Bücher – für die Volltextsuche. */
export async function loadAllBooks(
  onProgress?: (loaded: number, total: number) => void,
): Promise<BookContent[]> {
  const index = await loadIndex();
  const total = index.books.length;
  const result: BookContent[] = [];
  let loaded = 0;

  // In Blöcken laden, damit der Browser nicht 66 Anfragen gleichzeitig öffnet.
  const CHUNK = 8;
  for (let i = 0; i < index.books.length; i += CHUNK) {
    const chunk = index.books.slice(i, i + CHUNK);
    const books = await Promise.all(chunk.map((b) => loadBook(b.id)));
    result.push(...books);
    loaded += books.length;
    onProgress?.(loaded, total);
  }
  return result;
}

export function findBook(index: BibleIndex, bookId: string): BookMeta | undefined {
  return index.books.find((b) => b.id === bookId);
}

/** Formatiert eine Stellenangabe, z. B. „Joh 3,16“. */
export function formatRef(book: BookMeta | undefined, ref: VerseRef): string {
  return `${book?.abbr ?? ref.book} ${ref.chapter},${ref.verse}`;
}

export function refKey(ref: VerseRef): string {
  return `${ref.book}.${ref.chapter}.${ref.verse}`;
}

/** Vorheriges bzw. nächstes Kapitel über Buchgrenzen hinweg. */
export function stepChapter(
  index: BibleIndex,
  bookId: string,
  chapter: number,
  direction: 1 | -1,
): { book: string; chapter: number } | null {
  const position = index.books.findIndex((b) => b.id === bookId);
  if (position === -1) return null;
  const book = index.books[position];

  const next = chapter + direction;
  if (next >= 1 && next <= book.chapters) return { book: bookId, chapter: next };

  const neighbour = index.books[position + direction];
  if (!neighbour) return null;
  return {
    book: neighbour.id,
    chapter: direction === 1 ? 1 : neighbour.chapters,
  };
}
