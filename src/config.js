// ===== CONFIG — modello standard [REQ-CFG-01] =====
// I TESTI si modificano in TESTI.md [REQ-CFG-08]: quelli scritti qui sono solo il valore iniziale e vengono sostituiti in build.
// Tutti i contenuti (testi, colori, workload, elementi) stanno qui: il motore non contiene testi.
// Ogni chiave riporta i requisiti che la governano [REQ-CFG-04]. Testi scritti secondo il lessico (REQUISITI §1.2).
window.CONFIG = {
  meta: { titolo: 'Fabbrica Dati', sottotitolo: 'Come nascono i numeri che leggi nei report' },

  // [REQ-UI-07] testi dell'interfaccia
  ui: {
    workload: 'Workload', stati: { off: 'Off', wip: 'Cantiere', on: 'On' },
    statoLungo: { off: 'Non presente', wip: 'In costruzione', on: 'Attivo' },
    vistaInsieme: "Vista d'insieme", etichette: 'Etichette', pausa: 'Pausa flussi', riprendi: 'Riprendi flussi',
    tuttoOn: 'Tutto on', tuttoOff: 'Tutto off',
    nellaFabbrica: 'Nella fabbrica', perTe: 'Cosa significa per te', contatto: 'A chi rivolgerti', gestore: 'Chi lo gestisce',
    gestori: { hub: 'Il team dati (hub)', spoke: 'La tua funzione (spoke)', entrambi: 'Il team dati insieme alla tua funzione' },
    lavori: 'Lavori in corso', segnaposto: 'in arrivo',
    aiuto: 'Trascina per ruotare · rotellina per lo zoom · tasto destro o WASD per spostarti · clic su un elemento per la scheda',
    chiudi: 'Chiudi', tecnico: 'In Fabric',
    presentazione: 'Presentazione', percorsi: 'Percorsi', avanti: 'Avanti', indietro: 'Indietro', esci: 'Esci', tornaQui: 'Torna qui',
    capitolo: 'Capitolo', tappa: 'Tappa', di: 'di', chi: 'Chi', tu: 'Cosa fai tu', ricorda: 'Da ricordare', nessunaTappa: 'Questo percorso attraversa reparti non ancora accesi.',
    aiutoGuida: 'Avanti: → o spazio · Indietro: ← · Esci: Esc',
    benvenutoTitolo: 'La fabbrica dei dati', esplora: 'Esplora liberamente', menu: 'Pannello',
    benvenuto1: 'I numeri che leggi nei report non nascono nei report: nascono nei sistemi che usi ogni giorno e fanno un viaggio, come in una fabbrica.',
    benvenuto2: 'Qui vedi quel viaggio: i fornitori, il lago dove arriva il materiale, i reparti che lo lavorano, i semilavorati certificati e le officine delle funzioni.',
    benvenuto3: 'Puoi seguire la presentazione, un capitolo alla volta, oppure esplorare da solo: accendi i reparti dal pannello e clicca su ciò che vedi.', legenda: 'Legenda', materiali: 'Materiali', mezzi: 'Trasporto',
    mezzo: 'Come arriva il materiale', statoElemento: 'Stato', categoria: 'Tipo di sistema',
    apri: 'Mostra uno per uno', team: 'Team dati', fuoriServizio: 'non in servizio',
  },

  // [REQ-LIT-02] contatto mostrato se il profilo non ne indica uno
  contatto: { chi: "Lo sportello dell'hub", come: 'Il punto di contatto del team dati' },

  // [REQ-WL-07] durata dell'animazione di costruzione (secondi)
  animazione: { costruzione: 1.5 },

  // [REQ-SCN-01] layout "a valle verso il pubblico": sorgenti sul fondo (z negativo), hub al centro, spoke in primo piano
  layout: {
    capannone: { x: [-32, 32], z: [-40, 40], pavimento: 0.8, altezza: 14 },
    camera: { pos: [0, 122, 188], target: [0, 0, 4] },
    sorgenti: { z: -86, passo: 12.8, larghezza: 140 },   // [REQ-SRC-07] area fornitori sul fondo
    margineSinistro: 332, // larghezza occupata dal pannello: la scena viene centrata nello spazio libero
  },

  // [REQ-FLW-08] materiali: l'aspetto del materiale a ogni stadio
  materiali: {
    grezzo: { nome: 'Grezzo', tecnico: 'Dati grezzi (file in OneLake)', colore: '#9ca3af' },
    bronze: { nome: 'Bronze — conservato', tecnico: 'Layer Bronze', colore: '#b87333' },
    silver: { nome: 'Silver — pulito', tecnico: 'Layer Silver', colore: '#d7dbe2' },
    gold: { nome: 'Gold — assemblato', tecnico: 'Layer Gold', colore: '#f5c518' },
    semilavorato: { nome: 'Semilavorato certificato', tecnico: 'Semantic model certificato', colore: '#22d3ee' },
    report: { nome: 'Report — prodotto finito', tecnico: 'Report Power BI', colore: '#f59e0b' },
  },

  // [REQ-SRC-03, REQ-SRC-04, REQ-SRC-05] modalità di acquisizione → mezzo di trasporto (testi senza termini tecnici)
  modalita: {
    copy: { nome: 'Scivolo', tecnico: 'Data pipeline / Copy job', colore: '#f97316', landing: true,
      testo: 'A orari stabiliti il materiale scivola dal fornitore nel lago dei dati; da lì il team dati lo pesca e lo porta nel magazzino.' },
    dataflow: { nome: 'Scialuppa', tecnico: 'Dataflow Gen2', colore: '#a16207', landing: true,
      testo: 'Il materiale scende su una scialuppa che lo sistema un po\' già durante il viaggio, attraversa il lago e lo lascia al pontile.' },
    shortcut: { nome: 'Ponte di vetro', tecnico: 'Shortcut di OneLake', colore: '#a5f3fc', landing: true,
      testo: 'Il materiale non si sposta: resta dal fornitore, e attraverso un ponte di vetro compare nel lago senza essere copiato. Da lì il team dati lo recupera come il resto.' },
    streaming: { nome: 'Nastro veloce', tecnico: 'Eventstream', colore: '#ea580c', landing: false,
      testo: 'Il materiale arriva in diretta, un pezzo dopo l\'altro, alla sala sensori: funziona solo quando il Real-Time è attivo.' },
  },

  // [REQ-SRC-02] categoria di software della sorgente → forma dell'edificio e modalità di trasporto di default
  categorie: {
    erp: { nome: 'ERP', tecnico: 'Enterprise Resource Planning', forma: 'stabilimento', modalita: 'copy', fabbrica: 'Un grande stabilimento: il fornitore principale, con tanto materiale ben organizzato.', perTe: 'È il gestionale: ordini, fatture, contabilità, acquisti.' },
    crm: { nome: 'CRM', tecnico: 'Customer Relationship Management', forma: 'negozio', modalita: 'copy', fabbrica: 'Un negozio: qui nasce tutto ciò che riguarda il rapporto con i clienti.', perTe: 'È il sistema dove si seguono clienti, contatti, offerte e trattative.' },
    pim: { nome: 'PIM', tecnico: 'Product Information Management', forma: 'catalogo', modalita: 'copy', fabbrica: 'La sala cataloghi: schede ordinate di ogni prodotto, con codici, descrizioni e immagini.', perTe: 'È il sistema che tiene le informazioni sui prodotti: codici, caratteristiche, descrizioni, listini.' },
    hr: { nome: 'HR', tecnico: 'Human Capital Management', forma: 'uffici', modalita: 'copy', fabbrica: 'Una palazzina di uffici: le informazioni sulle persone dell\'azienda.', perTe: 'È il sistema del personale: organico, presenze, paghe. Sono dati delicati, protetti dalle regole su chi vede cosa.' },
    mes: { nome: 'Produzione e magazzino', tecnico: 'MES / WMS', forma: 'silo', modalita: 'copy', fabbrica: 'Dei silos: materiale già stoccato in modo ordinato, pronto da prelevare.', perTe: 'Sono i sistemi della produzione e del magazzino: giacenze, lotti, avanzamento degli ordini.' },
    ecommerce: { nome: 'E-commerce', tecnico: 'Piattaforma e-commerce', forma: 'pacchi', modalita: 'copy', fabbrica: 'Un centro pacchi: ordini che arrivano dal negozio online, uno dopo l\'altro.', perTe: 'È il negozio online: ordini, carrelli, resi, comportamento dei clienti sul sito.' },
    marketing: { nome: 'Marketing', tecnico: 'Marketing automation (API)', forma: 'sportello', modalita: 'copy', fabbrica: 'Uno sportello: si chiede e si riceve, un pezzo alla volta.', perTe: 'Sono i servizi di marketing a cui l\'azienda è abbonata: campagne, newsletter, social.' },
    excel: { nome: 'Fogli di calcolo', tecnico: 'File Excel / CSV', forma: 'archivio', modalita: 'dataflow', fabbrica: 'Un archivio di scatoloni: materiale sfuso, preparato a mano.', perTe: 'Sono i fogli di calcolo che oggi qualcuno compila e si passa a mano: budget, previsioni, tabelle di appoggio.' },
    iot: { nome: 'Sensori', tecnico: 'Dispositivi IoT', forma: 'sensori', modalita: 'streaming', fabbrica: 'Un campo di sensori: il materiale arriva in continuazione, senza pause.', perTe: 'Sono macchine e sensori che mandano segnali in ogni momento.' },
    esterni: { nome: 'Dati esterni', tecnico: 'Dati esterni / open data', forma: 'mercato', modalita: 'copy', fabbrica: 'Un mercato: materiale che viene da fuori, acquistato o pubblico.', perTe: 'Sono dati di mercato o dati pubblici che arricchiscono quelli dell\'azienda.' },
    datalake: { nome: 'Data lake esistente', tecnico: 'Data lake esterno (ADLS, S3)', forma: 'container', modalita: 'shortcut', fabbrica: 'Un deposito di container: grandi quantità di materiale già raccolto altrove.', perTe: 'È un archivio dati che l\'azienda ha già: si usa così com\'è, senza duplicarlo.' },
  },

  // [REQ-SRC-01] catalogo standard: una sorgente per categoria, tutte spente all'avvio [D-46] (sostituito da quello del profilo, se presente)
  sources: [
    { id: 'src-erp', nome: 'Gestionale', categoria: 'erp', stato: 'off' },
    { id: 'src-crm', nome: 'CRM', categoria: 'crm', stato: 'off' },
    { id: 'src-pim', nome: 'Anagrafica prodotti', categoria: 'pim', stato: 'off' },
    { id: 'src-hr', nome: 'Sistema del personale', categoria: 'hr', stato: 'off' },
    { id: 'src-mes', nome: 'Produzione e magazzino', categoria: 'mes', stato: 'off' },
    { id: 'src-ecom', nome: 'Negozio online', categoria: 'ecommerce', stato: 'off' },
    { id: 'src-mkt', nome: 'Marketing', categoria: 'marketing', stato: 'off' },
    { id: 'src-excel', nome: 'Budget e forecast (Excel)', categoria: 'excel', stato: 'off' },
    { id: 'src-iot', nome: 'Sensori di impianto', categoria: 'iot', stato: 'off' },
    { id: 'src-ext', nome: 'Dati di mercato', categoria: 'esterni', stato: 'off' },
    { id: 'src-lake', nome: 'Archivio dati esistente', categoria: 'datalake', stato: 'off' },
  ],

  // [REQ-HS-02, REQ-HS-03, REQ-HS-07] spoke standard (sostituiti da quelli del profilo, se presente)
  spokes: [
    { nome: 'Finance', stato: 'on' }, { nome: 'Commerciale', stato: 'on' }, { nome: 'HR', stato: 'on' },
    { nome: 'Operations', stato: 'on' }, { nome: 'Marketing', stato: 'on' },
  ],
  spoke: {
    z: 82, passo: 27, larghezza: 132,
    colori: ['#0284c7', '#e11d48', '#65a30d', '#ea580c', '#9333ea', '#0d9488', '#ca8a04', '#db2777', '#4f46e5', '#57534e'],
    fabbrica: "L'officina della funzione: riceve i semilavorati dall'hub e li personalizza. Accanto c'è il piccolo deposito del materiale proprio.",
    perTe: 'Semilavorato + dati tuoi = prodotto su misura: parti da dati certificati, aggiungi i tuoi fogli di calcolo e costruisci i report che ti servono.',
    gestoreTesto: 'I report e i dati locali sono della funzione. Il dato di base, dentro il semilavorato, resta del team dati: per questo è uguale per tutti.',
    tecnico: 'Workspace di dominio · composite model',  // [REQ-HS-06]
  },

  // [REQ-SCN-11] team dati: una figura per persona. m = uomini, f = donne. Sostituito dal profilo, se presente.
  team: {
    colore: '#1d4ed8', casco: '#facc15', turno: 14, corridoio: 42.3,   // corridoio = z del passaggio davanti al capannone, usato per spostarsi   // turno = secondi tra un cambio di postazione e l'altro
    // un gruppo per mestiere. m = uomini, f = donne. ruota: true = le sue persone ruotano tra le postazioni dei workload accesi [RDM-030]
    gruppi: {
      integration: { m: 2, f: 0, wl: 'INT', breve: 'Integration', nome: 'Team dati — Data Integration', tecnico: 'Data engineer',
        fabbrica: 'Uno costruisce e ripara gli scivoli che portano il materiale dai fornitori al lago; l\'altro, da un pannello di comando, manovra le gru che pescano il materiale dal lago e lo mettono nel magazzino materie prime.',
        perTe: 'Sono le persone che collegano i tuoi sistemi alla fabbrica e controllano che i carichi arrivino ogni giorno.',
        compiti: [{ nome: 'Costruisce e ripara gli scivoli', tipo: 'scivoli', z: -77 }, { nome: 'Manovra le gru dal pannello di comando', tipo: 'pannello', pos: [28.5, -44] }] },
      architecture: { ruota: true, m: 1, f: 0, wl: 'ARC', breve: 'Architecture', nome: 'Team dati — Data Architecture', tecnico: 'Data architect',
        fabbrica: 'Progetta la fabbrica: dove vanno i reparti, quanta energia serve, come si collegano tra loro. Lavora al tavolo dei progetti accanto al capannone.',
        perTe: 'È la persona che fa in modo che ogni nuova esigenza trovi posto nella fabbrica senza doverla rifare.',
        compiti: [{ nome: 'Al tavolo dei progetti', tipo: 'postazione', pos: [-38, 6], verso: 1.57, tavolo: true }] },
      visualization: { ruota: true, m: 0, f: 1, wl: 'VIS', breve: 'Visualization', nome: 'Team dati — Data Visualization', tecnico: 'BI developer',
        fabbrica: 'Costruisce nello showroom i report ufficiali, partendo dai semilavorati collaudati.',
        perTe: 'È la persona che trasforma i dati certificati nei report che apri ogni giorno.',
        compiti: [{ nome: 'Nello showroom', tipo: 'postazione', pos: [-48, 37.5], verso: 3.14 }] },
      coordination: { ruota: true, m: 1, f: 0, wl: 'PMO', breve: 'Coordination', nome: 'Team dati — Project Management', tecnico: 'Project manager',
        fabbrica: 'Coordina tutti gli operatori della fabbrica: chi fa cosa, in che ordine, entro quando.',
        perTe: 'È la persona che mette in fila le richieste e ti dice quando arriverà ciò che hai chiesto.',
        compiti: [{ nome: "All'ufficio di coordinamento", tipo: 'postazione', pos: [44, 40], verso: 0 }] },
    },
  },

  // [REQ-FLW-02…06, REQ-FLW-09] nastri dentro il capannone: tre corsie, il materiale cambia aspetto a ogni tratto.
  // wl = workload a cui appartiene il nastro · richiede = workload che devono essere 'on' perché il materiale si muova
  flussi: {
    corsie: [-18, 0, 18],
    tratti: [
      { id: 'pontile-bronze', z: [-39, -23], materiale: 'grezzo', wl: 'INT', richiede: ['INT'], alimentato: 'landing' },
      { id: 'bronze-silver', z: [-23, -9], materiale: 'bronze', wl: 'TRF', richiede: ['INT', 'TRF'], alimentato: 'bronze' },
      { id: 'silver-gold', z: [-9, 3], materiale: 'silver', wl: 'TRF', richiede: ['INT', 'TRF'], alimentato: 'bronze' },
      { id: 'gold-confezionamento', z: [3, 12.5], materiale: 'gold', wl: 'TRF', richiede: ['INT', 'TRF'], alimentato: 'bronze' },
    ],
    uscite: [
      // [REQ-FLW-07] ogni semilavorato passa prima dal laboratorio prove (collaudo), poi va alle spedizioni;
      // verso lo showroom esce dal laboratorio con una passerella (disegnata dallo showroom, compare solo con la Data Visualization)
      { id: 'confezionamento-laboratorio', punti: [[-16, 16], [-16, 23.5]], materiale: 'semilavorato', wl: 'TRF', richiede: ['INT', 'TRF'], alimentato: 'bronze' },
      { id: 'laboratorio-spedizioni', punti: [[-7.5, 30], [2.5, 30]], materiale: 'semilavorato', wl: 'TRF', richiede: ['INT', 'TRF'], alimentato: 'bronze' },
    ],
  },

  // [REQ-WL-10, REQ-WL-11] catalogo dei workload — tutti 'off' nel modello standard [REQ-WL-05]
  // [D-08] ordine del pannello e della narrativa
  ordine: ['SRC', 'ARC', 'PMO', 'INT', 'TRF', 'SEC', 'ACC', 'VIS', 'SSR', 'GOV', 'FIN', 'KNW', 'RTI'],
  workloads: {
    // notaCantiere (facoltativa, su workload o elemento): compare nella scheda quando è in cantiere [REQ-WL-03]
    ARC: { nome: 'Data Architecture', tecnico: 'Fabric capacity · OneLake · workspace', colore: '#64748b', deps: [], stato: 'off', gestore: 'hub',
      fabbrica: "Il terreno, le fondamenta e il capannone: lo spazio in cui tutto il resto viene costruito, con la centrale che dà energia e il lago dei dati, unico, tra i fornitori e la fabbrica.",
      perTe: "È la base comune: un solo posto per i dati di tutta l'azienda, invece di tanti archivi sparsi. Senza questa base, ogni funzione ricomincia da zero." },
    PMO: { nome: 'Project Management', tecnico: 'Coordinamento del team dati: pianificazione e priorità', colore: '#b45309', deps: [], stato: 'off', gestore: 'hub',
      fabbrica: "L'ufficio di coordinamento: da qui si coordinano tutti gli operatori della fabbrica, si mettono in fila le richieste e si decide cosa viene prima.",
      perTe: 'Quando chiedi qualcosa, è qui che la richiesta trova posto nel piano di lavoro, un responsabile e una data.' },
    ACC: { nome: 'Accessi', tecnico: 'Microsoft Entra ID · ruoli di workspace · permessi sugli item', colore: '#0ea5e9', deps: ['ARC'], stato: 'off', gestore: 'entrambi',
      fabbrica: 'Cancelli, tornelli e badge: si entra solo se autorizzati, e ognuno va solo nei reparti che gli servono.',
      perTe: 'Decidi tu chi della tua funzione entra e cosa può fare. Chiedere un accesso è come chiedere un badge.' },
    SEC: { nome: 'Security', tecnico: 'RLS / OLS · sensitivity label · OneLake security', colore: '#dc2626', deps: ['ARC'], stato: 'off', gestore: 'hub',
      fabbrica: 'Recinzione, telecamere, caveau e sigilli sui pacchi: proteggono il materiale prezioso.',
      perTe: 'I dati riservati li vede solo chi deve: le regole su chi vede cosa viaggiano insieme al dato, anche dentro i tuoi report.' },
    SRC: { nome: 'Data Sources', tecnico: 'Sistemi sorgente · on-premises data gateway', colore: '#0d9488', deps: [], stato: 'on',   // [D-46] acceso di default, con tutte le sorgenti spente gestore: 'entrambi',
      fabbrica: "L'area dei fornitori: i sistemi dell'azienda da cui parte il materiale grezzo. Ogni tipo di software ha un edificio diverso, e si possono accendere uno alla volta.",
      perTe: 'Sono i sistemi che usi ogni giorno: gestionale, CRM, fogli di calcolo. Esistono anche senza la fabbrica, e tu continui a lavorare lì.' },
    INT: { nome: 'Data Integration', tecnico: 'Data Factory: Data pipeline, Copy job, Dataflow Gen2, Shortcut', colore: '#2563eb', deps: ['ARC', 'SRC'], stato: 'off', gestore: 'hub',
      fabbrica: "I fornitori fanno arrivare il materiale nel lago dei dati con scivoli e scialuppe; il team dati lo pesca e lo porta nel magazzino materie prime (Bronze), dove viene conservato così com'è.",
      perTe: 'I dati dei sistemi che usi ogni giorno arrivano qui da soli, a orari stabiliti: nessuno deve più estrarli a mano.' },
    TRF: { nome: 'Data Transformation', tecnico: 'Warehouse Silver e Gold · Semantic model', colore: '#16a34a', deps: ['INT'], stato: 'off', gestore: 'hub',
      fabbrica: 'Il materiale viene pulito e controllato (Silver), assemblato in componenti (Gold) e confezionato in semilavorati con il marchio di qualità.',
      perTe: 'Ricevi dati già puliti e con i calcoli già pronti: non devi più sistemarli a mano prima di usarli.' },
    VIS: { nome: 'Data Visualization', tecnico: 'Power BI: report e app istituzionali', colore: '#f59e0b', deps: ['TRF'], stato: 'off', gestore: 'hub',
      fabbrica: "Lo showroom: i prodotti finiti ufficiali dell'azienda, uguali per tutti.",
      perTe: "Sono i report ufficiali, in Power BI: gli stessi numeri per tutta l'azienda, da consultare senza costruire nulla." },
    SSR: { nome: 'Self-service (spoke)', tecnico: 'Workspace di dominio · report self-service · composite model', colore: '#ec4899', deps: ['TRF', 'ACC'], stato: 'off', gestore: 'spoke',
      fabbrica: 'Le officine delle funzioni: ricevono i semilavorati e li personalizzano, aggiungendo se serve il proprio materiale.',
      perTe: 'È la tua officina: parti da dati certificati e costruisci i report che servono alla tua funzione, senza aspettare nessuno.' },
    GOV: { nome: 'Data Governance', tecnico: 'Microsoft Purview · domini · endorsement · Monitoring hub', colore: '#7c3aed', deps: ['ARC'], stato: 'off', gestore: 'hub',
      fabbrica: "La torre di controllo e la sala controllo: fissano le regole comuni, sorvegliano che ogni reparto lavori e mettono il marchio di qualità sui prodotti controllati. Qui c'è anche lo sportello a cui rivolgersi.",
      perTe: 'Quando vedi il marchio "dato certificato" sai che quel numero è lo stesso per tutti. Se un caricamento salta, il team dati lo sa prima di te. E sai sempre a chi chiedere.' },
    FIN: { nome: 'Monitoraggio costi', tecnico: 'Capacity Metrics app · chargeback', colore: '#ca8a04', deps: ['ARC'], stato: 'off', gestore: 'hub',
      fabbrica: 'I contatori della centrale: misurano quanta energia consuma ogni reparto e ogni officina.',
      perTe: 'La fabbrica ha un costo, e si può vedere quanto consuma ogni funzione: aiuta a decidere dove investire.' },
    RTI: { nome: 'Real-Time', tecnico: 'Real-Time Intelligence: Eventstream, Eventhouse, Activator', colore: '#ea580c', deps: ['ARC'], stato: 'off', gestore: 'hub',
      fabbrica: 'La sala sensori: lavora il materiale in diretta, nel momento in cui arriva, senza passare dal magazzino.',
      perTe: 'Serve quando non puoi aspettare domani: vedere cosa succede adesso e ricevere un avviso appena qualcosa cambia.' },
    KNW: { nome: 'Knowledge', tecnico: 'Ontology (Fabric IQ)', colore: '#92400e', deps: ['TRF'], stato: 'off', gestore: 'hub',
      fabbrica: "L'ufficio tecnico e l'archivio dei progetti: la mappa di cosa sono le cose dell'azienda e di come sono collegate.",
      perTe: 'Mette tutti d\'accordo sul significato delle parole ("cliente", "ordine", "margine") e permette di fare domande ai dati nel linguaggio di tutti i giorni.' },
  },

  // [REQ-WL-12] elementi della scena: ognuno appartiene a un workload.
  // tipo = costruttore 3D; 'segnaposto' = volume provvisorio, sostituito nei batch successivi (vedi PIANO.md).
  // pos = [x, z] centro · dim = [larghezza, profondità, altezza]. Testi mancanti: si usano quelli del workload.
  elements: [
    // --- Architettura [REQ-SCN-04, REQ-SCN-10] ---
    { id: 'capannone', wl: 'ARC', priorita: 1, tipo: 'capannone', nome: "Capannone dell'hub", tecnico: 'Tenant · workspace dell\'hub', pos: [0, 0], dim: [64, 80, 14], etichetta: [-32, 18, 40],
      fabbrica: 'Fondamenta, pavimento e struttura del capannone. Dentro prenderanno posto i reparti.',
      perTe: 'È lo spazio comune, già pronto: quando la tua funzione avrà bisogno di qualcosa, non si parte dal terreno vuoto.' },
    { id: 'lago', wl: 'ARC', priorita: 1, tipo: 'lago', nome: 'Lago dei dati', tecnico: 'OneLake (Landing: file in un Lakehouse)', pos: [0, -60], dim: [104, 26, 0.5], etichetta: [0, 4, -4],
      fabbrica: "Il lago dei dati: un'unica riserva tra i fornitori e la fabbrica. Il materiale di tutti i fornitori arriva qui così com'è, prima di essere pescato e portato nel magazzino.",
      perTe: "Un solo posto dove arrivano i dati di tutti i sistemi: niente copie sparse, e si può sempre tornare a vedere il dato com'era all'origine." },
    { id: 'centrale', wl: 'ARC', tipo: 'centrale', nome: 'Centrale elettrica', tecnico: 'Fabric capacity', pos: [-58, -22], dim: [18, 16, 12],
      fabbrica: 'La centrale dà energia a tutti i reparti. Se un reparto ne consuma troppa, gli altri rallentano.',
      perTe: "L'energia della fabbrica ha un costo ed è condivisa: per questo si pianifica chi consuma cosa." },
    { id: 'laboratorio', wl: 'TRF', tipo: 'laboratorio', nome: 'Laboratorio prove', tecnico: 'Workspace Dev e Test · deployment pipeline', pos: [-16, 30], dim: [16, 12, 7],
      fabbrica: 'Il laboratorio prove: ogni semilavorato viene collaudato qui prima di uscire dalla fabbrica, e ogni modifica si prova qui prima di entrare in produzione.',
      perTe: 'Quello che ricevi è già stato provato. E quando chiedi una modifica, la provi insieme al team dati prima che arrivi a tutti: niente sorprese nei report.' },

    // --- Segnaposto degli altri workload (batch 2-4) ---
    // --- Data Integration [REQ-FLW-01…03, REQ-SCN-02] ---
    { id: 'fornitori', wl: 'SRC', priorita: 1, tipo: 'piazzale', nome: 'Area fornitori', tecnico: 'Sistemi sorgente', pos: [0, -86], dim: [146, 16, 0.2], etichetta: [0, 0.3, 8.5], cantiere: false,   // coordinate relative all'elemento
      fabbrica: "L'area dei fornitori: i sistemi dell'azienda da cui parte il materiale grezzo. Ogni tipo di fornitore ha un edificio diverso.",
      perTe: 'Sono i sistemi che usi ogni giorno: gestionale, CRM, fogli di calcolo. Tu continui a lavorare lì, il materiale parte da solo.' },
    { id: 'pontile', wl: 'INT', tipo: 'pontile', nome: 'Pontile di pesca', tecnico: 'Data pipeline di caricamento nel Bronze', pos: [0, -45], dim: [48, 5, 3],
      fabbrica: 'Il pontile sulla riva del lago: da un pannello di comando il team dati manovra le gru, che pescano il materiale arrivato dai fornitori e lo mettono sui nastri verso il magazzino materie prime.',
      perTe: 'È il passaggio dal "dato arrivato" al "dato conservato": da qui in poi il materiale è in fabbrica, etichettato e pronto per la lavorazione.' },
    { id: 'bronze', wl: 'INT', tipo: 'bronze', nome: 'Magazzino materie prime (Bronze)', tecnico: 'Warehouse Bronze', pos: [0, -22], dim: [60, 12, 6], zona: true,
      fabbrica: "Il magazzino materie prime: il materiale viene messo a scaffale con l'etichetta di arrivo e conservato, ancora grezzo.",
      perTe: "Tutto ciò che arriva resta conservato con la sua data: si può sempre tornare a vedere com'era il dato in origine." },

    // --- Data Transformation [REQ-FLW-04…06, REQ-SCN-02] ---
    { id: 'silver', wl: 'TRF', tipo: 'silver', nome: 'Reparto lavorazione (Silver)', tecnico: 'Warehouse Silver', pos: [0, -9], dim: [60, 12, 6], zona: true,
      fabbrica: 'Il reparto lavorazione: il materiale viene pulito, controllato e portato a misura. Qui nasce la qualità.',
      perTe: 'Doppioni, errori di battitura, codici diversi per la stessa cosa: vengono sistemati qui, una volta per tutti.' },
    { id: 'gold', wl: 'TRF', tipo: 'gold', nome: 'Linea di assemblaggio (Gold)', tecnico: 'Warehouse Gold (modello a stella)', pos: [0, 3], dim: [60, 10, 6], zona: true,
      fabbrica: 'La linea di assemblaggio: i pezzi puliti vengono montati in componenti pensati per il business (vendite, clienti, costi).',
      perTe: 'I dati di sistemi diversi vengono messi insieme: finalmente il cliente del CRM e quello del gestionale sono la stessa cosa.' },
    { id: 'confezionamento', wl: 'TRF', tipo: 'confezionamento', nome: 'Confezionamento semilavorati', tecnico: 'Semantic model', pos: [0, 14], dim: [60, 8, 6], zona: true,
      fabbrica: 'Il confezionamento: i componenti diventano semilavorati, con le istruzioni dentro e il marchio di qualità sopra.',
      perTe: 'Il semilavorato è un dato certificato, con i calcoli già pronti: lo stesso per tutti, pronto per costruirci i report.' },
    { id: 'spedizioni', wl: 'TRF', tipo: 'spedizioni', nome: 'Spedizioni', tecnico: 'Condivisione dei Semantic model (permesso Build)', pos: [16, 30], dim: [28, 14, 5], zona: true,
      fabbrica: 'Il reparto spedizioni: da qui i semilavorati collaudati partono verso le officine delle funzioni.',
      perTe: 'È da qui che i dati certificati arrivano alla tua funzione.' },
    // --- Data Visualization [REQ-FLW-07, REQ-SCN-07] ---
    { id: 'showroom', wl: 'VIS', priorita: 1, tipo: 'showroom', nome: 'Showroom', tecnico: 'Report e app Power BI', pos: [-55, 28], dim: [28, 14, 6], zona: true,
      fabbrica: "Lo showroom dell'hub, accanto alla fabbrica: i prodotti finiti ufficiali, costruiti dal team dati sui semilavorati collaudati e uguali per tutta l'azienda.",
      perTe: "Sono i report ufficiali, in Power BI: li apri e leggi il numero, senza costruire nulla. È lo stesso numero che vedono tutti." },
    // --- Ufficio di coordinamento [REQ-SCN-13] ---
    { id: 'coordinamento', wl: 'PMO', tipo: 'ufficio', nome: 'Ufficio di coordinamento', tecnico: 'Project management del team dati', pos: [52, 38], dim: [12, 8, 5],
      fabbrica: "L'ufficio da cui si coordinano tutti gli operatori della fabbrica: chi fa cosa, in che ordine, entro quando.",
      perTe: 'Quando chiedi qualcosa, è qui che la richiesta trova posto nel piano di lavoro e un responsabile.' },
    // --- Workload trasversali [REQ-SCN-03, REQ-SCN-09] ---
    { id: 'cancelli', wl: 'ACC', tipo: 'cancelli', nome: 'Cancelli e tornelli', tecnico: 'Microsoft Entra ID · ruoli e permessi', pos: [16, 44.5], dim: [16, 4, 5],
      fabbrica: 'Il cancello, i tornelli e il lettore di badge: si entra solo se autorizzati, e ognuno raggiunge solo i reparti che gli servono.',
      perTe: 'Per far entrare una persona della tua funzione si chiede un badge: decidi tu chi entra e che cosa può fare.' },
    { id: 'recinzione', wl: 'SEC', tipo: 'recinzione', nome: 'Recinzione e telecamere', tecnico: 'Sicurezza di rete · audit degli accessi', pos: [0, -16], dim: [150, 120, 3], fronte: 60.5, cantiere: false, etichetta: [75, 5, 20],
      fabbrica: 'La recinzione attorno alla fabbrica e le telecamere: tengono fuori chi non deve entrare e registrano chi passa.',
      perTe: 'I dati della tua funzione sono protetti come quelli di tutte le altre: si sa sempre chi ha guardato cosa.' },
    { id: 'caveau', wl: 'SEC', tipo: 'caveau', nome: 'Caveau', tecnico: 'RLS / OLS · sensitivity label', pos: [60, -40], dim: [9, 8, 5],
      fabbrica: 'Il caveau: il materiale più delicato sta qui, sotto chiave.',
      perTe: 'I dati riservati (stipendi, dati personali) li vede solo chi deve: le regole su chi vede cosa valgono anche dentro i tuoi report.' },
    { id: 'torre', wl: 'GOV', tipo: 'torre', nome: 'Torre di controllo', tecnico: 'Microsoft Purview · domini · endorsement (certificazione)', pos: [-40, 58], dim: [8, 8, 18],
      fabbrica: 'La torre di controllo: da qui si governa la fabbrica, si fissano le regole comuni e si mette il marchio di qualità sui prodotti controllati.',
      perTe: 'Il marchio "dato certificato" nasce qui: quando lo vedi, quel numero è lo stesso per tutta l\'azienda.' },
    { id: 'sportello', wl: 'GOV', tipo: 'sportello', nome: "Sportello dell'hub", tecnico: 'Center of Excellence (CoE)', pos: [-26, 52], dim: [12, 6, 5],
      fabbrica: "Lo sportello dell'hub: il punto in cui le funzioni incontrano il team dati per chiedere, segnalare un problema o entrare nella fabbrica.",
      perTe: 'Non devi sapere a quale reparto rivolgerti: vieni qui, e la tua richiesta arriva alla persona giusta.' },
    { id: 'salacontrollo', wl: 'GOV', tipo: 'salacontrollo', nome: 'Sala controllo', tecnico: 'Monitoring hub · alert', pos: [-66, -52], dim: [14, 8, 6],
      fabbrica: 'La sala controllo: una spia per ogni reparto. Verde se lavora, gialla se è in costruzione, rossa se è fermo.',
      perTe: 'Se un caricamento salta, il team dati lo vede qui prima che tu apra il report: spesso il problema è già risolto quando arrivi.' },
    { id: 'contatori', wl: 'FIN', tipo: 'contatori', nome: 'Contatori della centrale', tecnico: 'Capacity Metrics app', pos: [-64, -38], dim: [10, 4, 4],
      fabbrica: 'I contatori della centrale: più reparti lavorano, più energia si consuma. Qui si vede quanto consuma ciascuno.',
      perTe: 'Anche la tua officina ha il suo contatore: sapere quanto consuma aiuta a decidere dove vale la pena investire.' },
    // --- Workload opzionali [REQ-SCN-05, REQ-FLW-10, REQ-FLW-11] ---
    { id: 'sensori', wl: 'RTI', tipo: 'salasensori', nome: 'Sala sensori', tecnico: 'Eventstream · Eventhouse · Activator', pos: [58, -20], dim: [14, 12, 8],
      fabbrica: 'La sala sensori: il materiale dei sensori arriva sul nastro veloce e viene guardato subito, sul grande schermo, senza passare dal lago e dal magazzino.',
      perTe: 'Vedi cosa sta succedendo in questo momento, e puoi farti avvisare appena un valore esce dalla norma.' },
    { id: 'archivio', wl: 'KNW', tipo: 'archiviotecnico', nome: 'Ufficio tecnico e archivio', tecnico: 'Ontology (Fabric IQ)', pos: [58, 14], dim: [14, 12, 10],
      fabbrica: "L'ufficio tecnico: sul tetto, la mappa di come le cose dell'azienda sono collegate tra loro. I fili d'oro la legano alla linea di assemblaggio e ai semilavorati.",
      perTe: 'Cliente, ordine, margine: qui si scrive una volta per tutte cosa significano, così tutti parlano la stessa lingua e si possono fare domande ai dati con parole semplici.' },
  ],
};

// ===== [REQ-NAR-01…04, REQ-NAR-08] Capitoli della modalità narrativa =====
// Ogni capitolo accende i workload indicati in `accendi` (restano accesi nei capitoli successivi).
// incluso: false = Avanti lo salta (D-34). sorgenti: true = le sorgenti compaiono nello stato del profilo.
// vista: elementi da inquadrare (se manca: quelli dei workload accesi nel capitolo).
window.CONFIG.chapters = [
  { id: 'inizio', incluso: true, accendi: { SRC: 'on' }, vista: 'insieme', titolo: 'Il punto di partenza',
    testo: 'Oggi ogni funzione lavora nei propri sistemi e i numeri si passano a mano, tra fogli di calcolo e mail. Qui c\'è un terreno vuoto: costruiamo insieme la fabbrica dei dati, un pezzo alla volta.' },
  { id: 'sorgenti', incluso: true, accendi: { SRC: 'on' }, sorgenti: true, titolo: 'I fornitori: i sistemi che usate ogni giorno',
    testo: 'Gestionale, CRM, fogli di calcolo: il dato nasce qui, nel lavoro di tutti i giorni. Ogni sistema è un fornitore di materia prima, e resta dov\'è: voi continuate a lavorarci come sempre.' },
  { id: 'architettura', incluso: true, accendi: { ARC: 'on' }, vista: 'insieme', titolo: 'Data Architecture: le fondamenta',
    testo: 'Prima si costruisce lo spazio comune: il capannone, la centrale che dà energia e il lago dei dati, un solo posto dove arriverà il materiale di tutti i fornitori.' },
  { id: 'coordinamento', incluso: true, accendi: { PMO: 'on' }, titolo: 'Project Management: chi fa cosa',
    testo: 'Il team dati è fatto di poche persone e le richieste sono tante. Dall\'ufficio di coordinamento si decide cosa viene prima e si dà a ogni richiesta un responsabile e una data.' },
  { id: 'integrazione', incluso: true, accendi: { INT: 'on' }, vista: ['lago', 'pontile', 'bronze'], titolo: 'Data Integration: il materiale arriva in fabbrica',
    testo: 'Dai fornitori il materiale scivola nel lago a orari stabiliti: per questo un dato di oggi può arrivare domani. Il team dati lo pesca e lo mette nel magazzino materie prime, così com\'è. Nessuno deve più estrarre dati a mano.' },
  { id: 'trasformazione', incluso: true, accendi: { TRF: 'on' }, vista: ['silver', 'gold', 'confezionamento', 'laboratorio'], titolo: 'Data Transformation: dal grezzo al semilavorato',
    testo: 'Il materiale viene pulito, assemblato e confezionato in semilavorati: dati certificati, con i calcoli già pronti. Ogni semilavorato passa dal laboratorio prove prima di uscire dalla fabbrica.' },
  { id: 'sicurezza', incluso: true, accendi: { SEC: 'on' }, vista: 'insieme', titolo: 'Security: proteggere ciò che vale',
    testo: 'Recinzione, telecamere e caveau: i dati riservati li vede solo chi deve, e si sa sempre chi ha guardato cosa.' },
  { id: 'accessi', incluso: true, accendi: { ACC: 'on' }, titolo: 'Accessi: chi entra e cosa può fare',
    testo: 'In fabbrica si entra con il badge. Ogni funzione decide chi dei suoi entra, e ognuno raggiunge solo ciò che gli serve.' },
  { id: 'visualizzazione', incluso: true, accendi: { VIS: 'on' }, titolo: 'Data Visualization: i report ufficiali',
    testo: 'Nello showroom nascono i report ufficiali, in Power BI, costruiti sui semilavorati collaudati: gli stessi numeri per tutta l\'azienda.' },
  { id: 'officine', incluso: true, accendi: { SSR: 'on' }, titolo: 'Self-service: le officine delle funzioni',
    testo: 'Ogni funzione riceve i semilavorati e ci costruisce i propri report, aggiungendo se serve i propri dati. Non si parte da zero e non si aspetta nessuno.' },
  { id: 'governance', incluso: true, accendi: { GOV: 'on' }, titolo: 'Data Governance: regole, qualità, sportello',
    testo: 'La torre fissa le regole comuni e mette il marchio di qualità. La sala controllo sorveglia che ogni reparto lavori. Allo sportello si chiede, si segnala un problema, si entra nella fabbrica.' },
  { id: 'costi', incluso: true, accendi: { FIN: 'on' }, titolo: 'Monitoraggio costi: quanto consuma la fabbrica',
    testo: 'La fabbrica ha un costo, e i contatori mostrano quanto consuma ogni reparto e ogni officina: serve a decidere dove vale la pena investire.' },
  { id: 'conoscenza', incluso: true, accendi: { KNW: 'on' }, titolo: 'Knowledge: parlare la stessa lingua',
    testo: 'L\'ufficio tecnico tiene la mappa di cosa sono le cose dell\'azienda e di come sono collegate: mette tutti d\'accordo sul significato delle parole e permette di fare domande ai dati nel linguaggio di tutti i giorni.' },
  { id: 'tempo-reale', incluso: true, accendi: { RTI: 'on' }, titolo: 'Real-Time: quando non si può aspettare domani',
    testo: 'Alcuni segnali vanno visti subito. Il nastro veloce porta il materiale dai sensori alla sala sensori nel momento in cui nasce, senza passare dal lago e dal magazzino.' },
];

// ===== [REQ-PER-01…05, REQ-LIT-05, REQ-LIT-06] Percorsi: come un evento attraversa la fabbrica =====
// tappa: el = elemento della scena · wl = workload che devono essere accesi (altrimenti la tappa viene saltata) · cosa = cosa succede · chi · tu = cosa fa la funzione
window.CONFIG.paths = [
  { id: 'incidente', sottotitolo: 'Incident', colore: '#ef4444', titolo: 'Il numero nel mio report è sbagliato',
    messaggio: 'Non devi sapere dove sta il problema: lo segnali allo sportello e il team dati risale la filiera per te.',
    tappe: [
      { el: 'spoke-0', wl: ['SSR'], chi: 'La funzione', cosa: 'Nel report della funzione un numero non torna, o non si è aggiornato.', tu: 'Ti accorgi del problema e non provi a sistemarlo a mano.' },
      { el: 'sportello', wl: ['GOV'], chi: 'La funzione e il team dati', cosa: 'La segnalazione arriva allo sportello dell\'hub.', tu: 'Segnali quale report, quale numero e da quando.' },
      { el: 'salacontrollo', wl: ['GOV'], chi: 'Il team dati', cosa: 'In sala controllo si guarda se qualche reparto si è fermato: una spia rossa dice già dove cercare.' },
      { el: 'confezionamento', wl: ['TRF'], chi: 'Il team dati', cosa: 'Si controlla il semilavorato: il calcolo è quello giusto?' },
      { el: 'gold', wl: ['TRF'], chi: 'Il team dati', cosa: 'Si risale la filiera, un reparto alla volta: i componenti sono stati assemblati bene?' },
      { el: 'silver', wl: ['TRF'], chi: 'Il team dati', cosa: 'Ancora più a monte: la pulizia ha scartato o corretto qualcosa che non doveva?' },
      { el: 'bronze', wl: ['INT'], chi: 'Il team dati', cosa: 'Nel magazzino si guarda il materiale così com\'era arrivato: l\'errore c\'era già?' },
      { el: 'lago', wl: ['INT'], chi: 'Il team dati', cosa: 'Si trova la causa: un carico non è arrivato nel lago, oppure il dato era sbagliato già dal fornitore.' },
      { el: 'laboratorio', wl: ['TRF'], chi: 'Il team dati', cosa: 'Corretta la causa, il materiale ripercorre la filiera e il semilavorato viene collaudato di nuovo.' },
      { el: 'spoke-0', wl: ['SSR'], chi: 'La funzione', cosa: 'Il report torna corretto e la funzione viene avvisata.', tu: 'Controlli che il numero ora torni.' },
    ] },
  { id: 'richiesta', sottotitolo: 'Change request', colore: '#f59e0b', titolo: 'Mi serve un nuovo indicatore',
    messaggio: 'Quello che serve a tutti entra nel semilavorato; quello che serve solo a te lo costruisci nella tua officina.',
    tappe: [
      { el: 'spoke-0', wl: ['SSR'], chi: 'La funzione', cosa: 'Alla funzione serve un indicatore nuovo, o un\'informazione in più.', tu: 'Descrivi cosa ti serve e per quale decisione.' },
      { el: 'sportello', wl: ['GOV'], chi: 'Il team dati con la funzione', cosa: 'Allo sportello si capisce: esiste già? Serve a tutti o solo a questa funzione? Se serve solo a te, lo costruisci nella tua officina, con il nostro aiuto.', tu: 'Porti la richiesta allo sportello.' },
      { el: 'coordinamento', wl: ['PMO'], chi: 'Il team dati', cosa: 'La richiesta entra nel piano di lavoro: ha un responsabile e una data.' },
      { el: 'gold', wl: ['TRF'], chi: 'Il team dati', cosa: 'Si modifica la lavorazione: il nuovo calcolo entra nei componenti.' },
      { el: 'confezionamento', wl: ['TRF'], chi: 'Il team dati', cosa: 'Il semilavorato viene aggiornato con il nuovo indicatore.' },
      { el: 'laboratorio', wl: ['TRF'], chi: 'Il team dati con la funzione', cosa: 'In laboratorio la modifica si prova prima che arrivi a tutti.', tu: 'Provi il nuovo indicatore e confermi che è quello che ti serviva.' },
      { el: 'torre', wl: ['GOV'], chi: 'Il team dati', cosa: 'Il semilavorato aggiornato riceve il marchio di qualità.' },
      { el: 'spedizioni', wl: ['TRF'], chi: 'Il team dati', cosa: 'Il semilavorato aggiornato parte verso tutte le officine.' },
      { el: 'spoke-0', wl: ['SSR'], chi: 'La funzione', cosa: 'L\'indicatore è disponibile: per la tua funzione e per tutte le altre.', tu: 'Lo usi nei tuoi report.' },
    ] },
  { id: 'progetto', sottotitolo: 'New project · il viaggio del dato', colore: '#22c55e', titolo: 'Vogliamo analizzare un\'area nuova',
    messaggio: 'Ogni numero che leggi ha fatto questo viaggio, con un controllo a ogni reparto: per questo ti puoi fidare. E un\'area nuova non è un report nuovo: è una nuova linea della fabbrica, che poi serve a tutti.',
    tappe: [
      { el: 'fornitori', wl: ['SRC'], chi: 'La funzione', cosa: 'Il dato nasce in un sistema che la funzione usa ogni giorno: è lì il nuovo fornitore da collegare.', tu: 'Indichi il sistema e chi lo conosce bene.' },
      { el: 'lago', wl: ['INT'], chi: 'Il team dati', cosa: 'Si costruisce lo scivolo: da ora il materiale scende nel lago a orari stabiliti. Per questo un dato di oggi può arrivare domani.' },
      { el: 'bronze', wl: ['INT'], chi: 'Il team dati', cosa: 'Il materiale viene pescato e messo nel magazzino, così com\'è, con la data di arrivo.' },
      { el: 'silver', wl: ['TRF'], chi: 'Il team dati', cosa: 'Viene pulito e controllato: qui nasce la qualità.' },
      { el: 'gold', wl: ['TRF'], chi: 'Il team dati con la funzione', cosa: 'Viene assemblato con il materiale degli altri fornitori, secondo le regole della funzione.', tu: 'Spieghi come si calcolano i tuoi numeri.' },
      { el: 'confezionamento', wl: ['TRF'], chi: 'Il team dati', cosa: 'Nasce un nuovo semilavorato, collaudato in laboratorio e certificato.' },
      { el: 'showroom', wl: ['VIS'], chi: 'Il team dati', cosa: 'Sul semilavorato nascono i report: il manager legge il numero, e dietro quel numero c\'è tutto il viaggio appena visto.', tu: 'Leggi il numero e decidi.' },
    ] },
  { id: 'ingresso', sottotitolo: 'Onboarding', colore: '#3b82f6', titolo: 'Come entra la mia funzione nella fabbrica?',
    messaggio: 'Non parti da zero: ricevi semilavorati già controllati e ci costruisci sopra quello che ti serve.',
    tappe: [
      { el: 'sportello', wl: ['GOV'], chi: 'La funzione', cosa: 'La funzione si presenta allo sportello dell\'hub.', tu: 'Racconti cosa vorresti capire dai tuoi dati.' },
      { el: 'coordinamento', wl: ['PMO'], chi: 'Il team dati', cosa: 'L\'ingresso della funzione entra nel piano di lavoro.' },
      { el: 'spoke-0', wl: ['SSR'], chi: 'Il team dati', cosa: 'Si costruisce l\'officina della funzione.' },
      { el: 'cancelli', wl: ['ACC'], chi: 'La funzione', cosa: 'Si distribuiscono i badge.', tu: 'Decidi chi dei tuoi entra e cosa può fare.' },
      { el: 'caveau', wl: ['SEC'], chi: 'Il team dati con la funzione', cosa: 'Si fissano le regole su chi vede cosa.', tu: 'Indichi quali dati sono riservati.' },
      { el: 'spedizioni', wl: ['TRF'], chi: 'Il team dati', cosa: 'Parte il primo semilavorato verso la nuova officina.' },
      { el: 'spoke-0', wl: ['SSR'], chi: 'La funzione', cosa: 'Nasce il primo report della funzione.', tu: 'Costruisci il report, con il supporto del team dati.' },
      { el: 'contatori', wl: ['FIN'], chi: 'La funzione', cosa: 'La funzione vede quanta energia consuma la sua officina.' },
    ] },
];
