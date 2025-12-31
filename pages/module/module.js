// pages/module/module.js

import { fetchJSON } from '../../core/fetcher.js';
import { initTabs } from '../../features/tabs/tabs.js';
import { initCodeCopy } from '../../features/code-viewer/code-viewer.js';

document.addEventListener('DOMContentLoaded', initModulePage);

async function initModulePage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    document.body.innerHTML = '<p>Missing module id.</p>';
    return;
  }

  try {
    const module = await fetchJSON(`./data/modules/${id}.json`);
    renderModule(module);
    initTabs();
    initCodeCopy();
  } catch (err) {
    console.error(err);
    document.body.innerHTML = '<p>Module not found.</p>';
  }
}

function renderModule(module) {
  document.getElementById('module-title').textContent = module.meta.name;
  document.getElementById('module-description').textContent = module.meta.description;

  document.getElementById('module-meta').textContent =
    `${module.meta.category} · Updated ${module.meta.updatedAt}`;

  document.getElementById('code-html').textContent = module.html;
  document.getElementById('code-css').textContent = module.css;
  document.getElementById('code-js').textContent = module.js;
}
