# heicfree — HEIC to JPG Converter

**Free. Private. No upload required. Zero backend. Fully open source.**

Live at: `https://heicfree.vercel.app` · [GitHub: piedadbrylle490-ux/heic2any](https://github.com/piedadbrylle490-ux/heic2any)

---

## The Problem (2 sentences)

Every month, millions of iPhone users search for a way to convert their HEIC photos to JPG, but every tool they find either uploads personal images to an unknown server — or drowns them in aggressive ads, dark patterns, and suspected malware (the market leader has a public Trustpilot complaint about a virus called "RiskWare.SystemRequirementsLab").

There is no clean, trust-first, browser-only converter with zero ads, zero uploads, and zero guilt — so this is it.

---

## What This Is

A single-purpose web tool that converts HEIC/HEIF photos (Apple's default iPhone photo format) to JPG, running **100% in the browser** using WebAssembly. No file ever touches a server. No backend exists.

### Core features
- Drag-and-drop or browse to select HEIC/HEIF files
- Batch conversion (up to 50 files at once)
- Adjustable JPG quality (60%–100%, default 90%)
- Download individually or as a ZIP archive
- EXIF metadata preserved
- Works offline after first page load (WASM is cached by the browser)

---

## Why It Exists — A Trust Problem

Millions of iPhone users face a real problem: they need to convert HEIC photos, but the existing converters ask them to **upload personal images to unknown servers**. Some have public malware complaints. Others hide fees or data harvesting behind free tiers.

This shouldn't be a trust gamble.

### The Trust Gap

| Existing Tool | Trust Problem |
|---|---|
| heictojpg.com | Public Trustpilot complaint about malware ("RiskWare.SystemRequirementsLab") |
| CloudConvert | Requires account creation; uploads files to proprietary servers |
| FreeConvert | Free tier limits; unclear data policy; aggressive upsell |
| picflow.com | Browser-based, but no privacy brand or accountability |

**heicfree exists to close this gap.** No uploads. No servers. No data collection. Open source so anyone can audit the code. Built by one person, not a VC-backed company with ad networks.

### How This Builds Trust

- **Open Source:** Full code on GitHub. Anyone can audit exactly what happens to your photos (nothing). No closed-source black boxes.
- **No Servers:** Conversion runs in your browser using WebAssembly. Technically impossible for files to be uploaded anywhere.
- **No Tracking:** No analytics cookies, no ad networks, no fingerprinting. Built with user privacy as the first principle.
- **Verifiable:** Run offline after first load. Download the repo and run locally if you want complete certainty.
- **Honest:** One person built this. No VC backing, no data extraction model. It does exactly what it says.

### Who This Serves

Users searching for:
- `heic to jpg without uploading`
- `convert heic to jpg privately`
- `heic file won't open on windows`
- `iphone photos not opening on windows`
- `free heic converter no sign up`
- `open source heic converter`

---

## Project Structure

```
heicfree/
│
├── index.html          ← The entire app. One file. No build step.
│
├── css/
│   └── style.css       ← All styles. Industrial-minimal aesthetic.
│
├── js/
│   ├── ui.js           ← DOM interactions: drag-drop, queue, progress, results
│   └── converter.js    ← Conversion engine: heic2any WASM wrapper
│
├── blog/               
│   ├── what-is-heic.html
│   ├── heic-on-windows.html
│   ├── heic-vs-jpg.html
│   ├── heic-email-wont-open.html
│   ├── batch-convert-heic.html
│   ├── iphone-photos-windows.html
│   ├── privacy-safe-converter.html
│   └── heic-to-png.html
│
├── sitemap.xml         ← For Google Search Console submission
└── vercel.json         ← Deploy config, security headers, clean URLs
```

**Total files: 5 core files + blog pages. No package.json. No node_modules. No build step.**

---

## How the Conversion Works

```
User drops HEIC file
       ↓
Browser reads file as Blob (FileReader API)
       ↓
heic2any(blob) — WebAssembly runs in browser tab
       ↓
Returns JPG Blob (never sent anywhere)
       ↓
URL.createObjectURL(blob) → download link
```

### The key library

[heic2any](https://github.com/alexcorvi/heic2any) — a JavaScript library that wraps a WebAssembly HEIC decoder. It runs entirely client-side. No API key, no server, no cost.

```html
<!-- Loaded via CDN, no npm install needed -->
<script src="https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js"></script>
```

The conversion call is 5 lines:
```javascript
const outputBlob = await heic2any({
  blob:    yourHEICFile,   // File object from input or drop
  toType:  'image/jpeg',
  quality: 0.90,           // 0.0 – 1.0
});
```

That's it. No fetch. No FormData. No server route.

---

## Tech Stack & Cost

| Layer | Solution | Monthly Cost |
|---|---|---|
| Hosting | Vercel free tier | $0 |
| Conversion | heic2any (CDN) | $0 |
| Multi-file ZIP | JSZip (CDN) | $0 |
| DNS / DDoS | Cloudflare free | $0 |
| Analytics | Cloudflare Web Analytics | $0 |
| Domain | Optional — Cloudflare Registrar | ~$0.80/mo |
| Backend | None required | $0 |
| Database | None required | $0 |
| **Total** | | **$0/mo** |

---

## Deploy in 3 Steps

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/yourname/heicfree.git
git push -u origin main
```

### Step 2 — Connect to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Framework Preset: **Other** (static site, no framework)
4. Build command: *(leave empty)*
5. Output directory: *(leave empty / root)*
6. Click Deploy

Done. Your site is live at `yourproject.vercel.app` in ~30 seconds.

### Step 3 — Custom domain (optional, ~$10/yr)
1. Buy domain at Cloudflare Registrar
2. In Vercel: Settings → Domains → Add domain
3. Follow DNS instructions (5 minutes)

---

## SEO Strategy

The blog pages are the traffic engine. Each one targets a specific frustrated search query:

| Blog page | Target query | Why it converts |
|---|---|---|
| `what-is-heic.html` | "what is heic file" | Entry point, links to tool |
| `heic-on-windows.html` | "heic file won't open windows" | High frustration, ready to convert |
| `heic-vs-jpg.html` | "heic vs jpg" | Informational, builds trust |
| `heic-email-wont-open.html` | "heic email attachment won't open" | Urgent problem |
| `iphone-photos-windows.html` | "iphone photos won't open on pc" | Massive search volume |
| `privacy-safe-converter.html` | "heic converter no upload" | Your exact differentiator |
| `batch-convert-heic.html` | "batch convert heic" | Power users |
| `heic-to-png.html` | "heic to png" | Alt format extension |

Each blog page: ~600–800 words, one clear answer, internal link to the converter, no fluff.

---

## File Replacement Checklist Before Launch

- [x] Replace `https://heicfree.vercel.app` in all files
- [x] Replace `https://ko-fi.com/yourname` with your Ko-fi profile
- [x] Replace `https://github.com/yourname/heicfree` in footer
- [x] Add open-source trust signals (5th trust item, MIT license mention, GitHub links)
- [ ] Update `<meta property="og:image">` with a real screenshot
- [ ] Submit `sitemap.xml` to Google Search Console after first deploy
- [x] Set up Vercel Web Analytics (added to all pages)