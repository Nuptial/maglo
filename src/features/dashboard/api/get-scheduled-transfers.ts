import { API_BASE_URL } from "@/config/env";
import type {
  ScheduledTransfer,
  ScheduledTransfersSummary,
} from "@/features/dashboard/types";

type ScheduledTransfersResponse = {
  success: boolean;
  message: string;
  data: {
    transfers: ScheduledTransfer[];
    summary: ScheduledTransfersSummary;
  };
};

const getScheduledTransfers = async (accessToken: string) => {
  if (!accessToken) {
    throw new Error("Access token is required to fetch scheduled transfers");
  }

  const response = await fetch(`${API_BASE_URL}/financial/transfers/scheduled`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch scheduled transfers");
  }

  const result = (await response.json()) as ScheduledTransfersResponse;

  if (!result.success || !result.data?.transfers) {
    throw new Error(result.message || "Scheduled transfers request failed");
  }

  return result.data;
};

export { getScheduledTransfers };

