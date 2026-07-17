import { apiClient } from "@/shared/services/apiClient";
import type { 
  StoreDisbursementResponse, 
  StoreGoodnessResponse, 
  StoreOrdersResponse, 
  StoreProfileResponse,
  StoreOrderAcceptResponse,
  StoreOrderDetailResponse,
  StoreOrderReadyResponse
} from "../types/shop.types";

export const shopService = {
  async getProfile(signal?: AbortSignal): Promise<StoreProfileResponse> {
    return apiClient.get<StoreProfileResponse>("/store/profile", { signal });
  },
  async getGoodness(signal?: AbortSignal): Promise<StoreGoodnessResponse> {
    return apiClient.get<StoreGoodnessResponse>("/store/goodness", { signal });
  },
  async getDisbursementDashboard(signal?: AbortSignal): Promise<StoreDisbursementResponse> {
    return apiClient.get<StoreDisbursementResponse>("/store/disbursements/dashboard", { signal });
  },
  async getOrders(signal?: AbortSignal): Promise<StoreOrdersResponse> {
    return apiClient.get<StoreOrdersResponse>("/store/orders", { signal });
  },
  async acceptOrder(orderId: string, signal?: AbortSignal): Promise<StoreOrderAcceptResponse> {
    return apiClient.post<StoreOrderAcceptResponse>(`/store/orders/${orderId}/accept`, undefined, { signal });
  },
  async getOrderDetail(orderId: string, signal?: AbortSignal): Promise<StoreOrderDetailResponse> {
    return apiClient.get<StoreOrderDetailResponse>(`/store/orders/${orderId}`, { signal });
  },
  async markOrderReady(orderId: string, signal?: AbortSignal): Promise<StoreOrderReadyResponse> {
    return apiClient.post<StoreOrderReadyResponse>(`/store/orders/${orderId}/ready`, undefined, { signal });
  },
};
