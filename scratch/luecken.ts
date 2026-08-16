import { COMMENTARY } from '/home/user/Bible-study/src/content/commentary';
import { readFileSync } from 'node:fs';
const idx = JSON.parse(readFileSync('/home/user/Bible-study/public/bibel/luther1912/index.json', 'utf8'));
const rows = idx.books.map((b: any) => {
  const abgedeckt = COMMENTARY.filter((e) => e.book === b.id).reduce((n, e) => n + (e.to - e.from + 1), 0);
  const gesamt = b.verses.reduce((n: number, v: number) => n + v, 0);
  return { id: b.id, name: b.name, artikel: COMMENTARY.filter((e) => e.book === b.id).length, anteil: (abgedeckt / gesamt) * 100, gesamt };
});
rows.sort((a: any, b: any) => a.anteil - b.anteil);
for (const r of rows.slice(0, 26)) console.log(`${r.anteil.toFixed(1).padStart(5)} %  ${r.name.padEnd(20)} ${String(r.artikel).padStart(2)} Artikel, ${r.gesamt} Verse`);
