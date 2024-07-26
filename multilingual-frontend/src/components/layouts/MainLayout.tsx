import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const onClickLanguageChange = (e: any) => {
    const language = e.target.value as "en" | "fr" | "rw";
    i18n.changeLanguage(language);
  };
  return (
    <main className="px-32 py-10 min-h-dvh grid">
      <div>
        <div className="flex justify-end py-5 gap-2">
          <select
            onChange={onClickLanguageChange}
            className="select max-w-xs border-black border-2"
          >
            <option value="en">🇺🇸 English</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="rw">🇷🇼 Ikinyarwanda</option>
          </select>
          <button className="bg-black text-white font-bold py-2 px-3 rounded-md">
            {t("homePage.logoutButtonText")}
          </button>
        </div>
        <Outlet />
      </div>
    </main>
  );
}
