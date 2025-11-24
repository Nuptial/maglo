import { Logo } from "@/shared/components/brand/logo";
import {
  HelpIcon,
  HomeIcon,
  InvoiceIcon,
  LogoutIcon,
  SettingsIcon,
  TrendIcon,
  WalletIcon,
} from "@/features/dashboard/components/icons/dashboard-icons";
import type { DashboardView, NavLink } from "@/features/dashboard/types";
import type { KeyboardEvent } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { logoutUser } from "@/features/auth/api/logout";
import { useAuth } from "@/features/auth/context/use-auth";
import { getDashboardViewFromSearch } from "@/features/dashboard/utils/dashboard-view";

const navItems: NavLink[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: HomeIcon,
    section: "primary",
    view: "dashboard",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: TrendIcon,
    section: "primary",
    view: "transactions",
  },
  {
    id: "invoices",
    label: "Invoices",
    icon: InvoiceIcon,
    section: "primary",
    view: "invoices",
  },
  {
    id: "wallets",
    label: "My Wallets",
    icon: WalletIcon,
    section: "primary",
    view: "wallets",
  },
  {
    id: "settings",
    label: "Settings",
    icon: SettingsIcon,
    section: "primary",
    view: "settings",
  },
  {
    id: "help",
    label: "Help",
    icon: HelpIcon,
    section: "secondary",
    view: "help",
  },
  {
    id: "logout",
    label: "Logout",
    icon: LogoutIcon,
    section: "secondary",
  },
];

const handleKeyDown = (
  event: KeyboardEvent<HTMLButtonElement>,
  handler: () => void
) => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }
  event.preventDefault();
  handler();
};

type DashboardSidebarProps = {
  isMobileOpen?: boolean;
  onClose?: () => void;
};

const DashboardSidebar = ({
  isMobileOpen = false,
  onClose,
}: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const { clearAuth } = useAuth();
  const { mutateAsync: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutUser,
  });

  const activeView = getDashboardViewFromSearch(routerState.location.search);

  const handleNavClick = (label: string) => {
    console.info(`Navigate to ${label}`);
  };

  const handleSectionNavigation = (view: DashboardView) =>
    navigate({
      to: "/dashboard",
      search: { view },
    });

  const handleLogout = async () => {
    try {
      await logout();
      clearAuth();
      toast.success("You have been logged out");
      navigate({ to: "/sign-in" });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to logout";
      toast.error(message);
    }
  };

  const primaryLinks = navItems.filter((link) => link.section !== "secondary");
  const secondaryLinks = navItems.filter(
    (link) => link.section === "secondary"
  );

  const baseNavButtonClasses =
    "flex w-full items-center gap-4 px-4 py-3 text-base font-semibold outline-none transition-colors focus:outline-none focus-visible:outline-none";

  const getNavButtonClasses = (isActive: boolean) => {
    const activeClasses = "bg-[#ccff33] text-[rgb(148,163,184)] rounded-lg";
    const inactiveClasses = "text-slate-400 hover:text-slate-600";

    return `${baseNavButtonClasses} ${
      isActive ? activeClasses : inactiveClasses
    }`;
  };

  const renderNavButton = (link: NavLink) => {
    const isLogout = link.id === "logout";
    const isRouteLink = Boolean(link.view);
    const isActive =
      isRouteLink && link.view ? link.view === activeView : false;
    const IconComponent = link.icon;
    const iconColor = isActive ? "#1B212D" : undefined;
    const onSelect = isLogout
      ? handleLogout
      : isRouteLink && link.view
      ? () => handleSectionNavigation(link.view as DashboardView)
      : () => handleNavClick(link.label);

    const handleSelection = () => {
      Promise.resolve(onSelect()).finally(() => {
        onClose?.();
      });
    };

    return (
      <button
        key={link.id}
        type="button"
        aria-current={isActive ? "page" : undefined}
        aria-label={link.label}
        tabIndex={0}
        onClick={handleSelection}
        onKeyDown={(event) => handleKeyDown(event, handleSelection)}
        disabled={isLogout && isLoggingOut}
        aria-disabled={isLogout && isLoggingOut}
        aria-busy={isLogout && isLoggingOut}
        className={getNavButtonClasses(isActive)}
      >
        <span className="flex h-10 w-10 items-center justify-center">
          <IconComponent color={iconColor} />
        </span>
        <span>{link.label}</span>
      </button>
    );
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-xs flex-col bg-[#fafafa] px-6 py-10 shadow-xl transition-transform duration-300 ease-in-out lg:relative lg:z-0 lg:w-full lg:max-w-sm lg:translate-x-0 lg:px-8 lg:py-12 lg:shadow-none xl:w-72 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Primary navigation"
      >
        <div className="flex items-center justify-between gap-3">
          <Logo />
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 lg:hidden"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            Close
          </button>
        </div>
        <div className="mt-8 space-y-3">
          {primaryLinks.map(renderNavButton)}
        </div>
        <div className="mt-auto space-y-3 border-t border-slate-100 pt-6">
          {secondaryLinks.map(renderNavButton)}
        </div>
      </aside>
    </>
  );
};

export { DashboardSidebar };
