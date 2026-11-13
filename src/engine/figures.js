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

/* ===== [REQ-SCN-11, REQ-SCN-15, REQ-UI-12…14] Team dati componibile: persone aggiunte, tolte e assegnate a schermo ===== */
export function createFigures(cfg, world, state, flows) {
  const T = cfg.team, cap = cfg.layout.capannone, V = (x, z) => new THREE.Vector3(x, 0, z);
  const quota = (x, z) => (state.stato.ARC === 'on' && x > cap.x[0] && x < cap.x[1] && z > cap.z[0] && z < cap.z[1] ? cap.pavimento : 0);
  const CHIAVE = 'fabbrica-team:' + (cfg.meta.azienda || 'standard');          // [REQ-UI-14] un team salvato per ogni azienda
  const partenza = () => T.persone.map((p) => ({ sesso: p.sesso === 'f' ? 'f' : 'm', nome: p.nome || '', wl: (p.wl || []).filter((w) => cfg.workloads[w]) }));
  const tutte = [], ascolta = [];
  let seq = 0, scelta = null, turno = 0, tTurno = 0;

  /* macchinetta del caffè: il punto di raccolta di chi non ha un compito */
  { const [x, z] = T.raccolta.pos, g = new THREE.Group(); g.position.set(x, 0, z); world.scene.add(g);
    box(g, 1.5, 2.6, 1.1, mat('#7f1d1d')); box(g, 1.1, 0.8, 0.06, mat('#fde68a', { e: '#f59e0b', ei: 0.7 }), 0, 1.5, -0.58); box(g, 0.5, 0.35, 0.06, mat('#111827'), 0, 0.8, -0.58);
    cyl(g, 0.55, 0.55, 0.08, mat('#e2e8f0'), -2.2, 1.1, -0.6, 14); cyl(g, 0.08, 0.08, 1.1, mat('#64748b'), -2.2, 0, -0.6, 8);
    for (const dx of [-0.2, 0.15]) cyl(g, 0.09, 0.07, 0.16, mat('#ffffff'), -2.2 + dx, 1.18, -0.6, 8);
    g.traverse((o) => { if (o.isMesh) o.castShadow = true; }); }
  /* tavolo dei progetti della Data Architecture: compare con il workload */
  const tav = new THREE.Group(), pa = T.postazioni.ARC; tav.position.set(pa.pos[0] - 1.8, 0, pa.pos[1]); tav.visible = false; world.scene.add(tav);
  box(tav, 1.6, 0.12, 2.6, mat('#e2e8f0'), 0, 1.3, 0).rotation.z = 0.25; for (const z of [-1, 1]) box(tav, 0.12, 1.3, 0.12, mat('#64748b'), 0, 0, z);
  box(tav, 1.2, 0.03, 2, mat('#3b82f6'), 0.02, 1.4, 0).rotation.z = 0.25;

  /* ---------- persone ---------- */
  function crea(d) {
    const id = seq++, o = figura(T.colore, d.sesso, T.casco); o.traverse((m) => { m.userData.el = 'team:' + id; }); world.scene.add(o); world.pickables.push(o);
    const attrezzo = box(o, 0.15, 0.9, 0.15, mat('#78350f'), 0.55, 0.9, 0.25); attrezzo.rotation.x = 0.6; attrezzo.visible = false;
    const f = { id, sesso: d.sesso, nome: d.nome || '', wl: [...d.wl], o, attrezzo, pos: null, verso: null, via: null, k: 1, ora: null, sosta: 0, giro: 0 };
    tutte.push(f); return f;
  }
  function distruggi(f) { world.scene.remove(f.o); const i = world.pickables.indexOf(f.o); if (i >= 0) world.pickables.splice(i, 1); tutte.splice(tutte.indexOf(f), 1); if (scelta === f.id) scelta = null; }
  function salva() { try { localStorage.setItem(CHIAVE, JSON.stringify(tutte.map((f) => ({ sesso: f.sesso, nome: f.nome, wl: f.wl })))); } catch (e) { /* senza salvataggio si riparte dal team di partenza */ } ascolta.forEach((fn) => fn()); }
  const trova = (id) => tutte.find((f) => f.id === id);
  const aggiungi = (sesso) => { if (tutte.length >= T.max) return null; const f = crea({ sesso, nome: '', wl: [] }); salva(); return f; };
  const togli = (id) => { const f = id === null || id === undefined ? tutte[tutte.length - 1] : trova(id); if (f) { distruggi(f); salva(); } };
  const assegna = (id, wl) => { const f = trova(id); if (f && cfg.workloads[wl] && !f.wl.includes(wl)) { f.wl.push(wl); salva(); } };   // [REQ-UI-13] più workload per persona
  const rimuovi = (id, wl) => { const f = trova(id); if (f && f.wl.includes(wl)) { f.wl.splice(f.wl.indexOf(wl), 1); salva(); } };
  const azzera = () => { while (tutte.length) distruggi(tutte[0]); partenza().forEach(crea); try { localStorage.removeItem(CHIAVE); } catch (e) { /* niente da togliere */ } ascolta.forEach((fn) => fn()); };
  let salvato = null; try { salvato = JSON.parse(localStorage.getItem(CHIAVE)); } catch (e) { salvato = null; }
  (Array.isArray(salvato) ? salvato.slice(0, T.max).map((p) => ({ sesso: p.sesso === 'f' ? 'f' : 'm', nome: p.nome || '', wl: (p.wl || []).filter((w) => cfg.workloads[w]) })) : partenza()).forEach(crea);

  /* ---------- postazioni ---------- */
  const acceso = (tipo) => state.recs.find((r) => r.el.tipo === tipo && state.effettivo(r) === 'on');
  const scivoli = () => cfg.elements.filter((e) => e.tipo === 'trasporto' && (e.modalita === 'copy' || e.modalita === 'dataflow') && state.effettivo(state.elemento(e.id)) !== 'off').map((e) => e.pos[0]);
  const lavorabile = (wl) => state.stato[wl] === 'on' && (wl !== 'SRC' || !!acceso('sorgente')) && (wl !== 'SSR' || !!acceso('officina'));
  function posto(wl, n) {                                              // n = quante persone ci sono già
    const P = T.postazioni[wl];
    if (wl === 'SRC') { const e = acceso('sorgente').el; return { p: V(e.pos[0] - 3 + n * 1.6, e.pos[1] + 8.2), verso: 0 }; }
    if (wl === 'SSR') { const e = acceso('officina').el; return { p: V(e.pos[0] - e.dim[0] * 0.16 + n * 1.6, e.pos[1] + e.dim[1] * 0.18 + 2.4), verso: 0 }; }
    if (wl === 'INT' && n === 0) return { scivoli: true };
    const k = wl === 'INT' ? n - 1 : n;
    return { p: V(P.pos[0] + P.passo[0] * k, P.pos[1] + P.passo[1] * k), verso: P.verso || 0, cabina: k === 0 ? P.cabina : null, y: wl === 'INT' ? 0.85 : null };
  }

  /* ---------- camminata: un anello attorno al capannone, senza attraversare edifici, lago e recinzione [D-53] ---------- */
  const X0 = -36, X1 = 36, Z0 = -41.2, Z1 = 42.3, LATI = [X1 - X0, Z1 - Z0, X1 - X0, Z1 - Z0], GIRO = 2 * (X1 - X0) + 2 * (Z1 - Z0);
  const zona = (p) => (p.z < -70 ? 'nord' : p.z > 44.6 ? 'fuori' : 'dentro');
  function uscita(p) {                                                 // dal punto all'anello: [tappe intermedie], punto sull'anello
    const z = zona(p);
    if (z === 'nord') return [[V(-57.5, p.z), V(-57.5, Z0)], V(X0, Z0)];
    if (z === 'fuori') return [[V(p.x, 62), V(16, 62)], V(16, Z1)];
    const x = Math.min(X1, Math.max(X0, p.x)), zz = Math.min(Z1, Math.max(Z0, p.z));
    if (x > X0 && x < X1 && zz > Z0 && zz < Z1) { const d = [zz - Z0, X1 - x, Z1 - zz, x - X0], m = d.indexOf(Math.min(...d)); return [[], m === 0 ? V(x, Z0) : m === 1 ? V(X1, zz) : m === 2 ? V(x, Z1) : V(X0, zz)]; }
    return [[], V(x, zz)];
  }
  const sulGiro = (q) => (Math.abs(q.z - Z0) < 0.01 ? q.x - X0 : Math.abs(q.x - X1) < 0.01 ? LATI[0] + q.z - Z0 : Math.abs(q.z - Z1) < 0.01 ? LATI[0] + LATI[1] + X1 - q.x : LATI[0] + LATI[1] + LATI[2] + Z1 - q.z);
  const ANGOLI = [[0, V(X0, Z0)], [LATI[0], V(X1, Z0)], [LATI[0] + LATI[1], V(X1, Z1)], [LATI[0] + LATI[1] + LATI[2], V(X0, Z1)]];
  function percorso(a, b) {
    const za = zona(a), zb = zona(b);
    if (a.distanceTo(b) < 9 || (za === 'nord' && zb === 'nord')) return [a.clone(), b.clone()];
    if (za === 'fuori' && zb === 'fuori') return [a.clone(), V(a.x, 62), V(b.x, 62), b.clone()];
    const [ua, ra] = uscita(a), [ub, rb] = uscita(b), ta = sulGiro(ra), tb = sulGiro(rb), avanti = (tb - ta + GIRO) % GIRO, senso = avanti <= GIRO / 2 ? 1 : -1, tratto = senso === 1 ? avanti : GIRO - avanti;
    const angoli = ANGOLI.map(([t, p]) => [((t - ta) * senso + GIRO) % GIRO, p]).filter(([d]) => d > 0.01 && d < tratto - 0.01).sort((p, q) => p[0] - q[0]).map(([, p]) => p.clone());
    return [a.clone(), ...ua, ra, ...angoli, rb, ...ub.slice().reverse(), b.clone()];
  }
  function cammina(f, meta, dt, vel) {                                 // true = arrivato
    if (!f.pos) { f.pos = meta.clone(); f.verso = meta.clone(); f.k = 1; }
    if (f.verso.distanceTo(meta) > 0.4) {
      f.via = percorso(f.pos, meta); f.lung = f.via.slice(1).map((p, j) => p.distanceTo(f.via[j])); f.tot = f.lung.reduce((x, y) => x + y, 0) || 1; f.fatto = 0; f.verso = meta.clone(); f.k = 0;
    }
    if (f.k >= 1) return true;
    f.fatto = Math.min(f.tot, f.fatto + dt * vel); f.k = f.fatto / f.tot;
    let d = f.fatto, j = 0; while (j < f.lung.length - 1 && d > f.lung[j]) d -= f.lung[j++];
    const a = f.via[j], b = f.via[j + 1]; f.pos.lerpVectors(a, b, f.lung[j] ? Math.min(1, d / f.lung[j]) : 1);
    if (f.lung[j] > 0.01) f.o.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
    return f.k >= 1;
  }

  /* [REQ-UI-12] evidenziazione: anello a terra e freccia sopra la testa, seguono la figura */
  const segno = new THREE.Group(); segno.visible = false; world.scene.add(segno);
  const anello = new THREE.Mesh(new THREE.RingGeometry(1.4, 1.9, 28), new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide, transparent: true, opacity: 0.9 }));
  anello.rotation.x = -Math.PI / 2; anello.position.y = 0.08; segno.add(anello);
  const freccia = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.4, 12), mat('#facc15', { e: '#f59e0b', ei: 1 })); freccia.rotation.x = Math.PI; segno.add(freccia);
  const evidenzia = (id) => { scelta = scelta === id ? null : id; return scelta === id; };

  function update(dt, t) {
    tTurno += dt; if (tTurno > T.turno) { tTurno = 0; turno++; }
    tav.visible = state.stato.ARC === 'on';
    const presenti = {};
    tutte.forEach((f, i) => {
      const lav = f.wl.filter(lavorabile);                             // [REQ-SCN-11] con più workload accesi si ruota a turno
      f.ora = lav.length ? lav[(turno + i) % lav.length] : null;
      const n = (presenti[f.ora || '-'] = (presenti[f.ora || '-'] || 0) + 1) - 1;
      const d = f.ora ? posto(f.ora, n) : { p: V(T.raccolta.pos[0] - 3.6 - n * 1.5, T.raccolta.pos[1] - 1.4), verso: Math.PI / 2 };   // [REQ-SCN-15] alla macchinetta del caffè
      f.attrezzo.visible = f.ora === 'INT';
      if (d.scivoli) {                                                 // va da uno scivolo all'altro e si ferma a ripararlo
        const xs = scivoli(), z = T.postazioni.INT.zScivoli, meta = V((xs.length ? xs[f.giro % xs.length] : 0) + 1.6, z);
        if (cammina(f, meta, dt, 8)) { f.sosta += dt; f.o.rotation.y = -Math.PI / 2; f.attrezzo.rotation.x = xs.length ? 0.4 + Math.abs(Math.sin(t * 7)) * 1.1 : 0.6; if (f.sosta > 3.5) { f.sosta = 0; f.giro++; } }
        f.o.position.set(f.pos.x, f.k < 1 ? Math.abs(Math.sin(t * 9)) * 0.12 : 0, f.pos.z); return;
      }
      const fermo = cammina(f, d.p, dt, 11);
      if (fermo) { f.o.rotation.y = d.verso + Math.sin(t * 0.6 + i) * 0.3; if (f.ora === 'INT') f.attrezzo.rotation.x = flows.lavora('INT') ? 0.6 + Math.sin(t * 3 + i) * 0.5 : 0.6; }
      if (fermo && d.cabina) f.o.position.set(d.cabina[0], d.cabina[1], d.cabina[2]);                    // in cabina, in cima alla torre
      else f.o.position.set(f.pos.x, (fermo && d.y) || quota(f.pos.x, f.pos.z) + (fermo ? 0 : Math.abs(Math.sin(t * 9)) * 0.12), f.pos.z);
    });
    const s = trova(scelta);
    segno.visible = !!s;
    if (s) { segno.position.set(s.o.position.x, s.o.position.y, s.o.position.z); freccia.position.y = 4.8 + Math.sin(t * 4) * 0.35; anello.scale.setScalar(1 + 0.12 * Math.sin(t * 5)); }
  }
  /* [REQ-WL-13] un workload acceso che nessuno segue è "scoperto" */
  const scoperto = (wl) => state.stato[wl] === 'on' && !tutte.some((f) => f.wl.includes(wl));
  const conta = () => { const c = { totale: tutte.length, caffe: tutte.filter((f) => !f.ora).length }; for (const f of tutte) if (f.ora) c[f.ora] = (c[f.ora] || 0) + 1; return c; };
  return { update, tutte, trova, aggiungi, togli, assegna, rimuovi, azzera, evidenzia, scoperto, conta, scelta: () => scelta, onChange: (fn) => ascolta.push(fn) };
}
