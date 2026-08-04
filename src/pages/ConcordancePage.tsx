import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useBibleIndex } from '../hooks/useStore';
import { buildCorpus, concordance, isCorpusReady, type Concordance } from '../lib/search';

/**
 * Konkordanz: alle Vorkommen eines Wortes, nach Büchern geordnet.
 *
 * Die Suche beantwortet „wo steht das?“, die Konkordanz beantwortet „wie
 * wird dieses Wort in der Bibel gebraucht?“. Deshalb steht hier nicht die
 * Relevanz obenan, sondern die biblische Reihenfolge und die Verteilung: Dass
 * „Gnade“ im Neuen Testament dichter steht als im Alten, sieht man erst, wenn
 * man die Bücher nebeneinanderlegt.
 */

/**
 * Vorkommen in einem Buch. Gezählt werden Treffer, nicht Verse – in einem
 * Vers kann dasselbe Wort mehrfach stehen, und die Summe muss zur
 * Gesamtzahl passen.
 */
function occurrencesIn(book: { hits: { score: number }[] }): number {
  return book.hits.reduce((n, hit) => n + hit.score, 0);
}

/** Ein paar Wörter, an denen sich das Verfahren zeigt. */
const BEISPIELE = ['Bund', 'Gnade', 'Gerechtigkeit', 'Hirte', 'Zorn', 'Weisheit', 'Sabbat'];

export default function ConcordancePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: index } = useBibleIndex();

  const word = searchParams.get('wort') ?? '';
  const [input, setInput] = useState(word);
  const [result, setResult] = useState<Concordance | null>(null);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(isCorpusReady());
  const [progress, setProgress] = useState(0);
  const [openBook, setOpenBook] = useState<string | null>(null);

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

  useEffect(() => {
    if (!ready || !word) return;
    let active = true;
    setBusy(true);
    concordance(word).then((res) => {
      if (!active) return;
      setResult(res);
      setBusy(false);
      setOpenBook(res.books[0]?.bookId ?? null);
    });
    return () => {
      active = false;
    };
  }, [ready, word]);

  /** Die stärkste Häufung – Maßstab für die Balken. */
  const maxHits = useMemo(
    () => Math.max(1, ...(result?.books.map(occurrencesIn) ?? [1])),
    [result],
  );

  const at = result?.books.filter((b) => b.testament === 'AT') ?? [];
  const nt = result?.books.filter((b) => b.testament === 'NT') ?? [];

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setSearchParams(input.trim() ? { wort: input.trim() } : {}, { replace: true });
  }

  return (
    <div>
      <Link className="btn btn--ghost btn--sm" to="/studium" style={{ marginBottom: '1rem' }}>
        ← Studium
      </Link>

      <h1 className="page-title">Konkordanz</h1>
      <p className="page-lead">
        Alle Stellen, an denen ein Wort vorkommt – in biblischer Reihenfolge statt nach Relevanz,
        mit der Verteilung über die Bücher. Gezählt werden ganze Wörter: „Bund“ trifft nicht
        „Bundeslade“.
      </p>

      <form className="search__bar" onSubmit={submit}>
        <input
          className="input"
          placeholder="Wort eingeben – Bund, Gnade, Hirte …"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn--primary" type="submit" disabled={!ready}>
          {ready ? 'Zählen' : `Text wird geladen … ${progress}%`}
        </button>
      </form>

      <div className="search__filters" style={{ marginTop: '0.6rem' }}>
        <span className="settings-row__hint" style={{ alignSelf: 'center' }}>
          Beispiele:
        </span>
        {BEISPIELE.map((item) => (
          <button
            key={item}
            type="button"
            className={`chip${word === item ? ' chip--active' : ''}`}
            onClick={() => {
              setInput(item);
              setSearchParams({ wort: item }, { replace: true });
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {busy && (
        <div className="empty">
          <span className="spinner" /> wird gezählt …
        </div>
      )}

      {!busy && result && result.total === 0 && word && (
        <div className="empty">
          „{result.word}“ kommt als eigenständiges Wort nicht vor. Die{' '}
          <Link className="link" to={`/suche?q=${encodeURIComponent(word)}`}>
            Volltextsuche
          </Link>{' '}
          findet auch Wortteile.
        </div>
      )}

      {!busy && result && result.total > 0 && (
        <>
          <div className="conc__summary card">
            <div>
              <div className="conc__number">{result.total}</div>
              <div className="settings-row__hint">Vorkommen</div>
            </div>
            <div>
              <div className="conc__number">{result.bookCount}</div>
              <div className="settings-row__hint">von {index?.books.length ?? 66} Büchern</div>
            </div>
            <div>
              <div className="conc__number">
                {at.reduce((n, b) => n + occurrencesIn(b), 0)} /{' '}
                {nt.reduce((n, b) => n + occurrencesIn(b), 0)}
              </div>
              <div className="settings-row__hint">Altes / Neues Testament</div>
            </div>
          </div>

          {[
            ['Altes Testament', at],
            ['Neues Testament', nt],
          ].map(([label, books]) => {
            const list = books as typeof at;
            if (list.length === 0) return null;
            return (
              <section key={label as string} style={{ marginTop: '1.75rem' }}>
                <div className="section-title">{label as string}</div>
                <div className="card">
                  {list.map((book) => {
                    const open = openBook === book.bookId;
                    return (
                      <div key={book.bookId} className="conc__book">
                        <button
                          type="button"
                          className="conc__head"
                          onClick={() => setOpenBook(open ? null : book.bookId)}
                          aria-expanded={open}
                        >
                          <span className="conc__name">{book.bookName}</span>
                          <span
                            className="conc__bar"
                            style={{ width: `${(occurrencesIn(book) / maxHits) * 100}%` }}
                            aria-hidden="true"
                          />
                          <span className="conc__count">{occurrencesIn(book)}</span>
                        </button>

                        {open && (
                          <div className="conc__hits">
                            {book.hits.map((hit) => (
                              <Link
                                key={`${hit.ref.chapter}-${hit.ref.verse}`}
                                className="xref"
                                to={`/bibel/${hit.ref.book}/${hit.ref.chapter}?vers=${hit.ref.verse}`}
                              >
                                <strong>
                                  {book.bookAbbr} {hit.ref.chapter},{hit.ref.verse}
                                </strong>
                                <span> — {hit.text}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </>
      )}
    </div>
  );
}
