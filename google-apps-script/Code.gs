/**
 * Legal Growth System — réception des demandes d'analyse.
 *
 * Ce script est lié à la feuille Google Sheets qui reçoit les demandes.
 * Propriétés du script à renseigner (Paramètres du projet > Propriétés du script) :
 *   LEAD_SHARED_SECRET  même valeur que la variable LEAD_SHARED_SECRET sur Vercel
 *   NOTIFICATION_EMAIL  adresse qui reçoit la notification de chaque demande
 */

var SHEET_NAME = 'Demandes';
var HEADERS = [
  'Date', 'Prénom', 'Nom', 'Cabinet', 'Email', 'Téléphone', 'Ville', 'Spécialité',
  'Site internet', "Nombre d'avocats", 'Dossiers recherchés', 'Source', 'Statut'
];

function doPost(e) {
  try {
    var props = PropertiesService.getScriptProperties();
    var secret = props.getProperty('LEAD_SHARED_SECRET');
    var body = JSON.parse(e.postData.contents);

    if (!secret || body.secret !== secret) {
      return reply_({ ok: false, error: 'unauthorized' });
    }

    var lead = body.lead || {};
    var date = Utilities.formatDate(new Date(), 'Europe/Paris', 'yyyy-MM-dd HH:mm');
    var row = [
      date, lead.prenom, lead.nom, lead.cabinet, lead.email, lead.telephone, lead.ville,
      lead.specialite, lead.site, lead.taille, (lead.dossiers || []).join(', '), lead.source, 'Nouveau'
    ].map(safeCell_);

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      getSheet_().appendRow(row);
    } finally {
      lock.releaseLock();
    }

    // La ligne est enregistrée : un échec d'email ne fait pas perdre la demande.
    var mailSent = true;
    try {
      sendNotification_(lead, date);
    } catch (mailError) {
      mailSent = false;
      console.error(mailError);
    }

    return reply_({ ok: true, mail: mailSent });
  } catch (err) {
    console.error(err);
    return reply_({ ok: false, error: String(err) });
  }
}

function sendNotification_(lead, date) {
  var to = PropertiesService.getScriptProperties().getProperty('NOTIFICATION_EMAIL');
  if (!to) return;
  var lines = [
    'Nouvelle demande d\'analyse — Legal Growth System',
    '',
    'Nom : ' + (lead.prenom || '') + ' ' + (lead.nom || ''),
    'Cabinet : ' + (lead.cabinet || ''),
    'Email : ' + (lead.email || ''),
    'Téléphone : ' + (lead.telephone || 'non renseigné'),
    'Ville : ' + (lead.ville || ''),
    'Spécialité : ' + (lead.specialite || ''),
    'Site : ' + (lead.site || 'non renseigné'),
    "Nombre approximatif d'avocats : " + (lead.taille || 'non renseigné'),
    'Dossiers à développer : ' + ((lead.dossiers || []).join(', ') || 'non renseigné'),
    'Source : ' + (lead.source || 'non disponible'),
    'Date : ' + date,
    '',
    'Feuille : ' + SpreadsheetApp.getActiveSpreadsheet().getUrl()
  ];
  var options = { name: 'Legal Growth System' };
  if (lead.email) options.replyTo = lead.email;
  MailApp.sendEmail(to, 'Nouvelle demande d\'analyse — Legal Growth System', lines.join('\n'), options);
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

/** Empêche l'interprétation d'une valeur comme formule (=, +, -, @). */
function safeCell_(value) {
  var v = value === null || value === undefined ? '' : String(value);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** À exécuter une fois depuis l'éditeur : crée l'onglet, autorise l'accès et envoie un email de test. */
function setup() {
  getSheet_();
  sendNotification_({
    prenom: 'Test', nom: 'Configuration', cabinet: 'Test', email: '', specialite: 'Test', ville: 'Test',
    dossiers: [], source: 'setup'
  }, Utilities.formatDate(new Date(), 'Europe/Paris', 'yyyy-MM-dd HH:mm'));
}
