import { IconCircleButton } from "@/features/dashboard/components/header/icon-circle-button";
import { ProfileMenuButton } from "@/features/dashboard/components/header/profile-menu-button";
import {
  BellIcon,
  HeaderSearchIcon,
} from "@/features/dashboard/components/icons/dashboard-icons";

const DashboardHeader = () => (
  <header className="flex items-center justify-between bg-white px-4 py-5 text-slate-900 sm:px-6 lg:px-10">
    <p className="text-3xl font-semibold tracking-tight text-slate-900">
      Dashboard
    </p>
    <div className="flex items-center gap-4">
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
  </header>
);

export { DashboardHeader };
