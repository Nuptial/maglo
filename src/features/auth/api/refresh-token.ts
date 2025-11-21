import { API_BASE_URL } from "@/config/env";

type RefreshTokenResult =
  | {
      accessToken: string;
    }
  | {
    success?: boolean;
    message?: string;
    data?: {
      accessToken: string;
    };
  };

const refreshToken = async (accessToken: string) => {
  if (!accessToken) {
    throw new Error("Access token is required to refresh session");
  }

  const response = await fetch(`${API_BASE_URL}/users/refresh-token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to refresh session");
  }

  const result = (await response.json()) as RefreshTokenResult;

  if ("accessToken" in result && typeof result.accessToken === "string") {
    return { accessToken: result.accessToken };
  }

  if (result.data?.accessToken) {
    return { accessToken: result.data.accessToken };
  }

  throw new Error("Session refresh failed");
};

export { refreshToken };

