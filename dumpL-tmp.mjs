import { buildSync } from 'esbuild';
import { writeFileSync } from 'node:fs';
const S='/tmp/claude-0/-home-user-Bible-study/79897e6e-52ac-59d0-8a5d-0477c3521d0e/scratchpad/c4.mjs';
writeFileSync(S, buildSync({ entryPoints: ['src/content/commentary.ts'], bundle: true, write: false, format: 'esm', platform: 'node' }).outputFiles[0].text);
const { COMMENTARY } = await import(S + '?x=' + Date.now());
const want = new Set(process.argv.slice(2));
let out = '';
for (const e of COMMENTARY) {
  const key = `${e.book} ${e.chapter},${e.from}`;
  if (!want.has(key)) continue;
  out += `##### ${key} — ${e.title}\n[K] ${e.historicalShort}\n[L] ${e.historicalLong}\n[T] ${e.interpretations.map(i=>i.tradition).join(' / ')}\n\n`;
}
writeFileSync('/tmp/claude-0/-home-user-Bible-study/79897e6e-52ac-59d0-8a5d-0477c3521d0e/scratchpad/L.txt', out);
console.log('geschrieben', out.length);
