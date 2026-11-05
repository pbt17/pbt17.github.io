// One complete list, with an optional curated view. All text is rendered by Jekyll.
(() => {
  const root = document.documentElement;
  const button = document.querySelector('.paper-view-toggle');
  const heading = document.getElementById('research');
  if (!button || !heading) return;

  function targetFromHash() {
    try { return document.getElementById(decodeURIComponent(window.location.hash.slice(1))); }
    catch { return null; }
  }
  function setView(view, updateURL = false) {
    const all = view === 'all';
    root.dataset.paperView = all ? 'all' : 'selected';
    heading.textContent = all ? 'All Papers' : 'Selected Papers';
    button.textContent = all ? 'Show Selected Papers' : 'Show All Papers';
    button.setAttribute('aria-pressed', String(all));
    document.querySelectorAll('.paper-entry h4').forEach(title => title.setAttribute('aria-level', all ? '4' : '3'));
    if (updateURL) {
      const url = new URL(window.location.href);
      if (all) url.searchParams.set('papers', 'all');
      else {
        url.searchParams.delete('papers');
        const target = targetFromHash();
        if (target?.closest('.paper-entry[data-selected="false"]') || target?.matches('.research-topic h3')) url.hash = '';
      }
      history.replaceState(null, '', url);
      // Keep the design preview's Clean View link in sync.
      url.searchParams.delete('preview');
      const cleanLink = document.querySelector('.clean-preview');
      if (cleanLink) cleanLink.href = url.pathname + url.search + url.hash;
    }
  }
  function revealAnchor() {
    const target = targetFromHash();
    if (target?.closest('.paper-entry[data-selected="false"]') || target?.matches('.research-topic h3')) {
      setView('all', true);
      target.scrollIntoView();
    }
  }
  setView(new URL(window.location.href).searchParams.get('papers') === 'all' ? 'all' : 'selected');
  button.hidden = false;
  button.addEventListener('click', () => setView(root.dataset.paperView === 'selected' ? 'all' : 'selected', true));
  window.addEventListener('hashchange', revealAnchor);
  revealAnchor();
})();
