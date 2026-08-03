/**
 * Smoke-Test gegen den Vorschau-Server (npm run preview).
 *
 * Aufruf: node scripts/smoke-test.mjs
 * Voraussetzung: npm install --no-save playwright
 */
import { chromium } from 'playwright';

const BASE = process.env.SMOKE_BASE ?? 'http://127.0.0.1:4173';
const OUT = process.env.SMOKE_OUT ?? 'smoke-shots';
const errors = [];
const results = [];

function check(name, ok, detail = '') {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
}

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

// 1. Startseite + Vers des Tages
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
const dailyText = (await page.locator('.daily__text').textContent()) ?? '';
check('Startseite lädt Vers des Tages', dailyText.trim().length > 25, dailyText.slice(0, 60).trim() + '…');
await page.screenshot({ path: `${OUT}/01-heute.png`, fullPage: false });

// 2. Schnellsprung "Joh 3,16"
await page.fill('#quickjump', 'Joh 3,16');
await page.waitForSelector('.jump__list');
await page.keyboard.press('Enter');
await page.waitForURL(/\/bibel\/joh\/3/);
await page.waitForSelector('.reader__text');
const title = await page.locator('.reader__title').textContent();
check('Schnellsprung "Joh 3,16" trifft Johannes 3', title?.includes('Johannes 3') ?? false, title ?? '');

const v16 = await page.locator('#v16').textContent();
check('Vers 16 enthält den erwarteten Text', (v16 ?? '').includes('Also hat Gott die Welt geliebt'), (v16 ?? '').slice(0, 55) + '…');
check('Vers 16 ist ausgewählt', await page.locator('#v16').evaluate((e) => e.classList.contains('verse--selected')));

// 3. Vers-Panel: Kontext, Auslegung, Querverweise
await page.waitForSelector('.panel');
const kontext = (await page.locator('.panel__article').textContent()) ?? '';
check('Panel zeigt historischen Kontext', kontext.includes('Nikodemus'), kontext.slice(0, 60).trim() + '…');
await page.screenshot({ path: `${OUT}/02-leseansicht-panel.png` });

await page.getByRole('tab', { name: /Auslegung/ }).click();
const interpCount = await page.locator('.interp').count();
const traditions = await page.locator('.interp__tradition').allTextContents();
check('Panel zeigt mehrere Auslegungstraditionen', interpCount >= 3, traditions.join(' | '));
await page.screenshot({ path: `${OUT}/03-auslegungen.png` });

await page.getByRole('tab', { name: /Verweise/ }).click();
const xrefs = await page.locator('.xref').count();
check('Panel zeigt Querverweise', xrefs >= 3, `${xrefs} Verweise`);

// 4. Notiz + Markierung speichern
await page.getByRole('tab', { name: /Notizen/ }).click();
await page.locator('.swatch').nth(1).click();
await page.fill('.textarea', 'Testnotiz aus dem Smoke-Test.');
await page.getByRole('button', { name: 'Notiz speichern' }).click();
await page.waitForSelector('.note-item');
check('Notiz wird gespeichert und angezeigt', (await page.locator('.note-item').count()) === 1);
check('Markierung färbt den Vers', await page.locator('#v16').evaluate((e) => e.className.includes('verse--hl-')));

// 5. Volltextsuche
await page.goto(BASE + '/suche', { waitUntil: 'networkidle' });
await page.waitForSelector('.search__bar button:not([disabled])', { timeout: 90_000 });
await page.fill('.search__bar input', 'Hirte');
await page.click('.search__bar button');
await page.waitForSelector('.hit');
const hitCount = await page.locator('.hit').count();
const totalLabel = await page.locator('.section-title').first().textContent();
check('Volltextsuche liefert Treffer', hitCount > 10, `${totalLabel?.trim()} (${hitCount} angezeigt)`);
check('Treffer sind hervorgehoben', (await page.locator('mark').count()) > 0);
await page.screenshot({ path: `${OUT}/04-suche.png` });

// 6. Bibliothek
await page.goto(BASE + '/bibel', { waitUntil: 'networkidle' });
const bookCount = await page.locator('.book').count();
check('Bibliothek zeigt alle 66 Bücher', bookCount === 66, `${bookCount} Bücher`);
await page.screenshot({ path: `${OUT}/05-bibliothek.png` });

// 7. Buch-Steckbrief
await page.goto(BASE + '/bibel/ps', { waitUntil: 'networkidle' });
const chapterBtns = await page.locator('.chapter-btn').count();
check('Psalmen-Steckbrief zeigt 150 Kapitel', chapterBtns === 150, `${chapterBtns} Kapitel`);
await page.screenshot({ path: `${OUT}/06-buch-steckbrief.png` });

// 8. Dunkles Thema
await page.goto(BASE + '/ich', { waitUntil: 'networkidle' });
check('Notiz erscheint im Journal', (await page.locator('.note-item').count()) >= 1);
await page.getByRole('button', { name: 'Dunkel' }).click();
await page.waitForTimeout(250);
const theme = await page.evaluate(() => document.documentElement.dataset.theme);
check('Dunkles Farbschema wird gesetzt', theme === 'dunkel', theme ?? '');
await page.goto(BASE + '/bibel/ps/23', { waitUntil: 'networkidle' });
await page.screenshot({ path: `${OUT}/07-dunkel-psalm23.png` });

// 9. Mobile Ansicht
const mobile = await browser.newPage({ viewport: { width: 390, height: 780 } });
await mobile.goto(BASE + '/bibel/joh/3?vers=16', { waitUntil: 'networkidle' });
await mobile.waitForSelector('.panel');
check('Mobile: Panel fährt als Bottom-Sheet ein', await mobile.locator('.panel').isVisible());
check('Mobile: Tableiste sichtbar', await mobile.locator('.tabbar').isVisible());
await mobile.screenshot({ path: `${OUT}/08-mobil.png` });

// 10. Referenz-Parser
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
for (const [input, expect] of [['1. Mose 1', '/bibel/1mo/1'], ['Psalm 23,1', '/bibel/ps/23'], ['1kor 13', '/bibel/1kor/13']]) {
  await page.fill('#quickjump', input);
  await page.waitForSelector('.jump__list');
  await page.keyboard.press('Enter');
  await page.waitForURL(new RegExp(expect.replace(/\//g, '\\/')));
  check(`Parser erkennt "${input}"`, page.url().includes(expect), page.url().replace(BASE, ''));
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
}

check('Keine Konsolenfehler', errors.length === 0, errors.slice(0, 3).join(' | '));

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} Prüfungen bestanden`);
process.exit(failed.length === 0 ? 0 : 1);
