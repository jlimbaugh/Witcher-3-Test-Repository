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
  function mount(parent, { stage, nearby, quests, open }) {
    const node = (tag, name, className) => {
      const element = document.createElement(tag);
      if (name) element.textContent = name;
      if (className) element.className = className;
      return element;
    };
    const shell = node('section', '', 'nilf-area-map');
    const canvas = node('div', '', 'nilf-area-canvas');
    canvas.setAttribute('aria-label', 'Velen map around the Nilfgaardian Connection');
    const recenter = node('button', 'Recenter', 'nilf-area-recenter');
    recenter.type = 'button';
    const credit = node('a', 'Map sources');
    credit.href = 'MAP-SOURCES.md';
    shell.append(canvas, recenter, credit);
    parent.append(shell);

    const route = location.hash;
    const prior = history.state?.nilfArea;
    let selected = prior?.selected ?? null;
    const objective = stops[stage - 1];
    const map = L.map(canvas, { crs: L.CRS.Simple, minZoom: 1, maxZoom: 6, zoomSnap: .25, zoomControl: false });
    L.imageOverlay('velen-nilf-map.webp', bounds, { className: 'nilf-area-terrain' }).addTo(map);

    const area = L.rectangle(approach, { stroke: false, color: '#dca359', fillOpacity: 0, interactive: false }).addTo(map);
    const areaCenter = area.getBounds().getCenter();
    const pins = new Map();
    let popup;
    function remember() {
      if (location.hash !== route || !Number.isFinite(map.getZoom())) return;
      const { lat, lng } = map.getCenter();
      history.replaceState({ ...history.state, nilfArea: { center: [lat, lng], zoom: map.getZoom(), selected } }, '');
    }
    function select(id, autoPan = true) {
      selected = pins.has(id) ? id : null;
      if (popup) {
        map.removeLayer(popup);
        popup = null;
      }
      for (const [key, { seal, pin }] of pins) {
        const active = key === selected;
        seal.classList.toggle('is-selected', active);
        pin.getElement().setAttribute('aria-expanded', String(active));
      }
      const entry = pins.get(selected);
      area.setStyle({ fillOpacity: entry?.approximate ? .32 : 0 });
      if (entry) {
        const content = node('div', '', 'nilf-map-popup-content');
        const label = node('a', entry.href ? entry.name + ' ›' : entry.name, 'nilf-map-label');
        if (entry.href) {
          label.href = entry.href;
          label.onclick = event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            remember();
            open(entry.href);
          };
        }
        content.append(label);
        if (entry.approximate) content.append(node('small', 'Approximate area'));
        popup = L.popup({ closeButton: false, closeOnClick: false, closeOnEscapeKey: false, autoPan,
          offset: [entry.offset[0], entry.offset[1] - 23], className: 'nilf-map-popup' })
          .setLatLng(entry.point).setContent(content).addTo(map);
        if (entry.href) label.focus({ preventScroll: true });
      }
      remember();
    }
    function marker(id, stop, { href, current = false, approximate = false, offset = [0, 0] } = {}) {
      const seal = node('span', '', 'nilf-map-seal');
      if (current) seal.classList.add('is-current');
      const img = node('img');
      img.src = 'map-icon-' + stop.icon + '.png';
      img.alt = '';
      seal.append(img);
      const pin = L.marker(stop.point, {
        alt: stop.name, bubblingMouseEvents: false, zIndexOffset: current ? 100 : 0,
        icon: L.divIcon({ className: 'nilf-map-pin', html: seal, iconSize: [44, 44], iconAnchor: [22 - offset[0], 22 - offset[1]] })
      }).addTo(map);
      pins.set(id, { ...stop, pin, seal, href, approximate, offset });
      const element = pin.getElement();
      element.setAttribute('aria-label', stop.name + (current ? ', current objective' : '') +
        (approximate ? ', approximate area' : ''));
      element.addEventListener('keydown', event => {
        if (event.key !== ' ') return;
        event.preventDefault();
        select(id);
      });
      pin.on('click', () => select(id));
    }
    function fit() {
      map.setView(objective.point, canvas.clientWidth < 460 ? 2.75 : 3.5);
    }
    const frame = requestAnimationFrame(() => {
      if (!canvas.isConnected) return;
      map.invalidateSize({ pan: false });
      if (prior?.center && Number.isFinite(prior.zoom)) map.setView(prior.center, prior.zoom);
      else fit();

      stops.forEach((stop, index) => {
        const n = index + 1;
        marker('stop-' + n, stop, { href: '#velen/quest/nilf/' + n, current: n === stage });
      });
      // Fan out shared-location seals visually while retaining their shared map anchors.
      (nearby[2] || []).forEach((item, index) => marker(item.quest, {
        name: item.label || quests[item.quest].name,
        point: areaCenter,
        icon: index === 0 ? 'sidequests' : 'poi'
      }, { href: item.href, approximate: true, offset: [index === 0 ? -24 : 24, -42] }));
      (nearby[3] || []).forEach((item, index) => marker(item.kind, {
        name: item.label,
        point: stops[2].point,
        icon: item.kind === 'service' ? 'merchant' : 'notice'
      }, { href: item.href, offset: [index === 0 ? -48 : 48, 26] }));

      select(selected, false);
      map.on('click', () => select(null));
      map.on('moveend zoomend', remember);
      canvas.addEventListener('keydown', event => {
        if (event.key !== 'Escape' || !selected) return;
        const element = pins.get(selected).pin.getElement();
        select(null);
        element.focus({ preventScroll: true });
      });
      recenter.onclick = () => { select(null); fit(); remember(); };
    });
    return () => { cancelAnimationFrame(frame); map.remove(); };
  }
  window.PhoenixNilfAreaMap = { mount };
})();
