import { apiClient } from "@/shared/services/apiClient";
import type { Posko } from "../types/crisisMap.types";

export const poskoService = {
  list: () => apiClient.get<Posko[]>("/posko"),
};
