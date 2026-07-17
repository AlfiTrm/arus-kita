interface Envelope<T> {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: T;
}

export interface RequestOtpData {
  registration_id: string;
  email: string;
  otp_expires_in_seconds: number;
}
export type RequestOtpResponse = Envelope<RequestOtpData>;

export interface VerifyOtpData {
  registration_id: string;
  otp_verified: boolean;
}
export type VerifyOtpResponse = Envelope<VerifyOtpData>;

export interface SetPasswordData {
  registration_id: string;
  password_created: boolean;
}
export type SetPasswordResponse = Envelope<SetPasswordData>;

export interface RegisteredUser {
  user_id: string;
  role: string;
  display_role: string;
  name: string;
  email: string;
  status: string;
  kyc_status: string;
}

export interface CompleteProfileData {
  token: string;
  user: RegisteredUser;
}
export type CompleteProfileResponse = Envelope<CompleteProfileData>;
