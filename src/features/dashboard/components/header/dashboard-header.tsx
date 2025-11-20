import { IconCircleButton } from "@/features/dashboard/components/header/icon-circle-button";
import { ProfileMenuButton } from "@/features/dashboard/components/header/profile-menu-button";
import {
  BellIcon,
  HeaderSearchIcon,
} from "@/features/dashboard/components/icons/dashboard-icons";

const DashboardHeader = () => (
  <header className="bg-white text-slate-900">
    <div className="mx-auto flex h-full w-full max-w-[1110px] items-center pt-[30px]">
      <div className="flex w-full items-center justify-between h-[48px]">
        <p className="text-[25px] font-semibold tracking-tight text-slate-900">
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
      </div>
    </div>
  </header>
);

export { DashboardHeader };
