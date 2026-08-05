/**
 * Attrappe der Anthropic-Schnittstelle für den Test der Rückfragen.
 *
 * Die Rückfragen am Vers sind der einzige Teil der App, der einen fremden
 * Dienst braucht. Ihn im Test wirklich anzurufen wäre teuer, langsam, von
 * einem Schlüssel abhängig und in den Antworten nicht vorhersagbar – also
 * antwortet hier ein eigener Server im selben Format.
 *
 * Damit lässt sich prüfen, was tatsächlich am Code hängt: Kommt der
 * zusammengestellte Kontext vollständig an? Wird die Antwort stückweise
 * angezeigt? Und trägt die Fehlerbehandlung, wenn der Dienst nein sagt?
 *
 * Die letzte Anfrage wird unter `GET /letzte-anfrage` zur Einsicht abgelegt –
 * so kann der Test dem Prompt beim Entstehen zusehen.
 *
 * Aufruf: node scripts/fake-model.mjs [port]
 */

import { createServer } from 'node:http';

const PORT = Number(process.argv[2] ?? 4319);

/** Was zuletzt hereinkam – der Test liest es aus. */
let letzteAnfrage = null;

/** Wird auf einen HTTP-Code gesetzt, wenn der nächste Aufruf scheitern soll. */
let naechsterFehler = null;

const ANTWORT =
  'Der Vers steht im Gespräch mit Nikodemus. Die Auslegungen gehen auseinander: ' +
  'Die reformatorische Tradition liest ihn als Zusage, die historische Forschung ' +
  'ordnet ihn der Sprache des Johannesevangeliums zu.';

function sse(res, event, data) {
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

const server = createServer((req, res) => {
  // Der Browser fragt vor der eigentlichen Anfrage nach Erlaubnis. Ohne diese
  // Freigabe kommt die Anfrage gar nicht erst an – genau die Hürde, an der ein
  // selbst betriebener Server in der Praxis als Erstes scheitert.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204).end();
    return;
  }

  if (req.url === '/letzte-anfrage') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(letzteAnfrage ?? null));
    return;
  }

  if (req.url?.startsWith('/fehler/')) {
    naechsterFehler = Number(req.url.split('/')[2]);
    res.writeHead(200).end('ok');
    return;
  }

  let body = '';
  req.on('data', (chunk) => (body += chunk));
  req.on('end', () => {
    try {
      letzteAnfrage = JSON.parse(body);
    } catch {
      letzteAnfrage = { unlesbar: body.slice(0, 200) };
    }

    if (naechsterFehler) {
      const code = naechsterFehler;
      naechsterFehler = null;
      res.writeHead(code, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          type: 'error',
          error: { type: 'authentication_error', message: 'Attrappe lehnt ab' },
        }),
      );
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    sse(res, 'message_start', {
      type: 'message_start',
      message: {
        id: 'msg_attrappe',
        type: 'message',
        role: 'assistant',
        model: letzteAnfrage?.model ?? 'attrappe',
        content: [],
        stop_reason: null,
        stop_sequence: null,
        usage: { input_tokens: 1, output_tokens: 0 },
      },
    });
    sse(res, 'content_block_start', {
      type: 'content_block_start',
      index: 0,
      content_block: { type: 'text', text: '' },
    });

    // In Stücken, damit der Test sieht, dass die Antwort schon während des
    // Empfangs erscheint und nicht erst am Ende.
    const stuecke = ANTWORT.match(/.{1,40}(\s|$)/g) ?? [ANTWORT];
    let i = 0;
    const timer = setInterval(() => {
      if (i < stuecke.length) {
        sse(res, 'content_block_delta', {
          type: 'content_block_delta',
          index: 0,
          delta: { type: 'text_delta', text: stuecke[i++] },
        });
        return;
      }
      clearInterval(timer);
      sse(res, 'content_block_stop', { type: 'content_block_stop', index: 0 });
      sse(res, 'message_delta', {
        type: 'message_delta',
        delta: { stop_reason: 'end_turn', stop_sequence: null },
        usage: { output_tokens: 42 },
      });
      sse(res, 'message_stop', { type: 'message_stop' });
      res.end();
    }, 40);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Attrappe des Sprachmodells auf http://127.0.0.1:${PORT}`);
});
