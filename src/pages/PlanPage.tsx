import { useMemo, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  buildDays,
  findPlan,
  portionLabel,
  portionLink,
  type PlanDay,
} from '../content/readingPlans';
import { useBibleIndex, usePersisted } from '../hooks/useStore';
import {
  getActivePlan,
  getPlanProgress,
  nextOpenDay,
  setActivePlan,
  togglePlanDay,
} from '../lib/storage';
import type { BibleIndex } from '../lib/types';

export default function PlanPage() {
  const { planId = '' } = useParams();
  const { data: index } = useBibleIndex();
  const plan = findPlan(planId);

  const progress = usePersisted(() => getPlanProgress(planId));
  const activePlan = usePersisted(getActivePlan);
  const nextDayRef = useRef<HTMLDivElement>(null);

  const days = useMemo(
    () => (plan && index ? buildDays(plan, index) : []),
    [plan, index],
  );

  const openDay = plan ? nextOpenDay(planId, plan.days) : null;

  // Beim Öffnen zum nächsten offenen Tag springen – bei 365 Tagen sonst mühsam.
  useEffect(() => {
    if (days.length > 0 && openDay !== null && openDay > 2) {
      nextDayRef.current?.scrollIntoView({ block: 'center' });
    }
  }, [days.length, openDay]);

  if (!plan) {
    return (
      <div className="empty">
        <p>Diesen Leseplan gibt es nicht.</p>
        <Link className="btn" to="/studium">
          Zu den Leseplänen
        </Link>
      </div>
    );
  }

  if (!index) {
    return (
      <div className="empty">
        <span className="spinner" /> Plan wird vorbereitet …
      </div>
    );
  }

  const done = new Set(progress);
  const percent = Math.round((progress.length / plan.days) * 100);
  const isActive = activePlan === plan.id;

  return (
    <div>
      <Link className="btn btn--ghost btn--sm" to="/studium" style={{ marginBottom: '1rem' }}>
        ← Lesepläne
      </Link>

      <h1 className="page-title">{plan.title}</h1>
      <p className="page-lead">{plan.subtitle}</p>

      <div className="card" style={{ padding: '1.1rem', marginBottom: '2rem' }}>
        <div className="tile__label">Fortschritt</div>
        <div className="tile__value">
          {progress.length} von {plan.days} Tagen
        </div>
        <div className="progress">
          <div className="progress__bar" style={{ width: `${percent}%` }} />
        </div>
        <div className="reader__tools" style={{ marginTop: '0.9rem' }}>
          <button
            type="button"
            className={`btn btn--sm${isActive ? '' : ' btn--primary'}`}
            onClick={() => setActivePlan(isActive ? null : plan.id)}
          >
            {isActive ? 'Nicht mehr auf der Startseite zeigen' : 'Diesen Plan verfolgen'}
          </button>
          {openDay !== null && (
            <span className="settings-row__hint">Als Nächstes: Tag {openDay + 1}</span>
          )}
          {openDay === null && <span className="settings-row__hint">Abgeschlossen 🎉</span>}
        </div>
      </div>

      <div className="section-title">Tagesabschnitte</div>
      <div className="card">
        {days.map((day, i) => (
          <DayRow
            key={i}
            day={day}
            number={i + 1}
            index={index}
            done={done.has(i)}
            isNext={openDay === i}
            anchorRef={openDay === i ? nextDayRef : undefined}
            onToggle={() => togglePlanDay(plan.id, i)}
          />
        ))}
      </div>
    </div>
  );
}

interface DayRowProps {
  day: PlanDay;
  number: number;
  index: BibleIndex;
  done: boolean;
  isNext: boolean;
  anchorRef?: React.RefObject<HTMLDivElement>;
  onToggle: () => void;
}

function DayRow({ day, number, index, done, isNext, anchorRef, onToggle }: DayRowProps) {
  const nameOf = (bookId: string) => index.books.find((b) => b.id === bookId)?.name ?? bookId;

  return (
    <div
      ref={anchorRef}
      className={`day${done ? ' day--done' : ''}${isNext ? ' day--next' : ''}`}
    >
      <button
        type="button"
        className={`day__check${done ? ' day__check--done' : ''}`}
        onClick={onToggle}
        aria-pressed={done}
        aria-label={`Tag ${number} ${done ? 'als offen markieren' : 'als gelesen markieren'}`}
      >
        {done ? '✓' : ''}
      </button>

      <div className="day__body">
        <div className="day__label">
          Tag {number}
          {isNext && !done && <span className="chip chip--active">Als Nächstes</span>}
        </div>
        {day.title && <div className="day__title">{day.title}</div>}
        <div className="day__portions">
          {day.portions.map((portion, i) => (
            <Link key={i} className="chip" to={portionLink(portion)}>
              {portionLabel(portion, nameOf(portion.book))}
            </Link>
          ))}
        </div>
        {day.note && <p className="day__note">{day.note}</p>}
      </div>
    </div>
  );
}
