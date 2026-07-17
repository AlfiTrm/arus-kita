export interface DonorTransactionItem {
  item_id: string;
  name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  amount_text: string;
}

export interface CustodyLog {
  logs_id: string;
  order_id: string;
  sequence: number;
  from_actor_id: string;
  to_actor_id: string;
  latitude: number;
  longitude: number;
  prev_hash: string;
  current_hash: string;
  short_current_hash: string;
  created_at: string;
  elapsed_text: string;
}

export interface DonorTransaction {
  donation_id: string;
  payment_transaction_id: string;
  payment_order_id: string;
  request_id: string;
  locked_order_id: string;
  transaction_code: string;
  post_name: string;
  request_title: string;
  amount: number;
  amount_text: string;
  status: string;
  status_label: string;
  badge_variant: string;
  latest_hash: string;
  short_latest_hash: string;
  verification_image_url: string;
  custody_step_count: number;
  progress_text: string;
  donated_at: string;
  paid_at: string | null;
  verified_at: string | null;
  elapsed_text: string;
}

export interface DonorTransactionsData {
  items: DonorTransaction[];
  total: number;
  limit: number;
  offset: number;
}

export interface DonorTransactionsResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: DonorTransactionsData;
}

export interface DonorTransactionDetail extends DonorTransaction {
  post_address: string;
  latitude: number;
  longitude: number;
  funding_target: number;
  funded_amount: number;
  funding_percentage: number;
  funding_text: string;
  donor_count: number;
  total_item_count: number;
  items: DonorTransactionItem[];
  custody_logs: CustodyLog[];
}

export interface DonorTransactionDetailResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: DonorTransactionDetail;
}
