import { getChatSettings, type ChatSettings } from './storage';
import type { VerseContext } from './chatContext';

/**
 * Rückfragen zu einer Bibelstelle.
 *
 * Die App liegt als statische Seite auf GitHub Pages – es gibt keinen Server,
 * der einen Schlüssel geheim halten könnte. Deshalb zwei Wege, beide über
 * dasselbe SDK: direkt zu Anthropic mit dem eigenen Schlüssel aus diesem
 * Browser, oder über einen selbst betriebenen Server, der den Schlüssel hält.
 *
 * Das SDK wird erst beim ersten Gebrauch nachgeladen. Wer die Rückfragen nie
 * einschaltet – die Voreinstellung – lädt es nie und zahlt keinen einzigen
 * Kilobyte dafür.
 */

export interface ChatTurn {
  role: 'user' | 'assistant';
  text: string;
}

/**
 * Die redaktionelle Haltung der App, in Anweisungen übersetzt.
 *
 * Ohne diesen Teil wäre die Rückfrage ein beliebiger Chat, der die Sorgfalt
 * der Artikel unterläuft: Die App stellt Auslegungen nebeneinander und erklärt
 * keine zur richtigen – ein Modell, das auf „Was bedeutet das wirklich?“ eine
 * einzige Antwort gibt, macht diese Zurückhaltung zunichte.
 *
 * Bewusst nicht enthalten: Aufforderungen zum Nachprüfen der eigenen Antwort.
 * Aktuelle Modelle tun das von sich aus, und die Anweisung dazu führt nur zu
 * längeren Antworten.
 */
const SYSTEM = `Du beantwortest Fragen zu einer Bibelstelle innerhalb der Bibelstudium-App „Entgegen“.

# Deine Grundlage
Du bekommst zu jeder Frage den Wortlaut der Stelle in ihrem Zusammenhang und das
Material, das die App zu ihr hinterlegt hat: Buchsteckbrief, Artikel, Ereignis- und
Entstehungszeit, Auslegungen aus benannten Traditionen, Querverweise, Lexikoneinträge,
Orte und Parallelen in den Evangelien.

Antworte aus diesem Material. Wenn du darüber hinaus etwas beiträgst, das allgemein
zum Bildungsstand gehört, ist das in Ordnung – sage aber dazu, dass es nicht aus dem
Bestand der App stammt. Wenn du etwas nicht weißt oder das Material nichts hergibt,
sage das; rate nicht.

Erfinde niemals Bibelstellen. Nenne nur Stellenangaben, die im mitgelieferten Material
stehen. Wörtliche Zitate gibst du genau so wieder, wie sie im mitgelieferten Text stehen
– die Textgrundlage ist die Lutherbibel von 1912, deren Schreibweise altertümlich ist
(„daß“, „HERR“, „selig“); glätte sie nicht.

# Wie du auslegst
Die App stellt Auslegungen nebeneinander, ohne eine zur richtigen zu erklären. Halte das
durch. Wo Traditionen sich unterscheiden, benenne sie und sage, worin sie sich
unterscheiden und woran das liegt. Wenn jemand fragt, was der Vers „wirklich“ bedeutet,
weiche nicht aus, aber gib keine Schiedsrichter-Antwort: Sage, was der Wortlaut hergibt,
was strittig ist und welche Lesarten es gibt.

Unterscheide dabei sauber:
- was im Text steht,
- was die historische Forschung dazu sagt und wie sicher sie ist,
- wie der Text ausgelegt worden ist,
- und was offen bleibt.

Nenne Wirkungsgeschichte auch dort, wo sie unangenehm ist – Stellen, mit denen Unrecht
begründet wurde, verschweigst du nicht.

# Persönliche Fragen
Fragen nach dem eigenen Leben, nach Zweifel oder Anfechtung sind willkommen und ernst
gemeint. Nimm sie ernst, ohne zu predigen. Du bist Gesprächspartner, nicht Seelsorger
und nicht Therapeut: Du sagst niemandem, was er glauben oder tun soll, und du sprichst
weder im Namen Gottes noch im Namen einer Kirche.

Setze weder Glauben noch Unglauben voraus. Frag zurück, wenn du nicht weißt, worauf
jemand hinauswill.

Geht es um eine akute Krise – Suizidgedanken, Gewalt, Missbrauch –, sage klar, dass du
dafür nicht der richtige Ansprechpartner bist, und nenne die Telefonseelsorge
(0800 111 0 111 und 0800 111 0 222, kostenlos, rund um die Uhr). Erst danach das, was du
sonst zur Frage sagen kannst.

# Form
Antworte auf Deutsch und duze. Schreib knapp: zwei bis fünf Sätze auf eine einfache
Frage, mehr nur, wenn die Frage mehr verlangt. Führ nicht aus, wonach nicht gefragt war,
und wiederhole den Vers nicht, der ohnehin über dem Gespräch steht. Keine Überschriften
bei kurzen Antworten; Aufzählungen nur, wenn wirklich mehrere Dinge nebeneinander stehen.`;

/** Antworten kommen Stück für Stück, damit das Lesen sofort beginnen kann. */
export type OnDelta = (text: string) => void;

export interface AskOptions {
  context: VerseContext;
  history: ChatTurn[];
  question: string;
  onDelta: OnDelta;
  signal?: AbortSignal;
  settings?: ChatSettings;
}

/** Fehler mit einem Text, den man einem Menschen zeigen kann. */
export class ChatError extends Error {}

let sdk: Promise<typeof import('@anthropic-ai/sdk')> | null = null;

function loadSdk() {
  if (!sdk) {
    sdk = import('@anthropic-ai/sdk');
    sdk.catch(() => {
      sdk = null;
    });
  }
  return sdk;
}

export async function askAboutVerse(options: AskOptions): Promise<void> {
  const settings = options.settings ?? getChatSettings();
  const { default: Anthropic } = await loadSdk();

  const client = new Anthropic({
    // Ohne dieses Zugeständnis verweigert das SDK den Betrieb im Browser. Der
    // Name ist ernst gemeint: Im Modus „anthropic“ liegt der Schlüssel wirklich
    // im Browser. Die Einstellungsseite sagt das ebenso deutlich.
    dangerouslyAllowBrowser: true,
    ...(settings.mode === 'proxy'
      ? {
          baseURL: settings.proxyUrl.trim().replace(/\/+$/, ''),
          // Im Proxy-Modus steht in diesem Feld nicht der Schlüssel, sondern
          // das Zugangswort des eigenen Servers – der echte Schlüssel bleibt
          // dort. Verlangt der Server keines, bleibt es leer; das SDK besteht
          // aber auf einem Wert.
          apiKey: settings.apiKey.trim() || 'kein-zugangswort',
        }
      : { apiKey: settings.apiKey.trim() }),
  });

  /*
   * Zwei Sprungmarken für den Zwischenspeicher. Die erste sitzt hinter den
   * redaktionellen Anweisungen: Sie sind für jede Stelle und jede Frage
   * dieselben, greifen also über Gespräche hinweg. Die zweite sitzt hinter dem
   * Material zur Stelle, das sich innerhalb eines Gesprächs nicht mehr ändert.
   * Ohne die zweite Marke würde jede Rückfrage den gesamten Bestand zur Stelle
   * erneut voll bezahlen.
   */
  const system = [
    { type: 'text' as const, text: SYSTEM, cache_control: { type: 'ephemeral' as const } },
    {
      type: 'text' as const,
      text:
        `# Die Stelle: ${options.context.label}\n\n` +
        `${options.context.passage}\n\n` +
        `# Was die App zu dieser Stelle hinterlegt hat\n\n${options.context.material}`,
      cache_control: { type: 'ephemeral' as const },
    },
  ];

  const messages = [
    ...options.history.map((turn) => ({ role: turn.role, content: turn.text })),
    { role: 'user' as const, content: options.question },
  ];

  try {
    const stream = client.messages.stream(
      {
        model: settings.model || 'claude-opus-5',
        max_tokens: 4096,
        // Mittlere Stufe: Auslegungsfragen sind selten trivial, aber in einem
        // Gespräch am Vers zählt auch, dass die Antwort bald da ist.
        output_config: { effort: 'medium' },
        system,
        messages,
      },
      { signal: options.signal },
    );

    stream.on('text', options.onDelta);
    const message = await stream.finalMessage();

    // Der Abbruchgrund wird vor dem Inhalt gelesen: Bei einer Ablehnung ist der
    // Inhalt leer oder abgeschnitten, und ein stiller Abbruch sähe für den
    // Leser aus wie eine fertige Antwort.
    if (message.stop_reason === 'refusal') {
      throw new ChatError(
        'Die Anfrage wurde von der Sicherheitsprüfung des Modells abgelehnt. ' +
          'Formuliere die Frage anders oder frag etwas anderes zu dieser Stelle.',
      );
    }
  } catch (error) {
    throw new ChatError(erklaere(error));
  }
}

/** Übersetzt, was schiefgehen kann, in einen Satz mit einem nächsten Schritt. */
function erklaere(error: unknown): string {
  if (error instanceof ChatError) return error.message;

  const status = (error as { status?: number })?.status;
  if (status === 401) {
    return 'Der Schlüssel wurde nicht akzeptiert. Prüfe ihn unter „Ich → Rückfragen am Vers“.';
  }
  if (status === 403) {
    return 'Der Schlüssel hat keinen Zugriff auf dieses Modell. Wähle unter „Ich“ ein anderes.';
  }
  if (status === 404) {
    return 'Dieses Modell gibt es nicht. Prüfe die Modellkennung unter „Ich“.';
  }
  if (status === 429) {
    return 'Zu viele Anfragen in kurzer Zeit. Versuch es in einer Minute noch einmal.';
  }
  if (status === 400) {
    const text = (error as { message?: string })?.message ?? '';
    return `Die Anfrage wurde abgelehnt: ${text}`;
  }
  if (typeof status === 'number' && status >= 500) {
    return 'Der Dienst ist gerade überlastet. Versuch es gleich noch einmal.';
  }
  if ((error as { name?: string })?.name === 'AbortError') return 'Abgebrochen.';

  // Der häufigste Fall im Browser: keine Verbindung, oder der eigene Server
  // schickt keine CORS-Freigabe zurück.
  return (
    'Keine Verbindung zum Dienst. Prüfe die Netzverbindung – und im Modus „eigener Server“, ' +
    'ob dieser Anfragen von dieser Seite erlaubt (CORS).'
  );
}

/** Vorschläge, die zeigen, wofür die Rückfrage überhaupt taugt. */
export const SUGGESTIONS = [
  'Worum geht es hier?',
  'Was ist an dieser Stelle umstritten?',
  'Wie wurde das ausgelegt?',
  'Welche Stellen gehören dazu?',
  'Was heißt das für mein Leben?',
] as const;
