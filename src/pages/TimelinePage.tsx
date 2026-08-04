import { Link, useSearchParams } from 'react-router-dom';
import { EPOCHS, TIMELINE, formatSpan, formatYear, type Certainty } from '../content/timeline';
import { useBibleIndex } from '../hooks/useStore';

/**
 * Zeitleiste. Oben eine maßstabsgetreue Achse, die zeigt, wie ungleich sich
 * die Epochen über die Jahrhunderte verteilen; darunter die Ereignisse nach
 * Epochen gruppiert – das bleibt auch auf schmalen Bildschirmen lesbar.
 */

const START = -1950;
const END = 110;

const CERTAINTY_LABEL: Record<Certainty, string> = {
  gesichert: 'gesichert',
  ungefähr: 'ungefähr datiert',
  umstritten: 'Datierung umstritten',
};

export default function TimelinePage() {
  const { data: index } = useBibleIndex();

  // Die Auswahl steht in der Adresse, damit ein Artikel direkt auf seine
  // Epoche verlinken kann und der Zustand teilbar bleibt.
  const [searchParams, setSearchParams] = useSearchParams();
  const epoch = searchParams.get('epoche');

  function setEpoch(next: string | null) {
    const params = new URLSearchParams(searchParams);
    if (next) params.set('epoche', next);
    else params.delete('epoche');
    setSearchParams(params, { replace: true });
  }

  const position = (year: number) => ((year - START) / (END - START)) * 100;
  const nameOf = (bookId: string) => index?.books.find((b) => b.id === bookId)?.name ?? bookId;

  const shown = epoch ? EPOCHS.filter((e) => e.id === epoch) : EPOCHS;

  return (
    <div>
      <Link className="btn btn--ghost btn--sm" to="/studium" style={{ marginBottom: '1rem' }}>
        ← Studium
      </Link>

      <h1 className="page-title">Zeitleiste</h1>
      <p className="page-lead">
        Zwei Jahrtausende auf einen Blick. Je weiter man zurückgeht, desto unsicherer werden die
        Daten – die Angabe an jedem Ereignis sagt, wie belastbar sie ist.
      </p>

      {/* Maßstabsgetreue Achse */}
      <div className="axis" role="presentation">
        {EPOCHS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`axis__band${epoch === item.id ? ' axis__band--active' : ''}`}
            style={{
              left: `${position(item.from)}%`,
              width: `${position(item.to) - position(item.from)}%`,
            }}
            onClick={() => setEpoch(epoch === item.id ? null : item.id)}
            title={`${item.label}: ${formatYear(item.from)} bis ${formatYear(item.to)}`}
          >
            <span>{item.label}</span>
          </button>
        ))}

        {[-1500, -1000, -500, 0].map((year) => {
          const left = position(year);
          // Am rechten Rand die Beschriftung nach innen klappen.
          const inward = left > 80;
          return (
            <div
              key={year}
              className={`axis__tick${inward ? ' axis__tick--inward' : ''}`}
              style={{ left: `${left}%` }}
            >
              <span>{year === 0 ? 'Zeitenwende' : `${Math.abs(year)} v. Chr.`}</span>
            </div>
          );
        })}
      </div>

      {epoch && (
        <button type="button" className="btn btn--sm" onClick={() => setEpoch(null)}>
          Alle Epochen zeigen
        </button>
      )}

      {shown.map((item) => {
        const events = TIMELINE.filter((e) => e.epoch === item.id).sort((a, b) => a.year - b.year);
        return (
          <section key={item.id} style={{ marginTop: '2rem' }}>
            <div className="library__head">
              <h3>{item.label}</h3>
              <span className="library__count">
                {formatYear(item.from)} – {formatYear(item.to)}
              </span>
            </div>
            <p className="page-lead" style={{ marginBottom: '0.85rem' }}>
              {item.summary}
            </p>

            <div className="card">
              {events.map((event) => (
                <div className="event" key={`${event.year}-${event.label}`}>
                  <div className="event__year">{formatSpan(event)}</div>
                  <div className="event__body">
                    <div className="event__label">
                      {event.label}
                      <span className={`chip chip--certainty-${event.certainty}`}>
                        {CERTAINTY_LABEL[event.certainty]}
                      </span>
                    </div>
                    <p className="day__note">{event.description}</p>
                    {event.ref && (
                      <Link
                        className="chip"
                        to={`/bibel/${event.ref.book}/${event.ref.chapter}${
                          event.ref.verse ? `?vers=${event.ref.verse}` : ''
                        }`}
                        style={{ marginTop: '0.4rem' }}
                      >
                        {nameOf(event.ref.book)} {event.ref.chapter}
                        {event.ref.verse ? `,${event.ref.verse}` : ''}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
