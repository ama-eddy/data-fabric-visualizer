// Clienti: le persone delle funzioni che entrano dall'ingresso clienti, guardano i report nello showroom e vanno nel proprio negozio.
// [REQ-SCN-16] si muovono solo verso ciò che è acceso e non entrano mai nella zona della fabbrica
import * as THREE from 'three';
import { figura } from './figures.js';

export function createClienti(cfg, world, state) {
  const S = cfg.spoke, n = cfg.spokes.length, passo = Math.min(S.passo, S.larghezza / Math.max(n, 1));
  const V = (x, z) => new THREE.Vector3(x, 0, z);
  const el = (id) => cfg.elements.find((e) => e.id === id), sh = el('showroom'), rc = el('recinzione');
  const acceso = (id) => { const r = state.elemento(id); return !!r && state.effettivo(r) === 'on'; };
  const ZE = rc ? rc.fronteEsterno : S.z + 22, ZA = S.z + 11, ZB = S.strada + 4.5;        // ingresso, corsia davanti ai negozi, corsia dietro
  const perSpoke = n <= 5 ? 2 : 1, tutti = [];
  cfg.elements.filter((e) => e.tipo === 'officina').forEach((neg) => {
    for (let k = 0; k < perSpoke; k++) {
      const o = figura(neg.colore, (neg.indice + k) % 2 ? 'm' : 'f', null); o.visible = false; world.scene.add(o);
      const sx = neg.pos[0], gx = sx + (sx > 0.1 ? -1 : sx < -0.1 ? 1 : k ? -1 : 1) * passo / 2 + (k ? 0.9 : -0.9);   // il passaggio tra due negozi, verso il centro
      tutti.push({ o, neg, k, ex: (tutti.length % 4) * 2 - 3, gx, via: null, lung: null, fatto: 0, soste: null, attesa: 1.5 + tutti.length * 2.3, fermo: 0, i: tutti.length });
    }
  });

  /* il giro: ingresso → showroom (se acceso) → negozio della propria funzione (se acceso) → uscita */
  function giro(c) {
    const p = [V(c.ex, ZE + 12), V(c.ex, ZE), V(c.ex, ZA)], soste = {};
    if (sh && acceso('showroom')) {
      const x = sh.pos[0] - 9 + ((c.i * 5) % 19), z = sh.pos[1] + sh.dim[1] / 2 + 1.6;
      p.push(V(c.gx, ZA), V(c.gx, ZB), V(x, ZB), V(x, z)); soste[p.length - 1] = [5, Math.PI];
      p.push(V(x, ZB), V(c.gx, ZB), V(c.gx, ZA));
    }
    if (acceso(c.neg.id)) {
      const x = c.neg.pos[0] - c.neg.dim[0] * 0.23 + c.k * 1.5, z = c.neg.pos[1] + c.neg.dim[1] * 0.2 + 3.4;
      p.push(V(x, ZA), V(x, z)); soste[p.length - 1] = [6, Math.PI];
      p.push(V(x, ZA));
    }
    if (p.length === 3) return false;
    p.push(V(c.ex + 1.4, ZA), V(c.ex + 1.4, ZE), V(c.ex + 1.4, ZE + 12));
    c.via = p; c.soste = soste; c.lung = p.slice(1).map((q, j) => q.distanceTo(p[j])); c.j = 0; c.fatto = 0; c.fermo = 0;
    return true;
  }
  function update(dt, t) {
    for (const c of tutti) {
      if (!c.via) { c.o.visible = false; c.attesa -= dt; if (c.attesa <= 0) { if (giro(c)) c.o.visible = true; else c.attesa = 2; } continue; }
      if (c.fermo > 0) { c.fermo -= dt; c.o.position.y = 0; continue; }
      c.fatto += dt * 7;
      while (c.j < c.lung.length && c.fatto >= c.lung[c.j]) {
        c.fatto -= c.lung[c.j++];
        if (c.soste[c.j]) { c.fermo = c.soste[c.j][0]; c.fatto = 0; c.o.position.copy(c.via[c.j]); c.o.rotation.y = c.soste[c.j][1]; break; }
      }
      if (c.j >= c.lung.length) { c.via = null; c.attesa = 3 + ((c.i * 7) % 9); continue; }
      if (c.fermo > 0) continue;
      const a = c.via[c.j], b = c.via[c.j + 1];
      c.o.position.lerpVectors(a, b, Math.min(1, c.fatto / (c.lung[c.j] || 1))); c.o.position.y = Math.abs(Math.sin(t * 9 + c.i)) * 0.12;
      if (c.lung[c.j] > 0.01) c.o.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
    }
  }
  return { update, tutti, inCammino: () => tutti.filter((c) => c.o.visible).length, zMinima: () => Math.min(...tutti.filter((c) => c.o.visible).map((c) => c.o.position.z)) };
}
