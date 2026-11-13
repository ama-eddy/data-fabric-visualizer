# Profilo azienda — <NOME AZIENDA>

> Personalizza il **modello standard** descritto in `../REQUISITI.md` (REQ-CFG-02…05, D-32).
> Contiene **solo** ciò che cambia da un'azienda all'altra: spoke, sorgenti con categoria e flusso, team dati, contatto. Tutto il resto è standard.
> Usare i nomi con cui le persone conoscono funzioni e sistemi: **nessun nome tecnico** (D-26).
> Il blocco `PROFILE` nell'HTML si ricava da questo documento (REQ-CFG-05).
> **Il profilo compilato non va caricato nel repository**, che è pubblico: resta in locale (REQ-CFG-07).

| Campo | Valore |
|---|---|
| Azienda | |
| Basato su standard | REQUISITI.md v1.15 |

---

## 1. Spoke (REQ-HS-02, REQ-HS-07)

> Le funzioni aziendali che hanno, o avranno, un negozio. Sostituiscono i 5 spoke generici dello standard.
> **Stato**: `on` = negozio attiva oggi · `wip` = in costruzione · `off` = non ancora prevista.

| Nome dello spoke | Stato (on/wip/off) |
|---|---|
| | |

## 2. Sorgenti e flussi (REQ-SRC-01…10)

> Sostituiscono il catalogo standard (REQUISITI §6.1.5).
> **Categoria** (tipo di software): `erp` · `crm` · `pim` · `hr` · `mes` (produzione e magazzino) · `ecommerce` · `marketing` · `excel` (fogli di calcolo) · `iot` (sensori) · `esterni` · `datalake`.
> **Metodo** di integrazione: `copia` (scivolo) · `tempo reale` (nastro veloce) · `mirroring` (scivolo di vetro). Se manca, vale quello tipico della categoria.
> **Flusso**: `on` = il materiale arriva già oggi alla fabbrica · `off` = non ancora collegata.

| Nome della sorgente | Categoria | Metodo | Flusso (on/off) |
|---|---|---|---|
| | | | |

## 3. Team dati di partenza (REQ-SCN-11, REQ-UI-12…14)

> Una riga per persona: è il team con cui si apre la fabbrica. Lasciare vuoto per partire con 5 persone non assegnate.
> **Sagoma**: `uomo` o `donna`. **Nome**: facoltativo, compare sotto il pupazzino (nel modello standard i nomi non ci sono). **Workload**: nessuno, uno o più, tra tutti i 13:
> Data Sources, Data Architecture, Project Management, Data Integration, Data Transformation, Security, Accessi, Data Visualization, Self-service, Data Governance, Monitoraggio costi, Knowledge, Real-Time.
> Dal vivo si può cambiare tutto: aggiungere e togliere persone, spostare le assegnazioni.

| Sagoma | Nome | Workload assegnati |
|---|---|---|
| | | |

## 4. Contatto (REQ-LIT-02)

> Compare in tutte le schede alla voce "A chi rivolgerti".

| Chi (team o persona) | Come contattarlo |
|---|---|
| | |
