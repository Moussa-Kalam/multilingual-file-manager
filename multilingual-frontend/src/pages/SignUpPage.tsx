import { Link } from "react-router-dom";

export function SignUpForm() {
  return (
    <div className="border border-black rounded-lg p-10 bg-gray-100 w-96">
      <form className="gap-5" action="">
        <h2 className="text-2xl font-bold text-center">SignUp</h2>

        <div className="grid gap-5 py-5">
          <div className="grid">
            <label htmlFor="username" className="text-sm">
              Email
            </label>
            <input
              className="border-2 rounded-md px-2 py-1"
              type="text"
              id="username"
              name="username"
            />
          </div>
          <div className="grid">
            <label htmlFor="username" className="text-sm">
              Language
            </label>
            <input
              className="border-2 rounded-md px-2 py-1"
              type="text"
              id="language"
              name="language"
            />
          </div>
          <div className="grid">
            <label htmlFor="password" className="text-sm">
              Password
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
              Confirm Password
            </label>
            <input
              className="border-2 rounded-md px-2 py-1"
              type="password"
              id="password"
              name="password"
            />
          </div>
          <button className="bg-black text-white font-bold py-1 rounded-md mt-5">
            SignUp
          </button>

          <Link className="text-center text-sm mt-5" to="/auth/login">
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
