import type {
  RecentTransaction,
  RecentTransactionsSummary,
} from "@/features/dashboard/types";
import { httpClient } from "@/lib/http-client";

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

const getRecentTransactions = async ({
  limit,
  accessToken,
}: RecentTransactionsPayload) => {
  if (!Number.isFinite(limit) || limit <= 0) {
    throw new Error("Limit must be a positive number");
  }

  if (!accessToken) {
    throw new Error("Access token is required to fetch recent transactions");
  }

  const searchParams = new URLSearchParams({ limit: limit.toString() });
  const { data: result } =
    await httpClient.get<RecentTransactionsResponse>(
      `/financial/transactions/recent?${searchParams.toString()}`
    );

  if (!result.success || !result.data?.transactions) {
    throw new Error(result.message || "Recent transactions request failed");
  }

  return result.data;
};

export { getRecentTransactions };
export type { RecentTransactionsPayload, RecentTransactionsResponse };

