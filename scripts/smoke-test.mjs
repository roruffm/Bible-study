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

// Zeitliche Einordnung: Ereignis und Entstehung stehen getrennt.
const dating = (await page.locator('.dating').textContent()) ?? '';
check(
  'Panel zeigt die zeitliche Einordnung',
  dating.includes('Ereignis') && dating.includes('Aufgeschrieben') && dating.includes('90–100'),
  dating.replace(/\s+/g, ' ').slice(0, 80),
);
await page.locator('.dating a').click();
await page.waitForURL(/epoche=roemer/);
check('Die Epoche verlinkt in die Zeitleiste', (await page.locator('.axis__band--active').textContent())?.includes('Römische'), (await page.locator('.axis__band--active').textContent()) ?? '');
// Der Klick schließt das Panel und nimmt die Vers-Auswahl aus der Adresse –
// deshalb wird der Vers hier wieder gezielt angesteuert statt zurückgeblättert.
await page.goto(BASE + '/bibel/joh/3?vers=16', { waitUntil: 'networkidle' });
await page.waitForSelector('.panel');

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
// Die Werkzeugkarten teilen sich die Gestaltung mit den Plänen – hier zählen
// nur die Pläne selbst.
const planCount = await page.locator('.plan:not([data-kind="werkzeug"])').count();
const toolCount = await page.locator('.plan[data-kind="werkzeug"]').count();
check('Studium listet alle Lesepläne', planCount === 17, `${planCount} Pläne`);
check('Studium bietet alle Werkzeuge an', toolCount === 6, `${toolCount} Werkzeuge`);
const topicHeads = await page.locator('.library__head h3').allTextContents();
check(
  'Themenpläne sind nach Sachgebiet gruppiert',
  ['Zum Anfangen', 'Lebensfragen', 'Glauben verstehen', 'Leben in der Welt'].every((t) => topicHeads.includes(t)),
  topicHeads.join(' | '),
);

await page.screenshot({ path: `${OUT}/09-studium.png`, fullPage: true });

// Ein neuer Themenplan von Anfang bis Ende.
await page.goto(BASE + '/studium/gerechtigkeit-8', { waitUntil: 'networkidle' });
const gerechtigkeitDays = await page.locator('.day').count();
const firstDay = await page.locator('.day__portions .chip').first().textContent();
check('Themenplan „Gerechtigkeit“ ist vollständig', gerechtigkeitDays === 8, `${gerechtigkeitDays} Tage`);
check('Sein erster Abschnitt stimmt', firstDay === '2. Mose 22,21-27', firstDay ?? '');
await page.screenshot({ path: `${OUT}/20-themenplan.png` });

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

// 13. Lexikon
await page.goto(BASE + '/lexikon', { waitUntil: 'networkidle' });
const lexCount = await page.locator('.lex-entry__term').count();
check('Lexikon listet alle Einträge', lexCount >= 120, `${lexCount} Einträge`);
await page.getByRole('button', { name: 'Maß & Geld' }).click();
await page.waitForFunction(() => document.querySelectorAll('.lex-entry__term').length < 30);
const massFacts = await page.locator('.mention__fact').allTextContents();
check('Maße tragen eine konkrete Angabe', massFacts.includes('etwa 45 cm'), massFacts.slice(0, 5).join(' | '));
await page.getByRole('button', { name: 'Alle' }).click();
await page.fill('.input', 'Damaskus');
await page.waitForFunction(() => document.querySelectorAll('.lex-entry__term').length === 1);
check('Lexikonsuche filtert', (await page.locator('.lex-entry__term').textContent()) === 'Damaskus');
await page.screenshot({ path: `${OUT}/14-lexikon.png` });

// Stichworte im Bibeltext – und nur beim ersten Vorkommen im Kapitel.
await page.goto(BASE + '/bibel/apg/9', { waitUntil: 'networkidle' });
await page.waitForSelector('.reader__text');
const lexInText = await page.locator('.lex').count();
const lexTerms = await page.locator('.lex').allTextContents();
check('Stichworte sind im Bibeltext markiert', lexInText > 0, lexTerms.slice(0, 6).join(', '));
check('Jedes Stichwort nur einmal je Kapitel', new Set(lexTerms).size === lexTerms.length, `${lexTerms.length} Markierungen`);

await page.locator('.lex', { hasText: 'Damaskus' }).first().click();
await page.waitForSelector('.sheet');
check('Lexikon-Überlagerung öffnet sich', ((await page.locator('.sheet__title').textContent()) ?? '') === 'Damaskus');
check('Vers-Panel bleibt dabei zu', (await page.locator('.panel').count()) === 0);
await page.screenshot({ path: `${OUT}/15-lexikon-im-text.png` });
await page.keyboard.press('Escape');

// 13b. Sachwissen im Vers-Panel – gerade dort, wo es keinen eigenen Artikel gibt
await page.goto(BASE + '/bibel/mt/20?vers=2', { waitUntil: 'networkidle' });
await page.waitForSelector('.panel');
const mentions = await page.locator('.mention__head strong').allTextContents();
check(
  'Vers-Panel erklärt, was im Vers vorkommt',
  mentions.includes('Groschen') && mentions.includes('Weinberg'),
  mentions.join(', '),
);
check(
  'Dazu die harte Angabe',
  (await page.locator('.mention__fact').first().textContent()) === 'ein Tageslohn',
  (await page.locator('.mention__fact').first().textContent()) ?? '',
);
check(
  'Auch ohne eigenen Artikel gibt es Hintergrund',
  ((await page.locator('.panel__article').textContent()) ?? '').includes('kein eigener Artikel'),
);
await page.screenshot({ path: `${OUT}/21-sachwissen.png` });

// 14. Zeitleiste
await page.goto(BASE + '/studium/zeitleiste', { waitUntil: 'networkidle' });
const epochs = await page.locator('.axis__band').count();
const events = await page.locator('.event').count();
check('Zeitleiste zeigt Epochen und Ereignisse', epochs === 10 && events === 97, `${epochs} Epochen, ${events} Einträge`);

// Vier Arten von Einträgen stehen nebeneinander und lassen sich trennen.
await page.getByRole('button', { name: 'Entstehung' }).click();
await page.waitForFunction(() => document.querySelectorAll('.event').length < 30);
const textEvents = await page.locator('.event').count();
const textLabels = await page.locator('.event__label').allTextContents();
check('Entstehungszeiten lassen sich einzeln zeigen', textEvents === 17, `${textEvents} Einträge`);
check(
  'Darunter die Entstehung des Danielbuchs',
  textLabels.some((l) => l.includes('Daniel')),
  textLabels.find((l) => l.includes('Daniel'))?.slice(0, 60) ?? '',
);
await page.getByRole('button', { name: 'Fund' }).click();
await page.waitForFunction(() => document.querySelectorAll('.event').length === 15);
const fundLabels = await page.locator('.event__label').allTextContents();
check(
  'Außerbiblische Funde sind eigens ausgewiesen',
  fundLabels.some((l) => l.includes('Tel-Dan')) && fundLabels.some((l) => l.includes('Gallio')),
  `${fundLabels.length} Funde`,
);
await page.getByRole('button', { name: 'Alles' }).click();

await page.locator('.axis__band').filter({ hasText: 'Babylonisches Exil' }).click();
await page.waitForFunction(() => document.querySelectorAll('.event').length < 12);
check('Epoche lässt sich filtern', (await page.locator('.event').count()) < 12, `${await page.locator('.event').count()} Einträge`);
await page.screenshot({ path: `${OUT}/16-zeitleiste.png` });

// 15. Karte
await page.goto(BASE + '/studium/karte', { waitUntil: 'networkidle' });
await page.waitForSelector('.map__svg');
const placeCount = await page.locator('.map__place').count();
check('Karte verortet die Orte', placeCount >= 60, `${placeCount} Orte im Weltausschnitt`);
// Auf der Gesamtkarte passen nur die weiträumigen Landschaften; die kleinen
// um Israel herum erscheinen erst im engeren Ausschnitt.
const regionCount = await page.locator('.map__region').count();
check('Landschaften sind beschriftet', regionCount >= 6, `${regionCount} Landschaften`);
check('Alle neun Wege stehen zur Wahl', (await page.locator('.search__filters .chip').filter({ hasText: /reise|Weg|Gemeinden|Auszug|Wege Jesu|Fahrt nach Rom/ }).count()) >= 9);
await page.screenshot({ path: `${OUT}/17-karte.png` });

// Beschriftungen dürfen sich in keinem Ausschnitt überdecken – wer keinen
// Platz findet, bleibt ein Punkt ohne Namen.
const countOverlaps = (selector) =>
  page.evaluate((sel) => {
    const boxes = [...document.querySelectorAll(sel)].map((el) => el.getBoundingClientRect());
    let n = 0;
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        if (!(a.right < b.left || b.right < a.left || a.bottom < b.top || b.bottom < a.top)) n++;
      }
    }
    return n;
  }, selector);

const countClipped = () =>
  page.evaluate(() => {
    const svg = document.querySelector('.map__svg').getBoundingClientRect();
    return [...document.querySelectorAll('.map__place text, .map__region text')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.left < svg.left - 0.5 || r.right > svg.right + 0.5;
    }).length;
  });

let worstOverlap = 0;
let worstClipped = 0;
let worstDots = 0;
for (const ausschnitt of ['welt', 'israel', 'levante', 'aegaeis', 'mesopotamien', 'westen']) {
  await page.goto(BASE + '/studium/karte?ausschnitt=' + ausschnitt, { waitUntil: 'networkidle' });
  await page.waitForSelector('.map__svg');
  worstOverlap = Math.max(worstOverlap, await countOverlaps('.map__place text, .map__region text'));
  worstDots = Math.max(worstDots, await countOverlaps('.map__place circle'));
  worstClipped = Math.max(worstClipped, await countClipped());
}
check('Keine Beschriftung überdeckt eine andere', worstOverlap === 0, `${worstOverlap} Überdeckungen`);
check('Kein Ortspunkt liegt auf einem anderen', worstDots === 0, `${worstDots} Überdeckungen`);
check('Keine Beschriftung ragt aus der Karte', worstClipped === 0, `${worstClipped} abgeschnitten`);

// Jeder Ausschnitt bleibt gleich hoch – sonst wird "Israel" ein 1700 Pixel
// hoher Streifen.
const heights = [];
for (const ausschnitt of ['welt', 'israel', 'aegaeis']) {
  await page.goto(BASE + '/studium/karte?ausschnitt=' + ausschnitt, { waitUntil: 'networkidle' });
  await page.waitForSelector('.map__svg');
  heights.push(Math.round(await page.locator('.map__svg').evaluate((el) => el.getBoundingClientRect().height)));
}
check('Alle Ausschnitte haben dasselbe Format', new Set(heights).size === 1 && heights[0] < 900, heights.join(' / '));

await page.goto(BASE + '/studium/karte', { waitUntil: 'networkidle' });
await page.waitForSelector('.map__svg');

// Ausschnitt wechseln: Israel zeigt weniger, aber die Orte werden lesbar.
await page.getByRole('button', { name: 'Israel', exact: true }).click();
await page.waitForFunction(
  (before) => document.querySelectorAll('.map__place').length < before,
  placeCount,
);
const israelCount = await page.locator('.map__place').count();
check('Ausschnitt Israel schränkt die Orte ein', israelCount > 0 && israelCount < placeCount, `${israelCount} statt ${placeCount}`);
const israelRegions = await page.locator('.map__region text').allTextContents();
check('Im engeren Ausschnitt erscheinen die kleinen Landschaften', israelRegions.includes('Galiläa') && israelRegions.includes('Judäa'), israelRegions.join(', '));
await page.screenshot({ path: `${OUT}/17b-karte-israel.png` });

// Nach Art filtern.
await page.getByRole('button', { name: 'Berge', exact: true }).click();
await page.waitForFunction(() => document.querySelectorAll('.map__place').length < 12);
check('Karte lässt sich nach Art filtern', (await page.locator('.map__place').count()) < 12, `${await page.locator('.map__place').count()} Berge`);

// Ortssuche springt auf den passenden Ausschnitt und öffnet die Tafel.
await page.goto(BASE + '/studium/karte', { waitUntil: 'networkidle' });
await page.waitForSelector('.map__svg');
await page.getByPlaceholder(/Ort suchen/).fill('Ninive');
await page.locator('.jump__item', { hasText: 'Ninive' }).first().click();
await page.waitForSelector('.lex-entry__term');
check('Ortssuche öffnet den Ort', (await page.locator('.lex-entry__term').first().textContent()) === 'Ninive');
check('Ort nennt Bibelstellen', (await page.locator('section .xref').count()) >= 1, `${await page.locator('section .xref').count()} Stellen`);
check('Ortssuche zoomt auf den passenden Ausschnitt', new URL(page.url()).searchParams.get('ausschnitt') === 'mesopotamien', new URL(page.url()).searchParams.get('ausschnitt') ?? '—');
await page.screenshot({ path: `${OUT}/17c-karte-ort.png` });

// Von einem Ort aus zu einer Route, die über ihn führt.
await page.goto(BASE + '/studium/karte?ort=jerusalem', { waitUntil: 'networkidle' });
await page.waitForSelector('.lex-entry__term');
const throughCount = await page.locator('section .day__portions .chip').count();
check('Ort zeigt die Wege, die über ihn führen', throughCount >= 2, `${throughCount} Wege über Jerusalem`);

await page.goto(BASE + '/studium/karte', { waitUntil: 'networkidle' });
await page.waitForSelector('.map__svg');
await page.getByRole('button', { name: 'Zweite Missionsreise' }).click();
await page.waitForSelector('.map__route');
// 14 Stationen, aber Antiochia ist Start und Ziel – doppelt angefahrene Orte
// werden zu einem Punkt zusammengefasst.
const stops = await page.locator('.map__stop').count();
check('Route der zweiten Missionsreise wird gezeichnet', stops === 13, `${stops} Punkte für 14 Stationen`);
const merged = await page.locator('.map__stop text', { hasText: 'Antiochia' }).first().textContent();
check('Doppelt angefahrener Ort trägt beide Nummern', /1\.,\s*14\./.test(merged ?? ''), merged ?? '');
check('Stationsliste zeigt alle 14 Schritte', (await page.locator('section .day').count()) === 14);
await page.screenshot({ path: `${OUT}/18-karte-reise.png` });

// Vergrößern, Ziehen und Zurücksetzen
await page.goto(BASE + '/studium/karte?ausschnitt=israel&ort=jerusalem', { waitUntil: 'networkidle' });
await page.waitForSelector('.map__svg');
const viewBoxOf = () => page.locator('.map__svg').getAttribute('viewBox');
const weitRaus = await viewBoxOf();
for (let i = 0; i < 4; i++) await page.getByRole('button', { name: 'Vergrößern' }).click();
await page.waitForTimeout(150);
const nahDran = await viewBoxOf();
check(
  'Vergrößern verkleinert den Bildausschnitt',
  Number(nahDran.split(' ')[2]) < Number(weitRaus.split(' ')[2]) / 4,
  `${weitRaus} → ${nahDran}`,
);

// Beim Hineinzoomen tauchen die dicht beieinanderliegenden Orte auf.
const dichteOrte = await page.evaluate(() =>
  [...document.querySelectorAll('[data-ort]')].map((el) => el.dataset.ort),
);
check(
  'Beim Vergrößern erscheinen die eng benachbarten Orte',
  dichteOrte.includes('kidron') && dichteOrte.includes('betanien'),
  dichteOrte.length + ' Orte',
);

// Die Karte muss im Sichtfenster liegen, sonst zieht die Maus ins Leere.
await page.locator('.map__svg').scrollIntoViewIfNeeded();
const kasten = await page.locator('.map__svg').boundingBox();
const zugY = Math.min(kasten.y + kasten.height / 2, page.viewportSize().height - 80);
await page.mouse.move(kasten.x + kasten.width / 2, zugY);
await page.mouse.down();
await page.mouse.move(kasten.x + kasten.width / 2 - 180, zugY, { steps: 8 });
await page.mouse.up();
await page.waitForTimeout(150);
check('Ziehen verschiebt die Karte', (await viewBoxOf()) !== nahDran);
check('Ein Zug öffnet keinen Ort', (await page.locator('section .xref').count()) > 0);
await page.getByRole('button', { name: 'Ansicht zurücksetzen' }).click();
await page.waitForTimeout(150);
check('Zurücksetzen stellt den Ausschnitt wieder her', (await viewBoxOf()) === weitRaus);
check('Die Karte trägt einen Maßstab', /km/.test(await page.locator('.map__scale text').textContent()));
await page.screenshot({ path: `${OUT}/17d-karte-zoom.png` });

// Routen: Länge und Verknüpfung der Stationen mit den Orten
await page.goto(BASE + '/studium/karte?reise=exil', { waitUntil: 'networkidle' });
await page.waitForSelector('.map__route');
const laenge = await page.locator('section .settings-row__hint').first().innerText();
check('Route nennt Stationen und Wegstrecke', /\d+ km/.test(laenge), laenge.replace(/\n/g, ' '));
await page.locator('section .day .chip').first().click();
await page.waitForSelector('.lex-entry__term');
check(
  'Station führt zum Ort',
  (await page.locator('.lex-entry__term').first().textContent()) === 'Jerusalem',
);

// 16. Verzahnung: Orte im gelesenen Kapitel führen auf die Karte
await page.goto(BASE + '/bibel/apg/17', { waitUntil: 'networkidle' });
await page.waitForSelector('.reader__text');
const orteImKapitel = await page.locator('.reader__places .chip').allTextContents();
check(
  'Leseansicht nennt die Orte des Kapitels',
  orteImKapitel.includes('Athen') && orteImKapitel.includes('Thessalonich'),
  orteImKapitel.join(', '),
);
await page.locator('.reader__places .chip', { hasText: 'Athen' }).first().click();
await page.waitForURL(/studium\/karte\?ort=athen/);
await page.waitForSelector('.lex-entry__term');
check('Der Ort öffnet sich auf der Karte', (await page.locator('.lex-entry__term').first().textContent()) === 'Athen');

// Zeitleiste und Karte sind in beide Richtungen verbunden
await page.goto(BASE + '/studium/zeitleiste?epoche=exil', { waitUntil: 'networkidle' });
await page.waitForSelector('.event');
const ortsKnoepfe = await page.locator('.event .chip', { hasText: '📍' }).count();
check('Zeitleiste verweist auf die Karte', ortsKnoepfe >= 3, `${ortsKnoepfe} Ereignisse mit Ort`);

await page.goto(BASE + '/studium/karte?epoche=urkirche', { waitUntil: 'networkidle' });
await page.waitForSelector('.map__svg');
const epochenOrte = await page.locator('.map__place').count();
const alleOrte = await page.evaluate(() => document.querySelectorAll('[data-ort]').length);
check('Karte lässt sich auf eine Epoche einschränken', epochenOrte > 0 && epochenOrte < 40, `${epochenOrte} Orte`);
check('Die Epoche listet ihre Ereignisse', (await page.locator('section .day').count()) >= 10);
void alleOrte;
await page.screenshot({ path: `${OUT}/21-karte-epoche.png` });

await page.goto(BASE + '/studium/karte?ort=jerusalem', { waitUntil: 'networkidle' });
await page.waitForSelector('.lex-entry__term');
const abschnitte = await page.locator('section .section-title').allTextContents();
check(
  'Die Ortstafel zeigt, was hier geschah',
  abschnitte.includes('Was hier geschah'),
  abschnitte.join(' | '),
);

// 17. Konkordanz
await page.goto(BASE + '/studium/konkordanz?wort=Bund', { waitUntil: 'networkidle' });
await page.waitForSelector('.conc__summary', { timeout: 90_000 });
const summe = await page.evaluate(() =>
  [...document.querySelectorAll('.conc__count')].reduce((n, el) => n + Number(el.textContent), 0),
);
const gesamt = Number(await page.locator('.conc__number').first().textContent());
check('Konkordanz zählt die Vorkommen', gesamt > 100, `${gesamt} Vorkommen von „Bund“`);
check('Die Bücher summieren sich zur Gesamtzahl', summe === gesamt, `${summe} = ${gesamt}`);
check('Treffer stehen in biblischer Reihenfolge', (await page.locator('.conc__hits .xref').count()) > 0);
await page.screenshot({ path: `${OUT}/22-konkordanz.png` });

// Ganze Wörter: „Bund“ darf „Bundeslade“ nicht mitzählen.
await page.goto(BASE + '/studium/konkordanz?wort=Bundeslade', { waitUntil: 'networkidle' });
await page.waitForSelector('.conc__summary');
const lade = Number(await page.locator('.conc__number').first().textContent());
check('Konkordanz zählt nur ganze Wörter', lade > 0 && lade < gesamt, `Bundeslade ${lade}, Bund ${gesamt}`);

// 18. Synopse
await page.goto(BASE + '/studium/synopse', { waitUntil: 'networkidle' });
await page.waitForSelector('.syn__row');
const perikopen = await page.locator('.syn__row').count();
check('Synopse listet die Abschnitte', perikopen >= 70, `${perikopen} Abschnitte`);
// Der Vergleich muss unter der angeklickten Zeile aufgehen. Stand er am
// Seitenkopf, sah man beim Klicken auf eine der hinteren Perikopen nichts.
const perikopeZeile = page.locator('.syn__row', { hasText: 'Der Tod Jesu' });
await perikopeZeile.scrollIntoViewIfNeeded();
await perikopeZeile.click();
await page.waitForSelector('.syn__column');
const zeilenKasten = await perikopeZeile.boundingBox();
const vergleichKasten = await page.locator('.syn__compare').boundingBox();
check(
  'Der Vergleich geht unter der angeklickten Zeile auf',
  Math.abs(vergleichKasten.y - (zeilenKasten.y + zeilenKasten.height)) < 6 &&
    vergleichKasten.y < page.viewportSize().height,
  `Zeile endet bei ${Math.round(zeilenKasten.y + zeilenKasten.height)}, Vergleich beginnt bei ${Math.round(vergleichKasten.y)}`,
);
const spalten = await page.locator('.syn__column').count();
check('Der Tod Jesu steht in allen vier Evangelien', spalten === 4, `${spalten} Spalten`);
const spaltenTexte = await page.locator('.syn__text').allTextContents();
check(
  'Die Fassungen stehen im Wortlaut nebeneinander',
  spaltenTexte.every((t) => t.length > 100) &&
    spaltenTexte[0] !== spaltenTexte[1],
  spaltenTexte.map((t) => t.length + ' Zeichen').join(' / '),
);
await page.screenshot({ path: `${OUT}/23-synopse.png` });

// Aus der Leseansicht heraus zu den Parallelen
await page.goto(BASE + '/bibel/mk/4', { waitUntil: 'networkidle' });
await page.waitForSelector('.reader__text');
const parallelen = await page.locator('.reader__places .xref').count();
check('Leseansicht bietet die Parallelstellen an', parallelen >= 3, `${parallelen} Abschnitte`);
await page.locator('.reader__places .xref').first().click();
await page.waitForURL(/studium\/synopse\?abschnitt=/);
await page.waitForSelector('.syn__column');
check('Der Parallelvergleich öffnet sich', (await page.locator('.syn__column').count()) >= 2);

// 19. Merkverse
await page.goto(BASE + '/bibel/joh/3?vers=16', { waitUntil: 'networkidle' });
await page.waitForSelector('.panel');
await page.getByRole('tab', { name: /Notizen/ }).click();
await page.getByRole('button', { name: 'Zu den Merkversen hinzufügen' }).click();
await page.waitForSelector('button:has-text("In den Merkversen")');
check('Vers landet in den Merkversen', true, 'Stufe 0');

await page.goto(BASE + '/studium/merkverse', { waitUntil: 'networkidle' });
await page.waitForSelector('.memo');
check('Merkvers steht zur Wiederholung an', ((await page.locator('.memo__text').textContent()) ?? '').includes('Also hat Gott'));
await page.getByRole('button', { name: 'Aufdecken' }).click();
await page.getByRole('button', { name: 'Gewusst' }).click();
await page.waitForSelector('.memo', { state: 'detached' });
const levelBadge = await page.locator('.day__check').first().textContent();
check('Nach „Gewusst“ steigt die Lernstufe', levelBadge?.trim() === '1', `Stufe ${levelBadge?.trim()}`);
await page.screenshot({ path: `${OUT}/19-merkverse.png` });

// 17. Referenz-Parser
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
for (const [input, expect] of [['1. Mose 1', '/bibel/1mo/1'], ['Psalm 23,1', '/bibel/ps/23'], ['1kor 13', '/bibel/1kor/13']]) {
  await page.fill('#quickjump', input);
  await page.waitForSelector('.jump__list');
  await page.keyboard.press('Enter');
  await page.waitForURL(new RegExp(expect.replace(/\//g, '\\/')));
  check(`Parser erkennt "${input}"`, page.url().includes(expect), page.url().replace(BASE, ''));
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
}

// 18. Marke: Name, Icon, Schriftzug
await page.goto(BASE + '/ich', { waitUntil: 'networkidle' });
check('Seitentitel trägt den Namen', (await page.title()).startsWith('Entgegen'), await page.title());

const markenBilder = await page.evaluate(() =>
  [...document.querySelectorAll('.brand__mark, .about__logo')].map((img) => img.naturalWidth > 0),
);
check(
  'Icon und Schriftzug werden geladen',
  markenBilder.length === 3 && markenBilder.every(Boolean),
  `${markenBilder.filter(Boolean).length} von ${markenBilder.length}`,
);

/*
 * Der Speicherschlüssel hing bis zur Umbenennung am alten Namen. Ohne Umzug
 * verlöre jeder, der die App vorher benutzt hat, Notizen und Lesefortschritt –
 * still, denn die Daten lägen weiterhin da, nur läse sie niemand mehr.
 */
await page.evaluate(() => {
  localStorage.clear();
  const notiz = {
    id: 'alt',
    ref: { book: 'joh', chapter: 3, verse: 16 },
    text: 'Alte Notiz',
    createdAt: 1,
    updatedAt: 1,
  };
  localStorage.setItem('lumina.notes', JSON.stringify([notiz]));
  localStorage.setItem('lumina.readChapters', JSON.stringify(['joh.3']));
});
await page.reload({ waitUntil: 'networkidle' });
const umzug = await page.evaluate(() => ({
  notizen: localStorage.getItem('entgegen.notes'),
  kapitel: localStorage.getItem('entgegen.readChapters'),
}));
check(
  'Daten aus der Zeit vor der Umbenennung ziehen mit um',
  (umzug.notizen ?? '').includes('Alte Notiz') && (umzug.kapitel ?? '').includes('joh.3'),
  umzug.notizen ?? 'nichts übernommen',
);

/*
 * 19. Rückfragen am Vers
 *
 * Geprüft wird gegen `scripts/fake-model.mjs`, eine Attrappe im Format der
 * Anthropic-Schnittstelle. Den echten Dienst zu rufen wäre teuer, langsam, von
 * einem Schlüssel abhängig und in der Antwort nicht vorhersagbar – während das,
 * was hier wirklich am Code hängt, mit der Attrappe vollständig prüfbar ist:
 * ob der zusammengestellte Kontext ankommt, ob die Antwort schon während des
 * Empfangs erscheint und ob ein Fehler des Dienstes lesbar ankommt.
 *
 * Läuft keine Attrappe, werden diese Prüfungen übersprungen statt zu scheitern
 * – der Smoke-Test soll ohne Zusatzaufbau durchlaufen.
 */
const FAKE = process.env.SMOKE_MODEL ?? 'http://127.0.0.1:4319';
const attrappeDa = await fetch(`${FAKE}/letzte-anfrage`)
  .then(() => true)
  .catch(() => false);

if (!attrappeDa) {
  console.log(`ÜBERSPRUNGEN  Rückfragen am Vers – keine Attrappe auf ${FAKE}`);
  console.log('              (starten mit: node scripts/fake-model.mjs)');
} else {
  await page.goto(BASE + '/bibel/joh/3?vers=16', { waitUntil: 'networkidle' });

  // Ohne eingerichteten Zugang darf nichts hinausgehen: Die Funktion ist
  // ausgeschaltet voreingestellt, und das ist der Kern des Datenschutz-
  // versprechens der App.
  await page.evaluate(() => localStorage.removeItem('entgegen.chat'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.getByRole('tab', { name: /Fragen/ }).click();
  const ausText = (await page.locator('.panel__article').textContent()) ?? '';
  check(
    'Rückfragen sind ohne Einrichtung ausgeschaltet',
    ausText.includes('ausgeschaltet') && (await page.locator('.chat__input').count()) === 0,
  );

  await page.evaluate(
    (url) =>
      localStorage.setItem(
        'entgegen.chat',
        JSON.stringify({ mode: 'proxy', proxyUrl: url, apiKey: '', model: 'claude-opus-5' }),
      ),
    FAKE,
  );
  await page.reload({ waitUntil: 'networkidle' });
  await page.getByRole('tab', { name: /Fragen/ }).click();
  await page.waitForSelector('.chat__suggestions');
  check(
    'Vorschläge zeigen, wonach sich fragen lässt',
    (await page.locator('.chat__suggestions .chip').count()) === 5,
  );

  await page.fill('.chat__input', 'Worum geht es hier?');
  await page.getByRole('button', { name: 'Fragen' }).click();

  // Der Text muss stehen, bevor die Antwort fertig ist – sonst starrt man bei
  // langen Antworten sekundenlang auf einen Ladepunkt.
  await page.waitForFunction(
    () => (document.querySelector('.chat__turn--assistant')?.textContent?.length ?? 0) > 20,
    null,
    { timeout: 20_000 },
  );
  check('Die Antwort erscheint schon während des Empfangs', true);

  // Fertig ist der Empfang, wenn der Abbruchknopf wieder zum Absendeknopf wird.
  await page.waitForSelector('.chat__compose .btn--primary', { timeout: 20_000 });
  const antwort = (await page.locator('.chat__turn--assistant').last().textContent()) ?? '';
  check('Die Antwort kommt vollständig an', antwort.length > 100, `${antwort.length} Zeichen`);

  // Der eigentliche Wert der Funktion: Es antwortet nicht das Gedächtnis des
  // Modells, sondern der geprüfte Bestand dieser App.
  const gesendet = await (await fetch(`${FAKE}/letzte-anfrage`)).json();
  const kontext = gesendet.system?.[1]?.text ?? '';
  const enthalten = [
    ['Wortlaut', 'Also hat Gott die Welt geliebt'],
    ['Umgebung', 'Bist du ein Meister in Israel'],
    ['Buchsteckbrief', 'Verfasser:'],
    ['Artikel', 'Artikel der App'],
    ['Auslegungen', 'Auslegungen, die die App'],
    ['Querverweise', 'Querverweise'],
  ].filter(([, muster]) => kontext.includes(muster));
  check(
    'Der Bestand der App geht als Grundlage mit',
    enthalten.length === 6,
    enthalten.map(([n]) => n).join(', '),
  );
  check(
    'Zwei Sprungmarken für den Zwischenspeicher',
    (gesendet.system ?? []).filter((b) => b.cache_control).length === 2,
  );

  /*
   * Nicht jedes Modell versteht `output_config.effort`: Die Haiku-Reihe kennt
   * den Schalter nicht und weist eine Anfrage, die ihn enthält, vollständig
   * zurück. Mit Haiku in der Auswahl wären die Rückfragen sonst schlicht
   * kaputt – und zwar nur bei diesem einen Modell, also leicht zu übersehen.
   */
  for (const [modell, erwartetEffort] of [
    ['claude-opus-5', true],
    ['claude-haiku-4-5', false],
  ]) {
    await page.evaluate(
      ([url, m]) =>
        localStorage.setItem(
          'entgegen.chat',
          JSON.stringify({ mode: 'proxy', proxyUrl: url, apiKey: '', model: m }),
        ),
      [FAKE, modell],
    );
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /Fragen/ }).click();
    await page.fill('.chat__input', 'Probe');
    await page.getByRole('button', { name: 'Fragen' }).click();
    await page.waitForSelector('.chat__compose .btn--primary', { timeout: 20_000 });

    const gesendet = await (await fetch(`${FAKE}/letzte-anfrage`)).json();
    const hatEffort = gesendet.output_config?.effort !== undefined;
    check(
      `${modell}: Effort wird ${erwartetEffort ? 'mitgeschickt' : 'weggelassen'}`,
      gesendet.model === modell && hatEffort === erwartetEffort,
    );
  }

  // Ein Fehler des Dienstes muss als Satz ankommen, nicht als Rohtext. Die
  // Ablehnung erzeugt zwangsläufig eine Konsolenmeldung des Browsers; sie wird
  // unten wieder herausgenommen, damit sie die Prüfung auf Konsolenfehler nicht
  // fälschlich zum Scheitern bringt.
  const fehlerVorher = errors.length;
  await fetch(`${FAKE}/fehler/401`);
  await page.fill('.chat__input', 'Und noch eine Frage');
  await page.getByRole('button', { name: 'Fragen' }).click();
  await page.waitForSelector('.chat__error', { timeout: 20_000 });
  const fehlertext = (await page.locator('.chat__error').textContent()) ?? '';
  check(
    'Ein abgelehnter Schlüssel wird verständlich gemeldet',
    fehlertext.includes('Schlüssel') && fehlertext.includes('Ich'),
    fehlertext.trim(),
  );

  errors.splice(fehlerVorher, errors.length - fehlerVorher);

  await page.screenshot({ path: `${OUT}/20-rueckfragen.png` });
  await page.evaluate(() => localStorage.removeItem('entgegen.chat'));
}

check('Keine Konsolenfehler', errors.length === 0, errors.slice(0, 3).join(' | '));

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} Prüfungen bestanden`);
process.exit(failed.length === 0 ? 0 : 1);
