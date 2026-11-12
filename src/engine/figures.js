// Figure stilizzate: team dati (hub) e persone delle funzioni (spoke). [REQ-SCN-11, REQ-SCN-12]
import * as THREE from 'three';
import { mat, box, cyl } from './kit.js';

/* Due sagome: 'm' corpo dritto, 'f' corpo a campana con coda. Con casco per il team dati. */
export function figura(colore, sesso, casco) {
  const g = new THREE.Group(), pelle = mat('#f1c9a5'), c = mat(colore);
  if (sesso === 'f') { cyl(g, 0.3, 0.62, 1.5, c, 0, 0.35, 0, 12); for (const x of [-0.18, 0.18]) box(g, 0.16, 0.4, 0.16, mat('#334155'), x, 0, 0); }
  else { cyl(g, 0.42, 0.42, 1.15, c, 0, 0.7, 0, 12); for (const x of [-0.2, 0.2]) box(g, 0.24, 0.72, 0.26, mat('#334155'), x, 0, 0); }
  const testa = new THREE.Mesh(new THREE.SphereGeometry(0.34, 12, 10), pelle); testa.position.y = 2.2; g.add(testa);
  if (sesso === 'f') { const coda = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), mat('#78350f')); coda.position.set(0, 2.25, -0.38); g.add(coda); }
  if (casco) { const k = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat(casco)); k.position.y = 2.28; g.add(k); }
  else { const k = new THREE.Mesh(new THREE.SphereGeometry(0.36, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2.2), mat(sesso === 'f' ? '#78350f' : '#44403c')); k.position.y = 2.24; g.add(k); }
  g.scale.setScalar(1.35);
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}
const elenco = (d) => [...Array(d.m || 0).fill('m'), ...Array(d.f || 0).fill('f')];

export function createFigures(cfg, world, state, flows) {
  const T = cfg.team, cap = cfg.layout.capannone;
  const quota = (x, z) => (state.stato.ARC === 'on' && x > cap.x[0] && x < cap.x[1] && z > cap.z[0] && z < cap.z[1] ? cap.pavimento : 0);
  const scivoli = () => cfg.elements.filter((e) => e.tipo === 'trasporto' && (e.modalita === 'copy' || e.modalita === 'dataflow') && state.effettivo(state.elemento(e.id)) !== 'off').map((e) => e.pos[0]);

  /* ===== [REQ-SCN-11] Una figura per persona, divisa per gruppo: Integration, Architecture, Visualization, Coordination ===== */
  const tutte = [];
  for (const [gruppo, G] of Object.entries(T.gruppi)) elenco(G).forEach((sesso, i) => {
    const o = figura(T.colore, sesso, T.casco); o.traverse((m) => { m.userData.el = 'team:' + gruppo; }); o.visible = false; world.scene.add(o); world.pickables.push(o);
    const comp = G.compiti[i % G.compiti.length], n = Math.floor(i / G.compiti.length);
    const attrezzo = box(o, 0.15, 0.9, 0.15, mat('#78350f'), 0.55, 0.9, 0.25); attrezzo.rotation.x = 0.6; attrezzo.visible = comp.tipo !== 'postazione';
    if (comp.tavolo) {                                                 // tavolo dei progetti dell'architetto
      const t = new THREE.Group(); t.position.set(comp.pos[0] - 1.8, 0, comp.pos[1]); t.visible = false; world.scene.add(t);
      box(t, 1.6, 0.12, 2.6, mat('#e2e8f0'), 0, 1.3, 0).rotation.z = 0.25; for (const z of [-1, 1]) box(t, 0.12, 1.3, 0.12, mat('#64748b'), 0, 0, z);
      box(t, 1.2, 0.03, 2, mat('#3b82f6'), 0.02, 1.4, 0).rotation.z = 0.25; comp.oggetto = t;
    }
    tutte.push({ o, sesso, gruppo, wl: G.wl, compito: comp.nome, tipo: comp.tipo, comp, n, attrezzo, pos: null, meta: 0, sosta: 0 });
  });

  /* [REQ-UI-12] evidenziazione: anello a terra e freccia sopra la testa, seguono la figura */
  const segno = new THREE.Group(); segno.visible = false; world.scene.add(segno);
  const anello = new THREE.Mesh(new THREE.RingGeometry(1.4, 1.9, 28), new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide, transparent: true, opacity: 0.9 }));
  anello.rotation.x = -Math.PI / 2; anello.position.y = 0.08; segno.add(anello);
  const freccia = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.4, 12), mat('#facc15', { e: '#f59e0b', ei: 1 })); freccia.rotation.x = Math.PI; segno.add(freccia);
  let scelta = -1;
  const evidenzia = (i) => { scelta = scelta === i ? -1 : i; return scelta === i; };
  const descrizione = (f) => f.compito + ' · ' + T.gruppi[f.gruppo].nome;

  function update(dt, t) {
    for (const f of tutte) {
      const on = state.stato[f.wl] === 'on', lavora = flows.lavora(f.wl);
      f.o.visible = on; if (f.comp.oggetto) f.comp.oggetto.visible = on; if (!on) continue;
      if (f.tipo === 'postazione') {                                   // alla propria postazione
        const p = f.comp.pos, x = p[0] + f.n * 1.8, z = p[1] + f.n * 1.2;
        f.o.position.set(x, quota(x, z), z); f.o.rotation.y = (f.comp.verso || 0) + Math.sin(t * 0.6 + f.n) * 0.35;
      } else if (f.tipo === 'pannello') {                              // fermo al pannello, muove le leve
        const p = f.comp.pos; f.o.position.set(p[0] + f.n * 1.4, 0.85, p[1] - f.n * 1.2); f.o.rotation.y = Math.PI / 2;
        f.attrezzo.rotation.x = lavora ? 0.6 + Math.sin(t * 3 + f.n) * 0.5 : 0.6;
      } else {                                                         // va da uno scivolo all'altro e si ferma a ripararlo
        const xs = scivoli();
        if (!f.pos) f.pos = new THREE.Vector3(xs[0] || 0, 0, f.comp.z);
        if (!xs.length) { f.attrezzo.rotation.x = 0.6; f.o.position.set(f.pos.x, 0, f.pos.z); continue; }
        const meta = new THREE.Vector3(xs[(f.meta + f.n * 3) % xs.length] + 1.6, 0, f.comp.z - f.n * 1.5), d = meta.clone().sub(f.pos);
        if (d.length() > 0.3) { f.pos.addScaledVector(d.normalize(), Math.min(dt * 6, d.length())); f.o.rotation.y = Math.atan2(d.x, d.z); f.attrezzo.rotation.x = 0.6; f.o.position.set(f.pos.x, Math.abs(Math.sin(t * 9)) * 0.12, f.pos.z); }
        else { f.sosta += dt; f.o.rotation.y = -Math.PI / 2; f.attrezzo.rotation.x = 0.4 + Math.abs(Math.sin(t * 7)) * 1.1; f.o.position.set(f.pos.x, 0, f.pos.z); if (f.sosta > 3.5) { f.sosta = 0; f.meta++; } }
      }
    }
    const s = tutte[scelta];
    segno.visible = !!s && s.o.visible;
    if (segno.visible) { segno.position.copy(s.o.position); freccia.position.y = 4.8 + Math.sin(t * 4) * 0.35; anello.scale.setScalar(1 + 0.12 * Math.sin(t * 5)); }
  }
  const conta = () => { const c = { totale: tutte.length }; for (const g of Object.keys(T.gruppi)) c[g] = tutte.filter((f) => f.gruppo === g && f.o.visible).length; return c; };
  return { update, tutte, evidenzia, descrizione, scelta: () => scelta, conta };
}
