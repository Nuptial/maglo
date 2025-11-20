import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { SignInPage } from "./features/auth/routes/sign-in-page";
import { RootLayout } from "./layouts/root-layout";
import { SignUpPage } from "./features/auth/routes/sign-up-page";
import { DashboardPage } from "./features/dashboard/routes/dashboard-page";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-in",
  component: SignInPage,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up",
  component: SignUpPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const routeTree = rootRoute.addChildren([
  signInRoute,
  signUpRoute,
  dashboardRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
