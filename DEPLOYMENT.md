# Deployment Provenance — Operation Phoenix

Date: 2026-11-23
Status: Incomplete — awaiting verified Sites deployment metadata

## Published Guide

- **Current Sites URL**: https://phoenix-wo-qa-1c91b66.krwpfbtbn8.chatgpt.site
- **Redirect source**: `main/index.html` (meta refresh + JS)
- **Matching GitHub SHA**: **Unknown / not yet verified**
- **Rollback target**: **Not recorded**

## Source vs. Publication

| Layer | Location | Notes |
|-------|----------|-------|
| GitHub source (working) | `docs/phoenix-art-master-catalog` (`dist/`) | Active art/QA tree. `.openai/hosting.json` points here. |
| GitHub source (legacy) | `main` | Redirect only. Holds older R-series files. |
| Published guide | ChatGPT Sites (separate deployment) | Not automatically equivalent to any GitHub branch or SHA. |

## Rules

- Do not assume a branch or commit is live without explicit deployment evidence.
- Every future Sites publication must record: GitHub SHA, Sites deployment ID/URL, rollback SHA, date, and approver.
- This file will be updated once the actual deployed SHA is confirmed.
