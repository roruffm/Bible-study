import { COMMENTARY } from '/home/user/Bible-study/src/content/commentary';
import { readFileSync } from 'node:fs';
const idx = JSON.parse(readFileSync('/home/user/Bible-study/public/bibel/luther1912/index.json', 'utf8'));
const nt = idx.books.filter((b: any) => b.testament === 'NT');
const paras = (t?: string) => (t ? t.split(/\n\s*\n/).filter((x) => x.trim()).length : 0);

console.log('=== Abdeckung im Neuen Testament');
let vGes = 0, vAbg = 0, art = 0;
for (const b of nt) {
  const eintraege = COMMENTARY.filter((e) => e.book === b.id);
  const abgedeckt = eintraege.reduce((n, e) => n + (e.to - e.from + 1), 0);
  const gesamt = b.verses.reduce((n: number, v: number) => n + v, 0);
  vGes += gesamt; vAbg += abgedeckt; art += eintraege.length;
  console.log(`${((abgedeckt / gesamt) * 100).toFixed(1).padStart(5)} %  ${b.name.padEnd(20)} ${String(eintraege.length).padStart(2)} Artikel, ${abgedeckt}/${gesamt} Verse`);
}
console.log(`\nGesamt NT: ${art} Artikel, ${vAbg}/${vGes} Verse = ${((vAbg / vGes) * 100).toFixed(1)} %`);

const ntArt = COMMENTARY.filter((e) => nt.some((b: any) => b.id === e.book));
const duenn = ntArt
  .map((e) => ({
    ref: `${e.book} ${e.chapter},${e.from}`,
    titel: e.title,
    p: paras(e.historicalLong),
    w: e.world?.length ?? 0,
    u: e.terms?.length ?? 0,
    a: e.interpretations.length,
    x: e.crossRefs?.length ?? 0,
    chars: (e.historicalLong?.length ?? 0) + (e.reception?.length ?? 0),
  }))
  .sort((a, b) => a.chars - b.chars);
console.log(`\n=== ${duenn.filter((d) => d.p <= 1).length} von ${ntArt.length} NT-Artikeln haben nur einen Absatz im Langtext`);
console.log('Die 40 dünnsten:');
for (const d of duenn.slice(0, 40))
  console.log(`${String(d.chars).padStart(5)}  ${d.ref.padEnd(13)} P${d.p} W${d.w} U${d.u} A${d.a} X${d.x}  ${d.titel.slice(0, 42)}`);
