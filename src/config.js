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
    chiudi: 'Chiudi', tecnico: 'In Fabric', legenda: 'Legenda', materiali: 'Materiali', mezzi: 'Trasporto',
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
    colore: '#1d4ed8', casco: '#facc15', turno: 14,
    trasporto: { m: 2, f: 0, wl: 'INT', nome: 'Team dati — trasporto', tecnico: 'Data engineer (integrazione)',
      fabbrica: 'Uno costruisce e ripara gli scivoli che portano il materiale dai fornitori al lago; l\'altro, da un pannello di comando, manovra le gru che pescano il materiale dal lago e lo mettono nel magazzino materie prime.',
      perTe: 'Sono le persone che collegano i tuoi sistemi alla fabbrica e controllano che i carichi arrivino ogni giorno.',
      compiti: [{ nome: 'Costruisce e ripara gli scivoli', tipo: 'scivoli', z: -77 }, { nome: 'Manovra le gru dal pannello di comando', tipo: 'pannello', pos: [28.5, -44] }] },
    rotazione: { m: 2, f: 1, wl: 'GOV', nome: 'Team dati — governo, coordinamento e report', tecnico: 'Data governance · project manager · BI developer',
      fabbrica: 'Si alternano tra tre postazioni: la cabina di controllo (governo della fabbrica), il coordinamento degli operatori e lo showroom, dove nascono i report ufficiali.',
      perTe: 'Sono poche persone che fanno più mestieri: per questo le richieste si mettono in fila e si pianificano.',
      postazioni: [
        { nome: 'Cabina di controllo', pos: [-34, 56], attiva: ['GOV', 'ARC'] },
        { nome: 'Ufficio di coordinamento', pos: [44, 40], attiva: ['ARC'] },
        { nome: 'Showroom', pos: [-48, 37.5], attiva: ['VIS'] },
      ] },
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
  ordine: ['SRC', 'ARC', 'INT', 'TRF', 'SEC', 'ACC', 'VIS', 'SSR', 'GOV', 'FIN', 'KNW', 'RTI'],
  workloads: {
    ARC: { nome: 'Data Architecture', tecnico: 'Fabric capacity · OneLake · workspace', colore: '#64748b', deps: [], stato: 'off', gestore: 'hub',
      fabbrica: "Il terreno, le fondamenta e il capannone: lo spazio in cui tutto il resto viene costruito, con la centrale che dà energia e il lago dei dati, unico, tra i fornitori e la fabbrica.",
      perTe: "È la base comune: un solo posto per i dati di tutta l'azienda, invece di tanti archivi sparsi. Senza questa base, ogni funzione ricomincia da zero." },
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
    { id: 'capannone', wl: 'ARC', tipo: 'capannone', nome: "Capannone dell'hub", tecnico: 'Tenant · workspace dell\'hub', pos: [0, 0], dim: [64, 80, 14], etichetta: [-32, 18, 40],
      fabbrica: 'Fondamenta, pavimento e struttura del capannone. Dentro prenderanno posto i reparti.',
      perTe: 'È lo spazio comune, già pronto: quando la tua funzione avrà bisogno di qualcosa, non si parte dal terreno vuoto.' },
    { id: 'lago', wl: 'ARC', tipo: 'lago', nome: 'Lago dei dati', tecnico: 'OneLake (Landing: file in un Lakehouse)', pos: [0, -60], dim: [104, 26, 0.5], etichetta: [0, 4, -4],
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
    { id: 'fornitori', wl: 'SRC', tipo: 'piazzale', nome: 'Area fornitori', tecnico: 'Sistemi sorgente', pos: [0, -86], dim: [146, 16, 0.2], etichetta: [0, 0.3, -78], cantiere: false,
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
    { id: 'showroom', wl: 'VIS', tipo: 'showroom', nome: 'Showroom', tecnico: 'Report e app Power BI', pos: [-55, 28], dim: [28, 14, 6], zona: true,
      fabbrica: "Lo showroom dell'hub, accanto alla fabbrica: i prodotti finiti ufficiali, costruiti dal team dati sui semilavorati collaudati e uguali per tutta l'azienda.",
      perTe: "Sono i report ufficiali, in Power BI: li apri e leggi il numero, senza costruire nulla. È lo stesso numero che vedono tutti." },
    // --- Ufficio di coordinamento [REQ-SCN-13] ---
    { id: 'coordinamento', wl: 'ARC', tipo: 'ufficio', nome: 'Ufficio di coordinamento', tecnico: 'Project management del team dati', pos: [52, 38], dim: [12, 8, 5],
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
    { id: 'sensori', wl: 'RTI', tipo: 'salasensori', nome: 'Sala sensori', tecnico: 'Eventstream · Eventhouse · Activator', pos: [58, -20], dim: [14, 12, 8] },
    { id: 'archivio', wl: 'KNW', tipo: 'archiviotecnico', nome: 'Ufficio tecnico e archivio', tecnico: 'Ontology (Fabric IQ)', pos: [58, 14], dim: [14, 12, 10] },
  ],
};
