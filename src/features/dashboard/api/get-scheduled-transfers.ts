import type {
  ScheduledTransfer,
  ScheduledTransfersSummary,
} from "@/features/dashboard/types";
import { httpClient } from "@/lib/http-client";

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

  const { data: result } =
    await httpClient.get<ScheduledTransfersResponse>(
      "/financial/transfers/scheduled"
    );

  if (!result.success || !result.data?.transfers) {
    throw new Error(result.message || "Scheduled transfers request failed");
  }

  return result.data;
};

export { getScheduledTransfers };

