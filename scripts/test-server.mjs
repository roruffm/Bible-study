/**
 * Prüft den eigenen Server aus `server/entgegen-server.mjs`.
 *
 * Der Server trägt den API-Schlüssel und steht im Netz – die Prüfungen zielen
 * deshalb nicht auf Bequemlichkeiten, sondern auf das, was teuer wird, wenn es
 * fehlt: Kommt jemand ohne Zugangswort durch? Lässt sich über den Pfad eine
 * Datei außerhalb der App abrufen? Steht der Schlüssel womöglich in der
 * Auslieferung? Und wird ein beliebiges Modell einfach durchgereicht?
 *
 * Gegenstelle ist `scripts/fake-model.mjs`, nicht der echte Dienst: Geprüft
 * wird der eigene Server, nicht Anthropic.
 *
 * Aufruf: node scripts/test-server.mjs
 * (startet Attrappe und Server selbst; erwartet eine gebaute App in dist/)
 */

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ATTRAPPE = 4321;
const SERVER = 8099;
const WORT = 'probewort';
const SCHLUESSEL = 'sk-ant-nur-fuer-den-test';

const results = [];
function check(name, ok, detail = '') {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
}

if (!existsSync(join(ROOT, 'dist', 'index.html'))) {
  console.error('dist/index.html fehlt – zuerst "npm run build" ausführen.');
  process.exit(1);
}

const kinder = [];
function starte(datei, env, args = []) {
  const kind = spawn(process.execPath, [join(ROOT, datei), ...args], {
    cwd: ROOT,
    env: { ...process.env, ...env },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  kinder.push(kind);
  return kind;
}

async function warteAuf(url, versuche = 40) {
  for (let i = 0; i < versuche; i++) {
    try {
      await fetch(url);
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 150));
    }
  }
  return false;
}

starte('scripts/fake-model.mjs', {}, [String(ATTRAPPE)]);
starte('server/entgegen-server.mjs', {
  ANTHROPIC_API_KEY: SCHLUESSEL,
  ENTGEGEN_UPSTREAM: `http://127.0.0.1:${ATTRAPPE}`,
  ENTGEGEN_PASSWORT: WORT,
  PORT: String(SERVER),
});

const basis = `http://127.0.0.1:${SERVER}`;
if (!(await warteAuf(`${basis}/gesund`))) {
  console.error('Server ist nicht hochgekommen.');
  kinder.forEach((k) => k.kill());
  process.exit(1);
}

function anfrage(koerper, kopf = {}) {
  return fetch(`${basis}/v1/messages`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...kopf },
    body: JSON.stringify(koerper),
  });
}

const gueltig = {
  model: 'claude-opus-5',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hallo' }],
};

/* ------------------------------------------------------------ Zugang */

let r = await anfrage(gueltig);
check('Ohne Zugangswort kommt niemand durch', r.status === 401, `HTTP ${r.status}`);

r = await anfrage(gueltig, { 'x-api-key': 'falsch' });
check('Ein falsches Zugangswort wird abgewiesen', r.status === 401, `HTTP ${r.status}`);

/* -------------------------------------------------------- Weiterleitung */

r = await anfrage(gueltig, { 'x-api-key': WORT });
const text = await r.text();
check(
  'Mit Zugangswort wird weitergereicht',
  r.status === 200 && text.includes('event: message_start'),
  `HTTP ${r.status}`,
);
check(
  'Die Antwort kommt als Ereignisstrom',
  (r.headers.get('content-type') ?? '').includes('text/event-stream') &&
    text.includes('content_block_delta'),
);

// Was die Attrappe bekommen hat, verrät, ob der echte Schlüssel eingesetzt
// wurde – und ob das Zugangswort dabei zurückgehalten wird.
const beiAnthropic = await (await fetch(`http://127.0.0.1:${ATTRAPPE}/letzte-anfrage`)).json();
check('Die Anfrage erreicht den Dienst vollständig', beiAnthropic?.model === 'claude-opus-5');

/* ------------------------------------------------------------ Grenzen */

r = await anfrage({ ...gueltig, model: 'ein-fremdes-modell' }, { 'x-api-key': WORT });
check('Ein nicht freigegebenes Modell wird abgelehnt', r.status === 400, `HTTP ${r.status}`);

await anfrage({ ...gueltig, max_tokens: 999_999 }, { 'x-api-key': WORT }).then((x) => x.text());
const gedeckelt = await (await fetch(`http://127.0.0.1:${ATTRAPPE}/letzte-anfrage`)).json();
check(
  'Eine überzogene Ausgabelänge wird gedeckelt',
  gedeckelt.max_tokens === 8192,
  `max_tokens: ${gedeckelt.max_tokens}`,
);

r = await fetch(`${basis}/v1/messages`, {
  method: 'POST',
  headers: { 'content-type': 'application/json', 'x-api-key': WORT },
  body: 'x'.repeat(600 * 1024),
});
check('Ein übergroßer Körper wird abgewiesen', r.status === 413, `HTTP ${r.status}`);

/* --------------------------------------------------------- Auslieferung */

r = await fetch(basis + '/');
check('Die App wird ausgeliefert', r.status === 200);

r = await fetch(basis + '/bibel/joh/3');
check(
  'Unbekannte Pfade bekommen die App statt eines 404',
  r.status === 200 && (await r.text()).includes('<!doctype html>'),
  'sonst scheitert das Neuladen einer Unterseite',
);

/*
 * Der Pfad kommt vom Aufrufer. Ohne Bereinigung ließe sich damit jede Datei
 * neben der App lesen – auch die, in der der Schlüssel steht.
 */
const ausbrueche = [
  '/../package.json',
  '/%2e%2e/package.json',
  '/..%252f..%252fpackage.json',
  '/assets/../../package.json',
  '/./../../etc/hostname',
];
const durchgekommen = [];
for (const pfad of ausbrueche) {
  const inhalt = await (await fetch(basis + pfad)).text();
  if (!inhalt.includes('<!doctype html>')) durchgekommen.push(pfad);
}
check(
  'Kein Ausbruch aus dem Verzeichnis der App',
  durchgekommen.length === 0,
  durchgekommen.join(', ') || `${ausbrueche.length} Versuche abgewehrt`,
);

const startseite = await (await fetch(basis + '/')).text();
check('Der Schlüssel steht nicht in der Auslieferung', !startseite.includes(SCHLUESSEL));

const abgewiesen = await (await anfrage(gueltig, { 'x-api-key': 'falsch' })).text();
check('Der Schlüssel steht nicht in Fehlermeldungen', !abgewiesen.includes(SCHLUESSEL));

/* -------------------------------------------------- Grenze hinter Proxy */

/*
 * In der empfohlenen Aufstellung steht Caddy davor, und aus Sicht des Servers
 * kommt dann jede Anfrage von 127.0.0.1. Zwei Dinge müssen stimmen: Hinter
 * einem Proxy darf die Stundengrenze nicht alle Besucher zusammenzählen – und
 * ohne Proxy darf sich niemand mit einem erfundenen X-Forwarded-For ein
 * frisches Kontingent ausstellen.
 */
const GRENZE_PORT = 8098;
starte('server/entgegen-server.mjs', {
  ANTHROPIC_API_KEY: SCHLUESSEL,
  ENTGEGEN_UPSTREAM: `http://127.0.0.1:${ATTRAPPE}`,
  ENTGEGEN_STATIC: 'aus',
  ENTGEGEN_LIMIT: '2',
  ENTGEGEN_PROXY: '1',
  PORT: String(GRENZE_PORT),
});
const OHNE_PORT = 8097;
starte('server/entgegen-server.mjs', {
  ANTHROPIC_API_KEY: SCHLUESSEL,
  ENTGEGEN_UPSTREAM: `http://127.0.0.1:${ATTRAPPE}`,
  ENTGEGEN_STATIC: 'aus',
  ENTGEGEN_LIMIT: '2',
  PORT: String(OHNE_PORT),
});
await warteAuf(`http://127.0.0.1:${GRENZE_PORT}/gesund`);
await warteAuf(`http://127.0.0.1:${OHNE_PORT}/gesund`);

function zaehle(port, weiter) {
  return fetch(`http://127.0.0.1:${port}/v1/messages`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(weiter ? { 'x-forwarded-for': weiter } : {}),
    },
    body: JSON.stringify(gueltig),
  }).then((x) => {
    x.body?.cancel();
    return x.status;
  });
}

await zaehle(GRENZE_PORT, '10.0.0.1');
await zaehle(GRENZE_PORT, '10.0.0.1');
const dritte = await zaehle(GRENZE_PORT, '10.0.0.1');
const andererBesucher = await zaehle(GRENZE_PORT, '10.0.0.2');
check(
  'Hinter einem Proxy zählt die Grenze je Besucher',
  dritte === 429 && andererBesucher === 200,
  `dritte Anfrage ${dritte}, anderer Besucher ${andererBesucher}`,
);

await zaehle(OHNE_PORT, 'erfunden-1');
await zaehle(OHNE_PORT, 'erfunden-2');
const erfunden = await zaehle(OHNE_PORT, 'erfunden-3');
check(
  'Ohne Proxy lässt sich die Grenze nicht mit erfundener Herkunft umgehen',
  erfunden === 429,
  `dritte Anfrage mit neuer erfundener IP: ${erfunden}`,
);

/* ------------------------------------------------------------- Schluss */

kinder.forEach((k) => k.kill());

const gescheitert = results.filter((x) => !x.ok);
console.log(`\n${results.length - gescheitert.length}/${results.length} Prüfungen bestanden`);
process.exit(gescheitert.length === 0 ? 0 : 1);
