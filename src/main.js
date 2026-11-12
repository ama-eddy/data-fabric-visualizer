// Avvio: unisce CONFIG e PROFILE, crea scena, stato e interfaccia.
import * as THREE from 'three';
import { createScene } from './engine/scene.js';
import { createState } from './engine/state.js';
import { createUI } from './engine/ui.js';

/* ===== [REQ-CFG-02] Il profilo dell'azienda si sovrappone al modello standard ===== */
function applicaProfilo(cfg, p) {
  if (!p) return cfg;
  if (p.azienda) cfg.meta.titolo += ' · ' + p.azienda;
  if (p.contatto && p.contatto.chi) cfg.contatto = p.contatto;        // [REQ-LIT-02]
  cfg.profilo = { spoke: p.spoke || null, sorgenti: p.sorgenti || null, team: p.team || null }; // usati dai batch 2-3
  return cfg;
}

try {
  const cfg = applicaProfilo(window.CONFIG, window.PROFILE);
  const world = createScene(cfg, document.getElementById('scene'), document.getElementById('labels'));
  const state = createState(cfg, world);
  const ui = createUI(cfg, world, state);
  state.init();
  const clock = new THREE.Clock();
  (function loop() {
    requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 0.1);
    state.update(dt, clock.elapsedTime);
    world.update(dt);
  })();
  window.fabbrica = { cfg, world, state, ui };                         // per prove e collaudo
} catch (e) {
  const el = document.getElementById('err');
  el.style.display = 'flex'; el.textContent = 'Impossibile avviare la fabbrica: ' + e.message;
  console.error(e);
}
