import { PLACES, type MapPlace } from '../content/places';

/**
 * Findet die Orte, die in einem Kapitel vorkommen.
 *
 * Die Karte kennt 188 Orte mit ihren Bibelstellen – das sind aber nur die
 * wichtigsten Stellen je Ort, nicht alle. Wer gerade 1. Samuel 17 liest, soll
 * trotzdem sehen, dass Socho, Aseka und Gath darin genannt werden. Deshalb
 * wird der Kapiteltext direkt gegen die Ortsnamen abgeglichen.
 *
 * Verglichen wird gegen die Schreibweisen, die im Luthertext von 1912
 * tatsächlich stehen (`aliases` in places.ts) – „Beth-El“, „Askalon“,
 * „Beer-Seba“. Namen, die dort überwiegend etwas anderes bezeichnen, sind
 * über `noMatch` ausgenommen.
 */

export interface PlaceMention {
  place: MapPlace;
  /** Verse des Kapitels, in denen der Ort vorkommt (1-basiert). */
  verses: number[];
}

let matcher: { pattern: RegExp; byTerm: Map<string, MapPlace> } | null = null;

export function placeMatcher() {
  if (matcher) return matcher;

  const byTerm = new Map<string, MapPlace>();
  for (const place of PLACES) {
    if (place.noMatch) continue;
    for (const term of [place.name, ...(place.aliases ?? [])]) {
      // Zusätze in Klammern gehören zur Anzeige, nicht zum Text.
      const clean = term.replace(/\s*\(.*\)$/, '').trim();
      if (clean && !byTerm.has(clean)) byTerm.set(clean, place);
    }
  }

  const terms = [...byTerm.keys()].sort((a, b) => b.length - a.length);
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  // Wortgrenzen von Hand, weil \b bei Umlauten unzuverlässig ist.
  const pattern = new RegExp(`(?<![\\wÄÖÜäöüß])(${escaped.join('|')})(?![\\wÄÖÜäöüß])`, 'g');

  matcher = { pattern, byTerm };
  return matcher;
}

/**
 * Alle Orte eines Kapitels, in der Reihenfolge ihres ersten Vorkommens.
 * Nebenwirkungsfrei und damit für `useMemo` geeignet.
 */
export function placesInChapter(verses: string[]): PlaceMention[] {
  const { pattern, byTerm } = placeMatcher();
  const found = new Map<string, PlaceMention>();

  verses.forEach((text, i) => {
    for (const match of text.matchAll(pattern)) {
      const place = byTerm.get(match[0]);
      if (!place) continue;
      const existing = found.get(place.id);
      if (existing) {
        if (!existing.verses.includes(i + 1)) existing.verses.push(i + 1);
      } else {
        found.set(place.id, { place, verses: [i + 1] });
      }
    }
  });

  return [...found.values()];
}
