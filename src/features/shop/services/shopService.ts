import { apiClient } from "@/shared/services/apiClient";
import type { StoreDisbursementResponse, StoreGoodnessResponse, StoreProfileResponse } from "../types/shop.types";

export const shopService = {
  async getProfile(): Promise<StoreProfileResponse> {
    return apiClient.get<StoreProfileResponse>("/store/profile");
  },
  async getGoodness(): Promise<StoreGoodnessResponse> {
    return apiClient.get<StoreGoodnessResponse>("/store/goodness");
  },
  async getDisbursementDashboard(): Promise<StoreDisbursementResponse> {
    return apiClient.get<StoreDisbursementResponse>("/store/disbursements/dashboard");
  },
};
