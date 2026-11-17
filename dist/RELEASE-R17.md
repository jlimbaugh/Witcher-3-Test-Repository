# Phoenix R17 — LT review follow-up

Baseline: production R16, `6f24d74ec7e9226d9d4a0db78ec918c2cbdfbbd9`.

## Changes

- Continue retains its saved-place behavior, with an explicit **Resume last walkthrough** label. For saves with no walkthrough it says Return to last hub or Return to last guide page. Browsing cards does not overwrite the last viewed walkthrough.
- The contextual tile is **Open selected quest**. Cards are selection buttons, never implicit navigation. The quest journal has a separate **Open selected hub** link. Front and adjacent card taps, arrow controls and keyboard Left/Right/Home/End use the same selection event. Home browsing selection is retained in its browser-history entry.
- The front illustration loads eagerly with high fetch priority, with thumbnail artwork behind it. Previously loaded illustrations retain their sources. Vertical gestures are distinguished from horizontal swipes and pointer cancellation resets the gesture.
- Confirmed browser-history defect fixed: restored hubs now restore selectedHub together with expandedHub, so the visible cluster, selected hub and front quest card agree. New content-history entries retain their originating tree snapshot, including across walkthrough stages.
- Full quest titles wrap instead of being truncated. Orbit controls are at least 48 CSS pixels tall. A narrow console-header overflow was removed.

No completion-engine/data changes, new completion store, artwork replacement, repository-permission changes or other-repository changes.

## Review disposition

LT's Continue observation exposed ambiguous wording, not a requirement to discard saved resume. The two actions are now explicit. Direct-card navigation and mismatched hub restoration were reproduced and fixed. Walkthrough hashes and hierarchical hub hashes remain distinct because they serve different destinations. The reported 46 px control height already met the project's 44 px target; it is now 48 px. Offscreen lazy images are not classified as missing solely from naturalWidth. Primary front-card loading is improved without claiming throttled-network acceptance.

## Verification

- Node progression suite: 29/29 pass. Changed JavaScript syntax checks pass.
- Chromium: front-card tap stays on home; keyboard selection updates title and destinations; explicit hub navigation works. Front artwork is eager/high priority.
- Back and Forward between Pan and Missing hubs restore matching expanded hub, selected hub and front card. Walkthrough stage → map → another hub/walkthrough → Back sequence exercised; original quest stage restored. Direct Pan hub → walkthrough → exact return restored scrollY 1511 to 1511.
- All 13 home card titles checked in a 320 px frame: no clipping or category/title overlap. Final narrow viewport had document width equal to its 305 px usable width (320 px frame minus scrollbar); both orbit controls measured 48 px tall. 390 px frame also reviewed.
- Scope excludes real iPhone Safari/VoiceOver, physical swipes, throttled loading, exhaustive map/constellation audit and migrated-progress UI acceptance.

## LT retest

Review the R17 production commit identified in the handoff; report the SHA actually tested. Focus on front/adjacent card taps and keyboard/wraparound, explicit resume versus selected-quest actions, Back/Forward hub identity, exact return after visiting another quest through the map, full long titles below 400 px, and front-art loading. Do not merge, deploy or alter main during review. Return confirmed defects separately from unverified concerns.
