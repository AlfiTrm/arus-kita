"use client";

import { useState } from "react";
import { Landmark, QrCode } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import type { PaymentMethod } from "../types/donationPayment.types";

const PRESET_AMOUNTS = [50000, 100000, 250000];
const MIN_AMOUNT = 10000;

function formatAmountInput(value: number): string {
  return value > 0 ? value.toLocaleString("id-ID") : "";
}

export function DonationForm({
  onSubmit,
  isSubmitting,
  submitError,
}: {
  onSubmit: (amount: number, method: PaymentMethod, autonomous: boolean) => void;
  isSubmitting: boolean;
  submitError: string | null;
}) {
  const [amount, setAmount] = useState(100000);
  const [method, setMethod] = useState<PaymentMethod>("qris");
  const [autonomous, setAutonomous] = useState(true);

  const isBelowMin = amount > 0 && amount < MIN_AMOUNT;

  function handleAmountChange(raw: string) {
    const digits = raw.replace(/\D/g, "");
    setAmount(digits ? Number(digits) : 0);
  }

  return (
    <div className="px-6 pb-32 pt-4">
      <div className="rounded-2xl border border-black/5 bg-white p-4">
        <p className="text-sm font-semibold text-black">Nominal donasi</p>

        <div
          className={`mt-3 flex items-center gap-2 rounded-xl border px-4 py-4 ${
            isBelowMin ? "border-error" : "border-main"
          }`}
        >
          <span className="text-xl font-bold text-black">Rp</span>
          <input
            value={formatAmountInput(amount)}
            onChange={(e) => handleAmountChange(e.target.value)}
            inputMode="numeric"
            placeholder="0"
            className="w-full bg-transparent text-xl font-bold text-black outline-none"
          />
        </div>
        <p className={`mt-1.5 text-xs ${isBelowMin ? "text-error" : "text-black/40"}`}>
          Minimal donasi Rp10.000
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                amount === preset ? "border-main bg-main/10 text-main" : "border-black/10 text-black/60"
              }`}
            >
              Rp{preset / 1000}rb
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-black/5 bg-white p-4">
        <p className="text-sm font-semibold text-black">Metode pembayaran</p>

        <div className="mt-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setMethod("qris")}
            className={`flex items-center gap-3 rounded-xl border p-3 text-left ${
              method === "qris" ? "border-main bg-main/5" : "border-black/10"
            }`}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-main">
              <QrCode size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-black">QRIS</p>
              <p className="text-xs text-black/50">Semua e-wallet & m-banking</p>
            </div>
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                method === "qris" ? "border-main bg-main" : "border-black/20"
              }`}
            >
              {method === "qris" && <span className="h-2 w-2 rounded-full bg-white" />}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMethod("bank_transfer")}
            className={`flex items-center gap-3 rounded-xl border p-3 text-left ${
              method === "bank_transfer" ? "border-main bg-main/5" : "border-black/10"
            }`}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-main">
              <Landmark size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-black">Virtual Account</p>
              <p className="text-xs text-black/50">BCA · Mandiri · BNI · BRI</p>
            </div>
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                method === "bank_transfer" ? "border-main bg-main" : "border-black/20"
              }`}
            >
              {method === "bank_transfer" && <span className="h-2 w-2 rounded-full bg-white" />}
            </span>
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-black/5 bg-white p-4">
        <div>
          <p className="text-sm font-semibold text-black">Mode donasi otonom</p>
          <p className="mt-0.5 text-xs text-black/50">
            Saldo berikutnya otomatis dialokasikan sesuai preferensi Anda
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={autonomous}
          onClick={() => setAutonomous((v) => !v)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${autonomous ? "bg-main" : "bg-black/15"}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
              autonomous ? "left-5" : "left-0.5"
            }`}
          />
        </button>
      </div>

      {submitError && <p className="mt-3 text-sm text-error">{submitError}</p>}

      <div
        className="fixed inset-x-0 bottom-0 bg-surface px-6 pt-4"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <PressButton
          variant="primary"
          className="w-full py-4 text-base"
          disabled={amount < MIN_AMOUNT || isSubmitting}
          onClick={() => onSubmit(amount, method, autonomous)}
        >
          {isSubmitting ? "Memproses..." : "Lanjutkan Pembayaran"}
        </PressButton>
      </div>
    </div>
  );
}
