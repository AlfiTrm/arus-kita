export interface StoreProfileData {
  store_id: string;
  owner_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  is_online: boolean;
  store_status: string;
  kyc_status: string;
  kyc_label: string;
  reputation_score: number;
  business_number: string;
  npwp: string;
  ktp_image_url: string;
  bank_name: string;
  bank_account_no: string;
  masked_bank_account: string;
  bank_account_name: string;
  categories: string[];
  categories_text: string;
  total_order_30_days: number;
  accepted_order_30_days: number;
  cancelled_order_30_days: number;
  acceptance_rate_30_days: number;
  acceptance_summary: string;
  created_at: string;
  updated_at: string;
}

export interface StoreProfileResponse {
  status: {
    code: number;
    isSuccess: boolean;
  };
}

export interface StoreGoodnessHistory {
  order_id: string;
  order_code: string;
  post_name: string;
  disaster_name: string;
  title: string;
  item_count: number;
  total_amount: number;
  total_amount_text: string;
  verified_at: string;
  verified_at_text: string;
  latest_hash: string;
  short_latest_hash: string;
}

export interface StoreGoodnessData {
  certificate: {
    store_id: string;
    store_name: string;
    title: string;
    partner_label: string;
    since_text: string;
    verified_order_count: number;
    verified_order_text: string;
    verified_amount_total: number;
    verified_amount_text: string;
    reputation_score: number;
    reputation_text: string;
    dispute_count: number;
    dispute_text: string;
    first_contribution_at: string;
    share_url: string;
  };
  history: StoreGoodnessHistory[];
  total_history: number;
  limit: number;
  offset: number;
}

export interface StoreGoodnessResponse {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: StoreGoodnessData;
}

export interface StoreDisbursementSummary {
  store_id: string;
  store_name: string;
  total_disbursed_this_month: number;
  total_disbursed_text: string;
  completed_order_count: number;
  dispute_count: number;
  bank_name: string;
  masked_bank_account: string;
  median_disbursement_min: number;
  median_disbursement_text: string;
  subtitle: string;
}

export interface StoreDisbursementHistory {
  disbursement_id: string;
  order_id: string;
  order_code: string;
  post_name: string;
  amount: number;
  amount_text: string;
  status: string;
  status_label: string;
  badge_variant: "success" | "warning" | "error" | string;
  idempotency_key: string;
  gateway_reference: string;
  gateway_attempt: number;
  verification_approved_at: string;
  disbursed_at: string | null;
  created_at: string;
  timeline_text: string;
  minutes_after_verification: number;
  minutes_after_verification_text: string;
}

export interface StoreGoodnessTrail {
  store_id: string;
  verified_order_count: number;
  verified_amount_total: number;
  verified_amount_text: string;
  year: number;
  summary_text: string;
  first_contribution_at: string;
  last_contribution_at: string;
}

export interface StoreDisbursementData {
  summary: StoreDisbursementSummary;
  history: StoreDisbursementHistory[];
  goodness_trail: StoreGoodnessTrail;
  total_history: number;
  limit: number;
  offset: number;
}

export interface StoreDisbursementResponse {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: StoreDisbursementData;
}
