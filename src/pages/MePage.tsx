import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBibleIndex, usePersisted } from '../hooks/useStore';
import { isSingleFile } from '../lib/bibleData';
import { brandAsset } from '../lib/brand';
import {
  clearOfflineData,
  downloadAll,
  getOfflineStatus,
  isOfflineSupported,
  type OfflineStatus,
} from '../lib/offline';
import { findBook, TRANSLATION_LABEL } from '../lib/bibleData';
import {
  deleteNote,
  getHighlights,
  getNotes,
  getReadChapters,
  getChatSettings,
  getSettings,
  removeHighlight,
  setChatSettings,
  setSettings,
} from '../lib/storage';
import type { ThemeName } from '../lib/types';

const THEMES: { id: ThemeName; label: string }[] = [
  { id: 'hell', label: 'Hell' },
  { id: 'sepia', label: 'Sepia' },
  { id: 'dunkel', label: 'Dunkel' },
];

/**
 * Zugang für die Rückfragen am Vers.
 *
 * Die Karte redet Klartext statt zu beschwichtigen. Wer den Schlüssel in den
 * Browser legt, soll wissen, worauf er sich einlässt – und wer das nicht will,
 * soll den zweiten Weg finden, ohne danach suchen zu müssen.
 */
function ChatCard() {
  const chat = usePersisted(getChatSettings);

  return (
    <div className="card" style={{ padding: '1.1rem' }}>
      <div className="section-title">Rückfragen am Vers</div>
      <p className="settings-row__hint" style={{ marginBottom: '0.9rem' }}>
        Beim Lesen unter „Fragen“ lassen sich Fragen zu einer Stelle stellen. Die Antwort
        stützt sich auf das Material, das die App zu dieser Stelle hinterlegt hat – Artikel,
        Datierung, Auslegungen, Querverweise, Lexikon.
      </p>
      <div className="notice" style={{ marginBottom: '1rem' }}>
        <strong>Hier verlassen Daten das Gerät.</strong> Deine Frage, der Vers und das
        Material dazu gehen an den gewählten Dienst. Alles andere in dieser App bleibt
        weiterhin lokal – und ohne diesen Zugang funktioniert alles andere unverändert.
      </div>

      <div className="settings-row">
        <span className="settings-row__label">Zugang</span>
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
          {(
            [
              { id: 'aus', label: 'Aus' },
              { id: 'anthropic', label: 'Eigener Schlüssel' },
              { id: 'proxy', label: 'Eigener Server' },
            ] as const
          ).map((option) => (
            <button
              key={option.id}
              type="button"
              className={`chip${chat.mode === option.id ? ' chip--active' : ''}`}
              onClick={() => setChatSettings({ mode: option.id })}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {chat.mode === 'anthropic' && (
        <div style={{ marginTop: '0.9rem' }}>
          <p className="settings-row__hint" style={{ marginBottom: '0.5rem' }}>
            Der Schlüssel wird in diesem Browser gespeichert und direkt an Anthropic
            geschickt. Das ist der einfache Weg – aber jedes Skript, das auf dieser Seite
            läuft, könnte ihn lesen. Nimm einen Schlüssel mit Ausgabenlimit, und nutze ihn
            nicht auf fremden Geräten. Schlüssel gibt es unter{' '}
            <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer">
              console.anthropic.com
            </a>
            ; die Nutzung wird dir dort in Rechnung gestellt.
          </p>
          <input
            className="textarea"
            type="password"
            autoComplete="off"
            spellCheck={false}
            placeholder="sk-ant-…"
            value={chat.apiKey}
            onChange={(e) => setChatSettings({ apiKey: e.target.value })}
            aria-label="API-Schlüssel"
          />
        </div>
      )}

      {chat.mode === 'proxy' && (
        <div style={{ marginTop: '0.9rem' }}>
          <p className="settings-row__hint" style={{ marginBottom: '0.5rem' }}>
            Adresse eines selbst betriebenen Servers, der den Schlüssel hält und die Anfrage
            weiterreicht. Der Schlüssel bleibt dann geheim. Der Server muss die Schnittstelle
            von Anthropic unter <code>/v1/messages</code> anbieten und Anfragen von dieser
            Seite erlauben (CORS).
          </p>
          <input
            className="textarea"
            type="url"
            autoComplete="off"
            spellCheck={false}
            placeholder="https://mein-server.example/api"
            value={chat.proxyUrl}
            onChange={(e) => setChatSettings({ proxyUrl: e.target.value })}
            aria-label="Adresse des eigenen Servers"
          />
        </div>
      )}

      {chat.mode !== 'aus' && (
        <div className="settings-row" style={{ marginTop: '0.9rem' }}>
          <span className="settings-row__label">
            Modell
            <span className="settings-row__hint">
              Voreingestellt ist das derzeit stärkste; kleinere sind schneller und günstiger.
            </span>
          </span>
          <select
            className="btn btn--sm"
            value={chat.model}
            onChange={(e) => setChatSettings({ model: e.target.value })}
            aria-label="Modell"
          >
            <option value="claude-opus-5">Claude Opus 5</option>
            <option value="claude-sonnet-5">Claude Sonnet 5</option>
            <option value="claude-haiku-4-5">Claude Haiku 4.5</option>
          </select>
        </div>
      )}
    </div>
  );
}

/** Steuert, wie viel des Bibeltextes ohne Netzverbindung verfügbar ist. */
function OfflineCard() {
  const [status, setStatus] = useState<OfflineStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);

  const refresh = useCallback(() => {
    void getOfflineStatus().then(setStatus);
  }, []);

  useEffect(refresh, [refresh]);

  if (isSingleFile()) {
    return (
      <div className="card" style={{ padding: '1.1rem' }}>
        <div className="section-title">Offline lesen</div>
        <div className="notice">
          Diese Fassung enthält den vollständigen Bibeltext bereits in der Seite selbst. Sie
          funktioniert ohne Verbindung – auch als gespeicherte Datei.
        </div>
      </div>
    );
  }

  if (!isOfflineSupported()) {
    return (
      <div className="card" style={{ padding: '1.1rem' }}>
        <div className="section-title">Offline lesen</div>
        <div className="notice">
          Dieser Browser unterstützt keine Offline-Speicherung. Die App funktioniert weiterhin,
          benötigt aber eine Verbindung.
        </div>
      </div>
    );
  }

  const percent = status ? Math.round((status.cached / status.total) * 100) : 0;

  return (
    <div className="card" style={{ padding: '1.1rem' }}>
      <div className="section-title">Offline lesen</div>
      <p className="settings-row__hint" style={{ marginBottom: '0.7rem' }}>
        Gelesene Kapitel bleiben automatisch gespeichert. Für den vollständigen Text ohne
        Verbindung lädt der Knopf alle 66 Bücher – rund 4 MB.
      </p>

      <div className="tile__value">
        {status ? `${status.cached} von ${status.total} Büchern` : '…'}
      </div>
      <div className="progress">
        <div className="progress__bar" style={{ width: `${busy ? progress : percent}%` }} />
      </div>

      <div className="reader__tools" style={{ marginTop: '0.9rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          className="btn btn--sm btn--primary"
          disabled={busy || status?.complete}
          onClick={async () => {
            setBusy(true);
            setProgress(0);
            const result = await downloadAll((loaded, total) =>
              setProgress(Math.round((loaded / total) * 100)),
            );
            setStatus(result);
            setBusy(false);
          }}
        >
          {busy ? (
            <>
              <span className="spinner" /> Lädt … {progress} %
            </>
          ) : status?.complete ? (
            '✓ Vollständig offline verfügbar'
          ) : (
            'Ganze Bibel offline verfügbar machen'
          )}
        </button>

        {status && status.cached > 0 && !busy && (
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={async () => {
              await clearOfflineData();
              refresh();
            }}
          >
            Speicher leeren
          </button>
        )}
      </div>
    </div>
  );
}

export default function MePage() {
  const { data: index } = useBibleIndex();
  const settings = usePersisted(getSettings);
  const notes = usePersisted(getNotes);
  const highlights = usePersisted(getHighlights);
  const readChapters = usePersisted(getReadChapters);

  const nameOf = (bookId: string) => (index ? findBook(index, bookId)?.name ?? bookId : bookId);

  function exportJournal() {
    const lines = ['# Mein Studien-Journal', ''];
    for (const note of [...notes].sort((a, b) => b.updatedAt - a.updatedAt)) {
      lines.push(`## ${nameOf(note.ref.book)} ${note.ref.chapter},${note.ref.verse}`);
      lines.push(`*${new Date(note.updatedAt).toLocaleDateString('de-DE')}*`, '', note.text, '');
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'studien-journal.md';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <h1 className="page-title">Mein Bereich</h1>
      <p className="page-lead">
        Notizen, Markierungen und Einstellungen. Alle persönlichen Daten bleiben auf diesem Gerät –
        die App braucht kein Konto.
      </p>

      <div className="home__grid">
        <div>
          <div className="section-title">Notizen ({notes.length})</div>
          {notes.length === 0 ? (
            <div className="notice">
              Noch keine Notizen. Tippe beim Lesen auf einen Vers und öffne den Bereich „Notizen“.
            </div>
          ) : (
            <>
              <button type="button" className="btn btn--sm" onClick={exportJournal} style={{ marginBottom: '0.75rem' }}>
                Als Markdown exportieren
              </button>
              {[...notes]
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .map((note) => (
                  <div className="note-item" key={note.id}>
                    <Link
                      to={`/bibel/${note.ref.book}/${note.ref.chapter}?vers=${note.ref.verse}`}
                      className="hit__ref"
                      style={{ display: 'block', marginBottom: '0.3rem' }}
                    >
                      {nameOf(note.ref.book)} {note.ref.chapter},{note.ref.verse}
                    </Link>
                    <div>{note.text}</div>
                    <div className="note-item__meta">
                      <span>{new Date(note.updatedAt).toLocaleDateString('de-DE')}</span>
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        onClick={() => deleteNote(note.id)}
                      >
                        Löschen
                      </button>
                    </div>
                  </div>
                ))}
            </>
          )}

          <div className="section-title" style={{ marginTop: '2rem' }}>
            Markierungen ({highlights.length})
          </div>
          {highlights.length === 0 ? (
            <div className="notice">Noch keine Verse markiert.</div>
          ) : (
            <div className="card">
              {[...highlights]
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((h) => (
                  <div
                    key={`${h.ref.book}${h.ref.chapter}${h.ref.verse}`}
                    className="hit"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}
                  >
                    <span
                      className="swatch"
                      style={{ background: `var(--hl-${h.color})`, width: '1.1rem', height: '1.1rem', flexShrink: 0 }}
                      aria-hidden="true"
                    />
                    <Link
                      to={`/bibel/${h.ref.book}/${h.ref.chapter}?vers=${h.ref.verse}`}
                      style={{ flex: 1 }}
                    >
                      {nameOf(h.ref.book)} {h.ref.chapter},{h.ref.verse}
                    </Link>
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm"
                      onClick={() => removeHighlight(h.ref)}
                    >
                      Entfernen
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="stack">
          <div className="card" style={{ padding: '1.1rem' }}>
            <div className="section-title">Darstellung</div>

            <div className="settings-row">
              <div>
                <div className="settings-row__label">Farbschema</div>
                <div className="settings-row__hint">Sepia schont die Augen bei langem Lesen.</div>
              </div>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    className={`chip${settings.theme === theme.id ? ' chip--active' : ''}`}
                    onClick={() => setSettings({ theme: theme.id })}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="settings-row">
              <div>
                <div className="settings-row__label">Schriftgröße</div>
                <div className="settings-row__hint">
                  {Math.round(settings.fontScale * 100)} %
                </div>
              </div>
              <input
                type="range"
                min={0.8}
                max={1.8}
                step={0.1}
                value={settings.fontScale}
                onChange={(e) => setSettings({ fontScale: Number(e.target.value) })}
                aria-label="Schriftgröße"
              />
            </div>
          </div>

          <OfflineCard />

          <ChatCard />

          <div className="card" style={{ padding: '1.1rem' }}>
            <div className="section-title">Überblick</div>
            <div className="settings-row">
              <span className="settings-row__label">Gelesene Kapitel</span>
              <strong>{readChapters.length}</strong>
            </div>
            <div className="settings-row">
              <span className="settings-row__label">Textgrundlage</span>
              <strong>{TRANSLATION_LABEL}</strong>
            </div>
          </div>

          <div className="card about">
            {/* Zwei Fassungen des Schriftzugs, eine je Erscheinungsbild. Das
                Teal des Logos ist auf dunklem Grund zu dunkel zum Lesen; die
                aufgehellte Fassung entsteht in scripts/build-brand.py. */}
            <img
              className="about__logo about__logo--hell"
              src={brandAsset('schriftzug')}
              alt="Entgegen – Bibelstudium"
            />
            <img
              className="about__logo about__logo--dunkel"
              src={brandAsset('schriftzug-dunkel')}
              alt=""
              aria-hidden="true"
            />
            <p className="about__text">
              Der Name ist Programm: Die Bibel kommt einem entgegen, wenn man weiß, woher sie
              kommt. Deshalb steht zu jeder Stelle, wann sie spielt, wann sie aufgeschrieben wurde
              und wie sie in verschiedenen Traditionen gelesen wird – nebeneinander, ohne dass eine
              Auslegung zur richtigen erklärt würde.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
