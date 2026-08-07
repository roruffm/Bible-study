import { buildSync } from 'esbuild';
import { writeFileSync } from 'node:fs';
const S='/tmp/claude-0/-home-user-Bible-study/79897e6e-52ac-59d0-8a5d-0477c3521d0e/scratchpad/c9.mjs';
writeFileSync(S, buildSync({ entryPoints:['src/content/commentary.ts'], bundle:true, write:false, format:'esm', platform:'node' }).outputFiles[0].text);
const { COMMENTARY } = await import(S+'?x='+Date.now());
const o = COMMENTARY.filter(e=>!e.world?.length);
console.log(o.length);
console.log(o.map(e=>`${e.book} ${e.chapter},${e.from}`).join(' '));
