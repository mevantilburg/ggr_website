const ROUTE_DATA = {
    days: [
        {
            id: 1,
            location: {
                city: "Innsbruck",
                country: "at"
            },
        
            stats: {
                date: "Aug 28",
                distance: 125,
                elevation: 1800,
                points: [
                    { name: "Reschenpass", type: "pass" },
                    { name: "Lago di Rèsia", type: "place" }
                ]
            },
            postcard: {
                id: "postcard1",
                image: "img/cards/0.5x/fernpass@0.5x-50.jpg",
                large_image: "img/cards/3x/fernpass@3x-50.jpg",
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
            accumulatedDistance: 0
        },
        {
            id: 2,
            location: {
                city: "Reschen",
                country: "it"
            },
          
            stats: {
                date: "Aug 29",
                distance: 106,
                elevation: 3100,
                points: [
                    { name: "Madatsch Glacier", type: "glacier" },
                    { name: "Passo di Stelvio", type: "pass" },
                    { name: "Passo Foscagno", type: "pass" },
                    { name: "Passo d’Eira", type: "pass"}
                ]
            },
            postcard: {
                id: "postcard2",
                image: "img/cards/0.5x/stelvio@0.5x-50.jpg",
                large_image: "img/cards/3x/stelvio@3x-50.jpg",
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
            accumulatedDistance: 125
        },
        {
            id: 3,
            location: {
                city: "Livigno",
                country: "it"
            },
           
            stats: {
                date: "Aug 30",
                distance: 110,
                elevation: 2000,
                points: [
                    { name: "Passo Forcola di Livigno", type: "pass" },
                    { name: "Passo Bernina", type: "pass" },
                    { name: "Morteratsch Glacier", type: "glacier" },
                    { name: "Albulapass", type: "pass" }
                ]
            },
            postcard: {
                id: "postcard3",
                image: "img/cards/0.5x/morteratsch@0.5x-50.jpg",
                large_image: "img/cards/3x/morteratsch@3x-50.jpg",
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
            accumulatedDistance: 231
        },
        {
            id: 4,
            location: {
                city: "Thusis",
                country: "ch"
            },
          
            stats: {
                date: "Aug 31",
                distance: 101,
                elevation: 2500,
                points: [
                  { name: "Oberalppass", type: "pass" }
                ]
            },
            postcard: {
                id: "postcard4",
                image: "img/cards/0.5x/oberalppass@0.5x-50.jpg",
                large_image: "img/cards/3x/oberalppass@3x-50.jpg",
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
            accumulatedDistance: 341
        },
        {
            id: 5,
            location: {
                city: "Andermatt",
                country: "ch"
            },
          
            stats: {
                date: "Sept 1",
                distance: 105,
                elevation: 2100,
                points: [
                    { name: "Furkapass", type: "pass" },
                    { name: "Rhône Glacier", type: "glacier" },
                    { name: "Hotel Belvedere", type: "place" }
                ]
            },
            postcard: {
                id: "postcard5",
                image: "img/cards/0.5x/rhone@0.5x-50.jpg",
                large_image: "img/cards/3x/rhone@3x-50.jpg",
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
            accumulatedDistance: 442
        },
        {
            id: 6,
            location: {
                city: "Visp",
                country: "ch"
            },
          
            stats: {
                date: "Sept 2 - restday",
                distance: 95,
                elevation: 2300,
                points: [
                    { name: "Aletsch Glacier", type: "glacier" },
                    { name: "Zermatt", type: "place" }
                ]
            },
            postcard: {
                id: "postcard6",
                image: "img/cards/0.5x/aletsch@0.5x-50.jpg",
                large_image: "img/cards/3x/aletsch@3x-50.jpg",
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
            accumulatedDistance: 547
        },
        {
            id: 7,
           
            location: {
                city: "Visp",
                country: "ch"
            },
            stats: {
                date: "Sept 3",
                distance: 80,
                elevation: 2200,
                points: [
                    { name: "Lac de Moiry", type: "place" },
                    { name: "Moiry Glacier", type: "glacier" }
                ]
            },
            postcard: {
                id: "postcard7",
                image: "img/cards/0.5x/merdeglace@0.5x-50.jpg",
                large_image: "img/cards/3x/merdeglace@3x-50.jpg",
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
            accumulatedDistance: 642
        },
        {
            id: 8,
           
            location: {
                city: "Sierre",
                country: "ch"
            },
            stats: {
                date: "Sept 4",
                distance: 96,
                elevation: 2200,
                points: [
                    { name: "Col de la Forclaz", type: "pass" },
                    { name: "Trient Glacier", type: "glacier" },
                    { name: "Col des Montets", type: "pass" },
                    { name: "Mer de Glace", type: "glacier" }
                ]
            },
            postcard: {
                id: "postcard7",
                image: "img/cards/0.5x/merdeglace@0.5x-50.jpg",
                large_image: "img/cards/3x/merdeglace@3x-50.jpg",
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
            accumulatedDistance: 642
        },
        {
            id: 9,
            location: {
                city: "Chamonix",
                country: "fr"
        },
            accumulatedDistance: 738            
        }
    ]
};
