// [NFR-01] Unisce sorgenti e three.js in un unico file HTML offline: fabbrica-dati.html
// [REQ-CFG-01] CONFIG e PROFILE restano due blocchi leggibili in cima al file.
import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';

const safe = (js) => js.replace(/<\/script/gi, '<\\/script');
const out = await build({
  entryPoints: ['src/main.js'], bundle: true, minify: true, format: 'iife',
  write: false, target: 'es2020', legalComments: 'none',
});
const html = readFileSync('src/index.html', 'utf8')
  .replace('/*@CONFIG*/', () => safe(readFileSync('src/config.js', 'utf8')))
  .replace('/*@PROFILE*/', () => safe(readFileSync('src/profile.js', 'utf8')))
  .replace('/*@BUNDLE*/', () => safe(out.outputFiles[0].text));
writeFileSync('fabbrica-dati.html', html);
console.log(`fabbrica-dati.html: ${(html.length / 1024).toFixed(0)} KB`);
