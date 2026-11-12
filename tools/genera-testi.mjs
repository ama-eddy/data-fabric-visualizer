// Genera TESTI.md dal CONFIG (prima volta) o aggiunge in fondo i testi che mancano. Uso: npm run testi
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { caricaConfig, estraiTesti, leggiTesti } from './testi.mjs';

const SEZIONI = [
  ['meta', 'Titolo'], ['ui', 'Interfaccia: pulsanti e intestazioni'], ['contatto', 'Contatto predefinito ("A chi rivolgerti")'],
  ['workloads', 'Workload: schede'], ['elements', 'Elementi della scena: etichette e schede'], ['materiali', 'Legenda: materiali'],
  ['modalita', 'Legenda e schede: mezzi di trasporto'], ['categorie', 'Sorgenti: tipi di fornitore'], ['sources', 'Sorgenti standard: nomi'],
  ['spoke', 'Officine degli spoke: scheda'], ['spokes', 'Spoke standard: nomi'], ['team', 'Team dati: schede e postazioni'],
  ['chapters', 'Narrativa: i capitoli della presentazione'], ['paths', 'Percorsi: tappe e messaggi'],
];
const testi = estraiTesti(caricaConfig());
if (!existsSync('TESTI.md')) {
  let md = `# Testi della Fabbrica Dati

> **Come si usa.** Ogni testo ha un titolo con la sua chiave (\`### chiave\`): si cambia **solo il testo sotto il titolo**, mai la chiave.
> Il testo può andare a capo liberamente: viene unito in un'unica riga. Niente apici o caratteri speciali da rispettare.
> Si modifica anche da GitHub nel browser (matita in alto a destra): al salvataggio la pagina pubblica si aggiorna da sola in un paio di minuti.
> **Nome tecnico**: le chiavi che finiscono con \`.tecnico\` sono la riga "In Fabric" della scheda: qui (e solo qui) vanno i termini tecnici.
> **Lessico** (REQUISITI §1.2): ammessi report, Power BI, dato certificato, Bronze / Silver / Gold. Gli altri termini tecnici (Lakehouse, pipeline, modello semantico…) vanno tradotti: se ne compare uno, la pagina **non** viene aggiornata e l'azione su GitHub diventa rossa indicando dove.
> Le parole del profilo di un'azienda (nomi degli spoke, delle sorgenti, contatto) non stanno qui: stanno nel profilo.
`;
  for (const [pref, titolo] of SEZIONI) {
    const qui = testi.filter(([k]) => k === pref || k.startsWith(pref + '.'));
    if (!qui.length) continue;
    md += `\n## ${titolo}\n`;
    for (const [k, t] of qui) md += `\n### ${k}\n${t}\n`;
  }
  writeFileSync('TESTI.md', md); console.log(`TESTI.md creato: ${testi.length} testi`);
} else {
  const ci = leggiTesti(readFileSync('TESTI.md', 'utf8')), mancanti = testi.filter(([k]) => !ci.has(k));
  if (mancanti.length) writeFileSync('TESTI.md', readFileSync('TESTI.md', 'utf8').trimEnd() + '\n\n## Testi nuovi (da sistemare nella sezione giusta)\n' + mancanti.map(([k, t]) => `\n### ${k}\n${t}\n`).join(''));
  console.log(mancanti.length ? `Aggiunti ${mancanti.length} testi in fondo a TESTI.md` : 'TESTI.md è completo');
}
