import { DashboardLayout } from "@/features/dashboard/components/layout/dashboard-layout";
import { ScheduledTransfers } from "@/features/dashboard/components/transfers/scheduled-transfers";
import { RecentTransactions } from "@/features/dashboard/components/transactions/recent-transactions";
import { WalletPanel } from "@/features/dashboard/components/wallet/wallet-panel";
import { WorkingCapital } from "@/features/dashboard/components/working-capital/working-capital";
import { StatGrid } from "@/features/dashboard/components/stats/stat-grid";

const DashboardPage = () => (
  <DashboardLayout>
    <div className="grid gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="space-y-8">
        <StatGrid />
        <WorkingCapital />
        <RecentTransactions />
      </div>
      <div className="space-y-8">
        <WalletPanel />
        <ScheduledTransfers />
      </div>
    </div>
  </DashboardLayout>
);

export { DashboardPage };
