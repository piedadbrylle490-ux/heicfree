// js/converter.js
// Core conversion engine — uses heic2any (WebAssembly, runs in browser)
// Files NEVER leave the device. No fetch(), no FormData, no server.

window.runConversion = async function () {
  const files = window.queuedFiles;
  if (!files.length) return;

  // Lock UI during conversion
  const convertBtn = document.getElementById('convertBtn');
  const clearBtn   = document.getElementById('clearBtn');
  const actionRow  = document.getElementById('actionRow');
  convertBtn.disabled = true;
  clearBtn.disabled   = true;
  actionRow.style.display = 'flex'; // keep visible but disabled

  const quality = parseInt(document.getElementById('qualitySlider').value) / 100;
  const results = [];

  window.showProgress('Starting…', 0);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const pct  = Math.round(((i) / files.length) * 100);
    window.showProgress(`Converting ${i + 1} of ${files.length}: ${file.name}`, pct);

    try {
      // heic2any is loaded via CDN script tag — runs entirely in browser
      // It uses WebAssembly under the hood to decode the HEIC format
      const outputBlob = await heic2any({
        blob:    file,
        toType:  'image/jpeg',
        quality: quality,
      });

      // heic2any can return a single Blob or an array (for multi-image HEIC)
      const blob = Array.isArray(outputBlob) ? outputBlob[0] : outputBlob;

      // Build output filename: swap .heic/.heif extension for .jpg
      const jpgName = file.name.replace(/\.(heic|heif)$/i, '.jpg');

      results.push({ name: jpgName, blob });

    } catch (err) {
      console.error('Conversion failed for', file.name, err);
      results.push({
        name:  file.name,
        blob:  null,
        error: getErrorMessage(err),
      });
    }
  }

  window.showProgress('Done!', 100);

  // Small delay so user sees 100%
  await new Promise(r => setTimeout(r, 400));

  window.hideProgress();
  window.showResults(results);

  // Re-enable buttons
  convertBtn.disabled = false;
  clearBtn.disabled   = false;
  actionRow.style.display = 'none'; // hide since results are showing
};

// ── Error messages ──
function getErrorMessage(err) {
  if (!err) return 'Unknown error';
  const msg = (err.message || err.toString()).toLowerCase();

  if (msg.includes('not a heic') || msg.includes('not heic')) {
    return 'Not a valid HEIC file';
  }
  if (msg.includes('out of memory') || msg.includes('allocation')) {
    return 'File too large for browser memory';
  }
  if (msg.includes('corrupt') || msg.includes('invalid')) {
    return 'File appears corrupted';
  }
  return 'Conversion failed — try again';
}