import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { RootLayout } from "@/app/layouts/root-layout";
import { RootRedirect } from "@/features/auth/routes/root-redirect";
import { SignInPage } from "@/features/auth/routes/sign-in-page";
import { SignUpPage } from "@/features/auth/routes/sign-up-page";
import { ProtectedDashboardPage } from "@/features/dashboard/routes/protected-dashboard-page";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const rootRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: RootRedirect,
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
  component: ProtectedDashboardPage,
});

const routeTree = rootRoute.addChildren([
  rootRedirectRoute,
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
