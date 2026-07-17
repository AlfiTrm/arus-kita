import { apiClient } from "@/shared/services/apiClient";
import type { CompleteCourierProfileData, CompleteCourierProfileResponse } from "../types/courierRegister.types";

export const courierRegisterService = {
  completeProfile: async (payload: {
    registration_id: string;
    full_name: string;
    nik: string;
    vehicle_type: string;
    vehicle_capacity_kg: number;
    operational_area: string;
    operation_radius_km: number;
    waiver_accepted: boolean;
  }): Promise<CompleteCourierProfileData> => {
    const res = await apiClient.post<CompleteCourierProfileResponse>("/auth/register/courier/profile", payload);
    return res.data;
  },
};
