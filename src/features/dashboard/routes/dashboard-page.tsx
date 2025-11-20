import { DashboardLayout } from "@/features/dashboard/components/layout/dashboard-layout";
import { ScheduledTransfersCard } from "@/features/dashboard/components/transfers/scheduled-transfers-card";
import { RecentTransactionsCard } from "@/features/dashboard/components/transactions/recent-transactions-card";
import { WalletPanel } from "@/features/dashboard/components/wallet/wallet-panel";
import { WorkingCapitalCard } from "@/features/dashboard/components/working-capital/working-capital-card";
import { StatGrid } from "@/features/dashboard/components/stats/stat-grid";

const DashboardPage = () => (
  <DashboardLayout>
    <div className="grid gap-6 xl:grid-cols-[2fr,1fr]">
      <div className="space-y-6">
        <StatGrid />
        <WorkingCapitalCard />
        <RecentTransactionsCard />
      </div>
      <div className="space-y-6">
        <WalletPanel />
        <ScheduledTransfersCard />
      </div>
    </div>
  </DashboardLayout>
);

export { DashboardPage };
