// Interfaccia: pannello dei workload, comandi, scheda, tooltip. Tutti i testi vengono dal CONFIG [REQ-UI-07].
import * as THREE from 'three';

const $ = (id) => document.getElementById(id);
const h = (tag, props = {}, ...kids) => { const e = Object.assign(document.createElement(tag), props); e.append(...kids); return e; };

export function createUI(cfg, world, state) {
  const ui = cfg.ui;
  $('titolo').textContent = cfg.meta.titolo; $('sottotitolo').textContent = cfg.meta.sottotitolo;
  document.title = cfg.meta.titolo;
  $('wl-h').textContent = ui.workload; $('hint').textContent = ui.aiuto;

  /* ===== [REQ-UI-03, REQ-WL-08, REQ-UI-09] Pannello: i 12 workload, sempre elencati, con selettore off/wip/on ===== */
  const rows = {};
  for (const k of cfg.ordine) {
    const wl = cfg.workloads[k];
    const seg = h('div', { className: 'seg' });
    for (const s of ['off', 'wip', 'on']) {
      const b = h('button', { textContent: ui.stati[s], title: ui.statoLungo[s] }); b.dataset.s = s;
      b.onclick = () => state.set(k, s);
      seg.append(b);
    }
    const name = h('button', { className: 'name', textContent: wl.nome });
    name.onclick = () => { mostraWorkload(k); const rs = state.diWorkload(k); if (rs.length) world.frame(rs.map((r) => r.el.pos), 22); };
    const dot = h('span', { className: 'dot' }); dot.style.background = wl.colore;
    const row = h('div', { className: 'row' }, dot, name, seg); row.dataset.wl = k;
    rows[k] = row; $('wl').append(row);
  }
  state.onChange((st) => {
    for (const k of cfg.ordine) { rows[k].dataset.stato = st[k]; rows[k].querySelectorAll('.seg button').forEach((b) => b.classList.toggle('sel', b.dataset.s === st[k])); }
    if (aperta) aperta();
  });

  /* ===== [REQ-UI-04] Comandi globali ===== */
  let etichette = true, pausa = false;
  const btn = (txt, fn) => { const b = h('button', { textContent: txt }); b.onclick = () => fn(b); $('bar').append(b); return b; };
  btn(ui.vistaInsieme, () => world.home());
  btn(ui.etichette, () => { etichette = !etichette; $('labels').style.display = etichette ? '' : 'none'; });
  btn(ui.pausa, (b) => { pausa = !pausa; b.textContent = pausa ? ui.riprendi : ui.pausa; });
  btn(ui.tuttoOn, () => state.setTutti('on'));
  btn(ui.tuttoOff, () => state.setTutti('off'));

  /* ===== [REQ-FLW-08, REQ-SRC-03] Legenda dei materiali e dei mezzi di trasporto ===== */
  const leg = $('legenda');
  const voce = (colore, nome, cls = '') => { const c = h('span', { className: 'chip ' + cls }); c.style.background = colore; return h('div', { className: 'voce' }, c, nome); };
  leg.append(h('h4', { textContent: ui.materiali }), h('div', { className: 'riga' }, ...Object.values(cfg.materiali).map((m) => voce(m.colore, m.nome))),
    h('h4', { textContent: ui.mezzi }), h('div', { className: 'riga' }, ...Object.values(cfg.modalita).map((m) => voce(m.colore, m.nome, 'linea'))));
  btn(ui.legenda, () => leg.classList.toggle('open'));

  /* ===== [REQ-UI-02, REQ-LIT-01, REQ-LIT-02] Scheda: nessuna sezione tecnica ===== */
  let aperta = null;
  function scheda(titolo, wlKey, d, rec) {
    const wl = cfg.workloads[wlKey], st = rec ? state.effettivo(rec) : state.stato[wlKey], box = $('info');
    box.innerHTML = '';
    const x = h('button', { className: 'x', textContent: '×', title: ui.chiudi }); x.onclick = chiudi;
    const b1 = h('span', { className: 'badge', textContent: wl.nome }); b1.style.background = wl.colore;
    const b2 = h('span', { className: 'badge stato', textContent: ui.statoLungo[st] });
    box.append(x, h('h3', { textContent: titolo }), h('div', { className: 'badges' }, b1, b2));
    const sez = (t, txt) => { if (txt) box.append(h('h4', { textContent: t }), h('p', { textContent: txt })); };
    if (rec && rec.proprio !== undefined) {           /* [REQ-UI-09] stato di una singola sorgente o di un singolo spoke, dal vivo */
      const seg = h('div', { className: 'seg' });
      for (const s of ['off', 'wip', 'on']) { const b = h('button', { textContent: ui.stati[s], className: rec.proprio === s ? 'sel' : '' }); b.dataset.s = s; b.onclick = () => state.setElemento(rec.el.id, s); seg.append(b); }
      box.append(h('h4', { textContent: ui.statoElemento }), seg);
    }
    sez(ui.nellaFabbrica, d.fabbrica || wl.fabbrica);
    sez(ui.mezzo, d.mezzo);
    sez(ui.perTe, d.perTe || wl.perTe);
    sez(ui.contatto, [cfg.contatto.chi, cfg.contatto.come].filter(Boolean).join(' — '));
    sez(ui.gestore, ui.gestori[d.gestore || wl.gestore]);
    box.classList.add('open');
  }
  function mostraElemento(id) { const r = state.elemento(id); if (!r) return; aperta = () => scheda(r.el.nome, r.el.wl, r.el, r); aperta(); }
  function mostraWorkload(k) { aperta = () => scheda(cfg.workloads[k].nome, k, {}); aperta(); }
  function chiudi() { aperta = null; $('info').classList.remove('open'); }

  /* ===== [REQ-UI-02, REQ-UI-05] Clic e passaggio del mouse sugli elementi ===== */
  const ray = new THREE.Raycaster(), p = new THREE.Vector2(), canvas = world.renderer.domElement;
  function pick(ev) {
    p.set((ev.clientX / innerWidth) * 2 - 1, -(ev.clientY / innerHeight) * 2 + 1);
    ray.setFromCamera(p, world.camera);
    for (const hit of ray.intersectObjects(state.recs.map((r) => r.root), true)) {
      let o = hit.object, vis = true;
      while (o) { if (!o.visible) { vis = false; break; } o = o.parent; }
      if (vis && hit.object.userData.el) return hit.object.userData.el;
    }
    return null;
  }
  let down = null;
  canvas.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; $('tip').style.display = 'none'; });
  canvas.addEventListener('wheel', () => { $('tip').style.display = 'none'; }, { passive: true });
  canvas.addEventListener('pointerup', (e) => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 5) return;
    const id = pick(e); if (id) mostraElemento(id); else chiudi();
  });
  let last = 0;
  canvas.addEventListener('pointermove', (e) => {
    if (e.buttons || performance.now() - last < 60) return; last = performance.now();
    const id = pick(e), tip = $('tip');
    canvas.style.cursor = id ? 'pointer' : '';
    if (id) { tip.textContent = state.elemento(id).el.nome; tip.style.display = 'block'; tip.style.left = e.clientX + 14 + 'px'; tip.style.top = e.clientY + 14 + 'px'; }
    else tip.style.display = 'none';
  });
  canvas.addEventListener('pointerleave', () => { $('tip').style.display = 'none'; });

  return { mostraElemento, mostraWorkload, chiudi, inPausa: () => pausa };
}
