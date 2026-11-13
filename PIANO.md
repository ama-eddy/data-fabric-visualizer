# Data Platform as a Fabric — Piano di implementazione

> Realizza `REQUISITI.md` a **batch**. Ogni batch è pensato per stare in **una sessione di lavoro** e si chiude con un file `data-platform-as-a-fabric.html` **funzionante e provabile**.

## Regole comuni a tutti i batch

1. **Si parte dai file salvati**: `REQUISITI.md`, `PIANO.md`, `profili/`, `src/`, `build.mjs`. Ogni sessione riparte da lì, senza bisogno di ricordare la conversazione precedente.
2. **Sorgenti separati, consegna in un file unico**: il codice vive in `src/` (un file per modulo); `npm run build` (`build.mjs`) lo unisce con three.js in `data-platform-as-a-fabric.html`, unico e offline (NFR-01).
3. **Ogni blocco di codice porta il suo `[REQ-…]`** (REQ-PRC-01).
4. **Chiusura di ogni batch**: build, prova automatica nel browser con schermate, aggiornamento della matrice di tracciabilità (§13 dei requisiti) e della tabella "Stato" qui sotto.
5. **Se la sessione finisce prima del batch**: ci si ferma all'ultimo punto funzionante e la tabella "Stato" dice da dove riprendere.
6. **Una richiesta nuova durante un batch** passa prima da una RDM nei requisiti, poi diventa codice.

## I batch

| # | Batch | Cosa si vede alla fine | Requisiti |
|---|---|---|---|
| 1 | **Motore e fondamenta** | Terreno vuoto; pannello con i workload e selettore off/wip/on; accendendo Data Architecture compaiono capannone, centrale e lago dei dati, con animazione di costruzione; cantiere generico per lo stato wip; clic su un elemento → scheda; navigazione libera | REQ-CFG-01/02/04 · REQ-WL-01…08, 10…12 · REQ-SCN-01/04/06/08/10 · REQ-UI-01…07, 09 · REQ-LIT-01/02 · NFR-01/04/06 |
| 2 | **Catena del valore** | Sorgenti (per categoria di software, 5 mezzi di trasporto) → lago dei dati → pontile → Bronze → Silver → Gold → confezionamento, con materiale che cambia aspetto; i flussi si fermano dove manca un workload a monte; legenda | REQ-FLW-01…06, 08, 09 · REQ-SRC-01…05, 07…09 · REQ-SCN-02 |
| 3 | **Consumo, spoke e persone** | Showroom dell'hub; negozi degli spoke con deposito dei dati locali e furgoni dei semilavorati; figure del team dati (trasporto e rotazione tra le postazioni) e delle funzioni nei negozi; ufficio di coordinamento; profilo aziendale applicato (spoke, sorgenti, flussi, team, contatto) con un profilo di esempio | REQ-FLW-07 · REQ-HS-01…07 · REQ-SCN-07/11/12/13 · REQ-CFG-03/05 |
| 4 | **Workload trasversali e opzionali** | Accessi, Security, Governance (con sportello dell'hub), Monitoraggio, Costi; Real-Time e Knowledge. **A questo punto l'esplorazione libera è completa: si può provare tutto e decidere cosa entra nella presentazione** | REQ-SCN-03/05/09 · REQ-FLW-10/11 · REQ-SRC-06 |
| 5 | **Narrativa e percorsi** | Modalità narrativa con Avanti/Indietro, tastiera e telecomando; capitoli includibili/escludibili; i 4 percorsi con linea luminosa e tappe; schermata di benvenuto; testi rivisti sul lessico | REQ-NAR-01…08 · REQ-PER-01…07 · REQ-UI-10 · REQ-LIT-03…06 · REQ-SRC-10 |
| 6 | **Collaudo e rifinitura** | Verifica di tutti i criteri di accettazione; prestazioni; prova su Chrome, Edge, Firefox; matrice di tracciabilità completa; profilo reale dell'azienda | NFR-02/03/05 · REQ-UI-08 · REQ-PRC-01…03 · REQ-CFG-06 (se avanza tempo) |

**Tra il batch 4 e il 5** c'è una pausa voluta: prove in esplorazione libera, poi scelta dei capitoli e stesura dei testi della narrazione (D-34).

## Come si lavora

```bash
npm install      # una volta, all'inizio della sessione
npm run build    # rigenera data-platform-as-a-fabric.html
npm test         # prova automatica nel browser, schermate in tests/out/
npm run testi    # aggiunge a TESTI.md i testi nuovi del CONFIG
```

**Testi**: si modificano in `TESTI.md`, anche da GitHub nel browser. La build controlla completezza e lessico; un'azione di GitHub rigenera `data-platform-as-a-fabric.html` a ogni modifica su `main`.

## Stato

| Batch | Stato | Note / da dove riprendere |
|---|---|---|
| 1 | **Completato** | Prova automatica superata (`npm test`). Gli altri workload hanno un **segnaposto** (volume colorato) al posto degli edifici definitivi. Restano da fare nei loro batch: REQ-UI-08 (schermi piccoli), prove su Edge e Firefox. Il pulsante "Pausa flussi" c'è ma i flussi arrivano nel batch 2. |
| 2 | **Completato** | Prova automatica superata. Il nastro veloce dei sensori (streaming) arriva con il Real-Time nel batch 4: per ora la sorgente "Sensori" c'è ma non ha trasporto. Dalle spedizioni non parte ancora nulla verso gli spoke (batch 3). |
| 3 | **Completato** | Prova automatica superata, anche con il profilo di esempio (`src/profile.esempio.js`, azienda inventata). Le strade verso gli spoke attraversano per ora i segnaposto di cancelli e recinzione: si sistemano nel batch 4. |
| 4 | **Completato** | Prova automatica superata. Non resta nessun segnaposto: l'esplorazione libera è completa. **Prossimo passo: prove dell'utente e scelta dei capitoli della narrazione (D-34), poi batch 5.** |
| — | **Modifiche dopo le prove** | RDM-015…027, tutte implementate e verificate: testi in `TESTI.md`, lago dei dati con scivoli, scialuppe e gru, Data Sources separato, sorgenti per categoria con tendina, pannello del team, showroom staccato, Data Governance unico, nome tecnico nelle schede. |
| 5 | **Completato** | Prova automatica superata: narrativa (14 capitoli, tastiera e telecomando), 4 percorsi sul nuovo layout, benvenuto, cambio di modalità. Testi di capitoli e tappe **provvisori**: da rivedere in `TESTI.md`. La scelta dei capitoli si fa con `incluso: false` in `CONFIG.chapters`. |
| 6 | **In corso** | Fatti: schermi piccoli (pannello richiudibile), contatore fps (`?fps` nell'indirizzo), stati dei requisiti allineati. Restano: prova su Edge e Firefox (da fare a mano), misura delle prestazioni sul PC del meeting con `?fps`, profilo reale dell'azienda, video di riserva, caricamento del profilo da file (priorità bassa). |
| 7 | **Completato** | Team componibile a schermo (RDM-033), prova automatica superata. Insieme: etichetta dell'area fornitori tolta (RDM-034), spoke come negozi dentro la recinzione (RDM-035), metodo di integrazione per sorgente nel profilo con lo scivolo di vetro per il mirroring (RDM-036). |
| 8 | **Completato** | Zona clienti (RDM-039): due cinte, ingresso clienti, showroom oltre la cinta interna, clienti in cammino. Insieme: team che parte da zero (RDM-037), macchinetta del caffè accanto alla centrale (RDM-038), Data Sources senza persone del team (RDM-040), nuovo nome del progetto e dei file (RDM-041). Prova automatica superata. |
