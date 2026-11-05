// Optional design comparison. The complete website content is rendered by Jekyll.
(() => {
  const root = document.documentElement;
  const url = new URL(window.location.href);
  const choices = {
    accent: ['blue', 'forest'],
    font: ['system', 'garamond']
  };
  const panel = document.querySelector('.design-preview');
  const cleanLink = document.querySelector('.clean-preview');

  for (const [key, allowed] of Object.entries(choices)) {
    const value = url.searchParams.get(key);
    if (allowed.includes(value)) root.dataset[key] = value;
  }
  // Keep previously shared preview links useful after replacing the heading toggle.
  if (!url.searchParams.has('font') && url.searchParams.has('type')) {
    root.dataset.font = url.searchParams.get('type') === 'serif' ? 'garamond' : 'system';
  }

  function syncControls() {
    document.querySelectorAll('[data-setting]').forEach(control => {
      if (control.tagName === 'SELECT') control.value = root.dataset[control.dataset.setting];
      else control.setAttribute('aria-pressed', String(root.dataset[control.dataset.setting] === control.dataset.value));
    });
    const cleanURL = new URL(window.location.href);
    cleanURL.searchParams.delete('preview');
    cleanLink.href = cleanURL.pathname + cleanURL.search + cleanURL.hash;
  }

  panel.hidden = url.searchParams.get('preview') !== '1';
  syncControls();
  function setChoice(key, value) {
    if (!choices[key]?.includes(value)) return;
    root.dataset[key] = value;
    const nextURL = new URL(window.location.href);
    nextURL.searchParams.delete('type');
    nextURL.searchParams.delete('layout');
    Object.keys(choices).forEach(setting => nextURL.searchParams.set(setting, root.dataset[setting]));
    window.history.replaceState(null, '', nextURL);
    syncControls();
  }
  panel.addEventListener('click', event => {
    const button = event.target.closest('button[data-setting]');
    if (button) setChoice(button.dataset.setting, button.dataset.value);
  });
  panel.addEventListener('change', event => {
    const select = event.target.closest('select[data-setting]');
    if (select) setChoice(select.dataset.setting, select.value);
  });
})();
