import { useState, type ReactNode } from "react";

import { DashboardHeader } from "@/features/dashboard/components/header/dashboard-header";
import { DashboardSidebar } from "@/features/dashboard/components/layout/sidebar/dashboard-sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
  sidebar?: ReactNode;
};

const DashboardLayout = ({ children, sidebar }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const resolvedSidebar =
    sidebar ?? (
      <DashboardSidebar
        isMobileOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
    );

  return (
    <div className="flex w-full min-h-screen bg-white text-slate-900">
      {resolvedSidebar}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader
          onToggleSidebar={handleToggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto bg-white pb-8 sm:pb-10">
          <div className="w-full px-4 py-6 sm:px-6 lg:px-10">
            <div className="space-y-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export { DashboardLayout };
