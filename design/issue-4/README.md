# Issue #4 mockups: shared WO/Velen walkthrough layout

This is a design mockup only. It is not wired into `dist/`. It does not change tests, rollback, the release file list, storage or quest content, and nothing here is published.

## Decisions (Cmdr-decided 2026-11-17)

### Batch 1

These answers are applied to the prototype and mockups.

- **Q1: A.** Keep the shared reading text, and name the selected objective above the actions. A "Selected objective" line now sits between the section title and "What to do", in both WO and Velen.
- **Q2: B.** Nearby activities also go in the "Related optional tasks" dropdown, labelled "Nearby". The dropdown has two groups: "Optional objectives" (optional journal objectives) and "Nearby".
  - WO: the stage detours from `white-orchard.js`.
  - Velen: Funeral Pyres, At the Mercy of Strangers, Innkeeper and Collected notices. The names come from `velen-data-r18.js`; the context lines are the hub card text in `velen-nilf-ui.js`.
  - Placing each Velen entry on a reading stage by its place (road: stage 2; inn: stage 3) is an LT proposal.
  - Stages with nothing recorded say so.
- **Q3: B.** Warnings get a remembered "Got it".
  - The panel shows "Got it" until it is acknowledged. After that, the wolf badge shows a check instead of the new-warning dot, and the panel shows "Acknowledged" with a "Mark as new" control (an LT addition so it can be undone).
  - Acknowledgment never changes progress. In the mockup it lives in an in-memory Set and is never stored.

### Batch 2 (owner decided 2026-11-17: "No notes proceed", so the mocked defaults stand)

- **Q4: A.** Only the selected box's checkbox marks completion. Tapping a neighbour's checkbox selects that box and does not mark it. Completion never moves the selection. Tested in the prototype.
- **Q5: A.** Velen shows 8 required with a "Route-dependent, not counted yet" note for "Defeat the baron's men". Once the route is recorded, the total switches to 9 (fight) or 5 (straight to Heatherton), using the existing progression engine. The mockups show only the undecided-route state; the switch is not simulated here.
- **Q6: A.** The floating wolf is navigation only, with no "Warning" label. Per-objective warnings live only on the selector wolf. The prototype's floating wolf and "Navigation" tile already match.

### Velen proposals P2 and P3 (owner, 2026-11-17: "P2 you and Cmdr can decide. B")

- **P3: B, owner-decided 2026-11-17.** The Velen hub console will be redesigned later as its own slice, in the WO style. It is out of scope for issue #4.
- **P2: LT recommends A, pending Cmdr's agreement** (the owner delegated P2 to LT and Cmdr). Under A there are no route-choice cards: the route is recorded through WO's "Story & correction controls" row, as mocked, with the Information note explaining what the inn choice changes.

### Q3 implementation note (not part of these mockups)

A real "Got it" needs its own scoped change and review:

- **New storage key**, proposed: `phoenix.guide.warnings-ack.v1`. It is separate from progress and save keys.
- **Versioned record**, for example `{v:1, acks:{<warningId>: {at:<ISO time>, text:<hash of the warning text>}}}`. The text hash lets a changed warning show as new again. Warning ids are the catalog ids (for example `poi-4`), or a stable stage id where no catalog entry exists (for example `velen.nilf.stage-3`).
- **Read and write failure handling**, consistent with the QA6 save guard:
  - Never overwrite data that cannot be read or parsed.
  - Treat an unreadable record as "not acknowledged" for display only.
  - Report failed writes without retry loops.
  - Keep an unknown future version read-only.
- **Cache tags and file pins:** new or changed files need the usual cache-tag bumps and release-list and manifest updates.
- **Its own tests and review.** None of this is implemented here: `dist/`, tests and real storage are untouched.

## How to view

- Open `prototype/index.html?q=wo|velen&state=default|warning|warning-ack|optional|info|completed` from a local static server at the repo root. The prototype loads fonts and art from `../../../dist/` as read-only.
- `tools/extract-data.cjs` reads the shipped data files (read-only, in a vm sandbox) and writes `prototype/mockup-data.js`.
- `tools/render.cjs` produces `mockups/*.png` at 390x844 and 844x390, device scale 2, using headless Chrome.
- To keep the repo small, the portrait PNGs are saved as 256-colour dithered images (rendered at scale 2, then quantised with Pillow). The landscape PNGs are from the first pass and are lossless.
- Sample progress lives in memory only (`walkthrough.js`, `SAMPLE`). The prototype never reads or writes localStorage.

## States rendered

| File | State |
|---|---|
| `mockups/wo-portrait-default.png`, `velen-portrait-default.png` | Selected objective, warning collapsed, unread dot |
| `*-portrait-warning.png` | Warning expanded inside the selector, beneath the wolf, not yet acknowledged ("Got it" shown) |
| `*-portrait-warning-ack.png` | Same warning after "Got it": acknowledged badge (no new-warning dot) and a "Mark as new" control |
| `*-portrait-optional.png` | Related optional tasks dropdown open: "Optional objectives" group, then "Nearby" group |
| `*-portrait-info.png` | Information dropdown open (WO shows objective "nest", because the trophy stage has no extra information) |
| `*-portrait-completed.png` | Selected objective ticked; selection stays put; "Next unfinished" appears |
| `*-landscape-default.png` | Landscape check, 844x390 (not re-rendered for the 2026-11-17 decisions; the changes sit below the fold or inside the expanded warning) |

Sample: WO selects "Take the griffin trophy." (objective 12 of 13, 11 completed). Velen selects "Ask about the agent called Hendrik..." (objective 3 of 8, 2 completed).

## White Orchard is the template

### Retained from WO
- Stone background, the curled vellum reading panel, Fell headings with Fondamento body text.
- The silver double-framed banner with quest art and the "Main quest" chip.
- The silver wolf pointer art over the objective cards.
- Dropdown rows with steel +/− discs, and the quest-level rows: Rewards & conditions, Sources & verification, Story & correction controls.
- Dark iron buttons, Return to hub / Map, and the floating Navigation tile and wolf (not redesigned).

### WO refinements and why
1. **One navigator.** The objective box selector replaces both "Walkthrough navigation" (Step x of 11 with Previous/Next) and the "Quest progress" card deck. Why: two navigators gave competing counts (Step 1 of 11, 0/13, Buckthorn 1/16). Brief points 2 and 3.
2. **The warning moves onto the selector wolf.** It replaces the red box at the top of the page and the "Full warning details" modal. Tapping the wolf expands the panel inside the selector. Why: point 4 says no detached popup and ties the warning to the selected objective. The content is the existing catalog text (short, consequence, cutoff, prevention).
3. **One position line and one completion bar, shown separately.** These read "Objective 12 of 13" and "11 of 13 required completed". The optional count appears only on the optional dropdown. Why: point 3, no unexplained competing counts.
4. **Reading order is "What to do" (short list), then "Choice" when present, then "Why", then two separate dropdowns: "Related optional tasks" and "Information".** Why: point 6. The current page mixes actions and explanation in one block.
5. **Less framing.** There is one vellum panel with no card inside a card, and the banner is shallower (about 104px tall). Why: point 9.
6. **"Next unfinished" button.** It appears beside the position line when the selected objective is not the next unfinished one. Restore-last-viewed is modelled in memory only. Why: point 8.
7. **The floating wolf is shown without its current "Warning" label.** Why: point 9 says the selector wolf and the floating navigation wolf are distinct controls. Decided as Q6 A on 2026-11-17: the floating wolf is navigation only.

### Velen uses the same component
Velen renders through the same `walkthrough.js`, with no Velen-specific code paths.

**Velen-only features left out (proposals, need Cmdr approval):**
- P1. Nearby activities rail. After Q2 B, its content (Funeral Pyres, At the Mercy of Strangers / John Verdun, Innkeeper, Collected notices) now appears in the shared Nearby group. Only a separate Velen rail is still a proposal.
- P2. Route-choice cards (fight the baron's men vs go straight to Heatherton) as a separate control. LT recommends A (no cards): the mockup uses the WO "Story & correction controls" row and an Information note instead. This is pending Cmdr's agreement.
- P3. The Velen hub console / region dashboard. Decided B (owner, 2026-11-17): it becomes a separate later slice in WO style, out of scope for issue #4.

## Component and data boundary (proposal)

`QuestWalkthrough(model, progressAdapter)` renders the heading, selector, reading section and quest rows. It knows nothing about regions.

- `model` = `{quest, region, level, kind, art, objectives[], stages{}, questInfo[]}`
- Each `objectives[]` entry = `{key, id, label, optional, conditional, stage}`. Selector boxes = `!optional && !conditional`.
- Each `stages{}` entry = `{title, place, actions[], choices[], explanation[], nearby[], info[], warning}`, where `nearby[]` = `{label, target, kind, context?, source}` and `warning` = `{id, short, sections[[label, text]]}`.
- `progressAdapter` = `{isDone(id), toggle(id), lastViewed()/setLastViewed(key)}`, plus a separate `warningAckAdapter` = `{isAcked(warningId), ack(warningId), unack(warningId)}` (Q3). Production would back this with the existing progression engine and storage, unchanged. The mockup backs it with an in-memory Set.
- Region modules supply the model through an adapter like `tools/extract-data.cjs`. The renderer stays the same.

## Objective to reading-stage mapping (LT proposal; source: read from the shipped data files)

| WO objective key | Stage | | Velen objective key | Stage |
|---|---|---|---|---|
| herbalist | 2 | | travel | 1 |
| buckthorn | river | | inn | 2 |
| hunter (optional) | 3 | | ask | 3 |
| ask | 3 | | fight (route-dependent) | 3 |
| dogs (optional), talk (optional) | 3 | | finish | 3 |
| follow, site, tracks | patrol | | look, survivor, find, search | 4 |
| nest | nest | | | |
| vesemir, prepare | 4 | | | |
| field | ambush | | | |
| kill | 5 | | | |
| trophy | trophy | | | |
| reward | payment | | | |

Unmapped or awkward cases:
- WO stage "1" (Take the griffin contract) has no journal objective. It is not reachable from the selector in the mockup.
- Shared stages: several objectives show the same reading text (WO patrol x3, WO stage 3, WO stage 4, Velen stage 3, Velen stage 4). Resolved by Q1 A: the shared text stays, and the selected objective is named above the actions.
- Velen "Defeat the baron's men" counts only on the fight route. With the route undecided the selector shows 8 boxes and a "route-dependent, not counted yet" note. The data's 9 (fight route) and 5 (direct route) totals are not shown. No membership or denominator was changed.
- The Velen stage 3 warning only has short text. It has no consequence, cutoff or prevention fields, so the panel is shorter than WO's.

## Warning unread / acknowledgment
Decided as Q3 B (see Decisions). The yellow new-warning dot stays until "Got it". Opening the panel alone does not clear it.

## Open questions
Batches 1 and 2 were answered on 2026-11-17 (see Decisions). No design questions remain open. P3 is decided (B). P2 A (LT recommendation) awaits Cmdr's confirmation.
