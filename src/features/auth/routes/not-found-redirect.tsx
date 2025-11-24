import { useCallback, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

const NotFoundRedirect = () => {
  const navigate = useNavigate();
  const navigateWithTransition = useCallback<typeof navigate>(
    (options) => navigate({ ...options, viewTransition: true }),
    [navigate]
  );

  useEffect(() => {
    navigateWithTransition({ to: "/sign-in", replace: true });
  }, [navigateWithTransition]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Redirecting to sign in"
      className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center"
    >
      <p className="text-lg font-semibold text-slate-900">
        Redirecting you to sign in
      </p>
      <span
        aria-hidden
        className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500"
      />
      <p className="text-sm text-slate-600">
        We could not find that page. Please sign in to continue.
      </p>
    </div>
  );
};

export { NotFoundRedirect };


