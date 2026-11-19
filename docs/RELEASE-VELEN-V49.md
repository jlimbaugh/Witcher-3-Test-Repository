# Velen regional release · v49

Published November 19, 2026 (America/Chicago) at the owner's direction before independent LT QA.

- Live region: https://phoenix-wo-qa-1c91b66.krwpfbtbn8.chatgpt.site/#velen
- GitHub application candidate: `ba59252cb65800225a68297b6ce7068d3b91ff9b` (draft PR #24).
- Sites source: `02daa30f3799a45cd5b01433e777c1ac39d0b804`.
- Saved version: `appgprj_6af75db3b8bc819182017faf96cfe082~appgver_4aa806498480819185638939ea1e94c1`.
- Deployment: `appgdep_6afe992d558c8191ad23907f78478800` (succeeded).
- Previous release and rollback target: Sites v48, source `2d14fa6e75c4b1d5b1991564fe8fd75edd075177`.
- Release archive SHA-256: `cfb81c4d699673d8933a037c7778d99d4d3e3978c977771bcf2711eda65a3656`.

The application files match the tested GitHub candidate, with the deployment provenance added to BUILD-REVISION.txt. 340 automated tests passed against v45, QA5 and QA6. Author Chromium checks covered number tap, horizontal scroll settlement, walkthrough entry, Search, Warnings, and the Nilf hub/walkthrough progress and Undo flow. After publication, the served build revision, number-strip script, Velen router UI script and forged stylesheet matched the release bytes.

Independent LT QA and physical iPhone Safari acceptance remain open. Use the [pilot review checklist](framing-review/NILF-RUNTIME-QA.md), compare against v48, and distinguish issues present on the baseline. Approval of mockups is design evidence. Runtime forged framing is scoped to the Nilf hub and walkthrough, with the shared Velen number strip and Region Tools applied across their implemented surfaces.
