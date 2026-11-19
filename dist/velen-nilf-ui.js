'use strict';
/* v45 Slice 2: The Nilfgaardian Connection rendered with the White Orchard hub, walkthrough and objective
   carousel component contract (same classes, structure and shared CSS/pointer/button/swipe enhancers).
   State: progress is read from and written to the canonical owner (PhoenixVelenNilfProgress) through the shared
   progression engine's plan(); reading position stays with velen-r18.js. Velen-specific data attributes
   (data-velen-*) keep WO's document-wide progress listeners from ever seeing these cards. */
window.createPhoenixVelenNilfUI = function ({ storage, quests, link, go, regionTools, readingStage, hasReading, activityComplete, rerender }) {
  const owner = window.PhoenixVelenNilfProgress,
    data = owner.data,
    engine = owner.engine,
    Q = owner.QUEST,
    q = quests.nilf,
    objectives = data.quests[Q].objectives,
    viewport = () => window.PhoenixViewport || window;
  const make = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const picture = (src, cls, position) => {
    const im = make('img', cls);
    im.src = src;
    im.alt = '';
    im.decoding = 'async';
    if (position) im.style.objectPosition = position;
    return im;
  };
  const absTop = (node) => {
    const v = viewport(),
      offset = v.reader ? v.reader.getBoundingClientRect().top : 0;
    return Math.max(0, Math.round(node.getBoundingClientRect().top - offset + v.scrollY));
  };
  let current = null, // {page, stage, deck, rail, prep, extras:{find,correct}, rails:Map}
    pendingRestore = null,
    busy = false;
  const memory = { hub: { prep: false, progress: false }, walk: { prep: false, progress: true } };

  // ---- canonical state ----------------------------------------------------------------------------
  const state = () => owner.load(storage);
  function owned() {
    return state().owned;
  }
  function complete() {
    return state().complete;
  }

  // ---- review dialog (same component markup as WO; bound to the Velen owner) ---------------------------
  const dialog = make('dialog', 'progress-dialog velen-progress-dialog');
  dialog.setAttribute('aria-labelledby', 'velen-progress-dialog-title');
  document.body.append(dialog);
  let pending = null,
    options = { catchup: true, choices: {} },
    returnFocus = null;

  // ---- shared quick Undo (QA2 correction 3) -------------------------------------------------------------
  // The three-second .quick-undo control belongs to the shared medallion (medallion.js / home-ui.js, unchanged),
  // whose own handler undoes White Orchard progress. After a Velen commit this module shows that same control for
  // the same three seconds and marks it data-undo-owner="velen". While that Velen window is open, a capture-phase
  // listener claims the tap and undoes the Velen owner only, so the WO handler never runs for a Velen change.
  // A WO commit or WO undo ends the Velen window immediately, so a WO change is always undone by WO.
  const QUICK_UNDO_MS = 3000;
  let quickActive = false,
    quickTimer = 0;
  const medallion = () => window.__phoenixMedallion || null;
  const quickButton = () => medallion()?.quickUndo || document.querySelector('.quick-undo');
  const announce = (text) => {
    const status = medallion()?.element?.querySelector('.medallion-status');
    if (status) status.textContent = text;
  };
  function releaseQuick() {
    clearTimeout(quickTimer);
    if (!quickActive) return;
    quickActive = false;
    const b = quickButton();
    if (b) delete b.dataset.undoOwner;
  }
  function endQuick() {
    const was = quickActive;
    releaseQuick();
    const b = quickButton();
    if (was && b) {
      b.hidden = true;
      b.classList.remove('fading');
    }
  }
  function signalQuickUndo() {
    const b = quickButton();
    if (!b || !state().undo) return;
    const m = medallion();
    if (m?.isQuickUndoVisible?.()) m.dismissQuickUndo?.();
    clearTimeout(quickTimer);
    quickActive = true;
    b.dataset.undoOwner = 'velen';
    b.hidden = false;
    b.classList.remove('fading');
    void b.offsetWidth;
    b.classList.add('fading');
    announce('Progress updated. Quick Undo is available.');
    quickTimer = setTimeout(() => {
      announce('Quick Undo closed. Undo remains in Story & correction controls.');
      endQuick();
    }, QUICK_UNDO_MS);
  }
  document.addEventListener(
    'click',
    (e) => {
      if (!quickActive || !e.target.closest?.('.quick-undo')) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      endQuick();
      const ok = owner.undo(storage).status === 'saved';
      announce(ok ? 'Entire progress update undone.' : 'Undo could not be completed. Review Story & correction controls.');
      if (ok) refreshAfterWrite();
    },
    true,
  );
  window.addEventListener('phoenix:progress-committed', releaseQuick);
  window.addEventListener('phoenix:progress-undone', releaseQuick);
  const esc = (x) => String(x).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const label = (id) => data.objectiveIndex[id].label;
  function request(action) {
    if (busy) return;
    const s = state();
    if (!s.owned) return;
    returnFocus = document.activeElement;
    pending = action;
    options = { catchup: true, choices: {} };
    if (action.editChoice && s.progress.choices.inn) options.choices.inn = s.progress.choices.inn;
    const plan = owner.plan(s.progress, action, options);
    if (
      !action.editChoice &&
      action.kind === 'objective' &&
      !plan.catchup.length &&
      !plan.affected.length &&
      !plan.missingChoices.length &&
      !plan.completionLosses.length
    ) {
      commit(plan);
      return;
    }
    dialog.innerHTML =
      '<h2 id="velen-progress-dialog-title">Review progress update</h2><p data-review-target></p><div class="velen-review-body"><label class="catchup-option" data-catchup-row><input type="checkbox" data-velen-catchup> Also complete earlier required steps</label><div data-review-choices></div><div data-review-impact aria-live="polite"></div><p class="velen-review-undo">One Undo reverses this update.</p></div><div class="dialog-actions"><button type="button" data-velen-cancel>Cancel</button><button type="button" data-velen-confirm>Confirm update</button></div>';
    dialog.querySelector('[data-velen-cancel]').onclick = () => dialog.close();
    dialog.querySelector('[data-velen-confirm]').onclick = () => {
      const p = owner.plan(state().progress, pending, options);
      if (!p.missingChoices.length) commit(p);
    };
    dialog.querySelector('[data-velen-catchup]').onchange = (e) => {
      options.catchup = e.target.checked;
      preview();
    };
    preview();
    dialog.showModal();
  }
  function preview() {
    const plan = owner.plan(state().progress, pending, options);
    dialog.querySelector('[data-review-target]').textContent = q.name;
    const catchup = dialog.querySelector('[data-velen-catchup]');
    dialog.querySelector('[data-catchup-row]').hidden = !plan.catchup.length;
    catchup.checked = options.catchup;
    catchup.disabled = pending.kind === 'quest';
    for (const key of new Set([...plan.missingChoices, ...Object.keys(options.choices)])) {
      let select = dialog.querySelector('[data-velen-choice="' + key + '"]');
      if (!select) {
        const c = data.choices[key],
          wrapper = make('div');
        wrapper.innerHTML =
          '<label for="velen-review-choice-' + key + '">' + esc(c.label) + '</label><select id="velen-review-choice-' + key + '" data-velen-choice="' + key + '"><option value="">Choose what happened…</option>' +
          c.options
            .filter(([v]) => !(v === c.routeValue && data.objectiveIndex[pending.id]?.route === 'inn'))
            .map(([v, t]) => '<option value="' + v + '">' + esc(t) + '</option>')
            .join('') +
          '</select><details><summary>Consequences · Spoilers</summary><p>' + esc(c.outcome) + '</p><p><a href="' + c.routeSource + '" target="_blank" rel="noopener noreferrer">Route source ↗</a></p></details>';
        dialog.querySelector('[data-review-choices]').append(wrapper);
        select = wrapper.querySelector('select');
        select.onchange = () => {
          options.choices[key] = select.value;
          preview();
        };
      }
      select.value = Object.hasOwn(options.choices, key) ? options.choices[key] : state().progress.choices[key] || '';
    }
    const list = (ids) => '<ul>' + ids.map((id) => '<li>' + esc(label(id)) + '</li>').join('') + '</ul>';
    dialog.querySelector('[data-review-impact]').innerHTML =
      (plan.catchup.length ? '<details><summary>' + plan.catchup.length + (plan.catchup.length===1?' earlier required objective':' earlier required objectives') + '</summary>' + list(plan.catchup) + '</details>' : '') +
      (plan.catchup.length
        ? '<p>' + (pending.kind === 'quest' ? 'To mark the quest complete, include the required objectives.' : 'Uncheck to mark only this objective.') + '</p>'
        : '') +
      (plan.affected.length ? '<details open><summary>' + plan.affected.length + ' objective marks will be removed</summary>' + list(plan.affected) + '</details>' : '') +
      (plan.completionLosses.length ? '<div class="risk-note"><strong>Saved quest completion will be removed</strong><ul><li>' + esc(q.name) + '</li></ul></div>' : '') +
      (plan.confirmedCompletion // QA4: direct-route whole-quest confirmation
        ? '<p data-velen-confirmation>You read Hendrik’s notes, which finishes the quest. This records the whole quest as complete without marking any objective and without an inn outcome. Objectives you have not recorded stay unmarked; “Go to the Inn at the Crossroads.” stays unconfirmed.</p>'
        : '') +
      (pending.kind === 'reconcile-legacy'
        ? '<p class="risk-note">This explicitly replaces the saved whole-quest completion with the objectives recorded here. If they are incomplete, the quest becomes incomplete.</p>'
        : '');
    dialog.querySelector('[data-velen-confirm]').disabled = plan.missingChoices.length > 0;
  }
  dialog.addEventListener('close', () => {
    pending = null;
    returnFocus?.focus({ preventScroll: true });
  });
  function refreshAfterWrite() {
    pendingRestore = capture();
    rerender();
  }
  function commit(plan) {
    busy = true;
    const result = owner.commit(storage, plan.progress);
    if (dialog.open) dialog.close();
    pending = null;
    busy = false;
    refreshAfterWrite();
    if (result.status === 'saved') signalQuickUndo();
    else announce('Saving is unavailable. Progress was not recorded.');
  }
  function undoLast() {
    endQuick();
    if (owner.undo(storage).status === 'saved') {
      announce('Entire progress update undone.');
      refreshAfterWrite();
    }
  }

  // ---- objective carousel -----------------------------------------------------------------------------
  function scrollCard(deck, index) {
    const rail = deck.querySelector('.objective-rail'),
      card = rail.children[index];
    if (card) {
      rail.scrollTo({ left: card.offsetLeft - rail.firstElementChild.offsetLeft, behavior: 'auto' });
      deck.querySelector('[data-objective-jump]').value = card.dataset.velenObjective;
    }
  }
  function nextIndex(p) {
    let i = objectives.findIndex((o) => p.objectives[o.id] !== 'done' && !engine.closed(o, p) && o.requires.every((r) => p.objectives[r] === 'done'));
    if (i < 0) i = objectives.findIndex((o) => p.objectives[o.id] !== 'done' && !engine.closed(o, p));
    return Math.max(0, i);
  }
  function progressDeck(s) {
    const p = s.progress,
      count = engine.counts(Q, p),
      status = engine.status(Q, p),
      deck = make('details', 'quest-progress velen-quest-progress');
    deck.dataset.velenProgress = Q;
    const summary = make(
      'summary',
      '',
      s.legacyComplete && status === 'complete'
        ? 'Quest progress · Saved complete — objectives unconfirmed'
        : s.confirmedComplete && status === 'complete' // QA4
          ? 'Quest progress · Confirmed complete · ' + count.done + '/' + count.total + ' objectives recorded'
          : 'Quest progress · ' + count.done + '/' + count.total + (status === 'complete' ? ' · Quest complete' : ''),
    );
    const frame = make('section', 'objective-scroll-frame');
    frame.setAttribute('aria-label', 'Quest objective progress');
    const banner = make('header', 'objective-banner');
    banner.innerHTML = '<span class="objective-banner-mark" aria-hidden="true">❧</span><h3 data-objective-completion></h3><p data-objective-position></p>';
    banner.querySelector('h3').textContent = count.done + '/' + count.total + ' completed';
    const rail = make('div', 'objective-rail');
    rail.tabIndex = 0;
    rail.setAttribute('role', 'region');
    rail.setAttribute('aria-label', q.name + ' objective cards');
    objectives.forEach((o, i) => {
      const closed = engine.closed(o, p),
        done = p.objectives[o.id] === 'done',
        card = make('article', 'objective-card' + (closed ? ' unavailable' : ''));
      card.dataset.velenObjective = o.id;
      card.append(make('p', 'eyebrow', o.chapter + ' · ' + (i + 1) + '/' + objectives.length + (o.id === Q + ':fight' ? ' · IF YOU FOUGHT' : o.route === 'inn' ? ' · VIA THE INN' : '')));
      const check = make('label', 'objective-check'),
        input = make('input');
      input.type = 'checkbox';
      input.dataset.velenCheck = o.id;
      input.checked = done;
      input.disabled = closed;
      input.setAttribute('aria-describedby', 'velen-objective-state-' + o.id.replace(/[^a-z0-9]/gi, '-'));
      check.append(input, make('span', '', o.label));
      const st = make(
        'p',
        '',
        closed
          ? o.unconfirmedOn && p.choices.inn === o.unconfirmedOn // QA4
            ? 'Unconfirmed on the direct route — the sources do not establish its journal status, so it is neither required nor marked.'
          : o.route === 'inn' && p.choices.inn === data.choices.inn.routeValue
            ? 'Not required — you went straight to Heatherton. Left unmarked.'
            : 'Unavailable — alternate path chosen'
          : done
            ? 'Completed'
            : o.branch && !p.choices[o.branch[0]] && !engine.required(Q, p).includes(o)
              ? 'Confirm the preceding choice to establish this path.'
              : s.legacyComplete
                ? 'Not individually recorded — saved quest completion covers it.'
                : s.confirmedComplete
                  ? 'Not individually recorded — your confirmed quest completion covers it.'
                : 'Not completed',
      );
      st.dataset.objectiveState = '';
      st.id = 'velen-objective-state-' + o.id.replace(/[^a-z0-9]/gi, '-');
      card.append(check, st);
      if (o.note) card.append(make('p', 'quiet objective-note', o.note));
      if (o.choice) {
        const b = make('button', '', 'Record / review choice');
        b.type = 'button';
        b.dataset.velenEditChoice = o.id;
        card.append(b);
        if (p.choices[o.choice]) card.append(make('p', 'quiet', 'Recorded: ' + data.choices[o.choice].options.find((x) => x[0] === p.choices[o.choice])[1]));
      }
      rail.append(card);
    });
    const controls = make('div', 'objective-controls'),
      prev = make('button', '', '←'),
      next = make('button', '', '→');
    prev.type = next.type = 'button';
    prev.dataset.velenCardPrev = '';
    next.dataset.velenCardNext = '';
    prev.setAttribute('aria-label', 'Previous objective card');
    next.setAttribute('aria-label', 'Next objective card');
    controls.append(prev, make('span', '', 'Swipe objectives'), next);
    frame.append(banner, rail, controls);
    const position = () => {
      const cards = [...rail.children];
      if (!cards.length) return;
      const first = cards[0].offsetLeft;
      let index = 0,
        best = Infinity;
      cards.forEach((card, i) => {
        const d = Math.abs(card.offsetLeft - first - rail.scrollLeft);
        if (d < best) {
          best = d;
          index = i;
        }
      });
      banner.querySelector('[data-objective-position]').textContent = objectives[index].chapter;
      return index;
    };
    rail.addEventListener('scroll', position, { passive: true });
    for (const [b, delta] of [[prev, -1], [next, 1]])
      b.onclick = () => scrollCard(deck, Math.max(0, Math.min(rail.children.length - 1, (position() || 0) + delta)));
    // Find an objective
    const find = make('details', 'progress-extra');
    find.dataset.velenExtra = 'find';
    find.append(make('summary', '', 'Find an objective'));
    const search = make('label', '', 'Find an objective'),
      input = make('input');
    input.type = 'search';
    input.placeholder = 'Search this quest…';
    search.append(input);
    const jumpLabel = make('label', '', 'Jump to chapter or objective'),
      jump = make('select');
    jump.dataset.objectiveJump = '';
    jump.setAttribute('aria-label', 'Jump to objective for ' + q.name);
    jumpLabel.append(jump);
    const fill = (query = '') => {
      jump.replaceChildren();
      let chapter = '',
        group;
      for (const o of objectives.filter((o) => (o.label + ' ' + o.chapter).toLowerCase().includes(query.toLowerCase()))) {
        if (chapter !== o.chapter) {
          chapter = o.chapter;
          group = make('optgroup');
          group.label = chapter;
          jump.append(group);
        }
        const option = make('option', '', o.label);
        option.value = o.id;
        group.append(option);
      }
    };
    fill();
    input.oninput = () => fill(input.value);
    jump.onchange = () => scrollCard(deck, objectives.findIndex((o) => o.id === jump.value));
    find.append(search, jumpLabel);
    // Story & correction controls
    const correct = make('details', 'progress-extra');
    correct.dataset.velenExtra = 'correct';
    correct.append(make('summary', '', 'Story & correction controls'));
    const actions = make('div', 'progress-actions');
    const whole = make('button', '', status === 'complete' ? 'Remove whole-quest completion' : 'Record whole quest complete');
    whole.type = 'button';
    whole.dataset.velenQuest = status === 'complete' ? 'false' : 'true';
    const undo = make('button', '', 'Undo last progress change');
    undo.type = 'button';
    undo.dataset.velenUndo = '';
    undo.disabled = !s.undo;
    actions.append(whole, undo);
    if (s.legacyComplete) {
      const reconcile = make('button', '', 'Review saved completion');
      reconcile.type = 'button';
      reconcile.dataset.velenReconcile = '';
      actions.append(reconcile);
    }
    correct.append(actions);
    deck.append(summary, frame);
    if (s.confirmedComplete)
      deck.append(make('p', 'quiet velen-confirmed-note', 'Confirmed complete: you recorded that you read Hendrik’s notes on the direct route. Individual objective marks are kept separately; unrecorded objectives stay unmarked and “Go to the Inn at the Crossroads.” stays unconfirmed.'));
    if (s.legacyComplete)
      deck.append(make('p', 'quiet velen-legacy-note', 'Saved complete from your earlier Velen record. Its individual objectives were not recorded, so they stay unconfirmed until you record them.'));
    deck.append(find, correct, make('p', 'quiet', 'Record completed in-game objectives. These marks stay separate from your reading position.'));
    return { deck, rail, find, correct, position: () => scrollCard(deck, nextIndex(p)) };
  }
  document.addEventListener('change', (e) => {
    const id = e.target.dataset?.velenCheck;
    if (!id) return;
    const checked = e.target.checked;
    e.target.checked = state().progress.objectives[id] === 'done';
    request({ kind: 'objective', id, value: checked });
  });
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-velen-edit-choice],[data-velen-undo],[data-velen-quest],[data-velen-reconcile]');
    if (!t || !t.closest('#velen')) return;
    if (t.dataset.velenEditChoice) request({ kind: 'objective', id: t.dataset.velenEditChoice, value: true, editChoice: true });
    else if (t.hasAttribute('data-velen-undo')) undoLast();
    else if (t.dataset.velenQuest) request({ kind: 'quest', quest: Q, value: t.dataset.velenQuest === 'true' });
    else if (t.hasAttribute('data-velen-reconcile')) request({ kind: 'reconcile-legacy', quest: Q });
  });

  // ---- shared pieces ----------------------------------------------------------------------------------
  function preparation() {
    const d = make('details', 'route-context quest-preparation');
    d.append(make('summary', '', 'Preparation & quest details'));
    d.append(make('p', '', q.intro), make('p', '', 'Velen · Suggested level ' + q.level + '.'));
    q.stages.forEach((st, i) => d.append(make('p', '', i + 1 + '. ' + st.title + ' — ' + st.prep)));
    d.append(make('p', 'quiet', 'Reading position never records progress. Record in-game objectives in Quest progress.'));
    return d;
  }
  function rail(host, name) {
    const list = make('nav', 'quest-hub-rail');
    list.setAttribute('aria-label', name);
    list.tabIndex = 0;
    list.dataset.velenRail = name;
    const controls = make('div', 'quest-hub-rail-controls'),
      prev = make('button', '', '←'),
      next = make('button', '', '→');
    prev.type = next.type = 'button';
    prev.setAttribute('aria-label', 'Previous ' + name);
    next.setAttribute('aria-label', 'Next ' + name);
    prev.onclick = () => list.scrollBy({ left: -220, behavior: 'auto' });
    next.onclick = () => list.scrollBy({ left: 220, behavior: 'auto' });
    controls.append(prev, make('span', '', 'Swipe to browse'), next);
    host.append(list, controls);
    return list;
  }
  function nearbyCard(list, { name, href, art, position, status, context, complete }) {
    const wrap = make('article', 'nearby-card-entry'),
      a = link('', href, 'quest-hub-card' + (complete ? ' is-complete' : ''));
    a.append(picture(art, '', position), make('strong', '', name), make('small', '', status));
    wrap.append(a, make('p', 'nearby-card-context', context));
    list.append(wrap);
  }

  // ---- context capture / restore (stage, scroll, foldouts, rails) ---------------------------------------
  function capture() {
    if (!current || !current.deck.isConnected) return null;
    return {
      page: current.page,
      stage: current.stage,
      y: viewport().scrollY,
      prep: current.prep.open,
      progress: current.deck.open,
      find: current.find.open,
      correct: current.correct.open,
      sources: !!current.sources?.open,
      objectiveX: current.rail.scrollLeft,
      rails: Object.fromEntries([...current.rails].map(([k, r]) => [k, r.scrollLeft])),
      details: [...current.root.querySelectorAll('.stage-content details')].map((d) => d.open),
    };
  }
  let saveTimer = 0;
  function remember() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const ctx = capture();
      if (!ctx) return;
      memory[ctx.page] = { prep: ctx.prep, progress: ctx.progress, sources: ctx.sources };
      history.replaceState({ ...history.state, velenNilfUI: ctx }, '', location.href);
    }, 120);
  }
  function apply(ctx, fresh) {
    current.prep.open = !!ctx.prep;
    current.deck.open = !!ctx.progress;
    current.find.open = !!ctx.find;
    current.correct.open = !!ctx.correct;
    if (current.sources) current.sources.open = !!ctx.sources;
    (ctx.details || []).forEach((open, i) => {
      const d = current.root.querySelectorAll('.stage-content details')[i];
      if (d) d.open = open;
    });
    const target = current;
    requestAnimationFrame(() => {
      if (target !== current) return;
      if (fresh && target.deck.open) target.position();
      else target.rail.scrollLeft = Number(ctx.objectiveX) || 0;
      for (const [k, r] of target.rails) r.scrollLeft = Number(ctx.rails?.[k]) || 0;
      target.rail.dispatchEvent(new Event('scroll'));
    });
  }
  function mount(page, stage, root, parts) {
    current = { page, stage, root, ...parts };
    let ctx = null,
      fresh = false;
    if (pendingRestore?.page === page && pendingRestore.stage === stage) ctx = pendingRestore;
    else if (history.state?.velenNilfUI?.page === page && history.state.velenNilfUI.stage === stage) ctx = history.state.velenNilfUI;
    else if (history.state?.velen?.restoreUI?.page === page) ctx = history.state.velen.restoreUI;
    else {
      ctx = { ...memory[page] };
      fresh = true;
    }
    const y = pendingRestore === ctx ? ctx.y : undefined;
    pendingRestore = null;
    apply(ctx, fresh);
    for (const d of [parts.prep, parts.deck, parts.find, parts.correct, parts.sources, ...root.querySelectorAll('.stage-content details')].filter(Boolean))
      d.addEventListener('toggle', () => {
        if (d === parts.deck && d.open && !current.rail.scrollLeft) current.position();
        remember();
      });
    for (const r of [parts.rail, ...parts.rails.values()]) r.addEventListener('scroll', remember, { passive: true });
    remember();
    return y;
  }

  // ---- hub ----------------------------------------------------------------------------------------------
  function hub(screen) {
    const s = state(),
      stage = readingStage(),
      root = make('div', 'velen-nilf-hub quest-hub-panel');
    root.dataset.velenNilf = 'hub';
    const header = make('header', 'quest-hub-briefing');
    header.append(picture(q.art, '', q.position), make('p', 'eyebrow', 'VELEN · SUGGESTED LEVEL ' + q.level), make('h1', '', q.name));
    const paper = make('article', 'quest-hub-paper'),
      risk = make('p', 'quest-hub-risk');
    risk.hidden = true;
    const resume = link('', '#quest/nilf/' + stage, 'home-action-tile');
    const label = make('span', '', hasReading() ? 'Continue walkthrough' : 'Start walkthrough');
    label.append(make('small', '', 'Step ' + stage + ' · ' + q.stages[stage - 1].title));
    resume.append(picture('navigation-art-v26/action-walkthrough.webp'), label);
    const tools = make('nav', 'quest-hub-tools');
    tools.setAttribute('aria-label', q.name + ' hub tools');
    tools.append(link('Quest cards', '#velen'), link('Regions', 'index.html#regions'));
    const prepHost = make('div', 'quest-hub-preparation'),
      progressHost = make('div', 'quest-hub-progress'),
      prep = preparation(),
      parts = progressDeck(s);
    prepHost.append(prep);
    progressHost.append(parts.deck);
    paper.append(make('p', 'quest-hub-description', q.intro), risk, resume, tools, prepHost, progressHost);
    const nearby = make('section', 'quest-hub-nearby');
    nearby.append(make('h2', '', 'Nearby activities'));
    const rails = new Map();
    const group = (title) => {
      const section = make('section', 'quest-hub-group');
      section.append(make('h3', '', title));
      nearby.append(section);
      const r = rail(section, title.toLowerCase());
      rails.set(title, r);
      return r;
    };
    const side = group('Side quests & encounters');
    for (const id of ['pyres', 'mercy']) {
      const done = activityComplete(id);
      nearbyCard(side, {
        name: quests[id].name,
        href: '#hub/' + id,
        art: quests[id].art,
        position: quests[id].position,
        complete: done,
        status: done ? '✓ Completed' : 'Open entry',
        context: id === 'pyres' ? 'Fits the road: the priest west of Mulbrydale offers it. Completion is recorded in its own hub.' : 'Fits the road: the riverbank on the approach to the inn. Its decision is recorded in its own hub.',
      });
    }
    const services = group('Services & notices');
    nearbyCard(services, { name: 'Innkeeper', href: '#merchants', art: 'gwent-r15/gabor.webp', status: 'Open entry', context: 'At the Inn at the Crossroads: food, drink and a shop conversation.' });
    nearbyCard(services, { name: 'Collected notices', href: '#deferred', art: 'velen-landscape-r18.webp', position: 'right center', status: 'Open entry', context: 'Notices from the inn board, kept for later. Collecting a notice is not completing it.' });
    root.append(header, paper, nearby);
    screen.append(root);
    return mount('hub', null, root, { ...parts, prep, rails });
  }

  // ---- walkthrough ----------------------------------------------------------------------------------------
  function walkthrough(screen, index) {
    const s = state(),
      st = q.stages[index],
      root = make('div', 'quest-page velen-nilf-page');
    root.dataset.velenNilf = 'walk';
    const heading = make('div', 'page-heading r15-heading');
    const seal = make('span', 'r15-page-seal', q.kind);
    seal.setAttribute('aria-hidden', 'true');
    heading.append(picture(q.art, 'r15-page-art', q.position), make('p', 'eyebrow', 'QUEST WALKTHROUGH / VELEN'), make('h1', '', q.name), make('p', 'lead', q.intro), make('p', 'quest-page-facts', 'Velen · Suggested level ' + q.level), seal);
    const panel = make('article', 'reading-panel'),
      stagePanel = make('div', 'stage-panel'),
      section = make('section', 'walk-stage'),
      content = make('div', 'stage-content');
    section.dataset.stage = String(index + 1);
    content.append(make('p', 'eyebrow', st.place), make('h2', '', st.title));
    if (st.warning) {
      const w = make('p', 'risk-note');
      const cut = st.warning.indexOf(':');
      if (cut > 0) w.append(make('strong', '', st.warning.slice(0, cut + 1) + ' '), document.createTextNode(st.warning.slice(cut + 1).trim()));
      else w.append(make('strong', '', 'Warning: '), document.createTextNode(st.warning));
      content.append(w);
    }
    content.append(make('p', '', st.text));
    const detail = make('details', 'quest-step-detail');
    detail.append(make('summary', '', 'Preparation for this step'), make('p', '', st.prep));
    content.append(detail);
    const related = objectives.filter((o) => o.stage === index + 1);
    if (related.length) {
      const d = make('details', 'quest-step-detail');
      d.append(make('summary', '', 'Journal objectives at this step'));
      const ul = make('ul');
      for (const o of related) ul.append(make('li', '', o.label + (o.id === Q + ':fight' ? ' (only if you fought)' : o.route === 'inn' ? ' (unless you went straight to Heatherton)' : '')));
      d.append(ul, make('p', 'quiet', 'Record them in Quest progress below. Reading this step does not record them.'));
      content.append(d);
    }
    section.append(content);
    stagePanel.append(section);
    const nav = make('nav', 'stage-nav quest-step-nav');
    nav.setAttribute('aria-label', 'Walkthrough steps');
    const prev = make('button', '', 'Previous'),
      next = make('button', '', 'Next'),
      picker = make('label', 'quest-step-picker'),
      count = make('span', '', index + 1 + ' of ' + q.stages.length),
      select = make('select');
    prev.type = next.type = 'button';
    prev.dataset.velenStagePrev = '';
    next.dataset.velenStageNext = '';
    prev.setAttribute('aria-label', 'Previous walkthrough step');
    next.setAttribute('aria-label', 'Next walkthrough step');
    prev.disabled = index === 0;
    next.disabled = index === q.stages.length - 1;
    count.setAttribute('aria-live', 'polite');
    const stepLabel = make('span', '', 'Step ');
    stepLabel.append(count);
    select.dataset.velenStageSelect = '';
    select.setAttribute('aria-label', 'Choose walkthrough stage');
    q.stages.forEach((x, i) => {
      const o = make('option', '', x.title);
      o.value = String(i + 1);
      select.append(o);
    });
    select.value = String(index + 1);
    picker.append(stepLabel, select);
    nav.append(prev, picker, next);
    const toStage = (n) => go('#quest/nilf/' + n, { hubReturn: history.state?.velen?.hubReturn, restoreY: Math.max(0, absTop(stagePanel) - 20) });
    prev.onclick = () => toStage(index);
    next.onclick = () => toStage(index + 2);
    select.onchange = () => toStage(Number(select.value));
    const host = make('div', 'quest-record-host'),
      prep = preparation(),
      parts = progressDeck(s);
    host.append(prep, parts.deck);
    panel.append(stagePanel, nav, host);
    const tools = make('nav', 'stage-links quest-page-tools');
    tools.setAttribute('aria-label', 'Quest tools');
    const back = link('Return to hub', '#hub/nilf');
    back.dataset.returnHub = 'true';
    tools.append(back, link('Quest cards', '#velen'));
    root.append(heading, panel, tools, regionTools(), link('Sources', 'velen-sources.html#nilf', 'sw-source-link'));
    screen.append(root);
    return mount('walk', index + 1, root, { ...parts, prep, rails: new Map() });
  }
  return { owned, complete, hub, walkthrough, capture, request, undoLast };
};
