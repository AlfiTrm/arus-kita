import { apiClient } from "@/shared/services/apiClient";
import type { DonorPostDetail, DonorPostDetailResponse } from "../types/donorPostDetail.types";

export const donorPostDetailService = {
  get: async (postId: string): Promise<DonorPostDetail> => {
    const res = await apiClient.get<DonorPostDetailResponse>(`/donor/dashboard/posts/${postId}`);
    return res.data;
  },
};
