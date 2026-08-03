import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useBibleIndex } from '../hooks/useStore';
import { buildCorpus, isCorpusReady, search, splitByTerms, type SearchFilter } from '../lib/search';
import type { SearchHit } from '../lib/types';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: index } = useBibleIndex();

  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [filter, setFilter] = useState<SearchFilter>({});
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [terms, setTerms] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(isCorpusReady());
  const [progress, setProgress] = useState(0);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Den Volltextindex einmalig im Hintergrund aufbauen.
  useEffect(() => {
    if (isCorpusReady()) return;
    let active = true;
    buildCorpus((loaded, all) => active && setProgress(Math.round((loaded / all) * 100))).then(
      () => active && setReady(true),
      () => undefined,
    );
    return () => {
      active = false;
    };
  }, []);

  const initialQuery = searchParams.get('q') ?? '';
  useEffect(() => {
    if (ready && initialQuery) void run(initialQuery, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, initialQuery]);

  async function run(value: string, activeFilter: SearchFilter) {
    if (!value.trim()) return;
    setBusy(true);
    setSearched(true);
    const result = await search(value, activeFilter);
    setHits(result.hits);
    setTerms(result.terms);
    setTotal(result.total);
    setBusy(false);
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setSearchParams(query.trim() ? { q: query.trim() } : {}, { replace: true });
    void run(query, filter);
  }

  function applyFilter(next: SearchFilter) {
    setFilter(next);
    if (query.trim()) void run(query, next);
  }

  return (
    <div>
      <h1 className="page-title">Suche</h1>
      <p className="page-lead">
        Volltextsuche über alle 31.102 Verse. Mehrere Wörter werden zusammen gesucht; für eine
        wörtliche Wendung setze sie in Anführungszeichen.
      </p>

      <form className="search__bar" onSubmit={submit}>
        <input
          ref={inputRef}
          className="input"
          placeholder="Zum Beispiel: Hoffnung, oder &quot;guter Hirte&quot;"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button type="submit" className="btn btn--primary" disabled={!ready || busy}>
          Suchen
        </button>
      </form>

      <div className="search__filters">
        <button
          type="button"
          className={`chip${!filter.testament ? ' chip--active' : ''}`}
          onClick={() => applyFilter({ ...filter, testament: undefined })}
        >
          Ganze Bibel
        </button>
        <button
          type="button"
          className={`chip${filter.testament === 'AT' ? ' chip--active' : ''}`}
          onClick={() => applyFilter({ ...filter, testament: 'AT' })}
        >
          Altes Testament
        </button>
        <button
          type="button"
          className={`chip${filter.testament === 'NT' ? ' chip--active' : ''}`}
          onClick={() => applyFilter({ ...filter, testament: 'NT' })}
        >
          Neues Testament
        </button>

        {index && (
          <select
            className="chip"
            value={filter.bookId ?? ''}
            onChange={(e) => applyFilter({ ...filter, bookId: e.target.value || undefined })}
            aria-label="Auf ein Buch einschränken"
          >
            <option value="">Alle Bücher</option>
            {index.books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {!ready && (
        <div className="notice">
          <span className="spinner" /> Der Bibeltext wird für die Suche vorbereitet … {progress} %
          <div className="progress">
            <div className="progress__bar" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {ready && searched && (
        <>
          <div className="section-title">
            {busy ? 'Wird gesucht …' : `${total} Treffer${total > hits.length ? ` – die ersten ${hits.length}` : ''}`}
          </div>
          {hits.length === 0 && !busy && (
            <div className="empty">Keine Stelle gefunden. Versuche ein anderes Wort.</div>
          )}
          <div className="card">
            {hits.map((hit) => (
              <Link
                key={`${hit.ref.book}${hit.ref.chapter}${hit.ref.verse}`}
                className="hit"
                to={`/bibel/${hit.ref.book}/${hit.ref.chapter}?vers=${hit.ref.verse}`}
              >
                <div className="hit__ref">
                  {hit.bookName} {hit.ref.chapter},{hit.ref.verse}
                </div>
                <div className="hit__text">
                  {splitByTerms(hit.text, terms).map((part, i) =>
                    part.hit ? <mark key={i}>{part.text}</mark> : <span key={i}>{part.text}</span>,
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
