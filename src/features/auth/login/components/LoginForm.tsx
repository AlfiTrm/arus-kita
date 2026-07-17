"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, ShieldCheck } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { setToken } from "@/shared/utils/authSession";
import { decodeJwtPayload } from "@/shared/utils/jwt";
import { useLogin } from "../hooks/useLogin";
import type { LoginJwtPayload } from "../types/login.types";

const ROLE_REDIRECT: Record<string, string> = {
  admin: "/dashboard/admin",
  donor: "/dashboard/donatur",
  toko: "/dashboard/toko",
  toko_mitra: "/dashboard/toko",
  store: "/dashboard/toko",
};

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const [roleError, setRoleError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRoleError(null);
    try {
      const result = await login({ email, password });
      setToken(result.token);

      const claims = decodeJwtPayload<LoginJwtPayload>(result.token);
      const redirectPath = claims ? ROLE_REDIRECT[claims.role_name] : undefined;

      if (redirectPath) {
        router.push(redirectPath);
      } else {
        setRoleError("Peran akun ini belum didukung di aplikasi.");
      }
    } catch {
      // error state already handled by useLogin
    }
  }

  return (
    <div className="relative min-h-dvh w-full bg-surface px-6 pb-28 pt-14">
      <div className="mx-auto w-full max-w-sm">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-main text-white">
          <MapPin size={26} />
        </span>

        <h1 className="mt-6 text-3xl font-bold leading-tight text-black">Selamat datang kembali 👋</h1>
        <p className="mt-2 text-base text-black/60">
          Masuk dengan email & password akun Anda — satu akun untuk semua peran Anda.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-black">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
              className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-black">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20"
            />
          </label>

          <PressButton type="submit" variant="primary" disabled={isLoading} className="mt-2 w-full">
            {isLoading ? "Memproses..." : "Masuk"}
          </PressButton>

          {(error || roleError) && <p className="text-center text-sm text-error">{error ?? roleError}</p>}
        </form>

        <div className="mt-6 flex items-start gap-2 rounded-2xl bg-secondary px-4 py-3 text-xs text-black/70">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-main" />
          Peran akun (Donatur, Admin Posko, Toko, Kurir) terdeteksi otomatis — Anda diarahkan ke beranda yang
          sesuai.
        </div>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 border-t border-black/5 bg-surface px-6 pt-4 text-center text-sm text-black/60"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        Belum punya akun?{" "}
        <Link href="/register" className="font-semibold text-main">
          Daftar
        </Link>
      </div>
    </div>
  );
}
