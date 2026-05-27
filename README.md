# heicfree — HEIC to JPG Converter

**Free. Private. No upload required. Zero backend.**

Live at: `https://heicfree.vercel.app` · Built by one person · [Support me on Ko-fi](https://ko-fi.com/yourname)

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

## Why It Exists — The Business Case

The HEIC converter market has a massive, exploitable trust gap:

| Competitor | Problem |
|---|---|
| heictojpg.com | 1.88M visits/mo — but has a public malware complaint on Trustpilot |
| CloudConvert | Upload-based, requires sign-up, has a free tier limit |
| FreeConvert | Upload-based, aggressive ads |
| picflow.com | Browser-based but buried inside a larger product, no privacy brand |

This tool wins by being **the only converter that markets itself on the privacy angle** — no uploads, open source, built by one human.

### Target search queries
- `heic to jpg` (high volume, broad)
- `convert heic to jpg without uploading`
- `heic file won't open on windows`
- `iphone photos not opening on windows`
- `free heic converter no sign up`
- `privacy-first heic converter`

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
├── blog/               ← SEO content pages (plain HTML)
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

## Monetization Roadmap

### Month 1–2 (traffic building)
- Launch, submit to Google Search Console
- Post genuinely in r/windows, r/iphone, r/photography when someone asks
- Add to AlternativeTo.net listing
- Buy Me a Coffee widget — signals human trust, earns small income

### Month 3–4 (SEO compounding)
- 8 blog posts live
- Add HEIC → PNG as second output format
- ProductHunt launch

### Month 5–6 (monetize properly)
- **Affiliate links**: Link to WD portable drives ("store your photos safely"), Backblaze backup ($0 to join their affiliate program)
- **Privacy sponsor**: A VPN or privacy tool may pay $500–$2,000/mo for a tasteful mention on a privacy-focused site
- **Optional**: $1.99 desktop Electron/Tauri app for users who want offline-forever version

---

## "Buy Me a Coffee" — Why It's Strategic

The coffee button isn't just for income. It's a **trust signal**. It communicates:
- A real human built this
- It's not a corporate ad farm
- There's someone accountable behind it

Replace `https://ko-fi.com/yourname` with your actual Ko-fi profile link.

---

## Competitive Moat Summary

You are not competing on features. You are competing on **trust and brand story**.

The homepage copy says it directly:
> *"Every other converter uploads your photos to an unknown server. This one doesn't."*

That one sentence is the entire marketing strategy.

---

## File Replacement Checklist Before Launch

- [x] Replace `https://heicfree.vercel.app` in all files
- [x] Replace `https://ko-fi.com/yourname` with your Ko-fi profile
- [ ] Replace `https://github.com/yourname/heicfree` in footer
- [ ] Update `<meta property="og:image">` with a real screenshot
- [ ] Submit `sitemap.xml` to Google Search Console after first deploy
- [ ] Set up Cloudflare Web Analytics (free, no cookie banner needed)

---

## Motto

> *Don't underestimate the simple idea.*

One problem. One tool. Done honestly. That's the whole business.