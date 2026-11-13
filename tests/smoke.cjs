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
  check(await page.locator('#benvenuto.open').count() === 1, 'schermata di benvenuto all\'apertura');   // [REQ-LIT-04]
  await page.getByText('Esplora liberamente').click();

  await page.evaluate(() => fabbrica.world.flyTo([0, 40, -40], [0, 0, -86], 0.01));
  await shot('0-area-fornitori-vuota', 1500);
  check(await page.evaluate(() => !fabbrica.state.elemento('fornitori').label.visible), 'area fornitori senza etichetta');   // [RDM-034]
  await page.evaluate(() => fabbrica.world.home());
  await shot('1-terreno-vuoto', 1500);
  check(await page.locator('#wl > .row').count() === 13, '13 workload nel pannello');
  check(await page.evaluate(() => fabbrica.state.stato.SRC === 'on' && fabbrica.state.recs.every((r) => (r.el.wl === 'SRC' && r.el.tipo !== 'sorgente') || (!r.on.visible && !r.wip.visible))), 'all\'avvio: solo l\'area fornitori, sorgenti spente');
  check(await page.evaluate(() => fabbrica.state.recs.filter((r) => r.el.tipo === 'sorgente').every((r) => r.proprio === 'off')), 'tutte le sorgenti spente di default');

  await page.locator('#wl .row[data-wl="ARC"] .seg button[data-s="on"]').click();
  await shot('2-architettura');
  check(await page.evaluate(() => fabbrica.state.elemento('capannone').on.visible), 'capannone visibile');

  await page.locator('#wl .row[data-wl="INT"] .seg button[data-s="wip"]').click();
  await page.locator('#wl .row[data-wl="TRF"] .seg button[data-s="on"]').click();
  await shot('3-int-cantiere-trf-on');
  check(await page.evaluate(() => fabbrica.state.elemento('bronze').wip.visible && !fabbrica.state.elemento('bronze').on.visible), 'Bronze in cantiere');

  await page.getByText('Tutto on').click();
  await page.evaluate(() => fabbrica.state.recs.filter((r) => r.el.tipo === 'sorgente').forEach((r) => fabbrica.state.setElemento(r.el.id, 'on')));   // si accendono le sorgenti
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
  check(await page.evaluate(() => fabbrica.world.scene.children.some((o) => o.type === 'BoxHelper' && o.visible)), 'elemento sotto il mouse incorniciato');   // [REQ-UI-05]
  await page.mouse.click(pt[0], pt[1]);
  check(await page.locator('#info h3').textContent() === 'Centrale elettrica', 'clic sulla centrale apre la sua scheda');
  const x0 = await page.evaluate(() => fabbrica.world.controls.target.x);
  await page.keyboard.down('KeyD'); await page.waitForTimeout(400); await page.keyboard.up('KeyD');
  check(await page.evaluate((x) => fabbrica.world.controls.target.x > x + 1, x0), 'WASD sposta la vista');

  // ---- Batch 2: catena del valore ----
  await page.evaluate(() => fabbrica.ui.chiudi());
  const tipi = () => page.evaluate(() => { const o = {}; for (const r of fabbrica.flows.routes) o[r.tipo] = (o[r.tipo] || 0) + r.items.length; return o; });
  await shot('6-catena-del-valore', 9000);
  const visti = await page.waitForFunction(() => { const v = (window.__visti = window.__visti || {}); for (const r of fabbrica.flows.routes) if (r.items.length) v[r.tipo] = 1; return v.galleggiante && v.scialuppa; }, null, { timeout: 20000 }).then(() => true, () => false);
  check(visti, 'scivoli e scialuppe in movimento');
  let t = await tipi();
  check(t.grezzo > 0 && t.bronze > 0 && t.silver > 0 && t.gold > 0 && t.semilavorato > 0, 'materiale a ogni stadio: ' + JSON.stringify(t));
  check(await page.evaluate(() => fabbrica.state.recs.filter((r) => r.el.tipo === 'sorgente' && r.on.visible).length) === 11, '11 sorgenti visibili');
  await page.evaluate(() => fabbrica.state.set('TRF', 'wip')); await page.waitForTimeout(400);    // [REQ-FLW-09]
  t = await tipi();
  check(t.grezzo > 0 && !t.bronze && !t.silver && !t.gold && !t.semilavorato, 'con TRF in cantiere il flusso si ferma al Bronze: ' + JSON.stringify(t));
  await page.evaluate(() => { fabbrica.state.set('TRF', 'on'); fabbrica.state.set('ARC', 'off'); }); await page.waitForTimeout(400);  // [REQ-WL-06]
  t = await tipi();
  check(Object.values(t).every((n) => !n), 'senza Architettura a monte tutto resta fermo: ' + JSON.stringify(t));
  check(await page.evaluate(() => fabbrica.state.elemento('silver').on.visible), 'i reparti restano visibili anche se fermi');
  await page.evaluate(() => fabbrica.state.set('ARC', 'on'));
  await page.evaluate(() => fabbrica.state.setElemento('src-erp', 'off')); await page.waitForFunction(() => { const r = fabbrica.state.elemento('src-erp'); return !r.on.visible && !r.wip.visible; }, null, { timeout: 15000 }).catch(() => {});              // [REQ-SRC-08]
  check(await page.evaluate(() => { const r = fabbrica.state.elemento('src-erp'); return !r.on.visible && !r.wip.visible; }), 'sorgente spenta: assente');
  await page.evaluate(() => fabbrica.state.setElemento('src-erp', 'wip')); await page.waitForFunction(() => fabbrica.state.elemento('src-erp').wip.visible, null, { timeout: 15000 }).catch(() => {});
  check(await page.evaluate(() => fabbrica.state.elemento('src-erp').wip.visible), 'sorgente in cantiere');
  await page.evaluate(() => { fabbrica.state.setElemento('src-erp', 'on'); fabbrica.ui.mostraElemento('src-lake'); const r = fabbrica.state.elemento('src-lake'); fabbrica.world.flyTo([r.el.pos[0] - 35, 38, -30], [r.el.pos[0] - 14, 3, -58]); });
  await shot('7-sorgenti', 5000);
  check((await page.locator('#info').textContent()).includes('compare nel lago'), 'scheda del ponte di vetro: compare nel lago');
  check((await page.locator('#info .tecnico').textContent()).includes('Shortcut'), 'scheda: nome tecnico (In Fabric)');
  await page.evaluate(() => fabbrica.ui.mostraElemento('confezionamento'));
  check((await page.locator('#info .tecnico').textContent()).includes('Semantic model') && !(await page.locator('#info h3').textContent()).includes('Semantic'), 'semilavorati: Semantic model nella scheda, non nel nome');
  check(await page.locator('#legenda .voce').count() === 10, 'legenda: 6 materiali e 4 mezzi');
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
  // ---- RDM-033: team componibile a schermo ----
  let f = await page.evaluate(() => fabbrica.figures.conta());
  check(f.totale === 5 && f.caffe === 5, 'di partenza: 5 persone, nessuna assegnata, tutte alla macchinetta del caffè: ' + JSON.stringify(f));
  check(await page.locator('#wl > .row.scoperto').count() === 13, 'tutti i workload accesi sono scoperti');                // [REQ-WL-13]
  await page.locator('.pupazzo').nth(0).dragTo(page.locator('#wl > .row[data-wl="INT"]'));                                 // [REQ-UI-13]
  await page.locator('.pupazzo').nth(0).dragTo(page.locator('#wl > .row[data-wl="VIS"]'));
  await page.locator('.pupazzo').nth(1).dragTo(page.locator('#wl > .row[data-wl="INT"]'));
  await page.waitForTimeout(300);
  let tm = await page.evaluate(() => ({ wl: fabbrica.figures.tutte.map((x) => x.wl.join('+')), pallini: document.querySelectorAll('.pallino').length, int: document.querySelector('#wl > .row[data-wl="INT"]').classList.contains('scoperto') }));
  check(tm.wl[0] === 'INT+VIS' && tm.wl[1] === 'INT' && tm.pallini === 3 && !tm.int, 'trascinamento: una persona su due workload, tre pallini, Data Integration non più scoperta: ' + JSON.stringify(tm));
  await page.locator('.pallino[data-wl="VIS"]').click(); await page.waitForTimeout(150);
  check(await page.evaluate(() => fabbrica.figures.tutte[0].wl.join()) === 'INT', 'clic sul pallino: assegnazione tolta');
  await page.locator('.tasto.piu').nth(1).click(); await page.locator('.tasto.piu').nth(0).click();                         // [REQ-UI-12]
  check(await page.evaluate(() => fabbrica.figures.tutte.length === 7 && fabbrica.figures.tutte[5].sesso === 'f') && await page.locator('.pupazzo').count() === 7, 'più: due persone aggiunte');
  await page.locator('.tasto.meno').click();
  check(await page.evaluate(() => fabbrica.figures.tutte.length) === 6, 'meno: tolta l\'ultima');
  await page.locator('.pupazzo').nth(2).click(); await page.waitForTimeout(300);
  check((await page.locator('#info h3').textContent()).startsWith('Persona del team dati'), 'clic sul pupazzino: scheda della persona');
  await page.locator('#info .chip2[data-wl="GOV"]').click(); await page.locator('#info .chip2[data-wl="ACC"]').click(); await page.waitForTimeout(200);
  check(await page.evaluate(() => fabbrica.figures.tutte[2].wl.join()) === 'GOV,ACC' && (await page.locator('#info .tecnico').textContent()).includes('Data steward'), 'assegnazione dalla scheda, con il ruolo');
  check(await page.evaluate(() => JSON.parse(localStorage.getItem('fabbrica-team:standard')).length) === 6, 'team salvato nel browser');   // [REQ-UI-14]
  const g0 = await page.evaluate(() => fabbrica.figures.tutte[2].ora);
  check(await page.waitForFunction((g) => fabbrica.figures.tutte[2].ora !== g, g0, { timeout: 40000 }).then(() => true, () => false), 'con due workload accesi la persona ruota tra le postazioni');
  await page.evaluate(() => { fabbrica.state.set('GOV', 'off'); fabbrica.state.set('ACC', 'off'); }); await page.waitForTimeout(200);
  check(await page.evaluate(() => fabbrica.figures.tutte[2].ora) === null, 'workload spenti: la persona torna alla macchinetta del caffè');
  await page.evaluate(() => { fabbrica.ui.chiudi(); fabbrica.state.setTutti('on'); fabbrica.world.flyTo([-10, 22, 66], [-12, 2, 40]); });
  await shot('10-team-macchinetta', 3500);
  await page.reload(); await page.waitForFunction(() => window.fabbrica); await page.getByText('Esplora liberamente').click();
  check(await page.evaluate(() => fabbrica.figures.tutte.length === 6 && fabbrica.figures.tutte[0].wl.join() === 'INT'), 'dopo una ricarica il team è quello lasciato');
  await page.getByText('Azzera').click();
  check(await page.evaluate(() => fabbrica.figures.tutte.length === 5 && fabbrica.figures.tutte.every((x) => !x.wl.length)), 'Azzera: torna il team di partenza');
  await page.getByText('Tutto on').click();
  await page.evaluate(() => fabbrica.state.recs.filter((r) => r.el.tipo === 'sorgente').forEach((r) => fabbrica.state.setElemento(r.el.id, 'on')));
  await page.evaluate(() => { fabbrica.figures.assegna(fabbrica.figures.tutte[3].id, 'GOV'); fabbrica.figures.assegna(fabbrica.figures.tutte[4].id, 'SRC'); fabbrica.figures.assegna(fabbrica.figures.tutte[1].id, 'SSR'); });

  // ---- RDM-016/017/018: laboratorio e showroom, tendina delle sorgenti, pannello del team ----
  await page.locator('#wl .row[data-wl="SRC"] .apri').click();
  check(await page.locator('.sub.open .subrow').count() === 11, 'tendina: 11 sorgenti');
  await page.locator('.subrow[data-el="src-pim"] .seg button[data-s="off"]').click(); await page.waitForTimeout(3500);
  check(await page.evaluate(() => { const r = fabbrica.state.elemento('src-pim'); return !r.on.visible && fabbrica.state.elemento('src-crm').on.visible; }), 'tendina: si spegne una sola sorgente');
  await page.locator('.subrow[data-el="src-pim"] .seg button[data-s="on"]').click();
  check(await page.waitForFunction(() => fabbrica.flows.routes.some((r) => r.tipo === 'semilavorato' && r.punti[0][1] > 3 && r.items.length), null, { timeout: 25000 }).then(() => true, () => false), 'passerella dal laboratorio allo showroom');
  check(await page.locator('.pupazzo').count() === 5, 'pannello del team: 5 pupazzini');
  await page.locator('.pupazzo').nth(3).click(); await page.waitForTimeout(1600);
  check(await page.evaluate(() => fabbrica.figures.scelta() === fabbrica.figures.tutte[3].id) && (await page.locator('#info h3').textContent()).startsWith('Persona del team dati'), 'clic sul pupazzino: evidenziato e scheda aperta');
  await shot('16-pupazzo-evidenziato', 300);
  await page.evaluate(() => fabbrica.world.flyTo([-36, 34, 70], [-34, 3, 28]));
  await shot('17-laboratorio-showroom', 3000);
  await page.locator('.pupazzo').nth(3).click();

  // ---- Batch 4: workload trasversali e opzionali ----
  check(await page.evaluate(() => !fabbrica.cfg.elements.some((e) => e.tipo === 'segnaposto')), 'nessun segnaposto rimasto');
  check(await page.waitForFunction(() => fabbrica.flows.routes.some((r) => r.tipo === 'evento' && r.items.length), null, { timeout: 15000 }).then(() => true, () => false), 'nastro veloce verso la sala sensori');
  await page.evaluate(() => fabbrica.state.set('RTI', 'off')); await page.waitForTimeout(300);            // [REQ-SRC-06]
  check(await page.evaluate(() => !fabbrica.flows.routes.some((r) => r.tipo === 'evento' && r.items.length) && fabbrica.state.elemento('src-iot').on.visible), 'Real-Time spento: sensori visibili ma senza flusso');
  await page.evaluate(() => { fabbrica.state.set('RTI', 'on'); fabbrica.state.set('INT', 'off'); }); await page.waitForTimeout(3500);   // [RDM-022]
  check(await page.evaluate(() => fabbrica.state.elemento('src-erp').on.visible && !fabbrica.state.elemento('tr-src-erp').on.visible), 'Data Sources senza Data Integration: edifici sì, scivoli no');
  await page.evaluate(() => { fabbrica.state.set('INT', 'on'); fabbrica.state.set('SRC', 'off'); }); await page.waitForTimeout(3500);
  check(await page.evaluate(() => !fabbrica.state.elemento('src-erp').on.visible && !fabbrica.state.elemento('tr-src-erp').on.visible && !fabbrica.flows.routes.some((r) => r.tipo === 'grezzo' && r.items.length)), 'Data Integration senza Data Sources: nessun fornitore, nessun materiale');
  await page.evaluate(() => { fabbrica.state.set('SRC', 'on'); fabbrica.world.flyTo([0, 70, 10], [0, 0, -60]); });
  await shot('18-lago', 4500);
  await page.evaluate(() => fabbrica.world.flyTo([30, 22, -22], [12, 2, -46]));
  await shot('19-gru-e-pannello', 4000);
  await page.evaluate(() => { fabbrica.state.set('RTI', 'on'); fabbrica.ui.chiudi(); fabbrica.world.home(); });
  await shot('12-tutto-on', 3500);
  const sovrapposte = await page.evaluate(() => { const r = [...document.querySelectorAll('.lbl')].filter((e) => e.offsetParent && getComputedStyle(e).opacity > 0.5 && !e.classList.contains('nascosta')).map((e) => e.getBoundingClientRect()); let n = 0; for (let i = 0; i < r.length; i++) for (let j = i + 1; j < r.length; j++) if (r[i].left < r[j].right && r[i].right > r[j].left && r[i].top < r[j].bottom && r[i].bottom > r[j].top) n++; return [n, r.length]; });
  check(sovrapposte[0] === 0 && sovrapposte[1] >= 8, 'etichette: nessuna sovrapposizione nella vista d\'insieme (sovrapposte, visibili): ' + sovrapposte);
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
  await pe.goto('file://' + path.join(__dirname, 'esempio.html') + '?avvio=libero'); await pe.waitForFunction(() => window.fabbrica);
  check(await pe.locator('#benvenuto.open').count() === 0, 'avvio=libero salta il benvenuto');
  await pe.getByText('Tutto on').click(); await pe.waitForTimeout(2500);
  const ep = await pe.evaluate(() => { const S = fabbrica.state, st = (t) => S.recs.filter((r) => r.el.tipo === t).map((r) => r.el.nome + ':' + S.effettivo(r)); fabbrica.ui.mostraElemento('pontile');
    return { titolo: document.getElementById('titolo').textContent, spoke: st('officina'), src: st('sorgente'), team: fabbrica.figures.tutte.map((x) => x.nome + ':' + x.wl.join('+')).join(), scheda: document.getElementById('info').textContent }; });
  check(ep.titolo.includes('Esempio S.p.A.'), 'profilo: nome azienda');
  check(ep.spoke.join() === 'Officina Amministrazione:on,Officina Vendite:on,Officina Acquisti:wip,Officina Personale:off', 'profilo: spoke e stati: ' + ep.spoke);
  check(ep.src.join() === 'Il gestionale:on,CRM vendite:on,Budget (Excel):on,Presenze:off', 'profilo: sorgenti e flussi: ' + ep.src);
  check(ep.team === 'Luca:INT+ARC,Sara:VIS,Elena:SSR+SRC,Marco:' && ep.scheda.includes('dati@esempio.example'), 'profilo: team di partenza con nomi e assegnazioni, contatto: ' + ep.team);
  check(await pe.locator('#team .gruppo small').first().textContent() === 'Luca', 'profilo: il nome compare sotto il pupazzino');
  await pe.screenshot({ path: path.join(out, '11-profilo-esempio.png') }); await pe.close();

  // ---- Batch 5: narrativa, percorsi, benvenuto ----
  await page.evaluate(() => { fabbrica.ui.chiudi(); fabbrica.state.setTutti('on'); fabbrica.state.recs.filter((r) => r.el.tipo === 'sorgente').forEach((r) => fabbrica.state.setElemento(r.el.id, 'on')); });
  await page.getByText('Percorsi').click(); await page.getByText('Il numero nel mio report è sbagliato').click(); await page.waitForTimeout(600);
  let g = await page.evaluate(() => ({ modo: fabbrica.guida.modo(), n: fabbrica.guida.passi().length, num: fabbrica.guida.passi().filter((x) => x.num).length, testo: document.querySelector('#guida .testo').textContent }));
  check(g.modo === 'percorso' && g.n === 11 && g.num === 10, 'percorso Incident: 10 tappe più il messaggio finale: ' + JSON.stringify(g));
  await shot('20-percorso-incident', 2600);
  await page.keyboard.press('ArrowRight'); await page.keyboard.press('PageDown'); await page.waitForTimeout(300);
  check(await page.evaluate(() => fabbrica.guida.passo()) === 2 && (await page.locator('#guida h3').textContent()) === 'Sala controllo', 'tastiera e telecomando: avanti di due tappe');
  await shot('21-percorso-tappa', 2200);
  for (let i = 0; i < 12; i++) await page.keyboard.press('Space');
  check((await page.locator('#guida .testo').textContent()).includes('risale la filiera per te'), 'ultima scheda: messaggio da ricordare');
  await page.keyboard.press('Escape'); await page.waitForTimeout(200);
  check(await page.evaluate(() => fabbrica.guida.modo() === null && document.querySelectorAll('.num').length === 0), 'Esc chiude il percorso e toglie la linea');
  await page.evaluate(() => { fabbrica.state.set('GOV', 'off'); fabbrica.guida.avviaPercorso('incidente'); });                     // [REQ-PER-05]
  check(await page.evaluate(() => fabbrica.guida.passi().length) === 9, 'con la Data Governance spenta le sue due tappe vengono saltate');
  await page.evaluate(() => { fabbrica.guida.esci(); fabbrica.state.set('GOV', 'on'); });

  await page.getByText('Presentazione').first().click(); await page.waitForTimeout(500);
  g = await page.evaluate(() => ({ modo: fabbrica.guida.modo(), n: fabbrica.guida.passi().length, st: fabbrica.state.stato, src: fabbrica.state.recs.filter((r) => r.el.tipo === 'sorgente' && r.proprio === 'on').length, sx: getComputedStyle(document.getElementById('left')).display }));
  check(g.modo === 'narrativa' && g.n === 14 && g.sx === 'none' && g.src === 0 && Object.entries(g.st).every(([k, v]) => v === (k === 'SRC' ? 'on' : 'off')), 'capitolo 1: terreno vuoto, pannelli nascosti: ' + JSON.stringify(g));
  await shot('22-narrativa-inizio', 1800);
  await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(400);
  g = await page.evaluate(() => ({ p: fabbrica.guida.passo(), arc: fabbrica.state.stato.ARC, int: fabbrica.state.stato.INT, src: fabbrica.state.recs.filter((r) => r.el.tipo === 'sorgente' && r.proprio === 'on').length }));
  check(g.p === 2 && g.arc === 'on' && g.int === 'off' && g.src === 11, 'capitolo 3: sorgenti accese e Data Architecture: ' + JSON.stringify(g));
  await page.keyboard.press('PageUp'); await page.waitForTimeout(300);
  check(await page.evaluate(() => fabbrica.state.stato.ARC === 'off' && fabbrica.guida.passo() === 1), 'indietro: lo stato torna a quello del capitolo precedente');
  for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight');
  await shot('23-narrativa-trasformazione', 4500);
  check(await page.evaluate(() => getComputedStyle(document.querySelector('#guida .testo')).fontSize) === '20px', 'testo del capitolo leggibile a distanza');
  await page.keyboard.press('Escape'); await page.waitForTimeout(300);
  g = await page.evaluate(() => ({ modo: fabbrica.guida.modo(), trf: fabbrica.state.stato.TRF, vis: fabbrica.state.stato.VIS, sx: getComputedStyle(document.getElementById('left')).display }));
  check(g.modo === null && g.trf === 'on' && g.vis === 'off' && g.sx !== 'none', 'uscendo dalla narrativa la scena resta com\'era e i pannelli tornano: ' + JSON.stringify(g));
  await page.evaluate(() => { fabbrica.cfg.chapters[3].incluso = false; fabbrica.guida.avviaNarrativa(0); });
  check(await page.evaluate(() => fabbrica.guida.passi().length) === 13, 'un capitolo escluso viene saltato');
  await page.evaluate(() => { fabbrica.cfg.chapters[3].incluso = true; fabbrica.guida.esci(); });
  await page.locator('#bar > button[title="La fabbrica dei dati"]').click();
  check(await page.locator('#benvenuto.open').count() === 1, 'il benvenuto si riapre con "?"');
  await page.getByText('Esplora liberamente').click();
  await page.setViewportSize({ width: 1100, height: 700 }); await page.waitForTimeout(400);                                   // [REQ-UI-08]
  await shot('24-schermo-piccolo', 800);
  check(await page.locator('#apri-menu').isVisible(), 'schermo piccolo: pulsante del pannello visibile');
  await page.setViewportSize({ width: 1440, height: 860 });

  await page.evaluate(() => { fabbrica.cfg.workloads.KNW.notaCantiere = 'Pronto in primavera'; fabbrica.state.set('KNW', 'wip'); fabbrica.ui.mostraWorkload('KNW'); });   // [REQ-WL-03]
  check((await page.locator('#info').textContent()).includes('Pronto in primavera'), 'nota del cantiere nella scheda');
  await page.evaluate(() => fabbrica.ui.chiudi());
  await page.getByText('Tutto off').click();
  await page.waitForTimeout(1500);
  check(await page.evaluate(() => fabbrica.state.recs.every((r) => !r.on.visible && !r.wip.visible)), 'tutto off svuota la scena');

  check(ext.length === 0, 'nessuna richiesta di rete: ' + ext.join(', '));
  await browser.close();
  if (errors.length) { console.error('ERRORI:\n' + errors.join('\n')); process.exit(1); }
  console.log('OK: nessun errore, nessuna richiesta di rete');
})();
