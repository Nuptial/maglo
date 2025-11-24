type TrendDirection = "up" | "down";

type DashboardStat = {
  id: string;
  label: string;
  value: string;
  helper: string;
  change: string;
  trend: TrendDirection;
};

type FinancialSummary = {
  totalBalance: {
    amount: number;
    currency: string;
    change: {
      percentage: number;
      trend: TrendDirection;
    };
  };
  totalExpense: {
    amount: number;
    currency: string;
    change: {
      percentage: number;
      trend: TrendDirection;
    };
  };
  totalSavings: {
    amount: number;
    currency: string;
    change: {
      percentage: number;
      trend: TrendDirection;
    };
  };
  lastUpdated: string;
};

type WorkingCapitalDatum = {
  dateLabel: string;
  income: number;
  expenses: number;
  net: number;
  highlight?: boolean;
  displayValue?: string;
};

type WorkingCapitalApiDatum = {
  month: string;
  income: number;
  expense: number;
  net: number;
};

type WorkingCapitalSummary = {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
};

type WorkingCapitalReport = {
  period: string;
  currency: string;
  data: WorkingCapitalApiDatum[];
  summary: WorkingCapitalSummary;
};

type RecentTransaction = {
  id: string;
  name: string;
  business: string;
  image: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
  status: string;
};

type RecentTransactionsSummary = {
  totalIncome: number;
  totalExpense: number;
  count: number;
};

type WalletCard = {
  id: string;
  bank: string;
  number: string;
  expiry: string;
  brand: "visa" | "mastercard";
  background: string;
  textColor: string;
  accentColor: string;
  chipBg: string;
  contactlessColor: string;
};

type WalletCardApi = {
  id: string;
  name: string;
  type: string;
  cardNumber: string;
  bank: string;
  network: string;
  expiryMonth: number;
  expiryYear: number;
  color: string;
  isDefault: boolean;
};

type ScheduledTransferStatus = "scheduled" | "processing" | "completed";

type ScheduledTransfer = {
  id: string;
  name: string;
  image: string | null;
  date: string;
  amount: number;
  currency: string;
  status: ScheduledTransferStatus;
};

type ScheduledTransfersSummary = {
  totalScheduledAmount: number;
  count: number;
};

import type { ComponentType } from "react";

type DashboardView =
  | "dashboard"
  | "transactions"
  | "invoices"
  | "wallets"
  | "settings"
  | "help";

type NavLink = {
  id: string;
  label: string;
  icon: ComponentType<{ color?: string }>;
  view?: DashboardView;
  section?: "primary" | "secondary";
};

export type {
  DashboardStat,
  FinancialSummary,
  DashboardView,
  NavLink,
  RecentTransaction,
  RecentTransactionsSummary,
  ScheduledTransfer,
  ScheduledTransfersSummary,
  TrendDirection,
  WalletCard,
  WalletCardApi,
  WorkingCapitalApiDatum,
  WorkingCapitalReport,
  WorkingCapitalSummary,
  WorkingCapitalDatum,
};

