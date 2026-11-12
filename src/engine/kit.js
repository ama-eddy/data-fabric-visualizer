// Mattoncini 3D riusati da tutti i costruttori. [REQ-SCN-08] stile "da plastico", nessun asset esterno.
import * as THREE from 'three';

const cache = new Map();
export function mat(color, o = {}) {
  const key = color + JSON.stringify(o);
  if (!cache.has(key)) {
    cache.set(key, new THREE.MeshStandardMaterial({
      color, roughness: o.r ?? 0.85, metalness: o.m ?? 0.05,
      emissive: o.e ?? 0x000000, emissiveIntensity: o.ei ?? 1,
      transparent: o.op !== undefined, opacity: o.op ?? 1, side: o.side ?? THREE.FrontSide,
    }));
  }
  return cache.get(key);
}
// y = quota della base
export function box(parent, w, h, d, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y + h / 2, z); m.castShadow = true; m.receiveShadow = true;
  parent.add(m); return m;
}
export function cyl(parent, rTop, rBot, h, material, x = 0, y = 0, z = 0, seg = 20) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg), material);
  m.position.set(x, y + h / 2, z); m.castShadow = true; m.receiveShadow = true;
  parent.add(m); return m;
}
export function stripeTexture(a = '#facc15', b = '#1f2937') {
  const c = document.createElement('canvas'); c.width = 64; c.height = 16;
  const g = c.getContext('2d'); g.fillStyle = a; g.fillRect(0, 0, 64, 16); g.fillStyle = b;
  for (let i = -16; i < 64; i += 16) { g.beginPath(); g.moveTo(i, 16); g.lineTo(i + 8, 16); g.lineTo(i + 24, 0); g.lineTo(i + 16, 0); g.fill(); }
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; return t;
}
export const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
