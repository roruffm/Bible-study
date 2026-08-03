import { Link } from 'react-router-dom';
import {
  READING_PLANS,
  TOPIC_HINT,
  TOPIC_LABEL,
  type PlanTopic,
} from '../content/readingPlans';
import { useBibleIndex, usePersisted } from '../hooks/useStore';
import { getActivePlan, getPlanProgress } from '../lib/storage';

const TOOLS = [
  {
    to: '/lexikon',
    label: 'Nachschlagen',
    title: 'Lexikon',
    description:
      'Personen, Orte und Schlüsselbegriffe – im Bibeltext hervorgehoben und mit einem Tippen erklärt.',
  },
  {
    to: '/studium/zeitleiste',
    label: 'Einordnen',
    title: 'Zeitleiste',
    description:
      'Zwei Jahrtausende von Abraham bis zur frühen Kirche, mit ehrlicher Angabe zur Sicherheit der Daten.',
  },
  {
    to: '/studium/karte',
    label: 'Verorten',
    title: 'Karte',
    description: 'Die Welt der Bibel von Rom bis Mesopotamien, samt der vier Reisen des Paulus.',
  },
  {
    to: '/studium/merkverse',
    label: 'Behalten',
    title: 'Merkverse',
    description:
      'Verse auswendig lernen: mit jeder Stufe verschwinden mehr Wörter, die Abstände wachsen.',
  },
];

/** Übersicht über die Lesepläne. */
export default function StudyPage() {
  const { data: index } = useBibleIndex();
  const activePlan = usePersisted(getActivePlan);

  const durchlesen = READING_PLANS.filter((p) => p.kind === 'durchlesen');

  // Themenpläne nach Sachgebiet gruppieren – bei einem Dutzend Plänen findet
  // man den passenden sonst nicht mehr.
  const topics: PlanTopic[] = ['einstieg', 'lebensfragen', 'glaube', 'welt'];
  const byTopic = topics
    .map((topic) => ({
      topic,
      plans: READING_PLANS.filter((p) => p.kind === 'thema' && p.topic === topic),
    }))
    .filter((group) => group.plans.length > 0);

  return (
    <div>
      <h1 className="page-title">Studium</h1>
      <p className="page-lead">
        Lesepläne geben dem Studium einen Rhythmus. Wähle einen Plan, hake die Tage ab – die App
        merkt sich, wo du stehst, und zeigt dir den nächsten Abschnitt auf der Startseite.
      </p>

      <section style={{ marginBottom: '2.5rem' }}>
        <div className="library__head">
          <h3>Werkzeuge</h3>
          <span className="library__count">Nachschlagen, einordnen, behalten</span>
        </div>
        <div className="plan-grid">
          {TOOLS.map((tool) => (
            <Link key={tool.to} className="plan" to={tool.to} data-kind="werkzeug">
              <div className="plan__head">
                <span className="tile__label">{tool.label}</span>
              </div>
              <div className="plan__title">{tool.title}</div>
              <p className="plan__subtitle" style={{ marginBottom: 0 }}>
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <div className="library__head">
          <h3>Die Bibel durchlesen</h3>
          <span className="library__count">Kapitel für Kapitel</span>
        </div>
        <div className="plan-grid">
          {durchlesen.map((plan) => (
            <PlanCard key={plan.id} planId={plan.id} active={activePlan === plan.id} />
          ))}
        </div>
      </section>

      <div className="section-title" style={{ marginBottom: '1rem' }}>
        Rote Fäden · kuratierte Wege durch ein Thema
      </div>

      {byTopic.map(({ topic, plans }) => (
        <section key={topic} style={{ marginBottom: '2.5rem' }}>
          <div className="library__head">
            <h3>{TOPIC_LABEL[topic]}</h3>
            <span className="library__count">{TOPIC_HINT[topic]}</span>
          </div>
          <div className="plan-grid">
            {plans.map((plan) => (
              <PlanCard key={plan.id} planId={plan.id} active={activePlan === plan.id} />
            ))}
          </div>
        </section>
      ))}

      {!index && (
        <div className="notice" style={{ marginTop: '1.5rem' }}>
          <span className="spinner" /> Die Bibliothek wird geladen …
        </div>
      )}
    </div>
  );
}

function PlanCard({ planId, active }: { planId: string; active: boolean }) {
  const plan = READING_PLANS.find((p) => p.id === planId)!;
  const progress = usePersisted(() => getPlanProgress(planId));
  const percent = Math.round((progress.length / plan.days) * 100);

  return (
    <Link className="plan" to={`/studium/${plan.id}`} data-kind={plan.kind}>
      <div className="plan__head">
        <span className="tile__label">
          {plan.days} {plan.days === 1 ? 'Tag' : 'Tage'}
        </span>
        {active && <span className="chip chip--active">Aktiv</span>}
      </div>
      <div className="plan__title">{plan.title}</div>
      <p className="plan__subtitle">{plan.subtitle}</p>
      <div className="progress">
        <div className="progress__bar" style={{ width: `${percent}%` }} />
      </div>
      <div className="tile__meta">
        {progress.length} von {plan.days} Tagen · {percent} %
      </div>
    </Link>
  );
}
