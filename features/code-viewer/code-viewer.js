// features/code-viewer/code-viewer.js

export function initCodeCopy() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.copy;
      const codeEl = document.getElementById(targetId);
      if (!codeEl) return;

      navigator.clipboard.writeText(codeEl.textContent);

      const original = btn.textContent;
      btn.textContent = 'Copied';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 1000);
    });
  });
}
