export interface DashboardOrder {
  order_id: string;
  order_code: string;
  store_name: string;
  courier_name: string;
  status: string;
  status_label: string;
  description: string;
  badge_variant: string;
  updated_at: string;
}

export interface DashboardEvent {
  post_id: string;
  event_code: string;
  title: string;
  disaster_type: string;
  status: string;
  status_label: string;
  image_url: string;
  address: string;
  geofence_radius: number;
  affected_households: number;
  started_at: string;
  elapsed_text: string;
  funding_target: number;
  funded_amount: number;
  funding_percentage: number;
  funding_text: string;
  order_count: number;
  summary_text: string;
  can_scan_courier_qr: boolean;
  can_add_follow_up_request: boolean;
  latest_orders: DashboardOrder[] | null;
}

export interface AdminDashboardData {
  greeting_name: string;
  is_admin_verified: boolean;
  verification_text: string;
  active_events: DashboardEvent[];
  closed_events: DashboardEvent[];
}

export interface AdminDashboardResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: AdminDashboardData;
}
