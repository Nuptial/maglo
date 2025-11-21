import type { WalletCardApi } from "@/features/dashboard/types";
import { httpClient } from "@/lib/http-client";

type WalletCardsResponse = {
  success: boolean;
  message: string;
  data: {
    cards: WalletCardApi[];
  };
};

const getWalletCards = async (accessToken: string) => {
  if (!accessToken) {
    throw new Error("Access token is required to fetch wallet cards");
  }

  const { data: result } = await httpClient.get<WalletCardsResponse>(
    "/financial/wallet"
  );

  if (!result.success || !result.data?.cards) {
    throw new Error(result.message || "Wallet cards request failed");
  }

  return result.data.cards;
};

export { getWalletCards };

