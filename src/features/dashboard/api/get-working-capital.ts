import type { WorkingCapitalResponse } from "@/features/dashboard/api/types";
import { httpClient } from "@/lib/http-client";

const getWorkingCapital = async (accessToken: string) => {
  if (!accessToken) {
    throw new Error("Access token is required to fetch working capital data");
  }

  const { data: result } = await httpClient.get<WorkingCapitalResponse>(
    "/financial/working-capital"
  );
  if (!result.success || !result.data) {
    throw new Error(result.message || "Working capital request failed");
  }

  return result.data;
};

export { getWorkingCapital };

