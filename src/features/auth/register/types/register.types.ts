export type RegisterRole = "donatur" | "admin_posko" | "toko_mitra" | "relawan_kurir";

export const ROLE_LABELS: Record<RegisterRole, string> = {
  donatur: "Donatur",
  admin_posko: "Admin Posko",
  toko_mitra: "Toko Mitra",
  relawan_kurir: "Relawan Kurir",
};
