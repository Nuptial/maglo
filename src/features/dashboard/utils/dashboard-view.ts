import type { DashboardView } from "@/features/dashboard/types";

const DASHBOARD_VIEW_VALUES: DashboardView[] = [
  "dashboard",
  "transactions",
  "invoices",
  "wallets",
  "settings",
  "help",
];

const DEFAULT_DASHBOARD_VIEW: DashboardView = "dashboard";

const isDashboardView = (value: unknown): value is DashboardView =>
  typeof value === "string" &&
  DASHBOARD_VIEW_VALUES.includes(value as DashboardView);

const sanitizeSearch = (search: string) =>
  search.startsWith("?") ? search.slice(1) : search;

const extractViewFromString = (
  rawSearch: string | undefined | null,
): DashboardView | null => {
  if (typeof rawSearch !== "string" || !rawSearch.trim()) {
    return null;
  }

  const sanitized = sanitizeSearch(rawSearch);

  if (!sanitized) {
    return null;
  }

  const params = new URLSearchParams(sanitized);
  const viewParam = params.get("view");

  if (!isDashboardView(viewParam)) {
    return null;
  }

  return viewParam;
};

const extractViewFromObject = (search: unknown): DashboardView | null => {
  if (
    !search ||
    typeof search !== "object" ||
    !("view" in search) ||
    !isDashboardView((search as { view?: unknown }).view)
  ) {
    return null;
  }

  return (search as { view?: DashboardView }).view ?? null;
};

const getDashboardViewFromSearch = (
  rawSearch: unknown,
): DashboardView => {
  const viewFromObject = extractViewFromObject(rawSearch);
  if (viewFromObject) {
    return viewFromObject;
  }

  const viewFromString = extractViewFromString(
    typeof rawSearch === "string" ? rawSearch : null,
  );
  if (viewFromString) {
    return viewFromString;
  }

  return DEFAULT_DASHBOARD_VIEW;
};

export {
  DASHBOARD_VIEW_VALUES,
  DEFAULT_DASHBOARD_VIEW,
  getDashboardViewFromSearch,
  isDashboardView,
};

