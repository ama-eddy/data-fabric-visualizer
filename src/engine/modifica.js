// [REQ-CFG-09] Modifica dei testi dalla pagina: i testi delle schede si correggono sul posto, restano nel browser
// e si esportano come TESTI.md aggiornato. La fonte unica resta TESTI.md [REQ-CFG-08].
const CHIAVE = 'fabbrica-testi';
const leggi = () => { try { const m = JSON.parse(localStorage.getItem(CHIAVE)); return m && typeof m === 'object' && !Array.isArray(m) ? m : {}; } catch (e) { return {}; } };

/* i testi di TESTI.md entrano nel CONFIG: chiave = percorso; negli elenchi si usa l'id, se c'è, altrimenti la posizione */
export function applicaTesti(cfg, testi) {
  for (const [chiave, testo] of Object.entries(testi || {})) {
    const p = chiave.split('.'); let o = cfg;
    for (let i = 0; i < p.length - 1 && o; i++) o = Array.isArray(o) ? (o.find((x) => x && x.id === p[i]) || o[+p[i]]) : o[p[i]];
    if (o && typeof o === 'object') o[p[p.length - 1]] = testo;
  }
  return cfg;
}

const originali = () => window.TESTI || {};
let mod = leggi(), attivo = false, cfgRef = null;
const ascolta = [];
const salva = () => { try { localStorage.setItem(CHIAVE, JSON.stringify(mod)); } catch (e) { /* senza salvataggio le modifiche valgono fino alla chiusura */ } ascolta.forEach((fn) => fn()); };
const valore = (k) => (k in mod ? mod[k] : originali()[k]);

export const modifica = {
  /* all'avvio: le modifiche salvate nel browser si sovrappongono a TESTI.md (solo per chiavi che esistono ancora) */
  avvia(cfg) { cfgRef = cfg; for (const k of Object.keys(mod)) if (!(k in originali()) || mod[k] === originali()[k]) delete mod[k]; applicaTesti(cfg, mod); return cfg; },
  attivo: () => attivo,
  conta: () => Object.keys(mod).length,
  modifiche: () => ({ ...mod }),
  onChange: (fn) => ascolta.push(fn),
  attiva(si) { attivo = si; document.body.classList.toggle('modifica', si); document.querySelectorAll('[data-k]').forEach((n) => { n.contentEditable = si ? 'true' : 'false'; }); ascolta.forEach((fn) => fn()); },
  /* lega un nodo di testo alla sua chiave: in modifica diventa scrivibile, e all'uscita dal campo il testo è salvato */
  lega(nodo, k, alCambio) {
    if (!k || !(k in originali())) return nodo;
    nodo.dataset.k = k; nodo.contentEditable = attivo ? 'true' : 'false'; nodo.spellcheck = false;
    nodo.addEventListener('keydown', (e) => { if (!attivo) return; e.stopPropagation(); if (e.key === 'Enter') { e.preventDefault(); nodo.blur(); } if (e.key === 'Escape') { nodo.textContent = valore(k); nodo.blur(); } });
    nodo.addEventListener('click', (e) => { if (attivo) e.stopPropagation(); });
    nodo.addEventListener('blur', () => {
      if (!attivo) return;
      const v = nodo.textContent.replace(/\s+/g, ' ').trim();
      if (!v || v === valore(k)) { nodo.textContent = valore(k); return; }       // un testo non può restare vuoto
      if (v === originali()[k]) delete mod[k]; else mod[k] = v;
      nodo.textContent = v; applicaTesti(cfgRef, { [k]: v }); if (alCambio) alCambio(v); salva();
    });
    return nodo;
  },
  /* TESTI.md aggiornato: lo stesso file, con i soli testi modificati sostituiti */
  md() {
    const righe = String(window.TESTI_MD || '').split(/\r?\n/), out = [];
    for (let i = 0; i < righe.length; i++) {
      const m = righe[i].match(/^###\s+`?([\w.-]+)`?\s*$/); out.push(righe[i]);
      if (m && m[1] in mod) { out.push(mod[m[1]]); while (i + 1 < righe.length && righe[i + 1].trim() !== '' && !righe[i + 1].startsWith('#')) i++; }
    }
    return out.join('\n');
  },
  esporta() { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([modifica.md()], { type: 'text/markdown' })); a.download = 'TESTI.md'; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); },
  annulla() { mod = {}; try { localStorage.removeItem(CHIAVE); } catch (e) { /* niente da togliere */ } location.reload(); },
};
