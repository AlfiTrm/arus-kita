import { apiClient } from "@/shared/services/apiClient";
import type {
  SupplementalNeedData,
  SupplementalNeedItemInput,
  SupplementalNeedResponse,
} from "../types/adminSupplementalNeeds.types";

export const adminSupplementalNeedsService = {
  create: async (
    orderId: string,
    params: { reason: string; reservedAmountApplied: number; items: SupplementalNeedItemInput[] },
  ): Promise<SupplementalNeedData> => {
    const res = await apiClient.post<SupplementalNeedResponse>(`/admin/orders/${orderId}/supplemental-needs`, {
      reason: params.reason,
      reserved_amount_applied: params.reservedAmountApplied,
      items: params.items,
    });
    return res.data;
  },
};
