import { API_BASE_URL } from "@/config/env";
import type { getProfileResponse } from "@/features/auth/types";

const getProfile = async (accessToken: string) => {
  if (!accessToken) {
    throw new Error("Access token is required to fetch profile");
  }

  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch profile");
  }

  const result = (await response.json()) as getProfileResponse;
  return result;
};

export { getProfile };

