import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SUGGESTIONS, askAboutVerse, type ChatTurn } from '../lib/chat';
import { buildVerseContext } from '../lib/chatContext';
import { usePersisted } from '../hooks/useStore';
import { isSingleFile } from '../lib/bibleData';
import { chatReady, getChatSettings } from '../lib/storage';
import type { BibleIndex, BookContent, VerseRef } from '../lib/types';

/**
 * Rückfragen zu einem Vers.
 *
 * Das Gespräch lebt nur, solange der Vers geöffnet ist – es wird bewusst nicht
 * gespeichert. Zum einen sind es Fragen, die man im Zweifel niemandem sonst
 * stellt; zum anderen wäre ein wiederaufgenommenes Gespräch ohne den
 * dazugehörigen Stand des Materials irreführend.
 */

interface Props {
  index: BibleIndex;
  content: BookContent;
  ref_: VerseRef;
  text: string;
  onClose: () => void;
}

export default function VerseChat({ index, content, ref_, text, onClose }: Props) {
  const settings = usePersisted(getChatSettings);
  const bereit = chatReady(settings);

  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [draft, setDraft] = useState('');
  const [antwort, setAntwort] = useState('');
  const [laeuft, setLaeuft] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);
  const abbruch = useRef<AbortController | null>(null);
  const ende = useRef<HTMLDivElement | null>(null);

  const context = useMemo(
    () => buildVerseContext(index, content, ref_, text),
    [index, content, ref_, text],
  );

  // Ein neuer Vers ist ein neues Gespräch; das alte würde nicht mehr passen.
  useEffect(() => {
    abbruch.current?.abort();
    setTurns([]);
    setAntwort('');
    setFehler(null);
    setLaeuft(false);
  }, [ref_.book, ref_.chapter, ref_.verse]);

  // Beim Schließen des Panels darf keine Anfrage weiterlaufen.
  useEffect(() => () => abbruch.current?.abort(), []);

  useEffect(() => {
    ende.current?.scrollIntoView({ block: 'end' });
  }, [turns, antwort]);

  async function frage(frageText: string) {
    const gestellt = frageText.trim();
    if (!gestellt || laeuft) return;

    const bisher = [...turns];
    setTurns([...bisher, { role: 'user', text: gestellt }]);
    setDraft('');
    setAntwort('');
    setFehler(null);
    setLaeuft(true);

    const controller = new AbortController();
    abbruch.current = controller;

    let gesammelt = '';
    try {
      await askAboutVerse({
        context,
        history: bisher,
        question: gestellt,
        signal: controller.signal,
        settings,
        onDelta: (stueck) => {
          gesammelt += stueck;
          setAntwort(gesammelt);
        },
      });
      setTurns((t) => [...t, { role: 'assistant', text: gesammelt }]);
      setAntwort('');
    } catch (error) {
      // Was schon angekommen ist, bleibt stehen – eine halbe Antwort ist mehr
      // wert als eine leere Fläche mit einer Fehlermeldung darüber.
      if (gesammelt) setTurns((t) => [...t, { role: 'assistant', text: gesammelt }]);
      setAntwort('');
      setFehler((error as Error).message);
    } finally {
      setLaeuft(false);
      abbruch.current = null;
    }
  }

  /*
   * Die Einzeldatei-Fassung ist eine Datei zum Verschicken, die per Doppelklick
   * ohne Server und ohne Netz läuft. Das SDK wird aber bei Bedarf nachgeladen –
   * neben einer einzelnen HTML-Datei liegt nichts, was sich nachladen ließe.
   * Deshalb hier abschalten statt eine Fehlermeldung zu riskieren.
   */
  if (isSingleFile()) {
    return (
      <div className="panel__article">
        <div className="notice">
          Rückfragen gibt es in dieser Fassung nicht. Sie ist eine einzelne Datei, die ohne
          Server und ohne Netzverbindung läuft – beides braucht die Rückfrage. In der
          Web-Fassung der App steht sie zur Verfügung.
        </div>
      </div>
    );
  }

  if (!bereit) {
    return (
      <div className="panel__article">
        <div className="notice">
          <p style={{ marginBottom: '0.6rem' }}>
            <strong>Rückfragen sind ausgeschaltet.</strong>
          </p>
          <p style={{ marginBottom: '0.6rem' }}>
            Hier lassen sich Fragen zu diesem Vers stellen – nach dem Zusammenhang, nach
            Auslegungen, nach Querverweisen oder danach, was die Stelle mit dem eigenen Leben
            zu tun hat. Die Antwort stützt sich auf das Material, das die App zu dieser Stelle
            hinterlegt hat.
          </p>
          <p style={{ marginBottom: '0.9rem' }}>
            Das ist die einzige Funktion, bei der Daten dieses Gerät verlassen. Sie braucht
            deshalb einen eigenen Zugang und bleibt bis dahin aus.
          </p>
          <Link className="btn btn--primary btn--sm" to="/ich" onClick={onClose}>
            Einrichten
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="chat">
      <div className="chat__hint">
        Antworten stützen sich auf den Bestand der App zu dieser Stelle. Ein Sprachmodell kann
        sich irren – prüf Wichtiges am Text nach.
      </div>

      {turns.length === 0 && !laeuft && (
        <div className="chat__suggestions">
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" className="chip" onClick={() => void frage(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {turns.map((turn, i) => (
        <div key={i} className={`chat__turn chat__turn--${turn.role}`}>
          {turn.text}
        </div>
      ))}

      {laeuft && (
        <div className="chat__turn chat__turn--assistant">
          {antwort || <span className="spinner" />}
        </div>
      )}

      {fehler && <div className="notice chat__error">{fehler}</div>}

      <form
        className="chat__compose"
        onSubmit={(e) => {
          e.preventDefault();
          void frage(draft);
        }}
      >
        <textarea
          className="textarea chat__input"
          rows={2}
          placeholder="Frag etwas zu diesem Vers …"
          value={draft}
          disabled={laeuft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            // Eingabetaste schickt ab, Umschalt+Eingabe macht einen Absatz –
            // wie in jedem Chat, den die Leute kennen.
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              void frage(draft);
            }
          }}
        />
        {laeuft ? (
          <button
            type="button"
            className="btn btn--sm"
            onClick={() => abbruch.current?.abort()}
          >
            Stopp
          </button>
        ) : (
          <button type="submit" className="btn btn--primary btn--sm" disabled={!draft.trim()}>
            Fragen
          </button>
        )}
      </form>

      {/* Der Anker sitzt hinter dem Formular: Die Eingabezeile klebt am unteren
          Rand, ein Anker davor käme beim Scrollen hinter ihr zu liegen. */}
      <div ref={ende} />
    </div>
  );
}
