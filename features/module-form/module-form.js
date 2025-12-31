// features/module-form/module-form.js

import { validateModule, buildNormalizedModule } from '../../core/validator.js';

export function initModuleForm() {
  const form = document.getElementById('module-form');

  const outputSection = document.getElementById('output');
  const outputCode = document.getElementById('output-json');

  const registrySection = document.getElementById('registry-output');
  const registryCode = document.getElementById('registry-json');
  const copyBtn = document.getElementById('copy-registry');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));
    const moduleCandidate = buildNormalizedModule(data);
    const result = validateModule(moduleCandidate);

    if (!result.valid) {
      alert(result.errors.join('\n'));
      return;
    }

    // ---------- MODULE JSON ----------
    const moduleJSON = JSON.stringify(moduleCandidate, null, 2);
    outputCode.textContent = moduleJSON;
    outputSection.hidden = false;

    downloadJSON(`${moduleCandidate.meta.id}.json`, moduleJSON);

    // ---------- REGISTRY ENTRY ----------
    const registryEntry = {
      id: moduleCandidate.meta.id,
      name: moduleCandidate.meta.name,
      category: moduleCandidate.meta.category,
      updatedAt: moduleCandidate.meta.updatedAt
    };

    const registryJSON = JSON.stringify(registryEntry, null, 2);
    registryCode.textContent = registryJSON;
    registrySection.hidden = false;

    copyBtn.onclick = () => {
      navigator.clipboard.writeText(registryJSON);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => (copyBtn.textContent = 'Copy registry entry'), 1200);
    };
  });
}

function downloadJSON(filename, content) {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
