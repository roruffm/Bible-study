import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBibleIndex, usePersisted } from '../hooks/useStore';
import {
  dueCards,
  getMemoryCards,
  MEMORY_INTERVALS,
  MEMORY_MAX_LEVEL,
  removeMemoryCard,
  reviewMemoryCard,
  type MemoryCard,
} from '../lib/storage';

/**
 * Merkverse mit gestufter Wiederholung.
 *
 * Mit jeder Stufe verschwinden mehr Wörter: Zuerst liest man den Vers ganz,
 * am Ende nur noch die Anfangsbuchstaben. Welche Wörter ausgeblendet werden,
 * hängt an ihrer Position – so ergibt sich für denselben Vers auf derselben
 * Stufe immer dasselbe Bild, statt bei jedem Blick ein neues.
 */

export default function MemoryPage() {
  const { data: index } = useBibleIndex();
  const cards = usePersisted(getMemoryCards);
  const [revealed, setRevealed] = useState(false);

  const due = useMemo(() => dueCards(cards), [cards]);
  const current = due[0];

  const nameOf = (bookId: string) => index?.books.find((b) => b.id === bookId)?.name ?? bookId;

  return (
    <div>
      <Link className="btn btn--ghost btn--sm" to="/studium" style={{ marginBottom: '1rem' }}>
        ← Studium
      </Link>

      <h1 className="page-title">Merkverse</h1>
      <p className="page-lead">
        Verse, die du auswendig lernen willst. Sie kommen in wachsenden Abständen wieder – heute,
        morgen, in drei Tagen, in einer Woche. Hinzufügen kannst du sie beim Lesen über den Bereich
        „Notizen“ am Vers.
      </p>

      {cards.length === 0 ? (
        <div className="notice">
          Noch keine Merkverse. Tippe beim Lesen auf einen Vers, öffne „Notizen“ und wähle „Zu den
          Merkversen hinzufügen“.
        </div>
      ) : (
        <>
          <div className="home__grid">
            <div>
              {current ? (
                <Card
                  card={current}
                  bookName={nameOf(current.ref.book)}
                  revealed={revealed}
                  onReveal={() => setRevealed(true)}
                  onAnswer={(known) => {
                    reviewMemoryCard(current.ref, known);
                    setRevealed(false);
                  }}
                />
              ) : (
                <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                  <div className="tile__value">Für heute geschafft 🎉</div>
                  <p className="settings-row__hint" style={{ marginTop: '0.5rem' }}>
                    Der nächste Vers ist{' '}
                    {new Date(Math.min(...cards.map((c) => c.dueAt))).toLocaleDateString('de-DE')}{' '}
                    wieder dran.
                  </p>
                </div>
              )}
            </div>

            <div className="stack">
              <div className="tile">
                <div className="tile__label">Fällig</div>
                <div className="tile__value">
                  {due.length} von {cards.length}
                </div>
                <div className="tile__meta">
                  {cards.filter((c) => c.level >= MEMORY_MAX_LEVEL).length} Verse sitzen fest
                </div>
              </div>
            </div>
          </div>

          <div className="section-title" style={{ marginTop: '2rem' }}>
            Alle Merkverse
          </div>
          <div className="card">
            {[...cards]
              .sort((a, b) => a.dueAt - b.dueAt)
              .map((card) => (
                <div className="day" key={`${card.ref.book}${card.ref.chapter}${card.ref.verse}`}>
                  <span
                    className="day__check day__check--done"
                    title={`Stufe ${card.level} von ${MEMORY_MAX_LEVEL}`}
                  >
                    {card.level}
                  </span>
                  <div className="day__body">
                    <Link
                      className="hit__ref"
                      to={`/bibel/${card.ref.book}/${card.ref.chapter}?vers=${card.ref.verse}`}
                    >
                      {nameOf(card.ref.book)} {card.ref.chapter},{card.ref.verse}
                    </Link>
                    <p className="day__note">{card.text.slice(0, 90)}…</p>
                    <div className="note-item__meta">
                      <span>
                        {card.dueAt <= Date.now()
                          ? 'jetzt fällig'
                          : `wieder am ${new Date(card.dueAt).toLocaleDateString('de-DE')}`}
                        {card.level > 0 && ` · Abstand ${MEMORY_INTERVALS[card.level]} Tage`}
                      </span>
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        onClick={() => removeMemoryCard(card.ref)}
                      >
                        Entfernen
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

interface CardProps {
  card: MemoryCard;
  bookName: string;
  revealed: boolean;
  onReveal: () => void;
  onAnswer: (known: boolean) => void;
}

function Card({ card, bookName, revealed, onReveal, onAnswer }: CardProps) {
  const words = card.text.split(/(\s+)/);

  /** Anteil der ausgeblendeten Wörter, wachsend mit der Lernstufe. */
  const share = Math.min(1, card.level / MEMORY_MAX_LEVEL);

  return (
    <div className="card memo">
      <div className="daily__ref">
        {bookName} {card.ref.chapter},{card.ref.verse} · Stufe {card.level} von {MEMORY_MAX_LEVEL}
      </div>

      <p className="memo__text">
        {words.map((word, i) => {
          if (/^\s+$/.test(word)) return word;
          // Gleichmäßig verteilt ausblenden statt zufällig – dadurch bleibt
          // das Bild bei jedem Aufruf gleich und wirkt lernbar.
          const wordIndex = Math.floor(i / 2);
          const hidden = !revealed && share > 0 && (wordIndex * share) % 1 < share;
          if (!hidden) return <span key={i}>{word}</span>;
          return (
            <span key={i} className="memo__gap" title="ausgeblendet">
              {word[0]}
              {' '.repeat(Math.max(1, word.length - 1))}
            </span>
          );
        })}
      </p>

      {revealed ? (
        <div className="reader__tools">
          <button type="button" className="btn btn--primary" onClick={() => onAnswer(true)}>
            Gewusst
          </button>
          <button type="button" className="btn" onClick={() => onAnswer(false)}>
            Noch nicht
          </button>
        </div>
      ) : (
        <button type="button" className="btn btn--primary" onClick={onReveal}>
          Aufdecken
        </button>
      )}
    </div>
  );
}
