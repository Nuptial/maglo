import type { GetProfileResponse } from "@/features/auth/api/types";
import { httpClient } from "@/lib/http-client";

const getProfile = async (accessToken: string) => {
  if (!accessToken) {
    throw new Error("Access token is required to fetch profile");
  }

  const { data } = await httpClient.get<GetProfileResponse>("/users/profile");
  return data;
};

export { getProfile };
