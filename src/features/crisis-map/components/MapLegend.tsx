export function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-1000 rounded-lg bg-surface/95 p-3 text-xs shadow-lg backdrop-blur">
      <p className="mb-1 font-semibold text-black">Urgensi = % kebutuhan terdanai</p>
      <div className="h-2 w-40 rounded-full bg-gradient-to-r from-error via-warning to-success" />
      <div className="mt-1 flex justify-between text-black/60">
        <span>0% kritis</span>
        <span>100% terdanai</span>
      </div>
    </div>
  );
}
