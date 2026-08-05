#!/usr/bin/env node
/**
 * Server für „Entgegen“ – liefert die App aus und hält den API-Schlüssel geheim.
 *
 * Die App kommt ohne Server aus; nur die Rückfragen am Vers brauchen einen
 * Sprachmodell-Dienst, und ein Schlüssel im Browser ist für jedes Skript der
 * Seite lesbar. Dieser Server nimmt ihm das ab: Er trägt den Schlüssel, die
 * ausgelieferte App kennt ihn nie.
 *
 * Zwei Aufgaben, beide abschaltbar:
 *
 * 1. Er liefert `dist/` aus. Damit liegen App und Schnittstelle auf derselben
 *    Herkunft – CORS entfällt, und ein falsch gesetzter Header kann nichts
 *    mehr kaputtmachen. (Weglassen, wenn die App auf GitHub Pages bleibt.)
 * 2. Er reicht `POST /v1/messages` an Anthropic weiter und legt den Schlüssel
 *    dabei ein.
 *
 * Bewusst ohne Abhängigkeiten: Der Server soll auf jedem Node ab Version 18
 * laufen, ohne dass jemand eine Lieferkette prüfen muss, die größer ist als
 * die Aufgabe.
 *
 * Aufruf:
 *   ANTHROPIC_API_KEY=sk-ant-… node server/entgegen-server.mjs
 *
 * Umgebungsvariablen:
 *   ANTHROPIC_API_KEY   Pflicht. Der Schlüssel, der hier bleibt.
 *   PORT                Standard 8080.
 *   ENTGEGEN_PASSWORT   Wenn gesetzt: Nur Anfragen mit diesem Wort werden
 *                       bedient. In der App unter „Ich → Zugangswort“
 *                       eintragen. Ohne dieses Wort ist ein öffentlich
 *                       erreichbarer Server ein offener Hahn auf deine
 *                       Abrechnung – siehe README.
 *   ENTGEGEN_STATIC     Verzeichnis der gebauten App. Standard: ./dist.
 *                       Auf "aus" setzen, um nur die Schnittstelle zu fahren.
 *   ENTGEGEN_HERKUNFT   Erlaubte Herkunft für CORS, etwa
 *                       "https://roruffm.github.io". Standard "*". Wird nur
 *                       gebraucht, wenn die App woanders liegt.
 *   ENTGEGEN_LIMIT      Anfragen je Stunde und IP. Standard 60, 0 = aus.
 *   ENTGEGEN_HOST       Adresse, an die gebunden wird. Standard 0.0.0.0.
 *                       Hinter Caddy oder nginx auf 127.0.0.1 setzen, damit
 *                       der Server nicht zusätzlich direkt erreichbar ist.
 *   ENTGEGEN_PROXY      Auf 1 setzen, wenn ein Reverse Proxy davorsteht.
 *                       Nur dann wird X-Forwarded-For ausgewertet – sonst
 *                       zählt die Stundengrenze alle Besucher als einen,
 *                       weil aus Sicht des Servers alles vom Proxy kommt.
 *   ENTGEGEN_MODELLE    Freigegebene Modelle, mit Komma getrennt. Standard
 *                       alle drei. Für einen öffentlichen Server ist
 *                       "claude-haiku-4-5" die naheliegende Wahl: rund ein
 *                       Fünftel der Kosten von Opus.
 *   ENTGEGEN_MAX_TOKENS Obergrenze der Antwortlänge. Standard 2048 – die
 *                       Antworten sollen laut Systemanweisung zwei bis fünf
 *                       Sätze lang sein, nicht Seiten.
 *   ENTGEGEN_TAGESLIMIT Anfragen je Tag über alle Besucher zusammen.
 *                       Standard 500, 0 = aus. Das ist die Grenze, die auch
 *                       dann noch greift, wenn jemand mit wechselnden
 *                       IP-Adressen anfragt.
 *
 * Zum Geld: Diese drei Grenzen begrenzen den Schaden, sie verhindern ihn
 * nicht. Die einzige harte Obergrenze ist ein **Ausgabenlimit im
 * Anthropic-Konto**; siehe server/ANLEITUNG.md. Der Server rechnet beim Start
 * vor, was seine Einstellungen im schlimmsten Fall am Tag kosten können.
 */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, normalize, extname } from 'node:path';
import { Readable } from 'node:stream';

const SCHLUESSEL = process.env.ANTHROPIC_API_KEY;
const PORT = Number(process.env.PORT ?? 8080);
const PASSWORT = process.env.ENTGEGEN_PASSWORT ?? '';
const STATIC = process.env.ENTGEGEN_STATIC ?? 'dist';
const HERKUNFT = process.env.ENTGEGEN_HERKUNFT ?? '*';
const LIMIT = Number(process.env.ENTGEGEN_LIMIT ?? 60);
const HOST = process.env.ENTGEGEN_HOST ?? '0.0.0.0';
const HINTER_PROXY = process.env.ENTGEGEN_PROXY === '1';
const TAGESLIMIT = Number(process.env.ENTGEGEN_TAGESLIMIT ?? 500);

const UPSTREAM = process.env.ENTGEGEN_UPSTREAM ?? 'https://api.anthropic.com';

if (!SCHLUESSEL) {
  console.error('ANTHROPIC_API_KEY fehlt. Ohne Schlüssel kann der Server nichts weiterreichen.');
  process.exit(1);
}

/*
 * Grenzen gegen versehentliche und absichtliche Kostenexplosionen. Der Browser
 * schickt den Anfragekörper, und alles, was von dort kommt, ist am Ende die
 * Abrechnung des Serverbetreibers – nicht die des Absenders.
 */
const MODELLE = new Set(
  (process.env.ENTGEGEN_MODELLE ?? 'claude-opus-5,claude-sonnet-5,claude-haiku-4-5')
    .split(',')
    .map((m) => m.trim())
    .filter(Boolean),
);
const MAX_TOKENS = Number(process.env.ENTGEGEN_MAX_TOKENS ?? 2048);

/**
 * Listenpreise in Dollar je Million Token, Stand August 2026.
 *
 * Sie stehen hier nur, damit der Server beim Start vorrechnen kann, was seine
 * eigenen Einstellungen im schlimmsten Fall kosten. Maßgeblich ist immer die
 * Abrechnung im Anthropic-Konto, nicht diese Tabelle.
 */
const PREISE = {
  'claude-opus-5': [5, 25],
  'claude-sonnet-5': [3, 15],
  'claude-haiku-4-5': [1, 5],
};

/** Grob geschätzte Eingabegröße einer Frage: Kontext der Stelle plus Anweisungen. */
const EINGABE_TOKEN = 1900;

/** Anfragen je IP in der laufenden Stunde. */
const zaehler = new Map();
setInterval(() => zaehler.clear(), 3600_000).unref();

/*
 * Anfragen des laufenden Tages über alle Besucher zusammen.
 *
 * Die Stundengrenze je IP hilft gegen den Einzelnen, der es übertreibt – aber
 * IP-Adressen sind billig. Wer wirklich will, fragt von hundert verschiedenen.
 * Erst diese Grenze bindet den Schaden an eine Zahl, die man vorher kennt.
 */
let heute = 0;
setInterval(() => {
  heute = 0;
}, 86_400_000).unref();

/**
 * Wer fragt hier eigentlich?
 *
 * Steht ein Reverse Proxy davor – die empfohlene Aufstellung –, kommt jede
 * Anfrage aus Sicht des Servers von 127.0.0.1. Die Stundengrenze zählte dann
 * alle Besucher zusammen und wäre nach 60 Anfragen für alle dicht.
 *
 * X-Forwarded-For wird deshalb ausgewertet, aber **nur** wenn ausdrücklich
 * angesagt ist, dass ein Proxy davorsteht: Der Kopf ist frei erfindbar, und
 * ohne Proxy davor könnte sich jeder mit einem frischen Wert unbegrenzt neue
 * Kontingente ausstellen.
 */
function besucherIp(req) {
  if (HINTER_PROXY) {
    const kette = req.headers['x-forwarded-for'];
    if (typeof kette === 'string' && kette.trim()) return kette.split(',')[0].trim();
  }
  return req.socket.remoteAddress ?? 'unbekannt';
}

function grenzeErreicht(ip) {
  if (!LIMIT) return false;
  const bisher = zaehler.get(ip) ?? 0;
  zaehler.set(ip, bisher + 1);
  return bisher >= LIMIT;
}

const TYPEN = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webmanifest': 'application/manifest+json',
};

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', HERKUNFT);
  res.setHeader('Access-Control-Allow-Headers', 'content-type, x-api-key, anthropic-version, anthropic-beta, anthropic-dangerous-direct-browser-access');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function fehler(res, code, nachricht) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ type: 'error', error: { type: 'invalid_request_error', message: nachricht } }));
}

/* ------------------------------------------------- Schnittstelle */

async function weiterreichen(req, res) {
  const ip = besucherIp(req);

  if (PASSWORT) {
    // Das SDK schickt den Wert des Feldes „Zugangswort“ als x-api-key mit. Der
    // echte Schlüssel steht nur hier im Server.
    const gesendet = req.headers['x-api-key'];
    if (gesendet !== PASSWORT) {
      // 401 damit die App „Der Schlüssel wurde nicht akzeptiert“ zeigt und die
      // Person weiß, wo sie nachsehen muss.
      return fehler(res, 401, 'Falsches oder fehlendes Zugangswort.');
    }
  }

  if (grenzeErreicht(ip)) {
    res.setHeader('Retry-After', '3600');
    return fehler(res, 429, `Mehr als ${LIMIT} Anfragen in dieser Stunde.`);
  }

  if (TAGESLIMIT && heute >= TAGESLIMIT) {
    res.setHeader('Retry-After', '3600');
    return fehler(
      res,
      429,
      'Das Tageskontingent dieses Servers ist aufgebraucht. Morgen wieder – oder ' +
        'trag unter „Ich“ deinen eigenen Schlüssel ein.',
    );
  }
  heute++;

  let koerper = '';
  for await (const stueck of req) {
    koerper += stueck;
    // Der Kontext einer Stelle liegt bei wenigen Kilobyte; alles darüber ist
    // kein Bibelvers mehr.
    if (koerper.length > 512 * 1024) return fehler(res, 413, 'Anfrage zu groß.');
  }

  let anfrage;
  try {
    anfrage = JSON.parse(koerper);
  } catch {
    return fehler(res, 400, 'Anfrage ist kein gültiges JSON.');
  }

  if (!MODELLE.has(anfrage.model)) {
    return fehler(res, 400, `Modell „${anfrage.model}“ ist auf diesem Server nicht freigegeben.`);
  }
  if (typeof anfrage.max_tokens === 'number' && anfrage.max_tokens > MAX_TOKENS) {
    anfrage.max_tokens = MAX_TOKENS;
  }

  let oben;
  try {
    oben = await fetch(`${UPSTREAM}/v1/messages`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': SCHLUESSEL,
        'anthropic-version': req.headers['anthropic-version'] ?? '2023-06-01',
        ...(req.headers['anthropic-beta'] ? { 'anthropic-beta': req.headers['anthropic-beta'] } : {}),
      },
      body: JSON.stringify(anfrage),
    });
  } catch (e) {
    console.error('Weiterleitung fehlgeschlagen:', e?.message ?? e);
    return fehler(res, 502, 'Der Dienst war nicht erreichbar.');
  }

  res.writeHead(oben.status, {
    'Content-Type': oben.headers.get('content-type') ?? 'application/json',
    'Cache-Control': 'no-store',
  });

  if (!oben.body) return res.end();

  /*
   * Der Körper wird unverändert durchgereicht, statt ihn hier mit dem SDK neu
   * zu bauen. Der Browser hat die Anfrage bereits mit dem SDK erzeugt und
   * entpackt die Antwort damit wieder; alles dazwischen neu zu verpacken
   * verlöre die Stück-für-Stück-Auslieferung und würde bei jeder Neuerung der
   * Schnittstelle zum Nadelöhr. Ein Reverse Proxy transportiert, er deutet
   * nicht.
   */
  const strom = Readable.fromWeb(oben.body);
  // Schließt der Browser den Tab mitten in der Antwort, bricht die Leitung ab.
  // Das ist Alltag und darf den Server nicht beenden.
  strom.on('error', () => res.destroy());
  res.on('close', () => strom.destroy());
  strom.pipe(res);
}

/* ------------------------------------------------------- App ausliefern */

async function datei(res, pfad) {
  const daten = await readFile(pfad);
  const typ = TYPEN[extname(pfad)] ?? 'application/octet-stream';
  // Der Bibeltext ändert sich nicht; index.html schon, sonst bekäme niemand
  // eine neue Fassung zu sehen.
  const dauerhaft = /\/(assets|bibel|karten)\//.test(pfad);
  res.writeHead(200, {
    'Content-Type': typ,
    'Cache-Control': dauerhaft ? 'public, max-age=31536000, immutable' : 'no-cache',
  });
  res.end(daten);
}

async function ausliefern(req, res) {
  const url = new URL(req.url ?? '/', 'http://x');
  // normalize() bändigt „..“; der führende Schrägstrich wird danach entfernt,
  // damit join() nicht aus dem Verzeichnis herausführt.
  const rein = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  const pfad = join(STATIC, rein);

  try {
    const info = await stat(pfad);
    if (info.isFile()) return await datei(res, pfad);
  } catch {
    /* fällt unten auf index.html zurück */
  }

  // Die App bringt ihr eigenes Routing mit: Jeder unbekannte Pfad bekommt die
  // Startseite, sonst führt ein Neuladen unter /bibel/joh/3 ins Leere.
  try {
    return await datei(res, join(STATIC, 'index.html'));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Nicht gefunden. Liegt die gebaute App in "' + STATIC + '"? (npm run build)');
  }
}

/* ------------------------------------------------------------- Server */

const server = createServer((req, res) => {
  cors(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204).end();
    return;
  }

  if (req.url?.startsWith('/v1/messages')) {
    if (req.method !== 'POST') return fehler(res, 405, 'Nur POST.');
    weiterreichen(req, res).catch((e) => {
      console.error(e);
      if (!res.headersSent) fehler(res, 500, 'Unerwarteter Fehler.');
      else res.end();
    });
    return;
  }

  if (req.url === '/gesund') {
    res.writeHead(200, { 'Content-Type': 'text/plain' }).end('ok');
    return;
  }

  if (STATIC === 'aus') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Dieser Server liefert nur /v1/messages aus.');
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') return fehler(res, 405, 'Nur GET.');
  ausliefern(req, res).catch(() => {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Fehler beim Ausliefern.');
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Entgegen-Server auf http://${HOST}:${PORT}`);
  console.log(`  App          : ${STATIC === 'aus' ? 'wird nicht ausgeliefert' : STATIC}`);
  console.log(`  Zugangswort  : ${PASSWORT ? 'gesetzt' : 'KEINES – der Server ist offen'}`);
  console.log(`  Grenze       : ${LIMIT ? `${LIMIT} Anfragen/Stunde/IP` : 'keine'}`);
  console.log(`  Hinter Proxy : ${HINTER_PROXY ? 'ja, X-Forwarded-For wird gelesen' : 'nein'}`);
  console.log(`  Modelle      : ${[...MODELLE].join(', ')}`);
  console.log(`  Antwortlänge : höchstens ${MAX_TOKENS} Token`);
  console.log(`  Tagesgrenze  : ${TAGESLIMIT ? `${TAGESLIMIT} Anfragen` : 'KEINE'}`);
  console.log(`\n  ${schlimmsterFall()}`);

  if (!PASSWORT) {
    console.log('\n  Achtung: Ohne ENTGEGEN_PASSWORT kann jeder, der die Adresse kennt,');
    console.log('  auf deine Rechnung Anfragen stellen.');
  }
});

/**
 * Was können die eingestellten Grenzen im schlimmsten Fall kosten?
 *
 * Eine Zahl beim Start ist mehr wert als ein Absatz in der Anleitung: Sie
 * zwingt zu der Frage, ob man diesen Betrag im Ernstfall zahlen möchte. Ohne
 * Tagesgrenze gibt es keine Zahl – und genau das soll dann dastehen.
 */
function schlimmsterFall() {
  const teuerstes = [...MODELLE]
    .filter((m) => PREISE[m])
    .sort((a, b) => PREISE[b][1] - PREISE[a][1])[0];

  if (!teuerstes) return 'Kosten: unbekanntes Modell, keine Schätzung möglich.';
  if (!TAGESLIMIT) {
    return (
      'Kosten: ohne Tagesgrenze nach oben offen. Setz ENTGEGEN_TAGESLIMIT und\n' +
      '  zusätzlich ein Ausgabenlimit im Anthropic-Konto.'
    );
  }

  const [ein, aus] = PREISE[teuerstes];
  const jeAnfrage = (EINGABE_TOKEN / 1e6) * ein + (MAX_TOKENS / 1e6) * aus;
  const proTag = jeAnfrage * TAGESLIMIT;

  return (
    `Kosten im schlimmsten Fall: rund ${proTag.toFixed(2)} $ am Tag ` +
    `(${(proTag * 30).toFixed(0)} $ im Monat),\n` +
    `  wenn die Tagesgrenze mit ${teuerstes} und voller Antwortlänge ` +
    `ausgeschöpft wird.\n` +
    '  Das ist eine Schätzung. Die harte Grenze ist das Ausgabenlimit im Anthropic-Konto.'
  );
}
