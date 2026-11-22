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
  function mount(parent, { stage, nearby, quests, open, complete, back }) {
    const node = (tag, name, className) => {
      const element = document.createElement(tag);
      if (name) element.textContent = name;
      if (className) element.className = className;
      return element;
    };
    const shell = node('section', '', 'nilf-area-map');
    shell.dataset.velenNilf = 'map';
    const canvas = node('div', '', 'nilf-area-canvas');
    canvas.setAttribute('aria-label', 'Velen map');
    const terrainBounds = L.latLngBounds(bounds);
    const terrainWidth = terrainBounds.getEast() - terrainBounds.getWest();
    const terrainHeight = terrainBounds.getNorth() - terrainBounds.getSouth();
    if (!stage) canvas.style.aspectRatio = terrainWidth + ' / ' + terrainHeight;
    const credit = node('a', 'Map sources');
    credit.href = 'MAP-SOURCES.md';
    const toolbar = node('nav', '', 'nilf-map-toolbar');
    toolbar.setAttribute('aria-label', 'Map controls');
    const control = (label, action) => {
      const button = node('button', label, 'nilf-map-control');
      button.type = 'button';
      button.onclick = action;
      return button;
    };
    const layers = node('section', '', 'nilf-map-layers');
    layers.id = 'velen-map-layers';
    layers.hidden = true;
    const toggleLayers = control('Layers', () => {
      layers.hidden = !layers.hidden;
      toggleLayers.setAttribute('aria-expanded', String(!layers.hidden));
    });
    toggleLayers.setAttribute('aria-controls', layers.id);
    toggleLayers.setAttribute('aria-expanded', 'false');
    const progress = node('input');
    progress.type = 'checkbox';
    const preference = 'phoenix.velen.map.progress';
    try { progress.checked = localStorage.getItem(preference) === 'true'; } catch {}
    const progressLabel = node('label');
    progressLabel.append(progress, document.createTextNode(' Progress'));
    layers.append(progressLabel,
      control('Zoom in', () => map.zoomIn()), control('Zoom out', () => map.zoomOut()));
    progress.onchange = () => {
      try { localStorage.setItem(preference, String(progress.checked)); } catch {}
      layoutMarkers();
    };
    const recenter = control('Recenter', () => {
      const [center, zoom] = openingView();
      map.setView(center, zoom, { animate: false });
    });
    toolbar.append(control('Back', back), toggleLayers, recenter);
    const legend = node('details', '', 'nilf-map-disclosure');
    legend.append(node('summary', 'Map legend & coverage'),
      node('p', 'The silver rim marks the current objective. A numbered seal groups nearby entries. Shaded areas mark approximate encounter locations.'),
      node('p', 'This pilot covers the Nilfgaardian Connection and mapped stops around its route.'));
    const list = node('details', '', 'nilf-map-disclosure');
    const locations = node('ul');
    list.append(node('summary', 'Accessible marker list'), locations);
    shell.append(toolbar, layers, canvas, legend, list, credit);
    parent.append(shell);

    const route = location.hash;
    const prior = history.state?.nilfArea;
    let selected = prior?.selected ?? null;
    const objective = stage ? stops[stage - 1] : null;
    const map = L.map(canvas, {
      crs: L.CRS.Simple, zoomSnap: 0, zoomControl: false, trackResize: false,
      minZoom: 0, maxZoom: 5, scrollWheelZoom: false,
      maxBounds: terrainBounds, maxBoundsViscosity: 1
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
      if (location.hash !== route) return;
      const { lat, lng } = map.getCenter();
      history.replaceState({ ...history.state, nilfArea: { selected, center: [lat, lng], zoom: map.getZoom() } }, '');
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
      area.setStyle({ fillOpacity: entry?.group.some(item => item.approximate) ? .32 : 0 });
      if (entry) {
        for (const item of entry.group) {
          const label = node('a', item.name + ' ›', 'nilf-map-label');
          label.href = item.href;
          if (progress.checked && item.activity && complete(item.activity)) {
            label.classList.add('is-done');
            label.textContent = '✓ ' + label.textContent;
          }
          label.onclick = event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            remember();
            open(item.href);
          };
          labelBox.append(label);
        }
        if (entry.group.some(item => item.approximate)) labelBox.append(node('small', 'Approximate area'));
        positionLabel(entry);
        if (focusLabel) labelBox.querySelector('a')?.focus({ preventScroll: true });
      }
      remember();
    }
    function marker(id, stop, { href, current = false, approximate = false, landmark = false, activity } = {}) {
      const button = node('a', '', 'nilf-map-seal');
      button.href = href;
      button.setAttribute('role', 'button');
      button.dataset.seal = stop.seal || 'waypoint';
      button.classList.toggle('is-current', current);
      button.classList.toggle('is-landmark', landmark && !current);
      button.setAttribute('aria-label', stop.name + (current ? ', current objective' : '') +
        (approximate ? ', approximate area' : ''));
      const art = node('span', '', 'nilf-map-seal-art');
      if (stop.icon && !stop.seal) {
        button.dataset.seal = stop.icon;
        const img = node('img');
        img.src = 'map-icon-' + stop.icon + '.png';
        img.alt = '';
        art.append(img);
      }
      const count = node('span', '', 'nilf-map-count');
      const done = node('span', '✓', 'nilf-map-check');
      done.setAttribute('aria-hidden', 'true');
      button.append(art, count, done);
      button.addEventListener('click', event => {
        event.preventDefault();
        select(id);
      });
      button.addEventListener('keydown', event => {
        if (event.key !== ' ') return;
        event.preventDefault();
        select(id);
      });
      L.DomEvent.disableClickPropagation(button);
      const pin = L.marker(stop.point, {
        interactive: false, keyboard: false,
        icon: L.divIcon({ className: 'nilf-map-pin', html: button, iconSize: [tapSize, tapSize] })
      }).addTo(map);
      pins.set(id, { ...stop, pin, button, count, done, href, current, approximate, activity, group: [] });
      const row = node('li');
      const destination = node('a', stop.name + (approximate ? ' · approximate area' : ''));
      destination.href = href;
      row.append(destination);
      locations.append(row);
    }
    function coverageZoom() {
      return Math.log2(Math.max(canvas.clientWidth / terrainWidth, canvas.clientHeight / terrainHeight));
    }
    function openingView() {
      if (!objective) return [terrainBounds.getCenter(), coverageZoom()];
      return [objective.point, Math.max(Math.log2(canvas.clientWidth / stampSize), coverageZoom())];
    }
    function layoutMarkers() {
      if (!pins.size || !canvas.clientWidth) return;
      const occupied = [];
      const groups = [];
      const entries = [...pins.values()].sort((a, b) => Number(b.current) - Number(a.current));
      for (const entry of entries) {
        entry.visible = false;
        entry.pin.getElement().hidden = true;
        const point = map.latLngToContainerPoint(entry.point);
        if (point.x < 0 || point.y < 0 || point.x > canvas.clientWidth || point.y > canvas.clientHeight) continue;
        const group = !entry.current && groups.find(other => !other.entry.current &&
          Math.abs(point.x - other.point.x) < tapSize && Math.abs(point.y - other.point.y) < tapSize);
        if (group) group.entry.group.push(entry);
        else {
          entry.group = [entry];
          groups.push({ entry, point });
        }
      }
      for (const { entry, point } of groups) {
        const position = freePosition(point.x - tapSize / 2, point.y - tapSize / 2,
          tapSize, tapSize, canvas, occupied);
        if (!position) continue;
        const element = entry.pin.getElement();
        entry.visible = true;
        element.hidden = false;
        entry.tapBounds = { ...position, width: tapSize, height: tapSize };
        occupied.push(entry.tapBounds);
        element.style.marginLeft = (position.x - point.x) + 'px';
        element.style.marginTop = (position.y - point.y) + 'px';

        const count = entry.group.length;
        const finished = progress.checked && entry.group.every(item => item.activity && complete(item.activity));
        entry.count.hidden = count < 2;
        entry.count.textContent = count;
        entry.done.hidden = !finished;
        entry.button.classList.toggle('is-done', finished);
        entry.button.setAttribute('aria-label', count > 1 ? count + ' locations including ' + entry.name :
          entry.name + (entry.current ? ', current objective' : '') +
          (entry.approximate ? ', approximate area' : '') + (finished ? ', completed' : ''));
      }
      select(selected, false);
    }
    let loaded = false;
    const resize = new ResizeObserver(() => {
      if (!loaded) return;
      map.invalidateSize({ pan: false });
      map.setMinZoom(coverageZoom());
      map.panInsideBounds(terrainBounds, { animate: false });
      layoutMarkers();
    });
    const frame = requestAnimationFrame(() => {
      if (!canvas.isConnected || !canvas.clientWidth) return;
      const saved = Array.isArray(prior?.center) && prior.center.length === 2 &&
        prior.center.every(Number.isFinite) && Number.isFinite(prior.zoom);
      map.setMinZoom(coverageZoom());
      const [center, zoom] = saved ? [prior.center, prior.zoom] : openingView();
      map.setView(center, zoom, { animate: false });

      stops.forEach((stop, index) => {
        const n = index + 1;
        marker('stop-' + n, stop, { href: '#velen/quest/nilf/' + n, current: n === stage, landmark: !stop.icon, activity: 'nilf' });
      });
      // Keep co-located encounters tied to their shared, approximate area.
      (nearby[2] || []).forEach((item, index) => marker(item.quest, {
        name: item.label || quests[item.quest].name,
        point: areaCenter,
        seal: index === 0 ? 'flame' : 'shackle'
      }, { href: item.href, approximate: true, activity: item.quest }));
      (nearby[3] || []).forEach(item => marker(item.kind, {
        name: item.label,
        point: stops[2].point,
        icon: item.kind === 'service' ? 'merchant' : 'notice'
      }, { href: item.href }));

      layoutMarkers();
      loaded = true;
      resize.observe(canvas);
      map.on('movestart', () => { labelBox.hidden = true; });
      map.on('moveend', layoutMarkers);
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
