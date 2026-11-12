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
  team: { integration: { m: 1, f: 1 }, architecture: { m: 1, f: 0 }, visualization: { m: 0, f: 1 }, coordination: { m: 0, f: 1 } },
  contatto: { chi: 'Team dati', come: 'dati@esempio.example' },
};
