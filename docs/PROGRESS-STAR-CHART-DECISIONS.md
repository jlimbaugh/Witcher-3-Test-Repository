# Whole-game Progress · star chart decision report

Owner review completed November 20, 2026 (America/Chicago). This records the direction for the first prototype. Visual details and map behavior remain subject to owner field review.

## Problem and first review

The current private Progress page presents Velen as a long ledger of 75 tracked entries. The owner wants to scan a small set of region summaries, enter one region, and explore the quests and their linked activities as needed. The celestial hierarchy is region → system, quest → planet, linked activity → moon. Existing quest and activity pages retain their progress records.

The first iPhone review follows Progress → Velen → The Nilfgaardian Connection → the Bloody Baron and Hunting a Witch branches. It includes linked activities and a return trip. Velen gets its own full-screen map. White Orchard and other regions can follow after the Velen behavior passes.

## Decisions from the 21 questions

| # | Topic | Owner direction |
|---|---|---|
| 1 | First screen | Browse collapsed region systems in a horizontal swipe menu. |
| 2 | Expand or enter | Inline expansion was considered. The owner preferred a dedicated page to limit information density and confirmed it in question 4. |
| 3 | Overview | Show completed/total counts by selected category on the system card. |
| 4 | System tap | Tap the centered card to open a dedicated map. Back returns to the same card. |
| 5 | Quest layout | Pan around an orbit map. |
| 6 | Quest order | Follow regional story order. |
| 7 | Route | Connect main quests in sequence and branch side quests where the relationship is established. |
| 8 | Planet tap | Focus the planet, reveal its linked moons, and show a compact summary with a quest hub action. |
| 9 | Moons | Use linked tasks and encounters. Walkthrough objectives stay in the quest. |
| 10 | Map entry | Center on the current or next story neighborhood. |
| 11 | Gestures | Use full-screen map navigation. |
| 12 | Moon tap | Open its activity directly. |
| 13 | Filter scope | One filter selection applies across Progress, including system-card counts and map bodies. |
| 14 | Filter appearance | Excluded celestial bodies should withdraw. How route segments and spacing respond is open for hands-on review. |
| 15 | Status | Use distinct rings and symbols and include the state in accessible names. |
| 16 | Unresolved | Failed or missed entries retain their story locations and can be isolated via the Unresolved filter. |
| 17 | Return state | Restore pan, zoom, selected planet, visible moons, and filters after returning. |
| 18 | Controls | Keep Back, Filters, and Recenter visible. |
| 19 | Art | Dark Witcher star chart with stone, ink, cold silver routes, and restrained glow. |
| 20 | Shared tasks | A moon may appear where relevant around several planets. All appearances use the same activity destination and progress owner. |
| 21 | First review | Review one complete Velen path on iPhone, from the region deck through the Nilf, Baron, and Witch branches and back. |

A source record that cannot be read should retain its stored bytes and surface an unavailable status. Any unverified quest dependency remains unconnected in the prototype. The exact planet scale, orbit spacing, label density, withdrawal motion, and camera behavior will be developed with the owner on the phone, one review at a time.

[Build and acceptance plan](PROGRESS-STAR-CHART-BUILD-PLAN.md)

## Progress splash emblems · approved direction

Jess selected **A · Forged seals** on November 20, 2026. Use raised cold-silver relief on dark stone. White Orchard uses an apple blossom over orchard ridges. Velen uses a bare tree over a broken road. Keep both silhouettes readable when adjacent cards only peek into the iPhone viewport. Render the region name and live progress counts in the interface. The mockup counts are illustrative. This decision covers the splash emblems. The region interior can evolve independently.

## Regional quest tree · selected prototype direction

Jess selected **A · Story spine** for the first regional quest-tree prototype. Use a vertical story path. Stack Bloody Baron and Hunting a Witch under the same Nilf fork with full-width rows. Selecting a quest reveals only its own linked activities immediately below it. Use a larger illustrated plaque for the selected row and compact thumbnails with full titles for other rows. On a fresh region entry, land at the active or next story quest with its fork nearby. Use a compact sticky bottom action with the selected quest title and a single quest hub or card link.

The two-state mockup shows Nilf selected with Funeral Pyres and At the Mercy of Strangers, then Bloody Baron selected with Ciri’s Room. The refined prototype should use reduced illustrative row heights for unselected quests and cold silver for the selected outline. Treat the mockup glow, spacing, and large bottom panel as concept artwork. The new direction revises the original orbit-map treatment for the region interior. Build and field acceptance remain open.
