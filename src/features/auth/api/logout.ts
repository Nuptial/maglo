import { API_BASE_URL } from "@/config/env";

type LogoutResponse = {
  success: boolean;
  message: string;
};

const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/users/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to logout");
  }

  if (response.status === 204) {
    return { success: true, message: "Logged out" };
  }

  const result = (await response.json()) as LogoutResponse;

  if (!result.success) {
    throw new Error(result.message || "Unable to logout");
  }

  return result;
};

export { logoutUser };

