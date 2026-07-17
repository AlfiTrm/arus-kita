export interface AdminOrderReceivingItem {
  item_id: string;
  name: string;
  quantity: number;
  unit: number;
  unit_price: number;
  subtotal: number;
  has_proof: boolean;
}

export interface DistributionProof {
  proof_id: string;
  order_id: string;
  item_id: string;
  image_url: string;
  recipient_note: string;
  distributed_quantity: number;
  latitude: number;
  longitude: number;
  gps_distance_meters: number;
  blur_face_enabled: boolean;
  captured_from_camera: boolean;
  captured_at: string;
}

export interface AdminOrderReceivingData {
  order_id: string;
  order_code: string;
  order_status: string;
  request_id: string;
  request_title: string;
  post_name: string;
  courier_id: string;
  courier_name: string;
  delivered_at: string | null;
  completed_at: string | null;
  items: AdminOrderReceivingItem[];
  proofs: DistributionProof[];
  required_photo_count: number;
  uploaded_photo_count: number;
}

export interface AdminOrderReceivingResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: AdminOrderReceivingData;
}

export interface UploadDistributionProofData {
  proof: DistributionProof;
  required_photo_count: number;
  uploaded_photo_count: number;
  ready_to_complete: boolean;
}

export interface UploadDistributionProofResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: UploadDistributionProofData;
}

export interface CompleteDistributionData {
  order_id: string;
  order_status: string;
  required_photo_count: number;
  uploaded_photo_count: number;
  final_hash: string;
  short_final_hash: string;
  completed_at: string;
}

export interface CompleteDistributionResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: CompleteDistributionData;
}
