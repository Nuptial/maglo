import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/context/use-auth";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { accessToken, isRefreshing } = useAuth();

  useEffect(() => {
    if (isRefreshing) {
      return;
    }

    if (!accessToken) {
      navigate({ to: "/sign-in", replace: true });
    }
  }, [accessToken, isRefreshing, navigate]);

  if (isRefreshing) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Checking session...
      </div>
    );
  }

  if (!accessToken) {
    return null;
  }

  return children;
};

export { ProtectedRoute };
