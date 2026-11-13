# Profilo azienda — <NOME AZIENDA>

> Personalizza il **modello standard** descritto in `../REQUISITI.md` (REQ-CFG-02…05, D-32).
> Contiene **solo** ciò che cambia da un'azienda all'altra: spoke, sorgenti con categoria e flusso, team dati, contatto. Tutto il resto è standard.
> Usare i nomi con cui le persone conoscono funzioni e sistemi: **nessun nome tecnico** (D-26).
> Il blocco `PROFILE` nell'HTML si ricava da questo documento (REQ-CFG-05).
> **Il profilo compilato non va caricato nel repository**, che è pubblico: resta in locale (REQ-CFG-07).

| Campo | Valore |
|---|---|
| Azienda | |
| Basato su standard | REQUISITI.md v1.13 |

---

## 1. Spoke (REQ-HS-02, REQ-HS-07)

> Le funzioni aziendali che hanno, o avranno, un'officina. Sostituiscono i 5 spoke generici dello standard.
> **Stato**: `on` = officina attiva oggi · `wip` = in costruzione · `off` = non ancora prevista.

| Nome dello spoke | Stato (on/wip/off) |
|---|---|
| | |

## 2. Sorgenti e flussi (REQ-SRC-01…10)

> Sostituiscono il catalogo standard (REQUISITI.md §6.1.5).
> **Categoria** (tipo di software): `erp` · `crm` · `pim` · `hr` · `mes` (produzione e magazzino) · `ecommerce` · `marketing` · `excel` (fogli di calcolo) · `iot` (sensori) · `esterni` · `datalake` — forma dell'edificio e mezzo di trasporto: REQUISITI §6.1.2.
> **Flusso**: `on` = il materiale arriva già oggi alla fabbrica · `off` = non ancora collegata.

| Nome della sorgente | Categoria | Flusso (on/off) |
|---|---|---|
| | | |

## 3. Team dati di partenza (REQ-SCN-11, REQ-UI-12…14)

> Una riga per persona: è il team con cui si apre la fabbrica. Lasciare vuoto per partire con 5 persone non assegnate.
> **Sagoma**: `uomo` o `donna`. **Nome**: facoltativo. **Workload**: nessuno, uno o più, tra
> Data Architecture, Project Management, Data Integration, Data Transformation, Security, Accessi, Data Visualization, Data Governance, Monitoraggio costi, Knowledge, Real-Time.
> Dal vivo si può cambiare tutto: aggiungere e togliere persone, spostare le assegnazioni.

| Sagoma | Nome (facoltativo) | Workload assegnati |
|---|---|---|
| | | |

## 4. Contatto (REQ-LIT-02)

> Compare in tutte le schede alla voce "A chi rivolgerti".

| Chi (team o persona) | Come contattarlo |
|---|---|
| | |
