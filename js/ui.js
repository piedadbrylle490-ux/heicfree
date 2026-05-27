// js/ui.js
// Handles all UI interactions: drag-drop, file queue, progress display
// No framework. Pure DOM manipulation.

const dropZone    = document.getElementById('dropZone');
const fileInput   = document.getElementById('fileInput');
const fileQueue   = document.getElementById('fileQueue');
const actionRow   = document.getElementById('actionRow');
const qualityRow  = document.getElementById('qualityRow');
const qualitySlider = document.getElementById('qualitySlider');
const qualityVal  = document.getElementById('qualityVal');
const convertBtn  = document.getElementById('convertBtn');
const clearBtn    = document.getElementById('clearBtn');
const progressWrap  = document.getElementById('progressWrap');
const progressFill  = document.getElementById('progressFill');
const progressLabel = document.getElementById('progressLabel');
const resultsWrap   = document.getElementById('resultsWrap');
const resultsTitle  = document.getElementById('resultsTitle');
const resultsList   = document.getElementById('resultsList');
const downloadAllBtn  = document.getElementById('downloadAllBtn');
const convertMoreBtn  = document.getElementById('convertMoreBtn');

// Shared state
window.queuedFiles = [];
window.convertedBlobs = [];

// ── Quality slider ──
qualitySlider.addEventListener('input', () => {
  qualityVal.textContent = qualitySlider.value + '%';
});

// ── Drag and drop ──
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

['dragleave', 'dragend'].forEach(evt => {
  dropZone.addEventListener(evt, () => dropZone.classList.remove('dragover'));
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const files = Array.from(e.dataTransfer.files).filter(isHeic);
  addFiles(files);
});

// Click anywhere on drop zone to open file picker
dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
  const files = Array.from(fileInput.files).filter(isHeic);
  addFiles(files);
  fileInput.value = ''; // reset so same file can be added again
});

// ── File handling ──
function isHeic(file) {
  return (
    file.type === 'image/heic' ||
    file.type === 'image/heif' ||
    file.name.toLowerCase().endsWith('.heic') ||
    file.name.toLowerCase().endsWith('.heif')
  );
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function addFiles(files) {
  if (!files.length) return;
  files.forEach(f => {
    // Avoid duplicates by name+size
    const exists = window.queuedFiles.some(q => q.name === f.name && q.size === f.size);
    if (!exists) window.queuedFiles.push(f);
  });
  renderQueue();
}

function renderQueue() {
  fileQueue.innerHTML = '';
  window.queuedFiles.forEach((f, i) => {
    const item = document.createElement('div');
    item.className = 'queue-item';
    item.innerHTML = `
      <span class="queue-item-name" title="${f.name}">${f.name}</span>
      <span class="queue-item-size">${formatBytes(f.size)}</span>
      <button class="queue-item-remove" data-idx="${i}" aria-label="Remove ${f.name}">×</button>
    `;
    fileQueue.appendChild(item);
  });

  const hasFiles = window.queuedFiles.length > 0;
  actionRow.style.display = hasFiles ? 'flex' : 'none';
  qualityRow.style.display = hasFiles ? 'flex' : 'none';

  // Remove button handlers
  fileQueue.querySelectorAll('.queue-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.idx);
      window.queuedFiles.splice(idx, 1);
      renderQueue();
    });
  });
}

// ── Progress helpers ──
window.showProgress = function(label, pct) {
  progressWrap.style.display = 'block';
  progressFill.style.width = pct + '%';
  progressLabel.textContent = label;
};

window.hideProgress = function() {
  progressWrap.style.display = 'none';
};

// ── Results rendering ──
window.showResults = function(results) {
  window.convertedBlobs = results.filter(r => r.blob);
  resultsWrap.style.display = 'block';
  resultsList.innerHTML = '';

  const successCount = results.filter(r => r.blob).length;
  resultsTitle.textContent = `Done — ${successCount} of ${results.length} file${results.length > 1 ? 's' : ''} converted`;

  downloadAllBtn.style.display = successCount > 1 ? 'inline-block' : 'none';

  results.forEach(r => {
    const item = document.createElement('div');
    item.className = 'result-item' + (r.error ? ' result-error' : '');

    if (r.blob) {
      const url = URL.createObjectURL(r.blob);
      item.innerHTML = `
        <span class="result-item-name" title="${r.name}">${r.name}</span>
        <span class="result-size">${formatBytes(r.blob.size)}</span>
        <button class="btn-download-single" data-url="${url}" data-name="${r.name}">Download</button>
      `;
    } else {
      item.innerHTML = `
        <span class="result-item-name" title="${r.name}">✗ ${r.name}</span>
        <span class="result-size">${r.error}</span>
      `;
    }

    resultsList.appendChild(item);
  });

  // Single download buttons
  resultsList.querySelectorAll('.btn-download-single').forEach(btn => {
    btn.addEventListener('click', () => {
      triggerDownload(btn.dataset.url, btn.dataset.name);
    });
  });
};

// ── Download helpers ──
function triggerDownload(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

downloadAllBtn.addEventListener('click', async () => {
  if (!window.convertedBlobs.length) return;
  downloadAllBtn.textContent = 'Zipping…';
  downloadAllBtn.disabled = true;

  const zip = new JSZip();
  window.convertedBlobs.forEach(r => {
    zip.file(r.name, r.blob);
  });

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(zipBlob);
  triggerDownload(url, 'converted-photos.zip');

  downloadAllBtn.textContent = '⬇ Download all as ZIP';
  downloadAllBtn.disabled = false;
});

// ── Clear / Convert more ──
clearBtn.addEventListener('click', reset);
convertMoreBtn.addEventListener('click', reset);

function reset() {
  window.queuedFiles = [];
  window.convertedBlobs = [];
  fileQueue.innerHTML = '';
  resultsList.innerHTML = '';
  resultsWrap.style.display = 'none';
  progressWrap.style.display = 'none';
  actionRow.style.display = 'none';
  qualityRow.style.display = 'none';
}

// ── Convert button triggers converter.js ──
convertBtn.addEventListener('click', () => {
  if (typeof window.runConversion === 'function') {
    window.runConversion();
  }
});