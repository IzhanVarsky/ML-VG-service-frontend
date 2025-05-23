import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";  // <--- добавить
import en from "./locales/en/translation.json";
import ru from "./locales/ru/translation.json";
// import ja from "./locales/ja/translation.json"; // если есть японский

i18n
  .use(LanguageDetector)        // <--- добавить сюда
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      // ja: { translation: ja },
    },
    fallbackLng: "en",    // <--- Fallback всегда русский!
    interpolation: { escapeValue: false },
    debug: true,
    detection: {
      // приоритет: сначала querystring, потом localStorage, потом navigator.language, потом cookie, потом html lang
      order: ["querystring", "localStorage", "navigator", "cookie", "htmlTag"],
      caches: ["localStorage", "cookie"], // где хранить выбранный язык
      lookupQuerystring: ['lang', 'lng', 'locale'],           // поддержка ?lng=en
      // Можно добавить custom lookup для IP
    }
  });

export default i18n;
