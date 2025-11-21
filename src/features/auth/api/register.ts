import { httpClient } from "@/lib/http-client";

type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
  };
};

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

