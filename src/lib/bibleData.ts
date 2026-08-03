import type { BibleIndex, BookContent, BookMeta, VerseRef } from './types';

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

/* ------------------------------------------------- Einzeldatei-Modus */

/**
 * Für die Verteilung als **eine einzige HTML-Datei** (siehe
 * `scripts/build-singlefile.mjs`) wird der gesamte Bibeltext gzip-komprimiert
 * und base64-kodiert in die Seite geschrieben. Liegt eine solche Nutzlast vor,
 * bedient sich die App daraus statt über das Netz – die Datei läuft dann ohne
 * Server und ohne Verbindung.
 */
interface EmbeddedBible {
  index: BibleIndex;
  books: Record<string, BookContent>;
}

declare global {
  interface Window {
    __LUMINA_PAYLOAD__?: string;
  }
}

let embeddedPromise: Promise<EmbeddedBible> | null = null;

function embedded(): Promise<EmbeddedBible> | null {
  const payload = typeof window === 'undefined' ? undefined : window.__LUMINA_PAYLOAD__;
  if (typeof payload !== 'string') return null;

  if (!embeddedPromise) {
    embeddedPromise = (async () => {
      if (typeof DecompressionStream === 'undefined') {
        throw new Error(
          'Dieser Browser kann die eingebettete Textdatei nicht entpacken. ' +
            'Bitte eine aktuelle Version von Chrome, Firefox oder Safari verwenden.',
        );
      }
      const bytes = Uint8Array.from(atob(payload), (c) => c.charCodeAt(0));
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
      return JSON.parse(await new Response(stream).text()) as EmbeddedBible;
    })();
  }
  return embeddedPromise;
}

/** Läuft die App als eigenständige Einzeldatei? */
export function isSingleFile(): boolean {
  return typeof window !== 'undefined' && typeof window.__LUMINA_PAYLOAD__ === 'string';
}

export function loadIndex(): Promise<BibleIndex> {
  const local = embedded();
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
  const local = embedded();
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
