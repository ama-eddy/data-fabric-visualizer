// Flussi di materiale: nastri del capannone, camion, condotte. [REQ-FLW-08, REQ-FLW-09]
import * as THREE from 'three';
import { mat, box, cyl } from './kit.js';

export function createFlows(cfg, world) {
  const routes = [], belts = [];
  let state = null;
  const quota = new THREE.Group(); world.scene.add(quota);   // nastri e pezzi dentro il capannone seguono la quota del pavimento
  const esterno = new THREE.Group(); world.scene.add(esterno);
  const M = cfg.materiali;

  /* ===== [REQ-FLW-08] Il materiale cambia aspetto a ogni stadio ===== */
  const geo = { box: new THREE.BoxGeometry(1, 0.8, 1), cyl: new THREE.CylinderGeometry(0.45, 0.45, 0.8, 10), sfera: new THREE.SphereGeometry(0.42, 10, 8), pacco: new THREE.BoxGeometry(1.2, 0.9, 1.2), nastro: new THREE.BoxGeometry(1.26, 0.2, 0.3) };
  const grezzi = ['#9ca3af', '#a8a29e', '#78716c', '#94a3b8', '#a3a3a3'];
  const pezzo = {
    grezzo() { const g = [geo.box, geo.cyl, geo.sfera][Math.floor(Math.random() * 3)]; const m = new THREE.Mesh(g, mat(grezzi[Math.floor(Math.random() * grezzi.length)])); m.rotation.y = Math.random() * 3; return m; },
    bronze: () => new THREE.Mesh(geo.box, mat(M.bronze.colore, { m: 0.55, r: 0.45 })),
    silver: () => new THREE.Mesh(geo.box, mat(M.silver.colore, { m: 0.75, r: 0.25 })),
    gold: () => new THREE.Mesh(geo.box, mat(M.gold.colore, { m: 0.7, r: 0.3, e: '#a16207', ei: 0.25 })),
    semilavorato() { const g = new THREE.Group(); g.add(new THREE.Mesh(geo.pacco, mat(M.semilavorato.colore, { e: '#0891b2', ei: 0.3 }))); const n = new THREE.Mesh(geo.nastro, mat('#ffffff')); n.position.y = 0.4; g.add(n); return g; },
    impulso: () => new THREE.Mesh(geo.sfera, mat('#e0f2fe', { e: '#38bdf8', ei: 1.4 })),
    evento: () => new THREE.Mesh(geo.sfera, mat('#ffedd5', { e: '#f97316', ei: 1.6 })),
    camion() { return camion(false); }, officina() { return camion(true); },
    galleggiante() { const g = new THREE.Group(), p = pezzo.grezzo(); p.position.y = 0.1; g.add(p); g.userData.galleggia = true; return g; },
    scialuppa() {                                                      // [RDM-019] la scialuppa del materiale pre-lavorato
      const g = new THREE.Group(), c = cfg.modalita.dataflow.colore;
      const scafo = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 0.9, 0.8, 4, 1), mat(c)); scafo.scale.set(1, 1, 2.4); scafo.rotation.y = Math.PI / 4; scafo.position.y = 0.2; g.add(scafo);
      for (const z of [-1, 0.4]) { const p = pezzo.grezzo(); p.position.set(0, 0.95, z); g.add(p); }
      box(g, 0.1, 2, 0.1, mat('#78350f'), 0, 0.6, 1.2); const v = box(g, 0.05, 1.2, 1.2, mat('#fef3c7'), 0, 1.3, 0.6); v.castShadow = false;
      g.userData.galleggia = true; return g; },
    furgone() {                                                        // [REQ-HS-04] consegna dei semilavorati agli spoke
      const g = new THREE.Group(); box(g, 1.9, 1.5, 1.5, mat('#f8fafc'), 0, 0.5, 1.7); box(g, 1.7, 0.55, 0.1, mat('#bae6fd'), 0, 1.35, 2.47); box(g, 2, 0.3, 3.4, mat('#374151'), 0, 0.5, -0.8);
      for (const z of [-1.7, -0.3]) { const p = pezzo.semilavorato(); p.position.set(0, 1.25, z); g.add(p); }
      for (const z of [-1.8, 1.6]) for (const x of [-0.95, 0.95]) { const w = cyl(g, 0.42, 0.42, 0.3, mat('#111827'), x, 0, z, 10); w.rotation.z = Math.PI / 2; w.position.y = 0.42; }
      return g; },
  };
  function camion(officina) {
    const g = new THREE.Group(), c = cfg.modalita[officina ? 'dataflow' : 'copy'].colore;
    box(g, 2, 1.6, 1.6, mat(c), 0, 0.5, 1.9); box(g, 1.8, 0.6, 0.1, mat('#bae6fd'), 0, 1.4, 2.72);
    box(g, 2.1, 0.3, 4, mat('#374151'), 0, 0.5, -0.9);
    if (officina) { box(g, 2, 1.7, 3.6, mat('#fde68a'), 0, 0.8, -0.9); cyl(g, 0.22, 0.22, 0.9, mat('#57534e'), 0.5, 2.5, -1.8, 8); }
    else for (const z of [-2.1, -0.9, 0.3]) { const p = pezzo.grezzo(); p.position.set(0, 1.2, z); g.add(p); }
    for (const z of [-2, 1.8]) for (const x of [-1, 1]) { const w = cyl(g, 0.45, 0.45, 0.3, mat('#111827'), x, 0, z, 10); w.rotation.z = Math.PI / 2; w.position.y = 0.45; }
    g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    return g;
  }

  /* Percorso: punti [x,y,z]; tipo = pezzo o veicolo; attivo() decide se il materiale si muove */
  function addRoute(r) {
    const path = new THREE.CurvePath();
    const v = r.punti.map((p) => new THREE.Vector3(...p));
    for (let i = 0; i < v.length - 1; i++) path.add(new THREE.LineCurve3(v[i], v[i + 1]));
    const route = { ogni: 1.7, vel: 5, ...r, path, len: path.getLength(), t: Math.random() * (r.ogni || 1.7), items: [], parent: r.dentro ? quota : esterno };
    routes.push(route); return route;
  }

  /* Nastro trasportatore dentro il capannone, visibile quando il suo workload è 'on' */
  function addBelt(a, b, wl) {
    const g = new THREE.Group(); quota.add(g);
    const dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz);
    const m = box(g, 1.7, 0.3, len, mat('#374151'), (a[0] + b[0]) / 2, 0.75, (a[1] + b[1]) / 2); m.rotation.y = Math.atan2(dx, dz);
    for (const s of [-1, 1]) { const r = box(g, 0.12, 0.2, len, mat('#facc15'), (a[0] + b[0]) / 2 + s * 0.85 * Math.cos(m.rotation.y), 1.0, (a[1] + b[1]) / 2 - s * 0.85 * Math.sin(m.rotation.y)); r.rotation.y = m.rotation.y; }
    const n = Math.max(1, Math.round(len / 4));
    for (let i = 0; i <= n; i++) box(g, 1.2, 0.75, 0.25, mat('#6b7280'), a[0] + (dx * i) / n, 0, a[1] + (dz * i) / n);
    g.visible = false; belts.push({ g, wl });
  }

  /* ===== [REQ-FLW-02…06] Corsie del capannone dal CONFIG ===== */
  const F = cfg.flussi, Y = 1.45;
  const alimentato = (tipo) => state.recs.some((r) => r.el.tipo === 'sorgente' && state.effettivo(r) === 'on' && (tipo === 'landing' ? cfg.modalita[r.el.modalita].landing : r.el.modalita !== 'streaming'));
  /* [REQ-WL-06] un workload "lavora" solo se è 'on' e lo sono anche tutti quelli a monte: altrimenti resta fermo */
  const lavora = (w) => state.stato[w] === 'on' && cfg.workloads[w].deps.every(lavora);
  const regola = (t) => () => t.richiede.every(lavora) && alimentato(t.alimentato);
  for (const t of F.tratti) for (const x of F.corsie) {
    addBelt([x, t.z[0]], [x, t.z[1]], t.wl);
    addRoute({ punti: [[x, Y, t.z[0]], [x, Y, t.z[1]]], tipo: t.materiale, dentro: true, attivo: regola(t), t0: Math.abs(x) * 0.03 });
  }
  for (const u of F.uscite) { addBelt(u.punti[0], u.punti[1], u.wl);
    addRoute({ punti: u.punti.map(([x, z]) => [x, Y, z]), tipo: u.materiale, dentro: true, attivo: regola(u), ogni: 2.4 }); }

  function collega(st) {
    state = st;
    const sync = () => {
      quota.position.y = st.stato.ARC === 'on' ? cfg.layout.capannone.pavimento : 0;
      for (const b of belts) b.g.visible = st.stato[b.wl] === 'on';
    };
    st.onChange(sync); sync();
  }

  function update(dt, pausa) {
    for (const r of routes) {
      const on = r.attivo();
      if (!on && r.items.length) { for (const it of r.items) r.parent.remove(it.o); r.items.length = 0; }   // [REQ-FLW-09] il flusso si ferma
      if (!on || pausa) continue;
      r.t += dt;
      if (r.t >= r.ogni) { r.t = 0; const o = pezzo[r.tipo](); o.traverse?.((m) => { if (m.isMesh) m.castShadow = true; }); r.parent.add(o); r.items.push({ o, u: 0 }); }
      for (let i = r.items.length - 1; i >= 0; i--) {
        const it = r.items[i]; it.u += (dt * r.vel) / r.len;
        if (it.u >= 1) { r.parent.remove(it.o); r.items.splice(i, 1); continue; }
        r.path.getPointAt(it.u, it.o.position);
        if (it.o.userData.galleggia) { it.o.position.y += Math.sin(performance.now() / 300 + i) * 0.08; it.o.rotation.z = Math.sin(performance.now() / 500 + i) * 0.08; }
        if (r.tipo === 'camion' || r.tipo === 'officina' || r.tipo === 'furgone' || r.tipo === 'scialuppa') { const tg = r.path.getTangentAt(it.u); it.o.rotation.y = Math.atan2(tg.x, tg.z); }
      }
    }
  }
  return { addRoute, collega, update, routes, lavora: (w) => !!state && lavora(w), alimentato: () => !!state && alimentato('bronze'), conta: () => routes.reduce((s, r) => s + r.items.length, 0) };
}
