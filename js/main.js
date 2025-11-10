import { translator, refreshPostcardHoverEffects } from './index.js';  // or from wherever the instance is exported

const assetUrl = (relativePath) => new URL(relativePath, import.meta.url).href;

async function loadRouteData(dataPath) {
    try {
        console.log(`[Route] Fetching route data from ${dataPath}`);
        const response = await fetch(dataPath);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const text = await response.text();
        const factory = new Function(`${text}; return ROUTE_DATA;`);
        const data = factory();
        const dayCount = Array.isArray(data?.days) ? data.days.length : 0;
        console.log(`[Route] Loaded ${dayCount} days from ${dataPath}`);
        return data;
    } catch (error) {
        console.error(`[Route] Failed to load route data from ${dataPath}`, error);
        return { days: [] };
    }
}

async function buildRouteVariants() {
    const configs = {
        'ride-yourself': {
            key: 'ride-yourself',
            gpx: assetUrl('../data/Ride_vklein.gpx'),
            waypoints: assetUrl('../data/waypoints.xml'),
            dataPath: assetUrl('../data/route-data.js'),
            mapLayerLabel: 'Ride Yourself'
        },
        'velo-tours': {
            key: 'velo-tours',
            gpx: assetUrl('../data/Ride_velo.gpx'),
            waypoints: assetUrl('../data/waypoints_velo.xml'),
            dataPath: assetUrl('../data/route-data-velo.js'),
            mapLayerLabel: 'Velo Tours'
        },
        'borne-cycling': {
            key: 'borne-cycling',
            gpx: assetUrl('../data/Ride_borne.gpx'),
            waypoints: assetUrl('../data/waypoints_borne.xml'),
            dataPath: assetUrl('../data/route-data-borne.js'),
            mapLayerLabel: 'Borne Cycling'
        }
    };

    const entries = await Promise.all(Object.entries(configs).map(async ([key, config]) => {
        const data = await loadRouteData(config.dataPath);
        return [key, { ...config, data }];
    }));

    const variants = Object.fromEntries(entries);
    console.log('[Route] Route variants ready', variants);
    return variants;
}

const ROUTE_VARIANTS = await buildRouteVariants();

console.log("Current language:", translator.getCurrentLanguage());

let activeRouteKey = 'ride-yourself';
let activeRouteData = ROUTE_VARIANTS[activeRouteKey].data;
window.ROUTE_DATA = activeRouteData;
let map;
let layerControl;
let imageOverlay;
let currentGpxLayer;
let currentWaypointLayers = [];
let waypointFetchController = null;
let currentPostcardIndex = 0;

const ICON_URLS = {
    place: '/img/marker_place.svg',
    pass: '/img/marker_pass.svg',
    glacier: '/img/marker_glacier.svg',
    default: '/img/marker2.svg'
};

const IMAGE_BASE_URL = '/img/';

const GPX_BASE_OPTIONS = {
    marker_options: {
        iconSize: [18, 22],
        iconAnchor: [9, 22],
        startIconUrl: ICON_URLS.place,
        endIconUrl: ICON_URLS.place,
    },
    markers: {
        startIcon: ICON_URLS.place,
        endIcon: ICON_URLS.place
    },
    async: true,
    polyline_options: { color: 'black', dashArray: '15,5' },
};

const animationAssets = {
    frameCount: 144,
    images: [],
    straight: null,
    scrollHandler: null,
    reflowTimeout: null,
    hasScrolled: false,
    staticHidden: false
};

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
if (slider && img && dragLine) {
    slider.oninput = ({ target: { value } }) => {
        dragLine.style.left = value + "%";
        img.style.width = value + "%";
    };
} else {
    console.warn('[Route] Slider elements missing, skipping before/after control setup');
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
        const postcard = day.postcard || activeRouteData.days.find(d => d.id === day.id)?.postcard;
        const onclickAttr = postcard ? `onclick="openPostcardModal('${postcard.id}')"` : '';
        const dataAttr = postcard ? `data-postcard-day="${day.id}"` : '';

        return `
         <div class="${className}" ${onclickAttr} ${dataAttr} style="${postcard ? 'cursor: pointer;' : ''}">
            <div class="day_label">
                <img class="icon" src="img/day.svg" />
                ${this.getDayOrdinal(day.id)}
                <span data-i18n="cyclist.day" class="normalscript">day, </span><span> ${stats.date}</span>
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

    static renderPostcard(postcard, position, dayId) {
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
        const isLast = day.id === activeRouteData.days[activeRouteData.days.length - 1].id;
        const totalItemsIsEven = activeRouteData.days.length % 2 === 0;
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
            <div class="wp${day.id} day_section_${textAlignment} ">
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

function renderRouteColumns() {
    const leftContent = document.getElementById('left_route_content');
    const rightContent = document.getElementById('right_route_content');
    if (!leftContent || !rightContent) return;
    const dayCount = activeRouteData?.days?.length || 0;
    console.log(`[Route] Rendering columns for ${activeRouteKey} with ${dayCount} days`);
    if (!dayCount) {
        const fallback = '<p class="route-error">Route data unavailable. Please try another tab or refresh.</p>';
        leftContent.innerHTML = fallback;
        rightContent.innerHTML = '';
        return;
    }

    const createDayContent = (day, isLeft) => {
        const lastDayId = activeRouteData.days[activeRouteData.days.length - 1].id;
        const isLast = day.id === lastDayId;

        if (isLast) {
            return {
                id: day.id,
                location: day.location,
                accumulatedDistance: day.accumulatedDistance
            };
        }

        if (isLeft) {
            if (day.id % 2 === 1) {
                return {
                    id: day.id,
                    location: day.location,
                    stats: day.stats,
                    accumulatedDistance: day.accumulatedDistance
                };
            }
            return {
                id: day.id,
                postcard: day.postcard,
                accumulatedDistance: day.accumulatedDistance
            };
        }

        if (day.id % 2 === 1) {
            return {
                id: day.id,
                postcard: day.postcard,
                accumulatedDistance: day.accumulatedDistance
            };
        }

        return {
            id: day.id,
            location: day.location,
            stats: day.stats,
            accumulatedDistance: day.accumulatedDistance
        };
    };

    const leftDays = activeRouteData.days.map(day => createDayContent(day, true));
    const rightDays = activeRouteData.days.map(day => createDayContent(day, false));

    leftContent.innerHTML = leftDays.map(day =>
        RouteRenderer.renderRouteSection(day, 'right')).join('');
    rightContent.innerHTML = rightDays.map(day =>
        RouteRenderer.renderRouteSection(day, 'left')).join('');

    refreshPostcardHoverEffects();
    resetWaypointAnimations();
}

function resetWaypointAnimations() {
    if (!activeRouteData?.days) return;
    activeRouteData.days.forEach(day => {
        const elements = document.getElementsByClassName(`wp${day.id}`);
        Array.from(elements).forEach(element => {
            element.classList.remove('animate_in');
            element.classList.add('animate_out');
        });
    });
}

function ensureAnimationAssets() {
    if (!animationAssets.images.length) {
        for (let i = 1; i <= animationAssets.frameCount; i++) {
            const img = new Image();
            img.src = `img/animation/anim${i.toString()}.png`;
            animationAssets.images.push(img);
        }
    }

    if (!animationAssets.straight) {
        const straightImg = new Image();
        straightImg.src = 'img/animation/straight.png';
        animationAssets.straight = straightImg;
    }
}

function drawStraightImage(context, x, y) {
    if (!animationAssets.straight) return;
    if (animationAssets.straight.complete) {
        context.drawImage(animationAssets.straight, x, y);
    } else {
        animationAssets.straight.onload = function () {
            context.drawImage(animationAssets.straight, x, y);
        };
    }
}

function setupCyclistAnimation() {
    ensureAnimationAssets();
    const html = document.documentElement;
    const canvas = document.getElementById('cyclist2');
    if (!canvas) return;
    const context = canvas.getContext('2d');
    const totalDays = activeRouteData.days.length;
    const routeHeight = totalDays * 360 - 150;
    const lastCircleY = 25 + ((totalDays - 1) * 360);
    const speedFactor = 5;
    canvas.height = routeHeight;
    animationAssets.hasScrolled = false;
    animationAssets.staticHidden = false;

    const drawInitialTimeline = (showStaticCyclist = true) => {
        context.beginPath();
        context.strokeStyle = 'black';
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
        if (showStaticCyclist) {
            drawStraightImage(context, -50, -50);
        }
    };

    const updateImage = (canvasPos, startScroll) => {
        if (canvasPos <= startScroll) {
            animationAssets.hasScrolled = true;
            if (!animationAssets.staticHidden) {
                animationAssets.staticHidden = true;
            }
            const frequency = 2;
            const width = 1440;
            const amplitude = 50;
            const calcSineY = (x) => amplitude - amplitude * Math.sin(x * 2 * Math.PI * (frequency / width));
            context.clearRect(0, 0, canvas.width, canvas.height);
            const index = Math.floor((startScroll - canvasPos) / speedFactor) % (animationAssets.frameCount - 1);
            const posY = (Math.sin(((index) / (animationAssets.frameCount - 1) * 360) * Math.PI / 180) * amplitude) - amplitude;
            const posX = (startScroll - canvasPos) - amplitude;

            // Draw initial line and circle
            drawInitialTimeline(false);

            // Draw wavy dashed line
            context.beginPath();
            context.moveTo(75, 75);
            context.setLineDash([35, 10]);
            context.strokeStyle = 'black';
            for (let i = 0; i < Math.floor((startScroll - canvasPos)); i++) {
                if (i < lastCircleY) {
                    const y = calcSineY(i);
                    context.lineTo(150 - 25 - y, i + 75);
                }
            }
            context.stroke();

            for (let p = 0; p < (Math.floor((startScroll - canvasPos) / 360) + 1); p++) {
                if (p >= totalDays) break;

                const elements = Array.from(document.getElementsByClassName('wp' + (p + 1)));
                elements.forEach(element => {
                    element.classList.remove('animate_out');
                    element.classList.add('animate_in');
                });

                const postcardImage = document.getElementById(`pc${p + 1}`);
                if (postcardImage) {
                    postcardImage.classList.add('animate_postcard');
                    postcardImage.classList.remove('hover_animate');
                    window.lastActivePostcard = p + 1;
                }

                for (let r = 0; r < totalDays; r++) {
                    if (r > p) {
                        const futureElements = Array.from(document.getElementsByClassName('wp' + (r + 1)));
                        futureElements.forEach(element => {
                            element.classList.remove('animate_in');
                            element.classList.add('animate_out');
                        });

                        const futurePostcard = document.getElementById(`pc${r + 1}`);
                        if (futurePostcard) {
                            futurePostcard.classList.remove('animate_postcard');
                            futurePostcard.classList.remove('hover_animate');
                        }
                    } else if (r < p - 1) {
                        const oldPostcard = document.getElementById(`pc${r + 1}`);
                        if (oldPostcard) {
                            oldPostcard.classList.remove('animate_postcard');
                            oldPostcard.classList.remove('hover_animate');
                        }
                    }
                }

                const dir = p % 2 === 0 ? 25 : 125;
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

            if ((startScroll - canvasPos) <= lastCircleY) {
                context.drawImage(animationAssets.images[index], posY, posX);
            } else {
                drawStraightImage(context, -50, lastCircleY - 50);
            }
        } else {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawInitialTimeline(!animationAssets.staticHidden);
            const targetElements = Array.from(document.getElementsByClassName('wp1'));
            if (!animationAssets.hasScrolled) {
                targetElements.forEach(element => {
                    element.classList.remove('animate_in');
                    element.classList.add('animate_out');
                });
            } else {
                targetElements.forEach(element => {
                    element.classList.remove('animate_in');
                    element.classList.add('animate_out');
                });
            }
            drawStraightImage(context, -50, -50);
        }
    };

    drawInitialTimeline(!animationAssets.staticHidden);

    if (animationAssets.scrollHandler) {
        window.removeEventListener('scroll', animationAssets.scrollHandler);
    }
    if (animationAssets.reflowTimeout) {
        clearTimeout(animationAssets.reflowTimeout);
        animationAssets.reflowTimeout = null;
    }

    animationAssets.scrollHandler = () => {
        requestAnimationFrame(() => {
            const canvasPos = canvas.getBoundingClientRect().top;
            const startScroll = window.innerHeight / 2;
            updateImage(canvasPos, startScroll);
        });
    };

    window.addEventListener('scroll', animationAssets.scrollHandler);
    animationAssets.scrollHandler();
    animationAssets.reflowTimeout = setTimeout(() => {
        animationAssets.scrollHandler();
        animationAssets.reflowTimeout = null;
    }, 200);
}

function updateActiveTab(routeKey) {
    const tabs = document.querySelectorAll('.route-tab');
    tabs.forEach(tab => {
        if (tab.dataset.route === routeKey) {
            tab.classList.add('is-active');
            tab.setAttribute('aria-selected', 'true');
        } else {
            tab.classList.remove('is-active');
            tab.setAttribute('aria-selected', 'false');
        }
    });
}

function initRouteTabs() {
    const tabs = document.querySelectorAll('.route-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            handleRouteSelection(tab.dataset.route);
        });
    });
    updateActiveTab(activeRouteKey);
}

function handleRouteSelection(routeKey) {
    if (!ROUTE_VARIANTS[routeKey] || routeKey === activeRouteKey) return;
    console.log(`[Route] Switching route tab from ${activeRouteKey} to ${routeKey}`);
    activeRouteKey = routeKey;
    activeRouteData = ROUTE_VARIANTS[routeKey].data;
    window.ROUTE_DATA = activeRouteData;
    updateActiveTab(routeKey);
    initRouteExperience();
    loadRouteOnMap(ROUTE_VARIANTS[routeKey]);

    const modalWrapper = document.getElementById('modal_wrapper');
    if (modalWrapper && modalWrapper.style.display === 'flex') {
        closeModal();
    }
}

function initRouteExperience() {
    console.log('[Route] Initializing route experience', { activeRouteKey, days: activeRouteData?.days?.length });
    renderRouteColumns();
    setupCyclistAnimation();
    currentPostcardIndex = 0;
    updateArrowVisibility();
    window.ROUTE_DATA = activeRouteData;
}

function startRouteExperience() {
    console.log('[Route] Starting route experience bootstrap');
    try {
        initRouteTabs();
        initRouteExperience();
        initMap();
        loadRouteOnMap(ROUTE_VARIANTS[activeRouteKey]);
    } catch (error) {
        console.error('[Route] Failed to bootstrap route experience', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('[Route] DOMContentLoaded fired, initializing UI');
        startRouteExperience();
    });
} else {
    console.log('[Route] Document already loaded, initializing UI immediately');
    startRouteExperience();
}


function initMap() {
    if (map) return;
    console.log('[Route] Initializing Leaflet map');
    if (typeof L === 'undefined') {
        console.error('[Route] Leaflet library (L) is not available. Make sure leaflet.js is loaded before main.js.');
        return;
    }
    let initZoom = window.innerWidth < 800 ? 6 : 7;
    map = L.map('map', {
        minZoom: initZoom,
        maxZoom: 9,
        scrollWheelZoom: false
    }).setView([45.495, 9.734], initZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '<a href="http://www.osm.org">OpenStreetMap</a>'
    }).addTo(map);

    layerControl = L.control.layers(null, null).addTo(map);

    const imageUrl = './img/oldmap_modified_small.jpg';
    const errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
    const altText = '';
    const latLngBounds = L.latLngBounds([[48.026926, 5.140054], [42.867, 14.429]]);
    const latLngBoundsZoom = L.latLngBounds([[48.426926, 4.650054], [42.459366, 14.914517]]);
    map.setMaxBounds(latLngBoundsZoom);
    imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
        opacity: 1,
        errorOverlayUrl,
        alt: altText,
        interactive: true
    }).addTo(map);

    layerControl.addOverlay(imageOverlay, 'Historic Map');
}

function clearWaypointLayers() {
    if (!map || !layerControl) return;
    currentWaypointLayers.forEach(({ layer }) => {
        map.removeLayer(layer);
        layerControl.removeLayer(layer);
    });
    currentWaypointLayers = [];
}

function loadRouteOnMap(routeVariant) {
    if (!map || !layerControl) return;
    console.log('[Route] Loading map layers for', routeVariant?.key, routeVariant);
    if (typeof L === 'undefined' || !L.GPX) {
        console.error('[Route] Leaflet GPX plugin missing, cannot load route GPX');
        return;
    }

    if (currentGpxLayer) {
        map.removeLayer(currentGpxLayer);
        layerControl.removeLayer(currentGpxLayer);
        currentGpxLayer = null;
    }

    clearWaypointLayers();

    const gpxOptions = buildGpxOptions();

    currentGpxLayer = new L.GPX(routeVariant.gpx, gpxOptions)
        .on('loaded', () => {
            console.log(`[Route] GPX loaded for ${routeVariant.key}`);
            layerControl.addOverlay(currentGpxLayer, routeVariant.mapLayerLabel);
        })
        .on('error', (err) => {
            console.error(`[Route] Failed to load GPX for ${routeVariant.key} from ${routeVariant.gpx}`, err);
        })
        .addTo(map);

    loadWaypoints(routeVariant.waypoints);
}

async function loadWaypoints(waypointsUrl) {
    if (!map || !layerControl) return;
    console.log(`[Route] Loading waypoints from ${waypointsUrl}`);

    if (waypointFetchController) {
        waypointFetchController.abort();
    }
    waypointFetchController = new AbortController();

    try {
        const response = await fetch(waypointsUrl, { signal: waypointFetchController.signal });
        const text = await response.text();
        const data = new window.DOMParser().parseFromString(text, 'text/xml');
        const waypoints = data.getElementsByTagName('wpt');

        const passMarkers = L.layerGroup();
        const glacierMarkers = L.layerGroup();
        const dotMarkers = L.layerGroup();

        Array.from(waypoints).forEach(wpt => {
            const lat = parseFloat(wpt.getAttribute('lat'));
            const lon = parseFloat(wpt.getAttribute('lon'));
            const name = wpt.getElementsByTagName('name')[0].textContent;
            const type = wpt.getElementsByTagName('type')[0].textContent;

            const imgTag = wpt.getElementsByTagName('img')[0];
            let popupContent = name;
            if (imgTag) {
                const imgUrl = imgTag.textContent.trim();
                popupContent = `<img src="${IMAGE_BASE_URL}${imgUrl}" alt="Image for ${name}" style="width:175px; height:auto;"><br>` + name;
            }

            const icon = L.icon({
                iconUrl: getIconUrl(type),
                iconSize: [18, 22],
                iconAnchor: [9, 22],
                popupAnchor: [0, -22]
            });

            const marker = L.marker([lat, lon], {
                icon: icon,
                title: name
            }).bindPopup(popupContent, {
                className: 'custom-popup',
                closeButton: false,
                autoClose: true,
                closeOnClick: true
            });

            switch (type) {
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

        passMarkers.addTo(map);
        glacierMarkers.addTo(map);
        dotMarkers.addTo(map);

        const overlays = [
            { layer: passMarkers, label: 'Mountain Passes' },
            { layer: glacierMarkers, label: 'Glaciers' },
            { layer: dotMarkers, label: 'Other Points' }
        ];

        overlays.forEach(({ layer, label }) => layerControl.addOverlay(layer, label));
        currentWaypointLayers = overlays;
        console.log(`[Route] Waypoints loaded: passes=${passMarkers.getLayers().length}, glaciers=${glacierMarkers.getLayers().length}, other=${dotMarkers.getLayers().length}`);
    } catch (error) {
        if (error.name === 'AbortError') {
            return;
        }
        console.error('Failed to load waypoints:', error);
    }
}

function buildGpxOptions() {
    return JSON.parse(JSON.stringify(GPX_BASE_OPTIONS));
}

function getIconUrl(type) {
    switch (type) {
        case 'pass':
            return ICON_URLS.pass;
        case 'glacier':
            return ICON_URLS.glacier;
        default:
            return ICON_URLS.default;
    }
}


function getActivePostcards() {
    return activeRouteData.days
        .filter(day => day.postcard)
        .map(day => day.postcard);
}

function openFirstPostcard() {
    const postcards = getActivePostcards();

    // Open the first postcard if available
    if (postcards && postcards.length > 0) {
        openPostcardModal(postcards[0].id);
    }
}
function navigateModal(direction) {
    const postcards = getActivePostcards();

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
    const postcards = getActivePostcards();

    const prevArrow = document.getElementById('modal_prev');
    const nextArrow = document.getElementById('modal_next');

    if (!postcards.length) {
        prevArrow.style.display = 'none';
        nextArrow.style.display = 'none';
        return;
    }

    // Show/hide previous arrow
    prevArrow.style.display = currentPostcardIndex === 0 ? 'none' : 'flex';

    // Show/hide next arrow
    nextArrow.style.display = currentPostcardIndex === postcards.length - 1 ? 'none' : 'flex';
}

function openPostcardModal(postcardId) {
    // Find the index of the postcard

    const postcards = getActivePostcards();
    if (!postcards.length) return;
    currentPostcardIndex = postcards.findIndex(p => p.id === postcardId);
    if (currentPostcardIndex === -1) {
        currentPostcardIndex = 0;
    }

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
            en: " m. elevation gain",
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
window.openFirstPostcard = openFirstPostcard;
window.getIconUrl = getIconUrl;
