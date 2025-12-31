
const KEBAB_CASE_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function normalizeTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;

  return tags
    .split(',')
    .map(t => t.trim().toLowerCase())
    .filter(Boolean);
}

export function validateModule(module) {
  const errors = [];

  if (!module || typeof module !== 'object') {
    return {
      valid: false,
      errors: ['Module must be an object']
    };
  }

  // --- META ---
  const meta = module.meta;

  if (!meta || typeof meta !== 'object') {
    errors.push('Missing meta object');
  } else {
    if (!isNonEmptyString(meta.id)) {
      errors.push('meta.id is required');
    } else if (!KEBAB_CASE_REGEX.test(meta.id)) {
      errors.push('meta.id must be kebab-case (lowercase, hyphens only)');
    }

    if (!isNonEmptyString(meta.name)) {
      errors.push('meta.name is required');
    }

    if (!isNonEmptyString(meta.description)) {
      errors.push('meta.description is required');
    }

    if (!isNonEmptyString(meta.category)) {
      errors.push('meta.category is required');
    }

    if (meta.tags && !Array.isArray(meta.tags)) {
      errors.push('meta.tags must be an array of strings');
    }

    if (!isNonEmptyString(meta.createdAt) || !DATE_REGEX.test(meta.createdAt)) {
      errors.push('meta.createdAt must be YYYY-MM-DD');
    }

    if (!isNonEmptyString(meta.updatedAt) || !DATE_REGEX.test(meta.updatedAt)) {
      errors.push('meta.updatedAt must be YYYY-MM-DD');
    }
  }

  // --- CODE BLOCKS ---
  if (!isNonEmptyString(module.html)) {
    errors.push('html code is required');
  }

  if (!isNonEmptyString(module.css)) {
    errors.push('css code is required');
  }

  if (!isNonEmptyString(module.js)) {
    errors.push('js code is required');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Helper exposed for generator step
export function buildNormalizedModule(raw) {
  const today = new Date().toISOString().slice(0, 10);

  return {
    meta: {
      id: raw.id.trim(),
      name: raw.name.trim(),
      description: raw.description.trim(),
      category: raw.category.trim(),
      tags: normalizeTags(raw.tags),
      createdAt: today,
      updatedAt: today
    },
    html: raw.html.trim(),
    css: raw.css.trim(),
    js: raw.js.trim()
  };
}