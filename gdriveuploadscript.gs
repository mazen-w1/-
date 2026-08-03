/**
 * Google Drive upload endpoint for the روائع الأفكار ops system.
 *
 * SETUP:
 * 1. Go to https://script.google.com → New project. Paste this file's
 *    contents in as Code.gs.
 * 2. Create (or pick) a Drive folder to receive uploads, open it, copy the
 *    folder ID from its URL (the part after /folders/), and paste it into
 *    FOLDER_ID below.
 * 3. Deploy → New deployment → type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the deployed /exec URL and paste it as GDRIVE_UPLOAD_ENDPOINT in
 *    ops-9k4x7q2m.html (search for "PASTE_YOUR_DEPLOYED_APPS_SCRIPT_URL_HERE").
 * 5. Re-upload a proof/plan/photo from any department page — it will now
 *    land in the Drive folder instead of being stored as base64 in Firebase.
 *
 * The request body is JSON: { fileData: "data:<mime>;base64,....", fileName: "x.png" }
 * The response is JSON: { success: true, url, fileId } or { success: false, error }
 */
const FOLDER_ID = 'PASTE_YOUR_DRIVE_FOLDER_ID_HERE';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const fileName = body.fileName || ('file-' + Date.now());
    const dataUrl = body.fileData || '';

    const match = dataUrl.match(/^data:([^;]+);base64,(.*)$/);
    if (!match) throw new Error('Invalid fileData — expected a base64 data URL');
    const mimeType = match[1];
    const base64Payload = match[2];

    const bytes = Utilities.base64Decode(base64Payload);
    const blob = Utilities.newBlob(bytes, mimeType, fileName);

    const folder = DriveApp.getFolderById(FOLDER_ID);
    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    const url = 'https://drive.google.com/uc?export=view&id=' + file.getId();
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      url: url,
      fileId: file.getId(),
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: String(err),
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
