"use client";

import { useState } from "react";
import PressButton from "@/shared/components/PressButton";

export function EmailStep({ onNext }: { onNext: (email: string) => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onNext(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim OTP");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 pb-28 pt-2">
      <h2 className="text-2xl font-bold text-black">Masukkan Email</h2>
      <p className="mt-1 text-sm text-black/50">Masukkan email aktif anda</p>

      <label className="mt-6 flex flex-col gap-1.5 text-sm font-medium text-black">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@email.com"
          required
          disabled={isLoading}
          className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20 disabled:opacity-50"
        />
      </label>

      {error && <p className="mt-3 text-sm text-error">{error}</p>}

      <div
        className="fixed inset-x-0 bottom-0 bg-surface px-6 pt-4"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <PressButton type="submit" variant="primary" className="w-full" disabled={isLoading}>
          {isLoading ? "Mengirim..." : "Verifikasi OTP"}
        </PressButton>
      </div>
    </form>
  );
}
