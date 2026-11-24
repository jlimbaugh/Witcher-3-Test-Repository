# AGENTS.md — PHOENIX session-start standard

**Required guide-wide art standard.** All owner-approved Phoenix assets are required across all pages, regions, templates and overlays wherever their asset family applies. Use the approved defaults or variants for the surface and control, and follow the recorded placement, scale and rotation rules. Reuse the approved artwork for the same destination across menus. New or replacement designs require owner approval before use.

**Approved divider and heading art.** Use only the [approved parchment and dark-stone ornaments](docs/framing-review/dividers/README.md) for decorative section dividers and heading ornaments throughout the guide. Match the artwork to the surface. Owner approval is required before adding or replacing a design.

Applies to every PHOENIX officer and agent (LT, Cmdr, PFC, and any helper) at the start of every work session.
Adopted by the owner on 2026-11-16 (operating plan + nine amendments). Summary only; the owner's plan governs.

## 1. Start of session (in this order)
1. **Read `docs/PROJECT-STATUS.md` first.** It names the accepted build, the current candidate, open blockers and
   who owns what. If it disagrees with what you were told, stop and ask; do not guess.
   Read [session calibration](docs/SESSION-CALIBRATION.md) and choose the applicable [page template](docs/PAGE-TEMPLATE-INDEX.md) before drafting the work checklist.
2. **Verify repository access** for what you need (read, and write if you are the author). Record the repository,
   branch and full commit SHA you are working from. If access or an execution environment is missing, say so and stop
   that step; do not route around authentication.
3. Verify inputs by hash before using them (package sha256, `docs/*.sha256` manifests).

## 2. Roles

**Current Progress star chart leg:** Jess and Capt are the two participants. Capt implements and verifies. Jess owns design, physical iPhone acceptance, and the release decision. This owner-approved workflow governs this leg and supersedes officer assignments and the two-report wait for it. See the [build plan](docs/PROGRESS-STAR-CHART-BUILD-PLAN.md).
- **Author ≠ independent reviewer.** The officer who writes a change never counts as its independent reviewer.
- Reviewers start from the commit and the acceptance checks, and read the author's evidence only afterwards.
- Cmdr coordinates release; the owner does physical iPhone/Safari acceptance after deployment is verified.

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
- **No deployment without Cmdr's release decision** (and the owner's go). No publishing, no Pages changes.
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
