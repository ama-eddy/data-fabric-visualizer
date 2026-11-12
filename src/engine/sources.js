// Sorgenti: dal catalogo agli elementi di scena, con la forma della categoria e il mezzo di trasporto.
import * as THREE from 'three';
import { mat, box, cyl } from './kit.js';
import { builders } from './builders.js';

/* ===== [REQ-SRC-01, REQ-SRC-07] Dal catalogo agli elementi: area fornitori sul fondo, nessun legame con gli spoke ===== */
export function elementiSorgenti(cfg) {
  const L = cfg.layout.sorgenti, n = cfg.sources.length, passo = Math.min(L.passo, L.larghezza / Math.max(n, 1));
  return cfg.sources.map((s, i) => {
    const cat = cfg.categorie[s.categoria] || cfg.categorie.erp, modalita = s.modalita || cat.modalita;
    const x = (i - (n - 1) / 2) * passo;
    return { id: s.id || 'src-' + i, wl: 'INT', tipo: 'sorgente', nome: s.nome, categoria: s.categoria, forma: cat.forma, modalita,
      pos: [x, L.z], dim: [10, 10, 7], stato: s.stato || 'on', arrivo: x * 0.4, categoriaNome: cat.nome, etichetta: [0, i % 2 ? 15 : 10.5, 0],
      fabbrica: cat.fabbrica, perTe: cat.perTe, mezzo: cfg.modalita[modalita].nome + '. ' + cfg.modalita[modalita].testo };
  });
}

/* ===== [REQ-SRC-02] Otto forme, una per categoria ===== */
const forme = {
  stabilimento(g) {
    box(g, 9, 5, 7, mat('#94a3b8'));
    for (let i = 0; i < 3; i++) { const r = box(g, 3, 0.3, 7, mat('#475569'), -3 + i * 3, 5.5, 0); r.rotation.z = 0.4; }
    for (const x of [-2.5, 2]) { cyl(g, 0.6, 0.8, 9, mat('#e5e7eb'), x, 0, -2.2, 12); cyl(g, 0.62, 0.62, 0.8, mat('#dc2626'), x, 8, -2.2, 12); }
  },
  negozio(g) {
    box(g, 8, 4.5, 6, mat('#fde68a'));
    box(g, 6, 2.2, 0.15, mat('#7dd3fc', { e: '#38bdf8', ei: 0.35 }), 0, 0.8, 3.05);
    const t = box(g, 8.6, 0.25, 2.4, mat('#e11d48'), 0, 3.4, 3.9); t.rotation.x = 0.35;
    box(g, 4, 1, 0.3, mat('#1e293b'), 0, 4.6, 3);
  },
  silo(g) {
    for (const x of [-3, 0, 3]) { cyl(g, 1.5, 1.5, 7, mat('#cbd5e1', { m: 0.6, r: 0.35 }), x, 0, 0, 16); cyl(g, 0.2, 1.5, 1.4, mat('#94a3b8', { m: 0.6, r: 0.35 }), x, 7, 0, 16); }
    box(g, 7, 0.3, 0.3, mat('#64748b'), 0, 5.5, 0);
  },
  archivio(g) {
    box(g, 8, 3.5, 5, mat('#e7e5e4')); box(g, 8.4, 0.3, 5.4, mat('#78716c'), 0, 3.5, 0);
    const c = mat('#c8a26b');
    for (const [x, z, n] of [[-3, 4, 3], [-1.2, 4.2, 2], [1, 4, 3], [3, 4.3, 1]]) for (let i = 0; i < n; i++) box(g, 1.3, 0.9, 1.3, c, x, i * 0.95, z);
  },
  sportello(g) {
    box(g, 4, 3.5, 4, mat('#f1f5f9'), -1.5, 0, 0); box(g, 2.4, 1.2, 0.15, mat('#7dd3fc', { e: '#38bdf8', ei: 0.3 }), -1.5, 1.4, 2.05);
    box(g, 9, 0.3, 6, mat('#0ea5e9'), 0, 4.2, 0.5); for (const x of [-4, 4]) cyl(g, 0.15, 0.15, 4.2, mat('#64748b'), x, 0, 3, 8);
    for (const x of [2, 3.6]) box(g, 0.8, 1.8, 0.6, mat('#f97316'), x, 0, 1.5);
  },
  sensori(g, ctx) {
    box(g, 9.5, 0.15, 9, mat('#bbf7d0'));
    const luci = [];
    for (const [x, z] of [[-3, -3], [0, -3], [3, -3], [-3, 2], [3, 2]]) { cyl(g, 0.1, 0.1, 2.6, mat('#475569'), x, 0, z, 6); luci.push(cyl(g, 0.3, 0.3, 0.3, mat('#fb923c', { e: '#ea580c', ei: 1 }).clone(), x, 2.6, z, 8)); }
    cyl(g, 0.25, 0.4, 4, mat('#64748b'), 0, 0, 1.5, 8);
    const d = new THREE.Mesh(new THREE.SphereGeometry(1.8, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2.4), mat('#e2e8f0', { side: THREE.DoubleSide })); d.position.set(0, 5.2, 1.5); d.rotation.x = Math.PI * 0.75; g.add(d);
    const piv = new THREE.Group(); piv.position.set(0, 0, 1.5); g.add(piv); d.position.set(0, 5.2, 0); piv.add(d);
    ctx.animate((t) => { piv.rotation.y = t * 0.6; luci.forEach((l, i) => { l.material.emissiveIntensity = 0.4 + 0.9 * Math.abs(Math.sin(t * 3 + i)); }); });
  },
  mercato(g) {
    const col = ['#ef4444', '#22c55e', '#3b82f6'];
    [-3, 0, 3].forEach((x, i) => {
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) cyl(g, 0.08, 0.08, 2.6, mat('#78716c'), x + sx * 1.1, 0, sz * 1.3, 6);
      const t = new THREE.Mesh(new THREE.ConeGeometry(2, 1.4, 4), mat(col[i])); t.position.set(x, 3.3, 0); t.rotation.y = Math.PI / 4; t.castShadow = true; g.add(t);
      box(g, 2, 0.9, 1.4, mat('#d6d3d1'), x, 0, 0); box(g, 0.7, 0.5, 0.7, mat(col[(i + 1) % 3]), x - 0.4, 0.9, 0); box(g, 0.6, 0.4, 0.6, mat('#facc15'), x + 0.5, 0.9, 0.2);
    });
  },
  uffici(g) {
    box(g, 8, 8, 6, mat('#e0e7ff')); box(g, 8.4, 0.4, 6.4, mat('#4338ca'), 0, 8, 0);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) box(g, 1.2, 1.2, 0.1, mat('#7dd3fc', { e: '#38bdf8', ei: 0.2 }), -2.7 + c * 1.8, 1.3 + r * 2.3, 3.03);
    box(g, 1.6, 2, 0.12, mat('#334155'), 0, 0, 3.05);
  },
  catalogo(g) {
    box(g, 9, 4.6, 5.5, mat('#f5f5f4')); const t = box(g, 9.4, 0.3, 6, mat('#0f766e'), 0, 4.6, 0); t.rotation.x = 0.06;
    ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7'].forEach((c, i) => { box(g, 1.3, 1.7, 0.12, mat(c), -3.2 + i * 1.6, 1.6, 2.82); box(g, 1, 0.25, 0.13, mat('#ffffff'), -3.2 + i * 1.6, 2.6, 2.83); });
    for (let i = 0; i < 3; i++) box(g, 2.4, 0.6, 1.6, mat('#d6d3d1'), -2.6 + i * 2.6, 0, 4);
  },
  pacchi(g) {
    box(g, 9, 4, 5, mat('#fef3c7')); box(g, 9.4, 0.3, 5.4, mat('#ea580c'), 0, 4, 0);
    box(g, 3, 2.6, 0.12, mat('#334155'), -2, 0, 2.55);
    const c = mat('#b45309'); for (const [x, z, n] of [[1.5, 3.6, 3], [3, 3.8, 2], [2.2, 4.8, 1]]) for (let i = 0; i < n; i++) box(g, 1.1, 0.8, 1.1, c, x, i * 0.85, z);
    const k = box(g, 1.6, 0.9, 1, mat('#1d4ed8'), -3.2, 4.3, 0); cyl(g, 0.25, 0.25, 0.2, mat('#111827'), -3.7, 4.1, 0.6, 8); cyl(g, 0.25, 0.25, 0.2, mat('#111827'), -2.7, 4.1, 0.6, 8);   // carrello sull'insegna
  },
  container(g) {
    const col = ['#dc2626', '#2563eb', '#16a34a', '#f59e0b', '#7c3aed'];
    [[-2.5, 0, -1.5], [-2.5, 2.3, -1.5], [-2.5, 0, 1.5], [2.5, 0, -1.5], [2.5, 2.3, -1.5], [2.5, 4.6, -1.5], [2.5, 0, 1.5], [2.5, 2.3, 1.5]]
      .forEach(([x, y, z], i) => box(g, 4.6, 2.2, 2.4, mat(col[i % 5], { m: 0.3, r: 0.6 }), x, y, z));
    for (const x of [-5, 5]) cyl(g, 0.2, 0.2, 9, mat('#facc15'), x, 0, 3.6, 8); box(g, 10.4, 0.4, 0.4, mat('#facc15'), 0, 9, 3.6);
  },
};

/* ===== [REQ-SRC-03, REQ-SRC-04, REQ-SRC-05] Il mezzo di trasporto e il suo percorso ===== */
function infrastruttura(g, el, ctx) {
  const [sx, sz] = el.pos, ax = el.arrivo, cap = ctx.cfg.layout.capannone, zb = cap.z[0];
  const L = (x, y, z) => [x - sx, y, z - sz];                       // dal mondo alle coordinate dell'elemento
  const attivo = () => ctx.flows.lavora('INT') && ctx.state().effettivo(ctx.state().elemento(el.id)) === 'on';
  const tratto = (a, b, r, material) => {                           // tubo, ponte o strada tra due punti del mondo
    const A = new THREE.Vector3(...L(...a)), B = new THREE.Vector3(...L(...b)), dir = B.clone().sub(A), len = dir.length();
    const piatto = !!r.w;
    const m = new THREE.Mesh(piatto ? new THREE.BoxGeometry(r.w, r.h, len) : new THREE.CylinderGeometry(r, r, len, 10), material);
    m.position.copy(A).add(B).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, piatto ? 0 : 1, piatto ? 1 : 0), dir.normalize());
    m.receiveShadow = true; g.add(m); return m;
  };
  const m = el.modalita;
  const lago = ctx.cfg.elements.find((e) => e.tipo === 'lago'), lz = lago.pos[1], lw = lago.dim[0] / 2 - 6, ld = lago.dim[1] / 2;
  const xl = Math.max(-lw, Math.min(lw, sx)), arrivo = [ax * 0.9, lz + ld - 3];       // dove il materiale entra nel lago · dove arriva al pontile
  if (m === 'copy') {                                               // [RDM-019] scivolo: il materiale scivola nel lago e galleggia fino al pontile
    const top = [sx, 4.2, sz + 5.5], fondo = [xl, 0.5, lz - ld + 1.5];
    const scivolo = tratto(top, fondo, { w: 1.8, h: 0.2 }, mat('#f97316')); scivolo.castShadow = true;
    for (const s of [-1, 1]) { const b = tratto([top[0] + s * 0.9, top[1] + 0.4, top[2]], [fondo[0] + s * 0.9, fondo[1] + 0.4, fondo[2]], 0.08, mat('#fdba74')); b.castShadow = false; }
    cyl(g, 0.25, 0.3, 4.2, mat('#64748b'), ...L(top[0], 0, top[2] + 0.4), 8);
    ctx.flows.addRoute({ punti: [[top[0], top[1] + 0.6, top[2]], [fondo[0], 0.9, fondo[2]]], tipo: 'grezzo', attivo, ogni: 2.2 + Math.random(), vel: 9 });
    ctx.flows.addRoute({ punti: [[fondo[0], 0.35, fondo[2] + 1], [arrivo[0], 0.35, arrivo[1]]], tipo: 'galleggiante', attivo, ogni: 2.2 + Math.random(), vel: 2.6 });
  } else if (m === 'dataflow') {                                    // [RDM-019] scialuppa: attraversa il lago fino al pontile
    const molo = [xl, lz - ld - 0.5];
    tratto([sx, 0.1, sz + 5.5], [molo[0], 0.1, molo[1]], { w: 2, h: 0.1 }, mat('#a8a29e'));
    tratto([molo[0], 0.45, molo[1] - 1], [molo[0], 0.45, molo[1] + 3], { w: 2.2, h: 0.3 }, mat('#a16207'));
    ctx.flows.addRoute({ punti: [[molo[0], 0.25, molo[1] + 4], [(molo[0] + arrivo[0]) / 2 + 4, 0.25, lz], [arrivo[0], 0.25, arrivo[1]]], tipo: 'scialuppa', attivo, ogni: 7 + Math.random() * 2, vel: 4 });
  } else if (m === 'mirroring' || m === 'shortcut') {               // condotta / ponte: scavalcano la banchina ed entrano nel Bronze
    const h = 9, zB = -22, pts = [[sx, 3, sz + 5], [sx, h, sz + 12], [ax, h, sz + 28], [ax, h, zB - 2], [ax, 3.5, zB]];
    const material = m === 'mirroring' ? mat('#7dd3fc', { op: 0.55, r: 0.2, e: '#0ea5e9', ei: 0.15 }) : mat('#cffafe', { op: 0.38, r: 0.1, m: 0.2 });
    for (let i = 0; i < 4; i++) tratto(pts[i], pts[i + 1], m === 'mirroring' ? 0.55 : { w: 2.6, h: 0.25 }, material).castShadow = false;
    for (const p of [pts[1], pts[2], [ax, h, zb - 6]]) cyl(g, 0.22, 0.3, p[1], mat('#64748b'), ...L(p[0], 0, p[2]), 8);
    if (m === 'mirroring') ctx.flows.addRoute({ punti: pts, tipo: 'impulso', attivo, ogni: 0.7, vel: 14 });
    else {                                                          // [REQ-SRC-05] nessun pezzo viaggia: nel Bronze compare l'"ombra" del materiale
      const ombra = new THREE.Group(); g.add(ombra);
      for (let i = 0; i < 3; i++) box(ombra, 1.4, 1.1, 1.4, mat('#a5f3fc', { op: 0.45, e: '#22d3ee', ei: 0.5 }), ...L(ax + (i - 1) * 1.6, 1.0 + (i === 1 ? 1.15 : 0), zB + 1.5)).castShadow = false;
      ctx.animate(() => { ombra.visible = attivo(); });
    }
  } else if (m === 'streaming') {                                   // [REQ-SRC-06, REQ-FLW-10] nastro veloce: dritto alla sala sensori, salta banchina e magazzino
    const s = ctx.cfg.elements.find((e) => e.tipo === 'salasensori'), tx = s ? s.pos[0] + 4 : 62, tz = s ? s.pos[1] : -20;
    const pts = [[sx, 3, sz + 5], [sx, 8, sz + 13], [tx, 8, sz + 22], [tx, 8, tz - 9], [tx, 6.5, tz - 5]];
    const nastro = mat('#fdba74', { e: '#ea580c', ei: 0.25, op: 0.8 }).clone();
    for (let i = 0; i < 4; i++) tratto(pts[i], pts[i + 1], { w: 1.4, h: 0.2 }, nastro).castShadow = false;
    for (const p of [pts[1], pts[2], pts[3]]) cyl(g, 0.2, 0.28, p[1], mat('#64748b'), ...L(p[0], 0, p[2]), 8);
    const vivo = () => ctx.flows.lavora('RTI') && ctx.state().effettivo(ctx.state().elemento(el.id)) === 'on';
    ctx.animate(() => { nastro.emissiveIntensity = vivo() ? 0.9 : 0.1; });      // con il Real-Time spento il nastro resta fermo e spento
    ctx.flows.addRoute({ punti: pts.map(([x, y, z]) => [x, y + 0.45, z]), tipo: 'evento', attivo: vivo, ogni: 0.35, vel: 26 });
  }
}

builders.sorgente = (g, el, ctx) => {
  box(g, 11, 0.2, 11, mat('#d6d3d1', { r: 1 }));
  const f = new THREE.Group(); f.position.y = 0.2; g.add(f);
  (forme[el.forma] || forme.silo)(f, ctx);
  f.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  infrastruttura(g, el, ctx);
};

/* ===== [REQ-SRC-07] Piazzale dell'area fornitori ===== */
builders.piazzale = (g, el) => { const [w, d] = el.dim; box(g, w, 0.08, d, mat('#e5e0d5', { r: 1 })).castShadow = false; };
