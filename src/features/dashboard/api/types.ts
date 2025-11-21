import type {
  FinancialSummary,
  RecentTransaction,
  RecentTransactionsSummary,
  ScheduledTransfer,
  ScheduledTransfersSummary,
  WalletCardApi,
  WorkingCapitalReport,
} from "@/features/dashboard/types";

type WalletCardsResponse = {
  success: boolean;
  message: string;
  data: {
    cards: WalletCardApi[];
  };
};

type FinancialSummaryResponse = {
  success: boolean;
  message: string;
  data: FinancialSummary;
};

type RecentTransactionsPayload = {
  limit: number;
  accessToken: string;
};

type RecentTransactionsResponse = {
  success: boolean;
  message: string;
  data: {
    transactions: RecentTransaction[];
    summary: RecentTransactionsSummary;
  };
};

type ScheduledTransfersResponse = {
  success: boolean;
  message: string;
  data: {
    transfers: ScheduledTransfer[];
    summary: ScheduledTransfersSummary;
  };
};

type WorkingCapitalResponse = {
  success: boolean;
  message: string;
  data: WorkingCapitalReport;
};

export type {
  FinancialSummaryResponse,
  RecentTransactionsPayload,
  RecentTransactionsResponse,
  ScheduledTransfersResponse,
  WalletCardsResponse,
  WorkingCapitalResponse,
};

