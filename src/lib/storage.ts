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

export function getSettings(): Settings {
  return memo('settings', () => ({
    ...DEFAULT_SETTINGS,
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
