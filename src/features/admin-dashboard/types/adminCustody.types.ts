export interface CustodyPostHandoffData {
  order_id: string;
  log_id: string;
  order_status: string;
  handoff_stage: string;
  handshake_method: string;
  sequence: number;
  current_hash: string;
  short_current_hash: string;
  captured_at: string;
  points_awarded: number;
  delivery_count: number;
  total_distance_km: number;
}

export interface CustodyPostHandoffResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: CustodyPostHandoffData;
}
