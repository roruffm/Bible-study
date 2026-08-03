import { embeddedPayload, type MapRegions } from './embedded';

/**
 * Kartengrundlage: Küstenlinien und Seen, bereits auf den Ausschnitt der
 * biblischen Welt zugeschnitten (siehe scripts/build-map-data.mjs).
 *
 * In der Einzeldatei-Fassung steckt sie in der eingebetteten Nutzlast,
 * sonst wird sie einmalig nachgeladen.
 */

let regionsPromise: Promise<MapRegions> | null = null;

export function loadRegions(): Promise<MapRegions> {
  const local = embeddedPayload();
  if (local) {
    return local.then((data) => {
      if (!data.karten) throw new Error('Die eingebettete Datei enthält keine Kartendaten.');
      return data.karten;
    });
  }

  if (!regionsPromise) {
    regionsPromise = fetch(`${import.meta.env.BASE_URL}karten/regionen.json`).then((r) => {
      if (!r.ok) throw new Error(`Kartendaten nicht gefunden (${r.status})`);
      return r.json() as Promise<MapRegions>;
    });
    regionsPromise.catch(() => {
      regionsPromise = null;
    });
  }
  return regionsPromise;
}

export type { MapRegions };
