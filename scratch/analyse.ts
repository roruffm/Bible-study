import { COMMENTARY } from '/home/user/Bible-study/src/content/commentary';

const rows = COMMENTARY.map((e) => {
  const paras = (t?: string) => (t ? t.split(/\n\s*\n/).filter((x) => x.trim()).length : 0);
  const chars =
    (e.historicalShort?.length ?? 0) +
    (e.historicalLong?.length ?? 0) +
    (e.reception?.length ?? 0) +
    (e.world?.reduce((n, w) => n + w.text.length, 0) ?? 0) +
    (e.terms?.reduce((n, t) => n + t.note.length, 0) ?? 0) +
    (e.interpretations?.reduce((n, i) => n + i.text.length, 0) ?? 0);
  return {
    ref: `${e.book} ${e.chapter},${e.from}-${e.to}`,
    title: e.title,
    chars,
    longP: paras(e.historicalLong),
    recP: paras(e.reception),
    world: e.world?.length ?? 0,
    terms: e.terms?.length ?? 0,
    interp: e.interpretations.length,
    xref: e.crossRefs?.length ?? 0,
  };
});
rows.sort((a, b) => a.chars - b.chars);
console.log('Artikel:', rows.length);
console.log('Langtext-Absätze: ' + [1, 2, 3, 4, 5].map((n) => `${n}:${rows.filter((r) => r.longP === n).length}`).join('  ') + `  >5:${rows.filter((r) => r.longP > 5).length}`);
console.log('Auslegungen:      ' + [3, 4, 5, 6].map((n) => `${n}:${rows.filter((r) => r.interp === n).length}`).join('  '));
console.log('Weltnotizen:      ' + [1, 2, 3, 4].map((n) => `${n}:${rows.filter((r) => r.world === n).length}`).join('  '));
console.log('Urtext-Wörter:    ' + [1, 2, 3, 4].map((n) => `${n}:${rows.filter((r) => r.terms === n).length}`).join('  '));
console.log('ohne Querverweise:', rows.filter((r) => r.xref === 0).length);
console.log('\n60 dünnste Artikel:');
for (const r of rows.slice(0, 60)) {
  console.log(
    String(r.chars).padStart(5),
    r.ref.padEnd(15),
    `P${r.longP} R${r.recP} W${r.world} U${r.terms} A${r.interp} X${r.xref}`,
    r.title.slice(0, 40),
  );
}
