import { API_BASE_URL } from "@/config/env";
import type { WorkingCapitalReport } from "@/features/dashboard/types";

type WorkingCapitalResponse = {
  success: boolean;
  message: string;
  data: WorkingCapitalReport;
};

const getWorkingCapital = async (accessToken: string) => {
  if (!accessToken) {
    throw new Error("Access token is required to fetch working capital data");
  }

  const response = await fetch(`${API_BASE_URL}/financial/working-capital`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch working capital data");
  }

  const result = (await response.json()) as WorkingCapitalResponse;
  if (!result.success || !result.data) {
    throw new Error(result.message || "Working capital request failed");
  }

  return result.data;
};

export { getWorkingCapital };

