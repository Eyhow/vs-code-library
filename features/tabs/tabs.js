// features/tabs/tabs.js

export function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(container => {
    const buttons = container.querySelectorAll('[data-tab]');
    const panels = container.querySelectorAll('[data-panel]');

    function activate(name) {
      buttons.forEach(b =>
        b.classList.toggle('active', b.dataset.tab === name)
      );
      panels.forEach(p =>
        p.hidden = p.dataset.panel !== name
      );
    }

    buttons.forEach(b =>
      b.addEventListener('click', () => activate(b.dataset.tab))
    );

    activate(buttons[0]?.dataset.tab);
  });
}
