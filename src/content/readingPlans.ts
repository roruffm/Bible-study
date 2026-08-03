import type { BibleIndex } from '../lib/types';

/**
 * Lesepläne. Zwei Arten:
 *
 * - **Durchlese-Pläne** werden aus dem Bibel-Index berechnet. Statt 365 Tage
 *   von Hand zu pflegen, verteilt `buildDays` die Kapitel gleichmäßig auf die
 *   Laufzeit. Das hält die Datei klein und bleibt automatisch korrekt.
 * - **Themenpläne** sind von Hand kuratiert: ausgewählte Abschnitte mit
 *   Überschrift und einem Satz, der den Tag einordnet.
 */

export interface Portion {
  book: string;
  /** Erstes Kapitel des Abschnitts. */
  from: number;
  /** Letztes Kapitel; gleich `from`, wenn es nur eines ist. */
  to: number;
  /** Versbereich – nur sinnvoll, wenn der Abschnitt in einem Kapitel liegt. */
  verseFrom?: number;
  verseTo?: number;
}

export interface PlanDay {
  portions: Portion[];
  /** Nur bei Themenplänen. */
  title?: string;
  note?: string;
}

export type PlanKind = 'durchlesen' | 'thema';

export interface ReadingPlan {
  id: string;
  title: string;
  subtitle: string;
  kind: PlanKind;
  /** Laufzeit in Tagen. */
  days: number;
  /** Für berechnete Pläne: welche Bücher in kanonischer Reihenfolge. */
  scope?: 'alle' | 'at' | 'nt' | string[];
  /** Für Themenpläne: die Tage selbst. */
  curated?: PlanDay[];
}

/* ------------------------------------------------------- Themenpläne */

const HOFFNUNG: PlanDay[] = [
  {
    title: 'Die Klage darf stehen bleiben',
    note: 'Der Text beschönigt nichts – und findet mitten darin einen Halt.',
    portions: [{ book: 'klgl', from: 3, to: 3, verseFrom: 17, verseTo: 26 }],
  },
  {
    title: 'Wie lange noch?',
    note: 'Ein Psalm, der viermal „wie lange“ fragt, bevor er singen kann.',
    portions: [{ book: 'ps', from: 13, to: 13 }],
  },
  {
    title: 'Sehnsucht ohne Antwort',
    note: 'Der Beter redet mit sich selbst, weil Gott gerade schweigt.',
    portions: [{ book: 'ps', from: 42, to: 42 }],
  },
  {
    title: 'Neue Kraft für Erschöpfte',
    note: 'Gesagt zu Menschen im Exil, die nicht mehr an eine Wende glaubten.',
    portions: [{ book: 'jes', from: 40, to: 40, verseFrom: 27, verseTo: 31 }],
  },
  {
    title: 'Seufzen – und doch getragen',
    note: 'Paulus redet das Leid nicht klein, sondern stellt es in einen größeren Rahmen.',
    portions: [{ book: 'roem', from: 8, to: 8, verseFrom: 18, verseTo: 30 }],
  },
  {
    title: 'Schätze in zerbrechlichen Gefäßen',
    note: 'Die Schwäche wird nicht überwunden, sondern zum Ort der Kraft.',
    portions: [{ book: '2kor', from: 4, to: 4, verseFrom: 7, verseTo: 18 }],
  },
  {
    title: 'Gott wischt die Tränen ab',
    note: 'Kein Jenseits fern der Erde – Gott zieht bei den Menschen ein.',
    portions: [{ book: 'offb', from: 21, to: 21, verseFrom: 1, verseTo: 7 }],
  },
];

const WER_IST_JESUS: PlanDay[] = [
  {
    title: 'Der Anfang',
    note: 'Markus beginnt ohne Kindheitsgeschichte – sofort mitten hinein.',
    portions: [{ book: 'mk', from: 1, to: 1, verseFrom: 1, verseTo: 20 }],
  },
  {
    title: 'Vollmacht, die aneckt',
    note: 'Schon im zweiten Kapitel beginnt der Konflikt mit den Frommen.',
    portions: [{ book: 'mk', from: 2, to: 2, verseFrom: 1, verseTo: 17 }],
  },
  {
    title: 'Warum in Gleichnissen?',
    note: 'Jesus erklärt weniger, als man erwarten würde.',
    portions: [{ book: 'mk', from: 4, to: 4, verseFrom: 1, verseTo: 20 }],
  },
  {
    title: 'Wer ist dieser?',
    note: 'Die Frage der Jünger nach dem Sturm trägt das ganze Evangelium.',
    portions: [{ book: 'mk', from: 4, to: 4, verseFrom: 35, verseTo: 41 }],
  },
  {
    title: 'Zwei Frauen, zwei Rettungen',
    note: 'Eine Erzählung wird von einer anderen unterbrochen – Markus erzählt gern so.',
    portions: [{ book: 'mk', from: 5, to: 5, verseFrom: 21, verseTo: 43 }],
  },
  {
    title: 'Genug für alle',
    note: 'Die Speisung greift bewusst Bilder aus der Wüstenzeit auf.',
    portions: [{ book: 'mk', from: 6, to: 6, verseFrom: 30, verseTo: 44 }],
  },
  {
    title: 'Das Bekenntnis – und der Widerspruch',
    note: 'Die Mitte des Evangeliums: Petrus hat recht und versteht doch nichts.',
    portions: [{ book: 'mk', from: 8, to: 8, verseFrom: 27, verseTo: 38 }],
  },
  {
    title: 'Der reiche Mann',
    note: 'Die einzige Stelle, an der es heißt, Jesus habe jemanden liebgehabt – bevor er ihn ziehen lässt.',
    portions: [{ book: 'mk', from: 10, to: 10, verseFrom: 17, verseTo: 31 }],
  },
  {
    title: 'Herrschen heißt dienen',
    note: 'Der Maßstab für Größe wird umgedreht.',
    portions: [{ book: 'mk', from: 10, to: 10, verseFrom: 32, verseTo: 45 }],
  },
  {
    title: 'Einzug auf einem Esel',
    note: 'Eine bewusst unköniglich inszenierte Königsankunft.',
    portions: [{ book: 'mk', from: 11, to: 11, verseFrom: 1, verseTo: 11 }],
  },
  {
    title: 'Gethsemane',
    note: 'Der ungeschönteste Text über Jesu Angst.',
    portions: [{ book: 'mk', from: 14, to: 14, verseFrom: 32, verseTo: 52 }],
  },
  {
    title: 'Das Kreuz',
    note: 'Ausgerechnet ein römischer Hauptmann spricht das Bekenntnis aus.',
    portions: [{ book: 'mk', from: 15, to: 15, verseFrom: 1, verseTo: 39 }],
  },
  {
    title: 'Das leere Grab',
    note: 'Der älteste Schluss endet mit Furcht und Schweigen – erstaunlich offen.',
    portions: [{ book: 'mk', from: 16, to: 16, verseFrom: 1, verseTo: 8 }],
  },
  {
    title: 'Von Anfang an',
    note: 'Johannes setzt noch einmal ganz anders an: vor aller Zeit.',
    portions: [{ book: 'joh', from: 1, to: 1, verseFrom: 1, verseTo: 18 }],
  },
];

const VERGEBUNG: PlanDay[] = [
  {
    title: 'Ein Gebet nach schwerem Versagen',
    note: 'Die Überschrift verbindet den Psalm mit Davids Verbrechen an Batseba und Uria.',
    portions: [{ book: 'ps', from: 51, to: 51, verseFrom: 1, verseTo: 14 }],
  },
  {
    title: 'So fern der Osten vom Westen',
    note: 'Ein Bild für eine Entfernung, die sich nicht messen lässt.',
    portions: [{ book: 'ps', from: 103, to: 103, verseFrom: 1, verseTo: 14 }],
  },
  {
    title: 'Wie wir vergeben',
    note: 'Die einzige Bitte des Vaterunsers, die Jesus anschließend eigens erklärt.',
    portions: [{ book: 'mt', from: 6, to: 6, verseFrom: 9, verseTo: 15 }],
  },
  {
    title: 'Der unbarmherzige Gläubiger',
    note: 'Die Schuldsummen im Gleichnis stehen in einem grotesken Missverhältnis.',
    portions: [{ book: 'mt', from: 18, to: 18, verseFrom: 21, verseTo: 35 }],
  },
  {
    title: 'Der Vater, der läuft',
    note: 'Achte auf den älteren Bruder – die Erzählung endet bei ihm, und zwar offen.',
    portions: [{ book: 'lk', from: 15, to: 15, verseFrom: 11, verseTo: 32 }],
  },
  {
    title: 'Vergebung am Kreuz',
    note: 'Gesprochen, während die Hinrichtung noch läuft.',
    portions: [{ book: 'lk', from: 23, to: 23, verseFrom: 32, verseTo: 43 }],
  },
  {
    title: 'Einander ertragen',
    note: 'Vergebung erscheint hier als Kleidungsstück, das man anzieht – täglich neu.',
    portions: [{ book: 'kol', from: 3, to: 3, verseFrom: 12, verseTo: 17 }],
  },
];

/* ----------------------------------------------------------- Die Pläne */

export const READING_PLANS: ReadingPlan[] = [
  {
    id: 'bibel-jahr',
    title: 'Die ganze Bibel in einem Jahr',
    subtitle: 'Alle 1.189 Kapitel, gleichmäßig auf 365 Tage verteilt.',
    kind: 'durchlesen',
    days: 365,
    scope: 'alle',
  },
  {
    id: 'nt-90',
    title: 'Neues Testament in 90 Tagen',
    subtitle: 'Von Matthäus bis zur Offenbarung, rund drei Kapitel am Tag.',
    kind: 'durchlesen',
    days: 90,
    scope: 'nt',
  },
  {
    id: 'evangelien-30',
    title: 'Die vier Evangelien in 30 Tagen',
    subtitle: 'Ein Monat mit dem Leben Jesu – vier Blickwinkel nacheinander.',
    kind: 'durchlesen',
    days: 30,
    scope: ['mt', 'mk', 'lk', 'joh'],
  },
  {
    id: 'psalmen-60',
    title: 'Psalmen in 60 Tagen',
    subtitle: 'Das Gebetbuch Israels, zweieinhalb Psalmen am Tag.',
    kind: 'durchlesen',
    days: 60,
    scope: ['ps'],
  },
  {
    id: 'hoffnung-7',
    title: 'Hoffnung, wenn es dunkel wird',
    subtitle: 'Sieben Tage durch Texte, die das Schwere nicht überspringen.',
    kind: 'thema',
    days: 7,
    curated: HOFFNUNG,
  },
  {
    id: 'jesus-14',
    title: 'Wer ist Jesus?',
    subtitle: 'Vierzehn Tage durch das Markusevangelium – das älteste und knappste.',
    kind: 'thema',
    days: 14,
    curated: WER_IST_JESUS,
  },
  {
    id: 'vergebung-7',
    title: 'Vergebung',
    subtitle: 'Sieben Abschnitte über das, was am schwersten fällt.',
    kind: 'thema',
    days: 7,
    curated: VERGEBUNG,
  },
];

export function findPlan(planId: string): ReadingPlan | undefined {
  return READING_PLANS.find((p) => p.id === planId);
}

/* -------------------------------------------------------- Berechnung */

/** Alle Kapitel im Geltungsbereich eines Plans, in kanonischer Reihenfolge. */
function chaptersInScope(plan: ReadingPlan, index: BibleIndex): { book: string; chapter: number }[] {
  const books = index.books.filter((book) => {
    if (plan.scope === 'at') return book.testament === 'AT';
    if (plan.scope === 'nt') return book.testament === 'NT';
    if (Array.isArray(plan.scope)) return plan.scope.includes(book.id);
    return true;
  });

  // Bei ausdrücklicher Buchliste zählt deren Reihenfolge.
  const ordered = Array.isArray(plan.scope)
    ? plan.scope
        .map((id) => books.find((b) => b.id === id))
        .filter((b): b is NonNullable<typeof b> => Boolean(b))
    : books;

  return ordered.flatMap((book) =>
    Array.from({ length: book.chapters }, (_, i) => ({ book: book.id, chapter: i + 1 })),
  );
}

/** Fasst aufeinanderfolgende Kapitel desselben Buches zu Abschnitten zusammen. */
function toPortions(chapters: { book: string; chapter: number }[]): Portion[] {
  const portions: Portion[] = [];
  for (const item of chapters) {
    const last = portions[portions.length - 1];
    if (last && last.book === item.book && last.to === item.chapter - 1) last.to = item.chapter;
    else portions.push({ book: item.book, from: item.chapter, to: item.chapter });
  }
  return portions;
}

/**
 * Die Tage eines Plans. Bei Themenplänen sind sie hinterlegt, bei
 * Durchlese-Plänen werden die Kapitel gleichmäßig verteilt – die ersten Tage
 * bekommen ein Kapitel mehr, wenn die Rechnung nicht aufgeht.
 */
export function buildDays(plan: ReadingPlan, index: BibleIndex): PlanDay[] {
  if (plan.curated) return plan.curated;

  const chapters = chaptersInScope(plan, index);
  const perDay = Math.floor(chapters.length / plan.days);
  const remainder = chapters.length % plan.days;

  const days: PlanDay[] = [];
  let cursor = 0;
  for (let i = 0; i < plan.days; i++) {
    const size = perDay + (i < remainder ? 1 : 0);
    days.push({ portions: toPortions(chapters.slice(cursor, cursor + size)) });
    cursor += size;
  }
  return days;
}

/** Beschriftung eines Abschnitts, z. B. „Markus 4,35-41“ oder „1. Mose 1-3“. */
export function portionLabel(portion: Portion, bookName: string): string {
  if (portion.verseFrom) {
    const verses = portion.verseTo
      ? `${portion.verseFrom}-${portion.verseTo}`
      : `${portion.verseFrom}`;
    return `${bookName} ${portion.from},${verses}`;
  }
  return portion.from === portion.to
    ? `${bookName} ${portion.from}`
    : `${bookName} ${portion.from}-${portion.to}`;
}

/** Ziel-Adresse für den ersten Vers eines Abschnitts. */
export function portionLink(portion: Portion): string {
  const query = portion.verseFrom ? `?vers=${portion.verseFrom}` : '';
  return `/bibel/${portion.book}/${portion.from}${query}`;
}
