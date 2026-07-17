import type { UrgencyLevel } from "../types/crisisMap.types";

export const URGENCY_COLOR_VAR: Record<UrgencyLevel, string> = {
  critical: "var(--color-error)",
  medium: "var(--color-warning)",
  low: "var(--color-caution)",
  funded: "var(--color-success)",
};

export const URGENCY_LABEL: Record<UrgencyLevel, string> = {
  critical: "Kritis",
  medium: "Sedang",
  low: "Rendah",
  funded: "Terdanai",
};
