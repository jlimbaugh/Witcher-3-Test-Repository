'use strict';
(() => {
  const views = [...document.querySelectorAll('.view')];
  const key = 'phoenix.whiteorchard.pilot.v1';
  let complete = false;
  let canSave = true;
  try { complete = JSON.parse(localStorage.getItem(key) || '{}').firestarter === true; }
  catch { canSave = false; }
  function reflect() {
    document.querySelectorAll('[data-complete-quest]').forEach(input => { input.checked = complete; });
    document.querySelectorAll('[data-quest-status]').forEach(el => { el.textContent = complete ? 'Completed' : 'Not completed'; });
    document.querySelectorAll('[data-save-message]').forEach(el => { el.textContent = canSave ? 'Progress saves in this browser.' : 'Progress cannot be saved in this browser. This visit only.'; });
  }
  document.querySelectorAll('[data-complete-quest]').forEach(input => input.addEventListener('change', () => {
    complete = input.checked;
    try { localStorage.setItem(key, JSON.stringify({firestarter: complete})); canSave = true; }
    catch { canSave = false; }
    reflect();
  }));
  function route() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)) || 'home'; } catch { id = 'not-found'; }
    if (id === 'main') id = views.find(view => !view.hidden)?.id || 'home';
    if (id === 'home__continue') id = 'regions';
    const target = views.find(view => view.id === id) || document.getElementById('not-found');
    views.forEach(view => { view.hidden = view !== target; });
    document.querySelectorAll('.guide-bar nav a').forEach(a => {
      const selected = target.id === 'home' ? a.hash === '#home' : a.hash === '#regions';
      if (selected) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.title = `${target.querySelector('h1').innerText.replace(/\s+/g,' ').trim()} · Witcher Field Guide`;
    window.scrollTo(0, 0);
    const heading = target.querySelector('h1');
    heading.setAttribute('tabindex', '-1');
    heading.focus({preventScroll:true});
  }
  reflect();
  addEventListener('hashchange', route);
  route();
})();
