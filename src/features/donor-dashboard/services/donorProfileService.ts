import { apiClient } from "@/shared/services/apiClient";
import type { DonorProfile, DonorProfileResponse } from "../types/donorProfile.types";

export const donorProfileService = {
  get: async (): Promise<DonorProfile> => {
    const res = await apiClient.get<DonorProfileResponse>("/donor/profile");
    return res.data;
  },
};
