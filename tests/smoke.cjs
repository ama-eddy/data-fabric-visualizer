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

  await page.getByText('Tutto off').click();
  await page.waitForTimeout(1500);
  check(await page.evaluate(() => fabbrica.state.recs.every((r) => !r.on.visible && !r.wip.visible)), 'tutto off svuota la scena');

  check(ext.length === 0, 'nessuna richiesta di rete: ' + ext.join(', '));
  await browser.close();
  if (errors.length) { console.error('ERRORI:\n' + errors.join('\n')); process.exit(1); }
  console.log('OK: nessun errore, nessuna richiesta di rete');
})();
