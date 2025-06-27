
import Translator from "./translator.js";

export const translator = new Translator({
  persist: false,
  languages: ["de", "en", "fr", "it", "nl"],
  defaultLanguage: "en",
  detectLanguage: true,
  filesLocation: "/i18n"
});


translator.load();
document.addEventListener("DOMContentLoaded", function () {
  // Select all dropdown items
  const languageItems = document.querySelectorAll('#languageDropdown .dropdown-item');
  // Select the flag image inside the language switcher button
  const languageSwitcherImg = document.querySelector('#languageSwitcher img.flag-icon');
  
  languageItems.forEach(item => {
    item.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default anchor behavior

      // Determine the language from the element's ID (e.g., "nlLink" -> "nl")
      const lang = this.id.replace('Link', '');
      
      // Update the switcher button flag using the clicked item's flag image
      const selectedFlagImg = this.querySelector('img.flag-icon');
      if (selectedFlagImg) {
        languageSwitcherImg.src = selectedFlagImg.src;
        languageSwitcherImg.alt = selectedFlagImg.alt;
      }
      
      // Call your function to switch language, passing the language code
      translator.load(lang);
      
      // Hide the dropdown menu after selection
      const nav = document.getElementById("languageDropdown");
      nav.style.display = 'none';
    });
  });

  // Setup postcard effects with a slight delay to ensure DOM is fully rendered
  setTimeout(() => {
    setupPostcardHoverEffects();
    
  }, 500);
});

// Function to set up hover effects for postcards
function setupPostcardHoverEffects() {
  console.log("Setting up postcard hover effects");
  // Get all day stats elements with postcards
  const dayStats = document.querySelectorAll('[data-postcard-day]');
  
  dayStats.forEach(stat => {
    const dayId = stat.getAttribute('data-postcard-day');
    const postcardImage = document.getElementById(`pc${dayId}`);
    
    if (postcardImage) {
      // Add mouseenter event
      stat.addEventListener('mouseenter', () => {
        postcardImage.classList.add('hover_animate');
      });
      
      // Add mouseleave event
      stat.addEventListener('mouseleave', () => {
        postcardImage.classList.remove('hover_animate');
      });
    }
  });
}

// If you need to trigger the setup after AJAX calls or dynamic content loading
export function refreshPostcardHoverEffects() {
  setupPostcardHoverEffects();
}

// You might need this function if the route is rendered via AJAX
// and the elements aren't available when DOMContentLoaded fires
export function triggerRouteRenderedEvent() {
  document.dispatchEvent(new CustomEvent('route-rendered'));
}