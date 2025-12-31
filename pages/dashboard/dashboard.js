// pages/dashboard/dashboard.js

import { fetchJSON } from '../../core/fetcher.js';

let allModules = [];

document.addEventListener('DOMContentLoaded', initDashboard);

async function initDashboard() {
  const grid = document.getElementById('module-grid');
  if (!grid) return;

  try {
    const modules = await fetchJSON('./data/modules.json');
    allModules = modules;
    renderModules(grid, modules);
  } catch (err) {
    console.error(err);
    grid.innerHTML = '<p>Failed to load modules.</p>';
  }
}

function renderModules(container, modules) {
  if (!Array.isArray(modules) || modules.length === 0) {
    container.innerHTML = '<p>No modules found with that name.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();

  modules.forEach((m) => {
    const card = document.createElement('a');
    card.className = 'module-card card';
    card.href = `./module.html?id=${encodeURIComponent(m.id)}`;

    card.innerHTML = `
      <div class="module-card__title">${escapeHTML(m.name)}</div>
      <div class="module-card__meta">
        <span class="module-card__category">${escapeHTML(m.category)}</span>
        <span class="module-card__date">${escapeHTML(m.updatedAt)}</span>
      </div>
    `;

    fragment.appendChild(card);
  });

  container.innerHTML = '';
  container.appendChild(fragment);
  
}

window.addEventListener('dashboard:search', (e) => {
  const query = e.detail;

  const filtered = allModules.filter(m =>
    m.name.toLowerCase().includes(query) ||
    m.category.toLowerCase().includes(query)
  );

  const grid = document.getElementById('module-grid');
  renderModules(grid, filtered);
});

function escapeHTML(str = '') {
  return str.replace(/[&<>"']/g, s => (
    { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[s]
  ));
}
