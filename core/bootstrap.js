import { initHeader } from '../features/header/header.js';
import '../features/footer/footer.js';

async function loadComponent(selector, path) {
  const el = document.querySelector(selector);
  if (!el) return;

  const res = await fetch(path);
  el.innerHTML = await res.text();
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadComponent('[data-header]', './features/header/header.html');
  await loadComponent('[data-footer]', './features/footer/footer.html');

  initHeader();
});
