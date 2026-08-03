import { Link } from 'react-router-dom';
import { useBibleIndex, usePersisted } from '../hooks/useStore';
import { findBook, TRANSLATION_LABEL } from '../lib/bibleData';
import {
  deleteNote,
  getHighlights,
  getNotes,
  getReadChapters,
  getSettings,
  removeHighlight,
  setSettings,
} from '../lib/storage';
import type { ThemeName } from '../lib/types';

const THEMES: { id: ThemeName; label: string }[] = [
  { id: 'hell', label: 'Hell' },
  { id: 'sepia', label: 'Sepia' },
  { id: 'dunkel', label: 'Dunkel' },
];

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
        </div>
      </div>
    </div>
  );
}
