'use strict';
(() => {
  const bounds = [[98, 29], [166, 150]];
  const stampSize = 56;
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
    const credit = node('a', 'Map sources');
    credit.href = 'MAP-SOURCES.md';
    shell.append(canvas, credit);
    parent.append(shell);

    const route = location.hash;
    const prior = history.state?.nilfArea;
    let selected = prior?.selected ?? null;
    const objective = stops[stage - 1];
    const map = L.map(canvas, {
      crs: L.CRS.Simple, zoomSnap: 0, zoomControl: false, trackResize: false,
      dragging: false, touchZoom: false, scrollWheelZoom: false,
      doubleClickZoom: false, boxZoom: false, keyboard: false
    });
    L.imageOverlay('velen-nilf-map.webp', bounds, { className: 'nilf-area-terrain' }).addTo(map);

    const area = L.rectangle(approach, { stroke: false, color: '#dca359', fillOpacity: 0, interactive: false }).addTo(map);
    const areaCenter = area.getBounds().getCenter();
    const pins = new Map();
    const labelBox = node('div', '', 'nilf-map-popup-content');
    labelBox.hidden = true;
    canvas.append(labelBox);
    L.DomEvent.disableClickPropagation(labelBox);
    function remember() {
      if (location.hash === route) history.replaceState({ ...history.state, nilfArea: { selected } }, '');
    }
    function positionLabel(entry) {
      const pin = map.latLngToContainerPoint(entry.point);
      const x = pin.x + entry.shownOffset[0];
      const y = pin.y + entry.shownOffset[1];
      const halfWidth = labelBox.offsetWidth / 2;
      const left = Math.max(halfWidth + 4, Math.min(x, canvas.clientWidth - halfWidth - 4));
      labelBox.style.left = left + 'px';
      const above = y - 26 - labelBox.offsetHeight;
      labelBox.style.top = (above >= 4 ? above : y + 26) + 'px';
    }
    function select(id, focusLabel = true) {
      selected = pins.get(id)?.visible ? id : null;
      labelBox.replaceChildren();
      labelBox.hidden = !selected;
      for (const [key, { seal, pin }] of pins) {
        const active = key === selected;
        seal.classList.toggle('is-selected', active);
        pin.getElement()?.setAttribute('aria-expanded', String(active));
      }
      const entry = pins.get(selected);
      area.setStyle({ fillOpacity: entry?.approximate ? .32 : 0 });
      if (entry) {
        const label = node('a', entry.name + ' ›', 'nilf-map-label');
        label.href = entry.href;
        label.onclick = event => {
          if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          remember();
          open(entry.href);
        };
        labelBox.append(label);
        if (entry.approximate) labelBox.append(node('small', 'Approximate area'));
        positionLabel(entry);
        if (focusLabel) label.focus({ preventScroll: true });
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
        alt: stop.name, autoPanOnFocus: false, bubblingMouseEvents: false, zIndexOffset: current ? 100 : 0,
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
    function frameStamp() {
      if (!canvas.clientWidth || !canvas.clientHeight) return;
      map.invalidateSize({ pan: false });
      map.setView(objective.point, Math.log2(canvas.clientWidth / stampSize), { animate: false });
      for (const entry of pins.values()) {
        const [lat, lng] = entry.point;
        const anchorInside = Math.abs(lat - objective.point[0]) <= stampSize / 2 &&
          Math.abs(lng - objective.point[1]) <= stampSize / 2;
        const point = map.latLngToContainerPoint(entry.point);
        const x = point.x + entry.offset[0], y = point.y + entry.offset[1];
        const clamp = (value, size) => Math.max(23, Math.min(value, size - 23));
        entry.visible = anchorInside;
        entry.shownOffset = [clamp(x, canvas.clientWidth) - point.x, clamp(y, canvas.clientHeight) - point.y];
        const element = entry.pin.getElement();
        element.hidden = !entry.visible;
        element.style.marginLeft = (entry.shownOffset[0] - 22) + 'px';
        element.style.marginTop = (entry.shownOffset[1] - 22) + 'px';
      }
      if (pins.size) select(selected, false);
    }
    const resize = new ResizeObserver(frameStamp);
    const frame = requestAnimationFrame(() => {
      if (!canvas.isConnected) return;
      frameStamp();

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
      }, { href: item.href, offset: [index === 0 ? -48 : 48, 48] }));

      frameStamp();
      resize.observe(canvas);
      map.on('click', () => select(null));
      canvas.addEventListener('keydown', event => {
        if (event.key !== 'Escape' || !selected) return;
        const element = pins.get(selected).pin.getElement();
        select(null);
        element.focus({ preventScroll: true });
      });
    });
    return () => { cancelAnimationFrame(frame); resize.disconnect(); map.remove(); };
  }
  window.PhoenixNilfAreaMap = { mount };
})();
