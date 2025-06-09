import { translator } from './index.js';  // or from wherever the instance is exported

console.log("Current language:", translator.getCurrentLanguage());

const questions = document.querySelectorAll('.faq_question');

questions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.children[1];
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});
function handleClick(event) {

    // Do something when clicking the child div

    event.stopPropagation();

}
function toggleMenu() {
    const menu = document.getElementById("languageDropdown");
    const nav = document.getElementById("navitems");
      menu.style.display = 'none'
    if (nav.style.display == 'flex') {
        nav.style.display = 'none'
    } else {
       
        nav.style.display = 'flex'
    }
}
function toggleLanguageDropdown() {
    const menu = document.getElementById("languageDropdown");
  
    if (menu.style.display == 'flex') {
        menu.style.display = 'none'
    } else {
        menu.style.display = 'flex'
    }
}

function closeMenu() {
    if (window.innerWidth < 800) {
        const nav = document.getElementById("navitems");
        
        nav.style.display = 'none'
    }

}
function showModal() {
    const modal = document.getElementById("modal");
    const wrapper = document.getElementById("modal_wrapper");
    wrapper.style.display = "flex"
    modal.classList.add("animate_modal");
    document.body.style.overflow = "hidden"

}
function closeModal() {
    const modal = document.getElementById("modal");

    const wrapper = document.getElementById("modal_wrapper");
    wrapper.style.display = "none"
    modal.classList.remove("animate_modal");
    document.body.style.overflow = "auto"

}
// todo: start position, end position and refresh on scroll down, long page without having scrolled, catch up



const slider = document.querySelector(".slider input");
const img = document.querySelector(".images .img-2");
const dragLine = document.querySelector(".slider .drag-line");
slider.oninput = ({target: {value}}) => {
    dragLine.style.left = value + "%";
    img.style.width = value + "%";
}




// RouteRenderer class
class RouteRenderer {
static getDayOrdinal(day) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const suffix = day % 10 < 4 && Math.floor(day / 10) !== 1 
        ? suffixes[day % 10] 
        : suffixes[0];
    return `${day}<span class="superscript">${suffix}</span>`;
}

static renderPointOfInterest(point) {
    return `
        <div class="day_label day_label_flex">
            <img class="icon" src="img/route_${point.type}.svg" />
            <span class="poi_text">${point.name}</span>
        </div>
    `;
}

static renderDayStats(day, position) {
    const stats = day.stats;
    if (!stats) return '';
    
    // For left column (position 'right'), use route_data_left
    // For right column (position 'left'), use route_data_right
    const className = position === 'right' ? 'route_data_left' : 'route_data_right';
    
    return `
        <div class="${className}">
            <div class="day_label">
                <img class="icon" src="img/day.svg" />
                ${this.getDayOrdinal(day.id)}
                <span data-i18n="cyclist.day" class="normalscript">day,  ${stats.date}</span>
            </div>
            <div class="day_label">
                <img class="icon" src="img/dist.svg" />
                ${stats.distance} <span>km</span>
            </div>
            <div class="day_label">
                <img class="icon" src="img/alt.svg" />
                ${stats.elevation} <span>m</span>
            </div>
            ${stats.points.map(point => this.renderPointOfInterest(point)).join('')}
        </div>
    `;
}

static renderPostcard(postcard, position,dayId) {
    if (!postcard) return '';
    
    // Determine wrap position based on the column position
    const wrapPosition = position === 'right' ? 'left' : 'right';
    
    return `
        <div class="pc_wrap_${wrapPosition}" onclick="openPostcardModal('${postcard.id}')">
            <div class="pc_back"></div>
            <img id="pc${dayId}" class="pc_image" src="${postcard.image}" />
            <div class="pc_front"></div>
        </div>
    `;
}

static renderRouteSection(day, position = 'left') {
    const isLast = day.id === ROUTE_DATA.days[ROUTE_DATA.days.length - 1].id;
    const totalItemsIsEven = ROUTE_DATA.days.length % 2 === 0;
    const sectionClass = isLast ? 'route_section_last' : 'route_section';
    
    // Special handling for the last item
    if (isLast) {
        // For even number of items: name on right, distance on left
        // For odd number of items: name on left, distance on right
        const shouldShowName = (totalItemsIsEven && position === 'left') || 
                             (!totalItemsIsEven && position === 'right');
        
        if (shouldShowName) {
            const flag = `<img class="flag" src="img/${day.location.country}.svg" />`;
            const alignClass = position === 'left' ? 'waypoint_left_align' : 'waypoint_right_align';
            const nameContent = position === 'left' ? `${day.location.city}${flag}` : `${flag}${day.location.city}`;
            return `
                <div class="${sectionClass}">
                    <div class="wp${day.id} ${alignClass}">
                        ${nameContent}
                    </div>
                </div>
            `;
        } else {
            const distClass = position === 'left' ? 'dist_right' : 'dist_left';
            return `
                <div class="${sectionClass}">
                    <div class="wp${day.id} ${distClass}">
                        ${day.accumulatedDistance} km
                    </div>
                </div>
            `;
        }
    }
    
    let content = '';
    
    // For stats sections
    if (day.stats) {
        const textAlignment = position === 'right' ? 'text_left' : 'text_right';
        content = `
            ${this.renderWaypoint(day, position)}
            <div class="wp${day.id} day_section_${textAlignment} animate_in">
                ${this.renderDayStats(day, position)}
            </div>
        `;
    }
    // For postcard sections
    else if (day.postcard) {
        const alignClass = position === 'left' ? 'left_align' : 'right_align';
        const distClass = position === 'left' ? 'dist_right' : 'dist_left';
        
        content = `
            <div class="wp${day.id} ${distClass}">${day.accumulatedDistance} km</div>
            <div class="wp${day.id} day_section ${alignClass}">
                ${this.renderPostcard(day.postcard, position, day.id)}
            </div>
        `;
    }

    return `<div class="${sectionClass}">${content}</div>`;
}

static renderWaypoint(day, position) {
    if (!day.location || !day.stats) return '';

    const alignClass = position === 'right' ? 'waypoint_right_align' : 'waypoint_left_align';
    const flag = `<img class="flag" src="img/${day.location.country}.svg" />`;
    
    return `
        <div class="wp${day.id} ${alignClass}">
            ${position === 'right' ? `${flag}${day.location.city}` : `${day.location.city}${flag}`}
        </div>
    `;
}
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
const leftContent = document.getElementById('left_route_content');
const rightContent = document.getElementById('right_route_content');

// Helper function to create alternating content
function createDayContent(day, isLeft) {
    const isLast = day.id === ROUTE_DATA.days[ROUTE_DATA.days.length - 1].id;
    
    // Handle the last day specially
    if (isLast) {
        return {
            id: day.id,
            location: day.location,
            accumulatedDistance: day.accumulatedDistance
        };
    }

    // For left side content
    if (isLeft) {
        if (day.id % 2 === 1) {
            // Odd numbered days show stats and location on left
            return {
                id: day.id,
                location: day.location,
                stats: day.stats,
                accumulatedDistance: day.accumulatedDistance
            };
        } else {
            // Even numbered days show only postcard on left
            return {
                id: day.id,
                postcard: day.postcard,
                accumulatedDistance: day.accumulatedDistance
            };
        }
    } 
    // For right side content
    else {
        if (day.id % 2 === 1) {
            // Odd numbered days show only postcard on right
            return {
                id: day.id,
                postcard: day.postcard,
                accumulatedDistance: day.accumulatedDistance
            };
        } else {
            // Even numbered days show stats and location on right
            return {
                id: day.id,
                location: day.location,
                stats: day.stats,
                accumulatedDistance: day.accumulatedDistance
            };
        }
    }
}

// Create content for both sides
const leftDays = ROUTE_DATA.days.map(day => createDayContent(day, true));
const rightDays = ROUTE_DATA.days.map(day => createDayContent(day, false));

// Render the content
leftContent.innerHTML = leftDays.map(day => 
    RouteRenderer.renderRouteSection(day, 'right')).join('');
rightContent.innerHTML = rightDays.map(day => 
    RouteRenderer.renderRouteSection(day, 'left')).join('');

const html = document.documentElement;
const canvas = document.getElementById("cyclist2");
const context = canvas.getContext("2d");
const frameCount = 144;
const offset = 100;
const a = 5;
const totalDays = ROUTE_DATA.days.length;
const routeHeight = totalDays * 360 - 150; // Dynamic height based on number of days
const lastCircleY = 25 + ((totalDays - 1) * 360); // Y position of the last circle
canvas.height = routeHeight;
var imageArray = []
var index = 0
const preloadImages = () => {
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `img/animation/anim${i.toString()}.png`;

        imageArray.push(img)
    }
};
context.beginPath();
context.strokeStyle = "black";
context.lineWidth = 2;
context.moveTo(75, 0);
context.setLineDash([35, 10]);
context.lineTo(75, 75);
context.stroke();
context.beginPath();
context.arc(75, 75, 15, 0, 2 * Math.PI, false);
context.fillStyle = 'white';
context.fill();
context.lineWidth = 2;
context.setLineDash([]);
context.strokeStyle = 'black';
context.stroke();
const img3 = new Image();
img3.src = `img/animation/straight.png`
if (img3.complete) {
    context.drawImage(img3, -50, -50);
} else {
    img3.onload = function () {
        context.drawImage(img3, -50, -50);
    };
}

context.drawImage(img3, 100, 200);
window.addEventListener('scroll', () => {
    const scrollTop = html.scrollTop;
    const canvasPos = canvas.getBoundingClientRect().top;
    const startScroll = window.innerHeight / 2;

    const updateImage = () => {
        if (canvasPos <= startScroll) {
            var f = 2;
            var w = 1440;
            var h = 100 / 2;
            function calcSineY(x) {
                return h - h * Math.sin(x * 2 * Math.PI * (f / w));
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            index = Math.floor((startScroll - canvasPos) / a) % (frameCount - 1);
            let posY = (Math.sin(((index) / (frameCount - 1) * 360) * Math.PI / 180) * 50) - 50;
            let posX = (startScroll - canvasPos) - 50;

            // Draw initial line and circle
            context.beginPath();
            context.strokeStyle = "black";
            context.lineWidth = 2;
            context.moveTo(75, 0);
            context.setLineDash([35, 10]);
            context.lineTo(75, 75);
            context.stroke();

            // Draw wavy dashed line
            context.beginPath();
            context.moveTo(75, 75);
            context.setLineDash([35, 10]);
            context.strokeStyle = "black";
            for (var i = 0; i < Math.floor((startScroll - canvasPos)); i++) {
                if (i < lastCircleY) { // Stop at last circle
                    var y = calcSineY(i);
                    context.lineTo(150 - 25 - y, i + 75);
                }
            }
            context.stroke();

            // Draw circles and animate waypoints
            for (var p = 0; p < (Math.floor((startScroll - canvasPos) / 360) + 1); p++) {
                if (p >= totalDays) break; // Don't draw beyond last day
                
                // const pc = document.getElementById("pc" + (Math.floor((startScroll - canvasPos) / 360) + 1));
                // pc.classList.add('animate_postcard');
                // Animate current waypoint
                const elements = Array.from(document.getElementsByClassName("wp" + (p + 1)));
                elements.forEach(element => {
                    element.classList.remove("animate_out");
                    element.classList.add("animate_in");
                });

                // Hide future waypoints
                for (var r = p + 1; r < totalDays; r++) {
                    const elements = Array.from(document.getElementsByClassName("wp" + (r + 1)));
                    elements.forEach(element => {
                        element.classList.remove("animate_in");
                        element.classList.add("animate_out");
                    });
                }

                // Draw circles and connecting lines
                var dir = p % 2 === 0 ? 25 : 125;
                context.beginPath();
                context.moveTo(75, 75 + p * 360);
                context.setLineDash([]);
                context.lineTo(dir, 75 + p * 360);
                context.stroke();
                context.beginPath();
                context.arc(75, 75 + p * 360, 15, 0, 2 * Math.PI, false);
                context.fillStyle = 'white';
                context.fill();
                context.lineWidth = 2;
                context.setLineDash([]);
                context.strokeStyle = 'black';
                context.stroke();
            }

            // Draw cyclist
            if ((startScroll - canvasPos) <= lastCircleY) {
                context.drawImage(imageArray[index], posY, posX);
            } else {
                context.drawImage(img3, -50, lastCircleY - 50); // Stop at last circle
            }
        } else {
            if (canvasPos > startScroll) {
                const elements = Array.from(document.getElementsByClassName("wp1"))
                elements.forEach(element => {
                    element.classList.remove("animate_in");
                    element.classList.add("animate_out");
                });
                context.clearRect(0, 0, canvas.width, canvas.height);

                context.beginPath();
                context.strokeStyle = "black";
                context.lineWidth = 2;
                context.moveTo(75, 0);
                context.setLineDash([35, 10]);
                context.lineTo(75, 75);
                context.stroke();
                context.beginPath();
                context.arc(75, 75, 15, 0, 2 * Math.PI, false);
                context.fillStyle = 'white';
                context.fill();
                context.lineWidth = 2;
                context.setLineDash([]);
                context.strokeStyle = 'black';
                context.stroke();
                context.drawImage(img3, -50, -50);
            }
        }
    }
    requestAnimationFrame(() => updateImage())
});
preloadImages()
});


var initZoom = 7
if (window.innerWidth < 800) {
    initZoom = 6
}
const map = L.map('map', {
    minZoom: (initZoom),
    maxZoom: 9, scrollWheelZoom: false
}).setView([45.495, 9.734], initZoom);
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '<a href="http://www.osm.org">OpenStreetMap</a>'
}).addTo(map);
var control = L.control.layers(null, null).addTo(map);
// var marker = L.marker([46.529, 10.851], {
//     title: "glacier"
// }).addTo(map).on('click', function (e) { window.location.href = "#monaco"; })

const imageUrl = './img/oldmap_modified_small.jpg';
const errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
const altText = '';
const latLngBounds = L.latLngBounds([[48.026926, 5.140054], [42.867, 14.429]]);
const latLngBoundsZoom = L.latLngBounds([[48.426926, 4.650054], [42.459366, 14.914517]]);
map.setMaxBounds(latLngBoundsZoom);
const imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 1,
    errorOverlayUrl,
    alt: altText,
    interactive: true,

}).addTo(map);

control.addOverlay(imageOverlay, "Historic Map")

const url = './data/Ride_vklein.gpx';
const options = {
    markers: {
        startIcon: './img/marker2.svg',
        endIcon: './img/marker2.svg',
       

    },
    marker_options: {
            startIconUrl: './img/marker2.svg',
            endIconUrl: './img/marker2.svg',				
            iconSize: [18, 22],
            iconAnchor: [9, 22],
            
        },

    async: true,
    polyline_options: { color: 'black', dashArray: "15,5" },
};

const gpx = new L.GPX(url, options).on('loaded', (e) => {
    control.addOverlay(gpx, "Goodbye Glacier Ride");
}).addTo(map);

// Create layer groups for different waypoint types
const passMarkers = L.layerGroup();
const glacierMarkers = L.layerGroup();
const dotMarkers = L.layerGroup();

// Load waypoints from XML file
fetch('./data/waypoints.xml')
.then(response => response.text())
.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
.then(data => {
    const waypoints = data.getElementsByTagName('wpt');
    
    Array.from(waypoints).forEach(wpt => {
        const lat = parseFloat(wpt.getAttribute('lat'));
        const lon = parseFloat(wpt.getAttribute('lon'));
        const name = wpt.getElementsByTagName('name')[0].textContent;
        const type = wpt.getElementsByTagName('type')[0].textContent;
        

        // Check for an image element and prepare the popup content
        const imgTag = wpt.getElementsByTagName('img')[0];
        let popupContent = name;
        if (imgTag) {
            const imgUrl = imgTag.textContent.trim(); // Adjust if your XML stores the URL in an attribute
            popupContent = `<img src="./img/${imgUrl}" alt="Image for ${name}" style="width:175px; height:auto;"><br>` + name;
        }

        const icon = L.icon({
            iconUrl: getIconUrl(type),
            iconSize: [18, 22],     // Match SVG viewBox dimensions
            iconAnchor: [9, 22],   // Center horizontally (25/2) and place at bottom
            popupAnchor: [0, -22]   // Place popup above the marker
        });
        
        const marker = L.marker([lat, lon], { 
            icon: icon,
            title: name 
        }).bindPopup(popupContent, {
            className: 'custom-popup',  // Add a custom CSS class
            closeButton: false,         // Hide the close button
            autoClose: true,           // Close when another popup is opened
            closeOnClick: true         // Close when clicking elsewhere on the map
        });
        
        // Add marker to appropriate layer group
        switch(type) {
            case 'pass':
                passMarkers.addLayer(marker);
                break;
            case 'glacier':
                glacierMarkers.addLayer(marker);
                break;
            default:
                dotMarkers.addLayer(marker);
        }
    });
    
    // Add layer groups to map and control
    passMarkers.addTo(map);
    glacierMarkers.addTo(map);
    dotMarkers.addTo(map);
    
    control.addOverlay(passMarkers, "Mountain Passes");
    control.addOverlay(glacierMarkers, "Glaciers");
    control.addOverlay(dotMarkers, "Other Points");
});

function getIconUrl(type) {
switch(type) {
    case 'pass':
        return './img/marker_pass.svg';
    case 'glacier':
        return './img/marker_glacier.svg';
    default:
        return './img/marker2.svg';
}
}

let currentPostcardIndex = 0;

function navigateModal(direction) {
    const postcards = ROUTE_DATA.days
        .filter(day => day.postcard)
        .map(day => day.postcard);
    
    if (direction === 'next' && currentPostcardIndex < postcards.length - 1) {
        currentPostcardIndex++;
        openPostcardModal(postcards[currentPostcardIndex].id);
    } else if (direction === 'prev' && currentPostcardIndex > 0) {
        currentPostcardIndex--;
        openPostcardModal(postcards[currentPostcardIndex].id);
    }
    
    updateArrowVisibility();
}

function updateArrowVisibility() {
    const postcards = ROUTE_DATA.days
        .filter(day => day.postcard)
        .map(day => day.postcard);
    
    const prevArrow = document.getElementById('modal_prev');
    const nextArrow = document.getElementById('modal_next');
    
    // Show/hide previous arrow
    prevArrow.style.display = currentPostcardIndex === 0 ? 'none' : 'flex';
    
    // Show/hide next arrow
    nextArrow.style.display = currentPostcardIndex === postcards.length - 1 ? 'none' : 'flex';
}

function openPostcardModal(postcardId) {
    // Find the index of the postcard
   
    const postcards = ROUTE_DATA.days
        .filter(day => day.postcard)
        .map(day => day.postcard);
    currentPostcardIndex = postcards.findIndex(p => p.id === postcardId);
    
    // Helper function for ordinal numbers
    function getOrdinal(n, lang) {
        switch (lang) {
          case "en": {
            // English: 1st, 2nd, 3rd, etc.
            const suffixes = ["th", "st", "nd", "rd"];
            const suffix = n % 10 < 4 && Math.floor(n / 10) !== 1
              ? suffixes[n % 10]
              : suffixes[0];
            return `${n}<span class="superscript">${suffix}</span>`;
          }
          case "nl": {
            // Dutch: simply append an "e" (e.g., 1e, 2e, 14e)
            return `${n}e`;
          }
          case "de": {
            // German: use a period after the number (e.g., 1., 2., 14.)
            return `${n}.`;
          }
          case "fr": {
            // French: for 1, use "1er" (masculine by default); otherwise, add "e" (e.g., 2e, 14e)
            if (n === 1) {
              return `${n}<span class="superscript">er</span>`;
            } else {
              return `${n}<span class="superscript">e</span>`;
            }
          }
          case "it": {
            // Italian: typically, ordinals are shown with the degree symbol (e.g., 1°, 2°, 14°)
            return `${n}<span class="superscript">°</span>`;
          }
          default: {
            // Fallback to English rules if language is unknown
            const suffixes = ["th", "st", "nd", "rd"];
            const suffix = n % 10 < 4 && Math.floor(n / 10) !== 1
              ? suffixes[n % 10]
              : suffixes[0];
            return `${n}<span class="superscript">${suffix}</span>`;
          }
        }
      }
      
    
    // Set images
    document.getElementById('modal_main_image').src = postcards[currentPostcardIndex].large_image;
    document.getElementById('modal_support_image').src = postcards[currentPostcardIndex].support_image;
    document.getElementById('modal_support_image_source').textContent = postcards[currentPostcardIndex].support_image_source;
    // Clear and populate data container
    const dataContainer = document.getElementById('modal_data_container');
    dataContainer.innerHTML = '';
    
    // Add name for all types
    dataContainer.innerHTML += `
        <div class="modal_label">
            ${postcards[currentPostcardIndex].name}
        </div>
    `;
    
    // Add type-specific stats
    const translations = {
        biggest: {
          en: " biggest",
          nl: " grootste",
          de: " größte",
          fr: " plus grand",
          it: " più grande"
        },
        length: {
          en: " km length",
          nl: " km lengte",
          de: " km Länge",
          fr: " km de longueur",
          it: " km di lunghezza"
        },
        surface: {
          en: " km<sup>2</sup> surface",
          nl: " km<sup>2</sup> oppervlakte",
          de: " km<sup>2</sup> Fläche",
          fr: " km<sup>2</sup> de surface",
          it: " km<sup>2</sup> di superficie"
        },
        distance: {
          en: " km distance",
          nl: " km afstand",
          de: " km Entfernung",
          fr: " km de distance",
          it: " km di distanza"
        },
        altimeters: {
          en: " altimeters",
          nl: " hoogtemeters",
          de: " Höhenmesser",
          fr: " altimètres",
          it: " altimetri"
        },
        gradient: {
          en: "% average gradient",
          nl: "% gemiddelde helling",
          de: "% durchschnittliche Steigung",
          fr: "% pente moyenne",
          it: "% pendenza media"
        },
        steepest: {
          en: "% steepest 100m",
          nl: "% steilste 100m",
          de: "% steilste 100m",
          fr: "% plus raide sur 100m",
          it: "% più ripida per 100m"
        }
      };
      
      const currentLang = translator.getCurrentLanguage();

      if (postcards[currentPostcardIndex].type === 'glacier') {
        const { size, length, surface } = postcards[currentPostcardIndex].stats;
        dataContainer.innerHTML += `
          <div class="modal_label">
            <img class="icon" src="img/size.svg">
            ${getOrdinal(size, currentLang)}<span class="normalscript">${translations.biggest[currentLang]}</span>
          </div>
          <div class="modal_label">
            <img class="icon" src="img/length.svg">
            ${length}<span>${translations.length[currentLang]}</span>
          </div>
          <div class="modal_label">
            <img class="icon" src="img/surface.svg">
            ${surface}<span>${translations.surface[currentLang]}</span>
          </div>
        `;
      } else if (postcards[currentPostcardIndex].type === 'col') {
        const { distance, elevation, gradient, steepest } = postcards[currentPostcardIndex].stats;
        dataContainer.innerHTML += `
            <div class="modal_label">
                <img class="icon" src="img/dist.svg">
                ${distance}<span>${translations.distance[currentLang]}</span>
            </div>
            <div class="modal_label">
                <img class="icon" src="img/alt.svg">
                ${elevation}<span>${translations.altimeters[currentLang]}</span>
            </div>
            <div class="modal_label">
                <img class="icon" src="img/gradient.svg">
                ${gradient}<span>${translations.gradient[currentLang]}</span>
            </div>
            <div class="modal_label">
                <img class="icon" src="img/steepest.svg">
                ${steepest}<span>${translations.steepest[currentLang]}</span>
            </div>
        `;
    }
    
    
    // Add points if any exist
    // const currentLang = translator.getCurrentLanguage();
    console.log("Current language:", currentLang);

    if (
    postcards[currentPostcardIndex].points &&
    postcards[currentPostcardIndex].points[currentLang] &&
    postcards[currentPostcardIndex].points[currentLang].length > 0
    ) {
    postcards[currentPostcardIndex].points[currentLang].forEach(point => {
        dataContainer.innerHTML += `
        <div class="modal_label">
            <span>${point}</span>
        </div>
        `;
    });
    }
    
    // Show modal
    const modal = document.getElementById("modal");
    const wrapper = document.getElementById("modal_wrapper");
    wrapper.style.display = "flex";
    modal.classList.add("animate_modal");
    document.body.style.overflow = "hidden";
    
    // Update arrow visibility at the end
    updateArrowVisibility();
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('modal_wrapper').style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            navigateModal('prev');
        } else if (e.key === 'ArrowRight') {
            navigateModal('next');
        } else if (e.key === 'Escape') {
            closeModal();
        }
    }
});

window.toggleLanguageDropdown = toggleLanguageDropdown;
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.handleClick = handleClick;
window.closeModal = closeModal;
window.showModal = showModal;
window.navigateModal = navigateModal;
window.openPostcardModal = openPostcardModal;
window.getIconUrl = getIconUrl;
