'use strict';
(() => {
  const bounds = [[112, 48], [160, 128]];
  const stops = [
    { name: 'Hanged Man’s Tree', point: [137.906, 121.516], icon: 'fasttravel' },
    { name: 'Mulbrydale approach', point: [129.016, 116.984], icon: 'fasttravel' },
    { name: 'Inn at the Crossroads', point: [128.141, 95.516], icon: 'tavern' },
    { name: 'Heatherton', point: [126.828, 57.891], icon: 'fasttravel' }
  ];
  // A broad planning area between sourced landmarks, not a game quest boundary or NPC position.
  const approach = [[126, 99], [132, 116]];
  function mount(parent, { stage, nearby, quests, completed, open }) {
    const node = (tag, name, className) => {
      const element = document.createElement(tag);
      if (name) element.textContent = name;
      if (className) element.className = className;
      return element;
    };
    const shell = node('section', '', 'nilf-area-map');
    const tools = node('div', '', 'nilf-area-map-tools');
    const canvas = node('div', '', 'nilf-area-canvas');
    canvas.setAttribute('aria-label', 'Velen map around the Nilfgaardian Connection');
    const choices = node('div', '', 'nilf-area-choices');
    choices.hidden = true;
    const caption = node('p', '', 'nilf-area-caption');
    const credit = node('a', 'Map sources');
    credit.href = 'MAP-SOURCES.md';
    shell.append(tools, canvas, caption, choices, credit);
    parent.append(shell);

    const route = location.hash;
    const prior = history.state?.nilfArea;
    let full = prior?.full === true;
    let selected = prior?.selected ?? null;
    let hideCompleted = prior?.hideCompleted === true;
    const map = L.map(canvas, { crs: L.CRS.Simple, minZoom: 1, maxZoom: 6, zoomSnap: .25, maxBounds: bounds });
    L.imageOverlay('velen-nilf-map.webp', bounds, { className: 'nilf-area-terrain' }).addTo(map);
    const markers = L.layerGroup().addTo(map);
    function remember() {
      if (location.hash !== route || !map.getZoom()) return;
      const { lat, lng } = map.getCenter();
      history.replaceState({ ...history.state, nilfArea: { center: [lat, lng], zoom: map.getZoom(), full, selected, hideCompleted } }, '');
    }
    function action(label, handler) {
      const button = node('button', label);
      button.type = 'button';
      button.onclick = handler;
      return button;
    }
    const currentButton = action('Current stop', () => setScope(false));
    const allButton = action('All linked stops', () => setScope(true));
    tools.append(currentButton, allButton, action('Recenter', () => { fit(); remember(); }));
    function layers() {
      try { return localStorage.getItem('phoenix.map.progress.v1') === 'on'; } catch { return false; }
    }
    let progress = layers();
    const progressButton = action('Progress', () => {
      progress = !progress;
      try { localStorage.setItem('phoenix.map.progress.v1', progress ? 'on' : 'off'); } catch {}
      paint();
    });
    const completedButton = action('Hide completed', () => {
      hideCompleted = !hideCompleted;
      choices.hidden = true;
      paint();
      remember();
    });
    tools.append(progressButton, completedButton);
    function linksFor(n) {
      return (nearby[n] || []).filter(item => !(progress && hideCompleted && item.quest && completed(item.quest))).map(item => ({
        ...item, label: item.label || quests[item.quest]?.name || ''
      }));
    }
    function choose(id, links, label) {
      selected = id;
      remember();
      if (links.length === 1) return open(links[0].href);
      choices.replaceChildren(node('h2', label));
      for (const item of links) {
        choices.append(action(item.label, () => open(item.href)));
      }
      choices.append(action('Close', () => { choices.hidden = true; }));
      choices.hidden = false;
      choices.querySelector('button')?.focus();
      paint();
    }
    function marker(stop, id, links, current) {
      const seal = node('span', '', 'nilf-map-seal');
      if (current) seal.classList.add('is-current');
      if (selected === id) seal.classList.add('is-selected');
      const img = node('img');
      img.src = 'map-icon-' + stop.icon + '.png';
      img.alt = '';
      const label = node('span', stop.name, 'nilf-map-label');
      seal.append(img, label);
      if (links.length > 1) seal.append(node('span', String(links.length), 'nilf-map-count'));
      if (progress && links.some(link => link.quest && completed(link.quest))) {
        seal.append(node('span', '✓', 'nilf-map-count'));
      }
      const pin = L.marker(stop.point, {
        title: stop.name, alt: stop.name,
        icon: L.divIcon({ className: 'nilf-map-pin', html: seal, iconSize: [44, 44], iconAnchor: [22, 22] })
      }).addTo(markers);
      pin.on('click', () => choose(id, links, stop.name));
      const element = pin.getElement();
      element?.setAttribute('aria-label', stop.name + (current ? ', current stop' : '') +
        (links.length > 1 ? ', ' + links.length + ' links' : ''));
    }
    function paint() {
      markers.clearLayers();
      currentButton.setAttribute('aria-pressed', String(!full));
      allButton.setAttribute('aria-pressed', String(full));
      progressButton.setAttribute('aria-pressed', String(progress));
      completedButton.hidden = !progress;
      completedButton.setAttribute('aria-pressed', String(hideCompleted));
      const visible = full ? [1, 2, 3, 4] : [stage];
      for (const n of visible) {
        const spot = stops[n - 1];
        const local = n === 3 ? linksFor(3) : [];
        marker(spot, 'stop-' + n, [{ label: 'Open walkthrough', href: '#velen/quest/nilf/' + n }, ...local], n === stage);
      }
      stops.forEach((spot, index) => {
        if (visible.includes(index + 1)) return;
        L.circleMarker(spot.point, { radius: 4, color: '#2c2721', weight: 1, fillColor: '#ede4c8', fillOpacity: 1, interactive: false })
          .bindTooltip(index === 1 ? 'Mulbrydale' : spot.name, { direction: 'right', permanent: true, className: 'nilf-map-landmark' })
          .addTo(markers);
      });
      const showApproach = full || stage === 2;
      if (showApproach) {
        const group = linksFor(2);
        caption.replaceChildren();
        if (group.length) {
          L.rectangle(approach, { stroke: false, color: '#bf972b', fillOpacity: .26, interactive: false }).addTo(markers);
          const control = action('Approach activities · approximate area', () => choose('approach', group, 'Mulbrydale approach'));
          control.className = 'nilf-map-area-link';
          if (selected === 'approach') control.classList.add('is-selected');
          if (progress) {
            const count = group.filter(item => completed(item.quest)).length;
            control.textContent += ' · ' + count + '/' + group.length + ' complete';
          }
          caption.replaceChildren(control);
        }
      } else {
        caption.textContent = 'Select the inn seal for the walkthrough, innkeeper, or notices.';
        if (stage !== 3) caption.textContent = '';
      }
    }
    function fit() {
      if (full) map.fitBounds(L.latLngBounds(bounds).pad(-.12), { padding: [20, 20] });
      else if (stage === 2) map.fitBounds(approach, { padding: [38, 38], maxZoom: 4 });
      else map.setView(stops[stage - 1].point, 4.25);
    }
    function setScope(all) {
      full = all;
      selected = null;
      choices.hidden = true;
      paint();
      fit();
      remember();
    }
    const frame = requestAnimationFrame(() => {
      if (!canvas.isConnected) return;
      map.invalidateSize({ pan: false });
      if (prior?.center && Number.isFinite(prior.zoom)) map.setView(prior.center, prior.zoom);
      else fit();
      paint();
      map.on('moveend zoomend', remember);
    });
    return () => { cancelAnimationFrame(frame); map.remove(); };
  }
  window.PhoenixNilfAreaMap = { mount };
})();
