/**
 * Gemeinsame Prüfungen für Artikeltexte.
 *
 * Dieselben Regeln gelten an zwei Stellen: `add-commentary.mjs` wendet sie an,
 * bevor ein Stapel neuer Artikel in die Sammlung geschrieben wird, und
 * `check-references.mjs` prüft damit den gesamten Bestand. Beide müssen
 * dieselben Maßstäbe anlegen – sonst geht ein Stapel durch, den die
 * Gesamtprüfung hinterher beanstandet, und die Korrektur muss in einer Datei
 * mit über anderthalb Millionen Zeichen erfolgen statt in der Vorlage.
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/** Für den Vergleich: Groß/klein, Umlaute und Zeichensetzung ausblenden. */
export function loose(value) {
  return value
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Wortketten fester Länge, für den Vergleich zweier Absätze.
 *
 * Acht Wörter sind die Grenze, an der Zufall aufhört: Kürzere Überschneidungen
 * ergeben sich bei einem Thema von selbst, längere schreibt niemand zweimal,
 * ohne den ersten Absatz vergessen zu haben.
 */
export const KETTENLAENGE = 8;

export function ketten(text, laenge = KETTENLAENGE) {
  const w = loose(text).split(' ').filter(Boolean);
  const out = new Set();
  for (let i = 0; i + laenge <= w.length; i++) out.add(w.slice(i, i + laenge).join(' '));
  return out;
}

/** Alle Textblöcke eines Artikels, die gegeneinander verglichen werden. */
export function textteile(entry) {
  return [
    entry.historicalShort,
    ...(entry.historicalLong ?? '').split(/\n\s*\n/),
    ...(entry.reception ?? '').split(/\n\s*\n/),
    ...(entry.world ?? []).map((w) => w.text),
  ].filter((t) => t && t.trim());
}

/** Absätze eines Artikels, die dasselbe sagen. Gibt die Fundstellen zurück. */
export function doppelteAbsaetze(entry) {
  const teile = textteile(entry);
  const funde = [];
  const vorab = teile.map((t) => ketten(t));
  for (let a = 0; a < teile.length; a++) {
    for (let b = a + 1; b < teile.length; b++) {
      const gemeinsam = [...vorab[a]].filter((k) => vorab[b].has(k));
      if (gemeinsam.length > 0) funde.push(gemeinsam[0]);
    }
  }
  return funde;
}

/* ------------------------------------------------------------ Bibeltext */

const kapitelCache = new Map();

/** Die Verse eines Buches, aus den aufbereiteten Daten. */
export function kapitelVon(bookId, translation = 'luther1912') {
  const key = `${translation}/${bookId}`;
  if (!kapitelCache.has(key)) {
    const pfad = join(ROOT, 'public', 'bibel', translation, `${bookId}.json`);
    kapitelCache.set(key, JSON.parse(readFileSync(pfad, 'utf8')).chapters);
  }
  return kapitelCache.get(key);
}

/** Der zusammenhängende Text eines Versbereichs, vergleichsfertig geglättet. */
export function abschnittstext(bookId, chapter, from, to, translation = 'luther1912') {
  const kapitel = kapitelVon(bookId, translation);
  return loose((kapitel[chapter - 1] ?? []).slice(from - 1, to).join(' '));
}

let buecherCache = null;

/** Das Verzeichnis der Bücher mit Kapitel- und Verszahlen. */
export function buecher(translation = 'luther1912') {
  if (!buecherCache) {
    const pfad = join(ROOT, 'public', 'bibel', translation, 'index.json');
    buecherCache = new Map(JSON.parse(readFileSync(pfad, 'utf8')).books.map((b) => [b.id, b]));
  }
  return buecherCache;
}

/** Prüft eine Stellenangabe. Gibt eine Beanstandung zurück oder null. */
export function stelleFehlt(bookId, chapter, verse) {
  const buch = buecher().get(bookId);
  if (!buch) return `Buch "${bookId}" gibt es nicht`;
  if (chapter < 1 || chapter > buch.chapters) {
    return `${buch.name} hat kein Kapitel ${chapter}`;
  }
  const anzahl = buch.verses[chapter - 1];
  if (verse != null && (verse < 1 || verse > anzahl)) {
    return `${buch.name} ${chapter} hat nur ${anzahl} Verse, nicht ${verse}`;
  }
  return null;
}

/**
 * Alle Zitate und Anhaltspunkte eines Artikels, die im Versbereich stehen
 * müssen: Bibelworte im Titel und das, was ein Urtext-Wort im deutschen Text
 * benennt.
 */
export function fehlendeAnhaltspunkte(entry) {
  const zitate = [...entry.title.matchAll(/„([^“]{8,})“/g)].map((m) => ({
    was: 'das Zitat im Titel',
    text: m[1],
  }));
  const woerter = (entry.terms ?? [])
    .filter((t) => t.rendered)
    .map((t) => ({ was: `„${t.rendered}“ (zu ${t.word})`, text: t.rendered }));
  const zuPruefen = [...zitate, ...woerter];
  if (zuPruefen.length === 0) return [];

  const abschnitt = abschnittstext(entry.book, entry.chapter, entry.from, entry.to);
  return zuPruefen
    .filter((p) => !abschnitt.includes(loose(p.text.replace(/\s*…\s*$/, ''))))
    .map((p) => p.was);
}
