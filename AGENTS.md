# AGENTS.md — PHOENIX session-start standard

Applies to every PHOENIX officer and agent (LT, Cmdr, PFC, and any helper) at the start of every work session.
Adopted by the owner on 2026-11-16 (operating plan + nine amendments). Summary only; the owner's plan governs.

## 1. Start of session (in this order)
1. **Read `docs/PROJECT-STATUS.md` first.** It names the accepted build, the current candidate, open blockers and
   who owns what. If it disagrees with what you were told, stop and ask; do not guess.
2. **Verify repository access** for what you need (read, and write if you are the author). Record the repository,
   branch and full commit SHA you are working from. If access or an execution environment is missing, say so and stop
   that step; do not route around authentication.
3. Verify inputs by hash before using them (package sha256, `docs/*.sha256` manifests).

## 2. Roles
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

## Owner questions and design coordination

- Cmdr owns the design conversation with the owner. LT and PFC bring technical gaps, options, and tradeoffs to Cmdr; they do not run separate design questionnaires with the owner.
- Cmdr consolidates those inputs into batches of three clear questions using the multiple-choice UI with a free-text option. Explain the visible effect of each choice, ground recommendations in the accepted design, and continue batches until the needed information is available. Do not invent filler questions when no decision is needed.
- Record only explicit selections or unambiguous written decisions as approved. Silence, empty answers, “no notes,” and unanswered questions do not approve a recommended default. If intent is ambiguous, leave the decision open and clarify through the question UI.
- White Orchard is the guiding design foundation for Phoenix. Preserve its accepted feel and incorporate Velen-derived features only with explicit owner approval. Distinguish proposals from locked decisions.
- Keep mockup source, exact revisions, and decisions in GitHub. Present images of the rendered prototype in chat for joint visual review. Ask the next three questions against what the owner can see; do not make the owner hunt through source files.
- Mockups are for design review. Their isolated sample progress and acknowledgment state must not write to production browser storage. Visual acceptance precedes regional conversion and objective-marking field acceptance.

