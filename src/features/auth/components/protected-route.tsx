import { useCallback, useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/context/use-auth";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const navigateWithTransition = useCallback<typeof navigate>(
    (options) => navigate({ ...options, viewTransition: true }),
    [navigate]
  );
  const { accessToken, isRefreshing } = useAuth();

  useEffect(() => {
    if (isRefreshing) {
      return;
    }

    if (!accessToken) {
      navigateWithTransition({ to: "/sign-in", replace: true });
    }
  }, [accessToken, isRefreshing, navigateWithTransition]);

  if (isRefreshing) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label="Checking session"
        className="flex min-h-screen items-center justify-center bg-slate-50"
      >
        <span
          aria-hidden
          className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500"
        />
      </div>
    );
  }

  return children;
};

export { ProtectedRoute };
