import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { router } from "@/app/router/app-router";
import { AuthProvider } from "@/features/auth/context/auth-context";

const AppShell = () => (
  <AuthProvider>
    <RouterProvider router={router} />
    <Toaster position="top-right" />
  </AuthProvider>
);

export { AppShell };

