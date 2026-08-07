/**
 * Holt den Wortlaut der King-James-Bibel aus demselben Rohdatenbestand, aus
 * dem auch der Luthertext stammt (wldeh/bible-api), und legt ihn in der
 * Struktur ab, die `build-bible-data.mjs` erwartet.
 *
 * Dass beide Übersetzungen aus einer Quelle kommen, ist der eigentliche Grund
 * für diesen Umweg: Die Kapitel- und Versgrenzen sind dort für alle Sprachen
 * nach der international üblichen Zählung angelegt. Ein Vers behält damit in
 * beiden Fassungen dieselbe Nummer – ohne das wäre ein Vergleich Vers für Vers
 * nicht möglich.
 *
 * Aufruf:
 *   node scripts/fetch-kjv.mjs [zielverzeichnis]
 *
 * Danach:
 *   node scripts/build-bible-data.mjs <zielverzeichnis> kjv
 *
 * Die Zahl der Kapitel je Buch wird dem bereits gebauten Luther-Index
 * entnommen; heruntergeladen wird also genau das, was die App auch anzeigt.
 */

import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BOOKS } from './books.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://raw.githubusercontent.com/wldeh/bible-api/main/bibles/en-kjv/books';

const targetDir = process.argv[2] ?? join(ROOT, '.rohdaten', 'en-kjv');
const indexFile = join(ROOT, 'public', 'bibel', 'luther1912', 'index.json');

if (!existsSync(indexFile)) {
  console.error(`Luther-Index fehlt (${indexFile}). Erst den deutschen Text bauen.`);
  process.exit(1);
}
const luther = JSON.parse(readFileSync(indexFile, 'utf8'));
const chapterCount = new Map(luther.books.map((b) => [b.id, b.chapters]));

/** Verzeichnisname im englischen Bestand, je Buch-Kennung der App. */
const SOURCE_EN = new Map(BOOKS.map(([id, , , , , sourceEn]) => [id, sourceEn]));

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
for (const [id, name] of BOOKS) {
  const source = SOURCE_EN.get(id);
  const chapters = chapterCount.get(id);
  if (!source) {
    console.error(`Buch "${name}": kein englischer Quellname hinterlegt.`);
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
    const data = await fetchChapter(`${BASE}/${job.source}/chapters/${job.chapter}.json`);
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
console.log(`Ziel        : ${targetDir}`);
console.log(`Kapitel     : ${done} / ${jobs.length}`);
console.log(`Verse       : ${verses}`);

if (problems.length > 0) {
  console.log(`\nFehlgeschlagen (${problems.length}):`);
  for (const p of problems.slice(0, 20)) console.log(`  - ${p}`);
  if (problems.length > 20) console.log(`  … und ${problems.length - 20} weitere`);
  process.exit(1);
}
