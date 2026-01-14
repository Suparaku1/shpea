import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import sq from './locales/sq.json';
import en from './locales/en.json';
import it from './locales/it.json';
import fr from './locales/fr.json';
import de from './locales/de.json';

const savedLanguage = localStorage.getItem('language') || 'sq';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      sq: { translation: sq },
      en: { translation: en },
      it: { translation: it },
      fr: { translation: fr },
      de: { translation: de },
    },
    lng: savedLanguage,
    fallbackLng: 'sq',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
