import { IconCircleButton } from "@/features/dashboard/components/header/icon-circle-button";
import { ProfileMenuButton } from "@/features/dashboard/components/header/profile-menu-button";
import {
  BellIcon,
  HeaderSearchIcon,
} from "@/features/dashboard/components/icons/dashboard-icons";

type DashboardHeaderProps = {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
};

const DashboardHeader = ({
  onToggleSidebar,
  isSidebarOpen,
}: DashboardHeaderProps) => (
  <header className="bg-white text-slate-900">
    <div className="mx-auto flex w-full flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
      <div className="flex items-center gap-3">
        <IconCircleButton
          ariaLabel="Toggle navigation menu"
          ariaPressed={isSidebarOpen}
          ariaExpanded={isSidebarOpen}
          className="lg:hidden"
          icon={
            <span className="flex flex-col gap-1">
              <span className="block h-0.5 w-5 bg-slate-500" />
              <span className="block h-0.5 w-5 bg-slate-500" />
              <span className="block h-0.5 w-5 bg-slate-500" />
            </span>
          }
          onClick={onToggleSidebar}
        />
        <p className="text-left text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Dashboard
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <IconCircleButton
          ariaLabel="Search"
          icon={<HeaderSearchIcon />}
          onClick={() => console.info("Search clicked")}
        />
        <IconCircleButton
          ariaLabel="Open notifications"
          icon={<BellIcon />}
          onClick={() => console.info("Notifications clicked")}
        />
        <ProfileMenuButton />
      </div>
    </div>
  </header>
);

export { DashboardHeader };
