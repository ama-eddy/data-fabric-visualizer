// Consumo: showroom dell'hub, negozi degli spoke, ufficio di coordinamento. [REQ-HS-01…07, REQ-SCN-07, REQ-SCN-13]
import * as THREE from 'three';
import { mat, box, cyl } from './kit.js';
import { builders } from './builders.js';
import { figura } from './figures.js';

/* ===== [REQ-SCN-07, NFR-04] Dashboard di esempio generate: nessun dato reale ===== */
export function dashboard(accento, seme = 1) {
  const c = document.createElement('canvas'); c.width = 384; c.height = 240; const g = c.getContext('2d');
  let s = seme * 9301 + 49297; const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  g.fillStyle = '#0f172a'; g.fillRect(0, 0, 384, 240);
  g.fillStyle = accento; g.fillRect(0, 0, 384, 26);
  for (let i = 0; i < 3; i++) { g.fillStyle = '#1e293b'; g.fillRect(12 + i * 122, 38, 112, 46); g.fillStyle = '#f8fafc'; g.fillRect(22 + i * 122, 50, 40 + rnd() * 40, 12); g.fillStyle = accento; g.fillRect(22 + i * 122, 68, 26 + rnd() * 30, 6); }
  for (let i = 0; i < 8; i++) { const h = 20 + rnd() * 100; g.fillStyle = i % 3 ? accento : '#f8fafc'; g.fillRect(16 + i * 22, 226 - h, 15, h); }
  g.strokeStyle = '#f8fafc'; g.lineWidth = 3; g.beginPath(); for (let i = 0; i < 8; i++) { const y = 200 - rnd() * 90 - i * 4; i ? g.lineTo(212 + i * 22, y) : g.moveTo(212, y); } g.stroke();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function schermo(g, w, h, x, y, z, accento, seme, ry = 0) {
  const p = new THREE.Group(); p.position.set(x, y, z); p.rotation.y = ry; g.add(p);
  box(p, w + 0.4, h + 0.4, 0.25, mat('#1e293b'), 0, 0, -0.14);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: dashboard(accento, seme) })); m.position.set(0, h / 2 + 0.2, 0.01); p.add(m);
  return p;
}

/* ===== [REQ-FLW-07] Showroom dell'hub: i report ufficiali ===== */
builders.showroom = (g, el, ctx) => {
  const [w, d, h] = el.dim, col = ctx.cfg.workloads.VIS.colore, vetro = mat('#bae6fd', { op: 0.22, r: 0.1 });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(g, 0.4, h, 0.4, mat('#475569'), sx * (w / 2 - 1), 0, sz * (d / 2 - 1));
  for (const sx of [-1, 1]) box(g, 0.15, h - 1, d - 2.4, vetro, sx * (w / 2 - 1), 0, 0).castShadow = false;
  box(g, w - 1.6, 0.3, d - 1.6, mat(col, { op: 0.55 }), 0, h, 0).castShadow = false;
  [-8, 0, 8].forEach((x, i) => schermo(g, 6.4, 4, x, 1, -d / 2 + 1.4, col, 3 + i));     // tre report ufficiali
  /* [REQ-FLW-07, REQ-SCN-14] passerella coperta dal laboratorio prove: i semilavorati collaudati arrivano qui */
  const [sx, sz] = el.pos, lab = ctx.cfg.elements.find((e) => e.id === 'laboratorio'), x0 = lab ? lab.pos[0] - lab.dim[0] / 2 : -24, xs = sx + w / 2;
  const tubo = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, x0 - xs, 14, 1, true), mat('#bae6fd', { op: 0.35, side: THREE.DoubleSide, r: 0.1 }));
  tubo.rotation.z = Math.PI / 2; tubo.position.set((x0 + xs) / 2 - sx, 4.6, 0); g.add(tubo);
  box(g, x0 - xs, 0.25, 1.6, mat('#374151'), (x0 + xs) / 2 - sx, 3.7, 0);
  for (const x of [xs + 1.5, (x0 + xs) / 2 - 1]) cyl(g, 0.22, 0.28, 3.7, mat('#64748b'), x - sx, 0, 0, 8);
  ctx.flows.addRoute({ punti: [[x0, 4.4, sz], [xs - 1, 4.4, sz], [xs - 3, 1.6, sz + 1]], tipo: 'semilavorato', ogni: 2.6, vel: 5,
    attivo: () => ctx.flows.lavora('TRF') && ctx.flows.lavora('VIS') && ctx.flows.alimentato() });
  for (const x of [-8, 0, 8]) { box(g, 1.6, 1, 1.6, mat('#f8fafc'), x, 0, 2.5); const r = box(g, 1.1, 0.8, 0.1, mat(ctx.cfg.materiali.report.colore, { e: '#b45309', ei: 0.4 }), x, 1.1, 2.5); r.rotation.x = -0.3; }
};

/* ===== [REQ-SCN-13] Ufficio di coordinamento: project management di tutti gli operatori ===== */
builders.ufficio = (g, el) => {
  const [w, d, h] = el.dim;
  box(g, w, 0.3, d, mat('#9ca3af')); box(g, w - 1, h - 1, d - 1, mat('#fef3c7'), 0, 0.3, 0); box(g, w - 0.4, 0.4, d - 0.4, mat('#92400e'), 0, h - 0.7, 0);
  for (const x of [-3.2, 0, 3.2]) box(g, 2, 1.6, 0.12, mat('#7dd3fc', { e: '#38bdf8', ei: 0.3 }), x, 1.8, d / 2 - 0.45);
  const tab = new THREE.Group(); tab.position.set(-w / 2 - 1, 0, d / 2 + 1.5); tab.rotation.y = 0.5; g.add(tab);   // tabellone del piano di lavoro
  for (const x of [-2.4, 2.4]) cyl(tab, 0.1, 0.1, 4, mat('#57534e'), x, 0, 0, 6);
  box(tab, 5.4, 3, 0.15, mat('#f8fafc'), 0, 1.2, 0);
  ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6'].forEach((c, i) => box(tab, 1.2 + (i * 7 % 3) * 0.7, 0.32, 0.06, mat(c), -1.6 + (i * 5 % 4) * 0.7, 3.7 - i * 0.52, 0.1));
};

/* ===== [REQ-HS-02, REQ-HS-03, REQ-HS-07] Dagli spoke del CONFIG (o del profilo) agli elementi ===== */
export function elementiSpoke(cfg) {
  const S = cfg.spoke, n = cfg.spokes.length, passo = Math.min(S.passo, S.larghezza / Math.max(n, 1));
  return cfg.spokes.map((s, i) => ({ id: 'spoke-' + i, wl: 'SSR', tipo: 'officina', nome: 'Negozio ' + s.nome, stato: s.stato || 'on',
    pos: [(i - (n - 1) / 2) * passo, S.z], dim: [Math.min(15, passo - 3), 11, 6], colore: s.colore || S.colori[i % S.colori.length], indice: i,
    fabbrica: S.fabbrica, perTe: S.perTe, gestore: 'spoke', gestoreTesto: S.gestoreTesto, tecnico: S.tecnico }));
}

/* ===== [REQ-HS-01, REQ-HS-04, REQ-HS-05, REQ-SCN-12] Negozio di uno spoke ===== */
builders.officina = (g, el, ctx) => {
  const [w, d, h] = el.dim, c = el.colore, [sx, sz] = el.pos, cap = ctx.cfg.layout.capannone;
  /* [RDM-035] un negozio: vetrina, tenda e insegna nel colore della funzione, prodotti esposti, retrobottega dei dati locali */
  const bw = w * 0.66, bx = -w * 0.14, fz = d * 0.2, bh = h * 0.72;
  box(g, w + 2, 0.2, d + 2, mat('#d6d3d1', { r: 1 }));
  box(g, bw, bh, d * 0.6, mat('#fffbeb'), bx, 0.2, -d * 0.1);                                           // negozio
  box(g, bw + 0.5, 0.35, d * 0.6 + 0.5, mat('#57534e'), bx, 0.2 + bh, -d * 0.1);
  box(g, bw * 0.92, 1.1, 0.25, mat(c), bx, 0.2 + bh + 0.35, fz - 0.1);                                  // insegna
  box(g, bw * 0.6, bh * 0.5, 0.12, mat('#bae6fd', { e: '#7dd3fc', ei: 0.35, r: 0.1, op: 0.75 }), bx - bw * 0.14, 1, fz + 0.02).castShadow = false;   // vetrina
  box(g, bw * 0.18, bh * 0.72, 0.12, mat('#334155'), bx + bw * 0.34, 0.2, fz + 0.02);                   // porta
  for (let i = 0; i < 6; i++) { const t = box(g, bw / 6, 0.14, 2.4, mat(i % 2 ? '#ffffff' : c), bx - bw / 2 + bw / 12 + (i * bw) / 6, bh * 0.78, fz + 1.05); t.rotation.x = 0.42; }   // tenda a righe
  for (let i = 0; i < 3; i++) { box(g, 0.9, 0.5, 0.5, mat('#e7e5e4'), bx - bw * 0.36 + i * 1.3, 1, fz - 0.6); const r = box(g, 0.75, 0.55, 0.08, mat(ctx.cfg.materiali.report.colore, { e: '#b45309', ei: 0.5 }), bx - bw * 0.36 + i * 1.3, 1.5, fz - 0.55); r.rotation.x = -0.25; }   // prodotti in vetrina
  const dx = w * 0.36;                                                                                  // [REQ-HS-05] retrobottega: il deposito dei dati locali
  box(g, w * 0.24, 2.4, d * 0.36, mat('#e7e5e4'), dx, 0.2, -d * 0.2); box(g, w * 0.24 + 0.4, 0.25, d * 0.36 + 0.4, mat('#78716c'), dx, 2.6, -d * 0.2);
  for (const [x, n] of [[dx - 0.9, 2], [dx + 0.6, 1]]) for (let i = 0; i < n; i++) box(g, 1.1, 0.8, 1.1, mat('#c8a26b'), x, 0.2 + i * 0.85, d * 0.08);
  const s = schermo(g, 4.6, 2.9, w * 0.12, 0.9, d * 0.46, c, 11 + el.indice * 3); for (const x of [-2, 2]) cyl(s, 0.1, 0.1, 0.9, mat('#475569'), x, -0.7, -0.1, 6); // report su misura, davanti al negozio
  [-1, 1].forEach((k, i) => { const f = figura(c, (el.indice + i) % 2 ? 'f' : 'm', null); f.position.set(w * 0.12 + k * 1.6, 0.2, d * 0.46 + 2.6); f.rotation.y = Math.PI - k * 0.35; g.add(f); ctx.animate((t) => { f.position.y = 0.2 + Math.abs(Math.sin(t * 1.5 + el.indice + i)) * 0.06; }); });
  /* [REQ-HS-04] strada e furgoni: i semilavorati arrivano dalle spedizioni */
  const L = (x, y, z) => [x - sx, y, z - sz], pts = [[16, 0.1, cap.z[1] + 1], [16, 0.1, cap.z[1] + 9], [sx - w * 0.16, 0.1, sz - d / 2 - 12], [sx - w * 0.16, 0.1, sz - d / 2 - 1]];
  for (let i = 0; i < 3; i++) {
    const A = new THREE.Vector3(...L(...pts[i])), B = new THREE.Vector3(...L(...pts[i + 1])), dir = B.clone().sub(A), len = dir.length();
    const m = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.08, len), mat('#9ca3af', { r: 1 })); m.position.copy(A).add(B).multiplyScalar(0.5); m.position.y = 0.05;
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir.normalize()); m.receiveShadow = true; g.add(m);
  }
  ctx.flows.addRoute({ punti: pts, tipo: 'furgone', ogni: 6 + (el.indice % 3), vel: 9, attivo: () => ctx.flows.lavora('SSR') && ctx.state().effettivo(ctx.state().elemento(el.id)) === 'on' });
};
