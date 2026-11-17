# Character production foundation — slice 1

Owner approved the design as the foundation on 2026-11-17. Author: Cmdr.
Branch: `implementation/character-foundation`, based on design commit
`524214359d56859b9bec7d7e0bf8023eed6356e1`. This is an incremental production-code
candidate, not a complete Character feature or a release authorization.

Slice 1 evidence below is historical at `10c19937`. See
`CHARACTER-GEAR-REFERENCE.md` for slice 2. The release-file manifest is cumulative
and refreshed with each Character slice.

## Delivered

- Dedicated `character.html` with game-inspired equipment / profile / item-detail
  organization. It loads independently of quest progress and has its own stylesheet.
- A normal link from the existing White Orchard console's Character shortcut. Only
  `index.html` changes in existing production files, to load the new entry script.
  The existing app, protected files, progress engines and warning code are untouched.
- Per-piece Feline selection across five tiers; preview then apply/cancel; whole-tier
  assignment with individual overrides. No prototype arithmetic is reused.
- Small manual profile, editable draft, explicit Save, Save a copy, Discard and an
  explicitly designated current build with a differences preview. Opening a build
  never designates it. Saving another experiment never replaces the designation.
- Vault export, including in-memory builds when browser saving fails. Export does
  not include unsaved editor changes; the UI says so. Individual export/import is later.
- One gear identity catalogue and one shared detail renderer, accessible by
  `character.html#gear/<item-id>`; return keeps the in-memory editor state. Reference
  content remains intentionally limited while full gear/acquisition data is verified.

## Storage contract

New independent key: `phoenix.character.build-vault.v1`. Only explicit save/designate
writes. Startup, browsing, selection and cancelled previews never write the Vault.
No White Orchard, Velen or warning key is read or written by these modules.

Version 1 contains `activeId` and up to 200 named builds. Each build stores an ID,
name, six equipment identities, optional level/point values and region text. IDs and
case-insensitive names must be unique. Unsupported versions, unknown fields, invalid
gear references, malformed records and empty strings are preserved unchanged. Only
an absent key is absent. Future extensions require a reviewed schema change; do not
strip unknown data to force it into this version.

Denied storage keeps editing and session builds in memory. Write failures retain
old bytes and permit export. Before each write, a changed saved record is detected
and left untouched, with reload/export guidance. This is a best-effort conflict check,
not an atomic multi-tab transaction; simultaneous writers remain a future concern.
No repair, reset, delete or silent migration control is introduced.

## Data scope and evidence

`character-gear.js` has 30 six-slot Feline identities, five tiers per slot. UI labels
are normalized slot descriptions, not a promise of exact in-game item-name spelling.
The Feline crossbow and other sets are outside this first slice, not dropped from
the final scope. Legendary / NG+ variants are not represented yet.

Identity/tier and content-label source inspected 2026-11-17:
https://witcher3.gameslantern.com/gear-sets/cat-school-gear
Its table supports the six slots and five tiers; it labels Grandmaster as Blood and
Wine. The Witcher Wiki search agreed on the tier sequence, but its page could not
be fetched, so it is not the accepted retrieved source for this slice.

Numeric stats, level requirements, crafting fees and effect stacking are **not**
accepted from that table. Catalogue entries keep stats/level null. The UI explicitly
says calculations and requirements are unavailable. No fake buffs, damage or set
bonuses reach production. Game artwork is still pending; the wolf is a labelled
illustration placeholder, not a claim of equipment appearance parity.

## Checks (author-supplied, Cmdr)

- Ten targeted tests pass: absent-record save/reload; damaged/empty/unsupported
  preservation through repeated store initialization; denied getter/read; write
  failure; duplicate-name refusal; detached snapshots; explicit designation;
  external-change refusal; schema validation; catalogue/cache entry checks.
- Full Node suite with v45 and QA5 baselines: **317/317**, zero skipped/failed.
- Syntax checks on all four new JavaScript modules.
- HTML IDs unique; JavaScript literal targets and local asset references resolve.
- Existing protected pins pass as part of the full suite. Application changes are
  limited to adding the entry script and the new Character assets/tests.
- No browser rendering, returning-browser cache journey, physical Safari, touch,
  modal-focus or export-download acceptance is claimed. These are required before
  a release, along with independent review of this Cmdr-authored implementation.

The frozen QA6 CI identity pin remains unchanged and must reject new dist bytes.
This candidate has not passed a new release gate. No workflow changes are included.

## File rollback before any release

To undo this slice on a disposable checkout, restore `dist/index.html` from the
parent `524214359d56859b9bec7d7e0bf8023eed6356e1`, then remove only the new files in
`docs/RELEASE-FILES-CHARACTER-FOUNDATION.sha256`. That list also contains index.html:
restore it, do not delete it. Verify the resulting complete dist tree against the
parent before using it. This is a documented plan, not a verified release rollback
tool. Existing QA6/v45 recovery material is unchanged. Never remove the Vault key.

## Next slices

1. Independent review + browser visual check against the owner's actual game-menu
   reference; representative Feline artwork and a runnable preview.
2. Shared Gear catalogue, requirements and acquisition/crafting links, then additional
   sets and justified non-set exceptions. Verify data per item; add NG+ explicitly.
3. Learned tree, equipped slots, mutagens/mutations and Alchemy; reviewed schema
   evolution and preservation tests before any new persisted fields.
4. Verified calculations with traceable contributors, live conditions, same-condition
   comparisons and target assumptions. Estimates must remain distinguishable.
5. Recommended builds, shared crafting handoff, complete backup/import and source
   links; then integration with the separately reviewed shared walkthrough branch.

No main, Pages, hosting source or deployed version changed. Live remains QA6 v46.
