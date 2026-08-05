import { buildSync } from 'esbuild';
import { writeFileSync } from 'node:fs';
const S='/tmp/claude-0/-home-user-Bible-study/79897e6e-52ac-59d0-8a5d-0477c3521d0e/scratchpad/c5.mjs';
writeFileSync(S, buildSync({ entryPoints: ['src/content/commentary.ts'], bundle: true, write: false, format: 'esm', platform: 'node' }).outputFiles[0].text);
const { COMMENTARY } = await import(S + '?x=' + Date.now());
const ohne = COMMENTARY.filter(e => !e.reception);
console.log('ohne Vertiefung:', ohne.length, '| davon mit 3 Auslegungen:', ohne.filter(e=>e.interpretations.length<4).length);
console.log(ohne.map(e=>`${e.book} ${e.chapter},${e.from}`).join(' '));
