export type Testament = 'AT' | 'NT';

export interface GroupMeta {
  id: string;
  label: string;
  testament: Testament;
}

export interface BookMeta {
  id: string;
  name: string;
  abbr: string;
  group: string;
  testament: Testament;
  /** Anzahl der Kapitel */
  chapters: number;
  /** Anzahl der Verse je Kapitel, Index 0 = Kapitel 1 */
  verses: number[];
}

export interface BibleIndex {
  translation: string;
  groups: GroupMeta[];
  books: BookMeta[];
}

export interface BookContent {
  id: string;
  name: string;
  abbr: string;
  /** chapters[k][v] = Text von Kapitel k+1, Vers v+1 */
  chapters: string[][];
  /**
   * Abweichende Zählung der gedruckten Lutherbibel, Schlüssel „kapitel.vers“.
   * Der Datenbestand folgt der englischen Zählung; wo beide auseinandergehen,
   * steht hier die Luther-Angabe, etwa „3,1“ für Joel 2,28.
   */
  alt?: Record<string, string>;
}

/** Verweis auf einen einzelnen Vers. */
export interface VerseRef {
  book: string;
  chapter: number;
  verse: number;
}

/** Ergebnis der Referenz-Eingabe: Kapitel, optional mit Versbereich. */
export interface ParsedReference {
  book: BookMeta;
  chapter: number;
  verseFrom?: number;
  verseTo?: number;
}

export interface SearchHit {
  ref: VerseRef;
  bookName: string;
  bookAbbr: string;
  text: string;
  score: number;
}

export type ThemeName = 'hell' | 'sepia' | 'dunkel';

export interface Settings {
  theme: ThemeName;
  fontScale: number;
  showHeadings: boolean;
  /** Kennungen der Vergleichstexte, die im Vers-Panel erscheinen. */
  comparisons: string[];
}

export interface Note {
  id: string;
  ref: VerseRef;
  text: string;
  createdAt: number;
  updatedAt: number;
}

export type HighlightColor = 'gelb' | 'gruen' | 'blau' | 'rosa';

export interface Highlight {
  ref: VerseRef;
  color: HighlightColor;
  createdAt: number;
}
