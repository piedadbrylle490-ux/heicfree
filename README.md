# heicfree 🖼️

> **Convert HEIC to JPG. Free. No upload. No signup. No server.**

## Problem

Every month, millions of iPhone users need to convert HEIC photos to JPG. But every existing converter either:
- **Uploads your photos to unknown servers** — risking privacy
- **Has malware complaints** — heictojpg.com has a public Trustpilot complaint about "RiskWare.SystemRequirementsLab"
- **Hides fees or data harvesting** — "free" converters with dark patterns
- **Drowns you in ads** — aggressive upselling, aggressive tracking

## Purpose

heicfree is a privacy-first, browser-based HEIC to JPG converter that solves this problem entirely on the client side. Your photos are converted using WebAssembly running directly in your browser — they never leave your device, never touch a server, and never get stored. The tool is completely free, requires no signup, and works offline after the first load.

## How It Works

Everything runs inside your browser using WebAssembly (heic2any library):

1. Select or drag a HEIC/HEIF photo from your iPhone
2. Choose JPG quality (60%–100%, default 90%)
3. Preview the result with file size
4. Download the converted JPG — nothing leaves your device

**No backend. No uploads. No tracking. No cost.**

### Core Features
- Drag-and-drop or browse to select HEIC/HEIF files
- Batch conversion (up to 50 files at once)
- Adjustable JPG quality (60%–100%, default 90%)
- Download individually or as a ZIP archive
- EXIF metadata preserved
- Works offline after first page load (WebAssembly is cached by browser)

---

## How the Conversion Works

Everything runs inside your browser using only WebAssembly:

```
1. File selected (drag/drop or click to browse)
2. Browser reads file as Blob (FileReader API)
3. heic2any(blob) — WebAssembly runs in browser tab
4. Returns JPG Blob (never sent anywhere)
5. Download link created → user's device
```

**No bytes leave the browser.** The conversion happens entirely on your device. No server. No upload.

---

## Tech Stack

| Layer | Solution | Cost |
|-------|----------|------|
| HEIC decoding | [heic2any](https://github.com/alexcorvi/heic2any) (WebAssembly) | Free (MIT license) |
| ZIP downloads | [JSZip](https://stuk.github.io/jszip/) | Free |
| Backend | None | $0 |
| Database | None | $0 |
| **Total** | | **$0/month** |

**No npm. No node_modules. No build step. No backend. No database.**  
Open `index.html` in a browser and it works.

---

## Project Structure

```
heic2any/
├── index.html          ← Main converter application
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── ui.js           ← DOM: drag-drop, file queue, progress, results
│   └── converter.js    ← Conversion logic: heic2any WASM wrapper
├── blog/               ← SEO content
│   ├── what-is-heic.html
│   ├── heic-on-windows.html
│   ├── heic-vs-jpg.html
│   ├── heic-email-wont-open.html
│   ├── batch-convert-heic.html
│   ├── iphone-photos-windows.html
│   ├── privacy-safe-converter.html
│   └── heic-to-png.html
├── sitemap.xml
└── README.md
```

---

## Installation

No installation required. Open `index.html` directly in a web browser to use locally.

### Local Use (Recommended for Maximum Privacy)

```bash
git clone https://github.com/piedadbrylle490-ux/heic2any.git
cd heic2any
# Open index.html in your browser
# No build step. No server. Works completely offline.
```

---

## Privacy & Legal

- **No data collected** — all processing happens in your browser
- **No cookies** — nothing is stored
- **No uploads** — images never leave your device
- **No login** — no account required, no personal information collected
- **Open source** — Full code on GitHub. Anyone can audit exactly what happens to your photos.
- **Works offline** — Download the repo, open `index.html` locally, it works with zero internet connection. Proof nothing is uploaded.

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

## Contributing

Found a bug? Want to improve the UI? Have an idea for a feature?

Open an issue or submit a pull request. Code quality matters less than honest intent.

---

## License

MIT — Free to use, modify, and distribute.

---

## Support

Never required. Always appreciated.

[☕ Buy me a coffee](https://ko-fi.com/brahyan)