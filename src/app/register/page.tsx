"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CompleteProfileStep } from "@/features/auth/register/components/CompleteProfileStep";
import { CourierProfileStep, type CourierProfile } from "@/features/auth/register/components/CourierProfileStep";
import { DonaturProfileStep, type DonaturProfile } from "@/features/auth/register/components/DonaturProfileStep";
import { EmailStep } from "@/features/auth/register/components/EmailStep";
import { OtpStep } from "@/features/auth/register/components/OtpStep";
import { PasswordStep } from "@/features/auth/register/components/PasswordStep";
import { RegisterStepHeader } from "@/features/auth/register/components/RegisterStepHeader";
import { RoleSelectStep } from "@/features/auth/register/components/RoleSelectStep";
import { SuccessStep } from "@/features/auth/register/components/SuccessStep";
import { TokoProfileStep, type TokoProfile } from "@/features/auth/register/components/TokoProfileStep";
import { adminRegisterService } from "@/features/auth/register/services/adminRegisterService";
import { courierRegisterService } from "@/features/auth/register/services/courierRegisterService";
import { donorRegisterService } from "@/features/auth/register/services/donorRegisterService";
import { registerService } from "@/features/auth/register/services/registerService";
import { tokoRegisterService } from "@/features/auth/register/services/tokoRegisterService";
import { ROLE_LABELS, type RegisterRole } from "@/features/auth/register/types/register.types";
import { saveSession } from "@/shared/utils/authSession";

const TOTAL_STEPS = 6;
const DEFAULT_OTP_SECONDS = 300;

const ROLE_BACKEND_VALUE: Partial<Record<RegisterRole, string>> = {
  admin_posko: "admin",
  donatur: "donor",
  toko_mitra: "store",
  relawan_kurir: "courier",
};

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
    const backendRole = ROLE_BACKEND_VALUE[role];
    if (backendRole !== undefined) {
      const result = await registerService.requestOtp(backendRole, value);
      setRegistrationId(result.registration_id);
      setOtpExpiresInSeconds(result.otp_expires_in_seconds);
    }
    setEmail(value);
    setStep(3);
  }

  async function handleOtpResend(): Promise<number> {
    const backendRole = ROLE_BACKEND_VALUE[role];
    if (backendRole !== undefined) {
      const result = await registerService.requestOtp(backendRole, email);
      setRegistrationId(result.registration_id);
      return result.otp_expires_in_seconds;
    }
    return DEFAULT_OTP_SECONDS;
  }

  async function handleOtpSubmit(code: string) {
    if (ROLE_BACKEND_VALUE[role] !== undefined) {
      await registerService.verifyOtp(registrationId, code);
    }
    setStep(4);
  }

  async function handlePasswordSubmit(password: string) {
    if (ROLE_BACKEND_VALUE[role] !== undefined) {
      if (role === "toko_mitra") {
        await registerService.setAdminPassword(registrationId, password, password);
      } else {
        await registerService.setPassword(registrationId, password, password);
      }
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

  async function handleDonaturProfileSubmit(profile: DonaturProfile) {
    const donationPreferences = [...profile.disasterPreferences, ...(profile.regionPreference ? [profile.regionPreference] : [])];
    const result = await donorRegisterService.completeProfile(
      registrationId,
      profile.fullName,
      `+62${profile.phone}`,
      donationPreferences,
      true,
    );
    saveSession(result.token, result.user);
    setStep(6);
  }

  async function handleCourierProfileSubmit(profile: CourierProfile) {
    const result = await courierRegisterService.completeProfile({
      registration_id: registrationId,
      full_name: profile.fullName,
      nik: profile.nik,
      vehicle_type: profile.vehicleType,
      vehicle_capacity_kg: profile.vehicleCapacityKg,
      operational_area: profile.operationalArea,
      operation_radius_km: profile.operationRadiusKm,
      waiver_accepted: profile.waiverAccepted,
    });
    saveSession(result.token, result.user);
    setStep(6);
  }

  async function handleTokoProfileSubmit(profile: TokoProfile) {
    const result = await tokoRegisterService.completeProfile({
      registration_id: registrationId,
      store_name: profile.namaToko,
      owner_name: profile.ownerName,
      nib: profile.nib,
      npwp: profile.npwp,
      ktp_file: profile.ktpFile,
      bank_name: profile.bankName,
      bank_account_no: profile.bankAccountNo,
      bank_account_name: profile.bankAccountName,
      categories: profile.categories,
      address: profile.address,
      latitude: profile.latitude,
      longitude: profile.longitude,
    });
    saveSession(result.token, result.user);
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
        ) : role === "donatur" ? (
          <DonaturProfileStep onNext={handleDonaturProfileSubmit} />
        ) : role === "toko_mitra" ? (
          <TokoProfileStep onNext={handleTokoProfileSubmit} />
        ) : role === "relawan_kurir" ? (
          <CourierProfileStep onNext={handleCourierProfileSubmit} />
        ) : (
          <div className="px-6 pt-2 text-sm text-black/50">
            Langkah lanjutan (khusus {ROLE_LABELS[role]}) belum dibuat.
          </div>
        ))}

      {step === 6 && (
        <SuccessStep
          onDone={() =>
            router.push(
              role === "admin_posko"
                ? "/dashboard/admin"
                : role === "toko_mitra"
                  ? "/dashboard/toko"
                  : role === "relawan_kurir"
                    ? "/dashboard/kurir"
                    : "/dashboard/donatur",
            )
          }
        />
      )}
    </div>
  );
}
