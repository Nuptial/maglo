import { API_BASE_URL } from "@/config/env";
import type {
  RecentTransaction,
  RecentTransactionsSummary,
} from "@/features/dashboard/types";

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
  const response = await fetch(
    `${API_BASE_URL}/financial/transactions/recent?${searchParams.toString()}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Unable to fetch recent transactions");
  }

  const result = (await response.json()) as RecentTransactionsResponse;

  if (!result.success || !result.data?.transactions) {
    throw new Error(result.message || "Recent transactions request failed");
  }

  return result.data;
};

export { getRecentTransactions };
export type { RecentTransactionsPayload, RecentTransactionsResponse };

