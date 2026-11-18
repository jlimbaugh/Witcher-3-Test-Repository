'use strict';

(function (root) {
  root.PhoenixVelenQuestCards = {
    baron: {
      briefing: 'Follow Hendrik’s lead to Crow’s Perch and find out what the Baron knows about Ciri.',
      completion: 'Finish the audience with the Baron. The handoff is Ciri’s Story: The King of the Wolves.',
      sources: [
        'https://www.witcher.tools/quests/bloody-baron',
        'https://witcher.fandom.com/wiki/Bloody_Baron_(quest)'
      ],
      stages: [
        {
          title: 'Approach Crow’s Perch',
          place: 'Castle Village',
          warning: 'The inn encounter determines how you enter Crow’s Perch. Follow the route your game presents.',
          actions: [
            'Follow the quest marker to Crow’s Perch.',
            'If the guards admit you, follow the sergeant. If they refuse entry, find the old villager in the settlement or locate the shrine yourself.'
          ],
          note: 'The villager offers directions for 15 crowns. Both approaches lead to the same audience.'
        },
        {
          title: 'Enter the keep',
          place: 'Crow’s Perch',
          actions: [
            'If admitted, continue with the escort to the Baron.',
            'If turned away, find the cave entrance at the water by the shrine. Swim through, follow the cave and climb out through the old well.',
            'On the cave route, be ready for a water hag. Continue to the Baron when you reach the courtyard.'
          ]
        },
        {
          title: 'Speak with the Baron',
          links: [['Ciri’s Room','ciris-room']],
          place: 'Baron’s chambers',
          actions: [
            'Ask the Baron about Ciri and finish the conversation.',
            'When control passes to Ciri, continue in Ciri’s Story: The King of the Wolves.'
          ]
        }
      ]
    },
    witch: {
      briefing: 'Follow the second lead from Hendrik’s notes to Midcopse and find the witch’s cottage.',
      completion: 'Finish the conversation with Keira about Ciri and the masked mage. Continue in Wandering in the Dark.',
      sources: [
        'https://www.witcher.tools/quests/hunting-a-witch',
        'https://www.gamebanshee.com/thewitcher3/walkthrough/huntingawitch.php'
      ],
      stages: [
        {
          title: 'Find a lead in Midcopse',
          place: 'Midcopse',
          actions: [
            'Visit during daylight. Listen to the women by the fire from far enough away that they keep talking, or ask a villager for directions.',
            'If you already know the cottage’s location, ride there directly.'
          ],
          note: 'If you ask the woman’s husband, you can spend 50 crowns or use Axii with rank 1 Delusion. Eavesdropping costs nothing.'
        },
        {
          title: 'Follow the trail to the cottage',
          place: 'North of Midcopse',
          actions: [
            'Follow the marked trail past the pond, the lone boulder and the abandoned cart.',
            'Reach the cottage and let the conversation with the waiting villagers play out.'
          ],
          note: 'Watch for nekkers along the approach.'
        },
        {
          title: 'Search the cottage',
          place: 'Forest Hut',
          actions: [
            'Enter the cottage and use Witcher Senses.',
            'Interact with the skull to open the portal, then step through.'
          ]
        },
        {
          title: 'Talk to Keira',
          links: [['Wandering in the Dark','wandering-in-the-dark']],
          place: 'Beyond the portal',
          actions: [
            'Head up the steps to Keira and ask about Ciri.',
            'Finish the conversation about the masked mage. Travel with Keira now or arrange to meet her at the ruins.'
          ],
          note: 'If you need supplies or repairs, meet her later so you can prepare for Wandering in the Dark.'
        }
      ]
    }
  };
  Object.assign(root.PhoenixVelenQuestCards, {
    princess: {
      name:'A Princess in Distress', kind:'Main quest', level:5, place:'Pellar’s hut near Blackbough',
      briefing:'Find Princess so the Pellar can continue the investigation into Anna and Tamara.',
      start:'Speak to the Pellar about Anna’s talisman during Family Matters.',
      completion:'Bring Princess back and speak with the Pellar to resume Family Matters.',
      sources:['https://www.witcher.tools/quests/a-princess-in-distress'],
      stages:[
        {title:'Find Princess',place:'Woods near the Pellar’s hut',actions:['Take and equip the Pellar’s bell.','Follow the tracks and bleating with Witcher Senses. Clear any wolves on the trail.']},
        {title:'Bring Princess home',place:'Woods and Pellar’s hut',actions:['Ring the bell close to Princess and repeat when she strays.','Protect her from the bear near its cave, then lead her to the Pellar and speak with him.']}
      ]
    },
    'ciris-room': {
      name:'Ciri’s Room', kind:'Side quest', level:5, place:'Crow’s Perch',
      briefing:'Search Ciri’s old room and speak with Gretka about her stay.',
      start:'Look for the quest after hearing the Baron’s first account of Ciri.',
      completion:'Read the book from Ciri’s room and give Gretka her spinning top.',
      sources:['https://www.gamebanshee.com/thewitcher3/walkthrough/cirisroom.php','https://witcher.fandom.com/wiki/Ciri%27s_Room'],
      stages:[
        {title:'Search Ciri’s room',place:'Crow’s Perch, across from the kitchen',warning:'Finish this quest before starting The Isle of Mists.',actions:['Use Witcher Senses to find the spinning top, discarded clothes and the book.','Collect the top and read The Natural Obscurity of Curses from your inventory.']},
        {title:'Speak with Gretka',place:'Kitchen at Crow’s Perch',actions:['Cross the hall and ask Gretka about Ciri.','Return the spinning top to Gretka.']}
      ]
    },
    'wandering-in-the-dark': {
      name:'Wandering in the Dark', kind:'Main quest', place:'Elven ruins',
      briefing:'Explore the elven mage’s ruins with Keira and follow the Wild Hunt.',
      start:'At the end of Hunting a Witch, travel with Keira or meet her at the ruins.',
      completion:'Hear the mage’s final message and clear the illusory exit with the Eye of Nehaleni.',
      sources:['https://www.gamebanshee.com/thewitcher3/walkthrough/wanderinginthedark.php'],
      stages:[
        {title:'Regroup with Keira',place:'Ruins entrance and rat chamber',warning:'Avoid the poison gas and keep open flames away from it.',actions:['Enter the ruins with Keira. If you use her first portal, it separates you from her.','Follow her voice and the quest marker. Destroy the two rat nests with Igni or bombs.']},
        {title:'Trace the mage’s signs',place:'Projection and flooded chambers',actions:['Follow the swallow markings to the next projection.','Find both horse symbols along the submerged route and the climb back to Keira.','Examine the swallow beside the portal, pass through, and defeat the golem.']},
        {title:'Survive the White Frost',place:'Wild Hunt chambers',actions:['Activate the next portal at its swallow symbol.','Stay inside Keira’s shield and deal with the hounds while she closes the rifts.','Fight Nithral. When he shields himself, clear the summoned hounds, then attack again when his shield drops.']},
        {title:'Find the way out',place:'Final projection and ruins exit',actions:['Hear the final projection’s message about Crookback Bog.','Examine the illusory doorway and use the Eye of Nehaleni Keira gives you.','Agree to help with the lamp if you want to continue that side quest before leaving.'],links:[['Magic Lamp','magic-lamp'],['Ladies of the Wood','ladies-of-the-wood']]}
      ]
    },
    'magic-lamp': {
      name:'Magic Lamp', kind:'Side quest', place:'Elven ruins',
      briefing:'Help Keira find the lamp promised to her by the elven mage.',
      start:'Agree to help when Keira asks at the end of Wandering in the Dark.',
      completion:'Follow Keira out of the ruins after she retrieves the lamp.',
      sources:['https://www.gamebanshee.com/thewitcher3/walkthrough/magiclamp.php'],
      stages:[
        {title:'Read the statue riddle',place:'Statue chamber',actions:['Follow Keira to the locked door and examine its inscription.','Use the instruments and dogs to distinguish the four statues.']},
        {title:'Open the door',place:'Statue chamber',actions:['Face the statues and number them from left to right.','Light them in this order: third, second, fourth, first.'],warning:'A wrong lighting order summons a wraith.'},
        {title:'Recover the lamp and leave',place:'Sepulcher and ruins exit',actions:['Follow Keira through the door so she can collect the lamp.','Read the Sage’s Notes nearby if you want the explanation, then leave the ruins with Keira.']}
      ]
    },
    'ladies-of-the-wood': {
      name:'Ladies of the Wood', kind:'Main quest', place:'Crookback Bog',
      briefing:'Follow Ciri’s trail to the orphans and learn what the Crones know.',
      start:'Read the book Keira gives you during Wandering in the Dark.',
      completion:'Resolve the Hillock, return to the ealdorman, and hear the Crones’ account.',
      sources:['https://www.gamebanshee.com/thewitcher3/walkthrough/ladiesofthewood.php'],
      stages:[
        {title:'Follow the Trail of Treats',place:'Crookback Bog shrine',actions:['Use Witcher Senses to follow the treats from the shrine to the orphan village.','Ask about Johnny. Offer the children food or find them in hide-and-seek to distract Gran, then speak with Travik.']},
        {title:'Help Johnny recover his voice',place:'Johnny’s burrow and the raven’s nest',actions:['Clear the bog creatures and follow the footprints to Johnny’s burrow.','Follow Johnny, climb to the nest, and take the sealed bottle and raven feather.','Return the bottle to Johnny and escort him back to Gran.'],note:'Keep the raven feather for the Hillock if you choose that route.'},
        {title:'Hear the Crones’ request',place:'Orphan village and Downwarren',actions:['Follow Gran to the tapestry and hear the Crones’ offer.','Show the dagger to Downwarren’s ealdorman, then investigate the Whispering Hillock.'],links:[['The Whispering Hillock','whispering-hillock']]},
        {title:'Return with the outcome',place:'Downwarren and the orphan village',actions:['Return to Downwarren after resolving the Hillock and speak with the ealdorman.','Take the payment he gives you to the Crones and listen to their account of Ciri.']}
      ]
    },
    'whispering-hillock': {
      name:'The Whispering Hillock', kind:'Quest', place:'The Ancient Oak',
      briefing:'Find what lives beneath the oak and decide how to resolve the spirit’s request.',
      start:'Follow the ealdorman’s lead during Ladies of the Wood. This route assumes you visit the Hillock in that order.',
      completion:'Resolve the spirit’s fate and return to the ealdorman when Ladies of the Wood directs you back.',
      sources:['https://www.gamebanshee.com/thewitcher3/walkthrough/thewhisperinghillock.php'],
      stages:[
        {title:'Reach the spirit',place:'Cave under the Hillock',actions:['Approach the oak and locate the cave entrance. Watch for wolves and the werewolf.','Swim through the cave and speak to the spirit at the heart of the tree.']},
        {title:'Choose how to resolve the spirit',place:'Heart of the tree',warning:'The choice can affect the orphans, Downwarren, Anna and the Baron. Save before committing if you want to revisit your decision.',actions:['To fight, deal with the endrega and strike the heart when the roots open.','To pursue the ritual, gather the raven feather and the woman’s remains. Use Axii on a black mare and ride it to the rear cave entrance.','At the ritual, decide whether to free the spirit, trick it, or attack.'],note:'The release route and consequences depend on when you approach the Hillock. These instructions follow the Downwarren objective.'}
      ]
    }
  });

})(window);
