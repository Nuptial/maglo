import { API_BASE_URL } from "@/config/env";
import type { WalletCardApi } from "@/features/dashboard/types";

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

  const response = await fetch(`${API_BASE_URL}/financial/wallet`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch wallet cards");
  }

  const result = (await response.json()) as WalletCardsResponse;

  if (!result.success || !result.data?.cards) {
    throw new Error(result.message || "Wallet cards request failed");
  }

  return result.data.cards;
};

export { getWalletCards };

