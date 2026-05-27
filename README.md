# heicfree — HEIC to JPG Converter

**Free. Private. No upload required. Zero backend. Fully open source.**

[Live demo](https://heicfree.vercel.app) · [Source code](https://github.com/piedadbrylle490-ux/heic2any) · [Ko-fi (optional support)](https://ko-fi.com/brahyan)

---

## The Problem

Every month, millions of iPhone users need to convert HEIC photos to JPG. But every existing converter either:
- **Uploads your photos to unknown servers** — risking privacy
- **Has malware complaints** — heictojpg.com has a public Trustpilot complaint about "RiskWare.SystemRequirementsLab"
- **Hides fees or data harvesting** — "free" converters with dark patterns
- **Drowns you in ads** — aggressive upselling, aggressive tracking

**There should be a tool that just works.** No uploads. No tricks. No guilt.

---

## What This Is

A single-purpose web tool that converts HEIC/HEIF photos (Apple's default iPhone format) to JPG, running **100% in your browser** using WebAssembly. 

**Your files never leave your device.** Not because we promise. Because it's technically impossible — there is no server.

### How It's Different

| Feature | heicfree | Most Competitors |
|---------|----------|------------------|
| Conversion location | Your browser (WebAssembly) | Their servers |
| Your photo privacy | Technically impossible to upload | "We promise we don't store them" |
| Data collection | None (no tracking) | Analytics, profiling, ad networks |
| Code transparency | Open source on GitHub | Closed black box |
| Cost | Free, no sign-up | Free tier + upsell or ads |

### Core Features
- Drag-and-drop or browse to select HEIC/HEIF files
- Batch conversion (up to 50 files at once)
- Adjustable JPG quality (60%–100%, default 90%)
- Download individually or as a ZIP archive
- EXIF metadata preserved
- Works offline after first page load (WebAssembly is cached by browser)

---

## Why This Exists — A Trust Gap

Most iPhone users don't know the real problem: every popular HEIC converter asks them to upload personal photos to servers they don't control.

This project exists to prove that **browser-based conversion is the better way.**

### How This Builds Trust

1. **Open Source** — Full code on GitHub. Anyone can audit exactly what happens to your photos. No closed-source black boxes.
2. **WebAssembly, Not Servers** — Conversion runs in your browser. Files are technically impossible to upload anywhere.
3. **No Tracking** — No analytics cookies. No ad networks. No fingerprinting. Privacy is not optional.
4. **Verifiable Offline** — Download the repo, open `index.html` locally, it works with zero internet connection. Proof nothing is uploaded.
5. **Honest About Sustainability** — Ko-fi link is truly optional. Not mandatory. Not part of the product.

---

## Why This Design

- **One HTML file** — No build step, no dependencies, easy to audit and fork
- **WebAssembly** — Conversion happens on your device, not a server
- **No backend** — Static hosting on Vercel free tier is enough forever
- **No database** — No user data to protect, no data breach risk
- **Simple dependencies** — heic2any (WASM library) and jszip (batch downloads), both well-maintained

---

## How to Use

### Online (Recommended)
1. Go to [heicfree.vercel.app](https://heicfree.vercel.app)
2. Drop your .heic or .heif files
3. Download JPGs instantly

### Local (For Complete Privacy)
```bash
git clone https://github.com/piedadbrylle490-ux/heic2any.git
cd heic2any
# Open index.html in any browser
# No build step. No server. Works offline.
```

---

## How It Works Under the Hood

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

The conversion call is 5 lines:
```javascript
const outputBlob = await heic2any({
  blob:    file,
  toType:  'image/jpeg',
  quality: 0.90,  // 0.0 – 1.0
});
```

**No fetch(). No FormData. No server route.**

---

## Tech Stack

| Layer | Solution | Cost |
|-------|----------|------|
| HEIC decoding | [heic2any](https://github.com/alexcorvi/heic2any) (WebAssembly) | Free (MIT license) |
| ZIP downloads | [JSZip](https://stuk.github.io/jszip/) | Free |
| Hosting | Vercel (static free tier) | $0/month |
| Backend | None | $0 |
| Database | None | $0 |
| **Total** | | **$0/month** |

---

## Privacy & Security

- ✅ No cookies
- ✅ No tracking scripts
- ✅ No file upload — conversion happens in browser memory only
- ✅ No database
- ✅ No third-party API calls
- ✅ Open source (audit the code yourself)
- ✅ Works offline after first load

---

## Project Structure

```
heic2any/
│
├── index.html          ← Main converter application
│
├── css/
│   └── style.css       ← All styles (industrial-minimal aesthetic)
│
├── js/
│   ├── ui.js           ← DOM: drag-drop, file queue, progress, results
│   └── converter.js    ← Conversion logic: heic2any WASM wrapper
│
├── blog/               ← SEO content (targets specific search queries)
│   ├── what-is-heic.html
│   ├── heic-on-windows.html
│   ├── heic-vs-jpg.html
│   ├── heic-email-wont-open.html
│   ├── batch-convert-heic.html
│   ├── iphone-photos-windows.html
│   ├── privacy-safe-converter.html
│   └── heic-to-png.html
│
├── sitemap.xml         ← For search engines
└── vercel.json         ← Security headers, clean URL rewrites
```

**Total: 5 core files + 8 blog pages. No package.json. No node_modules. No build step.**

---

## Deploy to Vercel (Free)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/yourname/heic2any.git
git push -u origin main
```

### Step 2 — Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Framework Preset: **Other** (static site)
4. Build command: *(leave empty)*
5. Output directory: *(leave empty)*
6. Click **Deploy**

Live in ~30 seconds at `yourproject.vercel.app`

### Step 3 — Custom Domain (Optional, ~$10/yr)
1. Buy domain at Cloudflare Registrar or Namecheap
2. In Vercel: Settings → Domains → Add domain
3. Follow DNS instructions (5 minutes)

---

## Contributing

Found a bug? Want to improve the UI? Have an idea for a feature?

Open an issue or submit a pull request. Code quality matters less than honest intent.

---

## License

MIT — Free to use, modify, and distribute.

---

## Support (Optional)

If this saved you time and you want to support development:

**[Buy me a coffee on Ko-fi ☕](https://ko-fi.com/brahyan)**

Not required. Not part of the product. Purely optional if you feel generous.