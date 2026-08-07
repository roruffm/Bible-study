import { useEffect, useMemo, useState } from 'react';
import {
  COMPARISON_LABEL,
  COMPARISON_NOTE,
  hasComparison,
  loadComparisonBook,
} from '../lib/bibleData';
import { useAsync } from '../hooks/useStore';
import type { BookMeta, VerseRef } from '../lib/types';

/**
 * Der englische Wortlaut zum angeklickten Vers.
 *
 * Beide Ausgaben zählen gleich, deshalb steht die englische Fassung
 * grundsätzlich unter derselben Versnummer. An wenigen Stellen ziehen sie die
 * Versgrenze aber verschieden – in den Psalmen etwa gehört die Überschrift im
 * deutschen Text zum ersten Vers, in der englischen Ausgabe steht sie darüber,
 * und in Johannes 10 verschiebt sich die Teilung für drei Verse. Ein fester
 * Umrechnungsschlüssel ließe sich dafür nicht ehrlich aufstellen; stattdessen
 * kann man mit den Pfeilen einen Vers vor- und zurückgehen.
 */

interface Props {
  book: BookMeta;
  ref_: VerseRef;
}

export default function VerseCompare({ book, ref_ }: Props) {
  const [offset, setOffset] = useState(0);

  const { data, error, loading } = useAsync(
    () => (hasComparison() ? loadComparisonBook(ref_.book) : null),
    [ref_.book],
  );

  // Beim Wechsel des Verses wieder auf die gleiche Nummer zurückspringen.
  useEffect(() => setOffset(0), [ref_.book, ref_.chapter, ref_.verse]);

  const chapter = useMemo(() => data?.chapters[ref_.chapter - 1] ?? null, [data, ref_.chapter]);
  const verseNumber = ref_.verse + offset;
  const text = chapter?.[verseNumber - 1];

  if (!hasComparison()) {
    return (
      <section className="compare">
        <div className="compare__head">
          <span className="compare__label">{COMPARISON_LABEL}</span>
        </div>
        <p className="compare__hint">
          Die Einzeldatei-Fassung trägt nur den deutschen Text in sich. Den englischen Vergleich
          gibt es in der Web-Fassung.
        </p>
      </section>
    );
  }

  return (
    <section className="compare" aria-label={`${COMPARISON_LABEL} zu diesem Vers`}>
      <div className="compare__head">
        <span className="compare__label">{COMPARISON_LABEL}</span>
        <span className="compare__ref">
          {book.abbr} {ref_.chapter}:{verseNumber}
        </span>
        <span className="compare__step">
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => setOffset((o) => o - 1)}
            disabled={!chapter || verseNumber <= 1}
            aria-label="Einen Vers zurück"
            title="Einen Vers zurück"
          >
            ‹
          </button>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => setOffset((o) => o + 1)}
            disabled={!chapter || verseNumber >= chapter.length}
            aria-label="Einen Vers weiter"
            title="Einen Vers weiter"
          >
            ›
          </button>
        </span>
      </div>

      {loading && <p className="compare__hint">wird geladen …</p>}

      {error && (
        <p className="compare__hint">
          Der englische Text ließ sich nicht laden. Ohne Verbindung steht er erst zur Verfügung,
          wenn das Kapitel einmal geöffnet war.
        </p>
      )}

      {!loading && !error && (text ? <p className="compare__text">{text}</p> : (
        <p className="compare__hint">Zu dieser Nummer steht dort kein Vers.</p>
      ))}

      {offset !== 0 && (
        <p className="compare__hint">
          Verschoben um {offset > 0 ? `+${offset}` : offset} gegenüber der deutschen Zählung.
        </p>
      )}

      <p className="compare__source">{COMPARISON_NOTE}</p>
    </section>
  );
}
