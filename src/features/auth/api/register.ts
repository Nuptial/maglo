import type {
  RegisterRequest,
  RegisterResponse,
} from "@/features/auth/api/types";
import { httpClient } from "@/lib/http-client";

const registerUser = async (payload: RegisterRequest) => {
  const { data: result } = await httpClient.post<RegisterResponse>(
    "/users/register",
    payload
  );

  if (!result.success) {
    throw new Error(result.message || "Registration failed");
  }

  return result;
};

export { registerUser };

