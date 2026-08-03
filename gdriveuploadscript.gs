/**
 * Google Drive upload endpoint for the روائع الأفكار ops system.
 *
 * SETUP:
 * 1. Go to https://script.google.com → New project. Paste this file's
 *    contents in as Code.gs (replacing whatever version is there already —
 *    this revision adds a shared-secret check, a file-type/size allowlist,
 *    and stops leaking raw internal error text to callers).
 * 2. Create (or pick) a Drive folder to receive uploads, open it, copy the
 *    folder ID from its URL (the part after /folders/), and paste it into
 *    FOLDER_ID below.
 * 3. Generate a long random string (e.g. from a password manager) and paste
 *    it into SHARED_SECRET below. This endpoint is deployed with "Anyone"
 *    access (Apps Script Web Apps can't require a Google sign-in without
 *    breaking the simple fetch() call from the app), so the secret is what
 *    stops a stranger who finds this URL from uploading arbitrary files into
 *    the company Drive folder — copy the exact same string into
 *    GDRIVE_UPLOAD_SECRET in ops-9k4x7q2m.html.
 * 4. Deploy → New deployment (or Manage deployments → Edit → New version if
 *    redeploying) → type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the deployed /exec URL and paste it as GDRIVE_UPLOAD_ENDPOINT in
 *    ops-9k4x7q2m.html.
 * 6. Re-upload a proof/plan/photo from any department page — it will now
 *    land in the Drive folder instead of the Firebase fallback.
 *
 * The request body is JSON: { secret, fileData: "data:<mime>;base64,....", fileName }
 * The response is JSON: { success: true, url, fileId } or { success: false, error }
 * error is always a short fixed code, never the raw exception, so a caller
 * can't learn anything about this script's internals from a failed request.
 */
const FOLDER_ID = 'PASTE_YOUR_DRIVE_FOLDER_ID_HERE';
const SHARED_SECRET = 'PASTE_A_LONG_RANDOM_SECRET_HERE';
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
const ALLOWED_MIME_PREFIXES = [
  'image/',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument',
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return jsonError_('empty-request');
    const body = JSON.parse(e.postData.contents);

    if (!SHARED_SECRET || SHARED_SECRET.indexOf('PASTE_') === 0) {
      // Fail closed if the operator forgot to set a real secret, rather than
      // silently accepting uploads from anyone on the internet.
      return jsonError_('server-not-configured');
    }
    if (body.secret !== SHARED_SECRET) return jsonError_('unauthorized');

    const dataUrl = String(body.fileData || '');
    const match = dataUrl.match(/^data:([^;]+);base64,([A-Za-z0-9+/=]+)$/);
    if (!match) return jsonError_('invalid-file-data');
    const mimeType = match[1];
    const base64Payload = match[2];

    if (!ALLOWED_MIME_PREFIXES.some(function (p) { return mimeType.indexOf(p) === 0; })) {
      return jsonError_('unsupported-file-type');
    }
    // Base64 expands raw bytes by ~4/3 — check before decoding so an
    // oversized payload can't force a full decode into memory first.
    if (base64Payload.length * 0.75 > MAX_UPLOAD_BYTES) {
      return jsonError_('file-too-large');
    }

    const fileName = sanitizeFileName_(body.fileName);
    const bytes = Utilities.base64Decode(base64Payload);
    const blob = Utilities.newBlob(bytes, mimeType, fileName);

    const folder = DriveApp.getFolderById(FOLDER_ID);
    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return jsonOk_({
      url: 'https://drive.google.com/uc?export=view&id=' + file.getId(),
      fileId: file.getId(),
    });
  } catch (err) {
    console.error('gdrive-upload-script error: ' + err);
    return jsonError_('upload-failed');
  }
}

function sanitizeFileName_(name) {
  var n = String(name || '');
  n = n.replace(/[\x00-\x1F\x7F]/g, '').trim();
  n = n.slice(0, 200);
  return n || ('file-' + Date.now());
}

function jsonOk_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(Object.assign({ success: true }, data)))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonError_(code) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: false, error: code }))
    .setMimeType(ContentService.MimeType.JSON);
}
