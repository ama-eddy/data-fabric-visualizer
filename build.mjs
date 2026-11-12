// [NFR-01] Unisce sorgenti e three.js in un unico file HTML offline: fabbrica-dati.html
// [REQ-CFG-01] CONFIG e PROFILE restano due blocchi leggibili in cima al file.
import { build } from 'esbuild';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { caricaConfig, estraiTesti, leggiTesti, controllaLessico } from './tools/testi.mjs';

/* ===== [REQ-CFG-08, REQ-LIT-03] TESTI.md è la fonte unica dei testi: completo, senza chiavi sbagliate, nel lessico ===== */
const attesi = new Map(estraiTesti(caricaConfig())), testi = leggiTesti(readFileSync('TESTI.md', 'utf8'));
const problemi = [
  ...[...attesi.keys()].filter((k) => !testi.has(k)).map((k) => `manca in TESTI.md: ${k} (npm run testi lo aggiunge)`),
  ...[...testi.keys()].filter((k) => !attesi.has(k)).map((k) => `chiave sconosciuta in TESTI.md: ${k}`),
  ...[...testi].filter(([, t]) => !t).map(([k]) => `testo vuoto in TESTI.md: ${k}`),
  ...controllaLessico(testi).map((e) => `lessico (REQUISITI §1.2) — ${e}`),
];
if (problemi.length) { console.error('TESTI.md da correggere:\n- ' + problemi.join('\n- ')); process.exit(1); }
const TESTI = 'window.TESTI = ' + JSON.stringify(Object.fromEntries(testi)) + ';';

const safe = (js) => js.replace(/<\/script/gi, '<\\/script');
const out = await build({
  entryPoints: ['src/main.js'], bundle: true, minify: true, format: 'iife',
  write: false, target: 'es2020', legalComments: 'none',
});
const page = (profile) => readFileSync('src/index.html', 'utf8')
  .replace('/*@CONFIG*/', () => safe(readFileSync('src/config.js', 'utf8')))
  .replace('/*@TESTI*/', () => safe(TESTI))
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
