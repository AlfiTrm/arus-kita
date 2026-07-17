import { Check } from "lucide-react";

const MARKERS = [
  { top: "22%", left: "18%", color: "bg-error", label: "4%" },
  { top: "38%", left: "62%", color: "bg-warning", label: "64%" },
  { top: "20%", left: "88%", color: "bg-success", label: null },
];

export function HeroMapPreview() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-secondary/40">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--color-main) 15%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-main) 15%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <line
          x1="18%"
          y1="22%"
          x2="88%"
          y2="20%"
          stroke="white"
          strokeWidth={4}
          strokeDasharray="1 14"
          strokeLinecap="round"
        />
      </svg>

      {MARKERS.map((marker, i) => (
        <span
          key={i}
          className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white shadow ${marker.color}`}
          style={{ top: marker.top, left: marker.left }}
        >
          {marker.label ?? <Check size={14} />}
        </span>
      ))}

      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-surface px-4 py-3 shadow-lg">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-lg">
          📷
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-black">Bukti foto tiba di Posko Cianjur</p>
          <p className="truncate text-xs text-black/50">GPS valid · 14:32 WIB · hash 0xf40a...7d21</p>
        </div>
        <span className="shrink-0 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
          ✓ SAMPAI
        </span>
      </div>
    </div>
  );
}
