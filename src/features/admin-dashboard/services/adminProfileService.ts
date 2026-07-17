import { apiClient } from "@/shared/services/apiClient";
import type { AdminProfile, AdminProfileResponse } from "../types/adminProfile.types";

export const adminProfileService = {
  get: async (): Promise<AdminProfile> => {
    const res = await apiClient.get<AdminProfileResponse>("/admin/profile");
    return res.data;
  },
};
