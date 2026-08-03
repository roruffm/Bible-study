import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBibleIndex, usePersisted } from '../hooks/useStore';
import { getReadChapters } from '../lib/storage';
import { TRANSLATION_LABEL } from '../lib/bibleData';
import type { Testament } from '../lib/types';

export default function LibraryPage() {
  const { data: index, loading } = useBibleIndex();
  const [filter, setFilter] = useState<Testament | 'alle'>('alle');
  const readChapters = usePersisted(getReadChapters);

  if (loading || !index) {
    return (
      <div className="empty">
        <span className="spinner" /> Bibliothek wird geladen …
      </div>
    );
  }

  const groups = index.groups.filter((g) => filter === 'alle' || g.testament === filter);
  const readByBook = new Map<string, number>();
  for (const key of readChapters) {
    const book = key.slice(0, key.lastIndexOf('.'));
    readByBook.set(book, (readByBook.get(book) ?? 0) + 1);
  }

  return (
    <div>
      <h1 className="page-title">Bibliothek</h1>
      <p className="page-lead">
        Alle 66 Bücher in der Übersetzung {TRANSLATION_LABEL}, geordnet nach den Abschnitten des
        Kanons. Die Farbe am linken Rand zeigt die Gruppe.
      </p>

      <div className="search__filters">
        {(['alle', 'AT', 'NT'] as const).map((value) => (
          <button
            key={value}
            type="button"
            className={`chip${filter === value ? ' chip--active' : ''}`}
            onClick={() => setFilter(value)}
          >
            {value === 'alle' ? 'Alle Bücher' : value === 'AT' ? 'Altes Testament' : 'Neues Testament'}
          </button>
        ))}
      </div>

      {groups.map((group) => {
        const books = index.books.filter((b) => b.group === group.id);
        if (books.length === 0) return null;
        return (
          <section className="library__group" key={group.id}>
            <div className="library__head">
              <h3>{group.label}</h3>
              <span className="library__count">
                {books.length} {books.length === 1 ? 'Buch' : 'Bücher'}
              </span>
            </div>
            <div className="books">
              {books.map((book) => {
                const done = readByBook.get(book.id) ?? 0;
                return (
                  <Link
                    key={book.id}
                    className="book"
                    data-group={book.group}
                    to={`/bibel/${book.id}`}
                  >
                    <span className="book__name">{book.name}</span>
                    <span className="book__meta">
                      {book.chapters} Kapitel
                      {done > 0 && ` · ${done} gelesen`}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
