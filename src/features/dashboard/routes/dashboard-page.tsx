import type { ReactElement } from "react";
import { useRouterState } from "@tanstack/react-router";
import { DashboardLayout } from "@/features/dashboard/components/layout/dashboard-layout";
import { StatGrid } from "@/features/dashboard/components/stats/stat-grid";
import { ScheduledTransfers } from "@/features/dashboard/components/transfers/scheduled-transfers";
import { RecentTransactions } from "@/features/dashboard/components/transactions/recent-transactions";
import { WalletPanel } from "@/features/dashboard/components/wallet/wallet-panel";
import { WorkingCapital } from "@/features/dashboard/components/working-capital/working-capital";
import { ComingSoonPanel } from "@/features/dashboard/components/common/coming-soon-panel";
import { getDashboardViewFromSearch } from "@/features/dashboard/utils/dashboard-view";
import type { DashboardView } from "@/features/dashboard/types";

type SectionComponent = () => ReactElement;

const DashboardOverviewSection: SectionComponent = () => (
  <section
    aria-label="Dashboard overview"
    className="grid gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
  >
    <div className="space-y-8">
      <StatGrid />
      <WorkingCapital />
      <RecentTransactions />
    </div>
    <div className="space-y-8">
      <WalletPanel />
      <ScheduledTransfers />
    </div>
  </section>
);

const TransactionsSection: SectionComponent = () => (
  <ComingSoonPanel
    title="Transactions workspace is almost ready"
    description="Ledger, payouts, and approvals are in the final polishing round. We will notify you once everything ships."
  />
);

const InvoicesSection: SectionComponent = () => (
  <ComingSoonPanel
    title="Invoices dashboard is coming soon"
    description="Follow drafts, reminders, and collections from one surface. Launching shortly."
  />
);

const WalletsSection: SectionComponent = () => (
  <ComingSoonPanel
    title="My Wallets arrives shortly"
    description="Multi-currency balances, spending limits, and allocations will land here soon."
  />
);

const SettingsSection: SectionComponent = () => (
  <ComingSoonPanel
    title="Workspace settings are on the way"
    description="Profile controls, advanced security, and notification preferences are in development."
  />
);

const HelpSection: SectionComponent = () => (
  <ComingSoonPanel
    title="Help Center is in progress"
    description={
      <>
        We are preparing articles and guided flows. Need assistance right now?
        Email{" "}
        <a
          href="mailto:support@maglo.com"
          className="font-semibold text-slate-900 underline decoration-dotted underline-offset-4"
        >
          support@maglo.com
        </a>{" "}
        and the team will reply shortly.
      </>
    }
  />
);

const dashboardViewComponents: Record<DashboardView, SectionComponent> = {
  dashboard: DashboardOverviewSection,
  transactions: TransactionsSection,
  invoices: InvoicesSection,
  wallets: WalletsSection,
  settings: SettingsSection,
  help: HelpSection,
};

const DashboardPage = () => {
  const { location } = useRouterState();
  const activeView = getDashboardViewFromSearch(location.search);
  const ViewComponent =
    dashboardViewComponents[activeView] ?? DashboardOverviewSection;

  return (
    <DashboardLayout>
      <ViewComponent />
    </DashboardLayout>
  );
};

export { DashboardPage };
