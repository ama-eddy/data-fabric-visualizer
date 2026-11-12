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
  const T = cfg.team, cap = cfg.layout.capannone, figs = [];
  const quota = (x, z) => (state.stato.ARC === 'on' && x > cap.x[0] && x < cap.x[1] && z > cap.z[0] && z < cap.z[1] ? cap.pavimento : 0);
  const crea = (sesso, gruppo) => { const o = figura(T.colore, sesso, T.casco); o.traverse((m) => { m.userData.el = 'team:' + gruppo; }); o.visible = false; world.scene.add(o); world.pickables.push(o); return o; };

  /* ===== Trasporto: dalla sorgente alla banchina, dalla banchina al Bronze ===== */
  const trasporto = elenco(T.trasporto).map((sesso, i) => {
    const o = crea(sesso, 'trasporto'), comp = T.trasporto.compiti[i % T.trasporto.compiti.length], off = Math.floor(i / T.trasporto.compiti.length) * 2.2;
    const carico = box(o, 0.7, 0.55, 0.7, mat('#9ca3af'), 0, 1.0, 0.6);
    return { o, sesso, gruppo: 'trasporto', compito: comp.nome, carico, a: new THREE.Vector3(comp.da[0] + off, 0, comp.da[1]), b: new THREE.Vector3(comp.a[0] + off, 0, comp.a[1]), fase: i * 0.37 };
  });
  /* ===== Rotazione tra le postazioni: cabina di controllo, coordinamento, showroom ===== */
  const rotazione = elenco(T.rotazione).map((sesso, i) => ({ o: crea(sesso, 'rotazione'), sesso, gruppo: 'rotazione', i, pos: null, da: null, verso: null, k: 1, post: -1, postazione: '' }));
  const tutte = [...trasporto, ...rotazione];

  /* [REQ-UI-12] evidenziazione: anello a terra e freccia sopra la testa, seguono la figura */
  const segno = new THREE.Group(); segno.visible = false; world.scene.add(segno);
  const anello = new THREE.Mesh(new THREE.RingGeometry(1.4, 1.9, 28), new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide, transparent: true, opacity: 0.9 }));
  anello.rotation.x = -Math.PI / 2; anello.position.y = 0.08; segno.add(anello);
  const freccia = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.4, 12), mat('#facc15', { e: '#f59e0b', ei: 1 })); freccia.rotation.x = Math.PI; segno.add(freccia);
  let scelta = -1;
  const evidenzia = (i) => { scelta = scelta === i ? -1 : i; return scelta === i; };
  const descrizione = (f) => (f.gruppo === 'trasporto' ? f.compito : f.postazione) + ' · ' + T[f.gruppo].nome;
  let turno = 0, tTurno = 0;

  function update(dt, t) {
    const INT = state.stato.INT === 'on', lavora = flows.lavora('INT');
    for (const f of trasporto) {
      f.o.visible = INT; if (!INT) continue;
      const giro = 9, u = lavora ? ((t / giro + f.fase) % 1) : 0, andata = u < 0.5, k = andata ? u * 2 : 2 - u * 2;
      f.o.position.lerpVectors(f.a, f.b, k); f.o.position.y = quota(f.o.position.x, f.o.position.z) + (lavora ? Math.abs(Math.sin(t * 9 + f.fase)) * 0.12 : 0);
      f.o.rotation.y = Math.atan2(f.b.x - f.a.x, f.b.z - f.a.z) + (andata ? 0 : Math.PI);
      f.carico.visible = lavora && andata;                            // [REQ-WL-06] fermi, in attesa, se manca un workload a monte
    }
    const attive = T.rotazione.postazioni.filter((p) => p.attiva.some((w) => state.stato[w] === 'on'));
    tTurno += dt; if (tTurno > T.turno) { tTurno = 0; turno++; }
    for (const f of rotazione) {
      f.o.visible = attive.length > 0; if (!attive.length) { f.pos = null; continue; }
      const idx = (f.i + turno) % attive.length, p = attive[idx], quanti = Math.floor(f.i / attive.length);
      const meta = new THREE.Vector3(p.pos[0] + quanti * 2, 0, p.pos[1] + quanti * 1.2);
      if (!f.pos) { f.pos = meta.clone(); f.verso = meta; f.k = 1; }
      if (!f.verso.equals(meta)) { f.da = f.pos.clone(); f.verso = meta; f.k = 0; }
      if (f.k < 1) { f.k = Math.min(1, f.k + (dt * 11) / Math.max(1, f.da.distanceTo(f.verso))); f.pos.lerpVectors(f.da, f.verso, f.k); f.o.rotation.y = Math.atan2(f.verso.x - f.da.x, f.verso.z - f.da.z); }
      else f.o.rotation.y += (Math.sin(t * 0.5 + f.i) * 0.6 - f.o.rotation.y) * Math.min(1, dt * 2);
      f.o.position.set(f.pos.x, quota(f.pos.x, f.pos.z) + (f.k < 1 ? Math.abs(Math.sin(t * 9)) * 0.12 : 0), f.pos.z);
      f.postazione = p.nome;
    }
    const s = tutte[scelta];
    segno.visible = !!s && s.o.visible;
    if (segno.visible) { segno.position.copy(s.o.position); freccia.position.y = 4.8 + Math.sin(t * 4) * 0.35; anello.scale.setScalar(1 + 0.12 * Math.sin(t * 5)); }
  }
  return { update, tutte, evidenzia, descrizione, scelta: () => scelta, conta: () => ({ trasporto: trasporto.filter((f) => f.o.visible).length, rotazione: rotazione.filter((f) => f.o.visible).length, totale: trasporto.length + rotazione.length }), rotazione, trasporto };
}
