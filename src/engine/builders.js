// Costruttori 3D degli elementi. Ogni costruttore riceve (gruppo, elemento, contesto) e disegna
// con l'origine al centro della base dell'elemento. ctx.animate(fn) registra un'animazione continua.
import * as THREE from 'three';
import { mat, box, cyl, stripeTexture } from './kit.js';

export const builders = {
  /* ===== [REQ-SCN-04] Capannone dell'hub: fondamenta, pavimento, struttura ===== */
  capannone(g, el, ctx) {
    const [w, d, h] = el.dim, fy = ctx.cfg.layout.capannone.pavimento;
    box(g, w + 2, 0.4, d + 2, mat('#94a3b8'), 0, 0, 0);                 // fondamenta
    box(g, w, fy - 0.4, d, mat('#e2e8f0'), 0, 0.4, 0);                  // pavimento
    const steel = mat('#475569', { m: 0.5, r: 0.5 });
    const xs = [-w / 2, -w / 4, 0, w / 4, w / 2], zs = [];
    for (let z = -d / 2; z <= d / 2 + 0.01; z += d / 5) zs.push(z);
    for (const z of zs) for (const x of [-w / 2, w / 2]) cyl(g, 0.45, 0.45, h, steel, x, fy, z, 10);
    for (const x of xs.slice(1, -1)) for (const z of [-d / 2, d / 2]) cyl(g, 0.45, 0.45, h, steel, x, fy, z, 10);
    for (const z of zs) box(g, w + 1, 0.5, 0.5, steel, 0, fy + h, z);   // travi del tetto
    for (const x of [-w / 2, w / 2]) box(g, 0.5, 0.5, d + 1, steel, x, fy + h, 0);
    box(g, 0.5, 0.5, d + 1, steel, 0, fy + h + 1.6, 0);                 // colmo
    for (const z of zs) for (const s of [-1, 1]) {                      // falde del tetto (solo travi: l'interno resta visibile)
      const b = box(g, w / 2 + 0.6, 0.35, 0.35, steel, s * w / 4, fy + h + 0.8, z);
      b.rotation.z = -s * Math.atan2(1.6, w / 2);
    }
    const wall = mat('#cbd5e1');
    box(g, w, 1.4, 0.4, wall, 0, fy, -d / 2);                           // muretti sul fondo e ai lati
    for (const x of [-w / 2, w / 2]) box(g, 0.4, 1.4, d, wall, x, fy, 0);
  },

  /* ===== [REQ-SCN-04] Riserva d'acqua unica sotto il pavimento, con condotte verso gli spoke ===== */
  riserva(g, el) {
    const [w, d] = el.dim, water = mat('#38bdf8', { e: '#0284c7', ei: 0.5, r: 0.3 });
    box(g, w, 0.35, d, water, 0, 0.02, 0);
    for (const x of [-24, 0, 24]) {                                     // condotte verso le officine
      const p = cyl(g, 0.55, 0.55, 26, water, x, 0.1, d / 2 + 13, 12); p.rotation.x = Math.PI / 2; p.position.y = 0.6;
    }
  },

  /* ===== [REQ-SCN-04] Centrale elettrica: energia per tutti i reparti ===== */
  centrale(g, el, ctx) {
    const [w, d, h] = el.dim;
    box(g, w, 0.3, d, mat('#9ca3af'));
    box(g, w * 0.5, h * 0.5, d * 0.6, mat('#64748b'), -w * 0.2, 0.3, d * 0.1);
    box(g, w * 0.5 + 0.6, 0.4, d * 0.6 + 0.6, mat('#334155'), -w * 0.2, 0.3 + h * 0.5, d * 0.1);
    const tower = mat('#e5e7eb');
    for (const z of [-d * 0.22, d * 0.24]) {
      const pts = []; for (let i = 0; i <= 10; i++) { const t = i / 10; pts.push(new THREE.Vector2(3.2 - 1.5 * Math.sin(t * Math.PI * 0.85), t * h)); }
      const t = new THREE.Mesh(new THREE.LatheGeometry(pts, 20), mat('#e5e7eb', { side: THREE.DoubleSide }));
      t.position.set(w * 0.25, 0.3, z); t.castShadow = true; g.add(t);
    }
    const lamp = cyl(g, 0.35, 0.35, 0.5, mat('#fde047', { e: '#facc15', ei: 1 }), -w * 0.2, 0.7 + h * 0.5, d * 0.1, 10);
    ctx.animate((t) => { lamp.material.emissiveIntensity = 0.6 + 0.6 * Math.sin(t * 3); });
    // linea elettrica verso il capannone
    const pole = mat('#475569');
    for (const x of [w / 2 + 3, w / 2 + 11]) { cyl(g, 0.2, 0.25, 9, pole, x, 0, 0, 8); box(g, 0.25, 0.25, 3, pole, x, 8.2, 0); }
    const pts = [[-w * 0.2, 0.3 + h * 0.5 + 0.6, d * 0.1], [w / 2 + 3, 8.4, 0], [w / 2 + 11, 8.4, 0], [w / 2 + 17, 9.5, 0]].map((p) => new THREE.Vector3(...p));
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x1f2937 })));
  },

  /* ===== [REQ-SCN-10] Laboratorio prove: le modifiche si provano qui prima della produzione ===== */
  laboratorio(g, el) {
    const [w, d, h] = el.dim;
    box(g, w, 0.3, d, mat('#9ca3af'));
    box(g, w - 1, h * 0.75, d - 1, mat('#f1f5f9'), 0, 0.3, 0);
    for (let i = 0; i < 3; i++) {                                       // tetto a shed
      const x = -w / 2 + 1 + (i + 0.5) * (w - 2) / 3;
      const r = box(g, (w - 2) / 3, 0.3, d - 1, mat('#64748b'), x, 0.3 + h * 0.75 + 0.6, 0); r.rotation.z = 0.35;
    }
    for (const x of [-w / 2 + 0.4, w / 2 - 0.4]) box(g, 0.25, h * 0.4, d * 0.5, mat('#7dd3fc', { e: '#0ea5e9', ei: 0.25, r: 0.2 }), x, 1.4, 0); // vetrate
    for (const x of [-w * 0.25, w * 0.25]) { box(g, 2.4, 1, 1.4, mat('#cbd5e1'), x, 0.3, d / 2 + 1.4); cyl(g, 0.35, 0.5, 1, mat('#a3e635', { e: '#65a30d', ei: 0.4 }), x, 1.3, d / 2 + 1.4, 10); } // banchi prova
  },

  /* ===== Segnaposto: volume provvisorio nel colore del workload (batch successivi, vedi PIANO.md) ===== */
  segnaposto(g, el, ctx) {
    const [w, d, h] = el.dim, c = ctx.cfg.workloads[el.wl].colore;
    const m = box(g, w, h, d, mat(c, { op: 0.42, r: 0.6 })); m.castShadow = false;
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), new THREE.LineBasicMaterial({ color: c }));
    e.position.y = h / 2; g.add(e);
  },
};

/* ===== [REQ-WL-03] Cantiere: rappresentazione generica di un elemento in stato WIP ===== */
let tape;
export function buildCantiere(g, el, ctx) {
  const [w, d, h0] = el.dim, h = Math.max(4, Math.min(h0, 12));
  tape = tape || stripeTexture();
  box(g, w + 3, 0.12, d + 3, mat('#e7d3a8'));                           // sterrato
  const post = mat('#f59e0b'), tapeMat = new THREE.MeshBasicMaterial({ map: tape });
  const hw = w / 2 + 1.5, hd = d / 2 + 1.5;
  const side = (len, x, z, rot) => {
    const n = Math.max(2, Math.round(len / 6));
    for (let i = 0; i <= n; i++) { const o = -len / 2 + (i * len) / n; cyl(g, 0.12, 0.12, 1.5, post, rot ? x : o, 0, rot ? o : z, 6); }
    const t = new THREE.Mesh(new THREE.BoxGeometry(rot ? 0.06 : len, 0.3, rot ? len : 0.06), tapeMat); t.position.set(x, 1.2, z); g.add(t);
  };
  side(2 * hw, 0, -hd, false); side(2 * hw, 0, hd, false); side(2 * hd, -hw, 0, true); side(2 * hd, hw, 0, true);
  const tube = mat('#94a3b8', { m: 0.6, r: 0.4 });                      // impalcatura
  const nx = Math.max(1, Math.round(w / 9)), nz = Math.max(1, Math.round(d / 9)), levels = Math.max(1, Math.round(h / 3.5));
  for (let i = 0; i <= nx; i++) for (const z of [-d / 2, d / 2]) cyl(g, 0.1, 0.1, h, tube, -w / 2 + (i * w) / nx, 0.1, z, 6);
  for (let j = 1; j < nz; j++) for (const x of [-w / 2, w / 2]) cyl(g, 0.1, 0.1, h, tube, x, 0.1, -d / 2 + (j * d) / nz, 6);
  for (let l = 1; l <= levels; l++) {
    const y = (l * h) / levels;
    for (const z of [-d / 2, d / 2]) box(g, w, 0.14, 0.14, tube, 0, y, z);
    for (const x of [-w / 2, w / 2]) box(g, 0.14, 0.14, d, tube, x, y, 0);
  }
  const part = box(g, w * 0.55, h * 0.45, d * 0.55, mat('#d6d3d1'), -w * 0.1, 0.12, 0); part.castShadow = true; // muri a metà
  const crane = new THREE.Group(); crane.position.set(w / 2 + 0.2, 0, -d / 2 - 0.2); g.add(crane);      // gru
  const yel = mat('#facc15', { r: 0.5 }), ch = h + 8;
  box(crane, 0.8, ch, 0.8, yel);
  const jib = new THREE.Group(); jib.position.y = ch; crane.add(jib);
  const len = Math.min(Math.max(w, d) * 0.7, 22);
  box(jib, len, 0.5, 0.5, yel, -len / 2 + 2, 0, 0); box(jib, 2, 1.2, 1.2, mat('#57534e'), 3, -0.3, 0);
  const hook = box(jib, 0.08, 4, 0.08, mat('#1f2937'), -len * 0.6, -4, 0);
  ctx.animate((t) => { jib.rotation.y = Math.sin(t * 0.35 + el.pos[0]) * 0.9; hook.scale.y = 1 + 0.3 * Math.sin(t * 0.8); });
}
