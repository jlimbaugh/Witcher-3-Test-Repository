# Character slice 2 — shared gear reference and requirement provenance

Author: Cmdr. Parent: `10c1993762e56793dccbfee953793811bb56c7c3`.
Branch: `implementation/character-gear-reference`. No merge or deployment.

## View this slice

[Visual review](../design/builds-v1/reviews/gear-reference-slice.png) — a static
illustration, explicitly not a browser capture or proof of final artwork.
The runnable entry remains `dist/character.html`; no hosted preview is claimed.

## Delivered

- One shared catalogue at `character.html#gear`, listing the supported Feline pieces
  and all five tiers; individual entries stay at `#gear/<id>`.
- Gear details and per-piece / whole-tier change previews use the same catalogue
  and requirement function. There is no separate region copy or duplicate data list.
- Recorded profile level is compared against the retrieved **reference** requirement.
  Missing/invalid levels stay unknown. A below-reference choice remains selectable
  for experimentation. It never records an unlock or marks progress complete.
- Base Game and Blood and Wine labels stay visible. No DLC scope switch is added.
- Browsing within the reference replaces its subroute; Return/Escape returns to the
  build without leaving an extra catalogue history entry for each item. Draft and
  selected slot remain in memory. A direct reference deep link can close safely
  without backing into an unrelated previous site. Browser behavior still needs QA.
- Changed script/style URLs move to `character-gear-reference-v1`; the unchanged
  Vault and entry scripts keep their prior cache tags.

## Source acceptance boundary

Retrieved 2026-11-17:
https://witcher3.gameslantern.com/gear-sets/cat-school-gear

The page labels itself v4.04. Its six-slot table lists reference levels 17, 23, 29,
34 and 40 across the five tiers; Grandmaster entries are Blood and Wine. These
facts are retained with source URL, source version and retrieval date. **They have
not been verified against the owner's current Remastered build.**

Consequently `referenceLevel` is separate from `level`, which remains null. The
provenance flag `targetVerified` stays false. UI text explicitly says the current
requirement is unverified; comparisons say meets/below *reference*, not usable or
unusable in the current game. No hard gate is applied. Combat stats stay null.

The source also exposes numeric stats, crafting labels and unexpanded bonus
placeholders. None of those are imported. Numeric formulas, bonus thresholds,
acquisition/crafting data and target-version certification are separate work.

## Validation (author-supplied)

Full suite with v45 and QA5 baselines: **322 tests passed, 0 failed, 0 skipped**.
Five added tests cover source-version separation, unknown/boundary levels, planning
availability, non-mutating per-slot and whole-tier change derivation, shared routes,
all-tier visibility and persistence delegation. Existing Vault tests still pass.
Syntax, HTML ID/asset references, diff whitespace and manifest checks pass.

Browser/Safari, touch, focus, back/forward interactions and a returning cached
browser are not verified. This is Cmdr-authored work requiring another officer's
independent review. The static illustration is not independent UI evidence.

## Persistence, rollback and release gate

The Vault module and its schema are unchanged; no migration or new key is introduced.
The cumulative `RELEASE-FILES-CHARACTER-FOUNDATION.sha256` is refreshed for the current
Character candidate, replacing the prior slice's hashes rather than leaving stale
release hashes. Existing QA6/v45 rollback material and CI are untouched.

To undo only this slice on a disposable checkout, restore its changed files from
parent `10c19937` and remove its newly added test. Verify the full dist tree against
the parent; this plan is not a tested release rollback utility. The live guide stays
QA6 v46. The frozen QA6 identity gate is deliberately not changed by this slice.

Next: target-version gear verification, representative game artwork and runnable
browser acceptance, then more sets and shared crafting/acquisition details. None
of the final Character scope is removed by this incremental implementation.
