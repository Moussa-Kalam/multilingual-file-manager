import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const token = localStorage.getItem("token")
  return (
    !token ? <main className="grid place-content-center">
      <Outlet />
    </main> : <Navigate to="/" />

  );
}
