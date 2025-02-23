
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
          
        
          const nav = document.getElementById("languageDropdown");
               nav.style.display = 'none'
      });
  });
});

