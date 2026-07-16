"use client";

import { useState } from "react";
import { loginService } from "../services/loginService";
import type { LoginPayload } from "../types/login.types";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(payload: LoginPayload) {
    setIsLoading(true);
    setError(null);
    try {
      return await loginService.login(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading, error };
}
