/**
 * Prüft den englischen Vergleichstext gegen den deutschen Grundtext.
 *
 * Ein Vergleich Vers für Vers steht und fällt damit, dass beide Ausgaben
 * dieselbe Stelle unter derselben Nummer führen. Gleiche Verszahlen beweisen
 * das noch nicht – zwei Ausgaben können in einem Kapitel gleich viele Verse
 * haben und die Grenzen trotzdem anders ziehen. Deshalb prüft dieses Skript
 * zweierlei:
 *
 *   1. Aufbau – gleiche Bücher, gleiche Kapitelzahl, gleiche Verszahl je
 *      Kapitel, keine leeren Verse. Das muss fehlerfrei sein.
 *   2. Verteilung – wie weit die Textmenge bis zu einem Vers in beiden
 *      Ausgaben auseinanderläuft. Das ist ein Hinweis, kein Beweis: Wo die
 *      Kurven auseinandergehen, sitzt entweder eine andere Versgrenze oder
 *      schlicht eine wortreichere Übersetzung. Die Liste ist als Wegweiser
 *      zum Nachsehen gedacht, nicht als Fehlerliste.
 *
 * Aufruf: node scripts/check-translations.mjs
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const GRUND = 'luther1912';
const VERGLEICH = 'kjv';

function lade(translation, file) {
  return JSON.parse(readFileSync(join(ROOT, 'public', 'bibel', translation, file), 'utf8'));
}

const grundIndex = lade(GRUND, 'index.json');
const vergleichIndex = lade(VERGLEICH, 'index.json');
const vergleichBuch = new Map(vergleichIndex.books.map((b) => [b.id, b]));

const fehler = [];
let kapitel = 0;
let verse = 0;
let leer = 0;

/** Anteil des Kapiteltextes, der bis einschließlich Vers i geschrieben ist. */
function verlauf(kapitelVerse) {
  const gesamt = kapitelVerse.reduce((n, v) => n + v.length, 0) || 1;
  let summe = 0;
  return kapitelVerse.map((v) => {
    summe += v.length;
    return summe / gesamt;
  });
}

const auffaellig = [];

for (const buch of grundIndex.books) {
  const gegen = vergleichBuch.get(buch.id);
  if (!gegen) {
    fehler.push(`${buch.name}: fehlt im Vergleichstext`);
    continue;
  }
  if (buch.chapters !== gegen.chapters) {
    fehler.push(`${buch.name}: ${buch.chapters} Kapitel gegen ${gegen.chapters}`);
    continue;
  }

  const a = lade(GRUND, `${buch.id}.json`).chapters;
  const b = lade(VERGLEICH, `${buch.id}.json`).chapters;

  for (let c = 0; c < a.length; c++) {
    kapitel++;
    verse += a[c].length;

    if (a[c].length !== b[c].length) {
      fehler.push(`${buch.abbr} ${c + 1}: ${a[c].length} Verse gegen ${b[c].length}`);
      continue;
    }

    for (let v = 0; v < b[c].length; v++) {
      if (b[c][v].trim() === '') {
        leer++;
        fehler.push(`${buch.abbr} ${c + 1},${v + 1}: Vers im Vergleichstext ist leer`);
      }
    }

    // Zu kurze Kapitel sagen über die Verteilung nichts Belastbares aus.
    if (a[c].length < 4) continue;
    const links = verlauf(a[c]);
    const rechts = verlauf(b[c]);
    let groesste = 0;
    let stelle = 1;
    for (let v = 0; v < links.length; v++) {
      const abstand = Math.abs(links[v] - rechts[v]);
      if (abstand > groesste) {
        groesste = abstand;
        stelle = v + 1;
      }
    }
    auffaellig.push({ ref: `${buch.abbr} ${c + 1}`, wert: groesste, vers: stelle });
  }
}

auffaellig.sort((x, y) => y.wert - x.wert);
const ueber = (grenze) => auffaellig.filter((a) => a.wert > grenze).length;

console.log(`Grundtext   : ${GRUND}`);
console.log(`Vergleich   : ${VERGLEICH}`);
console.log(`Bücher      : ${grundIndex.books.length} zu ${vergleichIndex.books.length}`);
console.log(`Kapitel     : ${kapitel}, Verse: ${verse}`);
console.log(`Aufbau      : ${fehler.length === 0 ? 'Kapitel und Verse decken sich ✓' : `${fehler.length} Abweichungen`}`);
console.log(`Leere Verse : ${leer}`);
console.log(
  `Verteilung  : ${ueber(0.1)} Kapitel über 10 %, ${ueber(0.06)} über 6 %, ${ueber(0.04)} über 4 %`,
);
console.log('\nAm weitesten auseinander (Hinweis, kein Fehler):');
for (const a of auffaellig.slice(0, 12)) {
  console.log(`  ${(a.wert * 100).toFixed(1).padStart(5)} %  ${a.ref}, Spitze bei Vers ${a.vers}`);
}
console.log(
  '\nDie Psalmen führen die Liste an, weil der deutsche Text die Überschrift\n' +
    'zum ersten Vers zählt und die englische Ausgabe sie darüber setzt. Im\n' +
    'Vers-Panel führen die Pfeile deshalb zum Nachbarvers.',
);

if (fehler.length > 0) {
  console.log(`\nAbweichungen im Aufbau (${fehler.length}):`);
  for (const f of fehler.slice(0, 20)) console.log(`  - ${f}`);
  if (fehler.length > 20) console.log(`  … und ${fehler.length - 20} weitere`);
  process.exit(1);
}
