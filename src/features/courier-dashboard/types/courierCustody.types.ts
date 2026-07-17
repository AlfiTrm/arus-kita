export interface CustodyStoreHandoffData {
  order_id: string;
  log_id: string;
  order_status: string;
  handoff_stage: string;
  handshake_method: string;
  sequence: number;
  current_hash: string;
  short_current_hash: string;
  captured_at: string;
}

export interface CustodyStoreHandoffResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: CustodyStoreHandoffData;
}
