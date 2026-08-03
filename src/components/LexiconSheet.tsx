import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LEXICON_KIND_LABEL, type LexiconEntry } from '../content/lexicon';
import { useBibleIndex } from '../hooks/useStore';

/** Zeigt einen Lexikoneintrag über der Leseansicht, ohne sie zu verlassen. */
export default function LexiconSheet({
  entry,
  onClose,
}: {
  entry: LexiconEntry;
  onClose: () => void;
}) {
  const { data: index } = useBibleIndex();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const nameOf = (bookId: string) => index?.books.find((b) => b.id === bookId)?.name ?? bookId;

  return (
    <>
      <div className="scrim scrim--always" onClick={onClose} aria-hidden="true" />
      <div className="sheet" role="dialog" aria-modal="true" aria-label={entry.term}>
        <div className="sheet__head">
          <div>
            <span className={`chip chip--kind-${entry.kind}`}>
              {LEXICON_KIND_LABEL[entry.kind]}
            </span>
            <h3 className="sheet__title">{entry.term}</h3>
          </div>
          <button type="button" className="btn btn--ghost btn--sm" onClick={onClose}>
            Schließen
          </button>
        </div>

        <div className="sheet__body">
          <p>{entry.short}</p>
          {entry.long && <p style={{ color: 'var(--text-muted)' }}>{entry.long}</p>}

          {entry.today && (
            <p className="settings-row__hint">
              <strong>Heute: </strong>
              {entry.today}
            </p>
          )}

          {entry.coords && (
            <Link className="btn btn--sm" to={`/studium/karte?ort=${entry.id}`} onClick={onClose}>
              Auf der Karte zeigen
            </Link>
          )}

          {entry.refs && entry.refs.length > 0 && (
            <>
              <div className="section-title" style={{ marginTop: '1.1rem' }}>
                Wichtige Stellen
              </div>
              {entry.refs.map((ref) => (
                <Link
                  key={`${ref.book}${ref.chapter}${ref.verse}`}
                  className="xref"
                  to={`/bibel/${ref.book}/${ref.chapter}?vers=${ref.verse}`}
                  onClick={onClose}
                >
                  <strong>
                    {nameOf(ref.book)} {ref.chapter},{ref.verse}
                  </strong>
                  {ref.note && <span> — {ref.note}</span>}
                </Link>
              ))}
            </>
          )}

          <Link
            className="btn btn--ghost btn--sm"
            to={`/lexikon?eintrag=${entry.id}`}
            onClick={onClose}
            style={{ marginTop: '0.75rem' }}
          >
            Im Lexikon öffnen →
          </Link>
        </div>
      </div>
    </>
  );
}
