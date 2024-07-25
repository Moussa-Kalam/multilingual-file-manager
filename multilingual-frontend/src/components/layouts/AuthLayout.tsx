import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="grid place-content-center">
      <Outlet />
    </main>
  );
}
