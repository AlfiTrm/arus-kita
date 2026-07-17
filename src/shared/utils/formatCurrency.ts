export function formatRupiah(value: number): string {
  return `Rp${value.toLocaleString("id-ID")}`;
}

export function formatRupiahCompact(value: number): string {
  if (value >= 1_000_000) {
    return `Rp${(value / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt`;
  }
  if (value >= 1_000) {
    return `Rp${Math.round(value / 1_000)} rb`;
  }
  return `Rp${value}`;
}
