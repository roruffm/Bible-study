import { readFileSync } from 'node:fs';
for (const r of process.argv.slice(2)) {
  const [book, rest] = r.split(' ');
  const [ch, range] = rest.split(',');
  const [from, to] = range.split('-').map(Number);
  const d = JSON.parse(readFileSync(`public/bibel/luther1912/${book}.json`, 'utf8'));
  const vs = d.chapters[Number(ch) - 1];
  console.log(`=== ${book} ${ch},${from}-${to}`);
  for (let v = from; v <= Math.min(to, vs.length); v++) console.log(`${v}. ${vs[v-1]}`);
}
