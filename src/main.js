// Avvio: unisce CONFIG e PROFILE, crea scena, stato e interfaccia.
import * as THREE from 'three';
import { createScene } from './engine/scene.js';
import { createState } from './engine/state.js';
import { createUI } from './engine/ui.js';
import { createFlows } from './engine/flows.js';
import { elementiSorgenti } from './engine/sources.js';

/* ===== [REQ-CFG-02] Il profilo dell'azienda si sovrappone al modello standard ===== */
function applicaProfilo(cfg, p) {
  if (!p) return cfg;
  if (p.azienda) cfg.meta.titolo += ' · ' + p.azienda;
  if (p.contatto && p.contatto.chi) cfg.contatto = p.contatto;        // [REQ-LIT-02]
  /* [REQ-CFG-03] sorgenti del profilo: nome, categoria e flusso on/off sostituiscono il catalogo standard */
  if (p.sorgenti && p.sorgenti.length) cfg.sources = p.sorgenti.map((s, i) => ({ id: 'src-' + i, nome: s.nome, categoria: s.categoria, stato: s.flusso === 'off' ? 'off' : 'on' }));
  cfg.profilo = { spoke: p.spoke || null, team: p.team || null }; // usati dal batch 3
  return cfg;
}

try {
  const cfg = applicaProfilo(window.CONFIG, window.PROFILE);
  const world = createScene(cfg, document.getElementById('scene'), document.getElementById('labels'));
  cfg.elements.push(...elementiSorgenti(cfg));
  const flows = createFlows(cfg, world);
  const state = createState(cfg, world, flows);
  flows.collega(state);
  const ui = createUI(cfg, world, state);
  state.init();
  const clock = new THREE.Clock();
  (function loop() {
    requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 0.1);
    state.update(dt, clock.elapsedTime);
    flows.update(dt, ui.inPausa());
    world.update(dt);
  })();
  window.fabbrica = { cfg, world, state, ui, flows };                         // per prove e collaudo
} catch (e) {
  const el = document.getElementById('err');
  el.style.display = 'flex'; el.textContent = 'Impossibile avviare la fabbrica: ' + e.message;
  console.error(e);
}
