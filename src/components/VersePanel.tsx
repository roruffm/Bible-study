import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import VerseChat from './VerseChat';
import VerseCompare from './VerseCompare';
import { commentaryFor, WORLD_ASPECT_LABEL } from '../content/commentary';
import { BOOK_PROFILES } from '../content/bookProfiles';
import { LEXICON_KIND_LABEL } from '../content/lexicon';
import { EPOCHS } from '../content/timeline';
import { lexiconInVerse } from '../lib/lexiconText';
import { usePersisted } from '../hooks/useStore';
import {
  addMemoryCard,
  deleteNote,
  getHighlight,
  getMemoryCard,
  getNotesFor,
  getSettings,
  removeMemoryCard,
  saveNote,
  toggleHighlight,
} from '../lib/storage';
import type { BibleIndex, BookContent, BookMeta, HighlightColor, VerseRef } from '../lib/types';

type Tab = 'kontext' | 'auslegung' | 'verweise' | 'fragen' | 'notizen';

const TABS: { id: Tab; label: string }[] = [
  { id: 'kontext', label: 'Kontext' },
  { id: 'auslegung', label: 'Auslegung' },
  { id: 'verweise', label: 'Verweise' },
  { id: 'fragen', label: 'Fragen' },
  { id: 'notizen', label: 'Notizen' },
];

/** Leerzeilen im Artikeltext werden zu Absätzen. */
function paragraphs(text: string | undefined): string[] {
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .map((t) => t.trim())
    .filter(Boolean);
}

const COLORS: { id: HighlightColor; label: string }[] = [
  { id: 'gelb', label: 'Gelb' },
  { id: 'gruen', label: 'Grün' },
  { id: 'blau', label: 'Blau' },
  { id: 'rosa', label: 'Rosa' },
];

interface Props {
  index: BibleIndex;
  book: BookMeta;
  /** Das ganze Buch – der Fragen-Tab braucht den Zusammenhang, nicht nur den Vers. */
  content: BookContent;
  ref_: VerseRef;
  text: string;
  /** Abweichende Zählung der gedruckten Lutherbibel, falls vorhanden. */
  altNumbering?: string;
  onClose: () => void;
}

export default function VersePanel({
  index,
  book,
  content,
  ref_,
  text,
  altNumbering,
  onClose,
}: Props) {
  const [tab, setTab] = useState<Tab>('kontext');
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState('');

  const entries = useMemo(
    () => commentaryFor(ref_.book, ref_.chapter, ref_.verse),
    [ref_.book, ref_.chapter, ref_.verse],
  );
  const mentioned = useMemo(() => lexiconInVerse(text), [text]);
  const profile = BOOK_PROFILES[ref_.book];

  const settings = usePersisted(getSettings);
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

          {/* Der englische Wortlaut steht über allen Reitern: Er gehört zum
              Vers selbst, nicht zu einem einzelnen Studienschritt. */}
          {settings.showComparison && <VerseCompare book={book} ref_={ref_} />}

          {tab === 'kontext' && (
            <div className="panel__article">
              {/* Sachwissen zu allem, was in diesem Vers vorkommt – das greift
                  auch dort, wo es keinen eigenen Artikel gibt. */}
              {mentioned.length > 0 && (
                <section style={{ marginBottom: '1.5rem' }}>
                  <div className="section-title">Im Vers erwähnt</div>
                  {mentioned.map((entry) => (
                    <div className="mention" key={entry.id}>
                      <div className="mention__head">
                        <strong>{entry.term}</strong>
                        {entry.fact && <span className="mention__fact">{entry.fact}</span>}
                        <span className={`chip chip--kind-${entry.kind}`}>
                          {LEXICON_KIND_LABEL[entry.kind]}
                        </span>
                      </div>
                      <p>{entry.short}</p>
                      <div className="day__portions">
                        <Link
                          className="chip"
                          to={`/lexikon?eintrag=${entry.id}`}
                          onClick={onClose}
                        >
                          Mehr im Lexikon
                        </Link>
                        <Link
                          className="chip"
                          to={`/studium/konkordanz?wort=${encodeURIComponent(entry.term)}`}
                          onClick={onClose}
                          title={`Alle Stellen mit „${entry.term}“`}
                        >
                          Alle Stellen
                        </Link>
                      </div>
                    </div>
                  ))}
                </section>
              )}
              {entries.length > 0 ? (
                entries.map((entry) => (
                  <div key={entry.title} style={{ marginBottom: '1.25rem' }}>
                    <h4>{entry.title}</h4>

                    {/* Ereigniszeit und Entstehungszeit fallen in der Bibel oft
                        weit auseinander – deshalb stehen sie getrennt. */}
                    {entry.dating && (
                      <dl className="dating">
                        {entry.dating.events && (
                          <>
                            <dt>Ereignis</dt>
                            <dd>{entry.dating.events}</dd>
                          </>
                        )}
                        {entry.dating.written && (
                          <>
                            <dt>Aufgeschrieben</dt>
                            <dd>{entry.dating.written}</dd>
                          </>
                        )}
                        {entry.dating.epoch && (
                          <>
                            <dt>Epoche</dt>
                            <dd>
                              <Link
                                to={`/studium/zeitleiste?epoche=${entry.dating.epoch}`}
                                onClick={onClose}
                              >
                                {EPOCHS.find((e) => e.id === entry.dating!.epoch)?.label ??
                                  entry.dating.epoch}{' '}
                                →
                              </Link>
                            </dd>
                          </>
                        )}
                      </dl>
                    )}

                    <p>{entry.historicalShort}</p>
                    {(entry.historicalLong || entry.terms?.length || entry.reception) && (
                      <>
                        {expanded && (
                          <>
                            {paragraphs(entry.historicalLong).map((text, i) => (
                              <p key={i}>{text}</p>
                            ))}

                            {/* Zuerst die Lage des Textes, dann seine Sprache,
                                zuletzt seine Nachgeschichte – in dieser
                                Reihenfolge liest man einen fremden Text. */}
                            {entry.world && entry.world.length > 0 && (
                              <section className="deepen">
                                <div className="section-title">Die Welt des Textes</div>
                                {entry.world.map((note, i) => (
                                  <div className="world" key={i}>
                                    <div className="world__aspect">
                                      {WORLD_ASPECT_LABEL[note.aspect]}
                                    </div>
                                    <p>{note.text}</p>
                                  </div>
                                ))}
                              </section>
                            )}

                            {/* Der Urtext steht hinter der Übersetzung, nicht
                                neben ihr – deshalb erst hier, nicht in der
                                Kurzansicht. */}
                            {entry.terms && entry.terms.length > 0 && (
                              <section className="deepen">
                                <div className="section-title">Im Urtext</div>
                                {entry.terms.map((term) => (
                                  <p key={term.word} className="term">
                                    <strong>{term.word}</strong>
                                    {term.rendered && (
                                      <span className="term__rendered">
                                        {' '}
                                        – bei Luther „{term.rendered}“
                                      </span>
                                    )}
                                    <br />
                                    {term.note}
                                  </p>
                                ))}
                              </section>
                            )}

                            {entry.reception && (
                              <section className="deepen">
                                <div className="section-title">Was der Text bewirkt hat</div>
                                {paragraphs(entry.reception).map((text, i) => (
                                  <p key={i}>{text}</p>
                                ))}
                              </section>
                            )}
                          </>
                        )}
                        <button
                          type="button"
                          className="btn btn--ghost btn--sm"
                          onClick={() => setExpanded((v) => !v)}
                        >
                          {expanded ? 'Weniger anzeigen' : 'Mehr erfahren'}
                        </button>
                      </>
                    )}
                    {(() => {
                      // Wo der Artikel nichts Eigenes nennt, steht die
                      // Standardliteratur zum Buch – eine ehrliche Angabe auf
                      // Buchebene ist besser als eine leere Zeile.
                      const grundlagen = entry.sources?.length
                        ? entry.sources
                        : (profile?.literature ?? []);
                      if (grundlagen.length === 0) return null;
                      return (
                        <p className="sources">
                          <span>Grundlagen: </span>
                          {grundlagen.join('; ')}
                        </p>
                      );
                    })()}
                  </div>
                ))
              ) : (
                <>
                  <div className="notice" style={{ marginBottom: '1rem' }}>
                    Zu diesem Vers liegt noch kein eigener Artikel vor. Die Sammlung wächst
                    schrittweise – hier die Einordnung des ganzen Buches
                    {mentioned.length > 0 ? ', ergänzt um das Sachwissen oben.' : '.'}
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
                      {profile.literature && profile.literature.length > 0 && (
                        <p className="sources">
                          <span>Grundlagen: </span>
                          {profile.literature.join('; ')}
                        </p>
                      )}
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

          {tab === 'fragen' && (
            <VerseChat
              index={index}
              content={content}
              ref_={ref_}
              text={text}
              onClose={onClose}
            />
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
