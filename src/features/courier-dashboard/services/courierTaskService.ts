import { apiClient } from "@/shared/services/apiClient";
import type {
  CourierArrivedData,
  CourierArrivedPostData,
  CourierArrivedPostResponse,
  CourierArrivedResponse,
  CourierHandoffTokenData,
  CourierHandoffTokenResponse,
  CourierTaskClaimData,
  CourierTaskClaimResponse,
  CourierTaskDetail,
  CourierTaskDetailResponse,
  CourierTaskListData,
  CourierTaskListResponse,
} from "../types/courierTask.types";

export const courierTaskService = {
  list: async (params: { lat: number; lng: number; status?: string }): Promise<CourierTaskListData> => {
    const query = new URLSearchParams({
      lat: String(params.lat),
      lng: String(params.lng),
      ...(params.status ? { status: params.status } : {}),
    });
    const res = await apiClient.get<CourierTaskListResponse>(`/courier/tasks?${query.toString()}`);
    return res.data;
  },

  detail: async (orderId: string): Promise<CourierTaskDetail> => {
    const res = await apiClient.get<CourierTaskDetailResponse>(`/courier/tasks/${orderId}`);
    return res.data;
  },

  claim: async (orderId: string): Promise<CourierTaskClaimData> => {
    const res = await apiClient.post<CourierTaskClaimResponse>(`/courier/tasks/${orderId}/claim`);
    return res.data;
  },

  arrived: async (orderId: string): Promise<CourierArrivedData> => {
    const res = await apiClient.post<CourierArrivedResponse>(`/courier/tasks/${orderId}/arrived`);
    return res.data;
  },

  arrivedPost: async (orderId: string): Promise<CourierArrivedPostData> => {
    const res = await apiClient.post<CourierArrivedPostResponse>(`/courier/tasks/${orderId}/arrived-post`);
    return res.data;
  },

  handoffToken: async (orderId: string): Promise<CourierHandoffTokenData> => {
    const res = await apiClient.post<CourierHandoffTokenResponse>(`/courier/tasks/${orderId}/handoff-token`);
    return res.data;
  },
};
