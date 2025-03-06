import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import store from '@/store';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'cn', // 默认语言
    fallbackLng: 'cn', // 未找到对应语言时使用的语言
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

store.subscribe(() => {
  const currentLanguage = store.getState().user.language;
  if (currentLanguage && currentLanguage !== i18n.language) {
    i18n.changeLanguage(currentLanguage);
  }
});

export default i18n;
