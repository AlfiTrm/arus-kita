"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PressButton from "@/shared/components/PressButton";

export function PasswordStep({ onNext }: { onNext: (password: string) => Promise<void> }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi tidak sama");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await onNext(password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 pb-28 pt-2">
      <h2 className="text-2xl font-bold text-black">Buat password</h2>

      <label className="mt-6 flex flex-col gap-1.5 text-sm font-medium text-black">
        Masukkan password
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            disabled={isLoading}
            className="w-full rounded-lg border border-black/10 px-4 py-3 pr-10 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40"
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <p className="text-justify text-xs leading-4 font-normal text-black/40">
          Minimal 8 karakter, mengandung 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 karakter spesial.
        </p>
      </label>

      <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium text-black">
        Konfirmasi password
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            disabled={isLoading}
            className="w-full rounded-lg border border-black/10 px-4 py-3 pr-10 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40"
            aria-label={showConfirm ? "Sembunyikan password" : "Tampilkan password"}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </label>

      {error && <p className="mt-3 text-sm text-error">{error}</p>}

      <div
        className="fixed inset-x-0 bottom-0 bg-surface px-6 pt-4"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <PressButton type="submit" variant="primary" className="w-full" disabled={isLoading}>
          {isLoading ? "Menyimpan..." : "Lanjut"}
        </PressButton>
      </div>
    </form>
  );
}
