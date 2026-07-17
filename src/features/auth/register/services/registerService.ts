import { apiClient } from "@/shared/services/apiClient";
import type {
  RequestOtpData,
  RequestOtpResponse,
  SetPasswordData,
  SetPasswordResponse,
  VerifyOtpData,
  VerifyOtpResponse,
} from "../types/adminRegister.types";

export const registerService = {
  requestOtp: async (role: string, email: string): Promise<RequestOtpData> => {
    const res = await apiClient.post<RequestOtpResponse>("/auth/register/request-otp", { email, role });
    return res.data;
  },

  verifyOtp: async (registrationId: string, otpCode: string): Promise<VerifyOtpData> => {
    const res = await apiClient.post<VerifyOtpResponse>("/auth/register/verify-otp", {
      registration_id: registrationId,
      otp_code: otpCode,
    });
    return res.data;
  },

  setPassword: async (
    registrationId: string,
    password: string,
    confirmPassword: string,
  ): Promise<SetPasswordData> => {
    const res = await apiClient.post<SetPasswordResponse>("/auth/register/password", {
      registration_id: registrationId,
      password,
      confirm_password: confirmPassword,
    });
    return res.data;
  },

  setAdminPassword: async (
    registrationId: string,
    password: string,
    confirmPassword: string,
  ): Promise<SetPasswordData> => {
    const res = await apiClient.post<SetPasswordResponse>("/auth/register/admin/password", {
      registration_id: registrationId,
      password,
      confirm_password: confirmPassword,
    });
    return res.data;
  },
};
