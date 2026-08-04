import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  GOSPELS,
  SYNOPSIS,
  SYNOPSIS_SECTIONS,
  findPericope,
  type GospelKey,
  type Pericope,
} from '../content/synopsis';
import { useAsync } from '../hooks/useStore';
import { loadBook } from '../lib/bibleData';
import type { BookContent } from '../lib/types';

/**
 * Evangelien-Synopse: dieselbe Erzählung in bis zu vier Fassungen
 * nebeneinander.
 *
 * Der Gewinn liegt nicht in der Übersicht, sondern im Nebeneinander des
 * Wortlauts – erst dort sieht man, dass Lukas „täglich“ ergänzt, dass Markus
 * den Hahn zweimal krähen lässt, dass die letzten Worte am Kreuz in jedem
 * Evangelium andere sind. Deshalb wird der Text wirklich geladen und
 * gegenübergestellt, statt nur Stellenangaben aufzulisten.
 */

function passageText(book: BookContent | undefined, chapter: number, from: number, to: number) {
  const verses = book?.chapters[chapter - 1];
  if (!verses) return [];
  return verses.slice(from - 1, to).map((text, i) => ({ verse: from + i, text }));
}

export default function SynopsisPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const openId = searchParams.get('abschnitt');
  const open = openId ? findPericope(openId) : undefined;

  // Nur laden, wenn wirklich verglichen wird – die vier Evangelien sind
  // zusammen rund ein Megabyte.
  const { data: books, loading } = useAsync<Record<string, BookContent>>(
    () =>
      open
        ? Promise.all(
            GOSPELS.filter((g) => open[g.key]).map((g) =>
              loadBook(g.id).then((content) => [g.id, content] as const),
            ),
          ).then((pairs) => Object.fromEntries(pairs))
        : null,
    [openId],
  );

  const bySection = useMemo(() => {
    const map = new Map<string, Pericope[]>();
    for (const section of SYNOPSIS_SECTIONS) map.set(section, []);
    for (const pericope of SYNOPSIS) map.get(pericope.section)?.push(pericope);
    return map;
  }, []);

  const shown = open ? GOSPELS.filter((g) => open[g.key]) : [];

  return (
    <div>
      <Link className="btn btn--ghost btn--sm" to="/studium" style={{ marginBottom: '1rem' }}>
        ← Studium
      </Link>

      <h1 className="page-title">Synopse der Evangelien</h1>
      <p className="page-lead">
        {SYNOPSIS.length} Abschnitte, die in mehreren Evangelien vorkommen – nebeneinandergelegt.
        Wo sich die Fassungen unterscheiden, steht darunter, worin. Die Einteilung folgt der
        gängigen Praxis der Synopsen; sie ist ein Vorschlag, keine Eigenschaft des Textes.
      </p>

      {open && (
        <section className="card syn__compare">
          <div className="syn__compare-head">
            <div>
              <div className="section-title" style={{ marginBottom: '0.25rem' }}>
                {open.section}
              </div>
              <h2 className="lex-entry__term">{open.title}</h2>
            </div>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => setSearchParams({}, { replace: true })}
            >
              Schließen
            </button>
          </div>

          {open.note && <p className="syn__note">{open.note}</p>}

          {loading && (
            <div className="empty">
              <span className="spinner" /> Evangelien werden geladen …
            </div>
          )}

          {books && (
            <div className="syn__columns" data-columns={shown.length}>
              {shown.map((gospel) => {
                const passage = open[gospel.key as GospelKey]!;
                return (
                  <div className="syn__column" key={gospel.key}>
                    <div className="syn__column-head">
                      <strong>{gospel.label}</strong>{' '}
                      <Link
                        className="syn__ref"
                        to={`/bibel/${gospel.id}/${passage.chapter}?vers=${passage.from}`}
                      >
                        {passage.chapter},{passage.from}–{passage.to}
                      </Link>
                    </div>
                    <p className="syn__text">
                      {passageText(books[gospel.id], passage.chapter, passage.from, passage.to).map(
                        (line) => (
                          <span key={line.verse}>
                            <span className="verse__num">{line.verse}</span> {line.text}{' '}
                          </span>
                        ),
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {SYNOPSIS_SECTIONS.map((section) => (
        <section key={section} style={{ marginTop: '1.75rem' }}>
          <div className="library__head">
            <h3>{section}</h3>
            <span className="library__count">{bySection.get(section)?.length ?? 0} Abschnitte</span>
          </div>

          <div className="card">
            {(bySection.get(section) ?? []).map((pericope) => (
              <button
                key={pericope.id}
                type="button"
                className={`syn__row${openId === pericope.id ? ' syn__row--active' : ''}`}
                onClick={() =>
                  setSearchParams(
                    openId === pericope.id ? {} : { abschnitt: pericope.id },
                    { replace: true },
                  )
                }
              >
                <span className="syn__title">
                  {pericope.title}
                  {pericope.note && <span className="syn__flag" title={pericope.note} />}
                </span>
                <span className="syn__cells">
                  {GOSPELS.map((gospel) => {
                    const passage = pericope[gospel.key];
                    return (
                      <span
                        key={gospel.key}
                        className={`syn__cell${passage ? '' : ' syn__cell--empty'}`}
                      >
                        {passage ? (
                          <>
                            <span className="syn__cell-book">{gospel.abbr}</span>{' '}
                            {passage.chapter},{passage.from}–{passage.to}
                          </>
                        ) : (
                          '—'
                        )}
                      </span>
                    );
                  })}
                </span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
