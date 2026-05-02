# Google Apps Script → Google Sites Deploy

This bundle is a single-page version of the portfolio packaged so it lives entirely on **Google's servers** (Apps Script). You then embed it inside Google Sites.

End result: you have a Google Sites page (`sites.google.com/view/your-name`) that displays the full vintage portfolio. The HTML/CSS/JS lives in your own Google Apps Script project. **No GitHub or Vercel hosting required for the code.** (The photos still load from the existing Vercel URLs by default — see "Photos: where they live" at the bottom if you want to move those too.)

---

## Files in this folder

- **Code.gs** — Apps Script server function. Don't edit unless you know why.
- **Index.html** — the entire site as one HTML file with all 5 pages, vintage CSS inlined, JS-based nav.

Both files are also in the GitHub repo at `google-apps-script/`.

---

## Deploy steps (one-time, ~5 minutes)

### 1. Create the Apps Script project
1. Go to **https://script.google.com**
2. Click **New project** (top left)
3. Rename "Untitled project" (top of page) to `Arianna Shiroff Portfolio`

### 2. Add Code.gs
1. There's already a default `Code.gs` open in the editor
2. Select all the existing code (Cmd+A), delete it
3. Open `Code.gs` from this folder, copy the entire contents, paste in
4. Click the floppy save icon (top toolbar)

### 3. Add Index.html
1. In the left sidebar, click **+ next to Files** → **HTML**
2. Name it exactly `Index` (case-sensitive — no `.html` suffix here)
3. Open `Index.html` from this folder, copy the entire contents, paste in (replacing whatever default HTML it gave you)
4. Click save

### 4. Deploy as a web app
1. Top right, click **Deploy** → **New deployment**
2. Click the gear icon next to "Select type" → choose **Web app**
3. Settings:
   - **Description**: anything, e.g. `v1`
   - **Execute as**: **Me (your@gmail.com)**
   - **Who has access**: **Anyone**
4. Click **Deploy**
5. The first time, Google will ask for authorization. Click **Authorize access** → pick your Google account → it may say "Google hasn't verified this app" → click **Advanced** → **Go to Arianna Shiroff Portfolio (unsafe)** → **Allow**. (It's "unsafe" only because it's your own un-reviewed script. It's safe.)
6. After deploy, Google gives you two URLs. **Copy the "Web app" URL** — looks like `https://script.google.com/macros/s/AKfycby...HASH.../exec`

### 5. Test it standalone
Open the web app URL in a new tab. You should see the full vintage portfolio. If yes, continue. If no, jump to "Troubleshooting" below.

### 6. Embed in Google Sites
1. Go to **https://sites.google.com/new**
2. Click **Blank** template
3. Top-left, replace "Untitled site" with `Arianna Shiroff`
4. In the right panel, click **Insert** → **Embed**
5. In the dialog, choose **By URL** tab
6. Paste your web-app URL from step 4
7. Click **Insert**
8. The embed appears on the page. Drag the bottom-right corner to make it full-width and tall enough to show content (try ~1200px height to start)
9. Click **Publish** (top right)
10. Pick a URL slug, e.g. `arianna-shiroff`
11. Set visibility (public or whoever needs it)
12. Click **Publish** again

Final URL: `https://sites.google.com/view/arianna-shiroff`

---

## Updating later

To change content:
1. Go back to your Apps Script project at script.google.com
2. Edit Index.html
3. Save
4. Click **Deploy** → **Manage deployments** → pencil icon on your existing deployment → **Version: New version** → **Deploy**

Same web-app URL keeps working — Google Sites picks up the new version automatically.

---

## Photos: where they live

The default version of `Index.html` references photos from `https://ariannashiroff-portfolio.vercel.app/assets/...`. That works immediately but technically still depends on Vercel for the images.

**To make it 100% Google-hosted**, two options:

### Option A: upload images to Google Drive
1. Make a Drive folder, upload all photos
2. Right-click each photo → **Get link** → **Anyone with the link**
3. The shareable URL looks like `https://drive.google.com/file/d/FILE_ID/view`
4. To use it as an image src, swap to: `https://drive.google.com/uc?export=view&id=FILE_ID`
5. Find/replace every `https://ariannashiroff-portfolio.vercel.app/assets/FILENAME.jpg` in `Index.html` with the corresponding Drive URL
6. Save and re-deploy

### Option B: leave them on Vercel
Vercel's free tier is fine. The photos won't go away. The "image source dependency" matters only if you actually delete the Vercel deployment.

I'd suggest B unless you have a strict "must be entirely on Google" requirement.

---

## Troubleshooting

**The web app shows a Google sign-in page instead of my site**
You set "Who has access" to something restricted. Re-deploy with **Anyone**.

**Embed in Google Sites is too short / cut off**
In Google Sites' edit mode, click the embed → drag the corners to resize. There's no auto-fit.

**Fonts look wrong**
Google Apps Script can sometimes block external font loads in iframe mode. The CSS falls back to Georgia / system serif — not perfect but readable. If you want guaranteed Fraunces, switch the embed mode in Google Sites from "By URL" to "Embed code" and paste the full HTML directly (only works if the file is under ~10K chars, so this is a non-starter for our bundle — stick with By URL).

**I changed something but the embed still shows the old version**
Apps Script web apps cache. Either (a) re-deploy a new version (see "Updating later"), or (b) hard-refresh the Google Sites page (Cmd+Shift+R).
