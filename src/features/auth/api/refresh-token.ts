import { API_BASE_URL } from "@/config/env";

type RefreshTokenResult = {
  accessToken: string;
};

/**
 * Refresh the access token using the refresh token stored in an httpOnly cookie.
 *
 * If an accessToken is provided, it will be sent as a Bearer token in the
 * Authorization header (for backends that optionally require it). If it is
 * omitted or null, only the cookie will be used.
 */
const refreshToken = async (accessToken?: string | null) => {
  const headers: HeadersInit = {};

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/users/refresh-token`, {
    method: "POST",
    credentials: "include",
    headers,
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
