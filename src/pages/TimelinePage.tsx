import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  EPOCHS,
  KIND_HINT,
  KIND_LABEL,
  TIMELINE,
  formatSpan,
  formatYear,
  type Certainty,
  type EventKind,
} from '../content/timeline';
import { useBibleIndex } from '../hooks/useStore';

/**
 * Zeitleiste. Oben eine maßstabsgetreue Achse, die zeigt, wie ungleich sich
 * die Epochen über die Jahrtausende verteilen; darunter die Ereignisse nach
 * Epochen gruppiert – das bleibt auch auf schmalen Bildschirmen lesbar.
 *
 * Filter und Epochenauswahl stehen in der Adresse, damit ein Artikel direkt
 * auf seine Epoche verlinken kann und der Zustand teilbar bleibt.
 */

const CERTAINTY_LABEL: Record<Certainty, string> = {
  gesichert: 'gesichert',
  ungefähr: 'ungefähr datiert',
  umstritten: 'Datierung umstritten',
};

const KINDS: EventKind[] = ['biblisch', 'welt', 'fund', 'text'];

export default function TimelinePage() {
  const { data: index } = useBibleIndex();
  const [searchParams, setSearchParams] = useSearchParams();

  const epoch = searchParams.get('epoche');
  const kind = searchParams.get('art') as EventKind | null;

  // Die Achse umspannt genau das, was auch tatsächlich vorkommt.
  const [start, end] = useMemo(() => {
    const years = TIMELINE.flatMap((e) => [e.year, e.until ?? e.year]);
    const epochYears = EPOCHS.flatMap((e) => [e.from, e.to]);
    const all = [...years, ...epochYears];
    return [Math.min(...all) - 60, Math.max(...all) + 60];
  }, []);

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params, { replace: true });
  }

  const position = (year: number) => ((year - start) / (end - start)) * 100;
  const nameOf = (bookId: string) => index?.books.find((b) => b.id === bookId)?.name ?? bookId;

  const shownEpochs = epoch ? EPOCHS.filter((e) => e.id === epoch) : EPOCHS;
  const matchesKind = (eventKind: EventKind) => !kind || eventKind === kind;
  const visible = TIMELINE.filter((e) => matchesKind(e.kind));

  return (
    <div>
      <Link className="btn btn--ghost btn--sm" to="/studium" style={{ marginBottom: '1rem' }}>
        ← Studium
      </Link>

      <h1 className="page-title">Zeitleiste</h1>
      <p className="page-lead">
        Über drei Jahrtausende auf einen Blick – und zwar vier Arten von Einträgen nebeneinander:
        wovon die Bibel erzählt, was gleichzeitig anderswo geschah, was sich außerhalb der Bibel
        nachweisen lässt und wann die Bücher selbst entstanden. Je weiter man zurückgeht, desto
        unsicherer werden die Daten; die Angabe an jedem Eintrag sagt, wie belastbar sie ist.
      </p>

      {/* Maßstabsgetreue Achse */}
      <div className="axis" role="presentation">
        {EPOCHS.map((item, i) => (
          <button
            key={item.id}
            type="button"
            // Auf drei Reihen versetzt: Bei echtem Maßstab sind kurze Epochen
            // wie das Exil so schmal, dass ihre Beschriftung sonst mitten im
            // Wort abgeschnitten würde. Versetzt darf sie über den Nachbarn
            // hinausragen, ohne ihn zu überdecken.
            data-row={i % 3}
            className={`axis__band${epoch === item.id ? ' axis__band--active' : ''}`}
            style={{
              left: `${position(item.from)}%`,
              width: `${position(item.to) - position(item.from)}%`,
            }}
            onClick={() => setParam('epoche', epoch === item.id ? null : item.id)}
            title={`${item.label}: ${formatYear(item.from)} bis ${formatYear(item.to)}`}
          >
            <span>{item.label}</span>
          </button>
        ))}

        {[-3000, -2000, -1000, 0].map((year) => {
          const left = position(year);
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

      <div className="search__filters">
        <button
          type="button"
          className={`chip${!kind ? ' chip--active' : ''}`}
          onClick={() => setParam('art', null)}
        >
          Alles
        </button>
        {KINDS.map((value) => (
          <button
            key={value}
            type="button"
            className={`chip${kind === value ? ' chip--active' : ''}`}
            onClick={() => setParam('art', value)}
            title={KIND_HINT[value]}
          >
            {KIND_LABEL[value]}
          </button>
        ))}
        {epoch && (
          <button type="button" className="chip" onClick={() => setParam('epoche', null)}>
            ✕ Alle Epochen
          </button>
        )}
        <span className="settings-row__hint" style={{ alignSelf: 'center' }}>
          {visible.length} Einträge
        </span>
      </div>

      {kind && (
        <div className="notice" style={{ marginBottom: '1.25rem' }}>
          {KIND_HINT[kind]}
        </div>
      )}

      {shownEpochs.map((item) => {
        const events = visible
          .filter((e) => e.epoch === item.id)
          .sort((a, b) => a.year - b.year);
        if (events.length === 0) return null;

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
                      <span className={`chip chip--art-${event.kind}`}>
                        {KIND_LABEL[event.kind]}
                      </span>
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
