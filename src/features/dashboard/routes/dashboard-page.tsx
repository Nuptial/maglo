import { DashboardLayout } from "@/features/dashboard/components/layout/dashboard-layout";
import { ScheduledTransfersCard } from "@/features/dashboard/components/transfers/scheduled-transfers-card";
import { RecentTransactionsCard } from "@/features/dashboard/components/transactions/recent-transactions-card";
import { WalletPanel } from "@/features/dashboard/components/wallet/wallet-panel";
import { WorkingCapitalCard } from "@/features/dashboard/components/working-capital/working-capital-card";
import { StatGrid } from "@/features/dashboard/components/stats/stat-grid";

const DashboardPage = () => (
  <DashboardLayout>
    <div className="grid gap-[39px] xl:grid-cols-[min(717px,100%)_min(354px,100%)]">
      <div className="space-y-[30px] max-w-[717px]">
        <StatGrid />
        <WorkingCapitalCard />
        <RecentTransactionsCard />
      </div>
      <div className="space-y-[30px] max-w-[354px]">
        <WalletPanel />
        <ScheduledTransfersCard />
      </div>
    </div>
  </DashboardLayout>
);

export { DashboardPage };
