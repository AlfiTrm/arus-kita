export interface DonorProfile {
  user_id: string;
  name: string;
  initials: string;
  email: string;
  phone_number: string;
  role: string;
  display_role: string;
  kyc_status: string;
  is_verified: boolean;
  verification_text: string;
  member_since: string;
  member_since_text: string;
  level: string;
  total_donated_amount: number;
  total_donated_amount_text: string;
  undistributed_donation_amount: number;
  undistributed_donation_amount_text: string;
  supported_post_count: number;
  active_points: number;
}

export interface DonorProfileResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: DonorProfile;
}
