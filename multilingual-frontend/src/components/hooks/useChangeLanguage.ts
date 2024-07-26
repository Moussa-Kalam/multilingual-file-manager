import { useTranslation } from "react-i18next";

export default function useChangeLanguage(language: "en" | "fr" | "rw") {
  const { i18n } = useTranslation();

  i18n.changeLanguage(language);
}
