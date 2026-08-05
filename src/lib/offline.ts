import { loadIndex, TRANSLATION } from './bibleData';

/**
 * Offline-Verfügbarkeit des Bibeltextes.
 *
 * Der Service Worker legt jede gelesene Bibeldatei in einem Laufzeit-Cache ab.
 * Damit ist nach und nach offline verfügbar, was man gelesen hat. Über
 * `downloadAll` lässt sich der gesamte Text auf einmal holen – rund 4 MB, dann
 * funktioniert die App ohne Netzverbindung vollständig.
 */

const CACHE_NAME = 'entgegen-bibeltext';

export function isOfflineSupported(): boolean {
  return typeof navigator !== 'undefined' && 'serviceWorker' in navigator && 'caches' in window;
}

function bookUrl(bookId: string): string {
  return `${import.meta.env.BASE_URL}bibel/${TRANSLATION}/${bookId}.json`;
}

export interface OfflineStatus {
  /** Wie viele Bücher liegen bereits im Cache? */
  cached: number;
  total: number;
  complete: boolean;
}

export async function getOfflineStatus(): Promise<OfflineStatus> {
  const index = await loadIndex();
  const total = index.books.length;

  if (!isOfflineSupported()) return { cached: 0, total, complete: false };

  try {
    const cache = await caches.open(CACHE_NAME);
    const matches = await Promise.all(
      index.books.map((book) => cache.match(bookUrl(book.id))),
    );
    const cached = matches.filter(Boolean).length;
    return { cached, total, complete: cached >= total };
  } catch {
    return { cached: 0, total, complete: false };
  }
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

  const CHUNK = 6;
  for (let i = 0; i < index.books.length; i += CHUNK) {
    const chunk = index.books.slice(i, i + CHUNK);
    await Promise.all(
      chunk.map((book) =>
        fetch(bookUrl(book.id)).catch(() => {
          // Ein einzelner Fehlschlag darf den Gesamtvorgang nicht abbrechen;
          // der Statusbericht am Ende zeigt ohnehin, was wirklich vorliegt.
        }),
      ),
    );
    loaded += chunk.length;
    onProgress?.(loaded, total);
  }

  return getOfflineStatus();
}

/** Entfernt den zwischengespeicherten Bibeltext wieder. */
export async function clearOfflineData(): Promise<void> {
  if (!isOfflineSupported()) return;
  await caches.delete(CACHE_NAME);
}
