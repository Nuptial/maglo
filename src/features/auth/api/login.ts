type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      fullName: string;
      email: string;
      role: string;
      isActive: boolean;
      lastLoginAt: string;
      lastLoginIP: string;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
  };
};

import { API_BASE_URL } from "@/config/env";

const login = async (payload: LoginRequest) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Unable to contact login service");
  }

  const result = (await response.json()) as LoginResponse;

  if (!result.success) {
    throw new Error(result.message || "Login failed");
  }

  return result.data;
};

export { login };

