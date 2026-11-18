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
})(window);
