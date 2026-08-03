/**
 * Prüft die Einzeldatei-Fassung: Sie wird als lokale Datei geöffnet (ohne
 * Server) und muss dabei ohne jede Netzanfrage vollständig funktionieren.
 *
 * Aufruf: node scripts/test-singlefile.mjs
 */

import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(ROOT, 'dist-single', 'lumina.html');

if (!existsSync(FILE)) {
  console.error('dist-single/lumina.html fehlt – zuerst "npm run build:single" ausführen.');
  process.exit(1);
}

const results = [];
const errors = [];
const externalRequests = [];

function check(name, ok, detail = '') {
  results.push({ name, ok });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
}

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('request', (r) => {
  if (!r.url().startsWith('file://') && !r.url().startsWith('data:')) externalRequests.push(r.url());
});

await page.goto('file://' + FILE, { waitUntil: 'load' });

// Der Text wird beim Start entpackt – das braucht einen Moment.
await page.waitForSelector('.daily__text:not(:has(.spinner))', { timeout: 60_000 });
const daily = (await page.locator('.daily__text').textContent()) ?? '';
check('Startseite zeigt den Vers des Tages', daily.trim().length > 25, daily.slice(0, 50).trim() + '…');

// Hash-Routing statt Pfaden, weil keine Serverzuordnung existiert.
await page.fill('#quickjump', 'Joh 3,16');
await page.waitForSelector('.jump__list');
await page.keyboard.press('Enter');
await page.waitForSelector('.reader__text');
check('Schnellsprung funktioniert', page.url().includes('#/bibel/joh/3'), page.url().split('/').slice(-3).join('/'));
check('Verstext ist vorhanden', ((await page.locator('#v16').textContent()) ?? '').includes('Also hat Gott die Welt geliebt'));
check('Vers-Panel zeigt den Kontext', ((await page.locator('.panel__article').textContent()) ?? '').includes('Nikodemus'));

// Ein weit entferntes Buch – prüft, dass wirklich alles eingebettet ist.
await page.goto('file://' + FILE + '#/bibel/offb/21', { waitUntil: 'load' });
await page.waitForSelector('.reader__text', { timeout: 60_000 });
check('Auch das letzte Buch ist enthalten', ((await page.locator('#v4').textContent()) ?? '').includes('abwischen'));

// Volltextsuche über den eingebetteten Text.
await page.goto('file://' + FILE + '#/suche', { waitUntil: 'load' });
await page.waitForSelector('.search__bar button:not([disabled])', { timeout: 90_000 });
await page.fill('.search__bar input', 'Hirte');
await page.click('.search__bar button');
await page.waitForSelector('.hit');
check('Volltextsuche liefert Treffer', (await page.locator('.hit').count()) > 10, `${await page.locator('.hit').count()} Treffer`);

await page.goto('file://' + FILE + '#/studium', { waitUntil: 'load' });
await page.waitForSelector('.plan');
check('Lesepläne sind vorhanden', (await page.locator('.plan:not([data-kind="werkzeug"])').count()) === 7);

// Karte und Lexikon müssen auch in der Einzeldatei ohne Nachladen laufen.
await page.goto('file://' + FILE + '#/studium/karte', { waitUntil: 'load' });
await page.waitForSelector('.map__svg', { timeout: 30_000 });
check('Karte wird auch als Einzeldatei gezeichnet', (await page.locator('.map__place').count()) >= 20);

await page.goto('file://' + FILE + '#/lexikon', { waitUntil: 'load' });
await page.waitForSelector('.lex-entry__term');
check('Lexikon ist enthalten', (await page.locator('.lex-entry__term').count()) >= 60);

check('Keine Anfrage nach außen', externalRequests.length === 0, externalRequests.slice(0, 3).join(', '));
check('Keine Konsolenfehler', errors.length === 0, errors.slice(0, 2).join(' | '));

await page.screenshot({ path: join(ROOT, 'smoke-shots', '12-einzeldatei.png') });
await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} Prüfungen bestanden`);
process.exit(failed.length === 0 ? 0 : 1);
