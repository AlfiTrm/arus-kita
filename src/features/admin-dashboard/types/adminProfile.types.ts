export interface AdminProfile {
  user_id: string;
  name: string;
  initials: string;
  role: string;
  display_role: string;
  affiliation: string;
  kyc_status: string;
  is_verified: boolean;
  verification_text: string;
  successful_events_text: string;
  event_count: number;
  managed_aid_amount: number;
  managed_aid_amount_text: string;
  verified_order_percentage: number;
  verified_order_text: string;
}

export interface AdminProfileResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: AdminProfile;
}
