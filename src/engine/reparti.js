// Reparti del capannone: banchina, Bronze, Silver, Gold, confezionamento, spedizioni. [REQ-FLW-02…06]
import * as THREE from 'three';
import { mat, box, cyl } from './kit.js';
import { builders } from './builders.js';

const cassa = (g, colore, x, y, z, o = {}) => box(g, 1.3, 1, 1.3, mat(colore, o), x, y, z);
const pila = (g, colore, x, z, n, o) => { for (let i = 0; i < n; i++) cassa(g, colore, x + (i % 2) * 0.1, i * 1.05, z, o); };

/* ===== [REQ-FLW-02] Banchina di scarico (Landing): il materiale arriva così com'è ===== */
builders.banchina = (g, el, ctx) => {
  const [w, d, h] = el.dim, corsie = ctx.cfg.flussi.corsie;
  box(g, w, 0.5, d, mat('#6b7280'));                                   // piano di carico
  box(g, w, 0.12, 0.5, mat('#facc15'), 0, 0.5, -d / 2 + 0.25);
  for (let x = -w / 2 + 3; x <= w / 2 - 3; x += 9) {                   // portali di scarico
    for (const s of [-2, 2]) box(g, 0.4, h, 0.4, mat('#475569'), x + s, 0.5, -d / 2 + 0.6);
    box(g, 4.4, 0.5, 0.5, mat('#475569'), x, h + 0.2, -d / 2 + 0.6);
    box(g, 4, 1.1, 0.12, mat('#1d4ed8'), x, h - 1, -d / 2 + 0.6);
  }
  const tetto = box(g, w, 0.25, d * 0.6, mat('#93c5fd', { op: 0.5 }), 0, h + 0.8, -d * 0.15); tetto.castShadow = false;
  const grezzi = ['#9ca3af', '#a8a29e', '#78716c', '#94a3b8'];
  for (let x = -w / 2 + 4; x <= w / 2 - 4; x += 4.5) {                 // materiale grezzo, di forme diverse
    if (corsie.some((c) => Math.abs(c - x) < 2)) continue;
    box(g, 2.6, 0.15, 2.6, mat('#a16207'), x, 0.5, 1);
    const c = grezzi[Math.abs(Math.round(x)) % 4];
    if (Math.round(x) % 2) { cyl(g, 0.6, 0.6, 1.2, mat(c), x - 0.5, 0.65, 1, 10); cassa(g, grezzi[(Math.abs(Math.round(x)) + 1) % 4], x + 0.6, 0.65, 1.2); }
    else { cassa(g, c, x - 0.5, 0.65, 0.6); cassa(g, c, x + 0.6, 0.65, 1.3); cassa(g, grezzi[(Math.abs(Math.round(x)) + 2) % 4], x, 1.7, 0.9); }
  }
};

/* ===== [REQ-SCN-04] Lago dei dati: un'unica riserva tra i fornitori e la fabbrica ===== */
builders.lago = (g, el, ctx) => {
  const [w, d] = el.dim;
  const forma = new THREE.Shape(); const r = d / 2;                                  // vasca con i lati arrotondati
  forma.moveTo(-w / 2 + r, -d / 2); forma.lineTo(w / 2 - r, -d / 2); forma.absarc(w / 2 - r, 0, r, -Math.PI / 2, Math.PI / 2); forma.lineTo(-w / 2 + r, d / 2); forma.absarc(-w / 2 + r, 0, r, Math.PI / 2, Math.PI * 1.5);
  const riva = new THREE.Mesh(new THREE.ShapeGeometry(forma.forma), mat('#d6c7a1', { r: 1 }));
  riva.rotation.x = -Math.PI / 2; riva.position.y = 0.03; riva.scale.set(1.08, 1.12, 1); riva.receiveShadow = true; g.add(riva);
  const acqua = new THREE.Mesh(new THREE.ShapeGeometry(forma), mat('#38bdf8', { e: '#0284c7', ei: 0.35, r: 0.15, m: 0.1 }).clone());
  acqua.rotation.x = -Math.PI / 2; acqua.position.y = 0.12; acqua.receiveShadow = true; g.add(acqua);
  const onde = [];
  for (let i = 0; i < 26; i++) { const o = box(g, 1.6 + (i % 3), 0.04, 0.18, mat('#e0f2fe', { op: 0.7 }), ((i * 37) % (w - 14)) - (w - 14) / 2, 0.14, ((i * 13) % (d - 6)) - (d - 6) / 2); o.castShadow = false; onde.push(o); }
  ctx.animate((t) => { acqua.material.emissiveIntensity = 0.3 + 0.08 * Math.sin(t * 1.3); onde.forEach((o, i) => { o.position.x += Math.sin(t * 0.5 + i) * 0.004; o.material.opacity = 0.4 + 0.3 * Math.sin(t * 1.7 + i); }); });
};

/* ===== Pontile di pesca: il team dati pesca il materiale dal lago e lo porta nel magazzino ===== */
builders.pontile = (g, el, ctx) => {
  const [w, d] = el.dim, legno = mat('#a16207'), pali = mat('#78350f');
  box(g, w, 0.35, d, legno, 0, 0.5, 0);
  for (let x = -w / 2 + 4; x <= w / 2 - 4; x += 10) {                               // pontili che entrano nel lago
    box(g, 2.2, 0.3, 6, legno, x, 0.5, -d / 2 - 3);
    for (const z of [-d / 2 - 1, -d / 2 - 5.5]) for (const s of [-1, 1]) cyl(g, 0.16, 0.16, 1.2, pali, x + s * 0.9, -0.2, z, 6);
  }
  for (const x of [-w / 2 + 2, -6, 6, w / 2 - 2]) for (const z of [-d / 2 + 0.3, d / 2 - 0.3]) cyl(g, 0.18, 0.18, 1, pali, x, 0, z, 6);
  const gru = new THREE.Group(); gru.position.set(14, 0.85, -0.5); g.add(gru);          // gru per pescare
  cyl(gru, 0.3, 0.4, 4.5, mat('#facc15'), 0, 0, 0, 10);
  const braccio = new THREE.Group(); braccio.position.y = 4.5; gru.add(braccio);
  box(braccio, 0.35, 0.35, 7, mat('#facc15'), 0, 0, -3.2);
  const rete = new THREE.Mesh(new THREE.SphereGeometry(0.8, 10, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), mat('#334155', { op: 0.6 })); rete.position.set(0, -2.6, -6.4); braccio.add(rete);
  box(braccio, 0.05, 2.4, 0.05, mat('#1f2937'), 0, -1.3, -6.4);
  ctx.animate((t) => { if (ctx.flows.lavora('INT')) { braccio.rotation.y = Math.sin(t * 0.5) * 0.6; rete.position.y = -2.6 - Math.abs(Math.sin(t * 0.9)) * 1.4; } });
  const grezzi = ['#9ca3af', '#a8a29e', '#78716c'];                                // casse di materiale pescato
  [[-18, 1], [-16.4, 0.4], [-2, 0.8], [8, 0.5], [9.6, 1]].forEach(([x, z], i) => box(g, 1.2, 0.9, 1.2, mat(grezzi[i % 3]), x, 0.85, z));
};

/* ===== [REQ-FLW-03] Magazzino materie prime (Bronze): a scaffale, etichettato, ancora grezzo ===== */
builders.bronze = (g, el, ctx) => {
  const [w, d, h] = el.dim, col = ctx.cfg.materiali.bronze.colore, tra = [-27, -9, 9, 27];
  for (const x of tra) {
    for (const sx of [-2.6, 2.6]) for (const sz of [-d / 2 + 1, d / 2 - 1]) box(g, 0.25, h, 0.25, mat('#1e3a8a'), x + sx, 0, sz);
    for (let l = 0; l < 3; l++) {
      box(g, 5.6, 0.18, d - 1.6, mat('#f97316'), x, 0.3 + l * 2, 0);
      for (let z = -d / 2 + 1.8; z <= d / 2 - 1.8; z += 1.9) for (const sx of [-1.4, 0.3, 1.9]) if ((Math.round(z * 3 + sx * 5 + l) % 4) !== 0) cassa(g, col, x + sx - 0.3, 0.5 + l * 2, z, { m: 0.5, r: 0.5 });
    }
  }
};

/* ===== [REQ-FLW-04] Reparto lavorazione (Silver): pulizia e controllo qualità ===== */
builders.silver = (g, el, ctx) => {
  const [, d] = el.dim, col = ctx.cfg.materiali.silver.colore;
  for (const x of ctx.cfg.flussi.corsie) {
    for (const s of [-1.7, 1.7]) box(g, 1.2, 3.4, 5, mat('#cbd5e1', { m: 0.5, r: 0.4 }), x + s, 0, 0);   // la macchina sta a cavallo del nastro
    box(g, 4.6, 1.4, 5, mat('#94a3b8', { m: 0.5, r: 0.4 }), x, 3.4, 0);
    const tamburo = cyl(g, 1.1, 1.1, 3.6, mat('#e2e8f0', { m: 0.8, r: 0.2 }), x, 4.8, 0, 14); tamburo.rotation.z = Math.PI / 2; tamburo.position.y = 5.6;
    const pala = box(g, 3.4, 0.2, 2.4, mat('#64748b'), x, 5.5, 0);
    const spia = cyl(g, 0.3, 0.3, 0.4, mat('#4ade80', { e: '#22c55e', ei: 1 }).clone(), x + 1.7, 4.8, 2, 8);
    ctx.animate((t) => { pala.rotation.x = t * 2 + x; spia.material.emissiveIntensity = ctx.flows.lavora('TRF') ? 0.5 + 0.8 * Math.abs(Math.sin(t * 4 + x)) : 0.1; });
  }
  for (const x of [-27, -9, 9, 27]) { pila(g, col, x - 0.8, d / 2 - 2, 3, { m: 0.75, r: 0.25 }); pila(g, col, x + 0.8, d / 2 - 2, 2, { m: 0.75, r: 0.25 }); }
};

/* ===== [REQ-FLW-05] Linea di assemblaggio (Gold): i pezzi diventano componenti ===== */
builders.gold = (g, el, ctx) => {
  const [, d] = el.dim, col = ctx.cfg.materiali.gold.colore;
  for (const x of ctx.cfg.flussi.corsie) {
    cyl(g, 0.9, 1.1, 1, mat('#f59e0b'), x + 3, 0, 0, 14);
    const base = new THREE.Group(); base.position.set(x + 3, 1, 0); g.add(base);
    cyl(base, 0.35, 0.35, 2.6, mat('#fbbf24'), 0, 0, 0, 10);
    const braccio = new THREE.Group(); braccio.position.y = 2.6; base.add(braccio);
    box(braccio, 3.4, 0.5, 0.5, mat('#f59e0b'), -1.5, 0, 0); box(braccio, 0.3, 1.4, 0.3, mat('#374151'), -3, -1.3, 0); box(braccio, 0.9, 0.2, 0.9, mat('#374151'), -3, -1.4, 0);
    ctx.animate((t) => { const on = ctx.flows.lavora('TRF'); base.rotation.y = on ? Math.sin(t * 1.4 + x) * 0.55 : 0; braccio.rotation.z = on ? Math.sin(t * 2.8 + x) * 0.12 : 0.25; });
  }
  for (const x of [-27, -9, 9, 27]) { pila(g, col, x - 0.8, d / 2 - 1.8, 2, { m: 0.7, r: 0.3 }); pila(g, col, x + 0.9, d / 2 - 1.8, 3, { m: 0.7, r: 0.3 }); }
};

/* ===== [REQ-FLW-06] Confezionamento: nascono i semilavorati con il marchio di qualità ===== */
builders.confezionamento = (g, el, ctx) => {
  const col = ctx.cfg.materiali.semilavorato.colore;
  for (const s of [-1, 1]) box(g, 46, 1.4, 1.2, mat('#0e7490'), 0, 0, s * 1.6);          // corpo a cavallo dei nastri
  box(g, 46, 2.6, 4.4, mat('#155e75'), 0, 2.2, 0); box(g, 46.2, 0.5, 4.6, mat(col, { e: '#0891b2', ei: 0.4 }), 0, 3.2, 0);
  const pressa = box(g, 2.2, 1.2, 2.2, mat('#e2e8f0', { m: 0.7, r: 0.3 }), 16, 4.9, 0); cyl(g, 0.35, 0.35, 2.4, mat('#94a3b8'), 16, 4.8, 0, 10);
  ctx.animate((t) => { pressa.position.y = 5.6 + (ctx.flows.lavora('TRF') ? 0.5 * Math.abs(Math.sin(t * 2.6)) : 0.5); });
  for (const x of [-27, 27]) for (const dz of [-1, 1]) for (let i = 0; i < 2; i++) { const p = box(g, 1.5, 1.1, 1.5, mat(col, { e: '#0891b2', ei: 0.25 }), x, i * 1.15, dz); box(g, 1.56, 0.25, 0.4, mat('#ffffff'), x, i * 1.15 + 0.45, dz); p.castShadow = true; }
};

/* ===== [REQ-FLW-07] Spedizioni: i semilavorati partono verso le officine ===== */
builders.spedizioni = (g, el, ctx) => {
  const [w, d, h] = el.dim, col = ctx.cfg.materiali.semilavorato.colore;
  box(g, w - 2, 0.4, 4, mat('#6b7280'), 0, 0, d / 2 - 2.5);
  for (const x of [-7, 0, 7]) {
    for (const s of [-2, 2]) box(g, 0.4, h, 0.4, mat('#475569'), x + s, 0.4, d / 2 - 0.8);
    box(g, 4.4, 0.5, 0.5, mat('#475569'), x, h, d / 2 - 0.8); box(g, 4, 1, 0.12, mat(col), x, h - 1.2, d / 2 - 0.8);
  }
  for (const [x, z, n] of [[-9, -1, 3], [-7.2, -1.2, 2], [-9, 1, 2], [6, 0.5, 3], [7.8, 0.2, 3], [9.5, 0.6, 1]]) for (let i = 0; i < n; i++) { box(g, 1.5, 1.1, 1.5, mat(col, { e: '#0891b2', ei: 0.25 }), x, i * 1.15, z); box(g, 1.56, 0.25, 0.4, mat('#ffffff'), x, i * 1.15 + 0.45, z); }
};
