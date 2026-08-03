import type { Highlight, HighlightColor, Note, Settings, VerseRef } from './types';
import { refKey } from './bibleData';

/**
 * Persistenz im Browser. Alle persönlichen Daten – Notizen, Markierungen,
 * Einstellungen, Lesefortschritt – bleiben auf dem Gerät des Nutzers; die App
 * kommt in dieser Ausbaustufe ohne Konto und ohne Server aus.
 *
 * Alle Lesefunktionen liefern **referenziell stabile** Ergebnisse: Solange
 * nichts geschrieben wurde, gibt ein wiederholter Aufruf exakt dasselbe Objekt
 * zurück. Darauf baut `usePersisted` auf – React verlangt für
 * `useSyncExternalStore` stabile Momentaufnahmen, sonst rendert die Komponente
 * endlos neu.
 */

const PREFIX = 'lumina.';

const listeners = new Set<() => void>();

/** Zwischenspeicher für abgeleitete Werte; wird bei jedem Schreibvorgang geleert. */
const memoCache = new Map<string, unknown>();

function memo<T>(key: string, compute: () => T): T {
  if (memoCache.has(key)) return memoCache.get(key) as T;
  const value = compute();
  memoCache.set(key, value);
  return value;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit(): void {
  memoCache.clear();
  for (const listener of listeners) listener();
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Kein Speicherplatz oder privater Modus – die App bleibt trotzdem nutzbar.
  }
  emit();
}

/* ---------------------------------------------------------------- Settings */

export const DEFAULT_SETTINGS: Settings = {
  theme: 'hell',
  fontScale: 1,
  showHeadings: true,
};

/** Ohne eigene Wahl richtet sich die App nach der Einstellung des Systems. */
function preferredTheme(): Settings['theme'] {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dunkel' : 'hell';
  } catch {
    return DEFAULT_SETTINGS.theme;
  }
}

export function getSettings(): Settings {
  return memo('settings', () => ({
    ...DEFAULT_SETTINGS,
    theme: preferredTheme(),
    ...read<Partial<Settings>>('settings', {}),
  }));
}

export function setSettings(patch: Partial<Settings>): void {
  const next = { ...getSettings(), ...patch };
  write('settings', next);
  applySettings(next);
}

export function applySettings(settings: Settings = getSettings()): void {
  document.documentElement.dataset.theme = settings.theme;
  document.documentElement.style.setProperty('--font-scale', String(settings.fontScale));
}

/* ------------------------------------------------------------------- Notes */

export function getNotes(): Note[] {
  return memo('notes', () => read<Note[]>('notes', []));
}

export function getNotesFor(ref: VerseRef): Note[] {
  const key = refKey(ref);
  return memo(`notes:${key}`, () => getNotes().filter((n) => refKey(n.ref) === key));
}

export function saveNote(ref: VerseRef, text: string, id?: string): void {
  const notes = getNotes().map((n) => ({ ...n }));
  const now = Date.now();
  const trimmed = text.trim();

  if (id) {
    const existing = notes.find((n) => n.id === id);
    if (existing) {
      if (!trimmed) return deleteNote(id);
      existing.text = trimmed;
      existing.updatedAt = now;
      write('notes', notes);
      return;
    }
  }
  if (!trimmed) return;
  notes.push({
    id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
    ref,
    text: trimmed,
    createdAt: now,
    updatedAt: now,
  });
  write('notes', notes);
}

export function deleteNote(id: string): void {
  write(
    'notes',
    getNotes().filter((n) => n.id !== id),
  );
}

/* -------------------------------------------------------------- Highlights */

export function getHighlights(): Highlight[] {
  return memo('highlights', () => read<Highlight[]>('highlights', []));
}

export function getHighlight(ref: VerseRef): Highlight | undefined {
  const key = refKey(ref);
  return memo(`highlight:${key}`, () => getHighlights().find((h) => refKey(h.ref) === key));
}

/** Setzt, wechselt oder entfernt (gleiche Farbe erneut) eine Markierung. */
export function toggleHighlight(ref: VerseRef, color: HighlightColor): void {
  const key = refKey(ref);
  const highlights = getHighlights().map((h) => ({ ...h }));
  const existing = highlights.find((h) => refKey(h.ref) === key);

  if (existing && existing.color === color) {
    write(
      'highlights',
      highlights.filter((h) => refKey(h.ref) !== key),
    );
    return;
  }
  if (existing) {
    existing.color = color;
    write('highlights', highlights);
    return;
  }
  highlights.push({ ref, color, createdAt: Date.now() });
  write('highlights', highlights);
}

export function removeHighlight(ref: VerseRef): void {
  const key = refKey(ref);
  write(
    'highlights',
    getHighlights().filter((h) => refKey(h.ref) !== key),
  );
}

/* ------------------------------------------------------- Leseposition/Plan */

export interface LastPosition {
  book: string;
  chapter: number;
  at: number;
}

export function getLastPosition(): LastPosition | null {
  return memo('lastPosition', () => read<LastPosition | null>('lastPosition', null));
}

export function setLastPosition(book: string, chapter: number): void {
  const current = getLastPosition();
  if (current && current.book === book && current.chapter === chapter) return;
  write('lastPosition', { book, chapter, at: Date.now() });
}

/** Gelesene Kapitel als Liste von "buch.kapitel". */
export function getReadChapters(): string[] {
  return memo('readChapters', () => read<string[]>('readChapters', []));
}

export function isChapterRead(book: string, chapter: number): boolean {
  return getReadChapters().includes(`${book}.${chapter}`);
}

export function toggleChapterRead(book: string, chapter: number): void {
  const key = `${book}.${chapter}`;
  const current = getReadChapters();
  write('readChapters', current.includes(key) ? current.filter((k) => k !== key) : [...current, key]);
}

/* ------------------------------------------------------------ Lesepläne */

/** Erledigte Tage je Plan, gespeichert als Null-basierte Tagesnummern. */
type PlanProgress = Record<string, number[]>;

function getPlanProgressAll(): PlanProgress {
  return memo('plans', () => read<PlanProgress>('plans', {}));
}

export function getPlanProgress(planId: string): number[] {
  return memo(`plan:${planId}`, () => getPlanProgressAll()[planId] ?? []);
}

export function isPlanDayDone(planId: string, day: number): boolean {
  return getPlanProgress(planId).includes(day);
}

export function togglePlanDay(planId: string, day: number): void {
  const all = getPlanProgressAll();
  const done = all[planId] ?? [];
  write('plans', {
    ...all,
    [planId]: done.includes(day) ? done.filter((d) => d !== day) : [...done, day].sort((a, b) => a - b),
  });
}

/* ----------------------------------------------------------- Merkverse */

export interface MemoryCard {
  ref: VerseRef;
  /** Der Verstext wird mitgespeichert, damit Lernen ohne Nachladen geht. */
  text: string;
  /** Lernstufe 0–6; sie bestimmt Abstand und Schwierigkeit. */
  level: number;
  /** Zeitpunkt der nächsten Wiederholung. */
  dueAt: number;
  addedAt: number;
}

/** Abstände in Tagen je Lernstufe – klassische Staffelung. */
export const MEMORY_INTERVALS = [0, 1, 3, 7, 16, 35, 90];

export const MEMORY_MAX_LEVEL = MEMORY_INTERVALS.length - 1;

export function getMemoryCards(): MemoryCard[] {
  return memo('memory', () => read<MemoryCard[]>('memory', []));
}

export function getMemoryCard(ref: VerseRef): MemoryCard | undefined {
  const key = refKey(ref);
  return memo(`memory:${key}`, () => getMemoryCards().find((c) => refKey(c.ref) === key));
}

/**
 * Karten, deren Wiederholung ansteht. Bewusst ohne Memoisierung: Das Ergebnis
 * hängt an der Uhrzeit und wäre deshalb nicht stabil zwischenspeicherbar.
 * Komponenten leiten es per `useMemo` aus `getMemoryCards()` ab.
 */
export function dueCards(cards: MemoryCard[], now = Date.now()): MemoryCard[] {
  return cards.filter((c) => c.dueAt <= now).sort((a, b) => a.dueAt - b.dueAt);
}

export function addMemoryCard(ref: VerseRef, text: string): void {
  if (getMemoryCard(ref)) return;
  const now = Date.now();
  write('memory', [...getMemoryCards(), { ref, text, level: 0, dueAt: now, addedAt: now }]);
}

export function removeMemoryCard(ref: VerseRef): void {
  const key = refKey(ref);
  write(
    'memory',
    getMemoryCards().filter((c) => refKey(c.ref) !== key),
  );
}

/**
 * Bewertet eine Karte. Bei „gewusst“ rückt sie eine Stufe vor und wird
 * entsprechend später wieder fällig; sonst fällt sie eine Stufe zurück und
 * kommt noch in derselben Sitzung erneut.
 */
export function reviewMemoryCard(ref: VerseRef, known: boolean): void {
  const key = refKey(ref);
  const now = Date.now();

  write(
    'memory',
    getMemoryCards().map((card) => {
      if (refKey(card.ref) !== key) return card;
      if (!known) {
        return { ...card, level: Math.max(0, card.level - 1), dueAt: now + 10 * 60_000 };
      }
      const level = Math.min(MEMORY_MAX_LEVEL, card.level + 1);
      return { ...card, level, dueAt: now + MEMORY_INTERVALS[level] * 86_400_000 };
    }),
  );
}

/** Der Plan, den die Startseite anzeigt. */
export function getActivePlan(): string | null {
  return memo('activePlan', () => read<string | null>('activePlan', null));
}

export function setActivePlan(planId: string | null): void {
  write('activePlan', planId);
}

/**
 * Der nächste offene Tag eines Plans – das ist der Abschnitt, den die App
 * als „heute dran“ anbietet. Ist alles erledigt, wird `null` geliefert.
 */
export function nextOpenDay(planId: string, totalDays: number): number | null {
  const done = new Set(getPlanProgress(planId));
  for (let day = 0; day < totalDays; day++) {
    if (!done.has(day)) return day;
  }
  return null;
}
