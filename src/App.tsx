import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./features/auth/context/auth-context";
import { router } from "./router";

const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
    <Toaster position="top-right" />
  </AuthProvider>
);

export default App;
