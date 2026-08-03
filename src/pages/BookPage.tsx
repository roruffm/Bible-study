import { Link, useParams } from 'react-router-dom';
import { BOOK_PROFILES } from '../content/bookProfiles';
import { useBibleIndex, usePersisted } from '../hooks/useStore';
import { findBook } from '../lib/bibleData';
import { getReadChapters } from '../lib/storage';

/** Steckbrief eines Buches mit Kapitelraster als Einstieg. */
export default function BookPage() {
  const { bookId = '' } = useParams();
  const { data: index, loading } = useBibleIndex();
  const readChapters = usePersisted(getReadChapters);

  if (loading || !index) {
    return (
      <div className="empty">
        <span className="spinner" /> Wird geladen …
      </div>
    );
  }

  const book = findBook(index, bookId);
  if (!book) {
    return (
      <div className="empty">
        <p>Dieses Buch gibt es nicht.</p>
        <Link className="btn" to="/bibel">
          Zur Bibliothek
        </Link>
      </div>
    );
  }

  const profile = BOOK_PROFILES[book.id];
  const readSet = new Set(readChapters);
  const readCount = Array.from({ length: book.chapters }, (_, i) =>
    readSet.has(`${book.id}.${i + 1}`) ? 1 : 0,
  ).reduce((a: number, b: number) => a + b, 0);

  return (
    <div>
      <Link className="btn btn--ghost btn--sm" to="/bibel" style={{ marginBottom: '1rem' }}>
        ← Bibliothek
      </Link>

      <h1 className="page-title">{book.name}</h1>
      {profile && <p className="page-lead">{profile.subtitle}</p>}

      <div className="home__grid" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div className="section-title">Steckbrief</div>
          {profile ? (
            <div style={{ display: 'grid', gap: '0.7rem', fontSize: '0.92rem' }}>
              <div>
                <strong>Verfasser</strong>
                <div style={{ color: 'var(--text-muted)' }}>{profile.author}</div>
              </div>
              <div>
                <strong>Zeit</strong>
                <div style={{ color: 'var(--text-muted)' }}>{profile.time}</div>
              </div>
              <div>
                <strong>Anlass</strong>
                <div style={{ color: 'var(--text-muted)' }}>{profile.occasion}</div>
              </div>
              <div>
                <strong>Kernaussage</strong>
                <div style={{ color: 'var(--text-muted)' }}>{profile.message}</div>
              </div>
            </div>
          ) : (
            <div className="notice">Für dieses Buch liegt noch kein Steckbrief vor.</div>
          )}
        </div>

        <div className="stack">
          <div className="card" style={{ padding: '1.1rem' }}>
            <div className="tile__label">Lesefortschritt</div>
            <div className="tile__value">
              {readCount} von {book.chapters} Kapiteln
            </div>
            <div className="progress">
              <div
                className="progress__bar"
                style={{ width: `${(readCount / book.chapters) * 100}%` }}
              />
            </div>
          </div>

          {profile?.outline && (
            <div className="card" style={{ padding: '1.1rem' }}>
              <div className="section-title">Aufbau</div>
              <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.88rem' }}>
                {profile.outline.map((part) => (
                  <Link
                    key={part.label}
                    to={`/bibel/${book.id}/${part.from}`}
                    style={{ display: 'flex', gap: '0.6rem' }}
                  >
                    <strong style={{ color: 'var(--accent)', whiteSpace: 'nowrap' }}>
                      {part.from === part.to ? part.from : `${part.from}–${part.to}`}
                    </strong>
                    <span style={{ color: 'var(--text-muted)' }}>{part.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="section-title">Kapitel</div>
      <div className="chapters">
        {Array.from({ length: book.chapters }, (_, i) => i + 1).map((n) => (
          <Link
            key={n}
            to={`/bibel/${book.id}/${n}`}
            className={`chapter-btn${readSet.has(`${book.id}.${n}`) ? ' chapter-btn--read' : ''}`}
          >
            {n}
          </Link>
        ))}
      </div>
    </div>
  );
}
