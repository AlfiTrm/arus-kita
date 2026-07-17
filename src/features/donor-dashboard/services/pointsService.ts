import { apiClient } from "@/shared/services/apiClient";
import type { PointsDashboard, PointsDashboardResponse } from "../types/points.types";

export const pointsService = {
  get: async (historyLimit = 5, rewardLimit = 5): Promise<PointsDashboard> => {
    const res = await apiClient.get<PointsDashboardResponse>(
      `/donor/points?history_limit=${historyLimit}&reward_limit=${rewardLimit}`,
    );
    return res.data;
  },
};
