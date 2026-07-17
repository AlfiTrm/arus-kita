import { apiClient } from "@/shared/services/apiClient";
import type { LoginData, LoginPayload, LoginResponse } from "../types/login.types";

export const loginService = {
  login: async (payload: LoginPayload): Promise<LoginData> => {
    const res = await apiClient.post<LoginResponse>("/auth/login", payload);
    return res.data;
  },
};
