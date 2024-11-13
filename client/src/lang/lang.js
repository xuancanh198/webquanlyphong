import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import viTranslation from './json/vi.json'; 
import enTranslation from './json/en.json'; 
i18n
  .use(initReactI18next) 
  .init({
    resources: {
      vi: {
        translation: viTranslation,
      },
      en: {
        translation: enTranslation,
      },
    },
    lng: 'vi',
    fallbackLng: 'vi',
    // interpolation: {
    //   escapeValue: false, 
    // },
  });

export default i18n;
