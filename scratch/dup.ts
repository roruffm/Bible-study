import { COMMENTARY } from '/home/user/Bible-study/src/content/commentary';
function loose(s: string) {
  return s.toLowerCase().replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
    .replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
}
for (const k of process.argv.slice(2)) {
  const [book, rest] = k.split(' ');
  const [ch, from] = rest.split(',').map(Number);
  const e = COMMENTARY.find((x) => x.book === book && x.chapter === ch && x.from === from)!;
  const stuecke: [string, string][] = [];
  stuecke.push(['short', e.historicalShort]);
  (e.historicalLong ?? '').split(/\n\s*\n/).forEach((p, i) => stuecke.push([`long${i + 1}`, p]));
  (e.reception ?? '').split(/\n\s*\n/).forEach((p, i) => stuecke.push([`rec${i + 1}`, p]));
  (e.world ?? []).forEach((w, i) => stuecke.push([`world${i + 1}(${w.aspect})`, w.text]));
  for (let a = 0; a < stuecke.length; a++)
    for (let b = a + 1; b < stuecke.length; b++) {
      const wa = loose(stuecke[a][1]).split(' ');
      const setA = new Set<string>();
      for (let i = 0; i + 8 <= wa.length; i++) setA.add(wa.slice(i, i + 8).join(' '));
      const wb = loose(stuecke[b][1]).split(' ');
      for (let i = 0; i + 8 <= wb.length; i++) {
        const s = wb.slice(i, i + 8).join(' ');
        if (setA.has(s)) { console.log(`${k}: ${stuecke[a][0]} <-> ${stuecke[b][0]}  „${s}“`); i = wb.length; }
      }
    }
}
