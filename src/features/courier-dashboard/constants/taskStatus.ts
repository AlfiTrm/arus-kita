export const TASK_STATUS_LABEL: Record<string, string> = {
  ready_for_pickup: "Siap diambil",
  picked_up: "Sudah diambil",
  in_transit: "Dalam perjalanan",
  delivered: "Terkirim",
};

export function getTaskStatusLabel(status: string): string {
  return TASK_STATUS_LABEL[status] ?? status.replace(/_/g, " ");
}
