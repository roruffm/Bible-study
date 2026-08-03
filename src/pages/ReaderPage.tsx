import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import VersePanel from '../components/VersePanel';
import LexiconSheet from '../components/LexiconSheet';
import { annotatedVerses } from '../content/commentary';
import { findLexiconEntry } from '../content/lexicon';
import { segmentChapter } from '../lib/lexiconText';
import { useAsync, useBibleIndex, usePersisted } from '../hooks/useStore';
import { findBook, loadBook, stepChapter, TRANSLATION_LABEL } from '../lib/bibleData';
import {
  getHighlights,
  getNotes,
  isChapterRead,
  setLastPosition,
  setSettings,
  getSettings,
  toggleChapterRead,
} from '../lib/storage';
import type { VerseRef } from '../lib/types';

export default function ReaderPage() {
  const { bookId = '', chapter: chapterParam = '1' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const chapter = Math.max(1, Number.parseInt(chapterParam, 10) || 1);
  const { data: index } = useBibleIndex();
  const { data: content, loading, error } = useAsync(() => loadBook(bookId), [bookId]);

  const [selected, setSelected] = useState<number | null>(null);
  const [lexiconId, setLexiconId] = useState<string | null>(null);
  const verseRefs = useRef(new Map<number, HTMLElement>());

  const book = index ? findBook(index, bookId) : undefined;
  const verses = content?.chapters[chapter - 1] ?? [];

  const highlights = usePersisted(getHighlights);
  const notes = usePersisted(getNotes);
  const settings = usePersisted(getSettings);
  const read = usePersisted(() => isChapterRead(bookId, chapter));

  const annotated = useMemo(() => annotatedVerses(bookId, chapter), [bookId, chapter]);
  const segments = useMemo(() => segmentChapter(verses), [verses]);

  const highlightByVerse = useMemo(() => {
    const map = new Map<number, string>();
    for (const h of highlights) {
      if (h.ref.book === bookId && h.ref.chapter === chapter) map.set(h.ref.verse, h.color);
    }
    return map;
  }, [highlights, bookId, chapter]);

  const notedVerses = useMemo(() => {
    const set = new Set<number>();
    for (const n of notes) {
      if (n.ref.book === bookId && n.ref.chapter === chapter) set.add(n.ref.verse);
    }
    return set;
  }, [notes, bookId, chapter]);

  useEffect(() => {
    if (book) setLastPosition(bookId, chapter);
  }, [book, bookId, chapter]);

  // Beim Kapitelwechsel nach oben, es sei denn, ein Vers wurde angesteuert.
  const targetVerse = Number.parseInt(searchParams.get('vers') ?? '', 10);
  useEffect(() => {
    if (!content) return;
    if (Number.isInteger(targetVerse) && targetVerse > 0) {
      setSelected(targetVerse);
      // Nach dem Rendern der Verse scrollen.
      requestAnimationFrame(() => {
        verseRefs.current.get(targetVerse)?.scrollIntoView({ block: 'center' });
      });
    } else {
      setSelected(null);
      window.scrollTo({ top: 0 });
    }
  }, [content, chapter, bookId, targetVerse]);

  // Blättern per Pfeiltasten, solange kein Eingabefeld aktiv ist.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (event.key === 'ArrowRight') go(1);
      else if (event.key === 'ArrowLeft') go(-1);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  function go(direction: 1 | -1) {
    if (!index) return;
    const next = stepChapter(index, bookId, chapter, direction);
    if (next) navigate(`/bibel/${next.book}/${next.chapter}`);
  }

  function selectVerse(verse: number) {
    setSelected(verse);
    // Die Auswahl in der Adresse spiegeln, damit sie teilbar bleibt.
    const params = new URLSearchParams(searchParams);
    params.set('vers', String(verse));
    setSearchParams(params, { replace: true });
  }

  function closePanel() {
    setSelected(null);
    const params = new URLSearchParams(searchParams);
    params.delete('vers');
    setSearchParams(params, { replace: true });
  }

  if (error) {
    return (
      <div className="empty">
        <p>Dieses Buch konnte nicht geladen werden.</p>
        <Link className="btn" to="/bibel">
          Zur Bibliothek
        </Link>
      </div>
    );
  }

  if (loading || !content || !index || !book) {
    return (
      <div className="empty">
        <span className="spinner" /> Kapitel wird geladen …
      </div>
    );
  }

  const selectedRef: VerseRef | null =
    selected !== null && verses[selected - 1] !== undefined
      ? { book: bookId, chapter, verse: selected }
      : null;

  const prev = stepChapter(index, bookId, chapter, -1);
  const next = stepChapter(index, bookId, chapter, 1);

  return (
    <div className={`reader${selectedRef ? ' reader--with-panel' : ''}`}>
      <div>
        <div className="reader__head">
          <div>
            <h1 className="reader__title">
              {book.name} {chapter}
            </h1>
            <div className="settings-row__hint">
              {TRANSLATION_LABEL} · {verses.length} Verse
            </div>
          </div>

          <div className="reader__tools">
            <button
              type="button"
              className="btn btn--sm"
              onClick={() => setSettings({ fontScale: Math.max(0.8, settings.fontScale - 0.1) })}
              aria-label="Schrift verkleinern"
            >
              A−
            </button>
            <button
              type="button"
              className="btn btn--sm"
              onClick={() => setSettings({ fontScale: Math.min(1.8, settings.fontScale + 0.1) })}
              aria-label="Schrift vergrößern"
            >
              A+
            </button>
            <button
              type="button"
              className={`btn btn--sm${read ? ' btn--primary' : ''}`}
              onClick={() => toggleChapterRead(bookId, chapter)}
            >
              {read ? '✓ Gelesen' : 'Als gelesen markieren'}
            </button>
          </div>
        </div>

        <div className="reader__body">
          <p className="reader__text">
            {verses.map((text, i) => {
              const verseNumber = i + 1;
              const color = highlightByVerse.get(verseNumber);
              const classes = [
                'verse',
                selected === verseNumber ? 'verse--selected' : '',
                color ? `verse--hl-${color}` : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <span key={verseNumber}>
                  <span
                    id={`v${verseNumber}`}
                    ref={(el) => {
                      if (el) verseRefs.current.set(verseNumber, el);
                      else verseRefs.current.delete(verseNumber);
                    }}
                    className={classes}
                    role="button"
                    tabIndex={0}
                    onClick={() => selectVerse(verseNumber)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectVerse(verseNumber);
                      }
                    }}
                  >
                    <span
                      className={`verse__num${annotated.has(verseNumber) ? ' verse__num--annotated' : ''}`}
                      title={
                        annotated.has(verseNumber)
                          ? 'Historischer Kontext und Auslegungen verfügbar'
                          : undefined
                      }
                    >
                      {verseNumber}
                    </span>
                    {notedVerses.has(verseNumber) && (
                      <span className="verse__note" title="Eigene Notiz vorhanden">
                        📝
                      </span>
                    )}
                    {(segments[i] ?? [{ text }]).map((segment, s) =>
                      segment.entryId ? (
                        <span
                          key={s}
                          className="lex"
                          role="button"
                          tabIndex={0}
                          title="Im Lexikon nachschlagen"
                          onClick={(e) => {
                            // Sonst öffnet sich zusätzlich das Vers-Panel.
                            e.stopPropagation();
                            setLexiconId(segment.entryId!);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              setLexiconId(segment.entryId!);
                            }
                          }}
                        >
                          {segment.text}
                        </span>
                      ) : (
                        <span key={s}>{segment.text}</span>
                      ),
                    )}
                  </span>{' '}
                </span>
              );
            })}
          </p>

          <div className="reader__nav">
            {prev ? (
              <Link className="btn" to={`/bibel/${prev.book}/${prev.chapter}`}>
                ← {findBook(index, prev.book)?.abbr} {prev.chapter}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className="btn" to={`/bibel/${next.book}/${next.chapter}`}>
                {findBook(index, next.book)?.abbr} {next.chapter} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>

      {selectedRef && (
        <VersePanel
          index={index}
          book={book}
          ref_={selectedRef}
          text={verses[selectedRef.verse - 1]}
          altNumbering={content.alt?.[`${chapter}.${selectedRef.verse}`]}
          onClose={closePanel}
        />
      )}

      {lexiconId && findLexiconEntry(lexiconId) && (
        <LexiconSheet entry={findLexiconEntry(lexiconId)!} onClose={() => setLexiconId(null)} />
      )}
    </div>
  );
}
