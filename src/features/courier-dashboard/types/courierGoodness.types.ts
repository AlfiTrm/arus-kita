export interface CourierGoodnessCertificate {
  courier_id: string;
  courier_name: string;
  title: string;
  partner_label: string;
  since_text: string;
  delivery_count: number;
  delivery_count_text: string;
  total_distance_km: number;
  total_distance_text: string;
  reputation_score: number;
  reputation_text: string;
  dispute_count: number;
  dispute_text: string;
  first_delivery_at: string | null;
  share_url: string;
}

export interface CourierGoodnessHistoryItem {
  order_id?: string;
  order_code?: string;
  event_name?: string;
  post_name?: string;
  delivered_at?: string;
  distance_km?: number;
  item_count?: number;
  points?: number;
  custody_hash?: string;
}

export interface CourierGoodnessData {
  certificate: CourierGoodnessCertificate;
  history: CourierGoodnessHistoryItem[];
  total_history: number;
  limit: number;
  offset: number;
}

export interface CourierGoodnessResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: CourierGoodnessData;
}
