import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationEnglish from "./Translation/English/translation.json";
import translationFrench from "./Translation/French/translation.json";
import translationKinyarwanda from "./Translation/Kinyarwanda/translation.json";

const resources = {
  en: {
    translation: translationEnglish,
  },
  fr: {
    translation: translationFrench,
  },
  rw: {
    translation: translationKinyarwanda,
  },
};

i18next.use(initReactI18next).init({ resources, lng: "en" });

export default i18next