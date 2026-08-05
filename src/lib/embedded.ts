import type { BibleIndex, BookContent } from './types';

/**
 * Eingebettete Daten für die Einzeldatei-Fassung.
 *
 * `scripts/build-singlefile.mjs` schreibt den gesamten Bibeltext und die
 * Kartengrundlage gzip-komprimiert und base64-kodiert in die Seite. Liegt eine
 * solche Nutzlast vor, bedient sich die App daraus statt über das Netz – die
 * Datei läuft dann ohne Server und ohne Verbindung.
 *
 * Entpackt wird genau einmal; alle Aufrufer teilen sich dasselbe Versprechen.
 */

export interface MapRegions {
  box: { west: number; east: number; south: number; north: number };
  land: [number, number][][];
  seen: [number, number][][];
}

export interface EmbeddedPayload {
  index: BibleIndex;
  books: Record<string, BookContent>;
  karten?: MapRegions;
}

declare global {
  interface Window {
    __ENTGEGEN_PAYLOAD__?: string;
  }
}

let decoded: Promise<EmbeddedPayload> | null = null;

/** Läuft die App als eigenständige Einzeldatei? */
export function isSingleFile(): boolean {
  return typeof window !== 'undefined' && typeof window.__ENTGEGEN_PAYLOAD__ === 'string';
}

/** Die eingebetteten Daten – oder `null`, wenn normal über das Netz geladen wird. */
export function embeddedPayload(): Promise<EmbeddedPayload> | null {
  const payload = typeof window === 'undefined' ? undefined : window.__ENTGEGEN_PAYLOAD__;
  if (typeof payload !== 'string') return null;

  if (!decoded) {
    decoded = (async () => {
      if (typeof DecompressionStream === 'undefined') {
        throw new Error(
          'Dieser Browser kann die eingebetteten Daten nicht entpacken. ' +
            'Bitte eine aktuelle Version von Chrome, Firefox oder Safari verwenden.',
        );
      }
      const bytes = Uint8Array.from(atob(payload), (c) => c.charCodeAt(0));
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
      return JSON.parse(await new Response(stream).text()) as EmbeddedPayload;
    })();
  }
  return decoded;
}
