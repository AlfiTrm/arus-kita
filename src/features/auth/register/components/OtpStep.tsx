"use client";

import { useEffect, useRef, useState } from "react";

const OTP_LENGTH = 6;

export function OtpStep({
  email,
  expiresInSeconds,
  onNext,
  onResend,
}: {
  email: string;
  expiresInSeconds: number;
  onNext: (otp: string) => Promise<void>;
  onResend: () => Promise<number>;
}) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(expiresInSeconds);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  async function submitOtp(code: string) {
    setIsVerifying(true);
    setError(null);
    try {
      await onNext(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kode OTP salah");
      setDigits(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  }

  function handleChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (next.every((d) => d !== "")) {
      submitOtp(next.join(""));
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;

    const next = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);

    const lastFilledIndex = Math.min(pasted.length, OTP_LENGTH) - 1;
    inputRefs.current[lastFilledIndex]?.focus();

    if (pasted.length === OTP_LENGTH) {
      submitOtp(pasted);
    }
  }

  async function handleResend() {
    const newExpiry = await onResend();
    setSecondsLeft(newExpiry);
    setDigits(Array(OTP_LENGTH).fill(""));
    setError(null);
    inputRefs.current[0]?.focus();
  }

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="px-6 pb-28 pt-2">
      <h2 className="text-2xl font-bold text-black">Verifikasi OTP</h2>
      <p className="mt-1 text-sm text-black/50">Masukkan kode yang dikirimkan ke {email || "email anda"}</p>

      <p className="mt-6 text-sm font-medium text-black">Kode OTP</p>
      <div className="mt-2 flex gap-2">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            disabled={isVerifying}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className="h-14 w-full min-w-0 flex-1 rounded-lg border border-black/10 text-center text-lg font-semibold text-black outline-none focus:border-main focus:ring-2 focus:ring-main/20 disabled:opacity-50"
          />
        ))}
      </div>

      {error && <p className="mt-3 text-sm text-error">{error}</p>}

      <p className="mt-4 text-center text-sm text-black/40">
        {secondsLeft > 0 ? `${minutes}:${seconds}` : "Kode kedaluwarsa"}
      </p>
      <p className="mt-1 text-center text-sm text-black/50">
        Belum menerima OTP?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={secondsLeft > 0}
          className="font-semibold text-main disabled:text-black/30"
        >
          Kirim ulang
        </button>
      </p>
    </div>
  );
}
