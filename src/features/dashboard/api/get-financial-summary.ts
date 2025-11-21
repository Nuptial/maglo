import { API_BASE_URL } from "@/config/env";
import type { FinancialSummary } from "@/features/dashboard/types";

type FinancialSummaryResponse = {
  success: boolean;
  message: string;
  data: FinancialSummary;
};

const getFinancialSummary = async (accessToken: string) => {
  if (!accessToken) {
    throw new Error("Access token is required to fetch financial summary");
  }

  const response = await fetch(`${API_BASE_URL}/financial/summary`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch financial summary");
  }

  const result = (await response.json()) as FinancialSummaryResponse;

  if (!result.success || !result.data) {
    throw new Error(result.message || "Financial summary request failed");
  }

  return result.data;
};

export { getFinancialSummary };

