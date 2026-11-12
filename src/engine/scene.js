// Scena, telecamera, luci, terreno e navigazione.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { mat, box, cyl, ease } from './kit.js';

export function createScene(cfg, sceneEl, labelsEl) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#dfe8ee');
  scene.fog = new THREE.Fog('#dfe8ee', 320, 700);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  sceneEl.appendChild(renderer.domElement);
  const labels = new CSS2DRenderer({ element: labelsEl });

  const camera = new THREE.PerspectiveCamera(42, 1, 1, 1500);
  const home = cfg.layout.camera;
  camera.position.set(...home.pos);

  /* ===== [REQ-UI-01] Navigazione libera: rotazione, zoom, spostamento ===== */
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(...home.target);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.maxPolarAngle = Math.PI * 0.48; controls.minDistance = 18; controls.maxDistance = 420;

  const cielo = new THREE.HemisphereLight(0xffffff, 0xa8b5a0, 1.15); scene.add(cielo);
  let margine = cfg.layout.margineSinistro || 0;
  const sun = new THREE.DirectionalLight(0xffffff, 1.9);
  sun.position.set(-70, 130, 90); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -150, right: 150, top: 150, bottom: -150, near: 10, far: 400 });
  sun.shadow.bias = -0.0005;
  scene.add(sun);

  /* ===== [REQ-WL-05] Terreno vuoto: sempre presente, con il lotto edificabile tracciato ===== */
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), mat('#cfdcc6', { r: 1 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  const c = cfg.layout.capannone, w = c.x[1] - c.x[0], d = c.z[1] - c.z[0];
  const lot = new THREE.Group(); scene.add(lot);
  const dash = new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 2.2, gapSize: 1.6 });
  const outline = new THREE.Line(new THREE.BufferGeometry().setFromPoints(
    [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2], [-w / 2, -d / 2]].map(([x, z]) => new THREE.Vector3(x, 0.06, z))), dash);
  outline.computeLineDistances(); lot.add(outline);
  for (const [x, z] of [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]]) cyl(lot, 0.18, 0.18, 1.6, mat('#ef4444'), x, 0, z, 6);
  box(lot, w, 0.04, d, mat('#d9cfb4', { r: 1 }), 0, 0.005, 0).castShadow = false;

  /* ===== [REQ-UI-06] Spostamenti di telecamera animati ===== */
  let fly = null;
  function flyTo(pos, target, dur = 1.2) {
    fly = { p0: camera.position.clone(), t0: controls.target.clone(), p1: new THREE.Vector3(...pos), t1: new THREE.Vector3(...target), t: 0, dur };
  }
  function frame(centers, radius) { // inquadra un insieme di punti [x,z]
    const cx = centers.reduce((s, p) => s + p[0], 0) / centers.length, cz = centers.reduce((s, p) => s + p[1], 0) / centers.length;
    const r = Math.max(radius, ...centers.map((p) => Math.hypot(p[0] - cx, p[1] - cz) + radius));
    const dist = Math.min(Math.max(r * 2.1, 45), 230);
    flyTo([cx, dist * 0.62, cz + dist * 0.85], [cx, 2, cz]);
  }

  /* ===== [REQ-UI-01] Spostamento con WASD / frecce ===== */
  const keys = new Set();
  const MOVE = { KeyW: [0, -1], ArrowUp: [0, -1], KeyS: [0, 1], ArrowDown: [0, 1], KeyA: [-1, 0], ArrowLeft: [-1, 0], KeyD: [1, 0], ArrowRight: [1, 0] };
  let keyboardMove = true;
  addEventListener('keydown', (e) => { if (MOVE[e.code] && keyboardMove && !e.target.closest?.('input,textarea')) { keys.add(e.code); e.preventDefault(); } });
  addEventListener('keyup', (e) => keys.delete(e.code));
  addEventListener('blur', () => keys.clear());

  function resize() {
    const W = innerWidth, H = innerHeight;
    const off = W > 1100 ? margine : 0;     // centra la scena a destra del pannello
    camera.aspect = (W + off) / H;
    if (off) camera.setViewOffset(W + off, H, 0, 0, W, H); else camera.clearViewOffset();
    camera.updateProjectionMatrix();
    renderer.setSize(W, H); labels.setSize(W, H);
  }
  addEventListener('resize', resize); resize();

  function update(dt) {
    if (fly) {
      fly.t = Math.min(1, fly.t + dt / fly.dur); const k = ease(fly.t);
      camera.position.lerpVectors(fly.p0, fly.p1, k); controls.target.lerpVectors(fly.t0, fly.t1, k);
      if (fly.t >= 1) fly = null;
    }
    if (keys.size) {
      fly = null;
      const fwd = new THREE.Vector3().subVectors(controls.target, camera.position).setY(0).normalize();
      const right = new THREE.Vector3(-fwd.z, 0, fwd.x), v = new THREE.Vector3();
      for (const k of keys) { const [x, z] = MOVE[k]; v.addScaledVector(right, x).addScaledVector(fwd, -z); }
      v.normalize().multiplyScalar(dt * Math.max(25, camera.position.distanceTo(controls.target) * 0.6));
      camera.position.add(v); controls.target.add(v);
    }
    controls.update();
    renderer.render(scene, camera); labels.render(scene, camera);
  }

  /* [REQ-PER-02] durante un percorso il resto della fabbrica si attenua */
  function attenua(v) { cielo.intensity = v ? 0.42 : 1.15; sun.intensity = v ? 0.55 : 1.9; scene.background.set(v ? '#8a949c' : '#dfe8ee'); scene.fog.color.set(v ? '#8a949c' : '#dfe8ee'); }
  return { scene, camera, renderer, controls, flyTo, frame, update, pickables: [], attenua,
    setMargine: (px) => { margine = px; resize(); },
    home: () => flyTo(home.pos, home.target), setKeyboardMove: (v) => { keyboardMove = v; keys.clear(); } };
}
