"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/shared/services/authService";
import { clearSession } from "@/shared/utils/authSession";

export function useLogout() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function logout() {
    setIsLoggingOut(true);
    try {
      await authService.logout();
    } catch {
      // ignore — clear local session and redirect regardless of API outcome
    } finally {
      clearSession();
      router.push("/login");
    }
  }

  return { logout, isLoggingOut };
}
