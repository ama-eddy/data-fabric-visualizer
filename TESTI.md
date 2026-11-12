# Testi della Fabbrica Dati

> **Come si usa.** Ogni testo ha un titolo con la sua chiave (`### chiave`): si cambia **solo il testo sotto il titolo**, mai la chiave.
> Il testo può andare a capo liberamente: viene unito in un'unica riga. Niente apici o caratteri speciali da rispettare.
> Si modifica anche da GitHub nel browser (matita in alto a destra): al salvataggio la pagina pubblica si aggiorna da sola in un paio di minuti.
> **Lessico** (REQUISITI §1.2): ammessi report, Power BI, dato certificato, Bronze / Silver / Gold. Gli altri termini tecnici (Lakehouse, pipeline, modello semantico…) vanno tradotti: se ne compare uno, la pagina **non** viene aggiornata e l'azione su GitHub diventa rossa indicando dove.
> Le parole del profilo di un'azienda (nomi degli spoke, delle sorgenti, contatto) non stanno qui: stanno nel profilo.

## Titolo

### meta.titolo
Fabbrica Dati

### meta.sottotitolo
Come nascono i numeri che leggi nei report

## Interfaccia: pulsanti e intestazioni

### ui.workload
Workload

### ui.stati.off
Off

### ui.stati.wip
Cantiere

### ui.stati.on
On

### ui.statoLungo.off
Non presente

### ui.statoLungo.wip
In costruzione

### ui.statoLungo.on
Attivo

### ui.vistaInsieme
Vista d'insieme

### ui.etichette
Etichette

### ui.pausa
Pausa flussi

### ui.riprendi
Riprendi flussi

### ui.tuttoOn
Tutto on

### ui.tuttoOff
Tutto off

### ui.nellaFabbrica
Nella fabbrica

### ui.perTe
Cosa significa per te

### ui.contatto
A chi rivolgerti

### ui.gestore
Chi lo gestisce

### ui.gestori.hub
Il team dati (hub)

### ui.gestori.spoke
La tua funzione (spoke)

### ui.gestori.entrambi
Il team dati insieme alla tua funzione

### ui.lavori
Lavori in corso

### ui.segnaposto
in arrivo

### ui.aiuto
Trascina per ruotare · rotellina per lo zoom · tasto destro o WASD per spostarti · clic su un elemento per la scheda

### ui.chiudi
Chiudi

### ui.legenda
Legenda

### ui.materiali
Materiali

### ui.mezzi
Trasporto

### ui.mezzo
Come arriva il materiale

### ui.statoElemento
Stato

### ui.categoria
Tipo di sistema

### ui.apri
Mostra uno per uno

### ui.team
Team dati

### ui.fuoriServizio
non in servizio

## Contatto predefinito ("A chi rivolgerti")

### contatto.chi
Lo sportello dell'hub

### contatto.come
Il punto di contatto del team dati

## Workload: schede

### workloads.ARC.nome
Architettura

### workloads.ARC.fabbrica
Il terreno, le fondamenta e il capannone: lo spazio in cui tutto il resto viene costruito, con la centrale che dà energia e la riserva d'acqua unica sotto il pavimento.

### workloads.ARC.perTe
È la base comune: un solo posto per i dati di tutta l'azienda, invece di tanti archivi sparsi. Senza questa base, ogni funzione ricomincia da zero.

### workloads.ACC.nome
Accessi

### workloads.ACC.fabbrica
Cancelli, tornelli e badge: si entra solo se autorizzati, e ognuno va solo nei reparti che gli servono.

### workloads.ACC.perTe
Decidi tu chi della tua funzione entra e cosa può fare. Chiedere un accesso è come chiedere un badge.

### workloads.SEC.nome
Security

### workloads.SEC.fabbrica
Recinzione, telecamere, caveau e sigilli sui pacchi: proteggono il materiale prezioso.

### workloads.SEC.perTe
I dati riservati li vede solo chi deve: le regole su chi vede cosa viaggiano insieme al dato, anche dentro i tuoi report.

### workloads.INT.nome
Data Integration

### workloads.INT.fabbrica
I fornitori consegnano il materiale: camion e condotte lo portano alla banchina di scarico e da lì al magazzino materie prime (Bronze), dove viene conservato così com'è.

### workloads.INT.perTe
I dati dei sistemi che usi ogni giorno arrivano qui da soli, a orari stabiliti: nessuno deve più estrarli a mano.

### workloads.TRF.nome
Data Transformation

### workloads.TRF.fabbrica
Il materiale viene pulito e controllato (Silver), assemblato in componenti (Gold) e confezionato in semilavorati con il marchio di qualità.

### workloads.TRF.perTe
Ricevi dati già puliti e con i calcoli già pronti: non devi più sistemarli a mano prima di usarli.

### workloads.VIS.nome
Data Visualization

### workloads.VIS.fabbrica
Lo showroom: i prodotti finiti ufficiali dell'azienda, uguali per tutti.

### workloads.VIS.perTe
Sono i report ufficiali, in Power BI: gli stessi numeri per tutta l'azienda, da consultare senza costruire nulla.

### workloads.SSR.nome
Self-service (spoke)

### workloads.SSR.fabbrica
Le officine delle funzioni: ricevono i semilavorati e li personalizzano, aggiungendo se serve il proprio materiale.

### workloads.SSR.perTe
È la tua officina: parti da dati certificati e costruisci i report che servono alla tua funzione, senza aspettare nessuno.

### workloads.GOV.nome
Governance

### workloads.GOV.fabbrica
La torre di controllo e l'ufficio qualità: fissano le regole comuni e mettono il marchio di qualità sui prodotti controllati. Qui c'è anche lo sportello a cui rivolgersi.

### workloads.GOV.perTe
Quando vedi il marchio "dato certificato" sai che quel numero è lo stesso per tutti. E sai a chi chiedere.

### workloads.MON.nome
Monitoraggio

### workloads.MON.fabbrica
La sala controllo con quadri e spie: mostra se ogni reparto sta lavorando e dà l'allarme se un impianto si ferma.

### workloads.MON.perTe
Se un caricamento salta, il team dati lo sa prima di te: spesso il problema è risolto prima che tu apra il report.

### workloads.FIN.nome
Monitoraggio costi

### workloads.FIN.fabbrica
I contatori della centrale: misurano quanta energia consuma ogni reparto e ogni officina.

### workloads.FIN.perTe
La fabbrica ha un costo, e si può vedere quanto consuma ogni funzione: aiuta a decidere dove investire.

### workloads.RTI.nome
Real-Time

### workloads.RTI.fabbrica
La sala sensori: lavora il materiale in diretta, nel momento in cui arriva, senza passare dal magazzino.

### workloads.RTI.perTe
Serve quando non puoi aspettare domani: vedere cosa succede adesso e ricevere un avviso appena qualcosa cambia.

### workloads.KNW.nome
Knowledge

### workloads.KNW.fabbrica
L'ufficio tecnico e l'archivio dei progetti: la mappa di cosa sono le cose dell'azienda e di come sono collegate.

### workloads.KNW.perTe
Mette tutti d'accordo sul significato delle parole ("cliente", "ordine", "margine") e permette di fare domande ai dati nel linguaggio di tutti i giorni.

## Elementi della scena: etichette e schede

### elements.capannone.nome
Capannone dell'hub

### elements.capannone.fabbrica
Fondamenta, pavimento e struttura del capannone. Dentro prenderanno posto i reparti.

### elements.capannone.perTe
È lo spazio comune, già pronto: quando la tua funzione avrà bisogno di qualcosa, non si parte dal terreno vuoto.

### elements.riserva.nome
Riserva d'acqua unica

### elements.riserva.fabbrica
La riserva d'acqua unica sotto tutta la fabbrica: ogni reparto e ogni officina attinge dallo stesso serbatoio.

### elements.riserva.perTe
Un solo posto per i dati: niente copie sparse, e tutti leggono la stessa versione.

### elements.centrale.nome
Centrale elettrica

### elements.centrale.fabbrica
La centrale dà energia a tutti i reparti. Se un reparto ne consuma troppa, gli altri rallentano.

### elements.centrale.perTe
L'energia della fabbrica ha un costo ed è condivisa: per questo si pianifica chi consuma cosa.

### elements.laboratorio.nome
Laboratorio prove

### elements.laboratorio.fabbrica
Il laboratorio prove: ogni semilavorato viene collaudato qui prima di uscire dalla fabbrica, e ogni modifica si prova qui prima di entrare in produzione.

### elements.laboratorio.perTe
Quello che ricevi è già stato provato. E quando chiedi una modifica, la provi insieme al team dati prima che arrivi a tutti: niente sorprese nei report.

### elements.fornitori.nome
Area fornitori

### elements.fornitori.fabbrica
L'area dei fornitori: i sistemi dell'azienda da cui parte il materiale grezzo. Ogni tipo di fornitore ha un edificio diverso.

### elements.fornitori.perTe
Sono i sistemi che usi ogni giorno: gestionale, CRM, fogli di calcolo. Tu continui a lavorare lì, il materiale parte da solo.

### elements.banchina.nome
Banchina di scarico

### elements.banchina.fabbrica
La banchina di scarico: i camion arrivano e il materiale viene scaricato così com'è, senza aprirlo né modificarlo.

### elements.banchina.perTe
Qui arriva una copia fedele dei dati dei tuoi sistemi: nulla viene toccato nel sistema d'origine.

### elements.bronze.nome
Magazzino materie prime (Bronze)

### elements.bronze.fabbrica
Il magazzino materie prime: il materiale viene messo a scaffale con l'etichetta di arrivo e conservato, ancora grezzo.

### elements.bronze.perTe
Tutto ciò che arriva resta conservato con la sua data: si può sempre tornare a vedere com'era il dato in origine.

### elements.silver.nome
Reparto lavorazione (Silver)

### elements.silver.fabbrica
Il reparto lavorazione: il materiale viene pulito, controllato e portato a misura. Qui nasce la qualità.

### elements.silver.perTe
Doppioni, errori di battitura, codici diversi per la stessa cosa: vengono sistemati qui, una volta per tutti.

### elements.gold.nome
Linea di assemblaggio (Gold)

### elements.gold.fabbrica
La linea di assemblaggio: i pezzi puliti vengono montati in componenti pensati per il business (vendite, clienti, costi).

### elements.gold.perTe
I dati di sistemi diversi vengono messi insieme: finalmente il cliente del CRM e quello del gestionale sono la stessa cosa.

### elements.confezionamento.nome
Confezionamento semilavorati

### elements.confezionamento.fabbrica
Il confezionamento: i componenti diventano semilavorati, con le istruzioni dentro e il marchio di qualità sopra.

### elements.confezionamento.perTe
Il semilavorato è un dato certificato, con i calcoli già pronti: lo stesso per tutti, pronto per costruirci i report.

### elements.spedizioni.nome
Spedizioni

### elements.spedizioni.fabbrica
Il reparto spedizioni: da qui i semilavorati collaudati partono verso le officine delle funzioni.

### elements.spedizioni.perTe
È da qui che i dati certificati arrivano alla tua funzione.

### elements.showroom.nome
Showroom

### elements.showroom.fabbrica
Lo showroom dell'hub, accanto alla fabbrica: i prodotti finiti ufficiali, costruiti dal team dati sui semilavorati collaudati e uguali per tutta l'azienda.

### elements.showroom.perTe
Sono i report ufficiali, in Power BI: li apri e leggi il numero, senza costruire nulla. È lo stesso numero che vedono tutti.

### elements.coordinamento.nome
Ufficio di coordinamento

### elements.coordinamento.fabbrica
L'ufficio da cui si coordinano tutti gli operatori della fabbrica: chi fa cosa, in che ordine, entro quando.

### elements.coordinamento.perTe
Quando chiedi qualcosa, è qui che la richiesta trova posto nel piano di lavoro e un responsabile.

### elements.cancelli.nome
Cancelli e tornelli

### elements.cancelli.fabbrica
Il cancello, i tornelli e il lettore di badge: si entra solo se autorizzati, e ognuno raggiunge solo i reparti che gli servono.

### elements.cancelli.perTe
Per far entrare una persona della tua funzione si chiede un badge: decidi tu chi entra e che cosa può fare.

### elements.recinzione.nome
Recinzione e telecamere

### elements.recinzione.fabbrica
La recinzione attorno alla fabbrica e le telecamere: tengono fuori chi non deve entrare e registrano chi passa.

### elements.recinzione.perTe
I dati della tua funzione sono protetti come quelli di tutte le altre: si sa sempre chi ha guardato cosa.

### elements.caveau.nome
Caveau

### elements.caveau.fabbrica
Il caveau: il materiale più delicato sta qui, sotto chiave.

### elements.caveau.perTe
I dati riservati (stipendi, dati personali) li vede solo chi deve: le regole su chi vede cosa valgono anche dentro i tuoi report.

### elements.torre.nome
Torre di controllo

### elements.torre.fabbrica
La torre di controllo: da qui si governa la fabbrica, si fissano le regole comuni e si mette il marchio di qualità sui prodotti controllati.

### elements.torre.perTe
Il marchio "dato certificato" nasce qui: quando lo vedi, quel numero è lo stesso per tutta l'azienda.

### elements.sportello.nome
Sportello dell'hub

### elements.sportello.fabbrica
Lo sportello dell'hub: il punto in cui le funzioni incontrano il team dati per chiedere, segnalare un problema o entrare nella fabbrica.

### elements.sportello.perTe
Non devi sapere a quale reparto rivolgerti: vieni qui, e la tua richiesta arriva alla persona giusta.

### elements.salacontrollo.nome
Sala controllo

### elements.salacontrollo.fabbrica
La sala controllo: una spia per ogni reparto. Verde se lavora, gialla se è in costruzione, rossa se è fermo.

### elements.salacontrollo.perTe
Se un caricamento salta, il team dati lo vede qui prima che tu apra il report: spesso il problema è già risolto quando arrivi.

### elements.contatori.nome
Contatori della centrale

### elements.contatori.fabbrica
I contatori della centrale: più reparti lavorano, più energia si consuma. Qui si vede quanto consuma ciascuno.

### elements.contatori.perTe
Anche la tua officina ha il suo contatore: sapere quanto consuma aiuta a decidere dove vale la pena investire.

### elements.sensori.nome
Sala sensori

### elements.archivio.nome
Ufficio tecnico e archivio

## Legenda: materiali

### materiali.grezzo.nome
Grezzo

### materiali.bronze.nome
Bronze — conservato

### materiali.silver.nome
Silver — pulito

### materiali.gold.nome
Gold — assemblato

### materiali.semilavorato.nome
Semilavorato certificato

### materiali.report.nome
Report — prodotto finito

## Legenda e schede: mezzi di trasporto

### modalita.copy.nome
Camion

### modalita.copy.testo
Il materiale viene caricato su un camion a orari stabiliti e scaricato alla banchina.

### modalita.dataflow.nome
Camion con officina a bordo

### modalita.dataflow.testo
Il materiale viaggia su un camion che lo sistema un po' già durante il viaggio, poi lo scarica alla banchina.

### modalita.mirroring.nome
Condotta continua

### modalita.mirroring.testo
Una copia sempre aggiornata scorre senza sosta in una condotta ed entra direttamente nel magazzino: non passa dalla banchina.

### modalita.shortcut.nome
Ponte di vetro

### modalita.shortcut.testo
Il materiale non si sposta: resta dal fornitore e la fabbrica lo usa attraverso un ponte, senza copiarlo. Non passa dalla banchina.

### modalita.streaming.nome
Nastro veloce

### modalita.streaming.testo
Il materiale arriva in diretta, un pezzo dopo l'altro, alla sala sensori: funziona solo quando il Real-Time è attivo.

## Sorgenti: tipi di fornitore

### categorie.erp.nome
ERP

### categorie.erp.fabbrica
Un grande stabilimento: il fornitore principale, con tanto materiale ben organizzato.

### categorie.erp.perTe
È il gestionale: ordini, fatture, contabilità, acquisti.

### categorie.crm.nome
CRM

### categorie.crm.fabbrica
Un negozio: qui nasce tutto ciò che riguarda il rapporto con i clienti.

### categorie.crm.perTe
È il sistema dove si seguono clienti, contatti, offerte e trattative.

### categorie.pim.nome
PIM

### categorie.pim.fabbrica
La sala cataloghi: schede ordinate di ogni prodotto, con codici, descrizioni e immagini.

### categorie.pim.perTe
È il sistema che tiene le informazioni sui prodotti: codici, caratteristiche, descrizioni, listini.

### categorie.hr.nome
HR

### categorie.hr.fabbrica
Una palazzina di uffici: le informazioni sulle persone dell'azienda.

### categorie.hr.perTe
È il sistema del personale: organico, presenze, paghe. Sono dati delicati, protetti dalle regole su chi vede cosa.

### categorie.mes.nome
Produzione e magazzino

### categorie.mes.fabbrica
Dei silos: materiale già stoccato in modo ordinato, che scorre in continuazione.

### categorie.mes.perTe
Sono i sistemi della produzione e del magazzino: giacenze, lotti, avanzamento degli ordini.

### categorie.ecommerce.nome
E-commerce

### categorie.ecommerce.fabbrica
Un centro pacchi: ordini che arrivano dal negozio online, uno dopo l'altro.

### categorie.ecommerce.perTe
È il negozio online: ordini, carrelli, resi, comportamento dei clienti sul sito.

### categorie.marketing.nome
Marketing

### categorie.marketing.fabbrica
Uno sportello: si chiede e si riceve, un pezzo alla volta.

### categorie.marketing.perTe
Sono i servizi di marketing a cui l'azienda è abbonata: campagne, newsletter, social.

### categorie.excel.nome
Fogli di calcolo

### categorie.excel.fabbrica
Un archivio di scatoloni: materiale sfuso, preparato a mano.

### categorie.excel.perTe
Sono i fogli di calcolo che oggi qualcuno compila e si passa a mano: budget, previsioni, tabelle di appoggio.

### categorie.iot.nome
Sensori

### categorie.iot.fabbrica
Un campo di sensori: il materiale arriva in continuazione, senza pause.

### categorie.iot.perTe
Sono macchine e sensori che mandano segnali in ogni momento.

### categorie.esterni.nome
Dati esterni

### categorie.esterni.fabbrica
Un mercato: materiale che viene da fuori, acquistato o pubblico.

### categorie.esterni.perTe
Sono dati di mercato o dati pubblici che arricchiscono quelli dell'azienda.

### categorie.datalake.nome
Data lake esistente

### categorie.datalake.fabbrica
Un deposito di container: grandi quantità di materiale già raccolto altrove.

### categorie.datalake.perTe
È un archivio dati che l'azienda ha già: si usa così com'è, senza duplicarlo.

## Sorgenti standard: nomi

### sources.src-erp.nome
Gestionale

### sources.src-crm.nome
CRM

### sources.src-pim.nome
Anagrafica prodotti

### sources.src-hr.nome
Sistema del personale

### sources.src-mes.nome
Produzione e magazzino

### sources.src-ecom.nome
Negozio online

### sources.src-mkt.nome
Marketing

### sources.src-excel.nome
Budget e forecast (Excel)

### sources.src-iot.nome
Sensori di impianto

### sources.src-ext.nome
Dati di mercato

### sources.src-lake.nome
Archivio dati esistente

## Officine degli spoke: scheda

### spoke.fabbrica
L'officina della funzione: riceve i semilavorati dall'hub e li personalizza. Accanto c'è il piccolo deposito del materiale proprio.

### spoke.perTe
Semilavorato + dati tuoi = prodotto su misura: parti da dati certificati, aggiungi i tuoi fogli di calcolo e costruisci i report che ti servono.

### spoke.gestoreTesto
I report e i dati locali sono della funzione. Il dato di base, dentro il semilavorato, resta del team dati: per questo è uguale per tutti.

## Spoke standard: nomi

### spokes.0.nome
Finance

### spokes.1.nome
Commerciale

### spokes.2.nome
HR

### spokes.3.nome
Operations

### spokes.4.nome
Marketing

## Team dati: schede e postazioni

### team.trasporto.nome
Team dati — trasporto

### team.trasporto.fabbrica
Portano il materiale dai fornitori alla banchina e dalla banchina al magazzino.

### team.trasporto.perTe
Sono le persone che collegano i tuoi sistemi alla fabbrica e controllano che i carichi arrivino ogni giorno.

### team.trasporto.compiti.0.nome
Dai fornitori alla banchina

### team.trasporto.compiti.1.nome
Dalla banchina al magazzino

### team.rotazione.nome
Team dati — governo, coordinamento e report

### team.rotazione.fabbrica
Si alternano tra tre postazioni: la cabina di controllo (governo della fabbrica), il coordinamento degli operatori e lo showroom, dove nascono i report ufficiali.

### team.rotazione.perTe
Sono poche persone che fanno più mestieri: per questo le richieste si mettono in fila e si pianificano.

### team.rotazione.postazioni.0.nome
Cabina di controllo

### team.rotazione.postazioni.1.nome
Ufficio di coordinamento

### team.rotazione.postazioni.2.nome
Showroom
