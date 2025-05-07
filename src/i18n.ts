import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationEN from './locales/en/translation.json';
import translationHE from './locales/he/translation.json';

// Resources object with translations
const resources = {
  en: {
    translation: translationEN
  },
  he: {
    translation: translationHE
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    debug: false, // Set to true for development
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Function to set the HTML direction based on language
export const setDirectionForLanguage = (language: string) => {
  const direction = language === 'he' ? 'rtl' : 'ltr';
  document.documentElement.dir = direction;
  document.body.style.textAlign = direction === 'rtl' ? 'right' : 'left';
};

// Set initial direction based on current language
setDirectionForLanguage(i18n.language);

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  setDirectionForLanguage(lng);
});

export default i18n;
