import type { ReactNode } from "react";

import { DashboardHeader } from "@/features/dashboard/components/header/dashboard-header";
import { DashboardSidebar } from "@/features/dashboard/components/layout/sidebar/dashboard-sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
  sidebar?: ReactNode;
};

const DashboardLayout = ({ children, sidebar }: DashboardLayoutProps) => (
  <div className="flex h-full w-full bg-white text-slate-900">
    {sidebar ?? <DashboardSidebar />}
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardHeader />
      <main className="flex-1 overflow-y-auto bg-white pb-[26px]">
        <div className="w-full max-w-[1110px] pt-[30px] px-[40px]">
          <div className="space-y-8">{children}</div>
        </div>
      </main>
    </div>
  </div>
);

export { DashboardLayout };
