// Prova automatica del batch corrente: apre fabbrica-dati.html, controlla che non ci siano
// richieste di rete [NFR-01] né errori, e salva alcune schermate in tests/out/.
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const out = path.join(__dirname, 'out'); fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 860 } });
  const errors = [], ext = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('request', (r) => { if (!r.url().startsWith('file:') && !r.url().startsWith('data:') && !r.url().startsWith('blob:')) ext.push(r.url()); });
  await page.goto('file://' + path.join(__dirname, '..', 'fabbrica-dati.html'));
  await page.waitForFunction(() => window.fabbrica);
  const shot = async (n, ms = 2200) => { await page.waitForTimeout(ms); await page.screenshot({ path: path.join(out, n + '.png') }); };
  const check = (c, m) => { if (!c) { errors.push('ATTESO: ' + m); } };

  await shot('1-terreno-vuoto', 600);
  check(await page.locator('#wl .row').count() === 12, '12 workload nel pannello');
  check(await page.evaluate(() => fabbrica.state.recs.every((r) => !r.on.visible && !r.wip.visible)), 'scena vuota all\'avvio');

  await page.locator('#wl .row[data-wl="ARC"] .seg button[data-s="on"]').click();
  await shot('2-architettura');
  check(await page.evaluate(() => fabbrica.state.elemento('capannone').on.visible), 'capannone visibile');

  await page.locator('#wl .row[data-wl="INT"] .seg button[data-s="wip"]').click();
  await page.locator('#wl .row[data-wl="TRF"] .seg button[data-s="on"]').click();
  await shot('3-int-cantiere-trf-on');
  check(await page.evaluate(() => fabbrica.state.elemento('bronze').wip.visible && !fabbrica.state.elemento('bronze').on.visible), 'Bronze in cantiere');

  await page.getByText('Tutto on').click();
  await shot('4-tutto-on');
  await page.evaluate(() => fabbrica.ui.mostraElemento('laboratorio'));
  await page.locator('#wl .row[data-wl="ARC"] .name').click();
  await shot('5-scheda', 1800);
  check(await page.locator('#info.open').count() === 1, 'scheda aperta');

  // clic reale sulla centrale [REQ-UI-02] e spostamento da tastiera [REQ-UI-01]
  await page.getByText("Vista d'insieme").click(); await page.waitForTimeout(1600);
  await page.evaluate(() => fabbrica.ui.chiudi());
  const pt = await page.evaluate(() => { const v = fabbrica.state.elemento('centrale').root.position.clone(); v.y = 4; v.x -= 3; v.project(fabbrica.world.camera); return [(v.x + 1) / 2 * innerWidth, (1 - v.y) / 2 * innerHeight]; });
  await page.mouse.move(pt[0], pt[1]); await page.waitForTimeout(150); await page.mouse.move(pt[0] + 1, pt[1]); await page.waitForTimeout(150);
  check(await page.locator('#tip').evaluate((e) => e.style.display === 'block' && e.textContent === 'Centrale elettrica'), 'tooltip sulla centrale');
  await page.mouse.click(pt[0], pt[1]);
  check(await page.locator('#info h3').textContent() === 'Centrale elettrica', 'clic sulla centrale apre la sua scheda');
  const x0 = await page.evaluate(() => fabbrica.world.controls.target.x);
  await page.keyboard.down('KeyD'); await page.waitForTimeout(400); await page.keyboard.up('KeyD');
  check(await page.evaluate((x) => fabbrica.world.controls.target.x > x + 1, x0), 'WASD sposta la vista');

  // ---- Batch 2: catena del valore ----
  await page.evaluate(() => fabbrica.ui.chiudi());
  const tipi = () => page.evaluate(() => { const o = {}; for (const r of fabbrica.flows.routes) o[r.tipo] = (o[r.tipo] || 0) + r.items.length; return o; });
  await shot('6-catena-del-valore', 9000);
  const visti = await page.waitForFunction(() => { const v = (window.__visti = window.__visti || {}); for (const r of fabbrica.flows.routes) if (r.items.length) v[r.tipo] = 1; return v.camion && v.officina && v.impulso; }, null, { timeout: 20000 }).then(() => true, () => false);
  check(visti, 'camion, camion-officina e condotta in movimento');
  let t = await tipi();
  check(t.grezzo > 0 && t.bronze > 0 && t.silver > 0 && t.gold > 0 && t.semilavorato > 0, 'materiale a ogni stadio: ' + JSON.stringify(t));
  check(await page.evaluate(() => fabbrica.state.recs.filter((r) => r.el.tipo === 'sorgente' && r.on.visible).length) === 9, '9 sorgenti visibili');
  await page.evaluate(() => fabbrica.state.set('TRF', 'wip')); await page.waitForTimeout(400);    // [REQ-FLW-09]
  t = await tipi();
  check(t.grezzo > 0 && !t.bronze && !t.silver && !t.gold && !t.semilavorato, 'con TRF in cantiere il flusso si ferma al Bronze: ' + JSON.stringify(t));
  await page.evaluate(() => { fabbrica.state.set('TRF', 'on'); fabbrica.state.set('ARC', 'off'); }); await page.waitForTimeout(400);  // [REQ-WL-06]
  t = await tipi();
  check(Object.values(t).every((n) => !n), 'senza Architettura a monte tutto resta fermo: ' + JSON.stringify(t));
  check(await page.evaluate(() => fabbrica.state.elemento('silver').on.visible), 'i reparti restano visibili anche se fermi');
  await page.evaluate(() => fabbrica.state.set('ARC', 'on'));
  await page.evaluate(() => fabbrica.state.setElemento('src-erp', 'off')); await page.waitForTimeout(1500);              // [REQ-SRC-08]
  check(await page.evaluate(() => { const r = fabbrica.state.elemento('src-erp'); return !r.on.visible && !r.wip.visible; }), 'sorgente spenta: assente');
  await page.evaluate(() => fabbrica.state.setElemento('src-erp', 'wip')); await page.waitForTimeout(1500);
  check(await page.evaluate(() => fabbrica.state.elemento('src-erp').wip.visible), 'sorgente in cantiere');
  await page.evaluate(() => { fabbrica.state.setElemento('src-erp', 'on'); fabbrica.ui.mostraElemento('src-hr'); const r = fabbrica.state.elemento('src-lake'); fabbrica.world.flyTo([r.el.pos[0] - 35, 38, -30], [r.el.pos[0] - 14, 3, -58]); });
  await shot('7-sorgenti', 5000);
  check((await page.locator('#info').textContent()).includes('non passa dalla banchina'), 'scheda della condotta: non passa dalla banchina');
  check(await page.locator('#legenda .voce').count() === 11, 'legenda: 6 materiali e 5 mezzi');
  await page.getByText('Pausa flussi').click(); const p0 = await page.evaluate(() => fabbrica.flows.routes.find((r) => r.items.length).items[0].u);
  await page.waitForTimeout(500);
  check(await page.evaluate((u) => fabbrica.flows.routes.find((r) => r.items.length).items[0].u === u, p0), 'pausa: il materiale si ferma');
  await page.getByText('Riprendi flussi').click();
  await page.evaluate(() => fabbrica.world.flyTo([38, 26, 44], [4, 2, -6]));
  await shot('8-reparti', 4000);

  // ---- Batch 3: consumo, spoke e persone ----
  await page.evaluate(() => { fabbrica.ui.chiudi(); fabbrica.world.flyTo([10, 60, 150], [0, 2, 52]); });
  check(await page.waitForFunction(() => fabbrica.flows.routes.some((r) => r.tipo === 'furgone' && r.items.length), null, { timeout: 20000 }).then(() => true, () => false), 'furgoni verso gli spoke');
  await shot('9-spoke', 2500);
  check(await page.evaluate(() => fabbrica.state.recs.filter((r) => r.el.tipo === 'officina' && r.on.visible).length) === 5, '5 officine visibili');
  let f = await page.evaluate(() => fabbrica.figures.conta());
  check(f.trasporto === 2 && f.rotazione === 3 && f.totale === 5, 'team dati: 2 al trasporto e 3 a rotazione: ' + JSON.stringify(f));
  await page.evaluate(() => fabbrica.state.set('ACC', 'off')); await page.waitForTimeout(400);       // [REQ-WL-06] SSR dipende dagli Accessi
  check(await page.evaluate(() => !fabbrica.flows.routes.some((r) => r.tipo === 'furgone' && r.items.length)), 'senza Accessi i furgoni si fermano');
  await page.evaluate(() => { fabbrica.state.set('ACC', 'on'); fabbrica.state.set('VIS', 'off'); fabbrica.state.set('GOV', 'off'); fabbrica.state.set('ARC', 'wip'); });
  await page.waitForTimeout(300);
  f = await page.evaluate(() => fabbrica.figures.conta());
  check(f.rotazione === 0, 'senza postazioni attive le figure a rotazione non compaiono: ' + JSON.stringify(f));
  await page.evaluate(() => { fabbrica.state.setTutti('on'); fabbrica.ui.mostraElemento('team:rotazione'); fabbrica.world.flyTo([-30, 30, 78], [-22, 3, 40]); });
  await shot('10-team-e-showroom', 3500);
  check((await page.locator('#info h3').textContent()).startsWith('Team dati'), 'scheda del team dati');

  // ---- Batch 4: workload trasversali e opzionali ----
  check(await page.evaluate(() => !fabbrica.cfg.elements.some((e) => e.tipo === 'segnaposto')), 'nessun segnaposto rimasto');
  check(await page.waitForFunction(() => fabbrica.flows.routes.some((r) => r.tipo === 'evento' && r.items.length), null, { timeout: 15000 }).then(() => true, () => false), 'nastro veloce verso la sala sensori');
  await page.evaluate(() => fabbrica.state.set('RTI', 'off')); await page.waitForTimeout(300);            // [REQ-SRC-06]
  check(await page.evaluate(() => !fabbrica.flows.routes.some((r) => r.tipo === 'evento' && r.items.length) && fabbrica.state.elemento('src-iot').on.visible), 'Real-Time spento: sensori visibili ma senza flusso');
  await page.evaluate(() => { fabbrica.state.set('RTI', 'on'); fabbrica.ui.chiudi(); fabbrica.world.home(); });
  await shot('12-tutto-on', 3500);
  await page.evaluate(() => fabbrica.world.flyTo([-10, 26, 92], [-22, 4, 44]));
  await shot('13-fronte', 3000);
  await page.evaluate(() => fabbrica.world.flyTo([18, 30, -8], [60, 4, -4]));
  await shot('14-realtime-knowledge', 3000);
  await page.evaluate(() => { fabbrica.state.set('INT', 'off'); fabbrica.world.flyTo([-18, 16, -44], [-58, 4, -46]); });
  await shot('15-sala-controllo', 3000);
  await page.evaluate(() => fabbrica.state.set('INT', 'on'));

  // profilo di esempio [REQ-CFG-03]
  const pe = await browser.newPage({ viewport: { width: 1440, height: 860 } });
  pe.on('pageerror', (e) => errors.push('esempio: ' + e.message));
  await pe.goto('file://' + path.join(__dirname, 'esempio.html')); await pe.waitForFunction(() => window.fabbrica);
  await pe.getByText('Tutto on').click(); await pe.waitForTimeout(2500);
  const ep = await pe.evaluate(() => { const S = fabbrica.state, st = (t) => S.recs.filter((r) => r.el.tipo === t).map((r) => r.el.nome + ':' + S.effettivo(r)); fabbrica.ui.mostraElemento('banchina');
    return { titolo: document.getElementById('titolo').textContent, spoke: st('officina'), src: st('sorgente'), team: fabbrica.figures.conta().totale, scheda: document.getElementById('info').textContent }; });
  check(ep.titolo.includes('Esempio S.p.A.'), 'profilo: nome azienda');
  check(ep.spoke.join() === 'Officina Amministrazione:on,Officina Vendite:on,Officina Acquisti:wip,Officina Personale:off', 'profilo: spoke e stati: ' + ep.spoke);
  check(ep.src.join() === 'Il gestionale:on,CRM vendite:on,Budget (Excel):on,Presenze:off', 'profilo: sorgenti e flussi: ' + ep.src);
  check(ep.team === 5 && ep.scheda.includes('dati@esempio.example'), 'profilo: team e contatto');
  await pe.screenshot({ path: path.join(out, '11-profilo-esempio.png') }); await pe.close();

  await page.getByText('Tutto off').click();
  await page.waitForTimeout(1500);
  check(await page.evaluate(() => fabbrica.state.recs.every((r) => !r.on.visible && !r.wip.visible)), 'tutto off svuota la scena');

  check(ext.length === 0, 'nessuna richiesta di rete: ' + ext.join(', '));
  await browser.close();
  if (errors.length) { console.error('ERRORI:\n' + errors.join('\n')); process.exit(1); }
  console.log('OK: nessun errore, nessuna richiesta di rete');
})();
