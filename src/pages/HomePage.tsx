import { Link } from 'react-router-dom';
import { verseOfDay } from '../content/verseOfDay';
import { useAsync, useBibleIndex, usePersisted } from '../hooks/useStore';
import { findBook, loadBook, TRANSLATION_LABEL } from '../lib/bibleData';
import { getLastPosition, getNotes, getReadChapters } from '../lib/storage';

const TOTAL_CHAPTERS = 1189;

export default function HomePage() {
  const daily = verseOfDay();
  const { data: index } = useBibleIndex();
  const { data: dailyBook } = useAsync(() => loadBook(daily.ref.book), [daily.ref.book]);

  const lastPosition = usePersisted(getLastPosition);
  const readChapters = usePersisted(getReadChapters);
  const notes = usePersisted(getNotes);

  const dailyText = dailyBook?.chapters[daily.ref.chapter - 1]?.[daily.ref.verse - 1];
  const dailyBookMeta = index ? findBook(index, daily.ref.book) : undefined;
  const lastBookMeta = index && lastPosition ? findBook(index, lastPosition.book) : undefined;

  const percent = Math.round((readChapters.length / TOTAL_CHAPTERS) * 1000) / 10;

  return (
    <div>
      <h1 className="page-title">Heute</h1>
      <p className="page-lead">
        Ein Vers, ein Gedanke – und der Weg zurück an die Stelle, an der du zuletzt gelesen hast.
      </p>

      <div className="home__grid">
        <section className="card daily">
          <div className="daily__ref">
            Vers des Tages · {dailyBookMeta?.name ?? ''} {daily.ref.chapter},{daily.ref.verse}
          </div>
          {dailyText ? (
            <p className="daily__text">„{dailyText}“</p>
          ) : (
            <p className="daily__text" style={{ opacity: 0.5 }}>
              <span className="spinner" />
            </p>
          )}
          <p className="daily__impulse">{daily.impulse}</p>
          <Link
            className="btn btn--primary"
            to={`/bibel/${daily.ref.book}/${daily.ref.chapter}?vers=${daily.ref.verse}`}
          >
            Im Zusammenhang lesen
          </Link>
        </section>

        <div className="stack">
          {lastPosition && lastBookMeta ? (
            <Link
              className="tile"
              to={`/bibel/${lastPosition.book}/${lastPosition.chapter}`}
            >
              <div className="tile__label">Weiterlesen</div>
              <div className="tile__value">
                {lastBookMeta.name} {lastPosition.chapter}
              </div>
              <div className="tile__meta">
                zuletzt am {new Date(lastPosition.at).toLocaleDateString('de-DE')}
              </div>
            </Link>
          ) : (
            <Link className="tile" to="/bibel/joh/1">
              <div className="tile__label">Einstieg</div>
              <div className="tile__value">Johannes 1</div>
              <div className="tile__meta">Ein guter Anfang, wenn du neu beginnst</div>
            </Link>
          )}

          <div className="tile">
            <div className="tile__label">Lesefortschritt</div>
            <div className="tile__value">
              {readChapters.length} von {TOTAL_CHAPTERS} Kapiteln
            </div>
            <div className="tile__meta">{percent} % der Bibel gelesen</div>
            <div className="progress">
              <div className="progress__bar" style={{ width: `${percent}%` }} />
            </div>
          </div>

          <Link className="tile" to="/ich">
            <div className="tile__label">Studien-Journal</div>
            <div className="tile__value">
              {notes.length} {notes.length === 1 ? 'Notiz' : 'Notizen'}
            </div>
            <div className="tile__meta">Eigene Gedanken und Markierungen</div>
          </Link>

          <div className="notice">
            Textgrundlage: <strong>{TRANSLATION_LABEL}</strong> (gemeinfrei). Die Übersetzung
            <em> Hoffnung für Alle</em> wird ergänzt, sobald die Lizenz geklärt ist – die App ist
            darauf vorbereitet.
          </div>
        </div>
      </div>
    </div>
  );
}
