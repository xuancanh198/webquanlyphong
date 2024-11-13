import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const resources = {
  en: {
    translation: {
      'Welcome': 'Welcome',
      'Hello': 'Hello',
    }
  },
  vi: {
    translation: {
      'Welcome': 'Chào mừng',
      'Hello': 'Xin chào',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi',
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
