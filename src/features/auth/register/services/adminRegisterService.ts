import { apiClient } from "@/shared/services/apiClient";
import type { CompleteProfileData, CompleteProfileResponse } from "../types/adminRegister.types";

export const adminRegisterService = {
  completeProfile: async (
    registrationId: string,
    fullName: string,
    nik: string,
    affiliation: string,
  ): Promise<CompleteProfileData> => {
    const res = await apiClient.post<CompleteProfileResponse>("/auth/register/admin/profile", {
      registration_id: registrationId,
      full_name: fullName,
      nik,
      affiliation,
    });
    return res.data;
  },
};
