import { apiClient } from "@/shared/services/apiClient";
import type {
  DashboardMapResponse,
  DashboardSummary,
  DashboardSummaryResponse,
  Posko,
} from "../types/crisisMap.types";

export const poskoService = {
  list: async (): Promise<Posko[]> => {
    const res = await apiClient.get<DashboardMapResponse>("/dashboard/map");
    return res.data.items;
  },
  summary: async (): Promise<DashboardSummary> => {
    const res = await apiClient.get<DashboardSummaryResponse>("/dashboard/summary");
    return res.data;
  },
};
