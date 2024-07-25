import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main className="p-32 min-h-dvh grid">
      <Outlet />
    </main>
  );
}
