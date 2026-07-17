export function QrScanFrame({ hint }: { hint: string }) {
  return (
    <div className="relative h-56 w-56">
      <span className="absolute top-0 left-0 h-8 w-8 rounded-tl-2xl border-t-2 border-l-2 border-white/80" />
      <span className="absolute top-0 right-0 h-8 w-8 rounded-tr-2xl border-t-2 border-r-2 border-white/80" />
      <span className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-2xl border-b-2 border-l-2 border-white/80" />
      <span className="absolute right-0 bottom-0 h-8 w-8 rounded-br-2xl border-r-2 border-b-2 border-white/80" />
      <span className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-main/80" />
      <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[10px] tracking-wide text-white/40">
        {hint}
      </span>
    </div>
  );
}
