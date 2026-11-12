# Profilo azienda — <NOME AZIENDA>

> Personalizza il **modello standard** descritto in `../REQUISITI.md` (REQ-CFG-02…05, D-32).
> Contiene **solo** ciò che cambia da un'azienda all'altra: spoke, sorgenti con categoria e flusso, team dati, contatto. Tutto il resto è standard.
> Usare i nomi con cui le persone conoscono funzioni e sistemi: **nessun nome tecnico** (D-26).
> Il blocco `PROFILE` nell'HTML si ricava da questo documento (REQ-CFG-05).

| Campo | Valore |
|---|---|
| Azienda | |
| Basato su standard | REQUISITI.md v1.1 |

---

## 1. Spoke (REQ-HS-02, REQ-HS-07)

> Le funzioni aziendali che hanno, o avranno, un'officina. Sostituiscono i 5 spoke generici dello standard.
> **Stato**: `on` = officina attiva oggi · `wip` = in costruzione · `off` = non ancora prevista.

| Nome dello spoke | Stato (on/wip/off) |
|---|---|
| | |

## 2. Sorgenti e flussi (REQ-SRC-01…10)

> Sostituiscono il catalogo standard (REQUISITI.md §6.1.5).
> **Categoria**: `erp` · `crm` · `db` · `file` · `api` · `iot` · `esterni` · `storage` (forma dell'edificio e mezzo di trasporto: §6.1.2).
> **Flusso**: `on` = il materiale arriva già oggi alla fabbrica · `off` = non ancora collegata.

| Nome della sorgente | Categoria | Flusso (on/off) |
|---|---|---|
| | | |

## 3. Team dati (REQ-SCN-11)

> Una figura per ogni persona reale del team. Lasciare vuoto per usare il default (5 figure: 2 al trasporto, 3 a rotazione).
> **Trasporto**: portano il materiale dalla sorgente alla banchina e dalla banchina al Bronze.
> **Rotazione**: si alternano tra cabina di controllo, ufficio di coordinamento e showroom.

| Gruppo | Uomini | Donne |
|---|---|---|
| Trasporto | | |
| Rotazione | | |

## 4. Contatto (REQ-LIT-02)

> Compare in tutte le schede alla voce "A chi rivolgerti".

| Chi (team o persona) | Come contattarlo |
|---|---|
| | |
