import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/context/use-auth";

const RootRedirect = () => {
  const navigate = useNavigate();
  const { accessToken, isRefreshing } = useAuth();

  useEffect(() => {
    if (isRefreshing) {
      return;
    }

    const destination = accessToken ? "/dashboard" : "/sign-in";
    navigate({ to: destination, replace: true });
  }, [accessToken, isRefreshing, navigate]);

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
};

export { RootRedirect };


