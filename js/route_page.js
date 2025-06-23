import { translator } from './index.js';  // or from wherever the instance is exported

console.log("Current language:", translator.getCurrentLanguage());


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





window.toggleLanguageDropdown = toggleLanguageDropdown;
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.handleClick = handleClick;

