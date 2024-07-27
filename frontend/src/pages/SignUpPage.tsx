import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function SignUpForm() {
  const { t } = useTranslation();
  return (
    <div className="border border-black rounded-lg p-10 bg-gray-100 w-96">
      <form className="gap-5" action="">
        <h2 className="text-2xl font-bold text-center">
          {t("SignUpPage.title")}
        </h2>

        <div className="grid gap-5 py-5">
          <div className="grid">
            <label htmlFor="username" className="text-sm">
              {t("SignUpPage.email")}
            </label>
            <input
              className="border-2 rounded-md px-2 py-1"
              type="text"
              id="username"
              name="username"
            />
          </div>
          <div className="grid">
            <label htmlFor="password" className="text-sm">
              {t("SignUpPage.password")}
            </label>
            <input
              className="border-2 rounded-md px-2 py-1"
              type="password"
              id="password"
              name="password"
            />
          </div>
          <div className="grid">
            <label htmlFor="password" className="text-sm">
              {t("SignUpPage.confirmPassword")}
            </label>
            <input
              className="border-2 rounded-md px-2 py-1"
              type="password"
              id="password"
              name="password"
            />
          </div>
          <button className="bg-black text-white font-bold py-1 rounded-md mt-5">
            {t("SignUpPage.submit")}
          </button>

          <Link className="text-center text-sm mt-5" to="/auth/login">
            {t("SignUpPage.goToLogin")}
          </Link>
        </div>
      </form>
    </div>
  );
}
