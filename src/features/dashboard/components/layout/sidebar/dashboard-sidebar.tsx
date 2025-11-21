import { Logo } from "@/components/logo";
import {
  HelpIcon,
  HomeIcon,
  InvoiceIcon,
  LogoutIcon,
  SettingsIcon,
  TrendIcon,
  WalletIcon,
} from "@/features/dashboard/components/icons/dashboard-icons";
import type { NavLink } from "@/features/dashboard/types";
import type { KeyboardEvent } from "react";

const navItems: NavLink[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <HomeIcon />,
    isActive: true,
    section: "primary",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: <TrendIcon />,
    section: "primary",
  },
  {
    id: "invoices",
    label: "Invoices",
    icon: <InvoiceIcon />,
    section: "primary",
  },
  {
    id: "wallets",
    label: "My Wallets",
    icon: <WalletIcon />,
    section: "primary",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    section: "primary",
  },
  {
    id: "help",
    label: "Help",
    icon: <HelpIcon />,
    section: "secondary",
  },
  {
    id: "logout",
    label: "Logout",
    icon: <LogoutIcon />,
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

const handleNavClick = (label: string) => {
  console.info(`Navigate to ${label}`);
};

const DashboardSidebar = () => {
  const primaryLinks = navItems.filter((link) => link.section !== "secondary");
  const secondaryLinks = navItems.filter(
    (link) => link.section === "secondary"
  );

  const renderNavButton = (link: NavLink) => {
    const isActive = Boolean(link.isActive);
    return (
      <button
        key={link.id}
        type="button"
        aria-current={isActive ? "page" : undefined}
        aria-label={link.label}
        tabIndex={0}
        onClick={() => handleNavClick(link.label)}
        onKeyDown={(event) =>
          handleKeyDown(event, () => handleNavClick(link.label))
        }
        className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-base font-semibold outline-none focus:outline-none focus-visible:outline-none ${
          isActive
            ? "bg-[#ccff33] text-slate-900"
            : "text-slate-400 transition hover:text-slate-600"
        }`}
      >
        <span
          className={`flex h-10 w-10 items-center justify-center ${
            isActive
              ? "bg-white/40 text-slate-900"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          {link.icon}
        </span>
        <span>{link.label}</span>
      </button>
    );
  };

  return (
    <aside className="hidden w-full max-w-xs flex-col bg-[#fafafa] px-6 py-10 lg:flex lg:max-w-sm lg:px-8 lg:py-12 xl:w-72">
      <div className="flex items-center gap-3">
        <Logo />
      </div>
      <div className="mt-8 space-y-3">{primaryLinks.map(renderNavButton)}</div>
      <div className="mt-auto space-y-3 border-t border-slate-100 pt-6">
        {secondaryLinks.map(renderNavButton)}
      </div>
    </aside>
  );
};

export { DashboardSidebar };
