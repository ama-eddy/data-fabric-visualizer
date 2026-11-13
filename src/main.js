// Avvio: unisce CONFIG e PROFILE, crea scena, stato e interfaccia.
import * as THREE from 'three';
import { createScene } from './engine/scene.js';
import { createState } from './engine/state.js';
import { createUI } from './engine/ui.js';
import { createFlows } from './engine/flows.js';
import { elementiSorgenti } from './engine/sources.js';
import { elementiSpoke } from './engine/spoke.js';
import { createFigures } from './engine/figures.js';
import { createGuida } from './engine/guida.js';

/* ===== [REQ-CFG-02] Il profilo dell'azienda si sovrappone al modello standard ===== */
function applicaProfilo(cfg, p) {
  if (!p) return cfg;
  if (p.azienda) { cfg.meta.titolo += ' · ' + p.azienda; cfg.meta.azienda = p.azienda; }
  if (p.contatto && p.contatto.chi) cfg.contatto = p.contatto;        // [REQ-LIT-02]
  /* [REQ-CFG-03] sorgenti del profilo: nome, categoria e flusso on/off sostituiscono il catalogo standard */
  if (p.sorgenti && p.sorgenti.length) cfg.sources = p.sorgenti.map((s, i) => ({ id: 'src-' + i, nome: s.nome, categoria: s.categoria, stato: s.flusso === 'off' ? 'off' : 'on', narrativa: s.flusso === 'off' ? 'off' : 'on' }));
  /* [REQ-HS-02, REQ-HS-07] spoke del profilo: nome e stato on/wip/off */
  if (p.spoke && p.spoke.length) cfg.spokes = p.spoke.map((s) => ({ nome: s.nome, stato: ['on', 'wip', 'off'].includes(s.stato) ? s.stato : 'on' }));
  /* [REQ-SCN-11] team dati del profilo: uomini e donne al trasporto e a rotazione */
  /* [REQ-CFG-03] team di partenza del profilo: sagoma, nome (solo nella versione aziendale) e workload assegnati, per codice o per nome */
  if (Array.isArray(p.team)) {
    const codice = (w) => Object.keys(cfg.workloads).find((k) => k === w || cfg.workloads[k].nome.toLowerCase() === String(w).trim().toLowerCase() || cfg.workloads[k].nome.toLowerCase().startsWith(String(w).trim().toLowerCase()));
    cfg.team.persone = p.team.slice(0, cfg.team.max).map((x) => ({ sesso: /^(f|donna)/i.test(x.sagoma || x.sesso || '') ? 'f' : 'm', nome: x.nome || '', wl: (x.workload || x.wl || []).map(codice).filter(Boolean) }));
  }
  return cfg;
}

/* ===== [REQ-CFG-08] I testi di TESTI.md sostituiscono quelli del CONFIG ===== */
function applicaTesti(cfg, testi) {
  for (const [chiave, testo] of Object.entries(testi || {})) {
    const p = chiave.split('.'); let o = cfg;
    for (let i = 0; i < p.length - 1 && o; i++) o = Array.isArray(o) ? (o.find((x) => x && x.id === p[i]) || o[+p[i]]) : o[p[i]];
    if (o && typeof o === 'object') o[p[p.length - 1]] = testo;
  }
  return cfg;
}

try {
  const cfg = applicaProfilo(applicaTesti(window.CONFIG, window.TESTI), window.PROFILE);
  const world = createScene(cfg, document.getElementById('scene'), document.getElementById('labels'));
  cfg.elements.push(...elementiSorgenti(cfg), ...elementiSpoke(cfg));
  const fi = cfg.elements.findIndex((e) => e.tipo === 'piazzale'); if (fi >= 0) cfg.elements.push(...cfg.elements.splice(fi, 1));   // i lotti dei fornitori servono le posizioni delle sorgenti
  const flows = createFlows(cfg, world);
  const state = createState(cfg, world, flows);
  flows.collega(state);
  const figures = createFigures(cfg, world, state, flows);
  const ui = createUI(cfg, world, state);
  ui.collegaTeam(figures);
  const guida = createGuida(cfg, world, state, ui);
  /* [NFR-03] contatore dei fotogrammi al secondo: si attiva aggiungendo ?fps all'indirizzo */
  const fpsEl = document.getElementById('fps'), fps = { n: 0, t: 0, v: 0 }; if (/[?&]fps/.test(location.search)) fpsEl.style.display = 'block';
  state.init();
  const clock = new THREE.Clock();
  (function loop() {
    requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 0.1);
    state.update(dt, clock.elapsedTime);
    flows.update(dt, ui.inPausa());
    figures.update(dt, clock.elapsedTime);
    ui.ordinaEtichette(dt);
    fps.n++; fps.t += dt; if (fps.t >= 1) { fps.v = Math.round(fps.n / fps.t); fps.n = 0; fps.t = 0; fpsEl.textContent = fps.v + ' fps'; }
    world.update(dt);
  })();
  window.fabbrica = { cfg, world, state, ui, flows, figures, guida, fps: () => fps.v };                         // per prove e collaudo
} catch (e) {
  const el = document.getElementById('err');
  el.style.display = 'flex'; el.textContent = 'Impossibile avviare la fabbrica: ' + e.message;
  console.error(e);
}
