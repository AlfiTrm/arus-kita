import { apiClient } from "@/shared/services/apiClient";
import type { CompleteProfileData, CompleteProfileResponse } from "../types/adminRegister.types";

export const donorRegisterService = {
  completeProfile: async (
    registrationId: string,
    fullName: string,
    phoneNumber: string,
    donationPreferences: string[],
    consentAccepted: boolean,
  ): Promise<CompleteProfileData> => {
    const res = await apiClient.post<CompleteProfileResponse>("/auth/register/donor/profile", {
      registration_id: registrationId,
      full_name: fullName,
      phone_number: phoneNumber,
      donation_preferences: donationPreferences,
      consent_accepted: consentAccepted,
    });
    return res.data;
  },
};
