'use strict';
// CC BY-NC-SA 4.0 coordinate adaptation; see MAP-SOURCES.md.
window.PHOENIX_MAP = {
  "width": 2560,
  "height": 2048,
  "image": "white-orchard-map.webp",
  "markers": [
    {
      "id": "cemetery",
      "name": "Cemetery Place of Power",
      "task": "pop-cemetery",
      "type": "pop",
      "sourceCoordinate": [
        -34.235,
        -94.043
      ],
      "point": [
        1632.9932890192358,
        977.9996444444444
      ]
    },
    {
      "id": "north",
      "name": "Northern woods Place of Power",
      "task": "pop-north",
      "type": "pop",
      "sourceCoordinate": [
        -13.325,
        -97.559
      ],
      "point": [
        1895.0056695597177,
        937.9953777777778
      ]
    },
    {
      "id": "cackler",
      "name": "Cackler Bridge Place of Power",
      "task": "pop-cackler",
      "type": "pop",
      "sourceCoordinate": [
        -43.771,
        0.308
      ],
      "point": [
        1493.0014782204112,
        2051.5043555555553
      ]
    },
    {
      "id": "sawmill",
      "name": "Sawmill Place of Power",
      "task": "pop-sawmill",
      "type": "pop",
      "sourceCoordinate": [
        -51.536,
        -130.386
      ],
      "point": [
        1361.5015657931203,
        564.4970666666667
      ]
    },
    {
      "id": "bear",
      "name": "Southern bear-guarded Place of Power",
      "task": "pop-bear",
      "type": "pop",
      "sourceCoordinate": [
        -79.703,
        -52.822
      ],
      "point": [
        478.9940592662151,
        1447.0030222222222
      ]
    },
    {
      "id": "bridge",
      "name": "Broken Bridge Place of Power",
      "task": "pop-bridge",
      "type": "pop",
      "sourceCoordinate": [
        -81.492,
        -106.699
      ],
      "point": [
        354.0235193635931,
        834.0024888888889
      ]
    },
    {
      "id": "forge",
      "name": "Willis’s forge",
      "task": "loc-forge",
      "type": "service",
      "sourceCoordinate": [
        -69.069,
        -88.945
      ],
      "point": [
        946.9860881624118,
        1036.0035555555555
      ]
    },
    {
      "id": "inn",
      "name": "Scholar at White Orchard inn",
      "task": "gwent-start",
      "type": "gwent",
      "sourceCoordinate": [
        -65.946,
        -81.387
      ],
      "point": [
        1040.0131693995554,
        1121.9968
      ]
    },
    {
      "id": "tomira",
      "name": "Tomira’s cottage · On Death’s Bed",
      "task": "q-death",
      "type": "service",
      "sourceCoordinate": [
        -66.267,
        -132.627
      ],
      "point": [
        1030.9959380860296,
        538.9994666666665
      ]
    },
    {
      "id": "viper-steel",
      "name": "Viper steel sword diagram",
      "task": "q-viper",
      "type": "diagram",
      "sourceCoordinate": [
        -72.5,
        -17
      ],
      "point": [
        828.0651715586446,
        1854.5777777777778
      ]
    },
    {
      "id": "viper-silver",
      "name": "Viper silver sword diagram",
      "task": "q-viper",
      "type": "diagram",
      "sourceCoordinate": [
        -32.953,
        -95.142
      ],
      "point": [
        1650.5049917824808,
        965.4954666666667
      ]
    },
    {
      "id": "notice",
      "name": "White Orchard notice board",
      "task": "q-lilac",
      "type": "notice",
      "sourceCoordinate": [
        -67.643,
        -89.385
      ],
      "point": [
        990.9903178253107,
        1030.9973333333332
      ]
    },
    {
      "id": "abandoned-1",
      "name": "Abandoned shrine · southeast road",
      "task": "abandoned-1",
      "type": "abandoned",
      "sourceCoordinate": [
        -77.786,
        -48.604
      ],
      "point": [
        591.0102451258063,
        1494.994488888889
      ],
      "icon": "abandoned"
    },
    {
      "id": "abandoned-2",
      "name": "Abandoned site · west of Sawmill",
      "task": "abandoned-2",
      "type": "abandoned",
      "sourceCoordinate": [
        -65.293,
        -152.842
      ],
      "point": [
        1058.0127341225425,
        308.9976888888887
      ],
      "icon": "abandoned"
    },
    {
      "id": "armourerstable-1",
      "name": "Armorer’s table · Near Nilfgaardian Garrison",
      "task": "armourerstable-1",
      "type": "buff",
      "sourceCoordinate": [
        -25.362,
        -152.539
      ],
      "point": [
        1749.5237005132599,
        312.4451555555557
      ],
      "icon": "armourerstable"
    },
    {
      "id": "banditcamp-1",
      "name": "Bandit camp · Southwest of Broken Bridge",
      "task": "banditcamp-1",
      "type": "camp",
      "sourceCoordinate": [
        -81.596,
        -122.168
      ],
      "point": [
        345.976563264785,
        657.9996444444444
      ],
      "icon": "banditcamp"
    },
    {
      "id": "banditcamp-2",
      "name": "Bandit camp · South of Ford",
      "task": "banditcamp-2",
      "type": "camp",
      "sourceCoordinate": [
        -73.8,
        -43.418
      ],
      "point": [
        777.0129754490044,
        1553.9996444444444
      ],
      "icon": "banditcamp"
    },
    {
      "id": "banditcamp-3",
      "name": "Bandit camp · Northwest of Sawmill",
      "task": "banditcamp-3",
      "type": "camp",
      "sourceCoordinate": [
        -53.678,
        -157.72
      ],
      "point": [
        1321.3594078661695,
        253.4968888888889
      ],
      "icon": "banditcamp"
    },
    {
      "id": "banditcamp-4",
      "name": "Dirty Funds · bandit camp",
      "task": "q-dirty",
      "type": "camp",
      "sourceCoordinate": [
        -34.307,
        -25.537
      ],
      "point": [
        1632.0019814866137,
        1757.4456888888888
      ],
      "icon": "banditcamp"
    },
    {
      "id": "banditcamp-5",
      "name": "Viper steel diagram · ruined fort camp",
      "task": "q-viper",
      "type": "camp",
      "sourceCoordinate": [
        -72.462,
        -16.699
      ],
      "point": [
        829.501464103148,
        1858.0024888888888
      ],
      "icon": "banditcamp"
    },
    {
      "id": "banditcamp-6",
      "name": "Bandit camp · Southwest of Crossroads",
      "task": "banditcamp-6",
      "type": "camp",
      "sourceCoordinate": [
        -66,
        -19.688
      ],
      "point": [
        1038.5042059849234,
        1823.9943111111113
      ],
      "icon": "banditcamp"
    },
    {
      "id": "blacksmith-1",
      "name": "Garrison blacksmith · Near Nilfgaardian Garrison",
      "task": "blacksmith-1",
      "type": "service",
      "sourceCoordinate": [
        -26.981,
        -151.348
      ],
      "point": [
        1728.9978115438926,
        325.9960888888887
      ],
      "icon": "blacksmith"
    },
    {
      "id": "entrance-1",
      "name": "Devil by the Well · well entrance",
      "task": "q-devil",
      "type": "entrance",
      "sourceCoordinate": [
        -79.592,
        -84.199
      ],
      "point": [
        486.0219922845117,
        1090.0024888888888
      ],
      "icon": "entrance"
    },
    {
      "id": "entrance-2",
      "name": "Devil by the Well · cave exit",
      "task": "q-devil",
      "type": "entrance",
      "sourceCoordinate": [
        -77.897,
        -75.586
      ],
      "point": [
        585.0138473254638,
        1187.999288888889
      ],
      "icon": "entrance"
    },
    {
      "id": "grindstone-2",
      "name": "Grindstone · West of Woesong Bridge",
      "task": "grindstone-village",
      "type": "buff",
      "sourceCoordinate": [
        -68.648,
        -88.206
      ],
      "point": [
        960.2673886376933,
        1044.4117333333334
      ],
      "icon": "grindstone"
    },
    {
      "id": "grindstone-3",
      "name": "Grindstone · West of Sawmill",
      "task": "grindstone-3",
      "type": "buff",
      "sourceCoordinate": [
        -64.624,
        -155.215
      ],
      "point": [
        1075.996739837131,
        281.9982222222222
      ],
      "icon": "grindstone"
    },
    {
      "id": "grindstone-4",
      "name": "Grindstone · Near Nilfgaardian Garrison",
      "task": "grindstone-4",
      "type": "buff",
      "sourceCoordinate": [
        -26.902,
        -149.941
      ],
      "point": [
        1730.006084356019,
        342.00462222222217
      ],
      "icon": "grindstone"
    },
    {
      "id": "guarded-1",
      "name": "Guarded treasure · Southeast of Woesong Bridge",
      "task": "guarded-1",
      "type": "guarded",
      "sourceCoordinate": [
        -74.914,
        -59.766
      ],
      "point": [
        729.9872420401543,
        1367.9957333333334
      ],
      "icon": "guarded"
    },
    {
      "id": "guarded-2",
      "name": "Guarded treasure · Southwest of Nilfgaardian Garrison",
      "task": "guarded-2",
      "type": "guarded",
      "sourceCoordinate": [
        -48.517,
        -167.695
      ],
      "point": [
        1414.9932040639492,
        140.00355555555564
      ],
      "icon": "guarded"
    },
    {
      "id": "guarded-3",
      "name": "Guarded treasure · North of Mill",
      "task": "guarded-3",
      "type": "guarded",
      "sourceCoordinate": [
        -29.645,
        -96.943
      ],
      "point": [
        1694.5637390947663,
        945.0040888888889
      ],
      "icon": "guarded"
    },
    {
      "id": "guarded-4",
      "name": "Guarded treasure · Southeast of Nilfgaardian Garrison",
      "task": "guarded-4",
      "type": "guarded",
      "sourceCoordinate": [
        -27.333,
        -134.077
      ],
      "point": [
        1724.4966077104232,
        522.5016888888889
      ],
      "icon": "guarded"
    },
    {
      "id": "guarded-5",
      "name": "Guarded treasure · South of Ransacked Village",
      "task": "guarded-5",
      "type": "guarded",
      "sourceCoordinate": [
        -74.776,
        0.352
      ],
      "point": [
        735.9931977407614,
        2052.0049777777776
      ],
      "icon": "guarded"
    },
    {
      "id": "herbalist-2",
      "name": "Shrine herbalist · Southwest of Ford",
      "task": "herbalist-2",
      "type": "service",
      "sourceCoordinate": [
        -77.542,
        -49.043
      ],
      "point": [
        604.0050612116802,
        1489.9996444444444
      ],
      "icon": "herbalist"
    },
    {
      "id": "hidden-1",
      "name": "Temerian Valuables · starting cache",
      "task": "q-temerian",
      "type": "hidden",
      "sourceCoordinate": [
        -47.22,
        -111.006
      ],
      "point": [
        1436.992765003567,
        784.9984
      ],
      "icon": "hidden"
    },
    {
      "id": "hidden-2",
      "name": "Dirty Funds · starting cache",
      "task": "q-dirty",
      "type": "hidden",
      "sourceCoordinate": [
        -39.028,
        -56.865
      ],
      "point": [
        1564.9958820682136,
        1401.0026666666665
      ],
      "icon": "hidden"
    },
    {
      "id": "hidden-3",
      "name": "Deserter Gold · starting cache",
      "task": "q-deserter",
      "type": "hidden",
      "sourceCoordinate": [
        -28.613,
        -42.188
      ],
      "point": [
        1708.005954423561,
        1567.9943111111113
      ],
      "icon": "hidden"
    },
    {
      "id": "innkeep-1",
      "name": "Elsa · White Orchard inn",
      "task": "gwent-start",
      "type": "service",
      "sourceCoordinate": [
        -65.731,
        -80.068
      ],
      "point": [
        1045.9896607575083,
        1137.0040888888889
      ],
      "icon": "tavern"
    },
    {
      "id": "monsternest-1",
      "name": "Ghoul nest · north of the cemetery",
      "task": "monsternest-1",
      "type": "nest",
      "sourceCoordinate": [
        -14.264,
        -95.625
      ],
      "point": [
        1884.004497338506,
        960.0
      ],
      "icon": "monsternest"
    },
    {
      "id": "monsternest-2",
      "name": "Ghoul nest · Cackler Bridge",
      "task": "monsternest-2",
      "type": "nest",
      "sourceCoordinate": [
        -45.027,
        -0.308
      ],
      "point": [
        1472.9992023860368,
        2044.4956444444445
      ],
      "icon": "monsternest"
    },
    {
      "id": "monsternest-3",
      "name": "Ghoul nest · east of Crossroads",
      "task": "monsternest-3",
      "type": "nest",
      "sourceCoordinate": [
        -64.206,
        9.712
      ],
      "point": [
        1087.009864066832,
        2158.5009777777777
      ],
      "icon": "monsternest"
    },
    {
      "id": "poi-1",
      "name": "Battlefield search · north of Ransacked Village",
      "task": "poi-1",
      "type": "poi",
      "sourceCoordinate": [
        -49.611,
        7.998
      ],
      "point": [
        1395.9949068142828,
        2138.9994666666666
      ],
      "icon": "poi"
    },
    {
      "id": "poi-4",
      "name": "Yennefer’s crystal skull",
      "task": "poi-4",
      "type": "poi",
      "sourceCoordinate": [
        -60,
        2
      ],
      "point": [
        1189.4769289646433,
        2070.7555555555555
      ],
      "icon": "poi"
    },
    {
      "id": "shopkeeper-1",
      "name": "Bram · cards and riding supplies",
      "task": "shopkeeper-1",
      "type": "service",
      "sourceCoordinate": [
        -66.32,
        -75.674
      ],
      "point": [
        1029.4960749149955,
        1186.9980444444443
      ],
      "icon": "merchant"
    },
    {
      "id": "shopkeeper-2",
      "name": "Sawmill merchant",
      "task": "shopkeeper-2",
      "type": "service",
      "sourceCoordinate": [
        -66.338,
        -155.654
      ],
      "point": [
        1028.985967728756,
        277.0033777777778
      ],
      "icon": "merchant"
    },
    {
      "id": "signpost-1",
      "name": "Abandoned Village signpost",
      "task": "signpost-1",
      "type": "signpost",
      "sourceCoordinate": [
        -78.955,
        -85.869
      ],
      "point": [
        524.9738608172011,
        1071.0016
      ],
      "icon": "fasttravel"
    },
    {
      "id": "signpost-2",
      "name": "Broken Bridge signpost",
      "task": "signpost-2",
      "type": "signpost",
      "sourceCoordinate": [
        -77.916,
        -109.819
      ],
      "point": [
        583.9820098874807,
        798.5038222222222
      ],
      "icon": "fasttravel"
    },
    {
      "id": "signpost-3",
      "name": "Woesong Bridge signpost",
      "task": "signpost-3",
      "type": "signpost",
      "sourceCoordinate": [
        -67.136,
        -72.202
      ],
      "point": [
        1005.9950039025362,
        1226.501688888889
      ],
      "icon": "fasttravel"
    },
    {
      "id": "signpost-4",
      "name": "Sawmill signpost",
      "task": "signpost-4",
      "type": "signpost",
      "sourceCoordinate": [
        -65.44,
        -141.855
      ],
      "point": [
        1054.0000454309525,
        434.00533333333345
      ],
      "icon": "fasttravel"
    },
    {
      "id": "signpost-5",
      "name": "Mill signpost",
      "task": "signpost-5",
      "type": "signpost",
      "sourceCoordinate": [
        -47.339,
        -89.912
      ],
      "point": [
        1434.9970230828244,
        1025.0012444444444
      ],
      "icon": "fasttravel"
    },
    {
      "id": "signpost-6",
      "name": "Nilfgaardian Garrison signpost",
      "task": "signpost-6",
      "type": "signpost",
      "sourceCoordinate": [
        -20.468,
        -153.281
      ],
      "point": [
        1810.0022980135118,
        304.00284444444435
      ],
      "icon": "fasttravel"
    },
    {
      "id": "signpost-7",
      "name": "Cackler Bridge signpost",
      "task": "signpost-7",
      "type": "signpost",
      "sourceCoordinate": [
        -46.073,
        -13.271
      ],
      "point": [
        1456.0037824043593,
        1897.005511111111
      ],
      "icon": "fasttravel"
    },
    {
      "id": "signpost-8",
      "name": "Crossroads signpost",
      "task": "signpost-8",
      "type": "signpost",
      "sourceCoordinate": [
        -63.015,
        -4.482
      ],
      "point": [
        1117.5026503471959,
        1997.0048
      ],
      "icon": "fasttravel"
    },
    {
      "id": "signpost-9",
      "name": "Ford signpost",
      "task": "signpost-9",
      "type": "signpost",
      "sourceCoordinate": [
        -68.106,
        -37.266
      ],
      "point": [
        977.0030975914106,
        1623.9957333333334
      ],
      "icon": "fasttravel"
    },
    {
      "id": "signpost-10",
      "name": "Ransacked Village signpost",
      "task": "signpost-10",
      "type": "signpost",
      "sourceCoordinate": [
        -71.413,
        1.23
      ],
      "point": [
        868.0063122291276,
        2061.9946666666665
      ],
      "icon": "fasttravel"
    },
    {
      "id": "smugglers-1",
      "name": "Smugglers’ cache · South of Ford",
      "task": "smugglers-1",
      "type": "cache",
      "sourceCoordinate": [
        -76.72,
        -31.201
      ],
      "point": [
        646.0110598966894,
        1693.0019555555557
      ],
      "icon": "smugglers"
    },
    {
      "id": "spoils-1",
      "name": "Spoils of war · East of Nilfgaardian Garrison",
      "task": "spoils-1",
      "type": "cache",
      "sourceCoordinate": [
        -12.726,
        -128.452
      ],
      "point": [
        1902.000983266355,
        586.5016888888889
      ],
      "icon": "spoils"
    },
    {
      "id": "quest-start-fry",
      "name": "A Frying Pan, Spick and Span · start",
      "task": "q-pan",
      "type": "quest",
      "sourceCoordinate": [
        -60.37,
        -109.248
      ],
      "point": [
        1181.0098732067177,
        805.0005333333332
      ],
      "icon": "sidequests"
    },
    {
      "id": "quest-start-twist",
      "name": "Twisted Firestarter · start",
      "task": "q-firestarter",
      "type": "quest",
      "sourceCoordinate": [
        -68.768,
        -88.989
      ],
      "point": [
        956.5073848128986,
        1035.5029333333332
      ],
      "icon": "sidequests"
    },
    {
      "id": "quest-start-missing",
      "name": "Missing in Action · start",
      "task": "q-missing",
      "type": "quest",
      "sourceCoordinate": [
        -73.837,
        -5.053
      ],
      "point": [
        775.5023668346375,
        1990.508088888889
      ],
      "icon": "sidequests"
    },
    {
      "id": "quest-start-precious",
      "name": "Precious Cargo · start",
      "task": "q-cargo",
      "type": "quest",
      "sourceCoordinate": [
        -47.219,
        -143.261
      ],
      "point": [
        1437.0095169460992,
        418.0081777777778
      ],
      "icon": "sidequests"
    },
    {
      "id": "devil-contract",
      "name": "Contract: Devil by the Well · notice",
      "task": "q-devil",
      "type": "contract",
      "sourceCoordinate": [
        -67.391,
        -89.385
      ],
      "point": [
        998.4881201377966,
        1030.9973333333332
      ],
      "icon": "tempcontract"
    },
    {
      "id": "crypt-entrance",
      "name": "Viper silver sword · crypt entrance",
      "task": "q-viper",
      "type": "entrance",
      "sourceCoordinate": [
        -33.651,
        -94.526
      ],
      "point": [
        1641.0028470738634,
        972.5041777777778
      ],
      "icon": "entrance"
    },
    {
      "id": "yellowed-diary",
      "name": "Devil by the Well · yellowed diary",
      "task": "q-devil",
      "type": "poi",
      "sourceCoordinate": [
        -79.063,
        -81.694
      ],
      "point": [
        518.5286528730312,
        1118.5038222222222
      ],
      "icon": "poi"
    },
    {
      "id": "cow-pasture-warning",
      "name": "Cow pasture · farming warning",
      "task": "cow-pasture-warning",
      "type": "poi",
      "sourceCoordinate": [
        -67.407,
        -76.729
      ],
      "point": [
        998.0144302213084,
        1174.994488888889
      ],
      "icon": "poi"
    }
  ],
  "labels": [
    {
      "name": "Nilfgaardian Garrison",
      "point": [
        1810.0022980135118,
        304.00284444444435
      ]
    },
    {
      "name": "Mill",
      "point": [
        1434.9970230828244,
        1025.0012444444444
      ]
    },
    {
      "name": "White Orchard",
      "point": [
        1005.9950039025362,
        1226.501688888889
      ]
    },
    {
      "name": "Sawmill",
      "point": [
        1054.0000454309525,
        434.00533333333345
      ]
    },
    {
      "name": "Cackler Bridge",
      "point": [
        1456.0037824043593,
        1897.005511111111
      ]
    },
    {
      "name": "Ransacked Village",
      "point": [
        868.0063122291276,
        2061.9946666666665
      ]
    },
    {
      "name": "Abandoned Village",
      "point": [
        524.9738608172011,
        1071.0016
      ]
    },
    {
      "name": "Broken Bridge",
      "point": [
        583.9820098874807,
        798.5038222222222
      ]
    }
  ]
};
