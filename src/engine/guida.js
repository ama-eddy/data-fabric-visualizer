// Modalità narrativa, percorsi e schermata di benvenuto.
// [REQ-NAR-01…08] narrativa a capitoli · [REQ-PER-01…07] percorsi · [REQ-UI-10] due modalità · [REQ-LIT-04] benvenuto
import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

const $ = (id) => document.getElementById(id);
const h = (tag, props = {}, ...kids) => { const e = Object.assign(document.createElement(tag), props); e.append(...kids.filter((k) => k !== null && k !== undefined)); return e; };

export function createGuida(cfg, world, state, ui) {
  const T = cfg.ui, box = $('guida');
  let modo = null, passo = 0, passi = [], percorso = null, vista = null;

  /* ---------- scheda comune a capitoli e tappe ---------- */
  function scheda({ intestazione, titolo, testo, righe = [], colore }) {
    box.innerHTML = ''; box.style.borderTopColor = colore || '#64748b';
    const nav = h('div', { className: 'nav' });
    const b = (txt, fn, cls = '', off = false) => { const x = h('button', { textContent: txt, className: cls, disabled: off }); x.onclick = fn; nav.append(x); };
    b('← ' + T.indietro, indietro, '', passo === 0); b(T.tornaQui, inquadra, 'sec'); b(T.esci, esci, 'sec'); b(T.avanti + ' →', avanti, 'primario', passo >= passi.length - 1);
    box.append(h('div', { className: 'passo', textContent: intestazione }), h('h3', { textContent: titolo }), h('p', { className: 'testo', textContent: testo }),
      ...righe.filter((r) => r[1]).map(([k, v]) => h('p', { className: 'riga' }, h('b', { textContent: k + ': ' }), v)), nav, h('div', { className: 'aiuto', textContent: T.aiutoGuida }));
    box.classList.add('open');
  }
  function inquadra() { if (!vista) return; if (vista === 'insieme') world.home(); else world.frame(vista.punti, vista.raggio); }   // [REQ-NAR-06, REQ-PER-07]

  /* ===== [REQ-NAR-01…05, REQ-NAR-08] Narrativa ===== */
  const capitoli = () => cfg.chapters.filter((c) => c.incluso !== false);       // [REQ-NAR-02] i capitoli esclusi vengono saltati
  function mostraCapitolo() {
    const cs = passi, c = cs[passo], wl = {}, propri = {};
    for (const k of cfg.ordine) wl[k] = 'off';
    const sorgenti = state.recs.filter((r) => r.el.tipo === 'sorgente');
    for (const r of sorgenti) propri[r.el.id] = 'off';
    for (let i = 0; i <= passo; i++) {                                           // [REQ-NAR-03] quello che è stato acceso resta acceso
      Object.assign(wl, cs[i].accendi || {});
      if (cs[i].sorgenti) for (const r of sorgenti) propri[r.el.id] = r.el.narrativa || 'on';   // [REQ-NAR-08] stato del profilo
      for (const [id, st] of Object.entries(cs[i].elementi || {})) propri[id] = st;             // [REQ-SRC-10] singole sorgenti
    }
    state.imposta(wl, propri);
    const ids = Array.isArray(c.vista) ? c.vista : null, accesi = Object.keys(c.accendi || {});
    const rs = ids ? ids.map((id) => state.elemento(id)).filter(Boolean) : state.recs.filter((r) => accesi.includes(r.el.wl) && r.el.tipo !== 'trasporto' && (r.proprio === undefined || r.proprio !== 'off'));
    vista = c.vista === 'insieme' || !rs.length ? 'insieme' : { punti: rs.map((r) => r.el.pos), raggio: 20 };
    inquadra();
    scheda({ intestazione: `${T.capitolo} ${passo + 1} ${T.di} ${cs.length}`, titolo: c.titolo, testo: c.testo, colore: accesi[0] && cfg.workloads[accesi[0]] ? cfg.workloads[accesi[0]].colore : null });
    if (c.percorso) avviaPercorso(c.percorso);                                   // [REQ-PER-06]
  }
  function avviaNarrativa(da = 0) {
    esci(); modo = 'narrativa'; passi = capitoli(); passo = Math.min(da, passi.length - 1);
    document.body.classList.add('presenta'); world.setMargine(0); world.setKeyboardMove(false); ui.chiudi();
    mostraCapitolo();
  }

  /* ===== [REQ-PER-01…05] Percorsi: linea luminosa con tappe numerate, il resto attenuato ===== */
  const traccia = new THREE.Group(); world.scene.add(traccia);
  function disegna() {
    while (traccia.children.length) { const o = traccia.children.pop(); o.traverse?.((m) => { if (m.element) m.element.remove(); }); }
    const col = new THREE.Color(percorso.colore), m = new THREE.MeshBasicMaterial({ color: col }), m2 = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.45 });
    const visti = {};
    passi.forEach((t, i) => {                                                  // stessa tappa visitata due volte: i segnaposto si affiancano
      const r = state.elemento(t.el), n = (visti[t.el] = (visti[t.el] || 0) + 1) - 1;
      t.p = new THREE.Vector3(r.el.pos[0] + n * 3.2, Math.min(r.el.dim[2], 14) + 7, r.el.pos[1] + n * 1.5); t.base = r.el.pos;
      const palo = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, t.p.y, 6), m2); palo.position.set(t.p.x, t.p.y / 2, t.p.z); traccia.add(palo);
      const s = new THREE.Mesh(new THREE.SphereGeometry(1.1, 16, 12), m); s.position.copy(t.p); traccia.add(s); t.sfera = s;
      const d = h('div', { className: 'num', textContent: String(i + 1) }); d.style.background = percorso.colore; d.onclick = () => { passo = i; mostraTappa(); };
      const l = new CSS2DObject(d); l.position.copy(t.p); traccia.add(l); t.num = d;
      if (i) {                                                                 // [REQ-PER-03] tratto con le frecce della direzione
        const a = passi[i - 1].p, dir = t.p.clone().sub(a), len = dir.length(), q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
        const tubo = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, len, 8), m); tubo.position.copy(a).add(t.p).multiplyScalar(0.5); tubo.quaternion.copy(q); traccia.add(tubo);
        for (const k of len > 30 ? [0.35, 0.7] : [0.55]) { const f = new THREE.Mesh(new THREE.ConeGeometry(0.9, 2.2, 10), m); f.position.copy(a).addScaledVector(dir, k); f.quaternion.copy(q); traccia.add(f); }
      }
    });
  }
  function mostraTappa() {
    const fine = passo === passi.length - 1 && passi[passo].fine;
    passi.forEach((t, i) => { if (t.sfera) { t.sfera.scale.setScalar(i === passo ? 1.7 : 1); t.num.classList.toggle('ora', i === passo); } });
    if (fine) {                                                                // [REQ-LIT-06] messaggio chiave
      vista = 'insieme'; inquadra();
      return scheda({ intestazione: percorso.sottotitolo + ' · ' + T.ricorda, titolo: percorso.titolo, testo: percorso.messaggio, colore: percorso.colore });
    }
    const t = passi[passo], n = passi.filter((x) => !x.fine).length;
    vista = { punti: [t.base], raggio: 16 }; inquadra();
    scheda({ intestazione: `${percorso.sottotitolo} · ${T.tappa} ${passo + 1} ${T.di} ${n}`, titolo: state.elemento(t.el).el.nome, testo: t.cosa, righe: [[T.chi, t.chi], [T.tu, t.tu]], colore: percorso.colore });
  }
  function avviaPercorso(id) {
    esci(); percorso = cfg.paths.find((p) => p.id === id); if (!percorso) return;
    /* [REQ-PER-05] le tappe su workload spenti o in cantiere, o su elementi spenti, vengono saltate */
    passi = percorso.tappe.filter((t) => { const r = state.elemento(t.el); return r && t.wl.every((w) => state.stato[w] === 'on') && state.effettivo(r) === 'on'; }).map((t) => ({ ...t }));
    modo = 'percorso'; passo = 0; document.body.classList.add('percorso'); world.setKeyboardMove(false); ui.chiudi();
    if (!passi.length) { passi = [{ fine: true }]; world.attenua(true); return scheda({ intestazione: percorso.sottotitolo, titolo: percorso.titolo, testo: T.nessunaTappa, colore: percorso.colore }); }
    disegna(); passi.push({ fine: true }); world.attenua(true); mostraTappa();
  }

  /* ---------- navigazione comune ---------- */
  const mostra = () => (modo === 'narrativa' ? mostraCapitolo() : mostraTappa());
  function avanti() { if (modo && passo < passi.length - 1) { passo++; mostra(); } }
  function indietro() { if (modo && passo > 0) { passo--; mostra(); } }
  function esci() {                                                            // [REQ-UI-10] la scena resta nello stato raggiunto
    if (!modo) return;
    if (modo === 'percorso') { world.attenua(false); while (traccia.children.length) { const o = traccia.children.pop(); if (o.element) o.element.remove(); } }
    modo = null; percorso = null; vista = null; box.classList.remove('open'); document.body.classList.remove('presenta', 'percorso');
    world.setMargine(document.body.classList.contains('compatto') ? 0 : cfg.layout.margineSinistro); world.setKeyboardMove(true);
  }
  /* [REQ-NAR-05] tastiera e telecomando da presentazione */
  addEventListener('keydown', (e) => {
    if (!modo || e.target.closest?.('input,textarea')) return;
    if (['ArrowRight', 'PageDown', 'Space', 'Enter'].includes(e.code)) { e.preventDefault(); avanti(); }
    else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.code)) { e.preventDefault(); indietro(); }
    else if (e.code === 'Escape') esci();
  });

  /* ---------- comandi nella barra ---------- */
  const bar = $('bar'), bp = h('button', { textContent: '▶ ' + T.presentazione, className: 'primario' }); bp.onclick = () => avviaNarrativa(0); bar.prepend(bp);
  const menu = h('div', { className: 'tendina' }), bq = h('button', { textContent: T.percorsi + ' ▾' });
  for (const p of cfg.paths) { const v = h('button', {}, h('b', { textContent: p.titolo }), h('small', { textContent: p.sottotitolo })); v.style.borderLeftColor = p.colore; v.onclick = () => { menu.classList.remove('open'); avviaPercorso(p.id); }; menu.append(v); }   // [REQ-LIT-05]
  bq.onclick = (e) => { e.stopPropagation(); menu.classList.toggle('open'); }; addEventListener('click', () => menu.classList.remove('open'));
  bar.append(h('span', { className: 'ancora' }, bq, menu));

  /* ===== [REQ-LIT-04] Schermata di benvenuto, riapribile con "?" ===== */
  const ben = $('benvenuto');
  function benvenuto(v) {
    ben.classList.toggle('open', v); if (!v) return;
    ben.innerHTML = ''; const b1 = h('button', { textContent: '▶ ' + T.presentazione, className: 'primario' }), b2 = h('button', { textContent: T.esplora });
    b1.onclick = () => { benvenuto(false); avviaNarrativa(0); }; b2.onclick = () => benvenuto(false);
    ben.append(h('div', { className: 'carta' }, h('h2', { textContent: T.benvenutoTitolo }), h('p', { textContent: T.benvenuto1 }), h('p', { textContent: T.benvenuto2 }), h('p', { textContent: T.benvenuto3 }), h('p', { className: 'aiuto', textContent: T.aiuto }), h('div', { className: 'nav' }, b2, b1)));
  }
  const bh = h('button', { textContent: '?', title: T.benvenutoTitolo }); bh.onclick = () => benvenuto(true); bar.append(bh);

  /* ===== [REQ-UI-08] Schermi piccoli: il pannello dei workload si può chiudere ===== */
  const bm = h('button', { id: 'apri-menu', textContent: '☰', title: T.menu, className: 'panel' }); document.body.append(bm);
  const compatto = (v) => { document.body.classList.toggle('compatto', v); if (!modo) world.setMargine(v ? 0 : cfg.layout.margineSinistro); };
  bm.onclick = () => compatto(!document.body.classList.contains('compatto'));
  if (innerWidth < 1280) compatto(true);
  let larga = innerWidth >= 1280; addEventListener('resize', () => { const l = innerWidth >= 1280; if (l !== larga) { larga = l; compatto(!l); } });

  if (!/[?&#]avvio=libero/.test(location.href)) benvenuto(true);
  return { avviaNarrativa, avviaPercorso, avanti, indietro, esci, benvenuto, modo: () => modo, passo: () => passo, passi: () => passi };
}
