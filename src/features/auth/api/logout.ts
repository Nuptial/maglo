import { httpClient } from "@/lib/http-client";

type LogoutResponse = {
  success: boolean;
  message: string;
};

const logoutUser = async () => {
  const response = await httpClient.post<LogoutResponse | undefined>(
    "/users/logout"
  );

  if (!response.data) {
    return { success: true, message: "Logged out" };
  }

  if (!response.data.success) {
    throw new Error(response.data.message || "Unable to logout");
  }

  return response.data;
};

export { logoutUser };

