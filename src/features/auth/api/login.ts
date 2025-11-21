type LoginRequest = {
  email: string;
  password: string;
};

import type { AuthUser } from "@/features/auth/types";
import { httpClient } from "@/lib/http-client";

type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    accessToken: string;
  };
};

const login = async (payload: LoginRequest) => {
  const { data: result } = await httpClient.post<LoginResponse>(
    "/users/login",
    payload
  );

  if (!result.success) {
    throw new Error(result.message || "Login failed");
  }

  return result.data;
};

export { login };

