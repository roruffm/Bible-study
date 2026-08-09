/**
 * Holt eine Übersetzung aus demselben Rohdatenbestand, aus dem auch der
 * Luthertext stammt (wldeh/bible-api), und legt sie in der Struktur ab, die
 * `build-bible-data.mjs` erwartet.
 *
 * Dass alle Fassungen aus einer Quelle kommen, ist der eigentliche Grund für
 * diesen Umweg: Ein Vers behält dort über die Sprachen hinweg dieselbe Nummer.
 * Ohne das wäre ein Vergleich Vers für Vers nicht möglich – geprüft wird es
 * anschließend mit `check-translations.mjs`.
 *
 * Aufruf:
 *   node scripts/fetch-translation.mjs <quell-id> [zielverzeichnis]
 *
 * Bekannte Quell-Kennungen stehen in QUELLEN. Danach:
 *   node scripts/build-bible-data.mjs <zielverzeichnis> <app-id>
 *
 * Die Zahl der Kapitel je Buch wird dem bereits gebauten Luther-Index
 * entnommen; heruntergeladen wird also genau das, was die App auch anzeigt.
 */

import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BOOKS } from './books.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://raw.githubusercontent.com/wldeh/bible-api/main/bibles';

/**
 * Quell-Kennung → Kennung in der App und Spalte der Buchliste, die den
 * Verzeichnisnamen liefert. Die Quelle benennt ihre Verzeichnisse in der
 * Sprache der Übersetzung: „1.mose“ im deutschen Bestand, „genesis“ im
 * englischen.
 */
const QUELLEN = {
  'en-kjv': { app: 'kjv', spalte: 5 },
  'de-elo': { app: 'elb1905', spalte: 4 },
  'de-luther1912': { app: 'luther1912', spalte: 4 },
};

const quellId = process.argv[2];
if (!quellId || !QUELLEN[quellId]) {
  console.error(
    'Aufruf: node scripts/fetch-translation.mjs <quell-id> [ziel]\n' +
      `Bekannt: ${Object.keys(QUELLEN).join(', ')}`,
  );
  process.exit(2);
}
const quelle = QUELLEN[quellId];

const targetDir = process.argv[3] ?? join(ROOT, '.rohdaten', quellId);
const indexFile = join(ROOT, 'public', 'bibel', 'luther1912', 'index.json');

if (!existsSync(indexFile)) {
  console.error(`Luther-Index fehlt (${indexFile}). Erst den deutschen Grundtext bauen.`);
  process.exit(1);
}
const luther = JSON.parse(readFileSync(indexFile, 'utf8'));
const chapterCount = new Map(luther.books.map((b) => [b.id, b.chapters]));

/** Ein Kapitel holen, mit ein paar Wiederholungen bei Netzfehlern. */
async function fetchChapter(url, attempts = 4) {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (attempt >= attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** (attempt - 1)));
    }
  }
}

/** Aufgaben blockweise abarbeiten, damit nicht 1189 Anfragen gleichzeitig laufen. */
async function inBatches(items, size, worker) {
  for (let i = 0; i < items.length; i += size) {
    await Promise.all(items.slice(i, i + size).map(worker));
  }
}

const jobs = [];
for (const book of BOOKS) {
  const [id, name] = book;
  const source = book[quelle.spalte];
  const chapters = chapterCount.get(id);
  if (!source) {
    console.error(`Buch "${name}": kein Quellname in Spalte ${quelle.spalte} hinterlegt.`);
    process.exit(1);
  }
  if (!chapters) {
    console.error(`Buch "${name}": steht nicht im Luther-Index.`);
    process.exit(1);
  }
  for (let chapter = 1; chapter <= chapters; chapter++) {
    jobs.push({ id, name, source, chapter });
  }
}

const problems = [];
let done = 0;
let verses = 0;

await inBatches(jobs, 12, async (job) => {
  const dir = join(targetDir, 'books', job.source, 'chapters');
  const file = join(dir, `${job.chapter}.json`);

  // Bereits geholte Kapitel überspringen – so lässt sich ein abgebrochener
  // Lauf fortsetzen, ohne alles noch einmal zu übertragen.
  if (existsSync(file)) {
    try {
      verses += JSON.parse(readFileSync(file, 'utf8')).data.length;
      done++;
      return;
    } catch {
      // Kaputte Datei: neu holen.
    }
  }

  try {
    const url = `${BASE}/${quellId}/books/${encodeURIComponent(job.source)}/chapters/${job.chapter}.json`;
    const data = await fetchChapter(url);
    const rows = data.data ?? [];
    if (rows.length === 0) throw new Error('keine Verse');
    mkdirSync(dir, { recursive: true });
    writeFileSync(file, JSON.stringify(data));
    verses += rows.length;
    done++;
  } catch (error) {
    problems.push(`${job.name} ${job.chapter}: ${error.message}`);
  }

  if (done % 200 === 0) process.stdout.write(`\r${done} / ${jobs.length} Kapitel`);
});

process.stdout.write('\r');
console.log(`Quelle      : ${quellId}`);
console.log(`Ziel        : ${targetDir}`);
console.log(`App-Kennung : ${quelle.app}`);
console.log(`Kapitel     : ${done} / ${jobs.length}`);
console.log(`Verse       : ${verses}`);
console.log(`\nWeiter mit  : node scripts/build-bible-data.mjs ${targetDir} ${quelle.app}`);

if (problems.length > 0) {
  console.log(`\nFehlgeschlagen (${problems.length}):`);
  for (const p of problems.slice(0, 20)) console.log(`  - ${p}`);
  if (problems.length > 20) console.log(`  … und ${problems.length - 20} weitere`);
  process.exit(1);
}
