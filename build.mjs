// [NFR-01] Unisce sorgenti e three.js in un unico file HTML offline: fabbrica-dati.html
// [REQ-CFG-01] CONFIG e PROFILE restano due blocchi leggibili in cima al file.
import { build } from 'esbuild';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const safe = (js) => js.replace(/<\/script/gi, '<\\/script');
const out = await build({
  entryPoints: ['src/main.js'], bundle: true, minify: true, format: 'iife',
  write: false, target: 'es2020', legalComments: 'none',
});
const page = (profile) => readFileSync('src/index.html', 'utf8')
  .replace('/*@CONFIG*/', () => safe(readFileSync('src/config.js', 'utf8')))
  .replace('/*@PROFILE*/', () => safe(readFileSync(profile, 'utf8')))
  .replace('/*@BUNDLE*/', () => safe(out.outputFiles[0].text));
const html = page('src/profile.js');
writeFileSync('fabbrica-dati.html', html);
console.log(`fabbrica-dati.html: ${(html.length / 1024).toFixed(0)} KB`);
// [REQ-CFG-07] Il profilo reale dell'azienda resta in locale: src/profile.local.js non entra nel repository,
// e produce fabbrica-dati.locale.html (anch'esso escluso), da usare al meeting.
writeFileSync('tests/esempio.html', page('src/profile.esempio.js'));   // profilo di esempio, per la prova automatica [REQ-CFG-03]
if (existsSync('src/profile.local.js')) {
  writeFileSync('fabbrica-dati.locale.html', page('src/profile.local.js'));
  console.log('fabbrica-dati.locale.html: versione con il profilo aziendale (non pubblicata)');
}
