import { apiClient } from "@/shared/services/apiClient";
import type { CompleteStoreProfileData, CompleteStoreProfileResponse } from "../types/tokoRegister.types";

export const tokoRegisterService = {
  completeProfile: async (payload: {
    registration_id: string;
    store_name: string;
    owner_name: string;
    nib: string;
    npwp: string;
    ktp_file: File | null;
    bank_name: string;
    bank_account_no: string;
    bank_account_name: string;
    categories: string[];
    address: string;
    latitude: number;
    longitude: number;
  }): Promise<CompleteStoreProfileData> => {
    const formData = new FormData();
    formData.append("registration_id", payload.registration_id);
    formData.append("store_name", payload.store_name);
    formData.append("owner_name", payload.owner_name);
    formData.append("nib", payload.nib);
    formData.append("npwp", payload.npwp);
    if (payload.ktp_file) {
      formData.append("ktp_image", payload.ktp_file);
    }
    formData.append("bank_name", payload.bank_name);
    formData.append("bank_account_no", payload.bank_account_no);
    formData.append("bank_account_name", payload.bank_account_name);
    payload.categories.forEach((cat) => formData.append("categories[]", cat));
    formData.append("address", payload.address);
    formData.append("latitude", payload.latitude.toString());
    formData.append("longitude", payload.longitude.toString());

    const res = await apiClient.post<CompleteStoreProfileResponse>("/auth/register/store/profile", formData);
    return res.data;
  },
};
