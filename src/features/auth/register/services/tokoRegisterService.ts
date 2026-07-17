import { apiClient } from "@/shared/services/apiClient";
import type { CompleteStoreProfileData, CompleteStoreProfileResponse } from "../types/tokoRegister.types";

export const tokoRegisterService = {
  completeProfile: async (payload: {
    registration_id: string;
    store_name: string;
    owner_name: string;
    nib: string;
    npwp: string;
    ktp_image_url: string;
    bank_name: string;
    bank_account_no: string;
    bank_account_name: string;
    categories: string[];
    address: string;
    latitude: number;
    longitude: number;
  }): Promise<CompleteStoreProfileData> => {
    const res = await apiClient.post<CompleteStoreProfileResponse>("/auth/register/store/profile", payload);
    return res.data;
  },
};
