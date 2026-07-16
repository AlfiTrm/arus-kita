"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login({ email, password });
  }

  return (
    <div className="flex min-h-dvh w-full flex-col justify-center bg-surface px-6 py-12">
      <div className="mx-auto w-full max-w-sm">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-main text-white">
          <MapPin size={22} />
        </span>

        <h1 className="mt-6 text-2xl font-bold text-black">Selamat datang kembali 👋</h1>
        <p className="mt-2 text-sm text-black/60">
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
              className="rounded-full border border-black/10 px-5 py-3 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20"
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
              className="rounded-full border border-black/10 px-5 py-3 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20"
            />
          </label>

          <PressButton type="submit" variant="primary" disabled={isLoading} className="mt-2 w-full">
            {isLoading ? "Memproses..." : "Masuk"}
          </PressButton>

          {error && <p className="text-center text-sm text-error">{error}</p>}
        </form>

        <div className="mt-6 flex items-start gap-2 rounded-2xl bg-secondary px-4 py-3 text-xs text-black/70">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-main" />
          Peran akun (Donatur, Admin Posko, Toko, Kurir) terdeteksi otomatis — Anda diarahkan ke beranda yang
          sesuai.
        </div>

        <p className="mt-6 text-center text-sm text-black/60">
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold text-main">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
