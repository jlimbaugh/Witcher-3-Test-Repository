'use strict';
window.PHOENIX_ROUTE = {
  "tasks": {
    "q-lilac": {
      "name": "Lilac and Gooseberries",
      "home": "hub-arrival",
      "view": "quest-q-lilac",
      "type": "quest",
      "intro": "War has scattered the trail. Follow Vesemir toward the first lead on Yennefer.",
      "why": "The main-story starting point; collect village leads before riding to the garrison.",
      "requirements": "Available after the Kaer Morhen tutorial.",
      "reward": "Access to the griffin investigation.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/lilacandgooseberries.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Ride with Vesemir",
          "text": "Defeat the opening ghouls. Before mounting up, use Witcher Senses to recover the sparkling crystal skull near the camp. Follow Vesemir and help the merchant at the ford."
        },
        {
          "id": "2",
          "title": "Ask at the inn",
          "text": "Speak with Elsa and the patrons about Yennefer. Take the scholar’s Gwent lesson if you want to begin collecting cards. Read the village notice board on your way out."
        },
        {
          "id": "3",
          "title": "Follow the garrison lead",
          "text": "Ride to the Nilfgaardian garrison and speak to its commander. His request opens The Beast of White Orchard. Return to the tree for the hunt and its optional branches."
        },
        {
          "id": "4",
          "title": "Leave only when ready",
          "text": "After the griffin contract, return to the inn when you are ready to advance.",
          "warning": "Before speaking to Vesemir after the hunt: finish your intended local errands. Open the departure hub first; this conversation begins the exit sequence."
        }
      ],
      "level": null,
      "map": true,
      "category": "side"
    },
    "q-missing": {
      "name": "Missing in Action",
      "home": "hub-missing",
      "view": "quest-q-missing",
      "type": "quest",
      "intro": "A brother is missing among the battlefield dead. Dune needs someone who can search without becoming another casualty.",
      "why": "Pairs with the eastern battlefield approach and the nearby Cackler Bridge discovery.",
      "requirements": "Speak to Dune in the Ransacked Village; complete before the prologue departure.",
      "reward": "A resolved family search and quest experience.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/missinginaction.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Find Dune",
          "text": "Speak to Dune in the Ransacked Village, then meet him and Hussar by the battlefield."
        },
        {
          "id": "2",
          "title": "Search the shields",
          "text": "Clear the ghouls in the search area. Use Witcher Senses to inspect shields bearing the White Orchard flower. Let Hussar pick up the trail."
        },
        {
          "id": "3",
          "title": "Follow Hussar",
          "text": "Follow the dog to the shelter and inspect what it has found.",
          "spoiler": "Bastien survived with help from the Nilfgaardian Rhosyn. You can urge Dune to shelter both men or take only his brother. Choose before closing the conversation."
        }
      ],
      "level": null,
      "map": true,
      "category": "side"
    },
    "q-pan": {
      "name": "A Frying Pan, Spick and Span",
      "home": "hub-pan",
      "view": "quest-q-pan",
      "type": "quest",
      "intro": "A small household favor hides the traces of a much stranger night.",
      "why": "A short riverbank stop on the road toward the garrison; no planned fight.",
      "requirements": "Speak to the old woman outside the locked riverbank cottage.",
      "reward": "Food and a little experience.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/afryingpanspickandspan.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Hear the request",
          "text": "Speak to the old woman by the locked cottage and agree to recover her pan."
        },
        {
          "id": "2",
          "title": "Search the cottage",
          "text": "Break the door with Aard. Use Witcher Senses to examine the room and recover the pan. Check the containers before leaving."
        },
        {
          "id": "3",
          "title": "Return the pan",
          "text": "Hand the pan back to the woman.",
          "spoiler": "The corpse, burned papers and silver monocle hint at a secret meeting. Examining them adds context; the pan is the task’s objective."
        }
      ],
      "level": null,
      "map": true,
      "category": "side"
    },
    "q-cargo": {
      "name": "Precious Cargo",
      "home": "hub-cargo",
      "view": "quest-q-cargo",
      "type": "quest",
      "intro": "A stranded merchant asks for a small box. The wreck may tell a different story.",
      "why": "Investigate while making the garrison approach rather than riding back solely for this errand.",
      "requirements": "Speak to the roadside merchant near the garrison approach.",
      "reward": "Crowns; the resolution changes what you retain.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/preciouscargo.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Inspect the wreck",
          "text": "Accept the request. Follow the road and tracks with Witcher Senses; inspect the cart, horse and body in the marsh."
        },
        {
          "id": "2",
          "title": "Recover the box",
          "text": "Find the locked strongbox near the wreck. Return to the merchant with the evidence examined."
        },
        {
          "id": "3",
          "title": "Resolve the claim",
          "text": "Save before reporting back. Decide how to answer his account.",
          "warning": "If you challenge his story, be ready to mount Roach immediately for a pursuit.",
          "spoiler": "Handing over the box ends the job. Exposing the lie starts a chase; ride alongside and strike to stop him. Afterwards you can turn him in, release him with the medicine, or release him while keeping it."
        }
      ],
      "level": null,
      "map": true,
      "category": "side"
    },
    "q-death": {
      "name": "On Death’s Bed",
      "home": "hub-death",
      "view": "quest-q-death",
      "type": "quest",
      "intro": "Tomira is caring for a woman the griffin left dying. A witcher’s remedy carries its own uncertainty.",
      "why": "Handle during the herbalist lead; brewing Swallow also prepares your own supplies.",
      "requirements": "Begin the griffin investigation, then ask Tomira about Lena. Finish before departure.",
      "reward": "Crowns, alchemy supplies and a formula.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/ondeathsbed.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Ask Tomira",
          "text": "During the herbalist visit for the griffin hunt, ask about the injured woman and the possibility of using Swallow."
        },
        {
          "id": "2",
          "title": "Brew Swallow",
          "text": "Use the Alchemy menu: 1 dwarven spirit, 5 celandine and 1 drowner brain. Gather any missing ingredients before returning."
        },
        {
          "id": "3",
          "title": "Deliver through Tomira",
          "text": "Talk to Tomira to give the potion; do not try to use it directly on Lena.",
          "warning": "Complete the hand-in before the inn departure sequence.",
          "spoiler": "The quest closes without an immediate recovery. A later encounter in Velen can reveal the consequences; giving the potion is not a promise of a healthy recovery."
        }
      ],
      "level": 2,
      "map": true,
      "category": "side"
    },
    "q-devil": {
      "name": "Contract: Devil by the Well",
      "home": "hub-devil",
      "view": "quest-q-devil",
      "type": "quest",
      "intro": "A village needs its well. Something bound to the abandoned settlement will not let the living use it.",
      "why": "A compact early contract; pair its southern approach with the two southern Places of Power if ready.",
      "requirements": "Read the notice board and speak to Odolan. Prepare for a noonwraith.",
      "reward": "Contract payment and a noonwraith trophy.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/contract-devilbythewell.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Meet the client",
          "text": "Speak to Odolan and settle the fee before investigating the Abandoned Village."
        },
        {
          "id": "2",
          "title": "Identify the haunting",
          "text": "Inspect the burned ground and houses with Witcher Senses. Read the diary and the noonwraith Bestiary entry; examine the body at the well."
        },
        {
          "id": "3",
          "title": "Recover the bracelet",
          "text": "Jump into the well’s water. Retrieve the bracelet from the pool, then climb and swim through the exit passages."
        },
        {
          "id": "4",
          "title": "Prepare before burning",
          "text": "Repair your silver sword. Use Yrden, and Specter Oil if you can brew it.",
          "warning": "Burning the remains and bracelet summons the noonwraith. Prepare and save before interacting."
        },
        {
          "id": "5",
          "title": "Finish the contract",
          "text": "Fight in Yrden; clear its copies, loot the remains and report to Odolan.",
          "spoiler": "You may take the negotiated fee or refuse it for an amethyst. Tomira can provide additional context about the dead couple after her cottage becomes available."
        }
      ],
      "level": 2,
      "map": true,
      "category": "contract"
    },
    "q-beast": {
      "name": "The Beast of White Orchard",
      "home": "hub-hunt",
      "view": "quest-q-beast",
      "type": "quest",
      "intro": "The road to Yennefer runs through a griffin’s hunting ground. Learn what happened before setting the trap.",
      "why": "The main-story backbone for herbalist, hunter, equipment and northern discovery branches.",
      "requirements": "Speak to the Nilfgaardian commander during Lilac and Gooseberries.",
      "reward": "Crossbow, trophy, experience and a choice of payment.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/thebeastofwhiteorchard.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Take the contract",
          "text": "Speak to the commander, then follow the herbalist and hunter objectives."
        },
        {
          "id": "2",
          "title": "Visit Tomira",
          "text": "Ask about buckthorn and gather it underwater in the marked river area. Check On Death’s Bed while you are at the cottage."
        },
        {
          "id": "3",
          "title": "Follow Mislav",
          "text": "Find the hunter using his tracks. Help with the wild dogs, inspect the attacked patrol, then follow the tracks to the nest and examine it."
        },
        {
          "id": "4",
          "title": "Prepare with Vesemir",
          "text": "Report to Vesemir. Prepare Thunderbolt, repair equipment and meet him at the ambush. He gives you the crossbow."
        },
        {
          "id": "5",
          "title": "Fight and report",
          "text": "Dodge the griffin’s attacks and use short openings. Follow it to the Mill when it retreats, finish the fight and loot the trophy. Report to the commander.",
          "spoiler": "Accept the offered money or refuse it for more experience. Neither choice prevents the story from continuing.",
          "warning": "After reporting, the inn conversation with Vesemir advances departure. Review the final hub before taking that step."
        }
      ],
      "level": 3,
      "map": true,
      "category": "side"
    },
    "q-viper": {
      "name": "Scavenger Hunt: Viper School Gear",
      "home": "hub-viper",
      "view": "quest-q-viper",
      "type": "quest",
      "intro": "Two lost sword diagrams trace a witcher’s unfinished journey. Recover them before deciding what you can afford to craft.",
      "why": "The silver diagram shares the cemetery outing; the steel diagram pairs with the eastern ruins.",
      "requirements": "Loot either diagram to begin. Listed quest level 6; individual fights still need a readiness check.",
      "reward": "Viper steel and silver sword diagrams; crafting costs are separate.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/viperschoolgear.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Recover the steel diagram",
          "text": "Clear the deserters at the ruined fort east of White Orchard. Search the chest for the steel sword diagram and read the accompanying report."
        },
        {
          "id": "2",
          "title": "Recover the silver diagram",
          "text": "At the cemetery north of the Mill, deal with the wraith and enter the crypt. Loot the silver sword diagram and Kolgrim’s letter.",
          "warning": "The cemetery wraith is a level-7 encounter in the reference route. The hunt’s +5 allowance does not guarantee an easy fight."
        },
        {
          "id": "3",
          "title": "Check crafting costs",
          "text": "Both diagrams complete the hunt. At an appropriate craftsman, compare the material and crown cost before ordering either sword. Finding a diagram does not give you a crafted weapon."
        }
      ],
      "level": 6,
      "map": true,
      "category": "gear"
    },
    "q-temerian": {
      "name": "Temerian Valuables",
      "home": "hub-temerian",
      "view": "quest-q-temerian",
      "type": "quest",
      "intro": "A river chest points toward hidden military valuables.",
      "why": "Pair with the Mill and cemetery outing; it shares the final stash with Deserter Gold.",
      "requirements": "Recover the key from the corpse by the river bridge, then inspect the underwater chest.",
      "reward": "Treasure and saleable loot; contents can vary.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/temerianvaluables.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Recover key and orders",
          "text": "Search the corpse on the bridge’s west bank for the Temerian Lily Key. Open the river chest and read the blood-soaked orders."
        },
        {
          "id": "2",
          "title": "Search the Mill cellar",
          "text": "Follow the quest marker to the building near the Mill. Clear the boards, use Aard on the cellar entrance and loot the marked containers."
        },
        {
          "id": "3",
          "title": "Check the shared stash",
          "text": "Deserter Gold shares this cellar. Keep the key for its sealed chest."
        }
      ],
      "level": 4,
      "map": true,
      "category": "exploration"
    },
    "q-deserter": {
      "name": "Deserter Gold",
      "home": "hub-deserter",
      "view": "quest-q-deserter",
      "type": "quest",
      "intro": "A spy’s notes point toward plunder hidden at the Mill.",
      "why": "Read the notes during the northern outing, then combine the cellar visit with Temerian Valuables.",
      "requirements": "Read the Spy’s Notes at the northern camp.",
      "reward": "Access to the same Mill stash used by Temerian Valuables.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/temerianvaluables.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Read the Spy’s Notes",
          "text": "Loot and read the notes at the northern spy camp. Track the newly listed objective."
        },
        {
          "id": "2",
          "title": "Check the Mill stash",
          "text": "Follow the marker to the Mill cellar. Use Aard to clear the entrance. The sealed chest requires the Temerian Lily Key from the riverside corpse."
        },
        {
          "id": "3",
          "title": "Avoid a duplicate trip",
          "text": "Check remaining containers and your journal if Temerian Valuables already brought you here."
        }
      ],
      "level": 3,
      "map": true,
      "category": "exploration"
    },
    "q-dirty": {
      "name": "Dirty Funds",
      "home": "hub-dirty",
      "view": "quest-q-dirty",
      "type": "quest",
      "intro": "Someone has been taking the peasants’ last coin. Their notes give you a trail to the camp.",
      "why": "A northern loot detour after the hunter and cemetery outing, if the bandits are manageable.",
      "requirements": "Read the Scrawled Notes in the abandoned camp.",
      "reward": "Bandit-camp treasure and saleable equipment.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/dirtyfunds.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Read the notes",
          "text": "Search the abandoned camp in northern White Orchard. Read the Scrawled Notes to mark the bandits’ camp."
        },
        {
          "id": "2",
          "title": "Approach the camp",
          "text": "Follow the objective east. Fight from the edge so the group cannot surround you; handle the shielded leader with care."
        },
        {
          "id": "3",
          "title": "Claim the funds",
          "text": "Search the chests in the leader’s tent. Loot the equipment you can carry, then sell or dismantle it according to what you need."
        }
      ],
      "level": 2,
      "map": true,
      "category": "exploration"
    },
    "q-firestarter": {
      "name": "Twisted Firestarter",
      "home": "hub-firestarter",
      "view": "walkthrough-firestarter",
      "type": "quest",
      "intro": "The forge is cold. Willis wants the person responsible found.",
      "why": "Resolve while handling village business; the forge is also a natural repair stop.",
      "requirements": "Speak to Willis. Complete before the prologue departure.",
      "reward": "Quest reward; outcome depends on your choice.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/twistedfirestarter.php"
      ],
      "stages": [
        {
          "id": "forge",
          "title": "Begin at the forge",
          "text": "Agree to investigate for Willis. Search behind his workshop with Witcher Senses."
        },
        {
          "id": "trail",
          "title": "Pick up the trail",
          "text": "Follow the prints to the water and look beyond the bridge for the bloodied continuation. Be ready for drowners."
        },
        {
          "id": "suspect",
          "title": "Find the wounded villager",
          "text": "Follow the remaining tracks into the village. Save before the confrontation.",
          "spoiler": "Napp offers a bribe. Accept it to conceal his involvement, or refuse and bring him back. Axii offers another way to secure cooperation. Returning him to Willis leads to the soldiers taking him for execution."
        },
        {
          "id": "return",
          "title": "Return to Willis",
          "text": "Resolve the investigation according to your chosen response. Mark completion in the hub when you are done."
        }
      ],
      "level": null,
      "map": true,
      "category": "side"
    },
    "loc-forge": {
      "name": "Willis’s forge",
      "home": "hub-firestarter",
      "view": "activity-loc-forge",
      "type": "service",
      "intro": "A useful pause beside an unfinished investigation.",
      "why": "Repair while speaking with Willis instead of making a separate service trip.",
      "requirements": "Bring equipment needing repair and check the displayed cost.",
      "reward": "A chance to restore equipment condition; services cost crowns.",
      "sections": [
        [
          "Location",
          "Willis’s workshop in White Orchard village."
        ],
        [
          "Preparation",
          "Bring equipment needing repair and check the displayed cost."
        ],
        [
          "Action",
          "Speak to Willis to inspect available repairs and crafting. His investigation is a separate task in this hub."
        ],
        [
          "Reward",
          "A chance to restore equipment condition; services cost crowns."
        ]
      ],
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/location-whiteorchard.php"
      ],
      "map": true,
      "category": "gear",
      "locationMap": "https://www.gamerguides.com/the-witcher-3-wild-hunt/maps/white-orchard-1"
    },
    "gwent-start": {
      "name": "Play the scholar and check inn cards",
      "home": "hub-arrival",
      "view": "activity-gwent-start",
      "type": "discovery",
      "intro": "A quiet table is the beginning of a much longer collection.",
      "why": "You are already asking about Yennefer at the inn.",
      "requirements": "Bring a small card budget. This is an optional collection stop.",
      "reward": "A card from the scholar and purchased cards for your early deck.",
      "sections": [
        [
          "Location",
          "Aldert Geert at the White Orchard inn; Elsa’s trade inventory."
        ],
        [
          "Preparation",
          "Bring a small card budget. This is an optional collection stop."
        ],
        [
          "Action",
          "Take the Gwent lesson and win against the scholar. Check cards for sale before the departure sequence."
        ],
        [
          "Reward",
          "A card from the scholar and purchased cards for your early deck."
        ]
      ],
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/collectemall.php"
      ],
      "map": true,
      "category": "exploration",
      "locationMap": "https://www.gamerguides.com/the-witcher-3-wild-hunt/maps/white-orchard-1"
    },
    "pop-cemetery": {
      "name": "Cemetery Place of Power",
      "home": "hub-hunt",
      "view": "activity-pop-cemetery",
      "type": "discovery",
      "intro": "A standing stone on the same outing as the silver diagram.",
      "why": "Combine the draw with the crypt visit.",
      "requirements": "A wraith guards the approach; check your silver sword.",
      "reward": "One ability point on first draw; temporary Sign buff.",
      "sections": [
        [
          "Location",
          "Cemetery north of the Mill."
        ],
        [
          "Preparation",
          "A wraith guards the approach; check your silver sword."
        ],
        [
          "Action",
          "Drive off the wraith and hold the draw interaction at the stone."
        ],
        [
          "Reward",
          "One ability point on first draw; temporary Sign buff."
        ]
      ],
      "sources": [
        "https://witcher3.mmorpg-life.com/white-orchard-places-of-power/guides/"
      ],
      "map": true,
      "category": "exploration",
      "locationMap": "https://www.gamerguides.com/the-witcher-3-wild-hunt/maps/white-orchard-1"
    },
    "pop-north": {
      "name": "Northern woods Place of Power",
      "home": "hub-viper",
      "view": "activity-pop-north",
      "type": "discovery",
      "intro": "One more stone beyond the chapel.",
      "why": "Continue north after the cemetery.",
      "requirements": "Ghouls gather near a nest.",
      "reward": "One ability point on first draw.",
      "sections": [
        [
          "Location",
          "Woods north of the cemetery chapel."
        ],
        [
          "Preparation",
          "Ghouls gather near a nest."
        ],
        [
          "Action",
          "Clear nearby threats, then draw from the stone."
        ],
        [
          "Reward",
          "One ability point on first draw."
        ]
      ],
      "sources": [
        "https://witcher3.mmorpg-life.com/white-orchard-places-of-power/guides/"
      ],
      "map": true,
      "category": "exploration",
      "locationMap": "https://www.gamerguides.com/the-witcher-3-wild-hunt/maps/white-orchard-1"
    },
    "pop-cackler": {
      "name": "Cackler Bridge Place of Power",
      "home": "hub-missing",
      "view": "activity-pop-cackler",
      "type": "discovery",
      "intro": "A permanent reward on the battlefield’s northern loop.",
      "why": "Pair with Dune’s battlefield search.",
      "requirements": "Expect ghouls by the nest.",
      "reward": "One ability point on first draw.",
      "sections": [
        [
          "Location",
          "Northeast of Cackler Bridge."
        ],
        [
          "Preparation",
          "Expect ghouls by the nest."
        ],
        [
          "Action",
          "Clear the immediate enemies and draw from the stone."
        ],
        [
          "Reward",
          "One ability point on first draw."
        ]
      ],
      "sources": [
        "https://www.gamerguides.com/the-witcher-3-wild-hunt/guide/white-orchard/activities/place-of-power-locations"
      ],
      "map": true,
      "category": "exploration",
      "locationMap": "https://www.gamerguides.com/the-witcher-3-wild-hunt/maps/white-orchard-1"
    },
    "pop-sawmill": {
      "name": "Sawmill Place of Power",
      "home": "hub-cargo",
      "view": "activity-pop-sawmill",
      "type": "discovery",
      "intro": "A stone between the roads to the garrison.",
      "why": "An optional diversion during the garrison approach.",
      "requirements": "Expect a wraith; return later if the fight is beyond you.",
      "reward": "One ability point on first draw.",
      "sections": [
        [
          "Location",
          "Northeast of the Sawmill, between the garrison roads."
        ],
        [
          "Preparation",
          "Expect a wraith; return later if the fight is beyond you."
        ],
        [
          "Action",
          "Defeat the guardian and draw."
        ],
        [
          "Reward",
          "One ability point on first draw."
        ]
      ],
      "sources": [
        "https://www.gamerguides.com/the-witcher-3-wild-hunt/guide/white-orchard/activities/place-of-power-locations"
      ],
      "map": true,
      "category": "exploration",
      "locationMap": "https://www.gamerguides.com/the-witcher-3-wild-hunt/maps/white-orchard-1"
    },
    "pop-bear": {
      "name": "Southern bear-guarded Place of Power",
      "home": "hub-devil",
      "view": "activity-pop-bear",
      "type": "discovery",
      "intro": "Power waits off the southern road.",
      "why": "A detour on the Abandoned Village outing.",
      "requirements": "A bear guards it; leave space to dodge.",
      "reward": "One ability point on first draw.",
      "sections": [
        [
          "Location",
          "East of the Abandoned Village."
        ],
        [
          "Preparation",
          "A bear guards it; leave space to dodge."
        ],
        [
          "Action",
          "Handle the bear before drawing from the stone."
        ],
        [
          "Reward",
          "One ability point on first draw."
        ]
      ],
      "sources": [
        "https://witcher3.mmorpg-life.com/white-orchard-places-of-power/guides/"
      ],
      "map": true,
      "category": "exploration",
      "locationMap": "https://www.gamerguides.com/the-witcher-3-wild-hunt/maps/white-orchard-1"
    },
    "pop-bridge": {
      "name": "Broken Bridge Place of Power",
      "home": "hub-devil",
      "view": "activity-pop-bridge",
      "type": "discovery",
      "intro": "A quieter stone beyond the broken crossing.",
      "why": "A southern-loop reward.",
      "requirements": "The reference route lists no fixed guardian; check the approach.",
      "reward": "One ability point on first draw.",
      "sections": [
        [
          "Location",
          "Cross Broken Bridge and follow the uphill trail southwest, then south."
        ],
        [
          "Preparation",
          "The reference route lists no fixed guardian; check the approach."
        ],
        [
          "Action",
          "Find the stone just east of the trail and draw."
        ],
        [
          "Reward",
          "One ability point on first draw."
        ]
      ],
      "sources": [
        "https://www.gamerguides.com/the-witcher-3-wild-hunt/guide/white-orchard/activities/place-of-power-locations"
      ],
      "map": true,
      "category": "exploration",
      "locationMap": "https://www.gamerguides.com/the-witcher-3-wild-hunt/maps/white-orchard-1"
    },
    "departure-review": {
      "name": "Review before leaving White Orchard",
      "home": "hub-departure",
      "view": "activity-departure-review",
      "type": "discovery",
      "intro": "Take one last look at unfinished business before the road changes.",
      "why": "A deliberate stopping point after the griffin reward.",
      "requirements": "Review the three departure-sensitive errands: Twisted Firestarter, Missing in Action and On Death’s Bed.",
      "reward": "A final chance to choose your prologue stopping point.",
      "sections": [
        [
          "Location",
          "Before speaking to Vesemir at the inn after the hunt."
        ],
        [
          "Preparation",
          "Review the three departure-sensitive errands: Twisted Firestarter, Missing in Action and On Death’s Bed."
        ],
        [
          "Action",
          "Open their home hubs and finish what you intend to do. Also review the pan, cargo, contract, cards and six stones. This checklist does not automatically complete any task."
        ],
        [
          "Reward",
          "A final chance to choose your prologue stopping point."
        ]
      ],
      "sources": [
        "https://witcher3.th.gl/checklist/missables",
        "https://www.neoseeker.com/the-witcher-3-wild-hunt/White_Orchard_Secondary_Quests"
      ],
      "map": true,
      "category": "preparation"
    },
    "q-incident": {
      "name": "The Incident at White Orchard",
      "home": "hub-departure",
      "view": "quest-q-incident",
      "type": "quest",
      "intro": "The search is about to leave the village behind.",
      "why": "The main-story exit after your final review.",
      "requirements": "Complete the griffin contract and decide which local tasks you want finished.",
      "reward": "Story progression toward Vizima.",
      "sources": [
        "https://www.witcher.tools/quests/the-incident-at-white-orchard"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Review first",
          "text": "Open the departure review before talking to Vesemir.",
          "warning": "The inn conversation starts the departure sequence. Finish Missing in Action, Twisted Firestarter and On Death’s Bed first if you want them completed."
        },
        {
          "id": "2",
          "title": "Speak to Vesemir",
          "text": "When ready, speak to Vesemir inside the inn and follow the scene.",
          "spoiler": "A confrontation turns into a fight. Defeat the attackers and continue through the meeting with Yennefer; the story moves toward Vizima."
        }
      ],
      "level": 2,
      "map": true,
      "category": "side"
    }
  },
  "hubs": [
    {
      "id": "hub-arrival",
      "name": "Lilac and Gooseberries",
      "label": "MAIN STORY / ARRIVAL",
      "group": 0,
      "items": [
        "q-lilac",
        "gwent-start",
        "q-firestarter",
        "q-missing",
        "q-pan",
        "q-cargo"
      ]
    },
    {
      "id": "hub-firestarter",
      "name": "Twisted Firestarter",
      "label": "SECONDARY QUEST",
      "group": 0,
      "side": true,
      "items": [
        "loc-forge",
        "q-firestarter"
      ]
    },
    {
      "id": "hub-missing",
      "name": "Missing in Action",
      "label": "SECONDARY QUEST",
      "group": 0,
      "side": true,
      "items": [
        "q-missing",
        "pop-cackler"
      ]
    },
    {
      "id": "hub-pan",
      "name": "A Frying Pan, Spick and Span",
      "label": "SECONDARY QUEST",
      "group": 0,
      "side": true,
      "items": [
        "q-pan",
        "q-cargo"
      ]
    },
    {
      "id": "hub-cargo",
      "name": "Precious Cargo",
      "label": "SECONDARY QUEST",
      "group": 0,
      "side": true,
      "items": [
        "q-cargo",
        "pop-sawmill"
      ]
    },
    {
      "id": "hub-hunt",
      "name": "The Beast of White Orchard",
      "label": "MAIN STORY / GRIFFIN HUNT",
      "group": 1,
      "items": [
        "q-death",
        "q-devil",
        "q-viper",
        "q-beast",
        "q-dirty",
        "pop-cemetery",
        "q-temerian"
      ]
    },
    {
      "id": "hub-death",
      "name": "On Death’s Bed",
      "label": "SECONDARY QUEST / LEVEL 2",
      "group": 1,
      "side": true,
      "items": [
        "q-death"
      ]
    },
    {
      "id": "hub-devil",
      "name": "Contract: Devil by the Well",
      "label": "CONTRACT / LEVEL 2",
      "group": 1,
      "side": true,
      "items": [
        "q-devil",
        "pop-bear",
        "pop-bridge"
      ]
    },
    {
      "id": "hub-viper",
      "name": "Scavenger Hunt: Viper School Gear",
      "label": "TREASURE HUNT / LEVEL 6",
      "group": 1,
      "side": true,
      "items": [
        "pop-cemetery",
        "q-viper",
        "pop-north"
      ]
    },
    {
      "id": "hub-temerian",
      "name": "Temerian Valuables",
      "label": "TREASURE HUNT / LEVEL 4",
      "group": 1,
      "side": true,
      "items": [
        "q-temerian",
        "q-deserter"
      ]
    },
    {
      "id": "hub-deserter",
      "name": "Deserter Gold",
      "label": "TREASURE HUNT / LEVEL 3",
      "group": 1,
      "side": true,
      "items": [
        "q-deserter",
        "q-temerian"
      ]
    },
    {
      "id": "hub-dirty",
      "name": "Dirty Funds",
      "label": "TREASURE HUNT / LEVEL 2",
      "group": 1,
      "side": true,
      "items": [
        "q-dirty"
      ]
    },
    {
      "id": "hub-departure",
      "name": "The Incident at White Orchard",
      "label": "MAIN STORY / DEPARTURE",
      "group": 2,
      "items": [
        "q-firestarter",
        "q-missing",
        "q-pan",
        "q-cargo",
        "q-death",
        "departure-review",
        "q-incident"
      ]
    }
  ],
  "groups": [
    "Arrival and first leads",
    "Preparing the griffin hunt",
    "Before the road"
  ]
};
