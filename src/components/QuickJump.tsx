import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseReference, suggestBooks } from '../lib/reference';
import type { BibleIndex } from '../lib/types';

/**
 * Schnellsprung: erkennt Eingaben wie „Joh 3,16“, „1. Mose 1“ oder „Psalm 23“
 * und schlägt passende Bücher vor. Enter springt direkt zur Stelle.
 */
export default function QuickJump({ index }: { index: BibleIndex | null }) {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const parsed = useMemo(
    () => (index && value.trim() ? parseReference(value, index) : null),
    [value, index],
  );
  const suggestions = useMemo(
    () => (index && value.trim() ? suggestBooks(value, index) : []),
    [value, index],
  );

  useEffect(() => {
    setActive(0);
  }, [value]);

  // Klick außerhalb schließt die Vorschlagsliste.
  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  function go(bookId: string, chapter: number, verse?: number) {
    navigate(`/bibel/${bookId}/${chapter}${verse ? `?vers=${verse}` : ''}`);
    setValue('');
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown' && suggestions.length > 0) {
      event.preventDefault();
      setActive((a) => Math.min(a + 1, suggestions.length - 1));
    } else if (event.key === 'ArrowUp' && suggestions.length > 0) {
      event.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      // Eine vollständige Stellenangabe hat Vorrang vor der Vorschlagsliste.
      if (parsed) go(parsed.book.id, parsed.chapter, parsed.verseFrom);
      else if (suggestions[active]) go(suggestions[active].id, 1);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const showList = open && value.trim().length > 0 && (parsed !== null || suggestions.length > 0);

  return (
    <div className="jump" ref={containerRef}>
      <label className="sr-only" htmlFor="quickjump">
        Bibelstelle suchen
      </label>
      <input
        id="quickjump"
        className="jump__input"
        placeholder="Stelle aufrufen, z. B. Joh 3,16"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        autoComplete="off"
        spellCheck={false}
      />

      {showList && (
        <div className="jump__list" role="listbox">
          {parsed && (
            <button
              type="button"
              className="jump__item jump__item--active"
              onClick={() => go(parsed.book.id, parsed.chapter, parsed.verseFrom)}
            >
              <strong>
                {parsed.book.name} {parsed.chapter}
                {parsed.verseFrom ? `,${parsed.verseFrom}` : ''}
                {parsed.verseTo ? `-${parsed.verseTo}` : ''}
              </strong>
              <small>Aufrufen</small>
            </button>
          )}
          {suggestions
            .filter((b) => !parsed || b.id !== parsed.book.id)
            .map((book) => (
              <button
                key={book.id}
                type="button"
                className="jump__item"
                onClick={() => go(book.id, 1)}
              >
                <strong>{book.name}</strong>
                <small>{book.chapters} Kapitel</small>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
