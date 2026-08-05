import { commentaryFor } from '../content/commentary';
import { BOOK_PROFILES } from '../content/bookProfiles';
import { EPOCHS } from '../content/timeline';
import { GOSPELS, pericopesForChapter } from '../content/synopsis';
import { lexiconInVerse } from './lexiconText';
import { placesInChapter } from './placeText';
import { TRANSLATION_LABEL } from './bibleData';
import type { BibleIndex, BookContent, VerseRef } from './types';

/**
 * Stellt zusammen, was die App über eine Stelle weiß, und gießt es in Text.
 *
 * Das ist der Punkt, an dem die Rückfragen sich von einem allgemeinen Chat
 * unterscheiden: Nicht das Gedächtnis des Modells beantwortet die Frage,
 * sondern der geprüfte Bestand dieser App – Artikel, Datierungen, Auslegungen
 * aus benannten Traditionen, Querverweise, Lexikon, Orte, Evangelien-Parallelen.
 * Das Modell wird angewiesen, sich daran zu halten und nichts hinzuzuerfinden.
 *
 * Der Zusammenhang ist bewusst großzügig: Ein einzelner Vers ohne seine
 * Umgebung führt in die Irre, und Kontextfenster sind heute groß genug, dass
 * Sparsamkeit an dieser Stelle nichts einbringt.
 */

/** Wie viele Verse vor und nach der Stelle mitgegeben werden. */
const UMGEBUNG = 6;

export interface VerseContext {
  /** Kopfzeile für die Anzeige, etwa „Johannes 3,16“. */
  label: string;
  /** Der Vers mit seiner Umgebung, versweise nummeriert. */
  passage: string;
  /** Alles, was die App zu dieser Stelle hinterlegt hat. */
  material: string;
}

function absatz(titel: string, inhalt: string | undefined | null): string {
  return inhalt && inhalt.trim() ? `## ${titel}\n${inhalt.trim()}\n` : '';
}

export function buildVerseContext(
  index: BibleIndex,
  content: BookContent,
  ref: VerseRef,
  verseText: string,
): VerseContext {
  const book = index.books.find((b) => b.id === ref.book);
  const bookName = book?.name ?? ref.book;
  const verses = content.chapters[ref.chapter - 1] ?? [];
  const label = `${bookName} ${ref.chapter},${ref.verse}`;

  /* ----------------------------------------------------------- Wortlaut */

  const von = Math.max(1, ref.verse - UMGEBUNG);
  const bis = Math.min(verses.length, ref.verse + UMGEBUNG);
  const zeilen: string[] = [];
  for (let v = von; v <= bis; v++) {
    // Die gefragte Stelle wird markiert, damit das Modell sie im Zusammenhang
    // wiederfindet, ohne dass der Zusammenhang wegfällt.
    const marke = v === ref.verse ? ' ←' : '';
    zeilen.push(`${v}. ${verses[v - 1]}${marke}`);
  }
  const passage =
    `${bookName} ${ref.chapter},${von}–${bis} (${TRANSLATION_LABEL})\n` +
    `${zeilen.join('\n')}\n` +
    `\nGefragt ist nach Vers ${ref.verse} (oben mit ← markiert).`;

  /* -------------------------------------------------------- Sachmaterial */

  const teile: string[] = [];

  const profile = BOOK_PROFILES[ref.book];
  if (profile) {
    teile.push(
      absatz(
        `Das Buch ${bookName}`,
        [
          profile.subtitle,
          `Verfasser: ${profile.author}`,
          `Zeit: ${profile.time}`,
          `Anlass: ${profile.occasion}`,
          `Kernaussage: ${profile.message}`,
        ].join('\n'),
      ),
    );
  }

  for (const entry of commentaryFor(ref.book, ref.chapter, ref.verse)) {
    const stueck: string[] = [
      `Abschnitt ${ref.chapter},${entry.from}–${entry.to}: „${entry.title}“`,
    ];
    if (entry.dating) {
      const d = entry.dating;
      const epoche = EPOCHS.find((e) => e.id === d.epoch)?.label;
      const zeilen = [
        d.events && `Ereigniszeit: ${d.events}`,
        d.written && `Entstehungszeit: ${d.written}`,
        epoche && `Epoche: ${epoche}`,
      ].filter(Boolean);
      if (zeilen.length) stueck.push(zeilen.join('\n'));
    }
    stueck.push(entry.historicalShort);
    if (entry.historicalLong) stueck.push(entry.historicalLong);

    if (entry.interpretations.length) {
      stueck.push(
        'Auslegungen, die die App zu diesem Abschnitt führt – jeweils mit der Tradition, ' +
          'aus der sie stammt:\n' +
          entry.interpretations.map((i) => `- ${i.tradition}: ${i.text}`).join('\n'),
      );
    }
    if (entry.crossRefs?.length) {
      stueck.push(
        'Querverweise:\n' +
          entry.crossRefs
            .map((x) => {
              const name = index.books.find((b) => b.id === x.book)?.name ?? x.book;
              return `- ${name} ${x.chapter},${x.verse}${x.note ? ` — ${x.note}` : ''}`;
            })
            .join('\n'),
      );
    }
    if (entry.sources?.length) stueck.push(`Grundlagen: ${entry.sources.join('; ')}`);

    teile.push(absatz('Artikel der App zu dieser Stelle', stueck.join('\n\n')));
  }

  const begriffe = lexiconInVerse(verseText);
  if (begriffe.length) {
    teile.push(
      absatz(
        'Im Vers erwähnt (Lexikon der App)',
        begriffe
          .map((e) => `- ${e.term}${e.fact ? ` (${e.fact})` : ''}: ${e.short}`)
          .join('\n'),
      ),
    );
  }

  const orte = placesInChapter(verses);
  if (orte.length) {
    teile.push(
      absatz(
        'Orte, die in diesem Kapitel vorkommen',
        orte
          .map((o) => `- ${o.place.name}${o.place.short ? `: ${o.place.short}` : ''}`)
          .join('\n'),
      ),
    );
  }

  const parallelen = pericopesForChapter(ref.book, ref.chapter);
  if (parallelen.length) {
    teile.push(
      absatz(
        'Parallelen in den Evangelien',
        parallelen
          .map((p) => {
            const stellen = GOSPELS.filter((g) => p[g.key])
              .map((g) => {
                const s = p[g.key]!;
                return `${g.abbr} ${s.chapter},${s.from}–${s.to}`;
              })
              .join(' · ');
            return `- ${p.title}: ${stellen}${p.note ? `\n  Unterschied: ${p.note}` : ''}`;
          })
          .join('\n'),
      ),
    );
  }

  const material = teile.filter(Boolean).join('\n');

  return {
    label,
    passage,
    material:
      material.trim() ||
      'Zu dieser Stelle hat die App über den Bibeltext hinaus nichts hinterlegt.',
  };
}
