export interface SupplementalNeedItemInput {
  name: string;
  description: string;
  price: number;
  quantity_needed: number;
}

export interface SupplementalNeedItemResult {
  item_id: string;
  name: string;
  description: string;
  price: number;
  estimated_total: number;
  quantity_needed: number;
}

export interface SupplementalNeedData {
  supplemental_id: string;
  request_id: string;
  order_id: string;
  reason: string;
  reserved_amount_applied: number;
  additional_target: number;
  new_funding_target: number;
  items: SupplementalNeedItemResult[];
}

export interface SupplementalNeedResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: SupplementalNeedData;
}
