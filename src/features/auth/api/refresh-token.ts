import type { RefreshTokenResult } from "@/features/auth/api/types";
import { API_BASE_URL } from "@/config/env";

/**
 * Refresh the access token using the refresh token stored in an httpOnly cookie.
 */
const refreshToken = async () => {
  const response = await fetch(`${API_BASE_URL}/users/refresh-token`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to refresh session");
  }

  const result = (await response.json()) as RefreshTokenResult;

  if (typeof result.accessToken === "string") {
    return { accessToken: result.accessToken };
  }

  throw new Error("Session refresh failed");
};

export { refreshToken };
