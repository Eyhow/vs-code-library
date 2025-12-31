export function initHeader() {
  const search = document.querySelector('.header-search');
  if (!search) return;

  // Only enable search on dashboard
  if (!document.body.classList.contains('page-dashboard')) {
    search.style.display = 'none';
    return;
  }

  search.addEventListener('input', () => {
    const query = search.value.toLowerCase();
    window.dispatchEvent(
      new CustomEvent('dashboard:search', { detail: query })
    );
  });
}
