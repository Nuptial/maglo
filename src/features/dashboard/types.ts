type TrendDirection = "up" | "down";

type DashboardStat = {
  id: string;
  label: string;
  value: string;
  helper: string;
  change: string;
  trend: TrendDirection;
};

type WorkingCapitalDatum = {
  dateLabel: string;
  income: number;
  expenses: number;
  highlight?: boolean;
  displayValue?: string;
};

type RecentTransaction = {
  id: string;
  title: string;
  business: string;
  type: string;
  amount: string;
  dateLabel: string;
  logoUrl: string;
  logoBg: string;
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

type ScheduledTransfer = {
  id: string;
  recipient: string;
  bank: string;
  timeLabel: string;
  amount: string;
  direction: "in" | "out";
  status: "Scheduled" | "Completed" | "Processing";
};

import type { ReactNode } from "react";

type NavLink = {
  id: string;
  label: string;
  icon: ReactNode;
  isActive?: boolean;
  section?: "primary" | "secondary";
};

export type {
  DashboardStat,
  NavLink,
  RecentTransaction,
  ScheduledTransfer,
  TrendDirection,
  WalletCard,
  WorkingCapitalDatum,
};

