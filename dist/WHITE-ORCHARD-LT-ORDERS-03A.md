# LT Assignment 03A — repair Stage A defects and finish browser checks
13 November 2026. Branch: phoenix-white-orchard-completion.
Reviewed report baseline: 719c21f56f092784aa28aaa4ea948bbbe083041c.

## Cmdr disposition
Stage A is NOT ACCEPTED. Stage B remains on hold.
Confirmed application defects: completion/legacy copy on dark field-note banner; completion definitions absent from actual utility and merchant routes.
Environment instability is a verification blocker, not a low-severity application defect. Untested saved-state, accessible-name and navigation behavior remains unverified, not assumed passed.
Cmdr independently inspected app.js, map-ui.js and progression-ui.js at the reported baseline and confirms both rendering gaps. Screenshots were mentioned in LT's report but were not delivered here; do not characterize them as Cmdr-inspected evidence.

## Repair 1 — put explanatory copy on the reading surface
app.js currently appends completionMeaning inside .page-heading after the lead. Move completion explanation and its legacy clarification into the existing .reading-panel, before the route-context details, for non-quest tasks with metadata. Leave the title, eyebrow, intro and accepted artwork intact. This avoids solving a readable-surface problem by globally changing artwork typography.
Use existing reading-panel styles first. If a narrowly scoped style is necessary, limit it to this component and verify both themes. No global color overrides or redesign.
One explanation + one legacy clarification per rendered detail page, without hub-row paragraphs.

## Repair 2 — cover real utility/merchant routes
A. map-ui.js openPin(): append the task's completionDefinition and legacy clarification to the existing location panel whenever the referenced task has that metadata. This covers services, enhancement stations and signposts. Keep existing utility behavior, focus and links. Do not add checkboxes or infer visits.
B. progression-ui.js merchant articles under #economy-merchants: render the same metadata once per merchant article whenever the referenced task has it. Use safe text rendering/escaping and the same authoritative task string. Do not copy definitions into another registry.
Some service pins reference quest records without completionDefinition. Preserve that distinction: no invented service definition or quest completion inference.
Do not expose all hidden FIELD NOTE pages or change mapOnly classification to solve missing copy.
Both surfaces need the clarification: Earlier marks remain as recorded; this label does not retroactively verify actions.
Existing shared-mark wording remains on multi-pin activity pages. Definitions on a service surface do not create a new completion control.

## Required fresh checks
- All data counts remain: 59 tasks, 13 hubs, 44 stages, 46 non-quest definitions. IDs, homes, save keys, engine/schema, counters, availability and map-hide logic unchanged.
- Syntax-check all edited JS and run 29 existing White Orchard progression tests.
- Render pop-cackler and gwent-start details at desktop and 390 px, in day and night themes: explanation and legacy copy are visible on parchment and comfortably readable; no horizontal overflow. Measure normal text contrast against its actual background (project threshold 4.5:1); for textured backgrounds inspect the lightest/darkest relevant area, not a nominal CSS color alone.
- Follow actual map service pin → location panel → Economy details for Bram and another applicable service; verify definition/legacy copy once on each applicable surface. Check one buff and one signpost panel. Test a quest-referencing service pin for graceful absence of undefined copy and preserved related-quest behavior.
- Inspect a LIVE visible hub checkbox accessible name and a status mark after an update, not only source code.
- Use a separate local browser profile and representative R19 true/false saved marks. Confirm preserved values, one explicit change, Undo and reload; record before/after values. Never test in CaptDrunk's live saved state.
- Rewalk selection-in-place, action destination, exact hub return, Back/Forward and resume across a multi-pin quest. Confirm no JS errors, no missing assets.
- Keyboard traversal/focus check on the changed surfaces; include narrow screenshot evidence. Physical iPhone Safari, VoiceOver and Xbox remain pending, not emulated by Chromium.
- Keep the local server and browser in the same supported environment/session. If it still drops, record exact last completed step and blocker; report partial results without silently substituting static inspection.

## Delivery
Implement only this repair slice. Likely files: app.js, map-ui.js, progression-ui.js; a narrowly scoped stylesheet only if needed. No white-orchard.js content/definition edits, no Stage B, Velen, new state or controls.
Commit complete files atomically on this branch; no placeholder/stub uploads. Verify remote readback file hashes and full data integrity after push. Update WHITE-ORCHARD-QA-02.md with tested SHA and observed/pending checks, preserving prior recovery history.
Return exact commit, changed files, test results, minimal before/after screenshots, saved-state results, navigation findings and remaining limits. STOP for Cmdr QA. No merge, deployment, main or settings changes.
