import { COMMENTARY } from '/home/user/Bible-study/src/content/commentary';
for (const k of process.argv.slice(2)) {
  const [book, rest] = k.split(' ');
  const [ch, from] = rest.split(',').map(Number);
  const e = COMMENTARY.find((x) => x.book === book && x.chapter === ch && x.from === from);
  if (!e) { console.log('FEHLT', k); continue; }
  console.log(`\n### ${k} (V ${e.from}-${e.to}) „${e.title}“`);
  console.log('LANG: ' + (e.historicalLong ?? '').replace(/\n\s*\n/g, ' ¶ '));
  console.log('WIRK: ' + (e.reception ?? '').replace(/\n\s*\n/g, ' ¶ ').slice(0, 400));
  console.log('WELT: ' + (e.world ?? []).map((w) => `[${w.aspect}] ${w.text.slice(0, 110)}`).join('  '));
  console.log('URTX: ' + (e.terms ?? []).map((t) => `${t.word}=${t.rendered ?? '-'}`).join(' | '));
  console.log('TRAD: ' + e.interpretations.map((i) => i.tradition).join(' | '));
  console.log('XREF: ' + (e.crossRefs ?? []).map((x) => `${x.book} ${x.chapter},${x.verse}`).join(' | '));
}
