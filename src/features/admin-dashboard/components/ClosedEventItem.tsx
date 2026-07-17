import type { DashboardEvent } from "../types/adminDashboard.types";

export function ClosedEventItem({ event }: { event: DashboardEvent }) {
  return (
    <div className="mx-6 mt-3 flex items-center justify-between rounded-2xl border border-black/5 bg-white px-4 py-3.5">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-black">
          {event.title} <span className="font-normal text-black/40">· {event.event_code}</span>
        </p>
        <p className="truncate text-xs text-black/50">{event.summary_text}</p>
      </div>
      <span className="ml-2 shrink-0 rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-bold text-black/50">
        {event.status_label}
      </span>
    </div>
  );
}
