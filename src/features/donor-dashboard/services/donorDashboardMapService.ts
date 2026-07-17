import { apiClient } from "@/shared/services/apiClient";
import type { DonorDashboardMapData, DonorDashboardMapResponse } from "../types/donorMap.types";

export const donorDashboardMapService = {
  get: async (): Promise<DonorDashboardMapData> => {
    const res = await apiClient.get<DonorDashboardMapResponse>("/donor/dashboard/map");
    return res.data;
  },
};
