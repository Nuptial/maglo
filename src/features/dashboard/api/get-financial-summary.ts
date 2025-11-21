import type { FinancialSummaryResponse } from "@/features/dashboard/api/types";
import { httpClient } from "@/lib/http-client";

const getFinancialSummary = async (accessToken: string) => {
  if (!accessToken) {
    throw new Error("Access token is required to fetch financial summary");
  }

  const { data: result } = await httpClient.get<FinancialSummaryResponse>(
    "/financial/summary"
  );

  if (!result.success || !result.data) {
    throw new Error(result.message || "Financial summary request failed");
  }

  return result.data;
};

export { getFinancialSummary };

