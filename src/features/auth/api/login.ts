import type {
  LoginRequest,
  LoginResponse,
} from "@/features/auth/api/types";
import { httpClient } from "@/lib/http-client";

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

