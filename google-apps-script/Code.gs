/**
 * Arianna Shiroff — Portfolio (Google Apps Script web app)
 *
 * doGet() serves Index.html as a fully self-contained HTML page.
 * Deploy: Deploy → New deployment → Type: Web app → Execute as: Me → Access: Anyone.
 * Embed the resulting URL in Google Sites via Insert → Embed → By URL.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Arianna Shiroff')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
