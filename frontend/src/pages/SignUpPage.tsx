import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import useCreateUser from "../components/hooks/useCreateUser";

export function SignUpForm() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { data, error, isPending, mutate } = useCreateUser();
  const navigate = useNavigate();
  console.log(data, "creation data", error, "creation error", isPending, "creation isPending"
  );
  const onSubmit = data => {
    console.log(data);

    mutate(JSON.stringify(data));
    navigate("/auth/login");
  };

  return (
    <div className="border border-black rounded-lg p-10 bg-gray-100 w-96">
      <form className="gap-5" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold text-center">
          {t("SignUpPage.title")}
        </h2>

        <div className="grid gap-5 py-5">
          <div className="grid">
            <label htmlFor="email" className="text-sm">
              {t("SignUpPage.email")}
            </label>
            <input
              className="border-2 rounded-md px-2 py-1"
              type="text"
              id="email"
              {...register("email", { required: true })}
            />
            {errors.email && <span className="text-red-500">{t("SignUpPage.emailError")}</span>}
          </div>
          <div className="grid">
            <label htmlFor="password" className="text-sm">
              {t("SignUpPage.password")}
            </label>
            <input
              className="border-2 rounded-md px-2 py-1"
              type="password"
              id="password"
              {...register("password", { required: true })}
            />
            {errors.password && <span className="text-red-500">{t("SignUpPage.passwordError")}</span>}
          </div>
          <div className="grid">
            <label htmlFor="confirmPassword" className="text-sm">
              {t("SignUpPage.confirmPassword")}
            </label>
            <input
              className="border-2 rounded-md px-2 py-1"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && <span className="text-red-500">{t("SignUpPage.confirmPasswordError")}</span>}
          </div>
          <button className="bg-black text-white font-bold py-1 rounded-md mt-5" type="submit">
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
