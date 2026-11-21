'use strict';
(() => {
  const bounds = [[98, 29], [166, 150]];
  const stampSize = 56;
  const tapSize = 44;
  const gap = 5;

  function freePosition(x, y, width, height, canvas, occupied) {
    const clamp = (value, max) => Math.max(2, Math.min(value, max - 2));
    const columns = [x, ...occupied.flatMap(box => [box.x - width - gap, box.x + box.width + gap])];
    const rows = [y, ...occupied.flatMap(box => [box.y - height - gap, box.y + box.height + gap])];
    const choices = columns.flatMap(left => rows.map(top => ({
      x: clamp(left, canvas.clientWidth - width),
      y: clamp(top, canvas.clientHeight - height)
    })));
    return choices.sort((a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y))
      .find(candidate => occupied.every(box =>
        candidate.x + width + gap <= box.x || box.x + box.width + gap <= candidate.x ||
        candidate.y + height + gap <= box.y || box.y + box.height + gap <= candidate.y));
  }
  const stops = [
    { name: 'Hanged Man’s Tree', point: [137.906, 121.516] },
    { name: 'Mulbrydale approach', point: [129.016, 116.984] },
    { name: 'Inn at the Crossroads', point: [128.141, 95.516], icon: 'tavern' },
    { name: 'Heatherton', point: [126.828, 57.891] }
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
      canvas.append(labelBox);
      labelBox.classList.remove('is-below-stamp');
      const width = labelBox.offsetWidth;
      const height = labelBox.offsetHeight;
      const bounds = entry.tapBounds;
      const position = freePosition(bounds.x + (tapSize - width) / 2, bounds.y - height - gap,
        width, height, canvas, [...pins.values()].filter(pin => pin.visible).map(pin => pin.tapBounds));
      if (!position) {
        canvas.after(labelBox);
        labelBox.classList.add('is-below-stamp');
        return;
      }
      labelBox.style.left = position.x + 'px';
      labelBox.style.top = position.y + 'px';
    }
    function select(id, focusLabel = true) {
      selected = pins.get(id)?.visible ? id : null;
      labelBox.replaceChildren();
      labelBox.hidden = !selected;
      for (const [key, { button }] of pins) {
        const active = key === selected;
        button.classList.toggle('is-selected', active);
        button.setAttribute('aria-expanded', String(active));
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
      const button = node('button', '', 'nilf-map-seal');
      button.type = 'button';
      button.dataset.seal = current ? 'objective' : (stop.seal || 'waypoint');
      button.setAttribute('aria-label', stop.name + (current ? ', current objective' : '') +
        (approximate ? ', approximate area' : ''));
      const art = node('span', '', 'nilf-map-seal-art');
      if (stop.icon && !current && !stop.seal) {
        button.dataset.seal = stop.icon;
        const img = node('img');
        img.src = 'map-icon-' + stop.icon + '.png';
        img.alt = '';
        art.append(img);
      }
      button.append(art);
      button.addEventListener('click', () => select(id));
      L.DomEvent.disableClickPropagation(button);
      const pin = L.marker(stop.point, {
        interactive: false, keyboard: false,
        icon: L.divIcon({ className: 'nilf-map-pin', html: button, iconSize: [tapSize, tapSize] })
      }).addTo(map);
      pins.set(id, { ...stop, pin, button, href, current, approximate, offset });
    }
    function frameStamp() {
      if (!canvas.clientWidth || !canvas.clientHeight) return;
      map.invalidateSize({ pan: false });
      map.setView(objective.point, Math.log2(canvas.clientWidth / stampSize), { animate: false });
      const occupied = [];
      const entries = [...pins.values()].sort((a, b) => Number(b.current) - Number(a.current));
      for (const entry of entries) {
        const [lat, lng] = entry.point;
        const anchorInside = Math.abs(lat - objective.point[0]) <= stampSize / 2 &&
          Math.abs(lng - objective.point[1]) <= stampSize / 2;
        const point = map.latLngToContainerPoint(entry.point);
        const position = anchorInside && freePosition(point.x + entry.offset[0] - tapSize / 2,
          point.y + entry.offset[1] - tapSize / 2, tapSize, tapSize, canvas, occupied);
        const element = entry.pin.getElement();
        entry.visible = Boolean(position);
        element.hidden = !entry.visible;
        if (!position) continue;
        entry.tapBounds = { ...position, width: tapSize, height: tapSize };
        occupied.push(entry.tapBounds);
        element.style.marginLeft = (position.x - point.x) + 'px';
        element.style.marginTop = (position.y - point.y) + 'px';
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
        seal: index === 0 ? 'flame' : 'shackle'
      }, { href: item.href, approximate: true, offset: [index === 0 ? -24 : 24, -42] }));
      (nearby[3] || []).forEach((item, index) => marker(item.kind, {
        name: item.label,
        point: stops[2].point,
        icon: item.kind === 'service' ? 'merchant' : 'notice'
      }, { href: item.href, offset: [index === 0 ? -48 : 48, 48] }));

      frameStamp();
      resize.observe(canvas);
      map.on('click', () => select(null));
      shell.addEventListener('keydown', event => {
        if (event.key !== 'Escape' || !selected) return;
        const element = pins.get(selected).button;
        select(null);
        element.focus({ preventScroll: true });
      });
    });
    return () => { cancelAnimationFrame(frame); resize.disconnect(); map.remove(); };
  }
  window.PhoenixNilfAreaMap = { mount };
})();
