import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import useLoging from "../components/hooks/useLoging";

export function LoginForm() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { data: userData, mutate } = useLoging();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    console.log(userData, "--------userdata")
    mutate(JSON.stringify(data));
    localStorage.setItem("token", userData.token);
    if (userData.token) {
      navigate("/");
    }
  };

  return (
    <div className="border border-black rounded-lg p-10 bg-gray-100 w-96">
      <form className="gap-5" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold text-center">
          {t("LoginPage.title")}
        </h2>
        <div className="grid gap-5 py-5">
          <div className="grid gap-2">
            <label className="text-sm" htmlFor="email">
              {t("LoginPage.email")}
            </label>
            <input
              className="border-2 rounded-md px-2 py-1"
              type="text"
              id="email"
              {...register("email", { required: true })}
            />
            {errors.email && <span className="text-red-500">{t("LoginPage.emailError")}</span>}
          </div>
          <div className="grid gap-2">
            <label className="text-sm" htmlFor="password">
              {t("LoginPage.password")}
            </label>
            <input
              className="border-2 rounded-md px-2 py-1"
              type="password"
              id="password"
              {...register("password", { required: true })}
            />
            {errors.password && <span className="text-red-500">{t("LoginPage.passwordError")}</span>}
          </div>
          <button
            type="submit"
            className="bg-black text-white font-bold py-1 rounded-md mt-5"
          >
            {t("LoginPage.submit")}
          </button>
          <Link className="text-center text-sm mt-5" to="/auth/signup">
            {t("LoginPage.goToSignUp")}
          </Link>
        </div>
      </form>
    </div>
  );
}
