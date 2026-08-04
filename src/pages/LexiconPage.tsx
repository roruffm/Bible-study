import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  LEXICON,
  LEXICON_KIND_LABEL,
  LEXICON_KIND_PLURAL,
  type LexiconKind,
} from '../content/lexicon';
import { placeForLexicon } from '../content/places';
import { useBibleIndex } from '../hooks/useStore';
import { normalize } from '../lib/reference';

const KINDS: (LexiconKind | 'alle')[] = [
  'alle',
  'person',
  'ort',
  'begriff',
  'mass',
  'amt',
  'brauch',
  'natur',
];

export default function LexiconPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: index } = useBibleIndex();
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<LexiconKind | 'alle'>('alle');

  const openId = searchParams.get('eintrag');

  const entries = useMemo(() => {
    const needle = normalize(query);
    return LEXICON.filter((entry) => {
      if (kind !== 'alle' && entry.kind !== kind) return false;
      if (!needle) return true;
      const haystack = normalize(
        [entry.term, ...(entry.aliases ?? []), entry.short].join(' '),
      );
      return haystack.includes(needle);
    }).sort((a, b) => a.term.localeCompare(b.term, 'de'));
  }, [query, kind]);

  const nameOf = (bookId: string) => index?.books.find((b) => b.id === bookId)?.name ?? bookId;

  return (
    <div>
      <h1 className="page-title">Lexikon</h1>
      <p className="page-lead">
        Personen, Orte und Schlüsselbegriffe. Beim Lesen sind diese Wörter im Bibeltext
        hervorgehoben – jeweils beim ersten Vorkommen im Kapitel, damit der Text lesbar bleibt.
      </p>

      <input
        className="input"
        placeholder="Im Lexikon suchen …"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: '0.85rem' }}
      />

      <div className="search__filters">
        {KINDS.map((value) => (
          <button
            key={value}
            type="button"
            className={`chip${kind === value ? ' chip--active' : ''}`}
            onClick={() => setKind(value)}
          >
            {value === 'alle' ? 'Alle' : LEXICON_KIND_PLURAL[value]}
          </button>
        ))}
        <span className="settings-row__hint" style={{ alignSelf: 'center' }}>
          {entries.length} Einträge
        </span>
      </div>

      <div className="stack">
        {entries.map((entry) => {
          const open = openId === entry.id;
          const place = placeForLexicon(entry.id);
          return (
            <article
              key={entry.id}
              id={entry.id}
              className="card"
              style={{ padding: '1rem 1.1rem' }}
            >
              <div className="lex-entry__head">
                <h3 className="lex-entry__term">{entry.term}</h3>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  {entry.fact && <span className="mention__fact">{entry.fact}</span>}
                  <span className={`chip chip--kind-${entry.kind}`}>
                    {LEXICON_KIND_LABEL[entry.kind]}
                  </span>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', marginBottom: entry.long ? '0.5rem' : 0 }}>
                {entry.short}
              </p>

              {entry.long && (
                <>
                  {open && <p style={{ color: 'var(--text-muted)' }}>{entry.long}</p>}
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => {
                      const next = new URLSearchParams(searchParams);
                      if (open) next.delete('eintrag');
                      else next.set('eintrag', entry.id);
                      setSearchParams(next, { replace: true });
                    }}
                  >
                    {open ? 'Weniger' : 'Mehr erfahren'}
                  </button>
                </>
              )}

              {entry.today && (
                <p className="settings-row__hint" style={{ marginTop: '0.4rem' }}>
                  <strong>Heute: </strong>
                  {entry.today}
                </p>
              )}

              <div className="day__portions" style={{ marginTop: '0.7rem' }}>
                {place && (
                  <Link className="chip" to={`/studium/karte?ort=${place.id}`}>
                    Auf der Karte
                  </Link>
                )}
                {(entry.refs ?? []).map((ref) => (
                  <Link
                    key={`${ref.book}${ref.chapter}${ref.verse}`}
                    className="chip"
                    to={`/bibel/${ref.book}/${ref.chapter}?vers=${ref.verse}`}
                    title={ref.note}
                  >
                    {nameOf(ref.book)} {ref.chapter},{ref.verse}
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {entries.length === 0 && <div className="empty">Kein Eintrag gefunden.</div>}
    </div>
  );
}
