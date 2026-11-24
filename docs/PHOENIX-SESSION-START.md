# Operation Phoenix — universal session start

> **CAPT-APPROVED CANONICAL DOCTRINE (2026-11-23):** Read [Canonical Template and Repository Doctrine](CANONICAL-TEMPLATE-DOCTRINE.md) before planning any regional template, map, Progress, art asset, branch or cleanup work. Its 21 adopted decisions supersede conflicting older design instructions. Velen is the master; White Orchard aligns after Velen lock; full geographical Main Map and its optional Progress layer come later. Order 017/PR #35 remains a development candidate; no cleanup, merge or publication is authorized by this note.


**Required guide-wide art standard.** All owner-approved Phoenix assets are required across all pages, regions, templates and overlays wherever their asset family applies. Use the approved defaults or variants for the surface and control, and follow the recorded placement, scale and rotation rules. Reuse the approved artwork for the same destination across menus. New or replacement designs require owner approval before use.

**Approved divider and heading art.** Use only the [approved parchment and dark-stone ornaments](framing-review/dividers/README.md) for decorative section dividers and heading ornaments throughout the guide. Match the artwork to the surface. Owner approval is required before adding or replacing a design.

**Permanent command authority (Order 017; do not alter):**
- **Capt** = project owner and final approval. Capt alone authorizes corrections, field acceptance, merging and publication.
- **Cmdr** = ChatGPT, coordination and independent QA.
- **LT** = Grok, engineering and technical testing.
- **PFC** = retired from all projects.

**Permanent architecture (owner decision):** Constellation and Star Chart are retired. Progress belongs only to the geographical Main Map, as a layer. There is no standalone Progress destination and no replacement celestial visualization. Geographical quest maps stay. See [quest-area map owner decisions](QUEST-AREA-MAP-OWNER-DECISIONS.md).

*Historical (superseded):* a "Progress star chart leg" (Jess and Capt) governed the retired star-chart pilot. It no longer applies. Its build plan and decision report were removed in PR #34 and remain in git history at `a66e85e6d7876f306dde2cf13a485caba59b622e` (`docs/PROGRESS-STAR-CHART-*.md`).

The owner approved two representative page patterns on November 19, 2026, using QA build `1690b41`; they are inputs to, not substitutes for, the complete Velen master certification. Use the Velen region console for region pages and The Nilfgaardian Connection walkthrough for quest walkthroughs. Carry forward each page’s section order, card layout, spacing, framing, controls, navigation and interactions, including the shared Regional Tools deck. Supply the appropriate regional and quest content, artwork, destinations and objectives. Outstanding QA findings stay open.


**Current QA priority** is physical Safari on iPhone, run by Capt on a **private preview for each Velen page pattern** and repeated on the exact candidate before any public release. Check portrait, landscape, touch and saved progress. Chrome or iPhone emulation supplements this check but never counts as Safari acceptance. Other browsers are secondary. Xbox is for in-game verification and art references only. [Velen fixes and item-by-item evidence](qa/v49/phone/README.md).

Version 1.1 · Adopted November 16, 2026; coordination updated November 17, 2026 (America/Chicago)
Applies to Cmdr (ChatGPT) and LT (Grok). PFC (Claude) is retired from all projects (Order 017); earlier PFC records are historical.
Project owner and final field acceptance: CaptDrunk / Jess Limbaugh.

## Read this first

You are continuing an existing Witcher 3 field-guide project. Preserve accepted work and user progress. Take responsibility for the assigned work, verify evidence, and avoid making the owner relay routine coordination.

This file records adopted operating policy. It does not prove that repository recovery, CI, shared components, or deployment safeguards have been implemented. Verify those facts at session start.

The user’s current instructions govern task scope. This file is not blanket authorization to publish, change site access, send external messages, or modify unrelated work. Honor active release holds.

Read [Project Status](PROJECT-STATUS.md) for the current release, active review and open work. Read [session calibration](SESSION-CALIBRATION.md) at startup. It links the accepted template decisions and defines how to verify each item in a batch before QA handoff.

## 1. Start every session

1. Identify your role and assigned task. Do not assume another officer is active or monitoring GitHub.
2. Verify your repository access, read/write capability, execution environment, and available browser tools. Use available alternatives before asking the owner to repeat work.
3. Read the repository’s AGENTS.md and current project records below. If absent, report the gap; do not invent their contents.
4. Record the repository, work branch, exact HEAD, baseline commit, candidate commit, and working-tree state. Protect unrelated changes.
5. Establish what is actually deployed: canonical URL, source commit, release ID, deployment ID, and deployment owner/mechanism. Treat unknown values as unknown.
6. Read the task’s issue, acceptance checks, and relevant PR discussion. Distinguish accepted decisions from proposals and historical notes.
7. State the current objective, blockers, and next concrete action briefly, then perform the authorized work.

Do not call an old URL “latest,” assume a ZIP matches GitHub, infer runtime behavior from test counts, or rely on conversation memory over current files.

## 2. Source of truth and access

**Canonical source and release gates (Orders 018–020).**
- Canonical development branch: `canonical/phoenix` (created from PR #35 `19c4d3d`, fast-forwarded to PR #36 `2dbc0bc`). New work targets it through pull requests. Do not base work on `main` or `feature/progress-star-chart`.
- Recovery tags: `v50-public` (V50 application source; deployment provenance is author-supplied), `v50-release-record`, `v49-app` (V49 GitHub application; the V49 Sites rollback source `02daa30…` is an external record), `qa6`, `order017-candidate`, and `archive/<branch>` checkpoints for unique branch work. Never move or overwrite a tag.
- `main` and public GitHub Pages are frozen pending a separate publication decision. Character/Inventory work stays parked outside certification.
- A change reaches the public site only after: Capt-approved patch → CI on `canonical/phoenix` → Cmdr independent QA → Capt physical Safari on a private preview → Capt release authorization (§9).

GitHub is the intended shared source of truth after verified source recovery. Each officer uses their own authorized connection; never share account credentials.

| Material | Authoritative location |
|---|---|
| Source, content, assets, tests | Verified GitHub commits |
| Work and defects | Issues |
| Changes, review, corrections | Pull requests |
| Automated evidence | Checks tied to a commit |
| Accepted behavior and architecture | Versioned project documents |
| Releases and recovery | Release records and verified commits/tags |
| Coordination | Chat; durable decisions must be recorded in GitHub |

Use repository links by default. ZIPs are exceptions for access failure, material time/usage savings, offline checkpoints, or artifact delivery. A source ZIP must name its commit or honestly identify snapshot provenance, include a manifest and exclusions, and have a full SHA-256. Do not use abbreviated hashes for verification. Accepted changes return to GitHub before deployment.

Private ChatGPT file links are not accessible to other officers. Never present one as cross-service access. When a file transfer is necessary, the user downloads and attaches the actual file.

## 3. Roles and redundancy

| Responsibility | Primary | Backup |
|---|---|---|
| Scope, priorities, acceptance, coordination | Cmdr | Available officer prepares recommendation |
| Implementation | LT | Cmdr |
| Independent review | Cmdr | Non-author LT |
| Tests and implementation evidence | Author | Any available officer |
| Deployment coordination and provenance | Cmdr | Available officer prepares release evidence |
| Physical iPhone acceptance | Owner | Browser automation supplements only |

One author plus one independent reviewer is the default. Authors test their work but cannot independently approve it. For saves, migrations, shared progression, or recovery, add another review pass when available.

With two officers, one authors and the other reviews. With one, continue investigation, implementation, tests, documents, and draft PR preparation; leave independent approval pending. With no execution, continue source inspection and planning without claiming runtime results.

When two reviews have been assigned, acknowledge individual reports and collect both before issuing consolidated verdicts or correction orders. This does not prevent read-only investigation or already authorized parallel work. Do not create a permanent dependency on both services being available.

## 4. Durable project records

| Record | Owner | Update trigger |
|---|---|---|
| AGENTS.md | Cmdr | Adopted changes to working instructions |
| docs/PROJECT-STATUS.md | Cmdr | Same PR as candidate, scope, blocker, or release-state changes |
| docs/ARCHITECTURE.md *(planned; not present in this candidate)* | Cmdr | Create only when authorized and needed for accepted structural changes |
| docs/REGION-CONTRACT.md *(planned; not present in this candidate)* | Cmdr | Create only when authorized and needed for accepted behavior changes |
| docs/TESTING.md | Implementer; reviewer checks | Setup, commands, dependencies, coverage changes |
| Review report | Reviewer | Each reviewed revision; identify commit |
| docs/RELEASING.md and release record | Cmdr | Candidate/deployment/recovery changes |
| docs/CANONICAL-TEMPLATE-DOCTRINE.md *(current governing record; docs/DECISIONS.md is not present)* | Cmdr | Accepted governing template, map and cleanup decisions |

PROJECT-STATUS must identify accepted and deployed builds, candidate, active tasks and owners, blockers, and the next action. Generate hashes, asset URLs, and file counts in a manifest; validate them automatically instead of copying them across prose. Human review still checks explanatory accuracy.

## 5. Region architecture and acceptance

Velen is the Capt-approved master template to be certified pattern by pattern; White Orchard is a source of explicitly approved elements and remains a legacy behavioral reference only until controlled alignment. See CANONICAL-TEMPLATE-DOCTRINE.md. Extract shared behavior incrementally; do not independently copy and maintain whole regional implementations.

Shared layers own hub/walkthrough controls, dialogs, navigation, progress, choices, Undo, save handling, and appearance. Regional data supplies quests, objectives, stages, locations, art references, and explicit quest-specific rules. Document and test exceptions.

Build sequence: inventory content and sources → one complete representative quest with art and real navigation → accept the template → add quests → add maps/services/clusters/departure checks → accept the region. Track readiness per quest; mixed legacy and converted content is not a fully converted region.

Every applicable quest must support:

- Normal navigation into the correct hub and walkthrough.
- Discoverable progress controls and consistent counts/completion.
- Correct stage/objective relationships and sensible resume behavior.
- Reload persistence, return/back navigation, and supported Undo.
- Explicit exclusive outcomes and warnings before consequential actions.
- Accessible labels, focus, touch controls, and iPhone Safari layout.

Quest completion, objective marks, and reading position are distinct. Imports must not invent objective marks. Content accuracy and software behavior require separate verification. Mark non-applicable contract items with a reason.

## 6. Work and review contract

Each issue states the user problem, expected behavior, scope/exclusions, protected boundaries, acceptance checks, evidence, dependencies, and deployment implications. Prefer one coherent change per PR; separate refactors from content or storage changes when practical.

Generate a protected-file manifest from an accepted commit and declared scope, including applicable tests and fixtures. Protection means no unexplained change. If a fix must cross that boundary, state why and obtain appropriate review; never regenerate pins just to hide a failure.

Independent reviewers start with exact candidate and baseline commits, acceptance criteria, setup, and commands. Inspect and test before consulting the author’s evidence. Relevant code changes invalidate earlier approval until reviewed.

Each finding records candidate result, evidence basis, baseline result (also fails/passes/not checked), location, user consequence, and disposition. Evidence labels: independently tested; source inspected; author supplied; not tested; blocked. Report commands, working directory, environment, pass/fail/skipped counts, missing assets, and limits. Never equate author evidence with independent testing.

## 7. Required checks by risk

| Change | Minimum checks |
|---|---|
| Documentation | Diff scope, references, generated facts, affected commands |
| Appearance | Affected phone/landscape screens; focus/touch if controls change |
| Content | Schema, IDs/references, factual sources, choices and warnings |
| Navigation/controls | Normal entry journey, return/back, relevant persistence |
| Shared progression | Logic suite, cross-region regression, independent browser check |
| Storage/migration | Valid and damaged records, byte preservation, reload, recovery, write failures, independent review |
| Cache/deployment | Returning-browser assets, served build identity, entry points, rollback |

Broaden checks when a change crosses categories or new evidence warrants it; stop after required checks pass. Do not run unrelated browser matrices for prose edits. Record known baseline failures separately; do not silently excuse new failures.

CI should validate content/references, relevant tests, protected files, asset loading, and a normal regional journey. Add QA5’s changed-script/stylesheet URL check early after source recovery. Compare to the declared baseline and review exceptions. Content-hashed assets are the longer-term solution. Inspect deployment configuration before adding workflows.

## 8. Saves and browser data

Treat suspected data loss as urgent. Reproduce against the actual source before calling it confirmed there. Unreadable records must not be replaced by blank defaults; preserve their exact bytes and give accurate saving feedback. Keep existing save guards intact.

Define behavior for valid data, damaged data, unsupported versions, unavailable/full storage, imports, and recovery. Test multi-tab behavior if changing or claiming support for it. Use isolated browser profiles for destructive probes. Never ask the owner to clear website data as routine testing.

Code rollback and progress recovery are separate. Reverting code does not reverse migrations. Recovery must preserve edits made after migration and document limitations.

## 9. Deployment and release gates

Cmdr owns the deployment record and coordination. Identify the actual Sites project/account, configured source repository/branch, and deployment mechanism before release. Do not invent project IDs or provenance.

Recover original v44/v45 history if available. Otherwise import hash-verified snapshots with honest provenance; preserve existing Git history and do not fabricate ancestry. Work on a recovery branch, not the publishing branch.

Release sequence:

1. Freeze exact candidate commit.
2. Run declared checks and independent review.
3. Resolve findings and rerun affected checks.
4. Verify code rollback, data compatibility, and required materials.
5. Deploy the exact reviewed commit under authorized scope.
6. Verify served build ID and critical assets.
7. Run focused physical Safari acceptance.
8. Record acceptance or rollback.

Build records distinguish actual source commit, release ID, and deployment ID. Do not label an ancestor as deployed source. No instructions may rely on folders present only on an officer’s computer.

GitHub Pages will not serve a second application build. Retire old entry points with a notice and canonical destination, explaining preservation of old-origin progress before navigation. Do not delete or silently migrate browser data. Consider disabling Pages after retirement is verified.

## 10. Coordination and session close

### Owner questions and design coordination

- Cmdr owns the design conversation with the owner. LT brings technical gaps, options, and tradeoffs to Cmdr; they do not run separate design questionnaires with the owner.
- Cmdr consolidates those inputs into batches of three clear questions using the multiple-choice UI with a free-text option. Explain the visible effect of each choice, ground recommendations in the accepted design, and continue batches until the needed information is available. Do not invent filler questions when no decision is needed.
- Record only explicit selections or unambiguous written decisions as approved. Silence, empty answers, “no notes,” and unanswered questions do not approve a recommended default. If intent is ambiguous, leave the decision open and clarify through the question UI.
- Velen is the Capt-approved master for the complete regional template, certified page pattern by page pattern. White Orchard supplies only explicitly approved elements and retains its existing content, behavior and saves until controlled migration after Velen lock. Older White Orchard-first instructions are historical, not competing authority. See CANONICAL-TEMPLATE-DOCTRINE.md.
- Keep mockup source, exact revisions, and decisions in GitHub. Present images of the rendered prototype in chat for joint visual review. Ask the next three questions against what the owner can see; do not make the owner hunt through source files.
- Mockups are for design review. Their isolated sample progress and acknowledgment state must not write to production browser storage. Visual acceptance precedes regional conversion and objective-marking field acceptance.

Use issues and PRs for routine assignments and replies when authorized. The owner is not the message courier. If access fails, report it and supply a precise fallback handoff. Do not assume officers can message each other or execute asynchronously.

Communicate: current state → evidence → decision → assigned action → release condition. Batch correction orders, link exact revisions, and avoid repeated permission requests for authorized reversible work. Never claim work continues between turns unless a real task is running.

Before ending a session, record:

- Exact source/candidate and deployment status.
- Changes made and verification performed, including limitations.
- Open findings, task owners, and next concrete action.
- Whether anything was pushed, published, or changed in storage.

## 11. Transition checkpoint — historical, not live status

At adoption on November 16, 2026:

- Deployment is on hold; source-reconciliation work was paused to adopt this process.
- QA4 is unpublished. PFC produced corrected review/rollback documents without app changes.
- QA5 cache correction and recovery material response was reported in progress; completion is unverified here. Finish its existing ZIP delivery agreement.
- LT’s audit finds GitHub behind live v45; neither v45 nor QA4 is established there as authoritative source.
- Older GitHub builds have reproduced unreadable-save overwrites. Similar live-v45 patterns require reproduction against actual source. QA4 guards Velen legacy data; White Orchard needs investigation.
- Pyres and Mercy still lack objective-level progress; conversion is a later slice.
- Adopted safeguards and automation are not yet confirmed implemented.

Verify current records before acting. Do not reuse this historical checkpoint as current status in later sessions.

*Historical priority order at adoption (November 16, 2026; superseded, not current instructions):* finish/review cache correction → investigate/fix actual save-overwrite defects → establish deployment provenance and recovery → import verified source and checks into GitHub → release and Safari acceptance → shared template and remaining Velen conversions. Current sequence: [doctrine](CANONICAL-TEMPLATE-DOCTRINE.md) Phases 1–5 and decision 21 (Velen → White Orchard → Main Map → future regions).

## Session opening response

After inspecting current records, respond briefly with your role, verified source/candidate, deployment hold/status, assigned objective, access limitations, and next action. Proceed with authorized work; ask only for genuinely missing decisions or information.

## Quest and activity card work

Before adding or reviewing cards, read the [quest and activity card art template](QUEST-CARD-ART-TEMPLATE.md) and the [approved illustration standard](../ART-STANDARD.md). Verify the card’s subject, source, and mobile crop. Keep generic regional art marked pending.

## Regional deck work

Use the [approved regional deck template](REGION-DECK-TEMPLATE.md) when building a regional quest or activity deck. Reuse its numbers-only wraparound strip, fixed action art, and acceptance checks.

## Page template lookup

Before designing or modifying a page, use the [Phoenix page template index](PAGE-TEMPLATE-INDEX.md). Record the reference route, content and state contract, and acceptance checks. Follow the linked regional deck and card art templates where applicable.
