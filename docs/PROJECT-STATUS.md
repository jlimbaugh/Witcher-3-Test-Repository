# PHOENIX — project status (branch `fix/wo-save-preservation`)

Last updated: 2026-11-16 (America/Chicago) by LT, in the commit that adds QA6. This branch is the D2 investigation
(`investigation/wo-save-preservation` `75768834b768e53b3acd5f912c1c2032a848b8fb`, itself QA5 `5ba73ace…` + probe) plus the
QA6 correction. Author self-review: `docs/QA6-REVIEW.md` (evidence: `author-supplied`).

| Item | State |
|---|---|
| Accepted / live build | **v45** = Sites commit `a9d61c9454c4e6747a9eb0dc6c7ac9bec6b34820`. In this repo: snapshot commit `d1df0e3e2c40cad172577f4725daa7233fc8c41e` (snapshot import, not original history; `docs/PROVENANCE.md`). |
| Previous candidate | **Slice 2 QA5** = `5ba73ace7d05551c877021de6e6fd0a2242a1e3a` (`recovery/v45-qa5`, unchanged). Superseded by QA6 for release purposes; D2 and D4 were open against it. |
| Candidate | **QA6** = Slice 2 QA5 + D2 correction (White Orchard save preservation, `dist/app.js`) + D4 correction (storage-denied start-up, `dist/velen-r18.js:19`, Cmdr-authorized edit of the pinned file) + cache tags `save-guard-qa6-v45`. Head of this branch. **Not deployed, not published, not merged.** Release files: `docs/RELEASE-FILES-QA6.sha256` (13). |
| Deployment | **On hold.** No deployment without Cmdr's release decision. |
| Pyres / Mercy | Incomplete at objective level; separate slice after iPhone verification of this release. |

## Findings
| ID | State | Also fails on baseline? | Evidence |
|---|---|---|---|
| D1 Velen unreadable save overwritten | Fixed since QA3/QA4 (`velen-r18.js` guard); re-confirmed on QA6 | yes | author-supplied (probe) |
| D2 White Orchard unusable/unreadable save overwritten | **Corrected in QA6** — pending Cmdr's independent review | yes | author-supplied (probe 144 runs, unit tests) |
| D3 GitHub Pages serves stale R19 `/velen.html` | Open (not in QA6 scope) | n/a | audit |
| D4 Blank start page when `localStorage` access is denied (QA5 regression) | **Corrected in QA6** — pending Cmdr's independent review | no | author-supplied (probe, returning-browser check) |

## Blockers before release
1. **Independent review of QA6** by Cmdr (D2 and D4 corrections, cache tags, rollback). `docs/QA6-REVIEW.md` is LT's self-review.
   Open decision for Cmdr: QA6 treats an empty-string record as unreadable (preserved); v45 treated it as absent.
2. **Deployment mapping unknown.** The live chatgpt.site build is not deployed from GitHub; who deploys it and from where is not established (`.openai/hosting.json` names Sites project `appgprj_6af75db3b8bc819182017faf96cfe082`, directory `dist`). GitHub Pages still serves the old R19 build from `main` (audit D3).
3. Physical iPhone/Safari acceptance (owner) after deployment verification, including a returning visit (cached v45) and the WO save message.

## Not yet in place
- No GitHub Actions test workflow exists (Cmdr will prepare one). Do not describe automation as active until it exists.
- No repair path ("start fresh / export") for a blocked White Orchard or Velen record; separate later item.
