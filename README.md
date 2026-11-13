# Data Platform as a Fabric

Metafora 3D esplorabile di una data platform hub & spoke, pensata per spiegarla alle funzioni aziendali.

- `REQUISITI.md` — requisiti, decisioni e tracciabilità: **ogni richiesta passa da qui prima di diventare codice**
- `PIANO.md` — piano di implementazione a batch, con lo stato di avanzamento
- `TESTI.md` — **tutti i testi della pagina**: si modificano qui, anche da GitHub nel browser
- `profili/` — profili aziendali (template incluso)

## Uso

Aprire `data-platform-as-a-fabric.html` nel browser: è un file unico e funziona senza connessione.

Per modificarlo: i sorgenti sono in `src/` (`config.js` = contenuti, `profile.js` = profilo dell'azienda, `engine/` = motore). Poi `npm install`, `npm run build`, `npm test`.

## Pagina pubblica

Il modello standard è pubblicato su https://ama-eddy.github.io/data-fabric-visualizer/

Il profilo reale di un'azienda **non va nel repository**. Il modo più semplice: copiare `profili/profilo-esempio.json`, compilarlo e caricarlo dalla pagina con **Carica profilo** (resta solo nel proprio browser). In alternativa si mette in `src/profile.local.js` (stessa forma di `src/profile.js`) e `npm run build` genera anche `data-platform-as-a-fabric.locale.html`, da usare in locale.
