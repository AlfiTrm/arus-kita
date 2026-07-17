export interface DonorPostItem {
  item_id: string;
  name: string;
  description: string;
  price: number;
  estimated_total: number;
  quantity_needed: number;
  quantity_fulfilled: number;
  progress_text: string;
}

export interface DonorPostDetail {
  post_id: string;
  report_id: string;
  request_id: string;
  name: string;
  address: string;
  disaster_type: string;
  image_url: string;
  elapsed_text: string;
  admin_verified: boolean;
  admin_verification_text: string;
  funding_target: number;
  funded_amount: number;
  funding_percentage: number;
  funding_text: string;
  donor_count: number;
  urgency_level: string;
  items: DonorPostItem[];
}

export interface DonorPostDetailResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: DonorPostDetail;
}
