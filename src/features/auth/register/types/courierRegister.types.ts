interface Envelope<T> {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: T;
}

export interface RegisteredCourierUser {
  user_id: string;
  role: string;
  display_role: string;
  name: string;
  email: string;
  status: string;
  kyc_status: string;
}

export interface RegisteredCourierProfile {
  profile_id: string;
  user_id: string;
  vehicle_type: string;
  vehicle_capacity_kg: number;
  operational_area: string;
  operation_radius_km: number;
  waiver_accepted: boolean;
}

export interface CompleteCourierProfileData {
  token: string;
  user: RegisteredCourierUser;
  courier: RegisteredCourierProfile;
}
export type CompleteCourierProfileResponse = Envelope<CompleteCourierProfileData>;
