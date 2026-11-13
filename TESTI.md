# Testi di Data Platform as a Fabric

> **Come si usa.** Ogni testo ha un titolo con la sua chiave (`### chiave`): si cambia **solo il testo sotto il titolo**, mai la chiave.
> Il testo può andare a capo liberamente: viene unito in un'unica riga. Niente apici o caratteri speciali da rispettare.
> Si modifica anche da GitHub nel browser (matita in alto a destra): al salvataggio la pagina pubblica si aggiorna da sola in un paio di minuti.
> **Nome tecnico**: le chiavi che finiscono con `.tecnico` sono la riga "In Fabric" della scheda: qui (e solo qui) vanno i termini tecnici.
> **Lessico** (REQUISITI §1.2): ammessi report, Power BI, dato certificato, Bronze / Silver / Gold. Gli altri termini tecnici (Lakehouse, pipeline, modello semantico…) vanno tradotti: se ne compare uno, la pagina **non** viene aggiornata e l'azione su GitHub diventa rossa indicando dove.
> Le parole del profilo di un'azienda (nomi degli spoke, delle sorgenti, contatto) non stanno qui: stanno nel profilo.

## Titolo

### meta.titolo
Data Platform as a Fabric

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

### ui.caricaProfilo
Carica profilo

### ui.togliProfilo
Togli profilo

### ui.profiloErrato
Il file scelto non è un profilo valido: deve essere un file JSON con la forma del profilo di esempio.

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

### ui.tecnico
In Fabric

### ui.presentazione
Presentazione

### ui.percorsi
Percorsi

### ui.avanti
Avanti

### ui.indietro
Indietro

### ui.esci
Esci

### ui.tornaQui
Torna qui

### ui.capitolo
Capitolo

### ui.tappa
Tappa

### ui.di
di

### ui.chi
Chi

### ui.tu
Cosa fai tu

### ui.ricorda
Da ricordare

### ui.nessunaTappa
Questo percorso attraversa reparti non ancora accesi.

### ui.aiutoGuida
Avanti: → o spazio · Indietro: ← · Esci: Esc

### ui.aggiungiUomo
Aggiungi una persona (uomo)

### ui.aggiungiDonna
Aggiungi una persona (donna)

### ui.togli
Togli la persona selezionata, o l'ultima

### ui.azzera
Azzera

### ui.azzeraTitolo
Torna al team di partenza

### ui.ruolo
Ruolo

### ui.compiti
Di cosa si occupa

### ui.assegna
Assegna a

### ui.trascina
Trascina una persona su un workload per assegnarla

### ui.teamVuoto
Aggiungi le persone con +

### ui.senzaCompito
Non ha ancora un compito: aspetta alla macchinetta del caffè.

### ui.scoperto
Nessuno se ne occupa

### ui.inAttesa
in attesa: workload spento

### ui.benvenutoTitolo
La fabbrica dei dati

### ui.esplora
Esplora liberamente

### ui.menu
Pannello

### ui.benvenuto1
I numeri che leggi nei report non nascono nei report: nascono nei sistemi che usi ogni giorno e fanno un viaggio, come in una fabbrica.

### ui.benvenuto2
Qui vedi quel viaggio: i fornitori, il lago dove arriva il materiale, i reparti che lo lavorano, i semilavorati certificati e i negozi delle funzioni.

### ui.benvenuto3
Puoi seguire la presentazione, un capitolo alla volta, oppure esplorare da solo: accendi i reparti dal pannello e clicca su ciò che vedi.

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
Data Architecture

### workloads.ARC.tecnico
Fabric capacity · OneLake · workspace

### workloads.ARC.fabbrica
Il terreno, le fondamenta e il capannone: lo spazio in cui tutto il resto viene costruito, con la centrale che dà energia e il lago dei dati, unico, tra i fornitori e la fabbrica.

### workloads.ARC.perTe
È la base comune: un solo posto per i dati di tutta l'azienda, invece di tanti archivi sparsi. Senza questa base, ogni funzione ricomincia da zero.

### workloads.PMO.nome
Project Management

### workloads.PMO.tecnico
Coordinamento del team dati: pianificazione e priorità

### workloads.PMO.fabbrica
L'ufficio di coordinamento: da qui si coordinano tutti gli operatori della fabbrica, si mettono in fila le richieste e si decide cosa viene prima.

### workloads.PMO.perTe
Quando chiedi qualcosa, è qui che la richiesta trova posto nel piano di lavoro, un responsabile e una data.

### workloads.ACC.nome
Accessi

### workloads.ACC.tecnico
Microsoft Entra ID · ruoli di workspace · permessi sugli item

### workloads.ACC.fabbrica
Cancelli, tornelli e badge: si entra solo se autorizzati, e ognuno va solo nei reparti che gli servono.

### workloads.ACC.perTe
Decidi tu chi della tua funzione entra e cosa può fare. Chiedere un accesso è come chiedere un badge.

### workloads.SEC.nome
Security

### workloads.SEC.tecnico
RLS / OLS · sensitivity label · OneLake security

### workloads.SEC.fabbrica
Recinzione, telecamere, caveau e sigilli sui pacchi: proteggono il materiale prezioso.

### workloads.SEC.perTe
I dati riservati li vede solo chi deve: le regole su chi vede cosa viaggiano insieme al dato, anche dentro i tuoi report.

### workloads.SRC.nome
Data Sources

### workloads.SRC.tecnico
Sistemi sorgente · on-premises data gateway

### workloads.SRC.fabbrica
L'area dei fornitori: i sistemi dell'azienda da cui parte il materiale grezzo. Ogni tipo di software ha un edificio diverso, e si possono accendere uno alla volta.

### workloads.SRC.perTe
Sono i sistemi che usi ogni giorno: gestionale, CRM, fogli di calcolo. Esistono anche senza la fabbrica, e tu continui a lavorare lì.

### workloads.INT.nome
Data Integration

### workloads.INT.tecnico
Data Factory: Data pipeline, Copy job, Dataflow Gen2, Shortcut

### workloads.INT.fabbrica
I fornitori fanno arrivare il materiale nel lago dei dati con scivoli e scialuppe; il team dati lo pesca e lo porta nel magazzino materie prime (Bronze), dove viene conservato così com'è.

### workloads.INT.perTe
I dati dei sistemi che usi ogni giorno arrivano qui da soli, a orari stabiliti: nessuno deve più estrarli a mano.

### workloads.TRF.nome
Data Transformation

### workloads.TRF.tecnico
Warehouse Silver e Gold · Semantic model

### workloads.TRF.fabbrica
Il materiale viene pulito e controllato (Silver), assemblato in componenti (Gold) e confezionato in semilavorati con il marchio di qualità.

### workloads.TRF.perTe
Ricevi dati già puliti e con i calcoli già pronti: non devi più sistemarli a mano prima di usarli.

### workloads.VIS.nome
Data Visualization

### workloads.VIS.tecnico
Power BI: report e app istituzionali

### workloads.VIS.fabbrica
Lo showroom: i prodotti finiti ufficiali dell'azienda, uguali per tutti.

### workloads.VIS.perTe
Sono i report ufficiali, in Power BI: gli stessi numeri per tutta l'azienda, da consultare senza costruire nulla.

### workloads.SSR.nome
Self-service (spoke)

### workloads.SSR.tecnico
Workspace di dominio · report self-service · composite model

### workloads.SSR.fabbrica
I negozi delle funzioni: ricevono i semilavorati e li personalizzano, aggiungendo se serve il proprio materiale.

### workloads.SSR.perTe
È il tuo negozio: parti da dati certificati e costruisci i report che servono alla tua funzione, senza aspettare nessuno.

### workloads.GOV.nome
Data Governance

### workloads.GOV.tecnico
Microsoft Purview · domini · endorsement · Monitoring hub

### workloads.GOV.fabbrica
La torre di controllo e la sala controllo: fissano le regole comuni, sorvegliano che ogni reparto lavori e mettono il marchio di qualità sui prodotti controllati. Qui c'è anche lo sportello a cui rivolgersi.

### workloads.GOV.perTe
Quando vedi il marchio "dato certificato" sai che quel numero è lo stesso per tutti. Se un caricamento salta, il team dati lo sa prima di te. E sai sempre a chi chiedere.

### workloads.FIN.nome
Monitoraggio costi

### workloads.FIN.tecnico
Capacity Metrics app · chargeback

### workloads.FIN.fabbrica
I contatori della centrale: misurano quanta energia consuma ogni reparto e ogni negozio.

### workloads.FIN.perTe
La fabbrica ha un costo, e si può vedere quanto consuma ogni funzione: aiuta a decidere dove investire.

### workloads.RTI.nome
Real-Time

### workloads.RTI.tecnico
Real-Time Intelligence: Eventstream, Eventhouse, Activator

### workloads.RTI.fabbrica
La sala sensori: lavora il materiale in diretta, nel momento in cui arriva, senza passare dal magazzino.

### workloads.RTI.perTe
Serve quando non puoi aspettare domani: vedere cosa succede adesso e ricevere un avviso appena qualcosa cambia.

### workloads.KNW.nome
Knowledge

### workloads.KNW.tecnico
Ontology (Fabric IQ)

### workloads.KNW.fabbrica
L'ufficio tecnico e l'archivio dei progetti: la mappa di cosa sono le cose dell'azienda e di come sono collegate.

### workloads.KNW.perTe
Mette tutti d'accordo sul significato delle parole ("cliente", "ordine", "margine") e permette di fare domande ai dati nel linguaggio di tutti i giorni.

## Elementi della scena: etichette e schede

### elements.capannone.nome
Capannone dell'hub

### elements.capannone.tecnico
Tenant · workspace dell'hub

### elements.capannone.fabbrica
Fondamenta, pavimento e struttura del capannone. Dentro prenderanno posto i reparti.

### elements.capannone.perTe
È lo spazio comune, già pronto: quando la tua funzione avrà bisogno di qualcosa, non si parte dal terreno vuoto.

### elements.lago.nome
Lago dei dati

### elements.lago.tecnico
OneLake (Landing: file in un Lakehouse)

### elements.lago.fabbrica
Il lago dei dati: un'unica riserva tra i fornitori e la fabbrica. Il materiale di tutti i fornitori arriva qui così com'è, prima di essere pescato e portato nel magazzino.

### elements.lago.perTe
Un solo posto dove arrivano i dati di tutti i sistemi: niente copie sparse, e si può sempre tornare a vedere il dato com'era all'origine.

### elements.centrale.nome
Centrale elettrica

### elements.centrale.tecnico
Fabric capacity

### elements.centrale.fabbrica
La centrale dà energia a tutti i reparti. Se un reparto ne consuma troppa, gli altri rallentano.

### elements.centrale.perTe
L'energia della fabbrica ha un costo ed è condivisa: per questo si pianifica chi consuma cosa.

### elements.laboratorio.nome
Laboratorio prove

### elements.laboratorio.tecnico
Workspace Dev e Test · deployment pipeline

### elements.laboratorio.fabbrica
Il laboratorio prove: ogni semilavorato viene collaudato qui prima di uscire dalla fabbrica, e ogni modifica si prova qui prima di entrare in produzione.

### elements.laboratorio.perTe
Quello che ricevi è già stato provato. E quando chiedi una modifica, la provi insieme al team dati prima che arrivi a tutti: niente sorprese nei report.

### elements.fornitori.nome
Area fornitori

### elements.fornitori.tecnico
Sistemi sorgente

### elements.fornitori.fabbrica
L'area dei fornitori: i sistemi dell'azienda da cui parte il materiale grezzo. Ogni tipo di fornitore ha un edificio diverso.

### elements.fornitori.perTe
Sono i sistemi che usi ogni giorno: gestionale, CRM, fogli di calcolo. Tu continui a lavorare lì, il materiale parte da solo.

### elements.pontile.nome
Pontile di pesca

### elements.pontile.tecnico
Data pipeline di caricamento nel Bronze

### elements.pontile.fabbrica
Il pontile sulla riva del lago: da un pannello di comando il team dati manovra le gru, che pescano il materiale arrivato dai fornitori e lo mettono sui nastri verso il magazzino materie prime.

### elements.pontile.perTe
È il passaggio dal "dato arrivato" al "dato conservato": da qui in poi il materiale è in fabbrica, etichettato e pronto per la lavorazione.

### elements.bronze.nome
Magazzino materie prime (Bronze)

### elements.bronze.tecnico
Warehouse Bronze

### elements.bronze.fabbrica
Il magazzino materie prime: il materiale viene messo a scaffale con l'etichetta di arrivo e conservato, ancora grezzo.

### elements.bronze.perTe
Tutto ciò che arriva resta conservato con la sua data: si può sempre tornare a vedere com'era il dato in origine.

### elements.silver.nome
Reparto lavorazione (Silver)

### elements.silver.tecnico
Warehouse Silver

### elements.silver.fabbrica
Il reparto lavorazione: il materiale viene pulito, controllato e portato a misura. Qui nasce la qualità.

### elements.silver.perTe
Doppioni, errori di battitura, codici diversi per la stessa cosa: vengono sistemati qui, una volta per tutti.

### elements.gold.nome
Linea di assemblaggio (Gold)

### elements.gold.tecnico
Warehouse Gold (modello a stella)

### elements.gold.fabbrica
La linea di assemblaggio: i pezzi puliti vengono montati in componenti pensati per il business (vendite, clienti, costi).

### elements.gold.perTe
I dati di sistemi diversi vengono messi insieme: finalmente il cliente del CRM e quello del gestionale sono la stessa cosa.

### elements.confezionamento.nome
Confezionamento semilavorati

### elements.confezionamento.tecnico
Semantic model

### elements.confezionamento.fabbrica
Il confezionamento: i componenti diventano semilavorati, con le istruzioni dentro e il marchio di qualità sopra.

### elements.confezionamento.perTe
Il semilavorato è un dato certificato, con i calcoli già pronti: lo stesso per tutti, pronto per costruirci i report.

### elements.spedizioni.nome
Spedizioni

### elements.spedizioni.tecnico
Condivisione dei Semantic model (permesso Build)

### elements.spedizioni.fabbrica
Il reparto spedizioni: da qui i semilavorati collaudati partono verso i negozi delle funzioni.

### elements.spedizioni.perTe
È da qui che i dati certificati arrivano alla tua funzione.

### elements.showroom.nome
Showroom

### elements.showroom.tecnico
Report e app Power BI

### elements.showroom.fabbrica
Lo showroom dell'hub, appena fuori dalla fabbrica e aperto a chi entra dall'ingresso clienti: i prodotti finiti ufficiali, costruiti dal team dati sui semilavorati collaudati e uguali per tutta l'azienda.

### elements.showroom.perTe
Sono i report ufficiali, in Power BI: li apri e leggi il numero, senza costruire nulla. È lo stesso numero che vedono tutti.

### elements.coordinamento.nome
Ufficio di coordinamento

### elements.coordinamento.tecnico
Project management del team dati

### elements.coordinamento.fabbrica
L'ufficio da cui si coordinano tutti gli operatori della fabbrica: chi fa cosa, in che ordine, entro quando.

### elements.coordinamento.perTe
Quando chiedi qualcosa, è qui che la richiesta trova posto nel piano di lavoro e un responsabile.

### elements.cancelli.nome
Cancelli e tornelli

### elements.cancelli.tecnico
Microsoft Entra ID · ruoli e permessi

### elements.cancelli.fabbrica
Il cancello della fabbrica, con i tornelli e il lettore di badge: oltre questo punto va solo il team dati, e ognuno raggiunge solo i reparti che gli servono. Da qui escono i semilavorati verso i negozi.

### elements.cancelli.perTe
Per far entrare una persona della tua funzione si chiede un badge: decidi tu chi entra e che cosa può fare.

### elements.ingresso.nome
Ingresso clienti

### elements.ingresso.tecnico
Accesso con l'account aziendale (Microsoft Entra ID)

### elements.ingresso.fabbrica
L'ingresso clienti: chi fa parte dell'azienda passa il badge ai tornelli e raggiunge lo showroom e i negozi. Nella fabbrica, oltre il cancello interno, entra solo il team dati.

### elements.ingresso.perTe
Entri con il tuo account aziendale: guardi i report ufficiali nello showroom e quelli della tua funzione nel tuo negozio. Non ti serve entrare in fabbrica.

### elements.recinzione.nome
Recinzione e telecamere

### elements.recinzione.tecnico
Sicurezza di rete · audit degli accessi

### elements.recinzione.fabbrica
Le due cinte, con le telecamere. Quella esterna racchiude tutto e tiene fuori chi non è dell'azienda: si entra dall'ingresso clienti. Quella interna protegge la fabbrica: oltre il cancello va solo il team dati. Chi passa viene registrato.

### elements.recinzione.perTe
I dati della tua funzione sono protetti come quelli di tutte le altre: si sa sempre chi ha guardato cosa.

### elements.caveau.nome
Caveau

### elements.caveau.tecnico
RLS / OLS · sensitivity label

### elements.caveau.fabbrica
Il caveau: il materiale più delicato sta qui, sotto chiave.

### elements.caveau.perTe
I dati riservati (stipendi, dati personali) li vede solo chi deve: le regole su chi vede cosa valgono anche dentro i tuoi report.

### elements.torre.nome
Torre di controllo

### elements.torre.tecnico
Microsoft Purview · domini · endorsement (certificazione)

### elements.torre.fabbrica
La torre di controllo: da qui si governa la fabbrica, si fissano le regole comuni e si mette il marchio di qualità sui prodotti controllati.

### elements.torre.perTe
Il marchio "dato certificato" nasce qui: quando lo vedi, quel numero è lo stesso per tutta l'azienda.

### elements.sportello.nome
Sportello dell'hub

### elements.sportello.tecnico
Center of Excellence (CoE)

### elements.sportello.fabbrica
Lo sportello dell'hub: il punto in cui le funzioni incontrano il team dati per chiedere, segnalare un problema o aprire il proprio negozio.

### elements.sportello.perTe
Non devi sapere a quale reparto rivolgerti: vieni qui, e la tua richiesta arriva alla persona giusta.

### elements.salacontrollo.nome
Sala controllo

### elements.salacontrollo.tecnico
Monitoring hub · alert

### elements.salacontrollo.fabbrica
La sala controllo: una spia per ogni reparto. Verde se lavora, gialla se è in costruzione, rossa se è fermo.

### elements.salacontrollo.perTe
Se un caricamento salta, il team dati lo vede qui prima che tu apra il report: spesso il problema è già risolto quando arrivi.

### elements.contatori.nome
Contatori della centrale

### elements.contatori.tecnico
Capacity Metrics app

### elements.contatori.fabbrica
I contatori della centrale: più reparti lavorano, più energia si consuma. Qui si vede quanto consuma ciascuno.

### elements.contatori.perTe
Anche il tuo negozio ha il suo contatore: sapere quanto consuma aiuta a decidere dove vale la pena investire.

### elements.sensori.nome
Sala sensori

### elements.sensori.tecnico
Eventstream · Eventhouse · Activator

### elements.sensori.fabbrica
La sala sensori: il materiale dei sensori arriva sul nastro veloce e viene guardato subito, sul grande schermo, senza passare dal lago e dal magazzino.

### elements.sensori.perTe
Vedi cosa sta succedendo in questo momento, e puoi farti avvisare appena un valore esce dalla norma.

### elements.archivio.nome
Ufficio tecnico e archivio

### elements.archivio.tecnico
Ontology (Fabric IQ)

### elements.archivio.fabbrica
L'ufficio tecnico: sul tetto, la mappa di come le cose dell'azienda sono collegate tra loro. I fili d'oro la legano alla linea di assemblaggio e ai semilavorati.

### elements.archivio.perTe
Cliente, ordine, margine: qui si scrive una volta per tutte cosa significano, così tutti parlano la stessa lingua e si possono fare domande ai dati con parole semplici.

## Legenda: materiali

### materiali.grezzo.nome
Grezzo

### materiali.grezzo.tecnico
Dati grezzi (file in OneLake)

### materiali.bronze.nome
Bronze — conservato

### materiali.bronze.tecnico
Layer Bronze

### materiali.silver.nome
Silver — pulito

### materiali.silver.tecnico
Layer Silver

### materiali.gold.nome
Gold — assemblato

### materiali.gold.tecnico
Layer Gold

### materiali.semilavorato.nome
Semilavorato certificato

### materiali.semilavorato.tecnico
Semantic model certificato

### materiali.report.nome
Report — prodotto finito

### materiali.report.tecnico
Report Power BI

## Legenda e schede: mezzi di trasporto

### modalita.copy.nome
Scivolo

### modalita.copy.tecnico
Data pipeline / Copy job

### modalita.copy.testo
A orari stabiliti il materiale scivola dal fornitore nel lago dei dati; da lì il team dati lo pesca e lo porta nel magazzino.

### modalita.dataflow.nome
Scialuppa

### modalita.dataflow.tecnico
Dataflow Gen2

### modalita.dataflow.testo
Il materiale scende su una scialuppa che lo sistema un po' già durante il viaggio, attraversa il lago e lo lascia al pontile.

### modalita.mirroring.nome
Scivolo di vetro

### modalita.mirroring.tecnico
Mirroring

### modalita.mirroring.testo
Una copia sempre aggiornata: il materiale scende senza sosta nel lago da uno scivolo di vetro, appena cambia nel sistema d'origine.

### modalita.shortcut.nome
Ponte di vetro

### modalita.shortcut.tecnico
Shortcut di OneLake

### modalita.shortcut.testo
Il materiale non si sposta: resta dal fornitore, e attraverso un ponte di vetro compare nel lago senza essere copiato. Da lì il team dati lo recupera come il resto.

### modalita.streaming.nome
Nastro veloce

### modalita.streaming.tecnico
Eventstream

### modalita.streaming.testo
Il materiale arriva in diretta, un pezzo dopo l'altro, alla sala sensori: funziona solo quando il Real-Time è attivo.

## Sorgenti: tipi di fornitore

### categorie.erp.nome
ERP

### categorie.erp.tecnico
Enterprise Resource Planning

### categorie.erp.fabbrica
Un grande stabilimento: il fornitore principale, con tanto materiale ben organizzato.

### categorie.erp.perTe
È il gestionale: ordini, fatture, contabilità, acquisti.

### categorie.crm.nome
CRM

### categorie.crm.tecnico
Customer Relationship Management

### categorie.crm.fabbrica
Un'agenzia commerciale: qui nasce tutto ciò che riguarda il rapporto con i clienti.

### categorie.crm.perTe
È il sistema dove si seguono clienti, contatti, offerte e trattative.

### categorie.pim.nome
PIM

### categorie.pim.tecnico
Product Information Management

### categorie.pim.fabbrica
La sala cataloghi: schede ordinate di ogni prodotto, con codici, descrizioni e immagini.

### categorie.pim.perTe
È il sistema che tiene le informazioni sui prodotti: codici, caratteristiche, descrizioni, listini.

### categorie.hr.nome
HR

### categorie.hr.tecnico
Human Capital Management

### categorie.hr.fabbrica
Una palazzina di uffici: le informazioni sulle persone dell'azienda.

### categorie.hr.perTe
È il sistema del personale: organico, presenze, paghe. Sono dati delicati, protetti dalle regole su chi vede cosa.

### categorie.mes.nome
Produzione e magazzino

### categorie.mes.tecnico
MES / WMS

### categorie.mes.fabbrica
Dei silos: materiale già stoccato in modo ordinato, pronto da prelevare.

### categorie.mes.perTe
Sono i sistemi della produzione e del magazzino: giacenze, lotti, avanzamento degli ordini.

### categorie.ecommerce.nome
E-commerce

### categorie.ecommerce.tecnico
Piattaforma e-commerce

### categorie.ecommerce.fabbrica
Un centro pacchi: ordini che arrivano dal negozio online, uno dopo l'altro.

### categorie.ecommerce.perTe
È il negozio online: ordini, carrelli, resi, comportamento dei clienti sul sito.

### categorie.marketing.nome
Marketing

### categorie.marketing.tecnico
Marketing automation (API)

### categorie.marketing.fabbrica
Uno sportello: si chiede e si riceve, un pezzo alla volta.

### categorie.marketing.perTe
Sono i servizi di marketing a cui l'azienda è abbonata: campagne, newsletter, social.

### categorie.excel.nome
Fogli di calcolo

### categorie.excel.tecnico
File Excel / CSV

### categorie.excel.fabbrica
Un archivio di scatoloni: materiale sfuso, preparato a mano.

### categorie.excel.perTe
Sono i fogli di calcolo che oggi qualcuno compila e si passa a mano: budget, previsioni, tabelle di appoggio.

### categorie.iot.nome
Sensori

### categorie.iot.tecnico
Dispositivi IoT

### categorie.iot.fabbrica
Un campo di sensori: il materiale arriva in continuazione, senza pause.

### categorie.iot.perTe
Sono macchine e sensori che mandano segnali in ogni momento.

### categorie.esterni.nome
Dati esterni

### categorie.esterni.tecnico
Dati esterni / open data

### categorie.esterni.fabbrica
Un mercato: materiale che viene da fuori, acquistato o pubblico.

### categorie.esterni.perTe
Sono dati di mercato o dati pubblici che arricchiscono quelli dell'azienda.

### categorie.datalake.nome
Data lake esistente

### categorie.datalake.tecnico
Data lake esterno (ADLS, S3)

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
Il negozio della funzione: riceve i semilavorati dalla fabbrica e ne fa prodotti su misura per i propri clienti, che mette in vetrina. Sul retro c'è il piccolo deposito del materiale proprio.

### spoke.perTe
Semilavorato + dati tuoi = prodotto su misura: parti da dati certificati, aggiungi i tuoi fogli di calcolo e metti in vetrina i report che servono alla tua funzione.

### spoke.gestoreTesto
I report e i dati locali sono della funzione. Il dato di base, dentro il semilavorato, resta del team dati: per questo è uguale per tutti.

### spoke.tecnico
Workspace di dominio · composite model

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

### team.nome
Persona del team dati

### team.perTe
Il team dati è fatto di poche persone, di IT e di business, e ognuna segue più cose: per questo le richieste si mettono in fila e si pianificano.

### team.raccolta.nome
Macchinetta del caffè

### team.postazioni.ARC.nome
Tavolo dei progetti

### team.postazioni.ARC.tecnico
Data architect

### team.postazioni.ARC.cosa
Progetta la fabbrica: dove vanno i reparti, quanta energia serve, come si collegano.

### team.postazioni.PMO.nome
Ufficio di coordinamento

### team.postazioni.PMO.tecnico
Project manager

### team.postazioni.PMO.cosa
Coordina gli operatori: chi fa cosa, in che ordine, entro quando.

### team.postazioni.INT.nome
Scivoli e gru

### team.postazioni.INT.tecnico
Data engineer

### team.postazioni.INT.cosa
Il primo costruisce e ripara gli scivoli; il secondo manovra dal pannello le gru che pescano dal lago e riempiono il magazzino.

### team.postazioni.TRF.nome
Banchi del laboratorio prove

### team.postazioni.TRF.tecnico
Analytics engineer

### team.postazioni.TRF.cosa
Costruisce la lavorazione e collauda i semilavorati prima che escano.

### team.postazioni.SEC.nome
Caveau

### team.postazioni.SEC.tecnico
Responsabile della sicurezza dei dati

### team.postazioni.SEC.cosa
Decide come si protegge il materiale riservato e controlla chi lo ha guardato.

### team.postazioni.ACC.nome
Portineria del cancello

### team.postazioni.ACC.tecnico
Amministratore degli accessi

### team.postazioni.ACC.cosa
Consegna i badge: chi entra e che cosa può fare.

### team.postazioni.VIS.nome
Showroom

### team.postazioni.VIS.tecnico
BI developer

### team.postazioni.VIS.cosa
Costruisce i report ufficiali sui semilavorati collaudati.

### team.postazioni.SSR.nome
In un negozio

### team.postazioni.SSR.tecnico
Analista della funzione

### team.postazioni.SSR.cosa
Costruisce i report della funzione sui semilavorati, con i dati locali.

### team.postazioni.GOV.nome
Cabina della torre di controllo

### team.postazioni.GOV.tecnico
Data steward

### team.postazioni.GOV.cosa
Fissa le regole comuni, sorveglia i reparti e mette il marchio di qualità.

### team.postazioni.FIN.nome
Contatori della centrale

### team.postazioni.FIN.tecnico
Responsabile dei costi

### team.postazioni.FIN.cosa
Legge i consumi e li riporta a ogni reparto e a ogni negozio.

### team.postazioni.KNW.nome
Ufficio tecnico

### team.postazioni.KNW.tecnico
Responsabile del glossario

### team.postazioni.KNW.cosa
Tiene la mappa di cosa significano le parole dell'azienda e di come sono collegate.

### team.postazioni.RTI.nome
Sala sensori

### team.postazioni.RTI.tecnico
Analista dei dati in diretta

### team.postazioni.RTI.cosa
Sorveglia i segnali in arrivo e imposta gli avvisi.

## Narrativa: i capitoli della presentazione

### chapters.inizio.titolo
Il punto di partenza

### chapters.inizio.testo
Oggi ogni funzione lavora nei propri sistemi e i numeri si passano a mano, tra fogli di calcolo e mail. Qui c'è un terreno vuoto: costruiamo insieme la fabbrica dei dati, un pezzo alla volta.

### chapters.sorgenti.titolo
I fornitori: i sistemi che usate ogni giorno

### chapters.sorgenti.testo
Gestionale, CRM, fogli di calcolo: il dato nasce qui, nel lavoro di tutti i giorni. Ogni sistema è un fornitore di materia prima, e resta dov'è: voi continuate a lavorarci come sempre.

### chapters.architettura.titolo
Data Architecture: le fondamenta

### chapters.architettura.testo
Prima si costruisce lo spazio comune: il capannone, la centrale che dà energia e il lago dei dati, un solo posto dove arriverà il materiale di tutti i fornitori.

### chapters.coordinamento.titolo
Project Management: chi fa cosa

### chapters.coordinamento.testo
Il team dati è fatto di poche persone e le richieste sono tante. Dall'ufficio di coordinamento si decide cosa viene prima e si dà a ogni richiesta un responsabile e una data.

### chapters.integrazione.titolo
Data Integration: il materiale arriva in fabbrica

### chapters.integrazione.testo
Dai fornitori il materiale scivola nel lago a orari stabiliti: per questo un dato di oggi può arrivare domani. Il team dati lo pesca e lo mette nel magazzino materie prime, così com'è. Nessuno deve più estrarre dati a mano.

### chapters.trasformazione.titolo
Data Transformation: dal grezzo al semilavorato

### chapters.trasformazione.testo
Il materiale viene pulito, assemblato e confezionato in semilavorati: dati certificati, con i calcoli già pronti. Ogni semilavorato passa dal laboratorio prove prima di uscire dalla fabbrica.

### chapters.sicurezza.titolo
Security: proteggere ciò che vale

### chapters.sicurezza.testo
Due cinte, telecamere e caveau: da fuori non entra nessuno, i dati riservati li vede solo chi deve, e si sa sempre chi ha guardato cosa.

### chapters.accessi.titolo
Accessi: chi entra e cosa può fare

### chapters.accessi.testo
Si entra con il badge. Dall'ingresso clienti chi fa parte dell'azienda raggiunge lo showroom e il proprio negozio; oltre il cancello della fabbrica va solo il team dati. Ogni funzione decide chi dei suoi entra, e ognuno raggiunge solo ciò che gli serve.

### chapters.visualizzazione.titolo
Data Visualization: i report ufficiali

### chapters.visualizzazione.testo
Nello showroom, aperto a tutta l'azienda, nascono i report ufficiali, in Power BI, costruiti sui semilavorati collaudati: gli stessi numeri per tutta l'azienda.

### chapters.negozi.titolo
Self-service: i negozi delle funzioni

### chapters.negozi.testo
Ogni funzione riceve i semilavorati e ci costruisce i propri report, aggiungendo se serve i propri dati. Non si parte da zero e non si aspetta nessuno.

### chapters.governance.titolo
Data Governance: regole, qualità, sportello

### chapters.governance.testo
La torre fissa le regole comuni e mette il marchio di qualità. La sala controllo sorveglia che ogni reparto lavori. Allo sportello si chiede, si segnala un problema, si porta una nuova esigenza.

### chapters.costi.titolo
Monitoraggio costi: quanto consuma la fabbrica

### chapters.costi.testo
La fabbrica ha un costo, e i contatori mostrano quanto consuma ogni reparto e ogni negozio: serve a decidere dove vale la pena investire.

### chapters.conoscenza.titolo
Knowledge: parlare la stessa lingua

### chapters.conoscenza.testo
L'ufficio tecnico tiene la mappa di cosa sono le cose dell'azienda e di come sono collegate: mette tutti d'accordo sul significato delle parole e permette di fare domande ai dati nel linguaggio di tutti i giorni.

### chapters.tempo-reale.titolo
Real-Time: quando non si può aspettare domani

### chapters.tempo-reale.testo
Alcuni segnali vanno visti subito. Il nastro veloce porta il materiale dai sensori alla sala sensori nel momento in cui nasce, senza passare dal lago e dal magazzino.

## Percorsi: tappe e messaggi

### paths.incidente.sottotitolo
Incident

### paths.incidente.titolo
Il numero nel mio report è sbagliato

### paths.incidente.messaggio
Non devi sapere dove sta il problema: lo segnali allo sportello e il team dati risale la filiera per te.

### paths.incidente.tappe.0.chi
La funzione

### paths.incidente.tappe.0.cosa
Nel report della funzione un numero non torna, o non si è aggiornato.

### paths.incidente.tappe.0.tu
Ti accorgi del problema e non provi a sistemarlo a mano.

### paths.incidente.tappe.1.chi
La funzione e il team dati

### paths.incidente.tappe.1.cosa
La segnalazione arriva allo sportello dell'hub.

### paths.incidente.tappe.1.tu
Segnali quale report, quale numero e da quando.

### paths.incidente.tappe.2.chi
Il team dati

### paths.incidente.tappe.2.cosa
In sala controllo si guarda se qualche reparto si è fermato: una spia rossa dice già dove cercare.

### paths.incidente.tappe.3.chi
Il team dati

### paths.incidente.tappe.3.cosa
Si controlla il semilavorato: il calcolo è quello giusto?

### paths.incidente.tappe.4.chi
Il team dati

### paths.incidente.tappe.4.cosa
Si risale la filiera, un reparto alla volta: i componenti sono stati assemblati bene?

### paths.incidente.tappe.5.chi
Il team dati

### paths.incidente.tappe.5.cosa
Ancora più a monte: la pulizia ha scartato o corretto qualcosa che non doveva?

### paths.incidente.tappe.6.chi
Il team dati

### paths.incidente.tappe.6.cosa
Nel magazzino si guarda il materiale così com'era arrivato: l'errore c'era già?

### paths.incidente.tappe.7.chi
Il team dati

### paths.incidente.tappe.7.cosa
Si trova la causa: un carico non è arrivato nel lago, oppure il dato era sbagliato già dal fornitore.

### paths.incidente.tappe.8.chi
Il team dati

### paths.incidente.tappe.8.cosa
Corretta la causa, il materiale ripercorre la filiera e il semilavorato viene collaudato di nuovo.

### paths.incidente.tappe.9.chi
La funzione

### paths.incidente.tappe.9.cosa
Il report torna corretto e la funzione viene avvisata.

### paths.incidente.tappe.9.tu
Controlli che il numero ora torni.

### paths.richiesta.sottotitolo
Change request

### paths.richiesta.titolo
Mi serve un nuovo indicatore

### paths.richiesta.messaggio
Quello che serve a tutti entra nel semilavorato; quello che serve solo a te lo costruisci nel tuo negozio.

### paths.richiesta.tappe.0.chi
La funzione

### paths.richiesta.tappe.0.cosa
Alla funzione serve un indicatore nuovo, o un'informazione in più.

### paths.richiesta.tappe.0.tu
Descrivi cosa ti serve e per quale decisione.

### paths.richiesta.tappe.1.chi
Il team dati con la funzione

### paths.richiesta.tappe.1.cosa
Allo sportello si capisce: esiste già? Serve a tutti o solo a questa funzione? Se serve solo a te, lo costruisci nel tuo negozio, con il nostro aiuto.

### paths.richiesta.tappe.1.tu
Porti la richiesta allo sportello.

### paths.richiesta.tappe.2.chi
Il team dati

### paths.richiesta.tappe.2.cosa
La richiesta entra nel piano di lavoro: ha un responsabile e una data.

### paths.richiesta.tappe.3.chi
Il team dati

### paths.richiesta.tappe.3.cosa
Si modifica la lavorazione: il nuovo calcolo entra nei componenti.

### paths.richiesta.tappe.4.chi
Il team dati

### paths.richiesta.tappe.4.cosa
Il semilavorato viene aggiornato con il nuovo indicatore.

### paths.richiesta.tappe.5.chi
Il team dati con la funzione

### paths.richiesta.tappe.5.cosa
In laboratorio la modifica si prova prima che arrivi a tutti.

### paths.richiesta.tappe.5.tu
Provi il nuovo indicatore e confermi che è quello che ti serviva.

### paths.richiesta.tappe.6.chi
Il team dati

### paths.richiesta.tappe.6.cosa
Il semilavorato aggiornato riceve il marchio di qualità.

### paths.richiesta.tappe.7.chi
Il team dati

### paths.richiesta.tappe.7.cosa
Il semilavorato aggiornato parte verso tutti i negozi.

### paths.richiesta.tappe.8.chi
La funzione

### paths.richiesta.tappe.8.cosa
L'indicatore è disponibile: per la tua funzione e per tutte le altre.

### paths.richiesta.tappe.8.tu
Lo usi nei tuoi report.

### paths.progetto.sottotitolo
New project · il viaggio del dato

### paths.progetto.titolo
Vogliamo analizzare un'area nuova

### paths.progetto.messaggio
Ogni numero che leggi ha fatto questo viaggio, con un controllo a ogni reparto: per questo ti puoi fidare. E un'area nuova non è un report nuovo: è una nuova linea della fabbrica, che poi serve a tutti.

### paths.progetto.tappe.0.chi
La funzione

### paths.progetto.tappe.0.cosa
Il dato nasce in un sistema che la funzione usa ogni giorno: è lì il nuovo fornitore da collegare.

### paths.progetto.tappe.0.tu
Indichi il sistema e chi lo conosce bene.

### paths.progetto.tappe.1.chi
Il team dati

### paths.progetto.tappe.1.cosa
Si costruisce lo scivolo: da ora il materiale scende nel lago a orari stabiliti. Per questo un dato di oggi può arrivare domani.

### paths.progetto.tappe.2.chi
Il team dati

### paths.progetto.tappe.2.cosa
Il materiale viene pescato e messo nel magazzino, così com'è, con la data di arrivo.

### paths.progetto.tappe.3.chi
Il team dati

### paths.progetto.tappe.3.cosa
Viene pulito e controllato: qui nasce la qualità.

### paths.progetto.tappe.4.chi
Il team dati con la funzione

### paths.progetto.tappe.4.cosa
Viene assemblato con il materiale degli altri fornitori, secondo le regole della funzione.

### paths.progetto.tappe.4.tu
Spieghi come si calcolano i tuoi numeri.

### paths.progetto.tappe.5.chi
Il team dati

### paths.progetto.tappe.5.cosa
Nasce un nuovo semilavorato, collaudato in laboratorio e certificato.

### paths.progetto.tappe.6.chi
Il team dati

### paths.progetto.tappe.6.cosa
Sul semilavorato nascono i report: il manager legge il numero, e dietro quel numero c'è tutto il viaggio appena visto.

### paths.progetto.tappe.6.tu
Leggi il numero e decidi.

### paths.ingresso.sottotitolo
Onboarding

### paths.ingresso.titolo
Come entra la mia funzione nella fabbrica?

### paths.ingresso.messaggio
Non parti da zero: ricevi semilavorati già controllati e ci costruisci sopra quello che ti serve.

### paths.ingresso.tappe.0.chi
La funzione

### paths.ingresso.tappe.0.cosa
La funzione si presenta allo sportello dell'hub.

### paths.ingresso.tappe.0.tu
Racconti cosa vorresti capire dai tuoi dati.

### paths.ingresso.tappe.1.chi
Il team dati

### paths.ingresso.tappe.1.cosa
L'ingresso della funzione entra nel piano di lavoro.

### paths.ingresso.tappe.2.chi
Il team dati

### paths.ingresso.tappe.2.cosa
Si costruisce il negozio della funzione.

### paths.ingresso.tappe.3.chi
La funzione

### paths.ingresso.tappe.3.cosa
Si distribuiscono i badge per l'ingresso clienti.

### paths.ingresso.tappe.3.tu
Decidi chi dei tuoi entra e cosa può fare.

### paths.ingresso.tappe.4.chi
Il team dati con la funzione

### paths.ingresso.tappe.4.cosa
Si fissano le regole su chi vede cosa.

### paths.ingresso.tappe.4.tu
Indichi quali dati sono riservati.

### paths.ingresso.tappe.5.chi
Il team dati

### paths.ingresso.tappe.5.cosa
Parte il primo semilavorato verso il nuovo negozio.

### paths.ingresso.tappe.6.chi
La funzione

### paths.ingresso.tappe.6.cosa
Nasce il primo report della funzione.

### paths.ingresso.tappe.6.tu
Costruisci il report, con il supporto del team dati.

### paths.ingresso.tappe.7.chi
La funzione

### paths.ingresso.tappe.7.cosa
La funzione vede quanta energia consuma il suo negozio.
