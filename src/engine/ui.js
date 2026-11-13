// Interfaccia: pannello dei workload, comandi, scheda, tooltip. Tutti i testi vengono dal CONFIG [REQ-UI-07].
import * as THREE from 'three';

const $ = (id) => document.getElementById(id);
const h = (tag, props = {}, ...kids) => { const e = Object.assign(document.createElement(tag), props); e.append(...kids.filter((k) => k !== null && k !== undefined)); return e; };

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
    const singoli = state.recs.filter((r) => r.el.wl === k && r.proprio !== undefined);
    if (singoli.length) {                                  /* [REQ-UI-11] tendina: accendere uno alla volta */
      const freccia = h('button', { className: 'apri', textContent: '▸', title: ui.apri });
      const lista = h('div', { className: 'sub' });
      for (const r of singoli) {
        const s2 = h('div', { className: 'seg' });
        for (const s of ['off', 'wip', 'on']) { const b = h('button', { textContent: ui.stati[s] }); b.dataset.s = s; b.onclick = () => state.setElemento(r.el.id, s); s2.append(b); }
        const nm = h('button', { className: 'name', title: r.el.nome }, (r.el.tipo === 'officina' ? r.el.nome.replace(/^Negozio /, '') : r.el.nome), r.el.categoriaNome && r.el.categoriaNome !== r.el.nome ? h('small', { textContent: r.el.categoriaNome }) : '');
        nm.onclick = () => { mostraElemento(r.el.id); world.frame([r.el.pos], 12); };
        const sr = h('div', { className: 'row subrow' }, nm, s2); sr.dataset.el = r.el.id; lista.append(sr);
      }
      freccia.onclick = () => { const o = lista.classList.toggle('open'); freccia.textContent = o ? '▾' : '▸'; };
      row.insertBefore(freccia, name); $('wl').append(lista);
    }
  }
  state.onChange((st) => {
    for (const k of cfg.ordine) { rows[k].dataset.stato = st[k]; rows[k].querySelectorAll('.seg button').forEach((b) => b.classList.toggle('sel', b.dataset.s === st[k])); }
    document.querySelectorAll('.subrow').forEach((sr) => { const r = state.elemento(sr.dataset.el); sr.dataset.stato = state.effettivo(r); sr.querySelectorAll('.seg button').forEach((b) => b.classList.toggle('sel', b.dataset.s === r.proprio)); });
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
  const voce = (colore, nome, cls = '', tec = '') => { const c = h('span', { className: 'chip ' + cls }); c.style.background = colore; return h('div', { className: 'voce', title: tec ? ui.tecnico + ': ' + tec : '' }, c, nome); };
  leg.append(h('h4', { textContent: ui.materiali }), h('div', { className: 'riga' }, ...Object.values(cfg.materiali).map((m) => voce(m.colore, m.nome, '', m.tecnico))),
    h('h4', { textContent: ui.mezzi }), h('div', { className: 'riga' }, ...Object.values(cfg.modalita).map((m) => voce(m.colore, m.nome, 'linea', m.tecnico))));
  btn(ui.legenda, () => leg.classList.toggle('open'));

  /* ===== [REQ-UI-02, REQ-LIT-01, REQ-LIT-02] Scheda: nessuna sezione tecnica ===== */
  let aperta = null;
  function scheda(titolo, wlKey, d, rec) {
    const wl = cfg.workloads[wlKey], st = rec ? state.effettivo(rec) : state.stato[wlKey], box = $('info');
    box.innerHTML = '';
    const x = h('button', { className: 'x', textContent: '×', title: ui.chiudi }); x.onclick = chiudi;
    const b1 = h('span', { className: 'badge', textContent: wl.nome }); b1.style.background = wl.colore;
    const b2 = h('span', { className: 'badge stato', textContent: ui.statoLungo[st] });
    box.append(x, h('h3', { textContent: titolo }));
    const tec = d.tecnico || (rec ? '' : wl.tecnico);                /* [REQ-UI-02, RDM-026] il nome tecnico: solo qui, mai nel nome */
    if (tec) box.append(h('div', { className: 'tecnico' }, h('b', { textContent: ui.tecnico + ': ' }), tec));
    box.append(h('div', { className: 'badges' }, b1, b2));
    const sez = (t, txt) => { if (txt) box.append(h('h4', { textContent: t }), h('p', { textContent: txt })); };
    if (d.categoriaNome) sez(ui.categoria, d.categoriaNome);
    if (rec && rec.proprio !== undefined) {           /* [REQ-UI-09] stato di una singola sorgente o di un singolo spoke, dal vivo */
      const seg = h('div', { className: 'seg' });
      for (const s of ['off', 'wip', 'on']) { const b = h('button', { textContent: ui.stati[s], className: rec.proprio === s ? 'sel' : '' }); b.dataset.s = s; b.onclick = () => state.setElemento(rec.el.id, s); seg.append(b); }
      box.append(h('h4', { textContent: ui.statoElemento }), seg);
    }
    if (figure && figure.scoperto(wlKey)) box.append(h('div', { className: 'avviso', textContent: '⚠ ' + ui.scoperto }));   /* [REQ-WL-13] */
    if (st === 'wip') sez(ui.lavori, d.notaCantiere || wl.notaCantiere);   /* [REQ-WL-03] nota del cantiere, es. quando sarà pronto */
    sez(ui.nellaFabbrica, d.fabbrica || wl.fabbrica);
    sez(ui.mezzo, d.mezzo);
    sez(ui.perTe, d.perTe || wl.perTe);
    sez(ui.contatto, [cfg.contatto.chi, cfg.contatto.come].filter(Boolean).join(' — '));
    sez(ui.gestore, [ui.gestori[d.gestore || wl.gestore], d.gestoreTesto].filter(Boolean).join('. '));
    box.classList.add('open');
  }
  const persona = (id) => (figure ? figure.trova(+id.slice(5)) : null);
  const nomePersona = (f) => f.nome || cfg.team.nome + ' ' + (figure.tutte.indexOf(f) + 1);
  const nomeDi = (id) => (id.startsWith('team:') ? (persona(id) ? nomePersona(persona(id)) : '') : state.elemento(id).el.nome);
  /* [REQ-UI-12, REQ-UI-13] scheda di una persona: di cosa si occupa, e i workload a cui assegnarla (utile anche in presentazione) */
  function schedaPersona(f) {
    const box = $('info'); box.innerHTML = '';
    const x = h('button', { className: 'x', textContent: '×', title: ui.chiudi }); x.onclick = chiudi;
    box.append(x, h('h3', { textContent: nomePersona(f) }));
    const ruoli = f.wl.map((w) => cfg.team.postazioni[w].tecnico).filter(Boolean);
    if (ruoli.length) box.append(h('div', { className: 'tecnico' }, h('b', { textContent: ui.ruolo + ': ' }), ruoli.join(' · ')));
    box.append(h('h4', { textContent: ui.compiti }));
    if (!f.wl.length) box.append(h('p', { textContent: ui.senzaCompito }));
    for (const w of f.wl) { const P = cfg.team.postazioni[w], spento = state.stato[w] !== 'on'; box.append(h('p', { className: 'compito' }, h('b', { textContent: cfg.workloads[w].nome + ' — ' + P.nome + (spento ? ' (' + ui.inAttesa + ')' : '') }), h('br'), P.cosa)); }
    box.append(h('h4', { textContent: ui.assegna }));
    const chips = h('div', { className: 'chips' });
    for (const w of cfg.ordine) { const on = f.wl.includes(w), c = h('button', { className: 'chip2' + (on ? ' on' : ''), textContent: cfg.workloads[w].nome }); c.dataset.wl = w; c.style.borderColor = cfg.workloads[w].colore; if (on) c.style.background = cfg.workloads[w].colore; c.onclick = () => (on ? figure.rimuovi(f.id, w) : figure.assegna(f.id, w)); chips.append(c); }
    box.append(chips, h('h4', { textContent: ui.perTe }), h('p', { textContent: cfg.team.perTe }));
    box.classList.add('open');
  }
  function mostraElemento(id) {
    if (id.startsWith('team:')) { const f = persona(id); if (!f) return; scelto = null; aperta = () => { const g = figure.trova(f.id); if (g) schedaPersona(g); else chiudi(); }; aperta(); return; }
    const r = state.elemento(id); if (!r) return; scelto = id; aperta = () => scheda(r.el.nome, r.el.wl, r.el, r); aperta(); }
  function mostraWorkload(k) { aperta = () => scheda(cfg.workloads[k].nome, k, {}); aperta(); }
  function chiudi() { scelto = null; aperta = null; $('info').classList.remove('open'); }

  /* ===== [REQ-UI-02, REQ-UI-05] Clic e passaggio del mouse sugli elementi ===== */
  const ray = new THREE.Raycaster(), p = new THREE.Vector2(), canvas = world.renderer.domElement;
  function pick(ev) {
    p.set((ev.clientX / innerWidth) * 2 - 1, -(ev.clientY / innerHeight) * 2 + 1);
    ray.setFromCamera(p, world.camera);
    for (const hit of ray.intersectObjects([...state.recs.map((r) => r.root), ...world.pickables], true)) {
      let o = hit.object, vis = true;
      while (o) { if (!o.visible) { vis = false; break; } o = o.parent; }
      if (vis && hit.object.userData.el) return hit.object.userData.el;
    }
    return null;
  }
  /* [REQ-UI-05] l'elemento sotto il mouse viene incorniciato */
  const cornice = new THREE.BoxHelper(new THREE.Object3D(), 0xfacc15); cornice.visible = false; cornice.material.depthTest = false; world.scene.add(cornice);
  let sotto = null;
  function evidenzia(id) {
    if (id === sotto) return; sotto = id;
    const r = id && !id.startsWith('team:') ? state.elemento(id) : null, g = r && (r.on.visible ? r.on : r.wip.visible ? r.wip : null);
    cornice.visible = !!g && r.el.tipo !== 'recinzione' && r.el.tipo !== 'trasporto';
    if (cornice.visible) cornice.setFromObject(g);
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
    evidenzia(id);
    if (id) { tip.textContent = nomeDi(id); tip.style.display = 'block'; tip.style.left = e.clientX + 14 + 'px'; tip.style.top = e.clientY + 14 + 'px'; }
    else tip.style.display = 'none';
  });
  canvas.addEventListener('pointerleave', () => { $('tip').style.display = 'none'; evidenzia(null); });

  /* ===== [REQ-UI-12…14] Pannello del team dati: + e − per aggiungere e togliere, trascinamento sui workload, pallini delle assegnazioni ===== */
  let figure = null;
  const sagoma = (f) => `<svg viewBox="0 0 20 30" width="18" height="27"><circle cx="10" cy="6" r="4.6" fill="#f1c9a5"/><path d="${f.sesso === 'f' ? 'M10 11 L17 27 L3 27 Z' : 'M5 11 h10 v11 h-10 Z M6 22 h3 v6 h-3 Z M11 22 h3 v6 h-3 Z'}" fill="${cfg.team.colore}"/><path d="M5.2 5.5 a4.8 4.8 0 0 1 9.6 0 Z" fill="${f.sesso === 'f' ? '#78350f' : cfg.team.casco}"/></svg>`;
  function collegaTeam(fig) {
    figure = fig; const box = $('team'), riga = h('div', { className: 'pupazzi' });
    const tasto = (txt, titolo, fn, cls = '') => { const b = h('button', { className: 'tasto ' + cls, title: titolo }); b.innerHTML = txt; b.onclick = fn; return b; };
    box.append(h('div', { className: 'testa' }, h('h2', { textContent: ui.team }),
      tasto('+' + sagoma({ sesso: 'm' }), ui.aggiungiUomo, () => fig.aggiungi('m'), 'piu'), tasto('+' + sagoma({ sesso: 'f' }), ui.aggiungiDonna, () => fig.aggiungi('f'), 'piu'),
      tasto('−', ui.togli, () => fig.togli(fig.scelta()), 'meno'), tasto(ui.azzera, ui.azzeraTitolo, () => fig.azzera(), 'azzera')), riga, h('div', { className: 'aiuto', textContent: ui.trascina }));
    const seleziona = (f) => { const on = fig.evidenzia(f.id); if (on) { world.frame([[f.o.position.x, f.o.position.z]], 8); mostraElemento('team:' + f.id); } disegna(); };
    function disegna() {
      riga.innerHTML = '';
      for (const f of fig.tutte) {
        const b = h('button', { className: 'pupazzo' + (fig.scelta() === f.id ? ' sel' : ''), draggable: true, title: nomePersona(f) }); b.dataset.id = f.id; b.innerHTML = sagoma(f);
        b.onclick = () => seleziona(f);
        b.ondragstart = (e) => { e.dataTransfer.setData('text/plain', String(f.id)); e.dataTransfer.effectAllowed = 'copy'; document.body.classList.add('trascino'); };
        b.ondragend = () => { document.body.classList.remove('trascino'); document.querySelectorAll('.row.sopra').forEach((r) => r.classList.remove('sopra')); };
        const pallini = h('div', { className: 'pallini' });
        for (const w of f.wl) { const p = h('button', { className: 'pallino', title: cfg.workloads[w].nome + ' — ' + ui.chiudi.toLowerCase() }); p.dataset.wl = w; p.style.background = cfg.workloads[w].colore; p.onclick = () => fig.rimuovi(f.id, w); pallini.append(p); }
        riga.append(h('div', { className: 'gruppo' }, b, f.nome ? h('small', { textContent: f.nome }) : null, pallini));
      }
      scoperti(); if (aperta) aperta();
    }
    /* [REQ-UI-13] le righe dei workload accettano le persone trascinate */
    for (const k of cfg.ordine) {
      const r = rows[k];
      r.ondragover = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; r.classList.add('sopra'); };
      r.ondragleave = () => r.classList.remove('sopra');
      r.ondrop = (e) => { e.preventDefault(); r.classList.remove('sopra'); const id = +e.dataTransfer.getData('text/plain'); if (!Number.isNaN(id)) fig.assegna(id, k); };
    }
    fig.onChange(disegna); state.onChange(scoperti); disegna();
  }
  /* [REQ-WL-13] workload acceso senza nessuno assegnato: segnalato nella riga e sulle etichette, senza fermarlo */
  function scoperti() {
    if (!figure) return;
    for (const k of cfg.ordine) { const s = figure.scoperto(k); rows[k].classList.toggle('scoperto', s); rows[k].querySelector('.name').title = s ? ui.scoperto : ''; }
    for (const r of state.recs) r.div.classList.toggle('scoperta', figure.scoperto(r.el.wl) && r.el.tipo !== 'sorgente' && r.el.tipo !== 'officina');
  }

  /* ===== [REQ-SCN-06, RDM-028] Etichette senza sovrapposizioni: vince la più importante, poi la più vicina; le altre si nascondono =====
     Priorità: elemento con la scheda aperta → priorita 1 del CONFIG → reparti e edifici → sorgenti e negozi. */
  let scelto = null, tEt = 0;
  const v = new THREE.Vector3();
  function ordinaEtichette(dt) {
    tEt += dt; if (tEt < 0.12) return; tEt = 0;
    const W = innerWidth, H = innerHeight, occupati = [], lista = [];
    for (const id of ['left', 'bar', 'team', 'info', 'guida', 'legenda']) { const e = $(id); if (e && e.offsetParent !== null) { const r = e.getBoundingClientRect(); occupati.push([r.left - 6, r.top - 6, r.right + 6, r.bottom + 6]); } }   // i pannelli visibili
    for (const r of state.recs) {
      if (!r.label.visible || r.mostrato === 'off') continue;
      r.label.getWorldPosition(v); const d = v.distanceTo(world.camera.position); v.project(world.camera);
      if (v.z > 1) { r.div.classList.add('nascosta'); continue; }
      const p = r.el.id === scelto ? 0 : r.el.priorita || (r.el.tipo === 'sorgente' || r.el.tipo === 'officina' ? 3 : 2);
      lista.push({ r, p, d, x: (v.x + 1) / 2 * W, y: (1 - v.y) / 2 * H, w: r.div.offsetWidth + 8, h: r.div.offsetHeight + 6 });
    }
    lista.sort((a, b) => a.p - b.p || a.d - b.d);
    for (const e of lista) {
      const q = [e.x - e.w / 2, e.y - e.h / 2, e.x + e.w / 2, e.y + e.h / 2];
      const libera = !occupati.some((o) => q[0] < o[2] && q[2] > o[0] && q[1] < o[3] && q[3] > o[1]);
      e.r.div.classList.toggle('nascosta', !libera && e.p > 0);
      if (libera || e.p === 0) occupati.push(q);
    }
  }

  return { mostraElemento, mostraWorkload, chiudi, inPausa: () => pausa, collegaTeam, ordinaEtichette, etichetteVisibili: () => state.recs.filter((r) => r.label.visible && !r.div.classList.contains('nascosta')).length };
}
