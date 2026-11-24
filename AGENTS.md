# AGENTS.md — PHOENIX session-start standard

> **CAPT-APPROVED CANONICAL DOCTRINE (2026-11-23):** Read [Canonical Template and Repository Doctrine](docs/CANONICAL-TEMPLATE-DOCTRINE.md) before planning any regional template, map, Progress, art asset, branch or cleanup work. Its 21 adopted decisions supersede conflicting older design instructions. Velen is the master; White Orchard aligns after Velen lock; full geographical Main Map and its optional Progress layer come later. Order 017/PR #35 remains a development candidate; no cleanup, merge or publication is authorized by this note.


**Required guide-wide art standard.** All owner-approved Phoenix assets are required across all pages, regions, templates and overlays wherever their asset family applies. Use the approved defaults or variants for the surface and control, and follow the recorded placement, scale and rotation rules. Reuse the approved artwork for the same destination across menus. New or replacement designs require owner approval before use.

**Approved divider and heading art.** Use only the [approved parchment and dark-stone ornaments](docs/framing-review/dividers/README.md) for decorative section dividers and heading ornaments throughout the guide. Match the artwork to the surface. Owner approval is required before adding or replacing a design.

Applies to every PHOENIX officer and agent (LT, Cmdr, and any helper; PFC is retired) at the start of every work session.
Adopted by the owner on 2026-11-16 (operating plan + nine amendments). Summary only; the owner's plan governs.

## 1. Start of session (in this order)
1. **Read `docs/PROJECT-STATUS.md` first.** It names the accepted build, the current candidate, open blockers and
   who owns what. If it disagrees with what you were told, stop and ask; do not guess.
   Read [canonical doctrine](docs/CANONICAL-TEMPLATE-DOCTRINE.md), [session calibration](docs/SESSION-CALIBRATION.md), and the applicable [page template](docs/PAGE-TEMPLATE-INDEX.md) before drafting the work checklist. Treat older conflicting template/map instructions as historical, while retaining their useful acceptance details.
2. **Verify repository access** for what you need (read, and write if you are the author). Record the repository,
   branch and full commit SHA you are working from. If access or an execution environment is missing, say so and stop
   that step; do not route around authentication.
3. Verify inputs by hash before using them (package sha256, `docs/*.sha256` manifests).

## 2. Roles

**Permanent command authority (Order 017; do not alter):**
- **Capt** = project owner and final approval. Capt alone authorizes corrections, field acceptance, merging and publication.
- **Cmdr** = ChatGPT, coordination and independent QA.
- **LT** = Grok, engineering and technical testing.
- **PFC** = retired from all projects.

**Permanent architecture (owner decision):** Constellation and Star Chart are retired. Progress belongs only to the geographical Main Map, as a layer. There is no standalone Progress destination and no replacement celestial visualization. Geographical quest maps stay. See [quest-area map owner decisions](docs/QUEST-AREA-MAP-OWNER-DECISIONS.md).

*Historical (superseded):* a "Progress star chart leg" (Jess and Capt) governed the retired star-chart pilot. It no longer applies. Its build plan and decision report were removed in PR #34 and remain in git history at `a66e85e6d7876f306dde2cf13a485caba59b622e` (`docs/PROGRESS-STAR-CHART-*.md`).
- **Author ≠ independent reviewer.** The officer who writes a change never counts as its independent reviewer.
- Reviewers start from the commit and the acceptance checks, and read the author's evidence only afterwards.
- Cmdr coordinates and performs independent QA; Capt (the owner) alone authorizes release and does physical iPhone/Safari acceptance after deployment is verified.

## 3. Evidence labels (every finding / result)
- `independent` — run by the reviewer on their own environment;
- `author-supplied` — run by the author (e.g. LT's own probes);
- `source-inspection` — read from code, not reproduced;
- plus **"also fails on baseline?"** (yes/no/not checked) for every defect.

## 4. Required checks by change type (stop once these pass)
| Change type | Required checks |
|---|---|
| Docs only | links/paths exist; hashes and tags quoted in docs match the files |
| Cache tag / entry point | `slice2-cache-tags.test.cjs`; returning-browser check (old build cached → new script fetched) |
| Storage / save handling | targeted unit tests incl. unreadable/corrupt records; reload persistence; byte-unchanged unreadable data |
| Quest hub UI / objectives | targeted tests; headless 390×844 and 844×390 render; reload + return navigation; Undo |
| Data migration | idempotence; guarded refresh/rollback; Slice 1 suite (`slice1-migration.test.cjs`) |
| Any release candidate | full suite with art; protected-file pins; rollback dry-run; release file list with sha256 |

## 5. Hard rules
- **No deployment without Cmdr's independent QA recommendation and Capt's explicit authorization.** No publishing, no Pages changes. No destructive branch/asset retirement or obsolete PR closure without the approved disposition audit.
- Do not push to `main`, rewrite history, force-push, add workflows, or create releases/tags unless ordered.
- Keep application code changes inside the ordered scope; protected files (pinned in `dist/slice2-nilf.test.cjs`)
  are reported before any edit.
- Status documents are updated in the same change as the thing they describe.
- Pyres and Mercy are incomplete at objective level; do not extend the separate Velen renderer to them until the
  shared-component boundary is agreed.

## 6. Packages (ZIP exceptions)
Work moves to commits and PRs once the verified GitHub baseline is accessible. ZIPs become the exception: offline
checkpoints, no repo access, saving time/usage, or when the artifact itself is the deliverable. Every transferred
package states its source commit, contents, exclusions and full SHA-256, as one all-inclusive ZIP (< 25 MB) or several
with consistent, unique names.

For quest or activity card work, read `docs/QUEST-CARD-ART-TEMPLATE.md` and `ART-STANDARD.md` at session start.

For regional quest or activity decks, read `docs/REGION-DECK-TEMPLATE.md` before editing.

For any guide page, start with `docs/PAGE-TEMPLATE-INDEX.md` and follow its linked templates and acceptance checks.
