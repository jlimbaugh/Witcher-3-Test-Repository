# Issue #4 mockups: shared WO/Velen walkthrough layout

This is a design mockup only. It is not wired into `dist/`. It does not change tests, rollback, the release file list, storage or quest content, and nothing here is published.

## How to view

- Open `prototype/index.html?q=wo|velen&state=default|warning|optional|info|completed` from a local static server at the repo root. The prototype loads fonts and art from `../../../dist/` as read-only.
- `tools/extract-data.cjs` reads the shipped data files (read-only, in a vm sandbox) and writes `prototype/mockup-data.js`.
- `tools/render.cjs` produces `mockups/*.png` at 390x844 and 844x390, device scale 2, using headless Chrome.
- Sample progress lives in memory only (`walkthrough.js`, `SAMPLE`). The prototype never reads or writes localStorage.

## States rendered

| File | State |
|---|---|
| `mockups/wo-portrait-default.png`, `velen-portrait-default.png` | Selected objective, warning collapsed, unread dot |
| `*-portrait-warning.png` | Warning expanded inside the selector, beneath the wolf |
| `*-portrait-optional.png` | Related optional tasks dropdown open |
| `*-portrait-info.png` | Information dropdown open (WO shows objective "nest", because the trophy stage has no extra information) |
| `*-portrait-completed.png` | Selected objective ticked; selection stays put; "Next unfinished" appears |
| `*-landscape-default.png` | Landscape check, 844x390 |

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
7. **The floating wolf is shown without its current "Warning" label.** Why: point 9 says the selector wolf and the floating navigation wolf are distinct controls. This is a conflict with the shipped page. It is not resolved here; see the open items.

### Velen uses the same component
Velen renders through the same `walkthrough.js`, with no Velen-specific code paths.

**Velen-only features left out (proposals, need Cmdr approval):**
- P1. Nearby activities rail (Funeral Pyres, Wandering in the Dark / John Verdun, Innkeeper services, collected notices).
- P2. Route-choice cards (fight the baron's men vs go straight to Heatherton) as a separate control. The mockup uses the WO "Story & correction controls" row and an Information note instead.
- P3. The Velen hub console / region dashboard.

## Component and data boundary (proposal)

`QuestWalkthrough(model, progressAdapter)` renders the heading, selector, reading section and quest rows. It knows nothing about regions.

- `model` = `{quest, region, level, kind, art, objectives[], stages{}, questInfo[]}`
- Each `objectives[]` entry = `{key, id, label, optional, conditional, stage}`. Selector boxes = `!optional && !conditional`.
- Each `stages{}` entry = `{title, place, actions[], choices[], explanation[], optional[], info[], warning}`, where `warning` = `{short, sections[[label, text]]}`.
- `progressAdapter` = `{isDone(id), toggle(id), lastViewed()/setLastViewed(key)}`. Production would back this with the existing progression engine and storage, unchanged. The mockup backs it with an in-memory Set.
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
- Shared stages: several objectives show the same reading text (WO patrol x3, WO stage 3, WO stage 4, Velen stage 3, Velen stage 4).
- Velen "Defeat the baron's men" counts only on the fight route. With the route undecided the selector shows 8 boxes and a "route-dependent, not counted yet" note. The data's 9 (fight route) and 5 (direct route) totals are not shown. No membership or denominator was changed.
- The Velen stage 3 warning only has short text. It has no consequence, cutoff or prevention fields, so the panel is shorter than WO's.

## Warning unread / acknowledgment
The mockup shows a yellow dot on the wolf badge until the panel is opened once. The state lives in memory, per page view. Persisting acknowledgment would need a storage change, which is out of scope. See question 3.

## Open questions (batch of three)
See the draft PR description.
