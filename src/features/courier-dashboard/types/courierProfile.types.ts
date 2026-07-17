export interface CourierProfileData {
  user_id: string;
  profile_id: string;
  name: string;
  initials: string;
  email: string;
  role: string;
  display_role: string;
  kyc_status: string;
  is_verified: boolean;
  verification_text: string;
  operational_area: string;
  operation_radius_km: number;
  operation_area_text: string;
  vehicle_type: string;
  vehicle_capacity_kg: number;
  vehicle_text: string;
  waiver_accepted: boolean;
  is_available: boolean;
  urgent_task_notification_enabled: boolean;
  reputation_score: number;
  reputation_text: string;
  active_points: number;
  active_points_text: string;
  delivery_count: number;
  total_distance_km: number;
}

export interface CourierProfileResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: CourierProfileData;
}
