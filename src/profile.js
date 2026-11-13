// ===== PROFILE — profilo dell'azienda [REQ-CFG-02, REQ-CFG-03] =====
// Contiene solo ciò che cambia da un'azienda all'altra (vedi profili/PROFILO-TEMPLATE.md).
// Vuoto = modello standard. [REQ-CFG-05] ha gli stessi campi del documento di profilo.
// [REQ-CFG-06] in alternativa il profilo si carica da un file JSON con il pulsante "Carica profilo" (forma: profili/profilo-esempio.json).
window.PROFILE = {
  // azienda: 'Nome azienda',
  // spoke:    [{ nome: 'Finance', stato: 'on' }],
  // sorgenti: [{ nome: 'Il gestionale', categoria: 'erp', metodo: 'copia', flusso: 'on' }],   // metodo: copia | tempo reale | mirroring
  // team:     [{ sagoma: 'uomo', nome: 'Luca', workload: ['Data Integration', 'Data Architecture'] }, { sagoma: 'donna', nome: 'Sara', workload: [] }],
  // contatto: { chi: 'Team dati', come: 'dati@azienda.it' },
};
