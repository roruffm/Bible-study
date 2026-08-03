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

// 10. Lesepläne
await page.goto(BASE + '/studium', { waitUntil: 'networkidle' });
const planCount = await page.locator('.plan').count();
check('Studium listet alle Lesepläne', planCount === 7, `${planCount} Pläne`);
await page.screenshot({ path: `${OUT}/09-studium.png` });

await page.goto(BASE + '/studium/jesus-14', { waitUntil: 'networkidle' });
const dayCount = await page.locator('.day').count();
check('Themenplan hat 14 Tage', dayCount === 14, `${dayCount} Tage`);
const firstPortion = await page.locator('.day').first().locator('.day__portions .chip').first().textContent();
check('Tagesabschnitt ist beschriftet', (firstPortion ?? '').startsWith('Markus 1,1'), firstPortion ?? '');

await page.locator('.day__check').first().click();
await page.waitForSelector('.day--done');
check('Tag lässt sich abhaken', (await page.locator('.day--done').count()) === 1);
await page.getByRole('button', { name: 'Diesen Plan verfolgen' }).click();
await page.waitForTimeout(200);
await page.screenshot({ path: `${OUT}/10-leseplan.png` });

// Der 365-Tage-Plan wird berechnet, nicht gepflegt – Umfang prüfen.
await page.goto(BASE + '/studium/bibel-jahr', { waitUntil: 'networkidle' });
const yearDays = await page.locator('.day').count();
check('Jahresplan umfasst 365 Tage', yearDays === 365, `${yearDays} Tage`);

// 11. Aktiver Plan erscheint auf der Startseite
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
const homePlan = (await page.locator('.tile').first().textContent()) ?? '';
check('Startseite zeigt den verfolgten Plan', homePlan.includes('Wer ist Jesus?') && homePlan.includes('Tag 2'), homePlan.replace(/\s+/g, ' ').slice(0, 70));

// 12. Offline-Betrieb
await page.goto(BASE + '/ich', { waitUntil: 'networkidle' });
await page.evaluate(() => navigator.serviceWorker.ready);
await page.reload({ waitUntil: 'networkidle' });
const controlled = await page.evaluate(() => Boolean(navigator.serviceWorker.controller));
check('Service Worker steuert die Seite', controlled);

// Der Laufzeit-Cache kann durch die Volltextsuche bereits gefüllt sein –
// dann ist der Knopf abgeschaltet und nur der Endzustand zu prüfen.
const offlineCard = page.locator('.card', { hasText: 'Offline lesen' });
await offlineCard.locator('.tile__value').waitFor();
const offlineButton = offlineCard.getByRole('button').first();
if (!/Vollständig/.test((await offlineButton.textContent()) ?? '')) {
  await offlineButton.click();
}
await offlineCard.locator('button:has-text("Vollständig offline verfügbar")').waitFor({ timeout: 120_000 });
const offlineLabel = (await offlineCard.locator('.tile__value').textContent()) ?? '';
check('Alle 66 Bücher sind zwischengespeichert', offlineLabel.includes('66 von 66'), offlineLabel);
await page.screenshot({ path: `${OUT}/11-offline.png` });

await page.context().setOffline(true);
await page.goto(BASE + '/bibel/ps/23', { waitUntil: 'load' });
await page.waitForSelector('.reader__text');
const offlineVerse = (await page.locator('#v1').textContent()) ?? '';
check('Ohne Netz lädt ein Kapitel aus dem Cache', offlineVerse.includes('Der HERR ist mein Hirte'), offlineVerse.slice(0, 50) + '…');

await page.goto(BASE + '/bibel/roem/8', { waitUntil: 'load' });
await page.waitForSelector('.reader__text');
check('Auch ein noch nie geöffnetes Buch ist offline da', ((await page.locator('#v28').textContent()) ?? '').includes('zum Besten'));
await page.context().setOffline(false);

// 13. Referenz-Parser
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
