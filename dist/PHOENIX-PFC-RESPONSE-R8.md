# Phoenix R8 — response to PFC's R7 review

12 November 2026 · Cmdr Chad · Owner: CaptDrunk

Baseline: 7c3a80ec01e0784c7e9cd0c1d86038ac2ac4dfa6. Scope: White Orchard only. This is a builder response and re-review request, not PFC approval.

## Decisions implemented

Migrated R6 completions survive objective edits and story correction. A player can explicitly replace a saved completion with the recorded objectives using **Review saved completion**, or reconfirm the whole quest. Every proposed quest-completion loss is named before confirmation. A manual Failed flag can be cleared only through an explicit status update, whose preview names the reopening.

The inn fight no longer grants departure. **Leave White Orchard** is the single objective-based departure grant. The fight's review offers a separate, initially unchecked confirmation that the player has also left for Vizima. That confirmation previews the cutoff consequences. The guide's warning remains before the Vesemir conversation that starts the departure sequence. Exact internal game failure timing still needs Xbox field verification.

## Findings and corrections

| Finding | Change | Evidence / remaining limit |
| --- | --- | --- |
| D1: story correction loses migrated completions | Story correction removes only recorded objective marks; legacy completions remain protected. Completion losses are a separate preview list. | Node probes with legacy Beast/Lilac, both with and without recorded objectives; browser fixture preserved both completion marks after story correction. |
| D2: one objective edit revokes saved completion | Partial objective edits retain the migrated completion. Explicit reconciliation is a separate reviewed action; whole-quest reconfirmation can complete the objective set without loss. | Node probes and browser pan fixture: door edit kept overall completion checked; reconciliation named the lost completion; Cancel kept it. |
| D3: bandits grant departure | Removed the bandit grant. Its review offers an unchecked departure confirmation. | Node and browser: fight alone granted garrison/griffin catch-up, not departure. Selecting the separate checkbox added departure and named affected quests; deselecting removed those consequences. |
| D4: noisy/stale/resurrected notices | Initial arrival seeds no notices. Already-visible primary quests are excluded. Notices are pruned against current eligibility. Read receipts live outside progress undo and persist separately. | Node probes; browser generated two relevant cluster notices for one newly available shared quest, removed stale notices after correction, and restored only the still-unread notice after Undo. |
| D5: misleading fresh unfinished list | Unknown story state asks for confirmation; unavailable remaining work no longer reads as all complete. | Fresh browser fixture displayed “Confirm your story progress to reveal unfinished opportunities.” |
| D6: Cancel leaves edited status select | Selects reset to the recorded value before opening the review; closing the dialog reflects recorded state. | Browser: Failed → Cancel restored Not complete and kept the migrated completion checked. |
| D7: undefined unskip key / required skipping | Unskip deletes the key. Engine rejects skipping required objectives. Status considers only valid recorded values. | Node probes include JSON round trip and both skip/unskip rejection for required objectives. |
| D8: silent failure clearing | Objective edits preserve manual failure. Explicit reopening is previewed. | Node probes; browser failed-pan fixture stayed Failed after marking its door objective. |
| D9: focus, blank choice, descriptions | Review controls persist while impact text updates. A blank choice explicitly clears its saved draft value and blocks confirmation. Checkboxes refer to their state/reason with aria-describedby. | Browser kept focus on the choice select after selecting and clearing; blank value plus disabled Confirm verified. Closed escort checkbox referenced its unavailable explanation. Real VoiceOver still pending. |
| D10: global map history / stale origin | Each history entry owns its map snapshot. Guide provenance is entry-local and carries only across stages of that same guide. Destination snapshots are captured before map visibility/resize events can replace them. | Two-entry browser Back test restored different filters; a separately zoomed B entry did not replace A's original geometry. Hub revisit then Regional map located the activity rather than restoring old context. |
| D11: invented level ceiling | No fallback level of 1/ceiling of 6. Missing levels remain unknown. Source-backed quest levels are stored in progression data and applied only when the original task lacks a level. | Unknown-level ceiling Node probe returns null; known level 4 returns 9. Exact encounter levels remain incomplete. |
| D12: failed/unavailable count denominator | Closed rows remain visible but leave the available denominator; headings show the closed count separately. ✓ only means all counted activities completed. | Browser failed-pan heading: “Quest walkthrough · 0/0 · 1 closed”, rather than an impossible 0/1 completion target. Closed is not represented as successful completion. |
| D13: inferred merchant flags | Explicit flags by pin ID with per-flag source links; no tavern-icon inference. Conditions are included in the card labels; no unsourced unique-item/inventory claims. | Node metadata probe and browser Willis panel/Flag references. MAP-SOURCES.md records every flag source. |

## Validation

- 29 Node tests passed: original 14 plus 15 PFC regression cases.
- Changed JavaScript files passed syntax checks.
- Browser QA used a copied build with a separate fake-save namespace. No live player completion was seeded or reset.
- Fresh, migrated, failed and arrival fixtures exercised UI paths.
- Exact history geometry in the final two-entry test: A image x346/y94, 538×431 relative to canvas. B zoom changed to 761×609. Back to A restored x346/y94, 538×431 and Places of Power, while B had Monster nests.
- One earlier test tab timed out; the focused-map and stale-origin sequence passed in a fresh tab without application errors. Keep long-session map behavior in the device test scope.

## Re-review request

Please repeat the original engine probes against this snapshot, then attack the browser paths above. Pay particular attention to cancel/escape, legacy reconciliation, completing and reopening Failed quests, read notices plus Undo/reload, and maps across multiple Back/Forward entries.

Real iPhone Safari and VoiceOver must still test native selects, modal focus/scroll, disabled-state descriptions, deck swipes, nested horizontal scrolling and map gestures. This environment cannot perform that hardware acceptance run.

## Boundaries and residual risks

The authored quest model is still a pilot, not a verified journal transcription. Alternate starts, parallel/skippable objectives, encounter-level eligibility and the efficiency of every cluster still need content/field review. R8 fixes do not establish those facts.

Previously lost R7 completion cannot be reconstructed from absent records. A retained Undo snapshot can restore its preceding state; R8 does not invent completion to repair missing history. Existing save keys and activity/objective IDs are retained.

No source art, repository permissions, Pages configuration or other repositories were changed. Test fixtures and the isolated browser build are excluded from publication.

## Sources for the departure decision

- https://www.gamebanshee.com/thewitcher3/walkthrough/theincidentatwhiteorchard.php
- https://www.witcher.tools/quests/the-incident-at-white-orchard
- https://witcher.fandom.com/wiki/The_Incident_at_White_Orchard

Quest-level references are the per-quest URLs in progression-data.js. Merchant references are attached to explicit flags in map-data.js and listed in MAP-SOURCES.md.
