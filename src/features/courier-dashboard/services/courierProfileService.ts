import { apiClient } from "@/shared/services/apiClient";
import type { CourierProfileData, CourierProfileResponse } from "../types/courierProfile.types";

export const courierProfileService = {
  get: async (): Promise<CourierProfileData> => {
    const res = await apiClient.get<CourierProfileResponse>("/courier/profile");
    return res.data;
  },
};
