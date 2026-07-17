import { apiClient } from "@/shared/services/apiClient";

interface LogoutResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: { logged_out: boolean };
}

export const authService = {
  logout: async (): Promise<void> => {
    await apiClient.post<LogoutResponse>("/auth/logout");
  },
};
