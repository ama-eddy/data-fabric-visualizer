# Fabbrica Dati 3D — Documento dei requisiti

> Metafora 3D esplorabile di una data platform **Microsoft Fabric** con organizzazione **hub & spoke**.
> L'hub è una fabbrica che produce **semilavorati** (modelli semantici certificati); gli **spoke** sono officine che li personalizzano (self-service reporting).

| Campo | Valore |
|---|---|
| Versione documento | 1.8 |
| Data | 2026-11-12 |
| Stato | Requisiti approvati — implementazione da avviare (vedi `PIANO.md`) |
| Approva | Il responsabile del progetto (richiedente) |
| Artefatti governati | `fabbrica-dati.html` (implementazione), `profili/*.md` (profili aziendali), `PIANO.md` (piano di implementazione) |

---

## 0. Come si usa questo documento (il processo)

**Principio guida: nessuna riga di codice senza un requisito.** Ogni richiesta, anche piccola, viene prima inquadrata in questo framework e solo dopo diventa codice.

### 0.1 Flusso di una richiesta

```
Richiesta (RDM) ──► 1. Classificazione ──► 2. Requisito ──► 3. Impatto ──► 4. Approvazione ──► 5. Codice ──► 6. Verifica ──► 7. Changelog
```

| Passo | Cosa si fa | Output |
|---|---|---|
| 1. Classificazione | Si decide **dove** cade la richiesta: è standard (vale per tutti) o di profilo (vale per una sola organizzazione)? Quale area (§3.2)? Quale workload (§5)? | Area + ambito (Standard / Profilo) |
| 2. Requisito | Si **crea un requisito nuovo** o si **aggiorna uno esistente**, con criterio di accettazione | `REQ-<AREA>-<NN>` in stato *Proposto* |
| 3. Impatto | Si elencano requisiti collegati, chiavi `CONFIG` e sezioni di codice toccate (matrice §13) | Righe della matrice aggiornate |
| 4. Approvazione | Il responsabile del progetto approva | Stato *Approvato* |
| 5. Codice | Si implementa, marcando il codice con l'ID (§12) | Stato *Implementato* |
| 6. Verifica | Si controlla il criterio di accettazione nel browser | Stato *Verificato* |
| 7. Changelog | Si registra la modifica (§16) | Riga di changelog |

**Regole d'oro**
1. Se una richiesta non trova posto nel framework, **prima si estende il framework** (nuova area, nuovo workload, nuova decisione) e solo dopo si scrive il requisito.
2. Una richiesta che riguarda **una sola organizzazione** non modifica il modello standard: va nel **profilo** (§11).
3. Il documento descrive **solo lo stato valido**: un requisito che cambia si aggiorna sul posto; un requisito o una decisione superati si eliminano. Gli ID non si riusano.
4. Le scelte non ovvie vanno nel **registro decisioni** (§14).

### 0.2 Stati di un requisito

`Proposto` → `Approvato` → `Implementato` → `Verificato` (oppure `Sospeso`)

### 0.3 Priorità (MoSCoW)

**M** = Must · **S** = Should · **C** = Could · **W** = Won't (per ora)

---

## 1. Visione e obiettivi

| ID | Obiettivo |
|---|---|
| OBJ-01 | **Alfabetizzare le funzioni aziendali** che oggi non sanno che la data platform esiste o non sanno cosa fa: spiegare *cosa fa, cosa significa per loro e come usarla*, con la metafora della fabbrica. Il pubblico IT e l'hub sono un pubblico secondario. |
| OBJ-02 | Permettere di **raccontare la costruzione** della piattaforma: si parte da un terreno vuoto e si accende un workload alla volta. |
| OBJ-03 | Rendere chiara la **catena del valore**: sorgenti → landing → bronze → silver → gold → modelli semantici (semilavorati) → report istituzionali e personalizzazioni degli spoke. |
| OBJ-04 | Fornire un **modello standard** riusabile, che si adatta a ogni azienda tramite un **profilo minimo**: nomi e stato degli spoke, sorgenti con la loro categoria, flussi on/off, team dati, contatto. |
| OBJ-05 | Mantenere **tracciabilità** completa tra requisiti e codice. |

**Fuori ambito:** documentare l'as-is tecnico della piattaforma (D-26). **Fuori ambito per ora:** collegamento a dati o metriche reali di un tenant Fabric; editing della scena dall'interfaccia; multilingua (vedi D-12).

### 1.1 Pubblico e principio di alfabetizzazione (RDM-007)

**Pubblico primario:** responsabili e utenti delle funzioni aziendali (Finance, Commerciale, HR…) **senza conoscenze tecniche** e che non conoscono la piattaforma.
**Pubblico secondario:** team hub, IT, referenti tecnici degli spoke.

**Principi** (valgono per ogni requisito, attuale e futuro: una richiesta che li viola va rivista):

| ID | Principio |
|---|---|
| P-01 | **Prima la metafora, poi il termine tecnico.** Ogni concetto si spiega con la fabbrica; il nome Fabric arriva dopo, come approfondimento. |
| P-02 | **"Cosa significa per me".** Ogni elemento risponde alla domanda della funzione aziendale, non a quella dell'IT. |
| P-03 | **Il punto di vista di chi vive il processo.** I percorsi si raccontano con frasi della funzione ("il numero nel mio report è sbagliato"), non con il gergo dell'IT ("incident P2"). |
| P-04 | **"A chi mi rivolgo".** Chi guarda deve uscire sapendo dove e a chi chiedere. |
| P-05 | **Scopo formativo, non documentazione.** L'HTML non descrive l'as-is tecnico: insegna come funziona e come usarla. I nomi e le etichette sono sempre quelli della metafora; il **nome tecnico** compare **solo nella scheda**, in una riga dedicata ("In Fabric: …"), per collegare la metafora al termine che le funzioni sentiranno usare. L'**as-is di business** (quali funzioni sono attive, cosa è disponibile) è in ambito, perché serve LO-02. |

| ID | Requisito | Criterio di accettazione | Pr. | Stato |
|---|---|---|---|---|
| REQ-LIT-01 | Ogni elemento cliccabile ha una sezione **"Cosa significa per te"**, scritta per la funzione aziendale. | Sezione presente e non tecnica per tutti gli elementi. | M | Approvato |
| REQ-LIT-02 | Ogni elemento ha una sezione **"A chi rivolgerti"**, che mostra il **contatto indicato nel profilo dell'azienda** (in sua assenza: "lo sportello dell'hub"). | Con il profilo compilato, tutte le schede mostrano il contatto reale. | M | Approvato |
| REQ-LIT-03 | I testi principali (etichette, titoli, schede) rispettano il **lessico** del §1.2: usano solo i termini ammessi e traducono quelli da tradurre. | Revisione dei testi con una persona non tecnica; nessun termine "da tradurre" nei testi principali. | M | Approvato |
| REQ-LIT-04 | All'apertura compare una **schermata di benvenuto**: "cos'è la piattaforma in un minuto" (3 frasi) e come muoversi nella fabbrica. | La schermata si chiude con un clic e si riapre da un pulsante "?". | S | Approvato |
| REQ-LIT-05 | Ogni percorso (§8.1) ha come titolo una **frase in prima persona** della funzione. | Esempio: "Il numero nel mio report è sbagliato". | M | Approvato |
| REQ-LIT-06 | Ogni percorso si chiude con un **messaggio chiave** ("cosa ricordare"). | Scheda finale presente in ogni percorso. | S | Approvato |

### 1.2 Lessico (D-23)

**Termini ammessi** nei testi principali (le funzioni li sentiranno usare comunque, e la metafora li rende intuitivi):

| Termine | Come lo si introduce |
|---|---|
| Report | Il prodotto finito che la funzione consulta |
| Power BI | Lo strumento con cui si guardano e si costruiscono i report |
| Dato certificato | Dato controllato e garantito dall'hub (il "marchio di qualità") |
| Bronze / Silver / Gold | Materia prima / pezzo lavorato / componente assemblato |

**Termini da tradurre** (nei nomi, nelle etichette e nei testi delle schede si usa **sempre** la traduzione; il termine originale compare **solo** nella riga "In Fabric" della scheda, campo `tecnico`):

| Termine tecnico | Traduzione nei testi principali |
|---|---|
| Delta, Parquet, tabelle Delta | "conservati in formato standard" (o si omette) |
| DAX, misure | "calcoli già pronti" |
| Direct Lake | (si omette) |
| Semantic model / modello semantico | "semilavorato" (al primo uso: "semilavorato, in gergo *modello semantico*") |
| Mirroring | "copia sempre aggiornata, senza attese" |
| Shortcut | "accesso diretto senza copia: il dato resta dov'è" |
| Pipeline, Copy job, Dataflow | "trasporto" / "caricamento" |
| RLS / OLS / CLS | "regole su chi vede cosa" |
| Capacity, CU, SKU | "l'energia della fabbrica, che ha un costo" |
| Dev / Test / Prod, deployment pipeline | "laboratorio prove" → "produzione" |
| Workspace | "reparto" (hub) / "officina" (spoke) |
| Entra ID, gruppi, ruoli | "badge" / "chi può entrare e cosa può fare" |
| Lineage | "risalire la filiera" |
| Endorsement | "marchio di qualità" |

Aggiungere un termine a una delle due tabelle è una modifica al framework: passa da una RDM.

### 1.3 Contesto d'uso e obiettivi di apprendimento (RDM-009)

**Contesto principale:** un **meeting di envisioning** in cui il presentatore (membro del team data) **parla ed esplora la fabbrica dal vivo** davanti ai manager delle funzioni business. L'HTML è quindi prima di tutto uno **strumento per chi presenta**.

**Obiettivi di apprendimento**: al termine del meeting, un manager di una funzione business sa rispondere a tre domande.

| ID | Il manager sa… | Domanda a cui risponde | Criterio di verifica (cosa sa dire con parole sue) |
|---|---|---|---|
| LO-01 | **capire il lavoro del team data** | "Cosa fate voi del team data?" | Descrive con la metafora cosa fa l'hub: costruisce e mantiene la fabbrica, porta il materiale dai sistemi, lo lavora fino ai semilavorati certificati, produce i report istituzionali, supporta le officine. Distingue cosa fa l'hub da cosa fa la sua funzione. |
| LO-02 | **sapere cosa esiste già** | "Chi la usa già, e cosa c'è di pronto?" | Sa quali funzioni hanno già un'officina attiva e quali sono in costruzione, e cosa potrebbe usare subito la sua funzione. |
| LO-03 | **conoscere il viaggio di un dato, dalla sorgente all'insight** | "Da dove viene il numero che leggo nel report?" | Racconta il viaggio di un dato dal sistema di origine al report e spiega perché ci si può fidare (lavorazione, controlli, certificazione) e perché un dato può "arrivare domani". |

**Regola:** ogni requisito deve servire almeno un obiettivo di apprendimento, oppure essere un **abilitatore** (motore, configurazione, processo). Un requisito che non serve né l'uno né l'altro va riconsiderato (§13.1).

---

## 2. Glossario e metafora

| Termine | Significato nel progetto |
|---|---|
| **Hub** | Il team centrale. Costruisce e gestisce la fabbrica e produce i semilavorati e i report istituzionali. |
| **Spoke** | Un dominio o reparto (es. Finance). Riceve i semilavorati e li personalizza in self-service. |
| **Semilavorato** | Un **modello semantico** certificato, costruito sul Gold, che l'hub mette a disposizione degli spoke. |
| **Prodotto finito istituzionale** | Un report o un'app costruiti dall'hub, uguali per tutta l'organizzazione. |
| **Prodotto personalizzato** | Un report self-service di uno spoke, costruito su un semilavorato e a volte arricchito con dati locali. |
| **Workload** | Una capacità della piattaforma che si può accendere. Nella scena corrisponde a un insieme di edifici, impianti e flussi (§5). |
| **Stato del workload** | `off` = assente dalla scena · `wip` = cantiere · `on` = attivo (§4). |
| **Modello standard** | La fabbrica generica descritta da questo documento. |
| **Profilo** | La personalizzazione del modello standard per una specifica azienda (§11): nomi e stato degli spoke, sorgenti con categoria e flusso, team dati, contatto. |
| **Capitolo** | Un passo della narrazione: definisce lo stato dei workload, l'inquadratura e il testo (§8). |

---

## 3. Architettura del framework

### 3.1 Tre livelli

```
┌───────────────────────────────────────────┐
│ 1. MODELLO STANDARD  (questo documento)    │  cosa deve fare la fabbrica, per tutti
├───────────────────────────────────────────┤
│ 2. PROFILO ORGANIZZAZIONE (profili/*.md)   │  spoke, sorgenti, flussi, team dati, contatto     
├───────────────────────────────────────────┤
│ 3. IMPLEMENTAZIONE (fabbrica-dati.html)    │  CONFIG (standard) + PROFILE (override) + motore 3D
└───────────────────────────────────────────┘
```

- Il **motore** (codice 3D) non contiene testi né nomi: legge tutto da `CONFIG` e `PROFILE`.
- Il **CONFIG** contiene il modello standard: workload, elementi, testi, colori, capitoli e percorsi.
- Il **PROFILE** contiene solo ciò che cambia da un'azienda all'altra (REQ-CFG-03).

### 3.2 Aree dei requisiti (schema degli ID)

Formato: `REQ-<AREA>-<NN>` (es. `REQ-FLW-03`)

| Area | Ambito |
|---|---|
| `PRC` | Processo e tracciabilità |
| `WL` | Modello dei workload e degli stati |
| `FLW` | Flusso dei dati (catena del valore) |
| `SCN` | Scena 3D (layout ed elementi) |
| `UI` | Interazione e interfaccia |
| `NAR` | Modalità narrativa |
| `PER` | Percorsi operativi (incident, change, progetti…) |
| `LIT` | Alfabetizzazione e linguaggio |
| `SRC` | Data sources |
| `HS` | Hub & spoke |
| `CFG` | Configurazione e profili |
| `NFR` | Requisiti non funzionali |

I workload hanno un proprio codice, `WL-<SIGLA>` (§5). È usato anche come chiave nel `CONFIG`.

---

## 4. Modello degli stati dei workload

| ID | Requisito | Criterio di accettazione | Pr. | Stato |
|---|---|---|---|---|
| REQ-WL-01 | Ogni workload ha uno stato tra `off`, `wip` e `on`. | Lo stato è leggibile e modificabile da CONFIG e dall'interfaccia. | M | Approvato |
| REQ-WL-02 | Con stato **`off`**, gli elementi 3D del workload **non compaiono** nella scena. | Nessun edificio, impianto o flusso del workload è visibile. | M | Approvato |
| REQ-WL-03 | Con stato **`wip`**, il workload compare **come cantiere**: impalcature, gru, recinzione, cartello "Lavori in corso", nessun flusso. | Si riconosce a colpo d'occhio che il workload è in costruzione; cliccandolo, il pannello mostra lo stato `WIP` e una nota opzionale (es. data prevista). | M | Approvato |
| REQ-WL-04 | Con stato **`on`**, il workload compare **completo e operativo**: edifici rifiniti e flussi animati. | Gli elementi sono visibili e i flussi del workload sono in movimento. | M | Approvato |
| REQ-WL-05 | Nel **modello standard** tutti i workload sono `off` di default, tranne **Data Sources**, che è `on` con **tutte le sorgenti spente**: la scena parte dal terreno vuoto con la sola area fornitori. | Aprendo il file senza profilo si vedono il terreno, l'area fornitori vuota e il pannello dei workload. | M | Implementato |
| REQ-WL-06 | Ogni workload dichiara le proprie **dipendenze** (§5.2). Accendere un workload accende **solo quello**: se una sua dipendenza non è `on`, il workload compare ma resta **fermo** (nessun materiale in arrivo, figure in attesa). Il "buco" a monte si vede e si racconta. | Con `WL-TRF` `on` e `WL-INT` `off`: i reparti di trasformazione sono visibili ma senza flusso; accendendo `WL-INT` il flusso parte. | M | Approvato |
| REQ-WL-07 | Il passaggio di stato è **animato**: un elemento che compare "si costruisce" salendo dal terreno, uno che scompare viene smontato. | Transizione visibile, durata configurabile (default circa 1,5 s). | S | Approvato |
| REQ-WL-08 | Tutti i workload, anche quelli `off`, sono **sempre elencati** nel pannello dei workload. | Il pannello mostra 12 workload con uno stato ciascuno, anche a scena vuota (D-06). | M | Approvato |

---

## 5. Catalogo dei workload

### 5.1 Elenco

La colonna "In Fabric (concetti)" è un **riferimento per gli autori**: serve a mantenere la metafora corretta e **non viene mostrata nell'HTML** (P-05).

Il pannello e la narrativa li presentano in quest'ordine (D-08): Data Sources, Data Architecture, Data Integration, Data Transformation, Security, Accessi, Data Visualization, Self-service, Data Governance, Monitoraggio costi, Knowledge, Real-Time.

| Codice | Workload | Nella fabbrica (metafora) | In Fabric (concetti) | Default |
|---|---|---|---|---|
| `WL-ARC` | **Data Architecture** (costruzione della fabbrica) | Terreno, fondamenta, capannone, reparti, **centrale elettrica**, **riserva idrica** sotto la fabbrica | Tenant, **Capacity** (centrale), **OneLake** (riserva), workspace per layer e ambiente (Dev/Test/Prod), Git integration, deployment pipelines | off |
| `WL-SRC` | **Data Sources** | L'area fornitori: un edificio per ogni sistema dell'azienda, per categoria di software; si accendono uno alla volta | Sistemi sorgente (ERP, CRM, PIM, HR…), on-premises data gateway | **on**, con tutte le sorgenti spente |
| `WL-ACC` | **Accessi** | Cancelli, tornelli, badge, reception | Microsoft Entra ID, gruppi, ruoli di workspace (Admin/Member/Contributor/Viewer), permessi sugli item, permesso **Build** sui modelli semantici | off |
| `WL-SEC` | **Security** | Recinzione perimetrale, telecamere, caveau, sigilli sui pacchi | RLS/OLS/CLS, sensitivity label, OneLake security, rete privata (private link), cifratura | off |
| `WL-GOV` | **Data Governance** | Torre di controllo con la cabina, sala controllo con le spie dei reparti, ufficio qualità, marchio di certificazione, sportello dell'hub | Domini, Microsoft Purview (catalogo, lineage), endorsement (Promosso/Certificato), standard del CoE; Monitoring hub, workspace monitoring, alert su pipeline e refresh, controlli di data quality | off |
| `WL-FIN` | **Monitoraggio costi** | Contatori dell'energia della centrale, ripartizione dei consumi per reparto | Capacity Metrics app, consumo di CU, chargeback tra hub e spoke, pausa e ridimensionamento della capacity | off |
| `WL-INT` | **Data Integration** | Scivoli e scialuppe dai fornitori al **lago dei dati** (Landing, che appartiene all'Architettura), ponte di vetro, **pontile** con le gru che pescano dal lago, **magazzino materie prime** (Bronze) | Data pipeline, Copy job, Dataflow Gen2, Shortcut; **Landing = file su OneLake**; **Bronze = Warehouse** | off |
| `WL-TRF` | **Data Transformation** | **Reparto lavorazione** (Silver), **linea di assemblaggio** (Gold), **confezionamento** dei semilavorati, spedizioni | **Silver = Warehouse**, **Gold = Warehouse** (modello a stella), T-SQL (stored procedure) orchestrato da pipeline, **modelli semantici** sul Gold | off |
| `WL-VIS` | **Data Visualization istituzionale** | **Showroom dell'hub** con prodotti finiti a marchio aziendale | Report Power BI dell'hub, org app, KPI direzionali, report certificati | off |
| `WL-SSR` | **Self-service reporting (Spoke)** | **Officine satellite** che personalizzano i semilavorati | Workspace degli spoke, live connection ai modelli certificati, **composite model con dati locali** (Excel, liste) | off |
| `WL-RTI` | **Real-Time Intelligence** | Sala sensori che lavora il materiale **in diretta**, senza passare dal magazzino | Eventstream, Eventhouse (KQL), Real-Time Dashboard, Activator | off |
| `WL-KNW` | **Knowledge / Ontology** | **Ufficio tecnico e archivio progetti**: la mappa di cosa sono le cose e come si collegano | Ontology (Fabric IQ), entità e relazioni di business collegate a Gold e modelli semantici, graph, data agent | off |

### 5.2 Dipendenze

| Workload | Dipende da |
|---|---|
| `WL-ARC` | — (è la base) |
| `WL-ACC`, `WL-SEC`, `WL-GOV`, `WL-FIN` | `WL-ARC` |
| `WL-SRC` | — |
| `WL-INT` | `WL-ARC`, `WL-SRC` |
| `WL-TRF` | `WL-INT` |
| `WL-VIS` | `WL-TRF` |
| `WL-SSR` | `WL-TRF`, `WL-ACC` |
| `WL-RTI` | `WL-ARC` |
| `WL-KNW` | `WL-TRF` |

### 5.3 Requisiti del catalogo

| ID | Requisito | Criterio di accettazione | Pr. | Stato |
|---|---|---|---|---|
| REQ-WL-10 | La piattaforma gestisce **tutti e 12 i workload** del §5.1, ciascuno con codice, nome, metafora, concetti Fabric, colore, dipendenze ed elementi 3D. | Ogni riga del §5.1 corrisponde a una voce di `CONFIG.workloads`. | M | Approvato |
| REQ-WL-11 | Ogni workload ha un **colore identificativo**, usato per l'etichetta, il bordo della zona e il badge nel pannello. | Colori distinti e leggibili sia su sfondo chiaro sia su sfondo scuro. | S | Approvato |
| REQ-WL-12 | Aggiungere un workload **non richiede modifiche al motore**: basta aggiungere una voce in `CONFIG.workloads` e i relativi elementi in `CONFIG.elements`. | Prova: si aggiunge un workload fittizio dal solo CONFIG e compare nel pannello e nella scena. | S | Approvato |

---

## 6. Flusso dei dati (catena del valore)

| ID | Requisito | Criterio di accettazione | Pr. | Stato |
|---|---|---|---|---|
| REQ-FLW-01 | Le **sorgenti** sono edifici esterni alla fabbrica, descritti dal **catalogo delle sorgenti** (§6.1) e appartenenti al workload **Data Sources**; il loro **trasporto** (scivoli, scialuppe, ponti) appartiene alla **Data Integration**. | Con Data Sources `on` e Data Integration `off` si vedono gli edifici senza trasporto; il trasporto di una sorgente compare solo se la sorgente e la Data Integration sono accese. | M | Implementato |
| REQ-FLW-02 | Il **Landing** è il **lago dei dati**, tra i fornitori e la fabbrica: il materiale ci arriva **così com'è** (file su OneLake), con **scivoli** e **scialuppe**. Il team dati lo **pesca dal pontile** e lo porta nel Bronze, dentro la fabbrica. | Il materiale scivola o naviga nel lago, galleggia fino al pontile e da lì entra nel capannone; il pannello del lago spiega che il materiale arriva così com'è. | M | Implementato |
| REQ-FLW-03 | Il **Bronze** è un magazzino (**Warehouse**) dove il materiale viene messo a scaffale, etichettato e conservato, ma resta grezzo. | Scaffali con casse color bronzo; il pannello usa la metafora del magazzino materie prime. | M | Approvato |
| REQ-FLW-04 | Il **Silver** è il reparto lavorazione (**Warehouse**): pulizia, deduplica, conformazione. | Macchinari animati; i pezzi in uscita sono color argento. | M | Approvato |
| REQ-FLW-05 | Il **Gold** è la linea di assemblaggio (**Warehouse**, modello a stella). | Robot di assemblaggio; i pezzi in uscita sono color oro. | M | Approvato |
| REQ-FLW-06 | I **modelli semantici** sono il **confezionamento dei semilavorati**: pacchi con marchio di certificazione. | Pacchi ciano con sigillo; il pannello li definisce "semilavorati". | M | Approvato |
| REQ-FLW-07 | Ogni semilavorato passa prima dal **laboratorio prove** (collaudo) e solo dopo esce: verso le **spedizioni** e gli **spoke** (`WL-SSR`), e con una passerella verso lo **showroom** (`WL-VIS`). | Il materiale va dal confezionamento al laboratorio, poi alle spedizioni; la passerella verso lo showroom compare solo con `WL-VIS` `on`. | M | Implementato |
| REQ-FLW-08 | Il materiale **cambia aspetto a ogni stadio**: grezzo, bronzo, argento, oro, semilavorato, prodotto finito. Una **legenda** spiega i materiali. | La legenda è visibile e coerente con i colori in scena. | M | Approvato |
| REQ-FLW-09 | Un flusso è animato **solo se tutti i workload che attraversa** sono `on`. | Esempio: con `WL-TRF` in `wip`, il flusso si ferma al Bronze. | M | Approvato |
| REQ-FLW-10 | `WL-RTI`, quando è `on`, mostra un flusso **diretto** dalle sorgenti alla sala sensori, che **salta** Landing e Bronze. | Flusso visibilmente più veloce e distinto (eventi luminosi). | S | Approvato |
| REQ-FLW-11 | `WL-KNW`, quando è `on`, mostra collegamenti tra l'ufficio tecnico, il Gold e i modelli semantici. | Linee o grafo che collegano la torre dell'ontologia ai due reparti. | S | Approvato |

### 6.1 Data sources (RDM-005)

#### 6.1.1 Catalogo delle sorgenti

Ogni sorgente è una voce del catalogo (`CONFIG.sources`, sovrascrivibile da `PROFILE.sources`) con questi attributi:

| Attributo | Valori | Rappresentato in scena? |
|---|---|---|
| `id`, `nome` | testo; dal profilo, il nome con cui le persone conoscono il sistema (es. "il gestionale") | etichetta |
| `categoria` | categoria di software: `erp` · `crm` · `pim` · `hr` · `mes` · `ecommerce` · `marketing` · `excel` · `iot` · `esterni` · `datalake` | **sì**: forma dell'edificio (§6.1.2) |
| `modalita` | `copy` · `dataflow` · `shortcut` · `streaming`; **derivata dalla categoria** (§6.1.2), modificabile solo nel CONFIG | **sì**: mezzo di trasporto e percorso (§6.1.3) |
| `stato` | `off` · `wip` · `on`; dal profilo arriva il **flusso on/off**, `wip` si imposta dal vivo | **sì**: come per i workload (REQ-WL-02…04) |

#### 6.1.2 Categoria di software → forma dell'edificio e modalità di default

Le sorgenti sono classificate per **categoria di software**, come le conoscono le funzioni aziendali.

| Categoria | Nome mostrato | Archetipo nella metafora | Modalità di default |
|---|---|---|---|
| `erp` | ERP | Grande stabilimento con ciminiere | `copy` |
| `crm` | CRM | Negozio / ufficio commerciale | `copy` |
| `pim` | PIM | Sala cataloghi con schede colorate | `copy` |
| `hr` | HR | Palazzina di uffici | `copy` |
| `mes` | Produzione e magazzino | Silos | `copy` |
| `ecommerce` | E-commerce | Centro pacchi | `copy` |
| `marketing` | Marketing | Sportello / distributore | `copy` |
| `excel` | Fogli di calcolo | Archivio di scatoloni | `dataflow` |
| `iot` | Sensori | Campo di sensori / antenne | `streaming` |
| `esterni` | Dati esterni | Mercato / bancarella | `copy` |
| `datalake` | Data lake esistente | Container portuali | `shortcut` |

#### 6.1.3 Modalità di acquisizione → mezzo e percorso

| Modalità | Mezzo nella metafora | Percorso |
|---|---|---|
| `copy` (pipeline / copy job) | **Scivolo**: il materiale scivola dal fornitore nel lago | Sorgente → **lago dei dati** (Landing, file su OneLake) → pescato dalle gru del pontile → Bronze |
| `dataflow` (Dataflow Gen2) | Scivolo fino a un molo, poi **scialuppa** che sistema un po' il materiale durante il viaggio | Sorgente → attraversa il **lago** → pontile → Bronze |
| `shortcut` | **Ponte di vetro**: il materiale **non si sposta**, compare nel lago "in conto deposito" | Sorgente ⇢ **lago**; nessun pezzo viaggia |
| `streaming` | Nastro veloce luminoso con eventi | Sorgente → **sala sensori `WL-RTI`** (se `WL-RTI` è spento, il flusso non c'è) |

#### 6.1.4 Requisiti

| ID | Requisito | Criterio di accettazione | Pr. | Stato |
|---|---|---|---|---|
| REQ-SRC-01 | Le sorgenti sono definite in un **catalogo** con gli attributi del §6.1.1; aggiungerne una non richiede codice. | Aggiungendo una voce al catalogo, la sorgente compare in scena e nel pannello. | M | Approvato |
| REQ-SRC-02 | La **categoria** determina la **forma** dell'edificio secondo il §6.1.2. | Le 11 forme sono distinguibili a colpo d'occhio da vicino. | M | Approvato |
| REQ-SRC-03 | La **modalità** determina **mezzo e percorso** secondo il §6.1.3. Una **legenda** spiega i mezzi. | Le 4 modalità sono distinguibili; la legenda è presente. | M | Approvato |
| REQ-SRC-04 | **Tra i fornitori e la fabbrica non ci sono strade**: tutto il materiale finisce nel **lago** (scivolo, scialuppa, ponte di vetro) e da lì viene recuperato. Fa eccezione solo il nastro veloce del Real-Time. | Nessuna strada tra area fornitori e capannone; ogni mezzo termina nel lago. | M | Implementato |
| REQ-SRC-05 | Lo **Shortcut** non muove materiale: il ponte di vetro arriva al lago, ma non viaggia nessun pezzo. Nel lago compare un'"ombra" del materiale (accesso senza copia). | Nessun pezzo in movimento sul ponte. | S | Implementato |
| REQ-SRC-06 | Lo **Streaming** alimenta solo `WL-RTI`; se `WL-RTI` non è `on`, la sorgente è visibile ma senza flusso, e il pannello lo segnala. | Con `WL-RTI` spento il nastro luminoso è fermo. | M | Approvato |
| REQ-SRC-07 | Le sorgenti stanno nell'**area fornitori**, sul fondo della scena, e **non sono legate a nessuno spoke**. L'area mostra **un lotto a terra per ogni sorgente del catalogo**, con un cartello del tipo di sistema, anche quando la sorgente è spenta. | Con Data Sources `on` e tutte le sorgenti spente si vedono i lotti con i cartelli, appoggiati a terra; accendendo una sorgente, l'edificio compare sul suo lotto. | M | Implementato |
| REQ-SRC-08 | Ogni sorgente ha uno **stato proprio** (`off`/`wip`/`on`) che si combina con **Data Sources**: è visibile solo se Data Sources non è `off`. Nel modello standard tutte le sorgenti partono `off`. | Prova: Data Sources `on`, il gestionale in `wip` → è mostrato come cantiere, senza trasporto. | M | Implementato |
| REQ-SRC-09 | Il pannello di una sorgente mostra solo informazioni utili al business: **che tipo di fornitore è** (spiegazione della categoria), **come arriva il materiale** (il mezzo, in parole semplici) e **se il flusso è attivo**. | Nessun termine tecnico nel pannello (verifica sul lessico §1.2). | M | Approvato |
| REQ-SRC-10 | La narrativa (§8) può **accendere singole sorgenti** ("ora colleghiamo il gestionale"). | Un capitolo da CONFIG cambia lo stato di una sola sorgente. | C | Approvato |

#### 6.1.5 Catalogo standard (sorgenti generiche)

Una sorgente per categoria, così da poter raccontare ogni caso.

| id | Nome | Categoria |
|---|---|---|
| src-erp | Gestionale | erp |
| src-crm | CRM | crm |
| src-pim | Anagrafica prodotti | pim |
| src-hr | Sistema del personale | hr |
| src-mes | Produzione e magazzino | mes |
| src-ecom | Negozio online | ecommerce |
| src-mkt | Marketing | marketing |
| src-excel | Budget e forecast (Excel) | excel |
| src-iot | Sensori di impianto | iot |
| src-ext | Dati di mercato | esterni |
| src-lake | Archivio dati esistente | datalake |

---

## 7. Scena 3D

| ID | Requisito | Criterio di accettazione | Pr. | Stato |
|---|---|---|---|---|
| REQ-SCN-01 | Layout **a valle verso il pubblico**: l'**area fornitori** (sorgenti) sul fondo, il **capannone dell'hub** al centro (Integration, Transformation, Visualization), le **officine degli spoke** in primo piano, vicino a chi guarda. Il materiale scende dal fondo verso il pubblico. | La vista d'insieme di default inquadra la scena dal lato degli spoke; la catena sorgenti → hub → spoke si legge in profondità. | M | Approvato |
| REQ-SCN-02 | Le **zone** del capannone hanno il pavimento colorato secondo il workload. | Ogni zona è riconoscibile per colore ed etichetta. | M | Approvato |
| REQ-SCN-03 | I workload **trasversali** (ACC, SEC, GOV, FIN) sono elementi **che avvolgono** la fabbrica: cancelli e tornelli, recinzione e telecamere, torre di controllo, sala controllo, contatori della centrale. | Ogni workload trasversale ha almeno un elemento dedicato, cliccabile. | M | Approvato |
| REQ-SCN-04 | `WL-ARC` comprende il **terreno edificabile**, le fondamenta, la struttura del capannone, la **centrale elettrica** (capacity) e il **lago dei dati** (OneLake), **tra l'area fornitori e il capannone**. | Con solo `WL-ARC` attivo si vedono il capannone vuoto, la centrale e il lago. | M | Implementato |
| REQ-SCN-05 | `WL-RTI` e `WL-KNW` stanno in **edifici separati**, ai lati del capannone. | Edifici distinti dal capannone. | M | Approvato |
| REQ-SCN-06 | Ogni elemento ha un'**etichetta** (nome dal CONFIG o dal PROFILE); le etichette si possono nascondere. | Interruttore per mostrare o nascondere le etichette. | M | Approvato |
| REQ-SCN-07 | Gli schermi dello showroom e degli spoke mostrano **dashboard di esempio** generate (dati fittizi). | Nessun dato reale; i grafici sono generati nel codice. | S | Approvato |
| REQ-SCN-08 | Lo stile è **originale** e "da plastico" (low-poly), senza marchi, loghi o asset di terze parti. | Nessun logo Microsoft o di altri marchi in scena. | M | Approvato |
| REQ-SCN-09 | Lo **sportello dell'hub** (reception / Center of Excellence) è il punto in cui le funzioni entrano in contatto con la piattaforma: segnalazioni, richieste, onboarding. Appartiene a `WL-GOV`. | L'elemento è presente e cliccabile, ed è la tappa di partenza o di contatto dei percorsi. | M | Approvato |
| REQ-SCN-10 | Il **laboratorio prove** sta **dentro il capannone**, subito dopo il confezionamento, e compare con la **Data Transformation** (`WL-TRF`): ogni semilavorato viene collaudato qui prima di uscire, e qui si provano le modifiche prima della produzione. | L'elemento compare con `WL-TRF`; il flusso dei semilavorati lo attraversa; è usato da Change request e New project. | M | Implementato |
| REQ-SCN-11 | Il **team dati** è rappresentato da **figure stilizzate, una per persona reale**, con due sagome (uomo / donna) e un colore unico per l'hub. Il numero e la composizione vengono dal profilo; di default sono **5**: **2 al trasporto** (una **costruisce e ripara gli scivoli**, spostandosi da un fornitore all'altro; l'altra, da un **pannello di comando**, manovra le **gru** che pescano dal lago e mettono il materiale nel Bronze) e **3 a rotazione** tra tre postazioni: **cabina di controllo** (governo della fabbrica: governance e architettura insieme), **ufficio di coordinamento** (project management: coordina tutti gli operatori) e **showroom** (creazione dei report ufficiali). I reparti di lavorazione sono **automatici**: nessuna figura. | In scena ci sono esattamente le figure del profilo; quelle a rotazione si spostano periodicamente tra le tre postazioni; una figura compare solo se il workload della sua postazione è `on` (le figure a rotazione usano le postazioni disponibili). | M | Approvato |
| REQ-SCN-12 | Nelle officine degli spoke lavorano **figure delle funzioni business**, con il colore dello spoke, che usano i semilavorati e guardano i report. | Le figure compaiono con l'officina. | S | Approvato |
| REQ-SCN-13 | L'**ufficio di coordinamento** (project management) è una postazione dell'hub da cui si coordinano gli operatori. Appartiene a `WL-ARC`. | L'elemento è presente e cliccabile; è una delle tre postazioni delle figure a rotazione. | M | Approvato |
| REQ-SCN-14 | Lo **showroom** è un **edificio a sé, vicino al capannone ma staccato**, collegato al laboratorio prove da una passerella coperta. | Lo showroom è fuori dal capannone; la passerella è visibile e i semilavorati la percorrono. | M | Implementato |

---

## 8. Modalità narrativa

L'HTML ha **due modalità** (REQ-UI-10): **esplorazione libera**, in cui la fabbrica si costruisce dal vivo cambiando gli stati (REQ-UI-09) e si avviano i percorsi (§8.1); **narrativa**, che mostra **tutti i workload in ordine**, capitolo per capitolo: è lo **strumento della presentazione**, in cui il presentatore va avanti con un clic (o con il telecomando) e la fabbrica si costruisce passo dopo passo.

| ID | Requisito | Criterio di accettazione | Pr. | Stato |
|---|---|---|---|---|
| REQ-NAR-01 | Esiste una **modalità narrativa**, organizzata in **capitoli**, che si percorre con **Avanti / Indietro**. Ogni capitolo definisce: titolo, testo da raccontare, stato dei workload, inquadratura ed elemento evidenziato. | Pulsanti Avanti e Indietro, indicatore "capitolo n di N"; ogni Avanti porta al capitolo successivo con transizione fluida. | M | Approvato |
| REQ-NAR-02 | I **capitoli standard** coprono tutti i workload, in ordine di costruzione: 0 Terreno vuoto · 1 Data Sources · 2 Data Architecture · 3 Data Integration · 4 Data Transformation · 5 Security · 6 Accessi · 7 Data Visualization · 8 Self-service (spoke) · 9 Data Governance · 10 Monitoraggio costi · 11 Knowledge · 12 Real-Time. Ogni capitolo si può **includere o escludere** dalla presentazione, e l'ordine si può cambiare, dal CONFIG. | Escludendo un capitolo dal CONFIG, Avanti lo salta; quali capitoli entrano nella presentazione si decide dopo le prove in esplorazione libera. | M | Approvato |
| REQ-NAR-03 | Ogni capitolo **accende un workload alla volta** (con l'animazione di costruzione, REQ-WL-07); quelli accesi nei capitoli precedenti restano accesi. | Tornando indietro di un capitolo si ripristina lo stato precedente. | M | Approvato |
| REQ-NAR-04 | Un capitolo può portare un workload a **`wip`** invece che a `on`, per raccontare "cosa stiamo costruendo". | Prova da CONFIG: un capitolo con stato `wip` mostra il cantiere. | S | Approvato |
| REQ-NAR-05 | In narrativa si avanza anche da **tastiera** e da **telecomando da presentazione**: frecce, spazio, PagGiù = avanti; freccia sinistra, PagSu = indietro; Esc = esci. | Presentazione completa senza toccare il mouse, con un telecomando standard. | M | Approvato |
| REQ-NAR-06 | Durante la narrazione il presentatore **può comunque esplorare** liberamente la scena; "Riprendi" riporta all'inquadratura del capitolo. | L'esplorazione non fa perdere il punto della narrazione. | S | Approvato |
| REQ-NAR-07 | Il testo del capitolo è mostrato in un **riquadro leggibile a distanza** (pensato per la proiezione). | Font ≥ 18 px, contrasto adeguato. | M | Approvato |
| REQ-NAR-08 | Nei capitoli Data Integration e Self-service, **sorgenti e spoke compaiono nello stato indicato dal profilo** (flusso on/off, spoke on/wip/off). | Con il profilo compilato, la narrativa termina sull'as-is di business dell'azienda. | M | Approvato |

### 8.1 Percorsi (RDM-006)

I percorsi sono una funzione dell'**esplorazione libera**: si avviano dal menu e, chiusi, riportano all'esplorazione.

Un **percorso** mostra come un evento tipico della vita aziendale **attraversa la fabbrica**: chi è coinvolto, quali reparti tocca e in che ordine. È lo strumento principale per rispondere alla domanda "e io, quando ho bisogno, cosa succede?".

**Struttura di un percorso** (`CONFIG.paths`):
- `id`, `titolo` (frase in prima persona, REQ-LIT-05), `sottotitolo` (nome breve, es. "Incident"), `colore`
- `tappe[]`: `elemento` (reparto o edificio), `workload`, `chi` (funzione / hub / team), `cosa_succede` (frase business), `cosa_fai_tu` (ruolo della funzione, se ne ha uno)
- `messaggio_chiave` (REQ-LIT-06)

| ID | Requisito | Criterio di accettazione | Pr. | Stato |
|---|---|---|---|---|
| REQ-PER-01 | I percorsi si scelgono da un **menu dedicato** e sono definiti in `CONFIG.paths`; aggiungerne uno non richiede codice. | Un percorso aggiunto da CONFIG compare nel menu e funziona. | M | Approvato |
| REQ-PER-02 | Visualizzazione **solo tramite evidenziazione**: il percorso si disegna come una **linea luminosa** con **tappe numerate** sopra i reparti, e il resto della fabbrica si **attenua**. Nessun personaggio. | Percorso leggibile dalla vista d'insieme; il resto della scena è attenuato. | M | Approvato |
| REQ-PER-03 | La linea mostra la **direzione** con frecce, comprese le **risalite a ritroso** (es. l'incident risale dalla funzione alla sorgente). | Nell'incident le frecce vanno da valle a monte, poi tornano. | M | Approvato |
| REQ-PER-04 | **Tappa per tappa**: Avanti e Indietro; la telecamera inquadra la tappa e una scheda mostra *cosa succede*, *chi* e *cosa fai tu*. Nessun dettaglio tecnico. | Tutte le tappe di ogni percorso standard sono navigabili. | M | Approvato |
| REQ-PER-05 | Le tappe su workload `off` o `wip` vengono **saltate**: il percorso prosegue con le tappe disponibili e la numerazione si adatta. | Con `WL-GOV` spento, il Change request non mostra la tappa di valutazione. | M | Approvato |
| REQ-PER-06 | Un **capitolo** della narrazione può avviare un percorso. | Prova da CONFIG. | C | Approvato |
| REQ-PER-07 | Durante un percorso si può comunque **cliccare** su qualunque elemento per la sua scheda, senza perdere il punto. | "Riprendi percorso" torna alla tappa corrente. | S | Approvato |

#### 8.1.1 Percorsi standard

**PER-INC — "Il numero nel mio report è sbagliato o non si aggiorna"** *(Incident)*
| # | Elemento | Workload | Cosa succede |
|---|---|---|---|
| 1 | Officina dello spoke | SSR | La funzione nota il problema nel suo report |
| 2 | Sportello hub | GOV | La funzione apre una segnalazione allo sportello |
| 3 | Sala controllo | GOV | L'hub controlla se qualche impianto si è fermato (caricamenti, aggiornamenti) |
| 4 | Confezionamento (modelli semantici) | TRF | Si verifica il semilavorato: il calcolo è corretto? |
| 5 | Gold → Silver → Bronze | TRF, INT | Si **risale la filiera** reparto per reparto per trovare dove nasce l'errore |
| 6 | Lago e pontile / Sorgente | INT | Si trova la causa: un dato errato all'origine o un carico non arrivato |
| 7 | Filiera (in avanti) | INT, TRF | Corretta la causa, il materiale ripercorre la filiera |
| 8 | Officina dello spoke | SSR | Il report torna corretto e la funzione viene avvisata |

*Messaggio chiave:* "Non devi sapere dove sta il problema: lo segnali allo sportello e l'hub risale la filiera per te."

**PER-CR — "Mi serve un nuovo indicatore o un campo in più"** *(Change request)*
| # | Elemento | Workload | Cosa succede |
|---|---|---|---|
| 1 | Officina dello spoke | SSR | La funzione formula la richiesta |
| 2 | Sportello hub | GOV | L'hub valuta: esiste già? Serve a tutti o solo a te? |
| 3a | Officina dello spoke | SSR | *Se serve solo a te*: lo costruisci nella tua officina, con il supporto dell'hub |
| 3b | Laboratorio prove (Dev) | ARC, TRF | *Se serve a tutti*: l'hub modifica la lavorazione e il semilavorato in laboratorio |
| 4 | Laboratorio prove (Test) | ARC | Collaudo insieme alla funzione |
| 5 | Confezionamento | TRF, GOV | Il nuovo semilavorato viene certificato e messo in produzione |
| 6 | Spedizioni → Officina / Showroom | SSR, VIS | Il semilavorato aggiornato arriva a tutti gli spoke e ai report istituzionali |

*Messaggio chiave:* "Quello che serve a tutti va nel semilavorato; quello che serve solo a te lo fai nella tua officina."

**PER-NEW — "Vogliamo analizzare un'area nuova"** *(New project — il viaggio del dato)*
| # | Elemento | Workload | Cosa succede |
|---|---|---|---|
| 1 | Sorgente → Lago → Bronze | INT | Si collega il nuovo fornitore: il materiale parte dal sistema di origine e arriva in fabbrica **a orari stabiliti** (per questo un dato può "arrivare domani") |
| 2 | Silver → Gold | TRF | Il materiale viene pulito, controllato e assemblato: qui nasce la qualità |
| 3 | Confezionamento | TRF | Nasce un nuovo **semilavorato certificato**, con il marchio di qualità dell'hub |
| 4 | Showroom e/o Officina | VIS, SSR | Nascono i report: il **manager legge il numero**, e dietro quel numero c'è tutto il viaggio appena visto |

*Messaggio chiave:* "Ogni numero che leggi ha fatto questo viaggio, con controlli a ogni reparto: per questo ti puoi fidare. E un'area nuova non è un report nuovo: è una nuova linea della fabbrica, che poi serve a tutti."

*Questo percorso è il veicolo di **LO-03** (viaggio del dato dalla sorgente all'insight).*

**PER-ONB — "Come entra la nostra funzione nella piattaforma?"** *(Onboarding funzione)*
| # | Elemento | Workload | Cosa succede |
|---|---|---|---|
| 1 | Sportello hub | GOV | La funzione si presenta allo sportello |
| 2 | Officina dello spoke | ARC, SSR | Si costruisce l'officina della funzione (lo spoke passa da `wip` a `on`) |
| 3 | Cancelli | ACC | Si distribuiscono i badge: chi della funzione entra e con quale ruolo |
| 4 | Recinzione / caveau | SEC | Si fissano le regole su chi vede cosa |
| 5 | Sportello hub (formazione) | GOV | La funzione impara a usare i semilavorati |
| 6 | Spedizioni → Officina | SSR | Arriva il primo semilavorato e nasce il primo report self-service |
| 7 | Contatori della centrale | FIN | La funzione vede quanta energia consuma la sua officina |

*Messaggio chiave:* "Non parti da zero: ricevi semilavorati già controllati e ci costruisci sopra quello che ti serve."

---

## 9. Interazione e interfaccia

| ID | Requisito | Criterio di accettazione | Pr. | Stato |
|---|---|---|---|---|
| REQ-UI-01 | **Navigazione libera**: rotazione, zoom e spostamento col mouse; spostamento con WASD o frecce fuori dalla narrazione. | La scena si esplora da ogni angolazione. | M | Approvato |
| REQ-UI-02 | **Clic su un elemento**: si apre un pannello con nome e, sotto il titolo, il **nome tecnico** ("In Fabric: …", es. Lago dei dati → OneLake; Confezionamento → Semantic model); poi workload e stato, *nella fabbrica* (metafora), *cosa significa per te*, *a chi rivolgerti* e *chi lo gestisce*. Ogni concetto rappresentato (workload, elemento, tipo di sistema, mezzo, spoke, team) ha il suo nome tecnico; i materiali e i mezzi lo mostrano nella legenda al passaggio del mouse. | Tutte le schede hanno la riga "In Fabric"; il nome tecnico non compare mai nel nome o nell'etichetta dell'elemento. | M | Implementato |
| REQ-UI-03 | **Pannello workload**: elenco dei 12 workload con badge colorato e **selettore a tre stati** (off/wip/on). Cliccando il nome, la telecamera inquadra il workload. | Cambiare stato aggiorna subito la scena. | M | Approvato |
| REQ-UI-04 | Comandi globali: **vista d'insieme**, **pausa dei flussi**, **etichette on/off**, **tutto off** e **tutto on**. | Tutti funzionanti. | M | Approvato |
| REQ-UI-05 | **Passando il mouse** su un elemento compaiono un evidenziamento e un tooltip con il nome. | Il cursore diventa a "mano" sugli elementi cliccabili. | S | Approvato |
| REQ-UI-06 | Gli spostamenti della telecamera sono **animati** (volo fluido). | Nessun salto brusco. | S | Approvato |
| REQ-UI-07 | L'interfaccia è in **italiano**, con testi provenienti dal CONFIG. | Nessun testo fisso nel motore. | M | Approvato |
| REQ-UI-08 | Il layout si adatta a **schermi da 1280 px in su**; sotto quella soglia i pannelli si possono ridurre. | Usabile su un portatile e su un proiettore. | S | Approvato |
| REQ-UI-09 | Durante il meeting il presentatore può **cambiare dal vivo lo stato** (off/wip/on) di workload, **singoli spoke** e **singole sorgenti**, dal pannello o cliccando sull'elemento; la scena alla fine rappresenta l'as-is di business costruito insieme. | Cambio di stato in ≤ 2 clic, con effetto immediato in scena. | M | Approvato |
| REQ-UI-10 | Due **modalità**: **esplorazione libera** (navigazione, clic sugli elementi, stati dal vivo, percorsi) e **narrativa** (tutti i workload in ordine, §8). Si passa dall'una all'altra con un pulsante; uscendo dalla narrativa, la scena resta nello stato raggiunto. | Il cambio di modalità non ricarica la scena e non perde lo stato. | M | Approvato |
| REQ-UI-11 | Nel pannello, i workload con elementi a **stato proprio** (Data Integration → sorgenti, Self-service → spoke) si aprono **a tendina**: ogni sorgente o spoke ha il suo selettore off/cantiere/on, per **accenderli uno alla volta**. | Aprendo la tendina di Data Integration e spegnendo una sorgente, si spegne solo quella. | M | Implementato |
| REQ-UI-12 | **In alto a destra**, il pannello **Team dati** mostra **un pupazzino per persona** (sagoma uomo/donna). Il clic su un pupazzino lo **evidenzia in scena** (anello a terra e freccia sopra la testa), inquadra la figura e apre la sua scheda; un secondo clic toglie l'evidenziazione. Le figure non in servizio sono attenuate. | Clic su un pupazzino: figura evidenziata, scheda aperta. | M | Implementato |

---

## 10. Hub & spoke

| ID | Requisito | Criterio di accettazione | Pr. | Stato |
|---|---|---|---|---|
| REQ-HS-01 | Gli spoke sono **officine satellite** collegate all'hub da strade, su cui viaggiano i semilavorati. | Visibili con `WL-SSR` attivo. | M | Implementato |
| REQ-HS-02 | Il **modello standard** ha **5 spoke generici**: Finance, Commerciale, HR, Operations, Marketing. | Sostituiti dagli spoke del profilo, se presente. | M | Approvato |
| REQ-HS-03 | Il numero di spoke è **variabile** (da 1 a 10) e il layout si adatta automaticamente. | Prova con 1, 3 e 8 spoke senza sovrapposizioni. | S | Approvato |
| REQ-HS-04 | Ogni spoke **riceve semilavorati** (camion con pacchi ciano) e li **personalizza**: report self-service su live connection ai modelli certificati. | Animazione dei camion verso lo spoke e schermo con dashboard personalizzata. | M | Approvato |
| REQ-HS-05 | Ogni spoke può **aggiungere dati locali** (composite model con Excel e liste), rappresentati come un piccolo **deposito proprio** accanto all'officina. | Deposito visibile; il pannello spiega "dati locali + semilavorato = prodotto personalizzato". | M | Approvato |
| REQ-HS-06 | Il pannello di uno spoke distingue le **responsabilità**: il dato core resta dell'hub, il contenuto personalizzato è dello spoke. | Sezione "chi lo gestisce" presente. | M | Approvato |
| REQ-HS-07 | Ogni spoke ha uno **stato proprio** (off/wip/on), indicato nel profilo e modificabile dal vivo, che si combina con quello di `WL-SSR`: racconta quali funzioni sono già attive e quali in arrivo. | Prova: `WL-SSR` attivo, uno spoke in `wip` mostrato come cantiere, uno `off` assente. | M | Approvato |

---

## 11. Configurazione e profili

| ID | Requisito | Criterio di accettazione | Pr. | Stato |
|---|---|---|---|---|
| REQ-CFG-01 | Tutti i contenuti stanno in un unico blocco **`CONFIG`** in cima all'HTML: workload, elementi, colori, spoke, sorgenti e capitoli; i **testi** vengono da `TESTI.md` (REQ-CFG-08). | Il motore non contiene stringhe di contenuto. | M | Approvato |
| REQ-CFG-02 | Un blocco **`PROFILE`**, separato, **sovrascrive** il CONFIG per chiave (merge profondo). Un profilo vuoto equivale al modello standard. | Con `PROFILE = {}` si ottiene esattamente lo standard. | M | Approvato |
| REQ-CFG-03 | Il profilo di un'azienda contiene **solo**: nome dell'azienda, **spoke** (nome + stato on/wip/off), **sorgenti** (nome noto al business + **categoria** + **flusso on/off**), **team dati** (numero di uomini e di donne, al trasporto e a rotazione) e un **contatto** ("a chi rivolgerti"). Tutto il resto (workload, capitoli, percorsi, testi) è standard. **Nessun nome tecnico.** | Il template `profili/PROFILO-TEMPLATE.md` ha esattamente questi campi. | M | Approvato |
| REQ-CFG-04 | Ogni chiave del CONFIG riporta i **REQ** che la governano (campo `reqs` o commento). | Ricerca di `REQ-xx` nel file e ritrovamento della chiave. | M | Approvato |
| REQ-CFG-05 | Il documento di profilo (`profili/<org>.md`) e il blocco `PROFILE` nell'HTML sono **allineati**: il blocco si ricava dal documento. | Ogni campo del blocco esiste nel documento di profilo. | S | Approvato |
| REQ-CFG-06 | Si può **caricare un profilo da file JSON** tramite l'interfaccia, senza modificare l'HTML. | Il pulsante "Carica profilo" applica il JSON alla scena (D-11). | C | Approvato |
| REQ-CFG-07 | Il **modello standard** è pubblicato come pagina web pubblica (GitHub Pages). Il **profilo reale di un'azienda non entra mai nel repository**: sta in `src/profile.local.js`, escluso dal repository, e genera `fabbrica-dati.locale.html`, da usare in locale. | La pagina pubblica mostra solo il modello standard; `git status` non propone mai i file del profilo reale. | M | Approvato |
| REQ-CFG-08 | Tutti i testi visibili stanno in **`TESTI.md`**, la loro **fonte unica**: un titolo con la chiave e sotto il testo libero, modificabile anche da GitHub nel browser. La build verifica che il file sia **completo**, senza chiavi sconosciute né testi vuoti, e che rispetti il **lessico** (REQ-LIT-03); a ogni modifica su `main` un'azione di GitHub rigenera la pagina pubblicata. | Un testo cambiato in `TESTI.md` compare nella pagina; un termine vietato o una chiave sbagliata bloccano la build con l'elenco dei problemi. | M | Implementato |

---

## 12. Requisiti non funzionali

| ID | Requisito | Criterio di accettazione | Pr. | Stato |
|---|---|---|---|---|
| NFR-01 | **Un unico file HTML offline**: three.js e i suoi moduli sono **incorporati**; zero chiamate di rete. | Funziona da disco senza connessione; DevTools → Network non mostra richieste esterne. | M | Approvato |
| NFR-02 | Funziona sulle ultime versioni di **Chrome, Edge e Firefox** desktop. | Verifica manuale sui tre browser. | M | Approvato |
| NFR-03 | **Prestazioni**: ≥ 50 fps su un portatile aziendale medio, con tutti i workload accesi. | Misura con il contatore fps di debug. | S | Approvato |
| NFR-04 | **Nessun dato reale** nel file: i dati delle dashboard sono fittizi e generati. | Revisione del codice. | M | Approvato |
| NFR-05 | **Dimensione** del file ≤ 2 MB. | Controllo della dimensione. | S | Approvato |
| NFR-06 | **Leggibilità del codice**: sezioni delimitate e marcate con i REQ (vedi sotto). | Revisione del codice. | M | Approvato |

### 12.1 Convenzione di marcatura nel codice (REQ-PRC-01)

```js
/* ===== [REQ-WL-03] Rappresentazione workload in stato WIP (cantiere) ===== */
function buildConstructionSite(workload) { ... }

// [REQ-FLW-09] il flusso si anima solo se tutti i workload attraversati sono 'on'
```

```js
const CONFIG = {
  workloads: {
    TRF: { reqs: ['REQ-WL-10','REQ-FLW-04','REQ-FLW-05','REQ-FLW-06'], name: 'Data Transformation', ... }
  }
}
```

| ID | Requisito | Criterio di accettazione | Pr. | Stato |
|---|---|---|---|---|
| REQ-PRC-01 | Ogni sezione di codice e ogni chiave del CONFIG riporta l'ID del requisito che implementa. | Nessuna sezione "orfana" alla revisione. | M | Approvato |
| REQ-PRC-02 | Ogni modifica passa dal flusso del §0.1, con una **RDM** registrata (§15). | Ogni riga di changelog rimanda a una RDM. | M | Approvato |
| REQ-PRC-03 | La matrice di tracciabilità (§13) è aggiornata **nello stesso momento** in cui cambia il codice. | La matrice è allineata al codice a ogni versione. | M | Approvato |

---

## 13. Matrice di tracciabilità

> Da compilare durante l'implementazione. La colonna "Codice" indica la sezione marcata o la chiave del CONFIG.

| Requisito | Workload | Codice (sezione / chiave CONFIG) | Verifica | Stato |
|---|---|---|---|---|
| REQ-WL-01…08 | tutti | `src/engine/state.js` · `src/engine/builders.js` (cantiere) · `CONFIG.workloads.*.stato` | `npm test` | Implementato |
| REQ-WL-10…12 | tutti | `CONFIG.workloads` · `CONFIG.elements` · `src/engine/state.js` | `npm test` | Implementato |
| REQ-FLW-01…03 | WL-INT | `src/engine/reparti.js` (lago, pontile, bronze) · `src/engine/sources.js` (scivoli, scialuppe) · `CONFIG.flussi` | `npm test` | Implementato |
| REQ-SRC-01…05, 07…09 | WL-INT | `CONFIG.sources` · `CONFIG.categorie` · `CONFIG.modalita` · `src/engine/sources.js` | `npm test` | Implementato |
| REQ-SRC-06 | WL-RTI | `src/engine/sources.js` (nastro veloce) | `npm test` | Implementato |
| REQ-SRC-10 | narrativa | `CONFIG.chapters` | — | Approvato |
| REQ-FLW-04…06 | WL-TRF | `src/engine/reparti.js` (silver, gold, confezionamento) · `CONFIG.flussi` | `npm test` | Implementato |
| REQ-FLW-07 | WL-VIS, WL-SSR | `CONFIG.flussi.uscite` · `src/engine/spoke.js` (furgoni) | `npm test` | Implementato |
| REQ-FLW-08…09 | — | `src/engine/flows.js` · `CONFIG.materiali` · legenda in `src/engine/ui.js` | `npm test` | Implementato |
| REQ-FLW-10 | WL-RTI | `src/engine/sources.js` (nastro veloce) · `src/engine/trasversali.js` | `npm test` | Implementato |
| REQ-FLW-11 | WL-KNW | `src/engine/trasversali.js` (archiviotecnico) | schermate | Implementato |
| REQ-SCN-01…10 | tutti | `src/engine/scene.js` · `builders.js` · `reparti.js` · `spoke.js` · `trasversali.js` · `CONFIG.layout` · `CONFIG.elements` | `npm test` + schermate | Implementato |
| REQ-SCN-11…14 | tutti | `src/engine/figures.js` · `src/engine/spoke.js` (ufficio) · `CONFIG.team` | `npm test` | Implementato |
| REQ-NAR-01…08 | — | `engine/narrator` · `CONFIG.chapters` | — | Approvato |
| REQ-PER-01…07 | trasversale | `CONFIG.paths` · `engine/pathPlayer` | — | Approvato |
| REQ-LIT-01…02 | trasversale | `TESTI.md` (`fabbrica`, `perTe`) · `src/engine/ui.js` (scheda) | `npm test` | Implementato |
| REQ-LIT-03 | trasversale | `tools/testi.mjs` (controllo del lessico in build) | `npm run build` | Implementato |
| REQ-LIT-04…06 | trasversale | `src/engine/ui.js` (benvenuto) · `CONFIG.paths` | — | Approvato |
| REQ-UI-01…12 | — | `engine/ui` · `engine/camera` · `engine/modes` | — | Approvato |
| REQ-HS-01…07 | WL-SSR | `CONFIG.spokes` · `CONFIG.spoke` · `src/engine/spoke.js` | `npm test` | Implementato |
| REQ-CFG-01…08 | — | `src/config.js` · `src/profile.js` · `src/main.js` · `build.mjs` · `.gitignore` | — | Approvato |
| NFR-01…06 | — | build/packaging | — | Approvato |

### 13.1 Copertura degli obiettivi di apprendimento

| Obiettivo | Requisiti che lo realizzano | Copertura |
|---|---|---|
| LO-01 Lavoro del team data | REQ-SCN-11 (figure del team data nei reparti), REQ-NAR-01…05 (costruzione in presentazione), REQ-UI-09 (costruzione dal vivo), REQ-WL-*, REQ-HS-06, REQ-LIT-01…02, REQ-PER-* (l'hub in azione) | Coperto |
| LO-02 Cosa esiste già | REQ-HS-07 e REQ-SRC-08 (stato di spoke e sorgenti dal profilo), REQ-NAR-08 (la narrativa termina sull'as-is), REQ-UI-09 (ritocchi dal vivo), REQ-SCN-12 | Coperto |
| LO-03 Viaggio del dato | Percorso PER-NEW (§8.1.1), REQ-FLW-01…09, REQ-SRC-*, REQ-LIT-* | Coperto |
| *Abilitatori* | REQ-CFG-*, REQ-PRC-*, NFR-*, REQ-UI-*, REQ-SCN-* | — |
| *Contenuti opzionali* | WL-FIN, WL-RTI, WL-KNW, PER-ONB, REQ-SRC-05: restano nel modello; il presentatore decide se raccontarli | — |

---

## 14. Registro decisioni

| ID | Decisione | Origine | Stato |
|---|---|---|---|
| D-01 | Output in **HTML** (non artifact), con un documento dei requisiti in **Markdown** accanto. | Utente | Confermata |
| D-02 | **Landing = file su OneLake**; **Bronze, Silver e Gold = Warehouse**. | Utente | Confermata |
| D-03 | Stati dei workload: **off = assente**, **wip = cantiere**, **on = attivo**. | Utente | Confermata |
| D-04 | Nel modello standard **tutti i workload partono `off`**; la fabbrica si costruisce durante la presentazione. | Utente | Confermata |
| D-05 | Architettura, Accessi, Security, Data Governance (governo e monitoraggio insieme) e Costi sono **workload** a pieno titolo. | Utente | Confermata |
| D-06 | Anche i workload `off` restano **elencati nel pannello**, così si possono accendere dal vivo. | Utente | Confermata |
| D-07 | Accendere un workload accende solo quello; se manca un workload a monte, resta fermo e il buco si vede (REQ-WL-06). | Utente | Confermata |
| D-08 | La **narrativa** è lo strumento della presentazione; ordine dei workload, nel pannello e nei capitoli: SRC → ARC → INT → TRF → SEC → ACC → VIS → SSR → GOV → FIN → KNW → RTI. | Utente | Confermata |
| D-09 | Gli spoke sono **officine**: personalizzano i semilavorati e aggiungono dati locali (composite model), senza una propria linea di produzione. | Utente | Confermata |
| D-10 | **Un unico file offline**, con three.js incorporato. | Utente | Confermata |
| D-11 | Personalizzazione tramite **profilo separato** (`profili/<org>.md` → blocco `PROFILE`); caricamento da JSON solo in futuro (REQ-CFG-06, priorità C). | Utente | Confermata |
| D-12 | Solo italiano; testi nel CONFIG per un eventuale multilingua futuro. | Utente | Confermata |
| D-13 | 5 spoke **generici** nello standard; quelli reali vanno nel profilo. | Utente | Confermata |
| D-14 | Livello **concettuale** nello standard; il profilo personalizza solo con elementi riconoscibili dal business, **senza mappatura tecnica** (vedi D-26). | Utente | Confermata |
| D-15 | Layout **a valle verso il pubblico**: sorgenti sul fondo, hub al centro, spoke in primo piano (REQ-SCN-01). | Utente | Confermata |
| D-16 | Di una sorgente si rappresentano **categoria** (forma dell'edificio) e **modalità** (mezzo di trasporto). | Utente | Confermata |
| D-17 | Tutto il materiale passa dal **lago** (il Landing): nessuna strada tra fornitori e fabbrica; il **mirroring non è rappresentato**. | Utente | Confermata |
| D-18 | *Nota tecnica per gli autori*: gli shortcut sono una funzione del **Lakehouse** in OneLake; in scena il ponte di vetro termina nel lago. | Utente | Confermata |
| D-19 | Le sorgenti hanno uno **stato proprio** off/wip/on, combinato con WL-INT. | Utente | Confermata |
| D-20 | Percorsi standard: **Incident, Change request, New project, Onboarding funzione**. | Utente | Confermata |
| D-21 | I percorsi si visualizzano **solo con l'evidenziazione** (linea luminosa, tappe numerate, resto attenuato). | Utente | Confermata |
| D-22 | Le tappe su workload `off`/`wip` vengono **saltate**. | Utente | Confermata |
| D-23 | **Lessico** (§1.2): ammessi report, Power BI, dato certificato, Bronze/Silver/Gold; tutto il resto si traduce. I termini originali compaiono **solo come nome tecnico nella scheda** (campo `tecnico`, escluso dal controllo del lessico). | Utente | Confermata |
| D-24 | Elementi **sportello dell'hub** (GOV) e **laboratorio prove** (ARC), necessari ai percorsi. | Utente | Confermata |
| D-25 | Il pubblico primario sono le **funzioni aziendali non tecniche** (alfabetizzazione); il pubblico IT è secondario. | Utente | Confermata |
| D-26 | **Scopo formativo, non documentazione dell'as-is** (P-05): niente dettagli tecnici nell'HTML, profilo senza nomi tecnici. | Utente | Confermata |
| D-27 | Il viaggio del dato (LO-03) si mostra con il percorso **New project**: non serve un meccanismo dedicato. | Utente | Confermata |
| D-28 | Il lavoro del team data (LO-01) si rende visibile con **una figura per ogni persona del team**, al trasporto o a rotazione tra le postazioni (REQ-SCN-11). | Utente | Confermata |
| D-29 | L'as-is di business (LO-02) **lo costruisce il presentatore dal vivo** cambiando gli stati; non serve una vista "oggi" dedicata. | Utente | Confermata |
| D-30 | I contenuti non legati agli obiettivi restano nel modello con la loro priorità; il presentatore sceglie se raccontarli. | Utente | Confermata |
| D-31 | Le sorgenti **non sono legate agli spoke**: stanno tutte nell'area fornitori (REQ-SRC-07). | Utente | Confermata |
| D-32 | **Profilo minimo** per azienda: spoke (nome e stato), sorgenti (nome, categoria, flusso on/off), team dati (uomini e donne), contatto. La modalità di acquisizione deriva dalla categoria; capitoli, percorsi e testi sono standard. | Utente | Confermata |
| D-33 | Due modalità: **narrativa** (la presentazione: Avanti → tutti i workload in ordine) ed **esplorazione libera** (dal vivo, con stati modificabili e percorsi). | Utente | Confermata |
| D-34 | Si progetta l'intero modello; **quali capitoli entrano nella presentazione** si decide dopo le prove in esplorazione libera (REQ-NAR-02). | Utente | Confermata |
| D-35 | Il percorso New project contiene **solo le tappe del viaggio del dato**: sorgente, lavorazione, semilavorato, report. | Utente | Confermata |
| D-36 | Team dati di default: **5 figure**, 2 al trasporto e 3 a rotazione tra cabina di controllo, ufficio di coordinamento e showroom. La "cabina di controllo" è una sola postazione per **governance e architettura insieme**, nella torre di controllo: è attiva se `WL-GOV` o `WL-ARC` è `on`. L'ufficio di coordinamento (project management di tutti gli operatori) appartiene a `WL-ARC`; composizione di default: 2 uomini al trasporto (uno fa scorrere il materiale verso il lago, uno lo pesca e lo porta nel Bronze), 1 donna + 2 uomini a rotazione. | Utente (team, postazioni, composizione) · interpretazione (workload delle postazioni) | Confermata |
| D-37 | Pubblicazione su **GitHub Pages** del solo modello standard; i profili aziendali reali restano in locale, fuori dal repository pubblico. | Utente | Confermata |
| D-38 | I testi si rivedono in **`TESTI.md`** (Markdown, una chiave per titolo), fonte unica letta dalla build; la pagina pubblica si rigenera da sola con un'azione di GitHub. | Utente (file modificabile su GitHub) · proposta (formato e automazione) | Confermata |
| D-39 | Lo **showroom è staccato** dal capannone; il **laboratorio prove** entra nel capannone e **ogni semilavorato passa dal collaudo** prima di andare allo showroom e agli spoke. | Utente | Confermata |
| D-40 | Le sorgenti sono classificate per **categoria di software** (ERP, CRM, PIM, HR…), e si accendono **una alla volta** da una tendina nel pannello; la tendina vale anche per gli spoke. | Utente (categorie, tendina) · proposta (elenco delle categorie, tendina per gli spoke) | Confermata |
| D-41 | Pannello **Team dati** in alto a destra: un pupazzino per persona, evidenziato in scena al clic. | Utente | Confermata |
| D-42 | **OneLake è un lago tra i fornitori e la fabbrica** (il Landing): le sorgenti ci arrivano con scivoli e scialuppe, il team dati tiene scorrevole il flusso e pesca il materiale dal pontile per portarlo nel Bronze. Al posto della riserva sotto il pavimento e della banchina di scarico. | Utente | Confermata |
| D-43 | Il **laboratorio prove** appartiene alla **Data Transformation**. | Utente | Confermata |
| D-44 | **Governance e Monitoraggio** diventano un unico workload, **Data Governance**; i workload sono 11, nell'ordine di D-08. | Utente | Confermata |
| D-45 | **Data Sources** è un workload separato dalla Data Integration: i fornitori da una parte, il trasporto e il Bronze dall'altra. | Utente | Confermata |
| D-46 | Di default Data Sources è `on` e **tutte le sorgenti sono spente**: si accendono una alla volta dalla tendina. | Utente | Confermata |
| D-47 | I due del team alla Data Integration: uno costruisce e ripara gli scivoli, l'altro manovra dal pannello le gru che pescano dal lago e riempiono il Bronze. | Utente | Confermata |
| D-48 | Ogni concetto ha nella **scheda** (mai nel nome) il suo **nome tecnico**: Lago dei dati (OneLake), Semilavorati (Semantic model)… | Utente | Confermata |
| D-49 | **Data Sources** è il primo workload; segue **Data Architecture** (nuovo nome dell'Architettura). | Utente | Confermata |

---

## 15. Richieste di modifica (RDM)

### 15.1 Template

```markdown
### RDM-<NNN> — <titolo breve>
- Data / Richiedente:
- Descrizione (parole del richiedente):
- Classificazione: Standard | Profilo <org>   ·  Area: <PRC|WL|FLW|SRC|SCN|UI|NAR|PER|LIT|HS|CFG|NFR>  ·  Workload: <WL-xxx | —>
- Requisiti: nuovi <REQ-…> · modificati <REQ-…> · nessuno (motivare)
- Decisioni coinvolte: <D-…>
- Impatto (CONFIG / codice / profili):
- Esito: Approvata | Sospesa  ·  Data:
- Implementata in versione:
```

### 15.2 Registro

| RDM | Titolo | Classificazione | Requisiti | Esito |
|---|---|---|---|---|
| RDM-001 | Fabbrica 3D hub & spoke su Fabric (richiesta iniziale) | Standard | OBJ-01…05, REQ-FLW-*, REQ-SCN-*, REQ-HS-* | Approvata |
| RDM-002 | Documento dei requisiti tracciato sul codice | Standard | REQ-PRC-01…03, REQ-CFG-04 | Approvata |
| RDM-003 | Stati on/off/wip, tutto off di default, costruzione narrata, workload trasversali | Standard | REQ-WL-01…08, REQ-NAR-*, D-03…05 | Approvata |
| RDM-004 | Personalizzazione per organizzazione tramite profilo | Standard | REQ-CFG-02…06, D-11, D-14 | Approvata |
| RDM-005 | Approfondire la rappresentazione delle data sources | Standard · Area FLW/SCN · WL-INT (+ WL-RTI) | REQ-SRC-01…10, REQ-FLW-01, REQ-SCN-01, D-15…19 | Approvata |
| RDM-006 | Percorsi selezionabili (incident, change request, new project) che attraversano la fabbrica | Standard · nuova area PER · trasversale | REQ-PER-01…07, REQ-SCN-09…10, D-20…22, D-24 | Approvata |
| RDM-007 | L'output serve ad **alfabetizzare** le funzioni aziendali che non conoscono la piattaforma | Standard · nuova area LIT · trasversale | OBJ-01, P-01…04, REQ-LIT-01…06, §1.2 Lessico, D-23, D-25 | Approvata |
| RDM-008 | Nessun dettaglio tecnico: pubblico business, scopo formativo, non documentazione dell'as-is | Standard · LIT, UI, CFG, SRC, PER | P-05, D-23, D-26, REQ-LIT-02, REQ-FLW-02…03, REQ-SRC-09, REQ-PER-04, REQ-UI-02, REQ-CFG-03 | Approvata |
| RDM-009 | Obiettivi del meeting di envisioning: i manager devono capire il lavoro del team data, cosa esiste già e il viaggio del dato dalla sorgente all'insight | Standard · trasversale | LO-01…03, §1.3, §13.1, REQ-SCN-11…12, REQ-UI-09, REQ-HS-07, PER-NEW, D-27…30 | Approvata |
| RDM-010 | Chiusura delle decisioni aperte (pannello, dipendenze, narrativa, spoke, layout, sorgenti, lingua, shortcut/mirroring, sportello e laboratorio) | Standard · trasversale | D-06…09, D-12, D-15, D-18, D-24, D-31; REQ-WL-06, REQ-SRC-07, REQ-SCN-01, REQ-SCN-05, REQ-NAR-* | Approvata |
| RDM-011 | Profilo aziendale con nomi degli spoke, sorgenti con categoria, flussi on/off; due modalità (esplorazione libera e narrativa) | Standard · CFG, SRC, UI, NAR | D-32, D-33, OBJ-04, REQ-CFG-03, REQ-SRC-09, REQ-UI-10, REQ-LIT-02 | Approvata |
| RDM-012 | Esito della review: stato degli spoke e contatto nel profilo, New project con le sole tappe del viaggio del dato, capitoli includibili/escludibili | Standard · CFG, HS, NAR, PER, LIT | REQ-CFG-03, REQ-HS-07, REQ-LIT-02, REQ-NAR-02, REQ-NAR-08, PER-NEW, D-32, D-34, D-35 | Approvata |
| RDM-013 | Team dati nel profilo (numero di uomini e donne); default 2 al trasporto + 3 a rotazione tra cabina di controllo, coordinamento e showroom | Standard · SCN, CFG | REQ-SCN-11, REQ-SCN-13, REQ-CFG-03, D-28, D-32, D-36 | Approvata |
| RDM-014 | Pubblicare la fabbrica su una GitHub Page | Standard · CFG | REQ-CFG-07, D-37 | Approvata |
| RDM-015 | Rivedere etichette e contenuti testuali da un file, modificabile velocemente su GitHub | Standard · CFG, LIT | REQ-CFG-01, REQ-CFG-08, REQ-LIT-03, D-38 | Approvata |
| RDM-016 | Showroom staccato dal capannone; i semilavorati passano prima dal laboratorio prove | Standard · FLW, SCN | REQ-FLW-07, REQ-SCN-10, REQ-SCN-14, D-39 | Approvata |
| RDM-017 | Sorgenti per categoria di software, accendibili una alla volta da una tendina | Standard · SRC, UI, CFG | §6.1.2, §6.1.5, REQ-SRC-02, REQ-UI-11, D-40 | Approvata |
| RDM-018 | Pannello dei pupazzini del team dati, evidenziati al clic | Standard · UI, SCN | REQ-UI-12, D-41 | Approvata |
| RDM-019 | OneLake tra le sorgenti e la fabbrica; il team integration fa scorrere i dati (scivoli, scialuppe) e li pesca per portarli nel Bronze | Standard · FLW, SRC, SCN | REQ-FLW-02, REQ-SCN-04, REQ-SRC-04, REQ-HS-01, §6.1.3, D-17, D-42 | Approvata |
| RDM-020 | Il laboratorio prove entra con la Data Transformation | Standard · SCN | REQ-SCN-10, D-43 | Approvata |
| RDM-021 | Governance e Monitoraggio in un unico workload, Data Governance; nuovo ordine dei workload | Standard · WL, NAR | §5.1, §5.2, REQ-WL-08, REQ-WL-10, REQ-UI-03, REQ-NAR-02, REQ-SCN-03, D-05, D-08, D-44 | Approvata |
| RDM-022 | Separare Data Sources da Data Integration; Data Sources acceso di default con tutte le sorgenti spente | Standard · WL, SRC, FLW | §5.1, §5.2, REQ-WL-05, REQ-FLW-01, REQ-SRC-08, D-45, D-46 | Approvata |
| RDM-023 | Lago più evidente; nessuna strada tra sorgenti e fabbrica: tutto finisce nel lago e viene recuperato | Standard · SRC, SCN | REQ-SRC-04, REQ-SRC-05, §6.1.3, D-17 | Approvata |
| RDM-024 | Togliere il mirroring; un operatore ripara gli scivoli, l'altro manovra le gru dal pannello | Standard · SRC, SCN | §6.1.2, §6.1.3, REQ-SCN-11, D-17, D-47 | Approvata |
| RDM-025 | L'area fornitori vuota sembra sospesa: va resa leggibile anche con le sorgenti spente | Standard · SRC, SCN | REQ-SRC-07 | Approvata |
| RDM-026 | Ogni concetto mostra nella scheda, non nel nome, il nome tecnico che richiama | Standard · UI, LIT, CFG | P-05, §1.2, REQ-UI-02, D-23, D-48 | Approvata |
| RDM-027 | Data Sources come primo workload, poi Data Architecture | Standard · WL, NAR | §5.1, REQ-NAR-02, D-08, D-49 | Approvata |

---

## 16. Changelog

| Versione | Data | Modifica | RDM |
|---|---|---|---|
| 1.8 | 2026-11-12 | Requisiti approvati: base per l'implementazione | RDM-001…027 |
