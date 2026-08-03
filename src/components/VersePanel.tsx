import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { commentaryFor } from '../content/commentary';
import { BOOK_PROFILES } from '../content/bookProfiles';
import { usePersisted } from '../hooks/useStore';
import {
  addMemoryCard,
  deleteNote,
  getHighlight,
  getMemoryCard,
  getNotesFor,
  removeMemoryCard,
  saveNote,
  toggleHighlight,
} from '../lib/storage';
import type { BibleIndex, BookMeta, HighlightColor, VerseRef } from '../lib/types';

type Tab = 'kontext' | 'auslegung' | 'verweise' | 'notizen';

const TABS: { id: Tab; label: string }[] = [
  { id: 'kontext', label: 'Kontext' },
  { id: 'auslegung', label: 'Auslegung' },
  { id: 'verweise', label: 'Verweise' },
  { id: 'notizen', label: 'Notizen' },
];

const COLORS: { id: HighlightColor; label: string }[] = [
  { id: 'gelb', label: 'Gelb' },
  { id: 'gruen', label: 'Grün' },
  { id: 'blau', label: 'Blau' },
  { id: 'rosa', label: 'Rosa' },
];

interface Props {
  index: BibleIndex;
  book: BookMeta;
  ref_: VerseRef;
  text: string;
  /** Abweichende Zählung der gedruckten Lutherbibel, falls vorhanden. */
  altNumbering?: string;
  onClose: () => void;
}

export default function VersePanel({ index, book, ref_, text, altNumbering, onClose }: Props) {
  const [tab, setTab] = useState<Tab>('kontext');
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState('');

  const entries = useMemo(
    () => commentaryFor(ref_.book, ref_.chapter, ref_.verse),
    [ref_.book, ref_.chapter, ref_.verse],
  );
  const profile = BOOK_PROFILES[ref_.book];

  const highlight = usePersisted(() => getHighlight(ref_));
  const notes = usePersisted(() => getNotesFor(ref_));
  const memoryCard = usePersisted(() => getMemoryCard(ref_));

  // Beim Wechsel des Verses den Zustand zurücksetzen.
  useEffect(() => {
    setExpanded(false);
    setDraft('');
    setTab('kontext');
  }, [ref_.book, ref_.chapter, ref_.verse]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const bookNameOf = (id: string) => index.books.find((b) => b.id === id)?.name ?? id;

  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <aside className="panel" aria-label={`Studienmaterial zu ${book.abbr} ${ref_.chapter},${ref_.verse}`}>
        <div className="panel__head">
          <div className="panel__ref">
            <strong>
              {book.name} {ref_.chapter},{ref_.verse}
            </strong>
            <button type="button" className="btn btn--ghost btn--sm" onClick={onClose}>
              Schließen
            </button>
          </div>
          <div className="panel__tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={`panel__tab${tab === t.id ? ' panel__tab--active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
                {t.id === 'notizen' && notes.length > 0 ? ` (${notes.length})` : ''}
              </button>
            ))}
          </div>
        </div>

        <div className="panel__body">
          <blockquote className="panel__quote">{text}</blockquote>

          {altNumbering && (
            <p className="settings-row__hint" style={{ marginTop: '-0.5rem', marginBottom: '1rem' }}>
              In der gedruckten Lutherbibel steht dieser Vers unter{' '}
              <strong>
                {book.abbr} {altNumbering}
              </strong>{' '}
              – der Textbestand hier folgt der international üblichen Zählung.
            </p>
          )}

          {tab === 'kontext' && (
            <div className="panel__article">
              {entries.length > 0 ? (
                entries.map((entry) => (
                  <div key={entry.title} style={{ marginBottom: '1.25rem' }}>
                    <h4>{entry.title}</h4>
                    <p>{entry.historicalShort}</p>
                    {entry.historicalLong && (
                      <>
                        {expanded && <p>{entry.historicalLong}</p>}
                        <button
                          type="button"
                          className="btn btn--ghost btn--sm"
                          onClick={() => setExpanded((v) => !v)}
                        >
                          {expanded ? 'Weniger anzeigen' : 'Mehr erfahren'}
                        </button>
                      </>
                    )}
                    {entry.sources && entry.sources.length > 0 && (
                      <p style={{ fontSize: '0.78rem', marginTop: '0.6rem' }}>
                        <span style={{ fontWeight: 600 }}>Grundlagen: </span>
                        {entry.sources.join('; ')}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <div className="notice" style={{ marginBottom: '1rem' }}>
                    Zu diesem Vers liegt noch kein eigener Artikel vor. Die Sammlung wächst
                    schrittweise – hier zunächst die Einordnung des ganzen Buches.
                  </div>
                  {profile && (
                    <>
                      <h4>{book.name}</h4>
                      <p style={{ fontStyle: 'italic' }}>{profile.subtitle}</p>
                      <p>
                        <strong>Verfasser: </strong>
                        {profile.author}
                      </p>
                      <p>
                        <strong>Zeit: </strong>
                        {profile.time}
                      </p>
                      <p>
                        <strong>Anlass: </strong>
                        {profile.occasion}
                      </p>
                      <p>
                        <strong>Kernaussage: </strong>
                        {profile.message}
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
          )}

          {tab === 'auslegung' && (
            <div className="panel__article">
              {entries.length > 0 ? (
                <>
                  <div className="notice" style={{ marginBottom: '1rem' }}>
                    Verbreitete Deutungen nebeneinander – ohne Wertung, jeweils mit Angabe der
                    Tradition.
                  </div>
                  {entries.flatMap((entry) =>
                    entry.interpretations.map((interp) => (
                      <div className="interp" key={`${entry.title}-${interp.tradition}`}>
                        <div className="interp__tradition">{interp.tradition}</div>
                        <p>{interp.text}</p>
                      </div>
                    )),
                  )}
                </>
              ) : (
                <div className="notice">
                  Zu diesem Vers sind noch keine Auslegungen erfasst. Der redaktionelle Bestand
                  beginnt bei den meistgelesenen Abschnitten und wird ausgebaut.
                </div>
              )}
            </div>
          )}

          {tab === 'verweise' && (
            <div>
              {entries.some((e) => e.crossRefs?.length) ? (
                entries.flatMap((entry) =>
                  (entry.crossRefs ?? []).map((xref) => (
                    <Link
                      key={`${xref.book}${xref.chapter}${xref.verse}`}
                      className="xref"
                      to={`/bibel/${xref.book}/${xref.chapter}?vers=${xref.verse}`}
                      onClick={onClose}
                    >
                      <strong>
                        {bookNameOf(xref.book)} {xref.chapter},{xref.verse}
                      </strong>
                      {xref.note && <span> — {xref.note}</span>}
                    </Link>
                  )),
                )
              ) : (
                <div className="notice">Zu diesem Vers sind noch keine Querverweise hinterlegt.</div>
              )}
            </div>
          )}

          {tab === 'notizen' && (
            <div>
              <div className="section-title">Markierung</div>
              <div className="swatches">
                {COLORS.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    aria-label={`Markierung ${color.label}`}
                    aria-pressed={highlight?.color === color.id}
                    className={`swatch${highlight?.color === color.id ? ' swatch--active' : ''}`}
                    style={{ background: `var(--hl-${color.id})` }}
                    onClick={() => toggleHighlight(ref_, color.id)}
                  />
                ))}
              </div>

              <div className="section-title">Auswendig lernen</div>
              <button
                type="button"
                className={`btn btn--sm${memoryCard ? '' : ' btn--primary'}`}
                style={{ marginBottom: '1.1rem' }}
                onClick={() =>
                  memoryCard ? removeMemoryCard(ref_) : addMemoryCard(ref_, text)
                }
              >
                {memoryCard
                  ? `✓ In den Merkversen (Stufe ${memoryCard.level})`
                  : 'Zu den Merkversen hinzufügen'}
              </button>

              <div className="section-title">Eigene Notiz</div>
              <textarea
                className="textarea"
                placeholder="Was fällt dir zu diesem Vers auf?"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <button
                type="button"
                className="btn btn--primary btn--sm"
                style={{ marginTop: '0.5rem' }}
                disabled={!draft.trim()}
                onClick={() => {
                  saveNote(ref_, draft);
                  setDraft('');
                }}
              >
                Notiz speichern
              </button>

              {notes.length > 0 && (
                <div style={{ marginTop: '1.25rem' }}>
                  <div className="section-title">Gespeichert</div>
                  {notes.map((note) => (
                    <div className="note-item" key={note.id}>
                      <div>{note.text}</div>
                      <div className="note-item__meta">
                        <span>{new Date(note.updatedAt).toLocaleDateString('de-DE')}</span>
                        <button
                          type="button"
                          className="btn btn--ghost btn--sm"
                          onClick={() => deleteNote(note.id)}
                        >
                          Löschen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
