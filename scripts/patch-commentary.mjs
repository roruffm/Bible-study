/**
 * Trägt Erweiterungen in `src/content/commentary.ts` ein.
 *
 * Die Artikel sind über die Zeit gewachsen; sie nachträglich von Hand zu
 * vertiefen heißt, in einer halben Million Zeichen an der richtigen Stelle
 * einzusetzen. Dieses Skript nimmt eine Tabelle von Ergänzungen entgegen und
 * setzt sie sortiert an die passende Stelle jedes Artikels – gleiche
 * Formatierung, gleiche Reihenfolge der Felder, kein Handverlesen.
 *
 * Aufruf: node scripts/patch-commentary.mjs <datei-mit-ergaenzungen.mjs>
 *
 * Die Datei exportiert `PATCHES` als Objekt, dessen Schlüssel „<buch> <kap>,<von>“
 * lauten – dieselbe Form wie die Schlüssel der Datierungen:
 *
 *   export const PATCHES = {
 *     '1mo 1,1': {
 *       longAdd: 'Ein weiterer Absatz …',      // wird als Absatz angehängt
 *       longPara: { 2: 'Ersetzt Absatz zwei' },
 *       world: [{ aspect: 'macht', text: '…' }],
 *       terms: [{ word: 'hebr. bara', rendered: 'schuf', note: '…' }],
 *       reception: 'Was der Text bewirkt hat …',
 *       interpretations: [{ tradition: '…', text: '…' }],
 *     },
 *   };
 *
 * `world`, `terms` und `reception` legen das jeweilige Feld neu an und
 * verweigern die Arbeit, wenn es schon da ist. Zum **Anhängen** an ein
 * vorhandenes Feld dienen `worldAdd`, `termsAdd`, `receptionAdd` und
 * `crossRefsAdd`; letzteres legt die Liste an, falls der Artikel noch keine
 * Querverweise hat.
 *
 * Das Skript prüft nichts inhaltlich – dafür ist `check-references.mjs` da.
 * Es prüft nur, dass jeder Schlüssel genau einen Artikel trifft und dass kein
 * Feld doppelt gesetzt wird.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(ROOT, 'src', 'content', 'commentary.ts');

const patchFile = process.argv[2];
if (!patchFile) {
  console.error('Aufruf: node scripts/patch-commentary.mjs <ergaenzungen.mjs>');
  process.exit(2);
}
const { PATCHES } = await import(resolve(patchFile));

let lines = readFileSync(FILE, 'utf8').split('\n');

/** Text in ein einzeiliges TypeScript-Literal übersetzen. */
function lit(text) {
  return `'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
}

/** Die Umkehrung: aus dem Literal im Quelltext wieder Text machen. */
function unlit(quelltext) {
  return quelltext.replace(/\\(.)/g, (_, c) => (c === 'n' ? '\n' : c));
}

/**
 * Grenzen aller Artikel: von der Zeile mit `book:` bis zur Zeile davor beim
 * nächsten Artikel. Reicht, weil alle Artikel gleich formatiert sind.
 */
function scanEntries() {
  const entries = [];
  for (let i = 0; i < lines.length; i++) {
    const m = /^    book: '([^']+)',$/.exec(lines[i]);
    if (!m) continue;
    const chapter = /^    chapter: (\d+),$/.exec(lines[i + 1]);
    const from = /^    from: (\d+),$/.exec(lines[i + 2]);
    if (!chapter || !from) throw new Error(`Unerwarteter Aufbau in Zeile ${i + 1}`);
    entries.push({ key: `${m[1]} ${chapter[1]},${from[1]}`, start: i });
  }
  for (let i = 0; i < entries.length; i++) {
    entries[i].end = (entries[i + 1]?.start ?? lines.length) - 1;
  }
  return entries;
}

/** Zeile innerhalb eines Artikels finden. */
function findLine(entry, regex) {
  for (let i = entry.start; i <= entry.end; i++) {
    if (regex.test(lines[i])) return i;
  }
  return -1;
}

/**
 * Hängt Zeilen an eine bestehende Liste an – unmittelbar vor deren schließende
 * Klammer. Gibt zurück, ob die Liste überhaupt gefunden wurde.
 */
function appendToList(entry, kopf, block) {
  const open = findLine(entry, kopf);
  if (open < 0) return false;
  let close = -1;
  for (let i = open + 1; i <= entry.end; i++) {
    if (lines[i] === '    ],') {
      close = i;
      break;
    }
  }
  if (close < 0) throw new Error(`${entry.key}: Ende der Liste ${kopf} nicht gefunden`);
  lines.splice(close, 0, ...block);
  entry.end += block.length;
  return true;
}

const keys = Object.keys(PATCHES);
let stats = { long: 0, terms: 0, reception: 0, interp: 0, world: 0, xref: 0 };

// Von hinten nach vorn, damit eingefügte Zeilen die noch offenen Positionen
// nicht verschieben.
const entries = scanEntries();
const seen = new Set();
for (const key of keys) {
  const treffer = entries.filter((e) => e.key === key);
  if (treffer.length !== 1) {
    throw new Error(`Schlüssel "${key}" trifft ${treffer.length} Artikel`);
  }
  if (seen.has(key)) throw new Error(`Schlüssel "${key}" doppelt`);
  seen.add(key);
}

for (const entry of [...entries].reverse()) {
  const patch = PATCHES[entry.key];
  if (!patch) continue;

  /*
   * Von hinten nach vorn durch den Artikel: Querverweise stehen als letztes
   * Feld, deshalb werden sie zuerst angefasst. So bleiben alle noch nicht
   * benutzten Zeilennummern gültig.
   */
  if (patch.crossRefsAdd?.length) {
    const block = patch.crossRefsAdd.map((x) => {
      const note = x.note ? `, note: ${lit(x.note)}` : '';
      return `      { book: ${lit(x.book)}, chapter: ${x.chapter}, verse: ${x.verse}${note} },`;
    });

    /*
     * Ein Teil der Artikel führt die Querverweise einzeilig – `crossRefs: [{ … }],`.
     * Ohne diesen Schritt fände `appendToList` die Liste nicht und legte eine
     * zweite daneben an; TypeScript bricht dann mit doppeltem Feld ab.
     */
    const einzeilig = findLine(entry, /^    crossRefs: \[\{.*\],$/);
    if (einzeilig >= 0) {
      const inhalt = lines[einzeilig].slice('    crossRefs: ['.length, -2).trim();
      lines.splice(einzeilig, 1, '    crossRefs: [', `      ${inhalt},`, '    ],');
      entry.end += 2;
    }

    if (!appendToList(entry, /^    crossRefs: \[$/, block)) {
      // Noch keine Querverweise: die Liste hinter den Auslegungen anlegen.
      const open = findLine(entry, /^    interpretations: \[$/);
      if (open < 0) throw new Error(`${entry.key}: interpretations nicht gefunden`);
      let close = -1;
      for (let i = open + 1; i <= entry.end; i++) {
        if (lines[i] === '    ],') {
          close = i;
          break;
        }
      }
      if (close < 0) throw new Error(`${entry.key}: Ende von interpretations nicht gefunden`);
      const neu = ['    crossRefs: [', ...block, '    ],'];
      lines.splice(close + 1, 0, ...neu);
      entry.end += neu.length;
    }
    stats.xref += patch.crossRefsAdd.length;
  }

  /* --- zusätzliche Auslegungen: vor die schließende Klammer der Liste --- */
  if (patch.interpretations?.length) {
    const open = findLine(entry, /^    interpretations: \[$/);
    if (open < 0) throw new Error(`${entry.key}: interpretations nicht gefunden`);
    let close = -1;
    for (let i = open + 1; i <= entry.end; i++) {
      if (lines[i] === '    ],') {
        close = i;
        break;
      }
    }
    if (close < 0) throw new Error(`${entry.key}: Ende von interpretations nicht gefunden`);
    const block = patch.interpretations.flatMap((i) => [
      '      {',
      `        tradition: ${lit(i.tradition)},`,
      `        text: ${lit(i.text)},`,
      '      },',
    ]);
    lines.splice(close, 0, ...block);
    stats.interp += patch.interpretations.length;
  }

  /* --- an vorhandene Listen anhängen, weiter von hinten nach vorn --- */
  if (patch.termsAdd?.length) {
    const block = patch.termsAdd.flatMap((t) => [
      '      {',
      `        word: ${lit(t.word)},`,
      ...(t.rendered ? [`        rendered: ${lit(t.rendered)},`] : []),
      `        note: ${lit(t.note)},`,
      '      },',
    ]);
    if (!appendToList(entry, /^    terms: \[$/, block)) {
      throw new Error(`${entry.key}: terms gibt es noch nicht – "terms" statt "termsAdd" benutzen`);
    }
    stats.terms += patch.termsAdd.length;
  }

  if (patch.worldAdd?.length) {
    const block = patch.worldAdd.flatMap((w) => [
      '      {',
      `        aspect: ${lit(w.aspect)},`,
      `        text: ${lit(w.text)},`,
      '      },',
    ]);
    if (!appendToList(entry, /^    world: \[$/, block)) {
      throw new Error(`${entry.key}: world gibt es noch nicht – "world" statt "worldAdd" benutzen`);
    }
    stats.world += patch.worldAdd.length;
  }

  if (patch.receptionAdd) {
    const zeile = findLine(entry, /^    reception:$/);
    if (zeile < 0) throw new Error(`${entry.key}: reception gibt es noch nicht`);
    const wertZeile = lines[zeile + 1];
    if (!/^      '.*',$/.test(wertZeile)) throw new Error(`${entry.key}: reception ist mehrzeilig`);
    const alt = unlit(wertZeile.slice(7, -2));
    lines[zeile + 1] = `      ${lit(`${alt}\n\n${patch.receptionAdd}`)},`;
    stats.reception++;
  }

  /* --- Urtext und Wirkungsgeschichte: hinter den ausführlichen Teil --- */
  const longLine = findLine(entry, /^    historicalLong:$/);
  if (longLine < 0) throw new Error(`${entry.key}: historicalLong nicht gefunden`);
  const wert = lines[longLine + 1];
  if (!/^      '.*',$/.test(wert)) throw new Error(`${entry.key}: historicalLong ist mehrzeilig`);

  const nach = [];
  if (patch.reception) {
    if (findLine(entry, /^    reception:/) >= 0) throw new Error(`${entry.key}: reception gibt es schon`);
    nach.push('    reception:', `      ${lit(patch.reception)},`);
    stats.reception++;
  }
  if (patch.terms?.length) {
    if (findLine(entry, /^    terms:/) >= 0) throw new Error(`${entry.key}: terms gibt es schon`);
    nach.push('    terms: [');
    for (const t of patch.terms) {
      nach.push('      {');
      nach.push(`        word: ${lit(t.word)},`);
      if (t.rendered) nach.push(`        rendered: ${lit(t.rendered)},`);
      nach.push(`        note: ${lit(t.note)},`);
      nach.push('      },');
    }
    nach.push('    ],');
    stats.terms += patch.terms.length;
  }
  if (nach.length) {
    lines.splice(longLine + 2, 0, ...nach);
    entry.end += nach.length;
  }

  /*
   * Die Welt des Textes gehört laut Schnittstelle zwischen `reception` und
   * `terms`. Beide gibt es inzwischen in jedem Artikel, deshalb wird der Block
   * vor der bestehenden `terms`-Liste eingesetzt statt hinter dem
   * ausführlichen Teil – sonst stünde er vor der Wirkungsgeschichte.
   */
  if (patch.world?.length) {
    if (findLine(entry, /^    world: \[$/) >= 0) throw new Error(`${entry.key}: world gibt es schon`);
    const block = ['    world: ['];
    for (const w of patch.world) {
      block.push('      {', `        aspect: ${lit(w.aspect)},`, `        text: ${lit(w.text)},`, '      },');
    }
    block.push('    ],');

    const ziel =
      findLine(entry, /^    terms: \[$/) >= 0
        ? findLine(entry, /^    terms: \[$/)
        : findLine(entry, /^    interpretations: \[$/);
    if (ziel < 0) throw new Error(`${entry.key}: keine Stelle für world gefunden`);
    lines.splice(ziel, 0, ...block);
    stats.world += patch.world.length;
  }

  /* --- Absätze im ausführlichen Teil --- */
  if (patch.longAdd || patch.longPara) {
    const alt = unlit(wert.slice(7, -2)); // führendes ' und abschließendes ',
    const absaetze = alt.split('\n\n');
    if (patch.longAdd) absaetze.push(patch.longAdd);
    // Einen bestimmten Absatz ersetzen, gezählt ab 1. Gebraucht, wenn ein
    // nachgetragener Absatz doch wiederholt, was schon oben steht.
    for (const [nr, text] of Object.entries(patch.longPara ?? {})) {
      const i = Number(nr) - 1;
      if (!absaetze[i]) throw new Error(`${entry.key}: Absatz ${nr} gibt es nicht`);
      absaetze[i] = text;
    }
    lines[longLine + 1] = `      ${lit(absaetze.join('\n\n'))},`;
    stats.long++;
  }
}

writeFileSync(FILE, lines.join('\n'));
console.log(
  `Ergänzt: ${keys.length} Artikel – ${stats.long} Absätze, ${stats.world} Notizen zur Welt, ` +
    `${stats.terms} Urtext-Wörter, ${stats.reception} Wirkungsgeschichten, ` +
    `${stats.interp} Auslegungen, ${stats.xref} Querverweise`,
);
