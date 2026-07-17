import { apiClient } from "@/shared/services/apiClient";
import type { DashboardTransparencyResponse, TransparencyData } from "../types/transparency.types";

export const transparencyService = {
  get: async (): Promise<TransparencyData> => {
    const res = await apiClient.get<DashboardTransparencyResponse>("/dashboard/transparency");
    return res.data;
  },
};
