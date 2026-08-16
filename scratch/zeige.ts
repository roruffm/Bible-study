import { COMMENTARY } from '/home/user/Bible-study/src/content/commentary';
const keys = process.argv.slice(2);
for (const k of keys) {
  const [book, rest] = k.split(' ');
  const [ch, from] = rest.split(',').map(Number);
  const e = COMMENTARY.find((x) => x.book === book && x.chapter === ch && x.from === from);
  if (!e) { console.log('FEHLT', k); continue; }
  console.log(`\n########## ${k}  „${e.title}“  (V ${e.from}-${e.to})`);
  console.log('SHORT: ' + e.historicalShort);
  console.log('LONG:');
  (e.historicalLong ?? '').split(/\n\s*\n/).forEach((p, i) => console.log(`  [${i + 1}] ${p}`));
  console.log('RECEPTION:');
  (e.reception ?? '').split(/\n\s*\n/).forEach((p, i) => console.log(`  [${i + 1}] ${p}`));
  console.log('WORLD: ' + (e.world ?? []).map((w) => `${w.aspect}=${w.text}`).join('\n       '));
  console.log('TERMS: ' + (e.terms ?? []).map((t) => `${t.word} [${t.rendered ?? '-'}] ${t.note}`).join('\n       '));
  console.log('INTERP: ' + e.interpretations.map((i) => `${i.tradition}: ${i.text}`).join('\n        '));
  console.log('XREF: ' + (e.crossRefs ?? []).map((x) => `${x.book} ${x.chapter},${x.verse}`).join(' | '));
}
