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
    chiudi: 'Chiudi',
  },

  // [REQ-LIT-02] contatto mostrato se il profilo non ne indica uno
  contatto: { chi: "Lo sportello dell'hub", come: 'Il punto di contatto del team dati' },

  // [REQ-WL-07] durata dell'animazione di costruzione (secondi)
  animazione: { costruzione: 1.5 },

  // [REQ-SCN-01] layout "a valle verso il pubblico": sorgenti sul fondo (z negativo), hub al centro, spoke in primo piano
  layout: {
    capannone: { x: [-32, 32], z: [-40, 40], pavimento: 0.8, altezza: 14 },
    camera: { pos: [0, 122, 188], target: [0, 0, 4] },
    margineSinistro: 332, // larghezza occupata dal pannello: la scena viene centrata nello spazio libero
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
    { id: 'fornitori', wl: 'INT', tipo: 'segnaposto', nome: 'Area fornitori (sorgenti)', pos: [0, -86], dim: [110, 12, 5] },
    { id: 'banchina', wl: 'INT', tipo: 'segnaposto', nome: 'Banchina di scarico', pos: [0, -34], dim: [56, 9, 5] },
    { id: 'bronze', wl: 'INT', tipo: 'segnaposto', nome: 'Magazzino materie prime (Bronze)', pos: [0, -22], dim: [56, 10, 6] },
    { id: 'silver', wl: 'TRF', tipo: 'segnaposto', nome: 'Reparto lavorazione (Silver)', pos: [0, -9], dim: [56, 10, 6] },
    { id: 'gold', wl: 'TRF', tipo: 'segnaposto', nome: 'Linea di assemblaggio (Gold)', pos: [0, 3], dim: [56, 9, 6] },
    { id: 'confezionamento', wl: 'TRF', tipo: 'segnaposto', nome: 'Confezionamento semilavorati', pos: [0, 14], dim: [56, 8, 6] },
    { id: 'spedizioni', wl: 'TRF', tipo: 'segnaposto', nome: 'Spedizioni', pos: [16, 30], dim: [26, 12, 5] },
    { id: 'showroom', wl: 'VIS', tipo: 'segnaposto', nome: 'Showroom', pos: [-16, 30], dim: [26, 12, 6] },
    { id: 'officine', wl: 'SSR', tipo: 'segnaposto', nome: 'Officine degli spoke', pos: [0, 80], dim: [110, 12, 5] },
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
