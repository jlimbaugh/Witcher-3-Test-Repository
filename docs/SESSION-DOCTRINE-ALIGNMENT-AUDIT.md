# Phoenix session-file doctrine alignment audit — 2026-11-23
**Scope:** read-only source review followed by documentation-only reconciliation on draft PR #36. **No app changes, deletion, merges, release or cleanup.**
**Authority:** [Canonical Template Doctrine](CANONICAL-TEMPLATE-DOCTRINE.md), Capt's 21 approved decisions.

## Inspected
- `AGENTS.md`
- `docs/PHOENIX-SESSION-START.md`
- `docs/SESSION-CALIBRATION.md`
- `docs/PROJECT-STATUS.md`
- `docs/PAGE-TEMPLATE-INDEX.md`
- `docs/QUEST-AREA-MAP-OWNER-DECISIONS.md`
- `docs/CANONICAL-TEMPLATE-DOCTRINE.md`

## Reconciled
1. **Competing masters:** replaced residual White Orchard-first instruction in PHOENIX-SESSION-START and clarified PAGE-TEMPLATE-INDEX: Velen is full master after individual and integrated certification; White Orchard supplies approved elements and retains saves/content until controlled migration.
2. **Progress timing:** clarified in PAGE-TEMPLATE-INDEX that whole-game Main Map Progress is future work, while Order 017 White Orchard filtering is a prototype; quest-level tracking remains.
3. **Historical batch ledger:** retained the detailed Velen quest milestones and accepted interactions in SESSION-CALIBRATION, but explicitly labeled old “Next,” “pending,” and review language as historical rather than current assignments.
4. **Authority and safety:** AGENTS explicitly requires doctrine at startup and Capt approval for destructive branch/asset retirement. Preserved independent QA, save guards, Undo, rollback and Safari gates.
5. **Missing linked records:** PHOENIX-SESSION-START formerly listed `docs/ARCHITECTURE.md`, `docs/REGION-CONTRACT.md`, and `docs/DECISIONS.md` as though present. Direct fetch returned 404 for each on the audited branch. Marked these as planned/missing and identified the current doctrine as governing; did not fabricate them.
6. **Earlier representative templates:** November 19 Velen region console and Nilf walkthrough are valuable accepted patterns, but not proof that the whole Velen master has passed final certification.
7. **Map owner decisions:** preserved quest-area geographic constraints, verified positions, stop scopes, marker behavior, Back state, and shared forged-seal art. Their future Progress-following behavior is interpreted under the doctrine's later Main Map milestone.

## Preserved useful decisions
- Six approved two-metal button variations, steel/silver contrast, approved parchment/stone dividers, guide-wide art/rotation rules.
- Card-edge swipe and vertical-scroll behavior, Regional Tools, wolf navigation, quest and walkthrough page patterns.
- Detailed Velen milestone counts, alternate-outcome semantics, completion ownership, and saved progress.
- Geographic map fidelity and source/Xbox verification requirements.
- Accessibility, iPhone Safari, cache upgrade, safe storage, Undo, independent QA and rollback protections.
- Historical release and QA evidence, clearly subordinate to current status.

## Outstanding — not silently resolved
- The wider repository may contain additional contradictory templates, art registries, branch docs and historical links; a full Order 018 audit is still needed.
- No physical Safari or returning V50 browser acceptance has been established for PR #35.
- Missed/Failed/Unavailable semantics need Capt's later review; no automatic mapping.
- CI test-count expectation and PR #35 integration/release status remain unresolved.
- The three missing planned documents require a separate decision before creation.
- Some old prose within clearly labeled historical sections retains its original tense for evidence fidelity.

## Verification limit
Documentation was inspected and edited through the GitHub connector. No application runtime tests or physical device testing were performed as part of this documentation audit. Review PR #36's exact diff and links before any merge.
