// Workload trasversali (Accessi, Security, Governance, Monitoraggio, Costi) e opzionali (Real-Time, Knowledge).
// [REQ-SCN-03] avvolgono la fabbrica · [REQ-SCN-05] Real-Time e Knowledge in edifici separati ai lati
import * as THREE from 'three';
import { mat, box, cyl } from './kit.js';
import { builders } from './builders.js';
import { dashboard } from './spoke.js';

const sfera = (g, r, m, x, y, z) => { const s = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), m); s.position.set(x, y, z); s.castShadow = true; g.add(s); return s; };
const linea = (g, a, b, r, m) => { const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b), d = B.clone().sub(A), len = d.length(); const c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 8), m); c.position.copy(A).add(B).multiplyScalar(0.5); c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()); g.add(c); return c; };

/* ===== Accessi: cancello con sbarra, tornelli e badge ===== */
builders.cancelli = (g, el, ctx) => {
  const c = ctx.cfg.workloads.ACC.colore;
  for (const x of [-3.2, 3.2]) box(g, 0.8, 4.6, 0.8, mat('#334155'), x, 0, 0);
  box(g, 7.2, 0.7, 0.9, mat(c), 0, 4.6, 0);
  const perno = new THREE.Group(); perno.position.set(-2.7, 1.3, 0.6); g.add(perno);
  const sbarra = box(perno, 5.2, 0.22, 0.22, mat('#f8fafc'), 2.6, 0, 0); box(perno, 1, 0.24, 0.24, mat('#dc2626'), 1.2, 0, 0); box(perno, 1, 0.24, 0.24, mat('#dc2626'), 3.6, 0, 0);
  ctx.animate((t) => { const aperto = ctx.flows.lavora('ACC'); perno.rotation.z += ((aperto ? 1.25 : 0) - perno.rotation.z) * 0.05; sbarra.visible = true; });
  box(g, 2.6, 3, 2.6, mat('#e0f2fe'), -6.2, 0, 0.4); box(g, 3, 0.25, 3, mat(c), -6.2, 3, 0.4); box(g, 1.6, 1, 0.1, mat('#7dd3fc', { e: '#38bdf8', ei: 0.3 }), -6.2, 1.3, 1.72);   // portineria
  for (const x of [5.2, 7]) { box(g, 0.5, 1.2, 1.4, mat('#64748b', { m: 0.6, r: 0.4 }), x, 0, 0.4); const b = box(g, 1.3, 0.1, 0.1, mat('#f8fafc'), x + 0.65, 0.9, 0.4); ctx.animate((t) => { b.rotation.y = ctx.flows.lavora('ACC') ? t * 1.5 + x : 0; }); }  // tornelli
  box(g, 0.3, 1.5, 0.3, mat('#334155'), 4.3, 0, 1.4); box(g, 0.45, 0.35, 0.1, mat('#4ade80', { e: '#22c55e', ei: 0.9 }), 4.3, 1.5, 1.5);                                          // lettore di badge
};

/* ===== Security: recinzione perimetrale con telecamere ===== */
builders.recinzione = (g, el, ctx) => {
  const [w, d, h] = el.dim, c = ctx.cfg.workloads.SEC.colore, rete = mat('#94a3b8', { op: 0.3 }), palo = mat('#475569');
  const lato = (x0, z0, x1, z1) => {
    const len = Math.hypot(x1 - x0, z1 - z0), n = Math.max(1, Math.round(len / 6));
    for (let i = 0; i <= n; i++) cyl(g, 0.12, 0.12, h, palo, x0 + ((x1 - x0) * i) / n, 0, z0 + ((z1 - z0) * i) / n, 6);
    const p = box(g, Math.abs(x1 - x0) || 0.06, h - 0.3, Math.abs(z1 - z0) || 0.06, rete, (x0 + x1) / 2, 0.15, (z0 + z1) / 2); p.castShadow = false;
    box(g, Math.abs(x1 - x0) || 0.12, 0.12, Math.abs(z1 - z0) || 0.12, mat(c), (x0 + x1) / 2, h, (z0 + z1) / 2);
  };
  const X = w / 2, Z0 = -d / 2, Z1 = el.fronte;
  lato(-X, Z0, -68, Z0); lato(68, Z0, X, Z0);            // sul fondo passano scivoli, condotte e ponti: il varco è largo
  lato(-X, Z0, -X, Z1); lato(X, Z0, X, Z1);
  lato(-X, Z1, 9.5, Z1); lato(22.5, Z1, X, Z1);          // sul fronte, il varco del cancello
  for (const [x, z] of [[-X, Z0], [X, Z0], [-X, Z1], [X, Z1]]) {                                        // telecamere
    cyl(g, 0.18, 0.22, 6.5, palo, x, 0, z, 8);
    const t = new THREE.Group(); t.position.set(x, 6.6, z); g.add(t);
    box(t, 0.6, 0.5, 1.3, mat('#f8fafc'), 0, 0, 0.5); box(t, 0.3, 0.3, 0.1, mat('#ef4444', { e: '#dc2626', ei: 1 }), 0, 0.1, 1.16);
    const base = Math.atan2(-x, -z); ctx.animate((time) => { t.rotation.y = base + Math.sin(time * 0.6 + x) * 0.7; });
  }
};
/* ===== Security: caveau per il materiale riservato ===== */
builders.caveau = (g, el, ctx) => {
  const [w, d, h] = el.dim;
  box(g, w, h, d, mat('#475569', { m: 0.5, r: 0.5 })); box(g, w + 0.6, 0.5, d + 0.6, mat('#1e293b'), 0, h, 0);
  const porta = cyl(g, 1.7, 1.7, 0.4, mat('#cbd5e1', { m: 0.85, r: 0.2 }), 0, 0, 0, 24); porta.rotation.x = Math.PI / 2; porta.position.set(0, 2.4, d / 2 + 0.2);
  const volante = new THREE.Group(); volante.position.set(0, 2.4, d / 2 + 0.5); g.add(volante);
  for (let i = 0; i < 3; i++) { const r = box(volante, 2, 0.16, 0.16, mat('#334155'), 0, -0.08, 0); r.rotation.z = (i * Math.PI) / 3; }
  ctx.animate((t) => { volante.rotation.z = Math.sin(t * 0.5) * 0.8; });
  box(g, 0.5, 0.5, 0.1, mat(ctx.cfg.workloads.SEC.colore, { e: '#dc2626', ei: 0.8 }), w / 2 - 1, h - 1.2, d / 2 + 0.06);
};

/* ===== Governance: torre di controllo con cabina e marchio di qualità ===== */
builders.torre = (g, el, ctx) => {
  const [w, , h] = el.dim, c = ctx.cfg.workloads.GOV.colore;
  cyl(g, w * 0.28, w * 0.36, h - 4, mat('#e2e8f0'), 0, 0, 0, 16);
  cyl(g, w * 0.62, w * 0.45, 0.6, mat('#475569'), 0, h - 4, 0, 16);
  cyl(g, w * 0.55, w * 0.62, 2.6, mat('#7dd3fc', { op: 0.6, e: '#38bdf8', ei: 0.25, r: 0.1 }), 0, h - 3.4, 0, 16).castShadow = false;   // cabina di controllo
  cyl(g, w * 0.66, w * 0.6, 0.5, mat(c), 0, h - 0.8, 0, 16);
  const faro = new THREE.Group(); faro.position.y = h - 0.1; g.add(faro);
  cyl(faro, 0.3, 0.3, 0.7, mat('#fde047', { e: '#facc15', ei: 1.2 }), 0, 0, 0, 10); box(faro, 2.6, 0.12, 0.12, mat('#fde047', { e: '#facc15', ei: 1 }), 1.3, 0.3, 0);
  ctx.animate((t) => { faro.rotation.y = t * 1.6; });
  const m = cyl(g, 1.5, 1.5, 0.25, mat('#22c55e', { e: '#16a34a', ei: 0.5 }), 0, 0, 0, 24); m.rotation.x = Math.PI / 2; m.position.set(0, 6, w * 0.34 + 0.2);               // marchio di qualità
  const v1 = box(g, 0.9, 0.22, 0.1, mat('#ffffff'), -0.45, 5.7, w * 0.34 + 0.4); v1.rotation.z = -0.8; const v2 = box(g, 1.5, 0.22, 0.1, mat('#ffffff'), 0.35, 6, w * 0.34 + 0.4); v2.rotation.z = 0.9;
};
/* ===== [REQ-SCN-09] Governance: lo sportello dell'hub, dove le funzioni chiedono, segnalano, entrano ===== */
builders.sportello = (g, el, ctx) => {
  const [w, d, h] = el.dim, c = ctx.cfg.workloads.GOV.colore;
  box(g, w, 0.25, d + 3, mat('#d6d3d1', { r: 1 }), 0, 0, 1.5);
  box(g, w - 1, h - 1, d - 1, mat('#f5f3ff'), 0, 0.25, 0);
  const t = box(g, w, 0.3, 3.4, mat(c), 0, h - 1.3, d / 2 + 1); t.rotation.x = 0.25;                                              // tettoia
  box(g, w - 4, 1.8, 0.15, mat('#1e1b4b'), 0, 1.5, d / 2 - 0.45); box(g, w - 3.4, 0.25, 1.2, mat('#a78bfa'), 0, 1.3, d / 2 + 0.1);   // banco
  const q = cyl(g, 1.1, 1.1, 0.3, mat('#fde047', { e: '#facc15', ei: 0.7 }), 0, 0, 0, 20); q.rotation.x = Math.PI / 2; q.position.set(0, h + 0.6, d / 2 - 0.4);
  for (const x of [-2.5, 0, 2.5]) cyl(g, 0.1, 0.1, 1.1, mat('#a16207'), x, 0.25, d / 2 + 3, 6);                                   // fila
  box(g, 5.2, 0.08, 0.08, mat('#dc2626'), 0, 1.25, d / 2 + 3);
};

/* ===== Monitoraggio: sala controllo con una spia per ogni workload ===== */
builders.salacontrollo = (g, el, ctx) => {
  const [w, d, h] = el.dim, cfg = ctx.cfg;
  box(g, w, h - 1, d, mat('#134e4a')); box(g, w + 0.6, 0.4, d + 0.6, mat('#0f172a'), 0, h - 1, 0);
  cyl(g, 0.1, 0.1, 4, mat('#64748b'), w / 2 - 1.5, h - 0.6, -1, 6); sfera(g, 0.3, mat('#ef4444', { e: '#dc2626', ei: 1 }), w / 2 - 1.5, h + 3.5, -1);
  const q = new THREE.Group(); q.position.set(w / 2 + 0.05, 0, 0); q.rotation.y = Math.PI / 2; g.add(q);                           // quadro delle spie, rivolto al capannone
  box(q, d - 1.4, h - 2.4, 0.2, mat('#020617'), 0, 1, 0);
  const spie = cfg.ordine.map((k, i) => { const s = box(q, 0.8, 0.8, 0.12, mat('#1e293b', { e: '#000000', ei: 1 }).clone(), -2.4 + (i % 4) * 1.6, 3.4 - Math.floor(i / 4) * 1.15, 0.14); return { k, s }; });
  /* verde = lavora · rosso = acceso ma fermo (manca un workload a monte) · giallo = cantiere · spento = off */
  ctx.animate((t) => { const st = ctx.state().stato; for (const { k, s } of spie) { const c = st[k] === 'off' ? 0x111827 : st[k] === 'wip' ? 0xf59e0b : ctx.flows.lavora(k) ? 0x22c55e : 0xef4444; s.material.emissive.setHex(c); s.material.emissiveIntensity = st[k] === 'on' && !ctx.flows.lavora(k) ? 0.6 + 0.6 * Math.abs(Math.sin(t * 5)) : 0.9; } });
};

/* ===== Monitoraggio costi: contatori dell'energia ===== */
builders.contatori = (g, el, ctx) => {
  const [w, d] = el.dim, c = ctx.cfg.workloads.FIN.colore;
  box(g, w, 0.3, d, mat('#9ca3af'));
  [-3, 0, 3].forEach((x, i) => {
    box(g, 2.2, 3.2, 1, mat('#f8fafc'), x, 0.3, 0);
    const q = cyl(g, 0.85, 0.85, 0.12, mat('#fef9c3'), x, 0, 0, 20); q.rotation.x = Math.PI / 2; q.position.set(x, 2.5, 0.56);
    const p = new THREE.Group(); p.position.set(x, 2.5, 0.66); g.add(p); box(p, 0.08, 0.75, 0.05, mat('#dc2626'), 0, 0, 0);
    box(g, 1.4, 0.4, 0.1, mat(c, { e: '#a16207', ei: 0.5 }), x, 1, 0.52);
    ctx.animate((t, dt) => { const n = ctx.cfg.ordine.filter((k) => ctx.flows.lavora(k)).length; p.rotation.z -= dt * (0.15 + n * 0.22) * (1 + i * 0.3); });   // più reparti lavorano, più consuma
  });
};

/* ===== Real-Time: sala sensori, lavora il materiale in diretta ===== */
builders.salasensori = (g, el, ctx) => {
  const [w, d, h] = el.dim, c = ctx.cfg.workloads.RTI.colore;
  box(g, w, 0.3, d, mat('#9ca3af')); box(g, w - 1.5, h - 2, d - 1.5, mat('#1c1917'), 0, 0.3, 0); box(g, w - 1, 0.4, d - 1, mat(c, { e: '#c2410c', ei: 0.5 }), 0, h - 1.7, 0);
  const s = new THREE.Mesh(new THREE.PlaneGeometry(d - 4, h - 4.4), new THREE.MeshBasicMaterial({ map: dashboard(c, 41) })); s.rotation.y = -Math.PI / 2; s.position.set(-(w - 1.5) / 2 - 0.02, (h - 2) / 2 + 0.5, 0); g.add(s);   // schermo verso il capannone
  const piv = new THREE.Group(); piv.position.set(0, h - 1.3, 0); g.add(piv); cyl(piv, 0.3, 0.45, 2, mat('#64748b'), 0, 0, 0, 10);
  const piatto = new THREE.Mesh(new THREE.SphereGeometry(2.4, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2.6), mat('#e7e5e4', { side: THREE.DoubleSide })); piatto.rotation.x = Math.PI * 0.72; piatto.position.y = 3.2; piv.add(piatto);
  ctx.animate((t) => { if (ctx.flows.lavora('RTI')) piv.rotation.y = t * 0.9; });
};

/* ===== Knowledge: ufficio tecnico e archivio, la mappa di come le cose sono collegate ===== */
builders.archiviotecnico = (g, el, ctx) => {
  const [w, d, h] = el.dim, c = ctx.cfg.workloads.KNW.colore, [sx, sz] = el.pos;
  box(g, w, 0.3, d, mat('#9ca3af')); box(g, w - 1.5, h - 4, d - 1.5, mat('#fef3c7'), 0, 0.3, 0); box(g, w - 1, 0.4, d - 1, mat(c), 0, h - 3.7, 0);
  for (let i = 0; i < 4; i++) for (const y of [1.6, 4]) box(g, 0.12, 1.5, 1.6, mat('#7dd3fc', { e: '#38bdf8', ei: 0.25 }), -(w - 1.5) / 2 - 0.02, y, -d / 2 + 2.4 + i * 2.5);
  const rete = new THREE.Group(); rete.position.y = h - 0.6; g.add(rete);                                                          // la mappa: nodi e collegamenti
  const nodi = [[0, 2.2, 0], [-2.6, 0.8, 1.2], [2.4, 1, -1.4], [0.6, 0.2, 2.6], [-1.4, 3.6, -1.8], [2.6, 3.4, 1.6]];
  const mn = mat('#fbbf24', { e: '#d97706', ei: 0.7 }), ml = mat('#78350f');
  nodi.forEach((n, i) => sfera(rete, i ? 0.5 : 0.75, mn, ...n));
  for (const [a, b] of [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 3], [2, 5], [4, 5]]) linea(rete, nodi[a], nodi[b], 0.08, ml);
  ctx.animate((t) => { rete.rotation.y = t * 0.25; });
  /* [REQ-FLW-11] collegamenti con il Gold e con il confezionamento dei semilavorati */
  const coll = mat('#fbbf24', { e: '#d97706', ei: 0.8, op: 0.85 });
  for (const z of [3, 14]) { linea(g, [-(w - 1.5) / 2, h - 5, 0], [30 - sx, 7, z - sz], 0.14, coll).castShadow = false; sfera(g, 0.45, mn, 30 - sx, 7, z - sz); linea(g, [30 - sx, 7, z - sz], [30 - sx, 1, z - sz], 0.1, coll); }
};
