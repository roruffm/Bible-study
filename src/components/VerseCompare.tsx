import { useEffect, useMemo, useState } from 'react';
import { COMPARISONS, hasComparison, loadComparisonBook, type Comparison } from '../lib/bibleData';
import { getSettings } from '../lib/storage';
import { useAsync, usePersisted } from '../hooks/useStore';
import type { BookMeta, VerseRef } from '../lib/types';

/**
 * Der Vers in den anderen Übersetzungen, direkt unter dem deutschen Wortlaut.
 *
 * Alle Ausgaben zählen gleich, deshalb steht der Vergleich grundsätzlich unter
 * derselben Versnummer. An wenigen Stellen ziehen sie die Versgrenze aber
 * verschieden – in den Psalmen etwa gehört die Überschrift im Luthertext zum
 * ersten Vers, in der King James steht sie darüber, und in Johannes 10
 * verschiebt sich die Teilung für drei Verse. Ein fester Umrechnungsschlüssel
 * ließe sich dafür nicht ehrlich aufstellen; stattdessen kann man je Ausgabe
 * mit den Pfeilen einen Vers vor- und zurückgehen.
 */

interface Props {
  book: BookMeta;
  ref_: VerseRef;
}

export default function VerseCompare({ book, ref_ }: Props) {
  const settings = usePersisted(getSettings);
  // Die Reihenfolge gibt die Liste der Übersetzungen vor, nicht die Auswahl –
  // sonst springen die Blöcke, wenn jemand eine Ausgabe ab- und wieder anwählt.
  const gewaehlt = useMemo(
    () => COMPARISONS.filter((c) => settings.comparisons.includes(c.id)),
    [settings.comparisons],
  );

  if (gewaehlt.length === 0) return null;

  if (!hasComparison()) {
    return (
      <section className="compare">
        <p className="compare__hint">
          Die Einzeldatei-Fassung trägt nur den deutschen Grundtext in sich. Die Vergleichstexte
          gibt es in der Web-Fassung.
        </p>
      </section>
    );
  }

  return (
    <section className="compare" aria-label="Der Vers in anderen Übersetzungen">
      {gewaehlt.map((comparison) => (
        <CompareRow
          key={comparison.id}
          comparison={comparison}
          book={book}
          ref_={ref_}
        />
      ))}
    </section>
  );
}

/** Eine Übersetzung. Jede führt ihren Versatz für sich – er betrifft nur sie. */
function CompareRow({
  comparison,
  book,
  ref_,
}: {
  comparison: Comparison;
  book: BookMeta;
  ref_: VerseRef;
}) {
  const [offset, setOffset] = useState(0);

  const { data, error, loading } = useAsync(
    () => loadComparisonBook(comparison.id, ref_.book),
    [comparison.id, ref_.book],
  );

  // Beim Wechsel des Verses wieder auf die gleiche Nummer zurückspringen.
  useEffect(() => setOffset(0), [ref_.book, ref_.chapter, ref_.verse]);

  const chapter = useMemo(() => data?.chapters[ref_.chapter - 1] ?? null, [data, ref_.chapter]);
  const verseNumber = ref_.verse + offset;
  const text = chapter?.[verseNumber - 1];

  return (
    <div className="compare__item">
      <div className="compare__head">
        <span className="compare__label">{comparison.label}</span>
        <span className="compare__ref">
          {book.abbr} {ref_.chapter}:{verseNumber}
        </span>
        <span className="compare__step">
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => setOffset((o) => o - 1)}
            disabled={!chapter || verseNumber <= 1}
            aria-label={`${comparison.label}: einen Vers zurück`}
            title="Einen Vers zurück"
          >
            ‹
          </button>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => setOffset((o) => o + 1)}
            disabled={!chapter || verseNumber >= chapter.length}
            aria-label={`${comparison.label}: einen Vers weiter`}
            title="Einen Vers weiter"
          >
            ›
          </button>
        </span>
      </div>

      {loading && <p className="compare__hint">wird geladen …</p>}

      {error && (
        <p className="compare__hint">
          Dieser Text ließ sich nicht laden. Ohne Verbindung steht er erst zur Verfügung, wenn das
          Kapitel einmal geöffnet war.
        </p>
      )}

      {!loading &&
        !error &&
        (text ? (
          <p className="compare__text">{text}</p>
        ) : (
          <p className="compare__hint">Zu dieser Nummer steht dort kein Vers.</p>
        ))}

      {offset !== 0 && (
        <p className="compare__hint">
          Verschoben um {offset > 0 ? `+${offset}` : offset} gegenüber der deutschen Zählung.
        </p>
      )}

      <p className="compare__source">{comparison.note}</p>
    </div>
  );
}
