const ROUTE_DATA = {
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
                image: "img/placeholder_thumb.png",
                large_image: "img/placeholder.png",
                support_image: "img/Zugspitze.jpg",
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
                image: "img/placeholder_thumb.png",
                large_image: "img/placeholder.png",
                support_image: "img/Curon.jpg",
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
                image: "img/placeholder_thumb.png",
                large_image: "img/placeholder.png",
                support_image: "img/Stelvio.jpg",
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
                    "Albula pass"
                ]
            },
            postcard: {
                id: "postcard4",
                image: "img/placeholder_thumb.png",
                large_image: "img/placeholder.png",
                support_image: "img/Morteratsch.jpg",
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
                image: "img/placeholder_thumb.png",
                large_image: "img/placeholder.png",
                support_image: "img/Oberalppass.jpg",
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
                    "Rhone Glacier",
                    "Hotel Belvedere",
                    "Aletsch Glacier"
                ]
            },
            postcard: {
                id: "postcard6",
                image: "img/placeholder_thumb.png",
                large_image: "img/placeholder.png",
                support_image: "img/placeholder_support.png",
                name: "Rhone Glacier",
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
                image: "img/Aletsch_s.png",
                large_image: "img/aletsch.png",
                support_image: "img/placeholder_support.png",
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
                distance: 172,
                elevation: 340,
                points: [
                    "UCI - Aigle"
                ]
            },
            postcard: {
                id: "postcard8",
                image: "img/placeholder_thumb.png",
                large_image: "img/placeholder.png",
                support_image: "img/placeholder_support.png",
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
                city: "Martigny",
                country: "ch"
            },
            stats: {
                distance: 67,
                elevation: 3400,
                points: [
                    "Col de la Forclaz",
                    "Trient Glacier",
                    "Col des Montets",
                    "Mer de Glace"
                ]
            },
            postcard: {
                id: "postcard9",
                image: "img/placeholder_thumb.png",
                large_image: "img/placeholder.png",
                support_image: "img/placeholder_support.png",
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
                image: "img/placeholder_thumb.png",
                large_image: "img/placeholder.png",
                support_image: "img/placeholder_support.png",
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
                image: "img/placeholder_thumb.png",
                large_image: "img/placeholder.png",
                support_image: "img/Iseran.jpg",
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
                city: "Susa",
                country: "it"
            },
            stats: {
                distance: 112,
                elevation: 3850,
                points: [
                    "Colle delle Finestre",
                    "Col Bousson",
                    "Col d'Izoard"
                ]
            },
            postcard: {
                id: "postcard12",
                image: "img/placeholder_thumb.png",
                large_image: "img/placeholder.png",
                support_image: "img/Finestre.jpg",
                name: "Colle delle Finestre",
                type: "col",
                stats: {
                    distance: "18,8",
                    elevation: "1.702",
                    gradient: "9,1",
                    steepest: "16,5"
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
                image: "img/placeholder_thumb.png",
                large_image: "img/placeholder.png",
                support_image: "img/CimeBonette.jpg",
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
                image: "img/placeholder_thumb.png",
                large_image: "img/placeholder.png",
                support_image: "img/placeholder_support.png",
                name: "Monaco Casino",
                type: "location",
                points: []
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
