// Profilo di ESEMPIO, di un'azienda inventata: mostra la forma del profilo e serve alla prova automatica.
// Il profilo reale va in src/profile.local.js, che non entra nel repository [REQ-CFG-07].
window.PROFILE = {
  azienda: 'Esempio S.p.A.',
  spoke: [{ nome: 'Amministrazione', stato: 'on' }, { nome: 'Vendite', stato: 'on' }, { nome: 'Acquisti', stato: 'wip' }, { nome: 'Personale', stato: 'off' }],
  sorgenti: [
    { nome: 'Il gestionale', categoria: 'erp', flusso: 'on' },
    { nome: 'CRM vendite', categoria: 'crm', flusso: 'on' },
    { nome: 'Budget (Excel)', categoria: 'excel', flusso: 'on' },
    { nome: 'Presenze', categoria: 'hr', flusso: 'off' },
  ],
  // team di partenza: sagoma, nome (solo nella versione aziendale), workload assegnati (nessuno, uno o più)
  team: [
    { sagoma: 'uomo', nome: 'Luca', workload: ['Data Integration', 'Data Architecture'] },
    { sagoma: 'donna', nome: 'Sara', workload: ['Data Visualization'] },
    { sagoma: 'donna', nome: 'Elena', workload: ['Self-service', 'Data Sources'] },
    { sagoma: 'uomo', nome: 'Marco', workload: [] },
  ],
  contatto: { chi: 'Team dati', come: 'dati@esempio.example' },
};
