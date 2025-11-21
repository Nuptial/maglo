import { API_BASE_URL } from "@/config/env";

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
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Unable to contact registration service");
  }

  const result = (await response.json()) as RegisterResponse;

  if (!result.success) {
    throw new Error(result.message || "Registration failed");
  }

  return result;
};

export { registerUser };

