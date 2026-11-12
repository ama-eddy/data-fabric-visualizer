// ===== CONFIG — modello standard [REQ-CFG-01] =====
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
    chiudi: 'Chiudi', legenda: 'Legenda', materiali: 'Materiali', mezzi: 'Trasporto',
    mezzo: 'Come arriva il materiale', statoElemento: 'Stato',
  },

  // [REQ-LIT-02] contatto mostrato se il profilo non ne indica uno
  contatto: { chi: "Lo sportello dell'hub", come: 'Il punto di contatto del team dati' },

  // [REQ-WL-07] durata dell'animazione di costruzione (secondi)
  animazione: { costruzione: 1.5 },

  // [REQ-SCN-01] layout "a valle verso il pubblico": sorgenti sul fondo (z negativo), hub al centro, spoke in primo piano
  layout: {
    capannone: { x: [-32, 32], z: [-40, 40], pavimento: 0.8, altezza: 14 },
    camera: { pos: [0, 122, 188], target: [0, 0, 4] },
    sorgenti: { z: -86, passo: 13.5, larghezza: 116 },   // [REQ-SRC-07] area fornitori sul fondo
    margineSinistro: 332, // larghezza occupata dal pannello: la scena viene centrata nello spazio libero
  },

  // [REQ-FLW-08] materiali: l'aspetto del materiale a ogni stadio
  materiali: {
    grezzo: { nome: 'Grezzo', colore: '#9ca3af' },
    bronze: { nome: 'Bronze — conservato', colore: '#b87333' },
    silver: { nome: 'Silver — pulito', colore: '#d7dbe2' },
    gold: { nome: 'Gold — assemblato', colore: '#f5c518' },
    semilavorato: { nome: 'Semilavorato certificato', colore: '#22d3ee' },
    report: { nome: 'Report — prodotto finito', colore: '#f59e0b' },
  },

  // [REQ-SRC-03, REQ-SRC-04, REQ-SRC-05] modalità di acquisizione → mezzo di trasporto (testi senza termini tecnici)
  modalita: {
    copy: { nome: 'Camion', colore: '#f97316', landing: true,
      testo: 'Il materiale viene caricato su un camion a orari stabiliti e scaricato alla banchina.' },
    dataflow: { nome: 'Camion con officina a bordo', colore: '#a16207', landing: true,
      testo: 'Il materiale viaggia su un camion che lo sistema un po\' già durante il viaggio, poi lo scarica alla banchina.' },
    mirroring: { nome: 'Condotta continua', colore: '#0ea5e9', landing: false,
      testo: 'Una copia sempre aggiornata scorre senza sosta in una condotta ed entra direttamente nel magazzino: non passa dalla banchina.' },
    shortcut: { nome: 'Ponte di vetro', colore: '#a5f3fc', landing: false,
      testo: 'Il materiale non si sposta: resta dal fornitore e la fabbrica lo usa attraverso un ponte, senza copiarlo. Non passa dalla banchina.' },
    streaming: { nome: 'Nastro veloce', colore: '#ea580c', landing: false,
      testo: 'Il materiale arriva in diretta, un pezzo dopo l\'altro, alla sala sensori: funziona solo quando il Real-Time è attivo.' },
  },

  // [REQ-SRC-02] categoria della sorgente → forma dell'edificio e modalità di default
  categorie: {
    erp: { forma: 'stabilimento', modalita: 'copy', fabbrica: 'Un grande stabilimento: il fornitore principale, con tanto materiale ben organizzato.', perTe: 'È il gestionale: ordini, fatture, contabilità.' },
    crm: { forma: 'negozio', modalita: 'copy', fabbrica: 'Un negozio: qui nasce tutto ciò che riguarda il rapporto con i clienti.', perTe: 'È il sistema dove si seguono clienti, contatti e trattative.' },
    db: { forma: 'silo', modalita: 'mirroring', fabbrica: 'Dei silos: materiale già stoccato in modo ordinato, pronto da prelevare.', perTe: 'È un archivio strutturato di un\'applicazione aziendale.' },
    file: { forma: 'archivio', modalita: 'dataflow', fabbrica: 'Un archivio di scatoloni: materiale sfuso, preparato a mano.', perTe: 'Sono i fogli di calcolo e i file che oggi qualcuno compila e si passa a mano.' },
    api: { forma: 'sportello', modalita: 'copy', fabbrica: 'Uno sportello: si chiede e si riceve, un pezzo alla volta.', perTe: 'È un servizio esterno a cui l\'azienda è abbonata e da cui si ritirano i dati.' },
    iot: { forma: 'sensori', modalita: 'streaming', fabbrica: 'Un campo di sensori: il materiale arriva in continuazione, senza pause.', perTe: 'Sono macchine e sensori che mandano segnali in ogni momento.' },
    esterni: { forma: 'mercato', modalita: 'copy', fabbrica: 'Un mercato: materiale che viene da fuori, acquistato o pubblico.', perTe: 'Sono dati di mercato o dati pubblici che arricchiscono quelli dell\'azienda.' },
    storage: { forma: 'container', modalita: 'shortcut', fabbrica: 'Un deposito di container: grandi quantità di materiale già raccolto altrove.', perTe: 'È un archivio dati che l\'azienda ha già: si usa così com\'è, senza duplicarlo.' },
  },

  // [REQ-SRC-01] catalogo standard delle sorgenti (sostituito da quello del profilo, se presente)
  sources: [
    { id: 'src-erp', nome: 'Gestionale', categoria: 'erp', stato: 'on' },
    { id: 'src-crm', nome: 'CRM', categoria: 'crm', stato: 'on' },
    { id: 'src-hr', nome: 'Sistema del personale', categoria: 'db', stato: 'on' },
    { id: 'src-bud', nome: 'Budget e forecast (Excel)', categoria: 'file', stato: 'on' },
    { id: 'src-wms', nome: 'Magazzino e produzione', categoria: 'db', stato: 'on' },
    { id: 'src-iot', nome: 'Sensori di impianto', categoria: 'iot', stato: 'on' },
    { id: 'src-mkt', nome: 'Marketing', categoria: 'api', stato: 'on' },
    { id: 'src-ext', nome: 'Dati di mercato', categoria: 'esterni', stato: 'on' },
    { id: 'src-lake', nome: 'Archivio dati esistente', categoria: 'storage', stato: 'on' },
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
    gestoreTesto: 'I report e i dati locali sono della funzione. Il dato di base, dentro il semilavorato, resta del team dati: per questo è uguale per tutti.',  // [REQ-HS-06]
  },

  // [REQ-SCN-11] team dati: una figura per persona. m = uomini, f = donne. Sostituito dal profilo, se presente.
  team: {
    colore: '#1d4ed8', casco: '#facc15', turno: 14,
    trasporto: { m: 2, f: 0, wl: 'INT', nome: 'Team dati — trasporto',
      fabbrica: 'Portano il materiale dai fornitori alla banchina e dalla banchina al magazzino.',
      perTe: 'Sono le persone che collegano i tuoi sistemi alla fabbrica e controllano che i carichi arrivino ogni giorno.',
      compiti: [{ da: [30, -76], a: [30, -42] }, { da: [25, -33.5], a: [25, -23] }] },
    rotazione: { m: 2, f: 1, wl: 'GOV', nome: 'Team dati — governo, coordinamento e report',
      fabbrica: 'Si alternano tra tre postazioni: la cabina di controllo (governo della fabbrica), il coordinamento degli operatori e lo showroom, dove nascono i report ufficiali.',
      perTe: 'Sono poche persone che fanno più mestieri: per questo le richieste si mettono in fila e si pianificano.',
      postazioni: [
        { nome: 'Cabina di controllo', pos: [-42, 47], attiva: ['GOV', 'ARC'] },
        { nome: 'Ufficio di coordinamento', pos: [46, 44], attiva: ['ARC'] },
        { nome: 'Showroom', pos: [-16, 35.5], attiva: ['VIS'] },
      ] },
  },

  // [REQ-FLW-02…06, REQ-FLW-09] nastri dentro il capannone: tre corsie, il materiale cambia aspetto a ogni tratto.
  // wl = workload a cui appartiene il nastro · richiede = workload che devono essere 'on' perché il materiale si muova
  flussi: {
    corsie: [-18, 0, 18],
    tratti: [
      { id: 'banchina-bronze', z: [-33, -23], materiale: 'grezzo', wl: 'INT', richiede: ['INT'], alimentato: 'landing' },
      { id: 'bronze-silver', z: [-23, -9], materiale: 'bronze', wl: 'TRF', richiede: ['INT', 'TRF'], alimentato: 'bronze' },
      { id: 'silver-gold', z: [-9, 3], materiale: 'silver', wl: 'TRF', richiede: ['INT', 'TRF'], alimentato: 'bronze' },
      { id: 'gold-confezionamento', z: [3, 12.5], materiale: 'gold', wl: 'TRF', richiede: ['INT', 'TRF'], alimentato: 'bronze' },
    ],
    uscite: [
      { id: 'confezionamento-spedizioni', punti: [[16, 16], [16, 27]], materiale: 'semilavorato', wl: 'TRF', richiede: ['INT', 'TRF'], alimentato: 'bronze' },
      // [REQ-FLW-07] verso lo showroom dell'hub: compare solo con la Data Visualization
      { id: 'confezionamento-showroom', punti: [[-16, 16], [-16, 25]], materiale: 'semilavorato', wl: 'VIS', richiede: ['INT', 'TRF', 'VIS'], alimentato: 'bronze' },
    ],
  },

  // [REQ-WL-10, REQ-WL-11] catalogo dei workload — tutti 'off' nel modello standard [REQ-WL-05]
  ordine: ['ARC', 'ACC', 'SEC', 'INT', 'TRF', 'VIS', 'SSR', 'GOV', 'MON', 'FIN', 'RTI', 'KNW'],
  workloads: {
    ARC: { nome: 'Architettura', colore: '#64748b', deps: [], stato: 'off', gestore: 'hub',
      fabbrica: "Il terreno, le fondamenta e il capannone: lo spazio in cui tutto il resto viene costruito, con la centrale che dà energia e la riserva d'acqua unica sotto il pavimento.",
      perTe: "È la base comune: un solo posto per i dati di tutta l'azienda, invece di tanti archivi sparsi. Senza questa base, ogni funzione ricomincia da zero." },
    ACC: { nome: 'Accessi', colore: '#0ea5e9', deps: ['ARC'], stato: 'off', gestore: 'entrambi',
      fabbrica: 'Cancelli, tornelli e badge: si entra solo se autorizzati, e ognuno va solo nei reparti che gli servono.',
      perTe: 'Decidi tu chi della tua funzione entra e cosa può fare. Chiedere un accesso è come chiedere un badge.' },
    SEC: { nome: 'Security', colore: '#dc2626', deps: ['ARC'], stato: 'off', gestore: 'hub',
      fabbrica: 'Recinzione, telecamere, caveau e sigilli sui pacchi: proteggono il materiale prezioso.',
      perTe: 'I dati riservati li vede solo chi deve: le regole su chi vede cosa viaggiano insieme al dato, anche dentro i tuoi report.' },
    INT: { nome: 'Data Integration', colore: '#2563eb', deps: ['ARC'], stato: 'off', gestore: 'hub',
      fabbrica: "I fornitori consegnano il materiale: camion e condotte lo portano alla banchina di scarico e da lì al magazzino materie prime (Bronze), dove viene conservato così com'è.",
      perTe: 'I dati dei sistemi che usi ogni giorno arrivano qui da soli, a orari stabiliti: nessuno deve più estrarli a mano.' },
    TRF: { nome: 'Data Transformation', colore: '#16a34a', deps: ['INT'], stato: 'off', gestore: 'hub',
      fabbrica: 'Il materiale viene pulito e controllato (Silver), assemblato in componenti (Gold) e confezionato in semilavorati con il marchio di qualità.',
      perTe: 'Ricevi dati già puliti e con i calcoli già pronti: non devi più sistemarli a mano prima di usarli.' },
    VIS: { nome: 'Data Visualization', colore: '#f59e0b', deps: ['TRF'], stato: 'off', gestore: 'hub',
      fabbrica: "Lo showroom: i prodotti finiti ufficiali dell'azienda, uguali per tutti.",
      perTe: "Sono i report ufficiali, in Power BI: gli stessi numeri per tutta l'azienda, da consultare senza costruire nulla." },
    SSR: { nome: 'Self-service (spoke)', colore: '#ec4899', deps: ['TRF', 'ACC'], stato: 'off', gestore: 'spoke',
      fabbrica: 'Le officine delle funzioni: ricevono i semilavorati e li personalizzano, aggiungendo se serve il proprio materiale.',
      perTe: 'È la tua officina: parti da dati certificati e costruisci i report che servono alla tua funzione, senza aspettare nessuno.' },
    GOV: { nome: 'Governance', colore: '#7c3aed', deps: ['ARC'], stato: 'off', gestore: 'hub',
      fabbrica: "La torre di controllo e l'ufficio qualità: fissano le regole comuni e mettono il marchio di qualità sui prodotti controllati. Qui c'è anche lo sportello a cui rivolgersi.",
      perTe: 'Quando vedi il marchio "dato certificato" sai che quel numero è lo stesso per tutti. E sai a chi chiedere.' },
    MON: { nome: 'Monitoraggio', colore: '#0d9488', deps: ['ARC'], stato: 'off', gestore: 'hub',
      fabbrica: "La sala controllo con quadri e spie: mostra se ogni reparto sta lavorando e dà l'allarme se un impianto si ferma.",
      perTe: 'Se un caricamento salta, il team dati lo sa prima di te: spesso il problema è risolto prima che tu apra il report.' },
    FIN: { nome: 'Monitoraggio costi', colore: '#ca8a04', deps: ['ARC'], stato: 'off', gestore: 'hub',
      fabbrica: 'I contatori della centrale: misurano quanta energia consuma ogni reparto e ogni officina.',
      perTe: 'La fabbrica ha un costo, e si può vedere quanto consuma ogni funzione: aiuta a decidere dove investire.' },
    RTI: { nome: 'Real-Time', colore: '#ea580c', deps: ['ARC'], stato: 'off', gestore: 'hub',
      fabbrica: 'La sala sensori: lavora il materiale in diretta, nel momento in cui arriva, senza passare dal magazzino.',
      perTe: 'Serve quando non puoi aspettare domani: vedere cosa succede adesso e ricevere un avviso appena qualcosa cambia.' },
    KNW: { nome: 'Knowledge', colore: '#92400e', deps: ['TRF'], stato: 'off', gestore: 'hub',
      fabbrica: "L'ufficio tecnico e l'archivio dei progetti: la mappa di cosa sono le cose dell'azienda e di come sono collegate.",
      perTe: 'Mette tutti d\'accordo sul significato delle parole ("cliente", "ordine", "margine") e permette di fare domande ai dati nel linguaggio di tutti i giorni.' },
  },

  // [REQ-WL-12] elementi della scena: ognuno appartiene a un workload.
  // tipo = costruttore 3D; 'segnaposto' = volume provvisorio, sostituito nei batch successivi (vedi PIANO.md).
  // pos = [x, z] centro · dim = [larghezza, profondità, altezza]. Testi mancanti: si usano quelli del workload.
  elements: [
    // --- Architettura [REQ-SCN-04, REQ-SCN-10] ---
    { id: 'capannone', wl: 'ARC', tipo: 'capannone', nome: "Capannone dell'hub", pos: [0, 0], dim: [64, 80, 14], etichetta: [-32, 18, 40],
      fabbrica: 'Fondamenta, pavimento e struttura del capannone. Dentro prenderanno posto i reparti.',
      perTe: 'È lo spazio comune, già pronto: quando la tua funzione avrà bisogno di qualcosa, non si parte dal terreno vuoto.' },
    { id: 'riserva', wl: 'ARC', tipo: 'riserva', nome: "Riserva d'acqua unica", pos: [0, 0], dim: [72, 88, 0.5], cantiere: false, etichetta: [36, 2.5, 44],
      fabbrica: "La riserva d'acqua unica sotto tutta la fabbrica: ogni reparto e ogni officina attinge dallo stesso serbatoio.",
      perTe: 'Un solo posto per i dati: niente copie sparse, e tutti leggono la stessa versione.' },
    { id: 'centrale', wl: 'ARC', tipo: 'centrale', nome: 'Centrale elettrica', pos: [-58, -22], dim: [18, 16, 12],
      fabbrica: 'La centrale dà energia a tutti i reparti. Se un reparto ne consuma troppa, gli altri rallentano.',
      perTe: "L'energia della fabbrica ha un costo ed è condivisa: per questo si pianifica chi consuma cosa." },
    { id: 'laboratorio', wl: 'ARC', tipo: 'laboratorio', nome: 'Laboratorio prove', pos: [-58, 12], dim: [16, 12, 7],
      fabbrica: 'Ogni modifica si prova qui prima di entrare in produzione.',
      perTe: 'Quando chiedi una modifica, la provi insieme al team dati prima che arrivi a tutti: niente sorprese nei report.' },

    // --- Segnaposto degli altri workload (batch 2-4) ---
    // --- Data Integration [REQ-FLW-01…03, REQ-SCN-02] ---
    { id: 'fornitori', wl: 'INT', tipo: 'piazzale', nome: 'Area fornitori', pos: [0, -86], dim: [124, 16, 0.2], etichetta: [-58, 3, -96], cantiere: false,
      fabbrica: "L'area dei fornitori: i sistemi dell'azienda da cui parte il materiale grezzo. Ogni tipo di fornitore ha un edificio diverso.",
      perTe: 'Sono i sistemi che usi ogni giorno: gestionale, CRM, fogli di calcolo. Tu continui a lavorare lì, il materiale parte da solo.' },
    { id: 'banchina', wl: 'INT', tipo: 'banchina', nome: 'Banchina di scarico', pos: [0, -34.5], dim: [60, 9, 5], zona: true,
      fabbrica: "La banchina di scarico: i camion arrivano e il materiale viene scaricato così com'è, senza aprirlo né modificarlo.",
      perTe: "Qui arriva una copia fedele dei dati dei tuoi sistemi: nulla viene toccato nel sistema d'origine." },
    { id: 'bronze', wl: 'INT', tipo: 'bronze', nome: 'Magazzino materie prime (Bronze)', pos: [0, -22], dim: [60, 12, 6], zona: true,
      fabbrica: "Il magazzino materie prime: il materiale viene messo a scaffale con l'etichetta di arrivo e conservato, ancora grezzo.",
      perTe: "Tutto ciò che arriva resta conservato con la sua data: si può sempre tornare a vedere com'era il dato in origine." },

    // --- Data Transformation [REQ-FLW-04…06, REQ-SCN-02] ---
    { id: 'silver', wl: 'TRF', tipo: 'silver', nome: 'Reparto lavorazione (Silver)', pos: [0, -9], dim: [60, 12, 6], zona: true,
      fabbrica: 'Il reparto lavorazione: il materiale viene pulito, controllato e portato a misura. Qui nasce la qualità.',
      perTe: 'Doppioni, errori di battitura, codici diversi per la stessa cosa: vengono sistemati qui, una volta per tutti.' },
    { id: 'gold', wl: 'TRF', tipo: 'gold', nome: 'Linea di assemblaggio (Gold)', pos: [0, 3], dim: [60, 10, 6], zona: true,
      fabbrica: 'La linea di assemblaggio: i pezzi puliti vengono montati in componenti pensati per il business (vendite, clienti, costi).',
      perTe: 'I dati di sistemi diversi vengono messi insieme: finalmente il cliente del CRM e quello del gestionale sono la stessa cosa.' },
    { id: 'confezionamento', wl: 'TRF', tipo: 'confezionamento', nome: 'Confezionamento semilavorati', pos: [0, 14], dim: [60, 8, 6], zona: true,
      fabbrica: 'Il confezionamento: i componenti diventano semilavorati, con le istruzioni dentro e il marchio di qualità sopra.',
      perTe: 'Il semilavorato è un dato certificato, con i calcoli già pronti: lo stesso per tutti, pronto per costruirci i report.' },
    { id: 'spedizioni', wl: 'TRF', tipo: 'spedizioni', nome: 'Spedizioni', pos: [16, 30], dim: [28, 14, 5], zona: true,
      fabbrica: 'Il reparto spedizioni: da qui i semilavorati partono verso le officine delle funzioni.',
      perTe: 'È da qui che i dati certificati arrivano alla tua funzione.' },
    // --- Data Visualization [REQ-FLW-07, REQ-SCN-07] ---
    { id: 'showroom', wl: 'VIS', tipo: 'showroom', nome: 'Showroom', pos: [-16, 30], dim: [28, 14, 6], zona: true,
      fabbrica: "Lo showroom dell'hub: i prodotti finiti ufficiali, costruiti dal team dati sui semilavorati e uguali per tutta l'azienda.",
      perTe: "Sono i report ufficiali, in Power BI: li apri e leggi il numero, senza costruire nulla. È lo stesso numero che vedono tutti." },
    // --- Ufficio di coordinamento [REQ-SCN-13] ---
    { id: 'coordinamento', wl: 'ARC', tipo: 'ufficio', nome: 'Ufficio di coordinamento', pos: [52, 38], dim: [12, 8, 5],
      fabbrica: "L'ufficio da cui si coordinano tutti gli operatori della fabbrica: chi fa cosa, in che ordine, entro quando.",
      perTe: 'Quando chiedi qualcosa, è qui che la richiesta trova posto nel piano di lavoro e un responsabile.' },
    { id: 'cancelli', wl: 'ACC', tipo: 'segnaposto', nome: 'Cancelli e tornelli', pos: [0, 52], dim: [16, 4, 5] },
    { id: 'recinzione', wl: 'SEC', tipo: 'segnaposto', nome: 'Recinzione e telecamere', pos: [28, 52], dim: [12, 4, 4] },
    { id: 'torre', wl: 'GOV', tipo: 'segnaposto', nome: 'Torre di controllo', pos: [-48, 46], dim: [8, 8, 18] },
    { id: 'sportello', wl: 'GOV', tipo: 'segnaposto', nome: "Sportello dell'hub", pos: [-26, 52], dim: [12, 6, 5] },
    { id: 'salacontrollo', wl: 'MON', tipo: 'segnaposto', nome: 'Sala controllo', pos: [-58, -50], dim: [12, 8, 6] },
    { id: 'contatori', wl: 'FIN', tipo: 'segnaposto', nome: 'Contatori della centrale', pos: [-58, -36], dim: [8, 4, 4] },
    { id: 'sensori', wl: 'RTI', tipo: 'segnaposto', nome: 'Sala sensori', pos: [58, -20], dim: [14, 14, 8] },
    { id: 'archivio', wl: 'KNW', tipo: 'segnaposto', nome: 'Ufficio tecnico e archivio', pos: [58, 14], dim: [14, 14, 10] },
  ],
};
