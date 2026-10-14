import { poskoService } from "../services/poskoService";

export function usePoskoList() {
  return poskoService.list();
}
