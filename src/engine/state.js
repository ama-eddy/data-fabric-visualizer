// Stato dei workload (off / wip / on) e sua rappresentazione in scena.
import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { builders, buildCantiere } from './builders.js';
import { ease } from './kit.js';

export function createState(cfg, world) {
  const animators = [], tweens = [], listeners = [];
  const ctx = { cfg, animate: (fn) => animators.push(fn) };
  const stato = {};                                   // [REQ-WL-01] stato corrente di ogni workload
  for (const k of cfg.ordine) stato[k] = 'off';       // la scena parte vuota; lo stato iniziale si applica con set()
  const hall = cfg.layout.capannone;
  const recs = [];

  /* ===== [REQ-WL-12] Gli elementi nascono dal CONFIG: nessun elemento è scritto nel motore ===== */
  for (const el of cfg.elements) {
    const [x, z] = el.pos, [w, d, h] = el.dim;
    const root = new THREE.Group(); root.position.set(x, 0, z); world.scene.add(root);
    const finale = new THREE.Group(), cantiere = new THREE.Group();
    (builders[el.tipo] || builders.segnaposto)(finale, el, ctx);
    if (el.cantiere !== false) buildCantiere(cantiere, el, ctx);
    for (const g of [finale, cantiere]) { g.visible = false; root.add(g); g.traverse((o) => { o.userData.el = el.id; }); }
    /* [REQ-SCN-06] etichetta dell'elemento */
    const div = document.createElement('div'); div.className = 'lbl';
    div.style.borderLeftColor = cfg.workloads[el.wl].colore;
    const label = new CSS2DObject(div); label.position.set(...(el.etichetta || [0, Math.min(h, 14) + 3, 0])); label.visible = false; root.add(label);
    const dentro = !['capannone', 'riserva'].includes(el.tipo) &&
      x - w / 2 >= hall.x[0] && x + w / 2 <= hall.x[1] && z - d / 2 >= hall.z[0] && z + d / 2 <= hall.z[1];
    recs.push({ el, root, on: finale, wip: cantiere, label, div, mostrato: 'off', seq: 0, dentro });
  }

  function tween(obj, from, to, dur, done) { obj.scale.y = from; tweens.push({ obj, from, to, t: 0, dur, done }); }

  /* ===== [REQ-WL-02/03/04/07] off = assente · wip = cantiere · on = completo; passaggio animato ===== */
  function mostra(rec, st, immediato) {
    if (rec.mostrato === st) return;
    const prev = rec.mostrato === 'off' ? null : rec[rec.mostrato];
    let next = st === 'off' ? null : rec[st];
    if (next && !next.children.length) next = null;       // elemento senza cantiere proprio
    for (const g of [rec.on, rec.wip]) if (g !== prev && g !== next) g.visible = false;
    rec.mostrato = st; const seq = ++rec.seq;
    for (let i = tweens.length - 1; i >= 0; i--) if (tweens[i].obj === rec.on || tweens[i].obj === rec.wip) tweens.splice(i, 1);
    const T = immediato ? 0 : cfg.animazione.costruzione;
    const cresci = () => { if (seq !== rec.seq || !next) return; next.visible = true; if (T) tween(next, 0.001, 1, T); else next.scale.y = 1; };
    if (prev && T) tween(prev, prev.scale.y, 0.001, T * 0.4, () => { prev.visible = false; cresci(); });
    else { if (prev) prev.visible = false; cresci(); }
    rec.label.visible = st !== 'off' && !!next;
    rec.div.className = 'lbl' + (st === 'wip' ? ' wip' : '');
    rec.div.innerHTML = '';
    rec.div.append(rec.el.nome);
    const nota = st === 'wip' ? cfg.ui.lavori : (rec.el.tipo === 'segnaposto' ? cfg.ui.segnaposto : '');
    if (nota) { const s = document.createElement('small'); s.textContent = ' · ' + nota; rec.div.append(s); }
  }

  function applica(immediato) {
    const quota = stato.ARC === 'on' ? hall.pavimento : 0;   // i reparti poggiano sul pavimento, se c'è
    for (const r of recs) { r.root.position.y = r.dentro ? quota : 0; mostra(r, stato[r.el.wl], immediato); }
    for (const fn of listeners) fn(stato);
  }

  /* [REQ-WL-06] si accende solo il workload scelto: le dipendenze non vengono toccate */
  function set(wl, st, immediato) { if (!(wl in stato) || stato[wl] === st) return; stato[wl] = st; applica(immediato); }
  function setTutti(st) { for (const k of cfg.ordine) stato[k] = st; applica(false); }

  function update(dt, t) {
    for (let i = tweens.length - 1; i >= 0; i--) {
      const w = tweens[i]; w.t = Math.min(1, w.t + dt / w.dur);
      w.obj.scale.y = w.from + (w.to - w.from) * ease(w.t);
      if (w.t >= 1) { tweens.splice(i, 1); w.done?.(); }
    }
    for (const fn of animators) fn(t, dt);
  }

  return {
    stato, recs, set, setTutti, update,
    onChange: (fn) => listeners.push(fn),
    elemento: (id) => recs.find((r) => r.el.id === id),
    diWorkload: (wl) => recs.filter((r) => r.el.wl === wl),
    init: () => { for (const k of cfg.ordine) stato[k] = cfg.workloads[k].stato || 'off'; applica(true); },
  };
}
