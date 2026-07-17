import { apiClient } from "@/shared/services/apiClient";
import type { DashboardDistributionsResponse, Distribution } from "../types/distribution.types";

export const distributionService = {
  list: async (): Promise<Distribution[]> => {
    const res = await apiClient.get<DashboardDistributionsResponse>("/dashboard/distributions");
    return res.data.items;
  },
};
