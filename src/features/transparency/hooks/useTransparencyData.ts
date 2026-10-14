import { transparencyService } from "../services/transparencyService";

export function useTransparencyData() {
  return transparencyService.get();
}
