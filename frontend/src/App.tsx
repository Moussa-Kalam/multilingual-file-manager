import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "./components/layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { LoginForm } from "./pages/LoginPage";
import { SignUpForm } from "./pages/SignUpPage";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedLayout from "./components/layouts/ProtectedLayout";

const queryClient = new QueryClient();

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route path="/" element={<ProtectedLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignUpForm />} />
        </Route>
      </Route>
    )
  );
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
