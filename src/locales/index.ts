import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getAllInternationalAPI } from '@/service/modules/international';

const createCustomBackend = () => ({
  type: 'backend' as const,
  read(language: string, _namespace: string, callback: (error: any, data: any) => void) {
    getAllInternationalAPI()
      .then((data) => {
        const translations = data[language] || data['zhCN'];
        callback(null, translations);
      })
      .catch((error) => {
        callback(error, null);
      });
  }
});

export async function initializeI18n() {
  await i18n
    .use(createCustomBackend())
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      lng: 'zhCN',
      fallbackLng: 'zhCN',
      partialBundledLanguages: true,
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false
      }
    });

  return i18n;
}
