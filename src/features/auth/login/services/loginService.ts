import { apiClient } from "@/shared/services/apiClient";
import type { LoginPayload, LoginResponse } from "../types/login.types";

export const loginService = {
  login: (payload: LoginPayload) => apiClient.post<LoginResponse>("/auth/login", payload),
};
