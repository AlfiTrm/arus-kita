import { distributionService } from "../services/distributionService";

export function useDistributionList() {
  return distributionService.list();
}
