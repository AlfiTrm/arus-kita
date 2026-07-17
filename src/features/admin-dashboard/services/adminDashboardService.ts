import { apiClient } from "@/shared/services/apiClient";
import type { AdminDashboardData, AdminDashboardResponse } from "../types/adminDashboard.types";

export const adminDashboardService = {
  get: async (): Promise<AdminDashboardData> => {
    const res = await apiClient.get<AdminDashboardResponse>("/admin/dashboard");
    return res.data;
  },
};
