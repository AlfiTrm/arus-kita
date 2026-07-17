export interface CourierTask {
  order_id: string;
  order_code: string;
  order_status: string;
  total_amount: number;
  request_title: string;
  event_name: string;
  store_name: string;
  store_address: string;
  post_name: string;
  post_address: string;
  item_count: number;
  total_quantity: number;
  pickup_distance_km: number | null;
  dropoff_distance_km: number | null;
  total_distance_km: number | null;
  updated_at: string;
}

export interface CourierTaskListData {
  items: CourierTask[];
  limit: number;
  offset: number;
}

export interface CourierTaskListResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: CourierTaskListData;
}

export interface CourierTaskDetail extends CourierTask {
  request_id: string;
  store_id: string;
  courier_id: string | null;
  courier_name: string | null;
  store_latitude: number;
  store_longitude: number;
  post_latitude: number;
  post_longitude: number;
  accepted_at: string | null;
  ready_at: string | null;
  picked_up_at: string | null;
  created_at: string;
}

export interface CourierTaskDetailResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: CourierTaskDetail;
}

export interface CourierTaskClaimData {
  order_id: string;
  courier_id: string;
  order_status: string;
  updated_at: string;
}

export interface CourierTaskClaimResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: CourierTaskClaimData;
}

export interface CourierArrivedData {
  order_id: string;
  order_status: string;
  arrived_at: string;
}

export interface CourierArrivedResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: CourierArrivedData;
}

export interface CourierArrivedPostData {
  order_id: string;
  order_status: string;
  arrived_at_post_at: string;
}

export interface CourierArrivedPostResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: CourierArrivedPostData;
}

export interface CourierHandoffTokenData {
  order_id: string;
  token_id: string;
  handoff_stage: string;
  qr_payload: string;
  fallback_pin: string;
  expires_at: string;
  cache_valid_until: string;
  refresh_in_seconds: number;
  cache_window_in_seconds: number;
}

export interface CourierHandoffTokenResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: CourierHandoffTokenData;
}
