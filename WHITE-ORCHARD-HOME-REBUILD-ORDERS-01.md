# Operation Phoenix — Home rebuild: accepted direction and LT build order
13 November 2026 · CaptDrunk / Cmdr Chad / LT
Working branch: phoenix-white-orchard-completion
Order baseline: a69fb9b23b3d347bc305c1371c734e30ccd314f9
Application baseline: 1c91b66eeefb5ec99a357f1a18d7aeccfb53be31
Private frozen QA copy: https://phoenix-wo-qa-1c91b66.krwpfbtbn8.chatgpt.site

## Authority and delivery
CaptDrunk has authorized remaking Home. This order supersedes conflicting interim suggestions in the earlier design review, including navigation-only medallion as the final design and an empty fresh-save cluster as the accepted experience.
Home rebuild is now the active implementation slice; the earlier arrival-content Stage B/03B is parked until Cmdr resumes it. Do not mix both patches. White Orchard completion remains the project boundary.

Implement locally. Return reviewable unified diffs and a test report in chat; no remote application-file writes this cycle. Number large diffs by file/module if necessary. Never use ellipses or placeholder bodies. Cmdr applies, validates and commits full files atomically. Do not push, merge, deploy, update the private Site, change main/settings, or advance to another region. PFC is optional focused support, not a standing review gate.

## 1. Settled Home direction
Top navigation: Home / Quests / Regions / Constellation. Preserve working destinations. Calligraphy default, readable alternatives retained. Follow device appearance on first visit and remember a manual override. appearance.js already implements most of this; verify rather than replace.

Top bar scrolls away. Bottom-right Witcher medallion becomes the persistent navigation entry, respecting iPhone safe areas and avoiding underlying controls. It opens the four destinations as a Gwent-inspired card fan.

Preserve regional banner art. Cmdr/LT choose banner proportions and responsive layout around compact controls, vertical reading and horizontal browsing. Home must not become a long stack of full-height panels.

Quest cards select in place. Selection updates the panel; it does not navigate or complete anything. Open is the separate entry action. Preserve the established selection/history contract, stage resume and exact hub return; do not regress to session-only selection. Existing Continue/resume behavior is retained because its redesign was skipped.

The selected-quest panel must expose:
- Short quest description.
- Next unfinished applicable objective.
- Completion progress.
- Suggested level where sourced; unknown is not a fabricated value.
- Relevant decision/missable warning.

Use compact hierarchy and horizontal/expandable surfaces without hiding critical warnings or truncating them beyond discovery. Required actions: Open walkthrough; Open quest hub and nearby activities; Open this quest's cluster map. All three follow the currently selected quest.

Lower shortcuts: Regional map; Merchants; Character build and skills; Gear and crafting; Alchemy and combat. Compact illustrated arrangement delegated to Cmdr/LT: scrolling cards, grid or a compact category control are acceptable. Reuse existing art/content where appropriate.

Footer/attribution remains compact and intact.

## 2. HUD and truthful metrics
Compact Witcher-style HUD. Expand/collapse with a restrained visual effect. Current region first; whole journey available in an expandable summary.
Four categories: Main story; Side quests and contracts; Exploration and treasure; Gwent collection.
Expanded controls only choose which categories are displayed. No progress editing in HUD. HUD filter memory was skipped: do not invent a user-selected persistence preference. Session-only display selection is the provisional implementation default; document it as Cmdr's choice, not Capt's answer.

HUD category preferences are separate from authoritative completion records. Filter/expand/navigation writes must never alter story facts.
Deduplicate activities across hubs/maps. Services, signposts and read-warning/reviewed-guidance records do not inflate completion totals. Define category membership explicitly and avoid double-counting treasure hunts in both side quests and exploration.
Gwent collection means actual owned cards; gwent-start only means reviewed guidance. No card ownership can be inferred from that Boolean.
Do not represent unbuilt regions as zero-percent completed inventories or invent a global denominator. Whole-journey summary may honestly identify the tracked regions and unavailable coverage.

## 3. Medallion state contract
Visual identity: Witcher medallion. A visual hum uses subtle tremble, glowing eyes/pulse. Effects should have CDPR-world provenance and fit established Witcher art. Reuse credited assets if suitable; report any missing appropriate medallion art rather than falsely claiming concept art is official. No runtime-generated arbitrary mascot. No audio is required. Do not promise iPhone Safari vibration; visual information must suffice.

States and priorities:
A. Resting/navigation: tap opens Gwent-style fan; tap outside or Escape dismisses; focus returns to the medallion.
B. After a committed progress change with an available Undo: medallion location becomes an unmistakably labelled Undo control. It is fully visible for 3000 ms, then fades over a provisional 900 ms (Cmdr/LT implementation choice), then returns to navigation or the next queued warning.
C. During Undo, a tap reverses the last committed progress update immediately through the existing atomic Undo action. Navigation is not simultaneously active under the same target. Successful Undo ends that quick-Undo state.
D. Warnings arriving during Undo queue behind it. Present warnings one at a time, strictly in arrival order. No urgency-based reordering.
E. A warning remains active until explicit acknowledgement. Opening its guide alone is not acknowledgement. Tapping the warning medallion opens its text and relevant action/acknowledge control. No automatic warning fade.
F. Acknowledged warnings remain available in both medallion warning history and the relevant quest/activity page.
G. After one acknowledgement, present the next queued warning or return to resting navigation.

No second Undo stack. A new committed update replaces quick Undo with the engine's actual latest undoable update; never display an action that points to an older transaction.
Do not steal focus or silently execute an action while controls change. A pointer gesture spanning a state transition must be cancelled rather than reinterpreted as the new control's action. Preserve equivalent keyboard behavior. Freeze a navigation fan while it is being operated; do not swap the focused destination into Undo.
The disappearing quick control does not remove durable Undo/correction from the canonical Update Progress interface.
Reduced-motion behavior removes tremble/fan travel/fading motion while retaining explicit labels and state changes.

Warnings about a proposed consequential action must still appear in its existing pre-commit review. Queuing medallion attention never suppresses confirmation, postpones a departure warning until after commitment, or auto-acknowledges it. This is an implementation guardrail, not a change to Capt's FIFO post-update warning choice.

## 4. One progress pipeline
All entry points open/use the same canonical Update Progress interface and plan/confirmation engine. Retain required-ancestor catch-up review and atomic Undo. Confirm once, derive updates everywhere.
Quest rows/objective actions may remain entry points; do not create independent data stores for HUD, map or medallion.
Page viewing, Next/Previous, map browsing, card selection, HUD filters and warning acknowledgement never infer arrival, objective completion or card ownership.
Preserve current saved key, IDs, schema and legacy marks. Any optional UI preference/history data needs a separate namespace, tolerates unavailable storage and cannot mutate the game-progress record. Do not promise live Xbox-save synchronization.

## 5. Cluster-map correction — required in this slice
Provide an explicit two-choice control: Browse cluster / Filter by my progress.
- Browse cluster shows the known mapped activities assigned to that cluster without requiring recorded arrival. Use actual cluster membership/recommendations before story-eligibility filtering, not the entire regional pin set.
- Filter by my progress uses the existing eligibility rules and completion visibility controls. An empty result explains the filter and offers Browse cluster plus the canonical Update Progress entry.
- Opening/switching modes never records arrival or any story fact.
- Fresh, unconfirmed progress opens Browse cluster as Cmdr's provisional usability default. Once progress exists, preserve the last selected mode for the current visit; do not invent a permanent owner preference.
- Keep completed-pin visibility explicit; unknown progress does not mean an activity is confirmed available in-game. Browse must say it is not progress-filtered.
- Preserve map position/filters/mode on exact return and Back/Forward. Changing mode must not drop cluster scope. Show all markers remains a clearly regional action.
- No invented pins, coordinates, new task IDs or changes to quest eligibility itself.

## 6. Dependency check before polishing
Inspect actual destinations and metric sources first; return a concise capability table with the local patch.
Current source has Map and Merchants destinations but no established standalone Build, Gear or Alchemy views. Do not add dead links or invent full systems content under a Home-only order. Wire valid existing relevant destinations if present; otherwise report the missing destination as an explicit acceptance gap and propose the smallest sourced follow-up. A partial candidate must not be called finished Home.
Likewise, no verified per-card inventory exists in the current Gwent reviewed-guidance mark. Report that gap; do not fake a collection percentage. Full Home acceptance requires a valid source for every advertised metric/action.
Unknown/completed/failed/blocked/branch-closed objectives need distinct panel states. Next objective must come from the canonical engine, obey prerequisite/branch rules and not count an optional skipped step as the next mandatory objective.

## 7. Parked work
No spatial constellation rebuild in this order. Its separately recorded vision is a floating White Orchard center, region globes, quest globes and shared task nodes connected once per underlying task, reflecting guide progress. Preserve its existing route without presenting it as the accepted redesign.
No merchant NPC cast, dialogue or typed-answer service. Preserve existing merchant content and route. The future design is rotating standout merchants/smiths/herbalists/innkeepers, one character per visit, varied text greeting, suggested/typed questions and compact category navigation.
No Velen content, quest-source rewrite, arrival-content patch, purchases, new AI service or hosting changes.

## 8. Validation and STOP
- Run existing 29 White Orchard progression tests and syntax-check all changed/new modules. Add meaningful focused tests for pure medallion transitions, derived metrics and browse/filter membership where applicable.
- Preserve 59 tasks / 13 hubs / 44 stages / 46 definitions; verify unrelated data and progression files remain unchanged.
- Test fresh/unconfirmed, partial, completed, failed and legacy progress. Reload and Undo preserve unrelated records. Storage denial must not crash navigation.
- Exercise map Browse/Filter with fresh and recorded progress, zero-result filters, shared pins, completed visibility, return and history.
- Test Undo immediately, at 2999 ms, during fade, after return to nav, successive updates and queued warnings. Check FIFO, explicit acknowledgement, warning history, durable correction and pointer/keyboard transition safety.
- Check selection-in-place, action synchronization, full warning readability, Next objective branch correctness, stage resume, Back/Forward and exact hub return.
- Layout: desktop and 390 CSS px, both themes, touch-sized controls, no accidental horizontal page overflow; horizontal rails have discoverable controls and keyboard access.
- Check accessible names, focus return/dismiss, reduced motion and no repeated noisy announcements. Physical iPhone Safari/VoiceOver/Xbox remain explicit field checks.
- Browser tests use the supported Sites preview relay in a stable session. The frozen hosted preview is 1c91b66 and cannot certify a new patch. No claim of test evidence without exact local source/diff identity.
Return complete diffs, capability/gap table, tests, screenshots if available, limits and remaining questions that genuinely block implementation. Do not reopen settled preferences. STOP for Cmdr QA; CaptDrunk retains final Safari acceptance and release authority.
