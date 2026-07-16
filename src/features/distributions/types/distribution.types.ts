export interface Distribution {
  verification_id: string;
  order_id: string;
  post_id: string;
  title: string;
  post_name: string;
  disaster_event: string;
  image_url: string;
  gps_valid: boolean;
  latitude: number;
  longitude: number;
  captured_at: string;
  total_amount: number;
  donor_count: number;
  audit_hash: string;
}

export interface DashboardDistributionsResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: { items: Distribution[] };
}
