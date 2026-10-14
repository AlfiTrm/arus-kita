import { poskoService } from "../services/poskoService";

export function useDashboardSummary() {
  return poskoService.summary();
}
