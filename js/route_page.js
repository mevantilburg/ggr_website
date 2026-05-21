import { translator } from './index.js?v0.30';  // or from wherever the instance is exported

console.log("Current language:", translator.getCurrentLanguage());


function handleClick(event) {

    // Do something when clicking the child div

    event.stopPropagation();

}
function toggleMenu() {
    const menu = document.getElementById("languageDropdown");
    const eventsMenu = document.getElementById("eventsDropdown");
    const nav = document.getElementById("navitems");
    if (menu) menu.style.display = 'none'
    if (eventsMenu) eventsMenu.style.display = 'none'
    if (nav.style.display == 'flex') {
        nav.style.display = 'none'
    } else {
       
        nav.style.display = 'flex'
    }
}
function toggleLanguageDropdown() {
    const menu = document.getElementById("languageDropdown");
    const eventsMenu = document.getElementById("eventsDropdown");
    if (eventsMenu) eventsMenu.style.display = 'none'
  
    if (menu.style.display == 'flex') {
        menu.style.display = 'none'
    } else {
        menu.style.display = 'flex'
    }
}

function toggleEventsDropdown() {
    const menu = document.getElementById("eventsDropdown");
    const languageMenu = document.getElementById("languageDropdown");
    if (!menu) return;
    if (languageMenu) languageMenu.style.display = 'none';

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
    const menu = document.getElementById("languageDropdown");
    const eventsMenu = document.getElementById("eventsDropdown");
    if (menu) menu.style.display = 'none';
    if (eventsMenu) eventsMenu.style.display = 'none';

}





window.toggleLanguageDropdown = toggleLanguageDropdown;
window.toggleEventsDropdown = toggleEventsDropdown;
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.handleClick = handleClick;
