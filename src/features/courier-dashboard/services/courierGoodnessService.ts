import { apiClient } from "@/shared/services/apiClient";
import type { CourierGoodnessData, CourierGoodnessResponse } from "../types/courierGoodness.types";

export const courierGoodnessService = {
  get: async (params: { year?: number; limit?: number; offset?: number } = {}): Promise<CourierGoodnessData> => {
    const query = new URLSearchParams();
    if (params.year !== undefined) query.set("year", String(params.year));
    query.set("limit", String(params.limit ?? 10));
    query.set("offset", String(params.offset ?? 0));

    const res = await apiClient.get<CourierGoodnessResponse>(`/courier/goodness?${query.toString()}`);
    return res.data;
  },
};
