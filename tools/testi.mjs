// [REQ-CFG-08] Testi della fabbrica: TESTI.md è la fonte unica.
// - estraiTesti(config): tutti i testi del CONFIG, con la loro chiave
// - leggiTesti(md): le coppie chiave → testo scritte in TESTI.md
// - controllaLessico(testi): [REQ-LIT-03] nessun termine "da tradurre" (REQUISITI §1.2)
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

const CAMPI = new Set(['nome', 'titolo', 'sottotitolo', 'fabbrica', 'perTe', 'testo', 'gestoreTesto', 'chi', 'come', 'tecnico', 'cosa', 'tu', 'messaggio']);

export function caricaConfig(file = 'src/config.js') {
  const ctx = { window: {} }; vm.runInNewContext(readFileSync(file, 'utf8'), ctx); return ctx.window.CONFIG;
}

/* Chiave = percorso nel CONFIG; negli elenchi si usa l'id dell'elemento, se c'è, altrimenti la posizione */
export function estraiTesti(cfg) {
  const out = [];
  const visita = (v, path, inUi) => {
    if (typeof v === 'string') { if (inUi || CAMPI.has(path[path.length - 1])) out.push([path.join('.'), v]); return; }
    if (Array.isArray(v)) v.forEach((x, i) => visita(x, [...path, x && x.id ? x.id : String(i)], inUi));
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) visita(x, [...path, k], inUi || (path.length === 0 && (k === 'ui')));
  };
  visita(cfg, [], false);
  return out;
}

export function leggiTesti(md) {
  const map = new Map(); let chiave = null, righe = [];
  const chiudi = () => { if (chiave) map.set(chiave, righe.join(' ').replace(/\s+/g, ' ').trim()); };
  for (const r of md.split(/\r?\n/)) {
    const m = r.match(/^###\s+`?([\w.-]+)`?\s*$/);
    if (m) { chiudi(); chiave = m[1]; righe = []; }
    else if (/^#{1,2}\s/.test(r)) { chiudi(); chiave = null; }
    else if (chiave && !r.startsWith('>')) righe.push(r);
  }
  chiudi(); return map;
}

/* [REQ-LIT-03] termini tecnici che nell'HTML non devono comparire (REQUISITI §1.2, "Termini da tradurre") */
// sigle: maiuscole esatte; parole: senza distinzione tra maiuscole e minuscole
const SIGLE = ['DAX', 'RLS', 'OLS', 'CLS', 'CU', 'SKU', 'KQL'];
const PAROLE = ['Delta', 'Parquet', 'Direct Lake', 'semantic model', 'modello semantico', 'modelli semantici', 'Mirroring', 'Shortcut', 'Pipeline',
  'Copy job', 'Dataflow', 'Capacity', 'Workspace', 'Entra ID', 'Lineage', 'Endorsement', 'Lakehouse', 'Warehouse', 'OneLake', 'Fabric', 'Eventstream', 'Eventhouse', 'Ontology'];
export function controllaLessico(testi) {
  const errori = [];
  for (const [k, t] of testi) {
    if (k.endsWith('.tecnico') || k === 'meta.titolo') continue;   // [D-58] anche il titolo, che è il nome del progetto              // [RDM-026] il nome tecnico, mostrato solo nella scheda, è esente
    for (const v of SIGLE) if (new RegExp(`(^|[^\\p{L}])${v}([^\\p{L}]|$)`, 'u').test(t)) errori.push(`${k}: contiene "${v}"`);
    for (const v of PAROLE) if (new RegExp(`(^|[^\\p{L}])${v}([^\\p{L}]|$)`, 'iu').test(t)) errori.push(`${k}: contiene "${v}"`);
  }
  return errori;
}
