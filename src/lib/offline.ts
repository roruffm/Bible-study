import { COMPARISON, hasComparison, loadIndex, TRANSLATION } from './bibleData';
import { getSettings } from './storage';

/**
 * Offline-Verfügbarkeit des Bibeltextes.
 *
 * Der Service Worker legt jede gelesene Bibeldatei in einem Laufzeit-Cache ab.
 * Damit ist nach und nach offline verfügbar, was man gelesen hat. Über
 * `downloadAll` lässt sich der gesamte Text auf einmal holen; dann funktioniert
 * die App ohne Netzverbindung vollständig.
 *
 * Ist der englische Vergleichstext eingeschaltet, gehört er dazu – sonst fehlte
 * offline genau das, was im Vers-Panel sichtbar ist. Das verdoppelt die
 * Datenmenge auf rund 8 MB. Wer den Vergleich abgeschaltet hat, lädt weiterhin
 * nur den deutschen Text.
 */

const CACHE_NAME = 'entgegen-bibeltext';

export function isOfflineSupported(): boolean {
  return typeof navigator !== 'undefined' && 'serviceWorker' in navigator && 'caches' in window;
}

function bookUrl(bookId: string, translation: string = TRANSLATION): string {
  return `${import.meta.env.BASE_URL}bibel/${translation}/${bookId}.json`;
}

/** Welche Übersetzungen gehören zum Offline-Bestand? */
function translations(): string[] {
  return hasComparison() && getSettings().showComparison
    ? [TRANSLATION, COMPARISON]
    : [TRANSLATION];
}

/** Ein Buch zählt erst als vorhanden, wenn alle seine Dateien im Cache liegen. */
function urlsFor(bookId: string): string[] {
  return translations().map((t) => bookUrl(bookId, t));
}

export interface OfflineStatus {
  /** Wie viele Bücher liegen bereits im Cache? */
  cached: number;
  total: number;
  complete: boolean;
}

/** Bücher, von denen noch mindestens eine Datei fehlt. */
async function missingBooks(): Promise<string[]> {
  const index = await loadIndex();
  if (!isOfflineSupported()) return index.books.map((b) => b.id);

  try {
    const cache = await caches.open(CACHE_NAME);
    const geprueft = await Promise.all(
      index.books.map(async (book) => {
        const found = await Promise.all(urlsFor(book.id).map((url) => cache.match(url)));
        return found.every(Boolean) ? null : book.id;
      }),
    );
    return geprueft.filter((id): id is string => id !== null);
  } catch {
    return index.books.map((b) => b.id);
  }
}

export async function getOfflineStatus(): Promise<OfflineStatus> {
  const index = await loadIndex();
  const total = index.books.length;

  if (!isOfflineSupported()) return { cached: 0, total, complete: false };

  const fehlend = await missingBooks();
  const cached = total - fehlend.length;
  return { cached, total, complete: fehlend.length === 0 };
}

/**
 * Lädt alle Bücher, sodass der Service Worker sie in den Cache legt.
 * Meldet den Fortschritt nach jedem Block.
 */
export async function downloadAll(
  onProgress?: (loaded: number, total: number) => void,
): Promise<OfflineStatus> {
  const index = await loadIndex();
  const total = index.books.length;
  let loaded = 0;

  const holen = (bookId: string) =>
    urlsFor(bookId).map((url) =>
      fetch(url).catch(() => {
        // Ein einzelner Fehlschlag darf den Gesamtvorgang nicht abbrechen;
        // der Statusbericht am Ende zeigt ohnehin, was wirklich vorliegt.
      }),
    );

  const CHUNK = 6;
  for (let i = 0; i < index.books.length; i += CHUNK) {
    const chunk = index.books.slice(i, i + CHUNK);
    await Promise.all(chunk.flatMap((book) => holen(book.id)));
    loaded += chunk.length;
    onProgress?.(loaded, total);
  }

  // Der Service Worker legt eine Antwort erst ab, nachdem er sie ausgeliefert
  // hat. Unmittelbar nach dem letzten Abruf kann im Cache deshalb noch etwas
  // fehlen, obwohl alles geholt wurde. Also nachsehen, kurz warten und
  // Fehlendes ein zweites Mal anfordern, bevor ein Ergebnis gemeldet wird.
  let status = await getOfflineStatus();
  for (let versuch = 0; versuch < 3 && !status.complete; versuch++) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const fehlend = await missingBooks();
    if (fehlend.length > 0) await Promise.all(fehlend.flatMap(holen));
    status = await getOfflineStatus();
  }

  return status;
}

/** Entfernt den zwischengespeicherten Bibeltext wieder. */
export async function clearOfflineData(): Promise<void> {
  if (!isOfflineSupported()) return;
  await caches.delete(CACHE_NAME);
}
