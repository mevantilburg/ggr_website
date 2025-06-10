const ROUTE_DATA = {
    days: [
        {
            id: 1,
            location: {
                city: "Munich",
                country: "de"
            },
        
            stats: {
                date: "Aug 28",
                distance: 119,
                elevation: 820,
                points: [
                    { name: "Garmisch-Partenkirchen", type: "place" },
                    { name: "Zugspitze", type: "place" }
                ]
            },
            postcard: {
                id: "postcard1",
                image: "img/zugspitze_card_s.jpg",
                large_image: "img/zugspitze_card.jpg",
                support_image: "img/Zugspitze.jpg",
                support_image_source: "",
                name: "Zugspitze",
                type: "location",
                points: {
                        en: [
                        "The highest mountain in Germany (2,962m), on the border with Austria, holds the two last glaciers in Germany.",
                        "In 2022, the Südliche Schneeferner has lost its status as a glacier and is now dead ice. The Nördliche Schneeferner will also be completely melted in a few years."
                        ],
                        nl: [
                        "De hoogste berg in Duitsland (2.962 m), aan de grens met Oostenrijk, herbergt de twee laatste gletsjers in Duitsland.",
                        "In 2022 heeft de Zuidelijke Schneeferner haar status als gletsjer verloren en is nu dode ijs. De Noordelijke Schneeferner zal ook binnen enkele jaren volledig gesmolten zijn."
                        ],
                        de: [
                        "Der höchste Berg in Deutschland (2.962 m), an der Grenze zu Österreich, beherbergt die beiden letzten Gletscher in Deutschland.",
                        "Im Jahr 2022 hat der Südliche Schneeferner seinen Status als Gletscher verloren und ist nun Toteis. Der Nördliche Schneeferner wird in wenigen Jahren ebenfalls vollständig schmelzen."
                        ],
                        fr: [
                        "La plus haute montagne d'Allemagne (2 962 m), à la frontière avec l'Autriche, abrite les deux derniers glaciers d'Allemagne.",
                        "En 2022, le Südliche Schneeferner a perdu son statut de glacier et n'est plus qu'une glace morte. Le Nördliche Schneeferner fondra complètement dans quelques années."
                        ],
                        it: [
                        "La montagna più alta della Germania (2.962 m), al confine con l'Austria, ospita gli ultimi due ghiacciai della Germania.",
                        "Nel 2022, il Südliche Schneeferner ha perso il suo status di ghiacciaio ed è ora ghiaccio morto. Il Nördliche Schneeferner si sarà completamente sciolto anche tra qualche anno."
                        ]
                    }
            },
            accumulatedDistance: 0
        },
        {
            id: 2,
            location: {
                city: "Ehrwald",
                country: "at"
            },
          
            stats: {
                date: "Aug 29",
                distance: 118,
                elevation: 1580,
                points: [
                    { name: "Fernpass", type: "pass" },
                    { name: "Campanile di Curon", type: "place" }
                ]
            },
            postcard: {
                id: "postcard2",
                image: "img/FernpassCard.jpeg",
                large_image: "img/FernpassCard.jpeg",
                support_image: "img/Curon.jpg",
                support_image_source: "",
                name: "Campanile di Curon",
                type: "location",
                points: {
                    en: [
                      "In 1950 the village of Curon was moved due to the construction of a hydropower dam, that joined the lakes of Resia and Curon.",
                      "The 700 year old bell tower is the remainder of the old village of Curon."
                    ],
                    nl: [
                      "In 1950 werd het dorp Curon verplaatst vanwege de bouw van een waterkrachtdam, die de meren Resia en Curon met elkaar verbond.",
                      "De 700 jaar oude klokkentoren is het overblijfsel van het oude dorp Curon."
                    ],
                    de: [
                      "Im Jahr 1950 wurde das Dorf Curon aufgrund des Baus eines Wasserkraftdamms verlegt, der die Seen Resia und Curon miteinander verband.",
                      "Der 700 Jahre alte Glockenturm ist der Überrest des alten Dorfes Curon."
                    ],
                    fr: [
                      "En 1950, le village de Curon a été déplacé en raison de la construction d'un barrage hydroélectrique, qui a relié les lacs de Resia et de Curon.",
                      "Le clocher vieux de 700 ans est le vestige de l'ancien village de Curon."
                    ],
                    it: [
                      "Nel 1950 il villaggio di Curon fu spostato a causa della costruzione di una diga idroelettrica, che ha unito i laghi di Resia e Curon.",
                      "Il campanile di 700 anni è il resto dell'antico villaggio di Curon."
                    ]
                  }
            },
            accumulatedDistance: 119
        },
        {
            id: 3,
            location: {
                city: "Sankt Valentin",
                country: "it"
            },
           
            stats: {
                date: "Aug 30",
                distance: 91,
                elevation: 2980,
                points: [
                    { name: "Passo dello Stelvio", type: "pass" },
                    { name: "Passo di Valle Alpisella", type: "pass" }
                ]
            },
            postcard: {
                id: "postcard3",
                image: "img/StelvioCard.jpg",
                large_image: "img/StelvioCard.jpg",
                support_image: "img/Stelvio.jpg",
                support_image_source: "source: climbfinder.com",
                name: "Passo dello Stelvio",
                type: "col",
                stats: {
                    distance: "24.9",
                    elevation: "1,846",
                    gradient: "7.4",
                    steepest: "10.3"
                },
                points: []
            },
            accumulatedDistance: 237
        },
        {
            id: 4,
            location: {
                city: "Livigno",
                country: "it"
            },
          
            stats: {
                date: "Aug 31",
                distance: 112,
                elevation: 1990,
                points: [
                    { name: "Passo Forcola di Livigno", type: "pass" },
                    { name: "Passo Bernina", type: "pass" },
                    { name: "Morteratsch Glacier", type: "glacier" },
                    { name: "Albulapass", type: "pass" }
                ]
            },
            postcard: {
                id: "postcard4",
                image: "img/MorteratschPostcard.jpg",
                large_image: "img/MorteratschPostcard.jpg",
                support_image: "img/Morteratsch.jpg",
                support_image_source: "",
                name: "Morteratsch Glacier",
                type: "glacier",
                stats: {
                    size: 6,
                    length: 6,
                    surface: 15
                },
                points: {
                    en: [
                      "Since 1900, the Morteratsch Glacier lost 2/3 of its volume.",
                      "It is expected that the 6th biggest glacier will be vanished by 2100"
                    ],
                    nl: [
                      "Sinds 1900 heeft de Morteratsch-gletsjer 2/3 van zijn volume verloren.",
                      "Er wordt verwacht dat de zesde grootste gletsjer tegen 2100 zal zijn verdwenen."
                    ],
                    de: [
                      "Seit 1900 hat der Morteratsch-Gletscher zwei Drittel seines Volumens verloren.",
                      "Es wird erwartet, dass der sechstgrößte Gletscher bis 2100 verschwunden sein wird."
                    ],
                    fr: [
                      "Depuis 1900, le glacier de Morteratsch a perdu les deux tiers de son volume.",
                      "Il est prévu que le sixième plus grand glacier aura disparu d'ici 2100."
                    ],
                    it: [
                      "Dal 1900, il ghiacciaio Morteratsch ha perso due terzi del suo volume.",
                      "Si prevede che il sesto ghiacciaio più grande sarà scomparso entro il 2100."
                    ]
                  }
            },
            accumulatedDistance: 328
        },
        {
            id: 5,
            location: {
                city: "Thusis",
                country: "ch"
            },
          
            stats: {
                date: "Sept 1",
                distance: 101,
                elevation: 2420,
                points: [
                    { name: "Oberalppass", type: "pass" }
                ]
            },
            postcard: {
                id: "postcard5",
                image: "img/OberalppassCard.jpg",
                large_image: "img/OberalppassCard.jpg",
                support_image: "img/Oberalppass.jpg",
                support_image_source: "source: climbfinder.com",
                name: "Oberalppass",
                type: "col",
                stats: {
                    distance: "20.8",
                    elevation: 906,
                    gradient: "4.3",
                    steepest: "9.4"
                },
                points: []
            },
            accumulatedDistance: 440
        },
        {
            id: 6,
            location: {
                city: "Andermatt",
                country: "ch"
            },
          
            stats: {
                date: "Sept 2",
                distance: 110,
                elevation: 2630,
                points: [
                    { name: "Furkapass", type: "pass" },
                    { name: "Rhône Glacier", type: "glacier" },
                    { name: "Hotel Belvedere", type: "place" },
                    { name: "Aletsch Glacier", type: "glacier" }
                ]
            },
            postcard: {
                id: "postcard6",
                image: "img/FurkaCard.jpg",
                large_image: "img/FurkaCard.jpg",
                support_image: "img/RhoneGlacier.jpeg",
                support_image_source: "",
                name: "Rhône Glacier",
                type: "glacier",
                stats: {
                    size: 8,
                    length: 8,
                    surface: 17
                },
                points: {
                    en: [
                      "Primary source of water for the Rhone River.",
                      "One of the most extensively studied glaciers, providing valuable data on climate change and glacial dynamics."
                    ],
                    nl: [
                      "Belangrijkste waterbron voor de Rhône.",
                      "Een van de meest uitgebreid onderzochte gletsjers, die waardevolle gegevens levert over klimaatverandering en de dynamiek van gletsjers."
                    ],
                    de: [
                      "Primäre Wasserquelle für den Rhône.",
                      "Einer der am intensivsten untersuchten Gletscher, der wertvolle Daten über den Klimawandel und Gletscherdynamik liefert."
                    ],
                    fr: [
                      "Source principale d'eau pour le Rhône.",
                      "L'un des glaciers les plus étudiés en profondeur, fournissant des données précieuses sur le changement climatique et la dynamique glaciaire."
                    ],
                    it: [
                      "Fonte principale d'acqua per il fiume Rodano.",
                      "Uno dei ghiacciai più studiati in maniera approfondita, che fornisce dati preziosi sul cambiamento climatico e sulla dinamica dei ghiacciai."
                    ]
                  }
            },
            accumulatedDistance: 541
        },
        {
            id: 7,
           
            location: {
                city: "Mörel-Filet",
                country: "ch"
            },
            stats: {
                date: "Sept 3",
                distance: 51,
                elevation: 1020,
                points: [
                    { name: "Glacier Valley", type: "glacier" }
                ]
            },
            postcard: {
                id: "postcard7",
                image: "img/aletsch_s.png",
                large_image: "img/aletsch.png",
                support_image: "img/1080px-Switzerland,_Bettmeralp_(19505442736).jpg",
                support_image_source: "",
                name: "Aletsch Glacier",
                type: "glacier",
                stats: {
                    size: 1,
                    length: 20,
                    surface: 78
                },
                points: {
                    en: [
                      "The glacier lost 12% of its volume between 2016 and 2021"
                    ],
                    nl: [
                      "De gletsjer verloor tussen 2016 en 2021 12% van zijn volume."
                    ],
                    de: [
                      "Der Gletscher hat zwischen 2016 und 2021 12% seines Volumens verloren."
                    ],
                    fr: [
                      "Le glacier a perdu 12% de son volume entre 2016 et 2021."
                    ],
                    it: [
                      "Il ghiacciaio ha perso il 12% del suo volume tra il 2016 e il 2021."
                    ]
                  }
                  
            },
            accumulatedDistance: 651
        },
        {
            id: 8,
            location: {
                city: "Zermatt",
                country: "ch"
            },
         
            stats: {
                date: "Sept 5",
                distance: 137,
                elevation: 2660,
                points: [
                    { name: "Lac de Moiry", type: "place" },
                    { name: "Moiry Glacier", type: "glacier" }
                ]
            },
            postcard: {
                id: "postcard8",
                image: "img/ZermattCard.jpg",
                large_image: "img/ZermattCard.jpg",
                support_image: "img/Matterhorn.jpg",
                support_image_source: "",
                name: "Zermatt",
                type: "location",
                points: {
                    en: [
                      "Zermatt is a picturesque mountain village in southern Switzerland, nestled at an elevation of 1,620 meters.",
                      "Known for its stunning alpine landscape, the town sits at the foot of the iconic Matterhorn and is surrounded by several peaks over 4,000 meters and multiple Glaciers."
                    ],
                    nl: [
                      "Zermatt is een pittoresk bergdorp in het zuiden van Zwitserland, gelegen op een hoogte van 1.620 meter.",
                      "Bekend om zijn adembenemende alpine landschap, ligt het dorp aan de voet van de iconische Matterhorn en wordt omgeven door meerdere pieken van meer dan 4.000 meter en talrijke gletsjers."
                    ],
                    de: [
                      "Zermatt ist ein malerisches Bergdorf im Süden der Schweiz, eingebettet in eine Höhe von 1.620 Metern.",
                      "Bekannt für seine atemberaubende Alpenlandschaft, liegt das Dorf am Fuße des ikonischen Matterhorns und ist von mehreren Gipfeln über 4.000 Metern und zahlreichen Gletschern umgeben."
                    ],
                    fr: [
                      "Zermatt est un pittoresque village de montagne dans le sud de la Suisse, niché à une altitude de 1 620 mètres.",
                      "Réputée pour son paysage alpin à couper le souffle, la ville se situe au pied de l'emblématique Cervin et est entourée de plusieurs sommets de plus de 4 000 mètres ainsi que de multiples glaciers."
                    ],
                    it: [
                      "Zermatt è un pittoresco borgo di montagna nel sud della Svizzera, situato a un'altitudine di 1.620 metri.",
                      "Conosciuta per il suo splendido paesaggio alpino, il paese si trova ai piedi dell'iconico Cervino ed è circondato da diverse cime superiori ai 4.000 metri e da numerosi ghiacciai."
                    ]
                  }
                  
            },
            accumulatedDistance: 702
        },
        {
            id: 9,
            location: {
                city: "Nax",
                country: "ch"
            },
         
            stats: {
                date: "Sept 6",
                distance: 119,
                elevation: 2880,
                points: [
                    { name: "Col de la Forclaz", type: "pass" },
                    { name: "Trient Glacier", type: "glacier" },
                    { name: "Col des Montets", type: "pass" },
                    { name: "Mer de Glace", type: "glacier" }
                ]
            },
            postcard: {
                id: "postcard9",
                image: "img/TrientCard.jpg",
                large_image: "img/TrientCard.jpg",
                support_image: "img/Trient.jpg",
                support_image_source: "",
                name: "Trient Glacier",
                type: "glacier",
                stats: {
                    size: 14,
                    length: "4.4",
                    surface: "5.5"
                },
                points: []
            },
            accumulatedDistance: 839
        },
        {
            id: 10,
            location: {
                city: "Chamonix",
                country: "fr"
            },
          
            stats: {
                date: "Sept 7",
                distance: 119,
                elevation: 2700,
                points: [
                    { name: "Bossons Glacier", type: "glacier" },
                    { name: "Col des Saisies", type: "pass" },
                    { name: "Cormet de Roselend", type: "place" }
                ]
            },
            postcard: {
                id: "postcard10",
                image: "img/MerDeGlaceCard.jpg",
                large_image: "img/MerDeGlaceCard.jpg",
                support_image: "img/MerdeGlace.jpg",
                support_image_source: "",
                name: "Mer de Glace",
                type: "glacier",
                stats: {
                    size: 3,
                    length: "11.5",
                    surface: 28
                },
                points: {
                    en: [
                      "It's the largest glacier in France and the third of the Alps and up to 200 m thick"
                    ],
                    nl: [
                      "Het is de grootste gletsjer in Frankrijk en de derde van de Alpen en is tot 200 m dik."
                    ],
                    de: [
                      "Es ist der größte Gletscher in Frankreich und der drittgrößte der Alpen und bis zu 200 m dick."
                    ],
                    fr: [
                      "C'est le plus grand glacier de France et le troisième des Alpes, avec une épaisseur pouvant atteindre 200 m."
                    ],
                    it: [
                      "È il più grande ghiacciaio della Francia e il terzo delle Alpi, con uno spessore fino a 200 m."
                    ]
                  }
                  
            },
            accumulatedDistance: 958
        },
        {
            id: 11,
            location: {
                city: "Bourg St. Maurice",
                country: "fr"
            },
           
            stats: {
                date: "Sept 8",
                distance: 127,
                elevation: 2400,
                points: [
                    { name: "Col de l'Iseran", type: "pass" },
                    { name: "La Grande Motte", type: "glacier" }
                ]
            },
            postcard: {
                id: "postcard11",
                image: "img/IseranCard.jpeg",
                large_image: "img/IseranCard.jpeg",
                support_image: "img/Iseran.jpg",
                support_image_source: "source: climbfinder.com",
                name: "Col de l'Iseran",
                type: "col",
                stats: {
                    distance: "47.4",
                    elevation: "2,050",
                    gradient: "4.3",
                    steepest: "8.6"
                },
                points: []
            },
            accumulatedDistance: 1077
        },
        {
            id: 12,
            location: {
                city: "St. Michel de Maurienne",
                country: "fr"
            },
          
            stats: {
                date: "Sept 9",
                distance: 120,
                elevation: 3300,
                points: [
                    { name: "Col du Télégraphe", type: "pass" },
                    { name: "Col du Galibier", type: "pass" },
                    { name: "Glacier Blanc", type: "glacier" },
                    { name: "Col d'Izoard", type: "pass" }
                ]
            },
            postcard: {
                id: "postcard12",
                image: "img/Galibier.jpg",
                large_image: "img/Galibier.jpg",
                support_image: "img/col-du-galibier.png",
                support_image_source: "source: climbfinder.com",
                name: "Col du Galibier",
                type: "col",
                stats: {
                    distance: "34.6",
                    elevation: "2,085",
                    gradient: "6",
                    steepest: "10"
                },
                points: []
            },
            accumulatedDistance: 1204
        },
        {
            id: 13,
            location: {
                city: "Guillestre",
                country: "fr"
            },
        
            stats: {
                date: "Sept 10",
                distance: 106,
                elevation: 2700,
                points: [
                    { name: "Col de Vars", type: "pass" },
                    { name: "Cime de la Bonette", type: "place" }
                ]
            },
            postcard: {
                id: "postcard13",
                image: "img/BonetteCard.jpg",
                large_image: "img/BonetteCard.jpg",
                support_image: "img/CimeBonette.jpg",
                support_image_source: "source: climbfinder.com",
                name: "Cime de la Bonette",
                type: "col",
                stats: {
                    distance: "23.3",
                    elevation: "1,590",
                    gradient: "6.8",
                    steepest: "14.1"
                },
                points: []
            },
            accumulatedDistance: 1324
        },
        {
            id: 14,
            location: {
                city: "Isola",
                country: "fr"
            },
           
            stats: {
                date: "Sept 11",
                distance: 130,
                elevation: 2620,
                points: [
                    { name: "Col Saint-Martin", type: "pass" },
                    { name: "Col de Turini", type: "pass" },
                    { name: "Col de l'Ablé", type: "pass" }
                ]
            },
            postcard: {
                id: "postcard15",
                image: "img/MonacoCasinoCard.jpg",
                large_image: "img/MonacoCasinoCard.jpg",
                support_image: "img/Monaco Casino.jpg",
                support_image_source: "",
                name: "Monaco Casino",
                type: "location",
                points: {
                    en: [
                      "We gamble with our planet, what's your bet?"
                    ],
                    nl: [
                      "We gokken met onze planeet, wat is jouw inzet?"
                    ],
                    de: [
                      "Wir riskieren unseren Planeten, was ist dein Einsatz?"
                    ],
                    fr: [
                      "Nous jouons avec notre planète, quel est ton pari?"
                    ],
                    it: [
                      "Scommettiamo sul nostro pianeta, qual è la tua scommessa?"
                    ]
                  }
            },
            accumulatedDistance: 1430
        },
        {
            id: 15,
            location: {
                city: "Monaco Casino",
                country: "mc"
            },
            accumulatedDistance: 1560
        }
    ]
};

const ROUTE_DATA_old = {
    days: [
        {
            id: 1,
            location: {
                city: "Munich",
                country: "de"
            },
            stats: {
                distance: 119,
                elevation: 820,
                points: [
                    "Garmisch-Partenkirchen",
                    "Zugspitze"
                ]
            },
            postcard: {
                id: "postcard1",
                image: "img/zugspitze_card_s.jpg",
                large_image: "img/zugspitze_card.jpg",
                support_image: "img/Zugspitze.jpg",
                support_image_source: "",
                name: "Zugspitze",
                type: "location",
                points: ["The highest mountain in Germany (2.962m), on the border with Austria, holds the two last glaciers in Germany.", 
                         "In 2022, the Südliche Schneeferner has lost its status as a glacier and is now dead ice. The Nördliche Schneeferner will also be completely melted in a few years."]
            },
            accumulatedDistance: 0
        },
        {
            id: 2,
            location: {
                city: "Ehrwald",
                country: "at"
            },
            stats: {
                distance: 118,
                elevation: 1580,
                points: [
                    "Fernpass",
                    "Campanile di Curon"
                ]
            },
            postcard: {
                id: "postcard2",
                image: "img/FernpassCard.jpeg",
                large_image: "img/FernpassCard.jpeg",
                support_image: "img/Curon.jpg",
                support_image_source: "",
                name: "Campanile di Curon",
                type: "location",
                points: ["In 1950 the village of Curon was moved due to the construction of a hydropower dam, that joined the lakes of Resia and Curon.", 
                         "The 700 year old bell tower is the remainder of the old village of Curon."]
            },
            accumulatedDistance: 119
        },
        {
            id: 3,
            location: {
                city: "Sankt Valentin",
                country: "it"
            },
            stats: {
                distance: 91,
                elevation: 2980,
                points: [
                    "Passo dello Stelvio",
                    "Passo di Valle Alpisella"
                ]
            },
            postcard: {
                id: "postcard3",
                image: "img/StelvioCard.jpg",
                large_image: "img/StelvioCard.jpg",
                support_image: "img/Stelvio.jpg",
                support_image_source: "source: climbfinder.com",
                name: "Passo dello Stelvio",
                type: "col",
                stats: {
                    distance: "24,9",
                    elevation: "1.846",
                    gradient: "7,4",
                    steepest: "10,3"
                },
                points: []
            },
            accumulatedDistance: 237
        },
        {
            id: 4,
            location: {
                city: "Livigno",
                country: "it"
            },
            stats: {
                distance: 190,
                elevation: 1990,
                points: [
                    "Passo Forcola di Livigno",
                    "Passo Bernina",
                    "Morteratsch Glacier",
                    "Albulapass"
                ]
            },
            postcard: {
                id: "postcard4",
                image: "img/MorteratschPostcard.jpg",
                large_image: "img/MorteratschPostcard.jpg",
                support_image: "img/Morteratsch.jpg",
                support_image_source: "",
                name: "Morteratsch Glacier",
                type: "glacier",
                stats: {
                    size: 6,
                    length: 6,
                    surface: 15
                },
                points: ["Since 1900, the Morteratsch Glacier lost 2/3 of its volume.",
                         "It is expected that the 6th biggest glacier will be vanished by 2100"]
            },
            accumulatedDistance: 328
        },
        {
            id: 5,
            location: {
                city: "Thusis",
                country: "ch"
            },
            stats: {
                distance: 100,
                elevation: 1950,
                points: [
                    "Oberalppass"
                ]
            },
            postcard: {
                id: "postcard5",
                image: "img/OberalppassCard.jpg",
                large_image: "img/OberalppassCard.jpg",
                support_image: "img/Oberalppass.jpg",
                support_image_source: "source: climbfinder.com",
                name: "Oberalppass",
                type: "col",
                stats: {
                    distance: "20,8",
                    elevation: 906,
                    gradient: "4,3",
                    steepest: "9,4"
                },
                points: []
            },
            accumulatedDistance: 437
        },
        {
            id: 6,
            location: {
                city: "Andermatt",
                country: "ch"
            },
            stats: {
                distance: 101,
                elevation: 2530,
                points: [
                    "Furkapass",
                    "Rhône Glacier",
                    "Hotel Belvedere",
                    "Aletsch Glacier"
                ]
            },
            postcard: {
                id: "postcard6",
                image: "img/FurkaCard.jpg",
                large_image: "img/FurkaCard.jpg",
                support_image: "img/RhoneGlacier.jpeg",
                support_image_source: "",
                name: "Rhône Glacier",
                type: "glacier",
                stats: {
                    size: 8,
                    length: 8,
                    surface: 17
                },
                points: ["Primary source of water for the Rhone River.",
                         "One of the most extensively studied glaciers, providing valuable data on climate change and glacial dynamics"]
            },
            accumulatedDistance: 537
        },
        {
            id: 7,
            location: {
                city: "Mörel-Filet",
                country: "ch"
            },
            stats: {
                distance: 52,
                elevation: 1020,
                points: [
                    "Glacier Valley"
                ]
            },
            postcard: {
                id: "postcard7",
                image: "img/aletsch_s.png",
                large_image: "img/aletsch.png",
                support_image: "img/1080px-Switzerland,_Bettmeralp_(19505442736).jpg",
                support_image_source: "",
                name: "Aletsch Glacier",
                type: "glacier",
                stats: {
                    size: 1,
                    length: 20,
                    surface: 78
                },
                points: ["The glacier lost 12% of its volume between 2016 and 2021"]
            },
            accumulatedDistance: 638
        },
        {
            id: 8,
            location: {
                city: "Zermatt",
                country: "ch"
            },
            stats: {
                distance: 137,
                elevation: 2660,
                points: [
                    "Lac de Moiry",
                    "Moiry Glacier"
                ]
            },
            postcard: {
                id: "postcard8",
                image: "img/ZermattCard.jpg",
                large_image: "img/ZermattCard.jpg",
                support_image: "img/Matterhorn.jpg",
                support_image_source: "",
                name: "Zermatt",
                type: "location",
                points: ["Zermatt is a picturesque mountain village in southern Switzerland, nestled at an elevation of 1.620 meters.",
                        "Known for its stunning alpine landscape, the town sits at the foot of the iconic Matterhorn and is surrounded by several peaks over 4,000 meters and multiple Glaciers." ]
            },
            accumulatedDistance: 690
        },
        {
            id: 9,
            location: {
                city: "Nax",
                country: "ch"
            },
            stats: {
                distance: 124,
                elevation: 3030,
                points: [
                    "Col de la Forclaz",
                    "Trient Glacier",
                    "Col des Montets",
                    "Mer de Glace"
                ]
            },
            postcard: {
                id: "postcard9",
                image: "img/TrientCard.jpg",
                large_image: "img/TrientCard.jpg",
                support_image: "img/Trient.jpg",
                support_image_source: "",
                name: "Trient Glacier",
                type: "glacier",
                stats: {
                    size: 14,
                    length: "4,4",
                    surface: "5,5"
                },
                points: []
            },
            accumulatedDistance: 862
        },
        {
            id: 10,
            location: {
                city: "Chamonix",
                country: "fr"
            },
            stats: {
                distance: 117,
                elevation: 2690,
                points: [
                    "Col des Saisies",
                    "Cormet de Roselend"
                ]
            },
            postcard: {
                id: "postcard10",
                image: "img/MerDeGlaceCard.jpg",
                large_image: "img/MerDeGlaceCard.jpg",
                support_image: "img/MerdeGlace.jpg",
                support_image_source: "",
                name: "Mer de Glace",
                type: "glacier",
                stats: {
                    size: 3,
                    length: "11,5",
                    surface: 28
                },
                points: ["It's the largest glacier in France and the third of the Alps and up to 200 m thick"]
            },
            accumulatedDistance: 929
        },
        {
            id: 11,
            location: {
                city: "Bourg St. Maurice",
                country: "fr"
            },
            stats: {
                distance: 125,
                elevation: 2945,
                points: [
                    "Col de l'Iseran",
                    "Col de Mont Cenis"
                ]
            },
            postcard: {
                id: "postcard11",
                image: "img/IseranCard.jpeg",
                large_image: "img/IseranCard.jpeg",
                support_image: "img/Iseran.jpg",
                support_image_source: "source: climbfinder.com",
                name: "Col de l'Iseran",
                type: "col",
                stats: {
                    distance: "47,4",
                    elevation: "2.050",
                    gradient: "4,3",
                    steepest: "8,6"
                },
                points: []
            },
            accumulatedDistance: 1046
        },
        {
            id: 12,
            location: {
                city: "St. Michel de Maurienne",
                country: "fr"
            },
            stats: {
                distance: 110,
                elevation: 3350,
                points: [
                    "Col du Télégraphe",
                    "Col du Galibier",
                    "Col d'Izoard"
                ]
            },
            postcard: {
                id: "postcard12",
                image: "img/Galibier.jpg",
                large_image: "img/Galibier.jpg",
                support_image: "img/col-du-galibier.png",
               support_image_source: "source: climbfinder.com",
                name: "Col du Galibier",
                type: "col",
                stats: {
                    distance: "34,6",
                    elevation: "2.085",
                    gradient: "6",
                    steepest: "10"
                },
                points: []
            },
            accumulatedDistance: 1171
        },
        {
            id: 13,
            location: {
                city: "Guillestre",
                country: "fr"
            },
            stats: {
                distance: 105,
                elevation: 2700,
                points: [
                    "Col de Vars",
                    "Cime de la Bonette"
                ]
            },
            postcard: {
                id: "postcard13",
                image: "img/BonetteCard.jpg",
                large_image: "img/BonetteCard.jpg",
                support_image: "img/CimeBonette.jpg",
                support_image_source: "source: climbfinder.com",
                name: "Cime de la Bonette",
                type: "col",
                stats: {
                    distance: "23,3",
                    elevation: "1.590",
                    gradient: "6,8",
                    steepest: "14,1"
                },
                points: []
            },
            accumulatedDistance: 1283
        },
        {
            id: 14,
            location: {
                city: "Isola",
                country: "fr"
            },
            stats: {
                distance: 130,
                elevation: 2620,
                points: [
                    "Col Saint-Martin",
                    "Col de Turini",
                    "Col de l'Ablé"
                ]
            },
            postcard: {
                id: "postcard15",
                image: "img/MonacoCasinoCard.jpg",
                large_image: "img/MonacoCasinoCard.jpg",
                support_image: "img/Monaco Casino.jpg",
                support_image_source: "",
                name: "Monaco Casino",
                type: "location",
                points: ["We gamble with the liveability of our planet, what's your bet?"]
            },
            accumulatedDistance: 1388
        },
        {
            id: 15,
            location: {
                city: "Monaco Casino",
                country: "mc"
            },
           
            accumulatedDistance: 1518
        }
    ]
    };
