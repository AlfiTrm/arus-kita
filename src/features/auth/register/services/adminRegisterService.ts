import { apiClient } from "@/shared/services/apiClient";
import type {
  CompleteProfileData,
  CompleteProfileResponse,
  RequestOtpData,
  RequestOtpResponse,
  SetPasswordData,
  SetPasswordResponse,
  VerifyOtpData,
  VerifyOtpResponse,
} from "../types/adminRegister.types";

export const adminRegisterService = {
  requestOtp: async (email: string): Promise<RequestOtpData> => {
    const res = await apiClient.post<RequestOtpResponse>("/auth/register/admin/request-otp", { email });
    return res.data;
  },

  verifyOtp: async (registrationId: string, otpCode: string): Promise<VerifyOtpData> => {
    const res = await apiClient.post<VerifyOtpResponse>("/auth/register/admin/verify-otp", {
      registration_id: registrationId,
      otp_code: otpCode,
    });
    return res.data;
  },

  setPassword: async (registrationId: string, password: string, confirmPassword: string): Promise<SetPasswordData> => {
    const res = await apiClient.post<SetPasswordResponse>("/auth/register/admin/password", {
      registration_id: registrationId,
      password,
      confirm_password: confirmPassword,
    });
    return res.data;
  },

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
