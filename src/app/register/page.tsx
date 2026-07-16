"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CompleteProfileStep } from "@/features/auth/register/components/CompleteProfileStep";
import { EmailStep } from "@/features/auth/register/components/EmailStep";
import { OtpStep } from "@/features/auth/register/components/OtpStep";
import { PasswordStep } from "@/features/auth/register/components/PasswordStep";
import { RegisterStepHeader } from "@/features/auth/register/components/RegisterStepHeader";
import { RoleSelectStep } from "@/features/auth/register/components/RoleSelectStep";
import { SuccessStep } from "@/features/auth/register/components/SuccessStep";
import { adminRegisterService } from "@/features/auth/register/services/adminRegisterService";
import { ROLE_LABELS, type RegisterRole } from "@/features/auth/register/types/register.types";
import { saveSession } from "@/shared/utils/authSession";

const TOTAL_STEPS = 6;
const DEFAULT_OTP_SECONDS = 300;

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<RegisterRole>("donatur");
  const [email, setEmail] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [otpExpiresInSeconds, setOtpExpiresInSeconds] = useState(DEFAULT_OTP_SECONDS);

  const title = step === 1 ? "Buat Akun" : `Daftar – ${ROLE_LABELS[role]}`;

  function goBack() {
    if (step > 1) {
      setStep((s) => s - 1);
    } else {
      router.back();
    }
  }

  async function handleEmailSubmit(value: string) {
    if (role === "admin_posko") {
      const result = await adminRegisterService.requestOtp(value);
      setRegistrationId(result.registration_id);
      setOtpExpiresInSeconds(result.otp_expires_in_seconds);
    }
    setEmail(value);
    setStep(3);
  }

  async function handleOtpResend(): Promise<number> {
    if (role === "admin_posko") {
      const result = await adminRegisterService.requestOtp(email);
      setRegistrationId(result.registration_id);
      return result.otp_expires_in_seconds;
    }
    return DEFAULT_OTP_SECONDS;
  }

  async function handleOtpSubmit(code: string) {
    if (role === "admin_posko") {
      await adminRegisterService.verifyOtp(registrationId, code);
    }
    setStep(4);
  }

  async function handlePasswordSubmit(password: string) {
    if (role === "admin_posko") {
      await adminRegisterService.setPassword(registrationId, password, password);
    }
    setStep(5);
  }

  async function handleProfileSubmit(profile: { fullName: string; nik: string; affiliation: string }) {
    if (role === "admin_posko") {
      const result = await adminRegisterService.completeProfile(
        registrationId,
        profile.fullName,
        profile.nik,
        profile.affiliation,
      );
      saveSession(result.token, result.user);
    }
    setStep(6);
  }

  return (
    <div className="min-h-dvh bg-surface">
      {step < 6 && <RegisterStepHeader title={title} step={step} totalSteps={TOTAL_STEPS} onBack={goBack} />}

      {step === 1 && (
        <RoleSelectStep
          onNext={(selected) => {
            setRole(selected);
            setStep(2);
          }}
        />
      )}

      {step === 2 && <EmailStep onNext={handleEmailSubmit} />}

      {step === 3 && (
        <OtpStep
          email={email}
          expiresInSeconds={otpExpiresInSeconds}
          onNext={handleOtpSubmit}
          onResend={handleOtpResend}
        />
      )}

      {step === 4 && <PasswordStep onNext={handlePasswordSubmit} />}

      {step === 5 &&
        (role === "admin_posko" ? (
          <CompleteProfileStep onNext={handleProfileSubmit} />
        ) : (
          <div className="px-6 pt-2 text-sm text-black/50">
            Langkah lanjutan (khusus {ROLE_LABELS[role]}) belum dibuat.
          </div>
        ))}

      {step === 6 && <SuccessStep onDone={() => router.push("/dashboard/admin")} />}
    </div>
  );
}
