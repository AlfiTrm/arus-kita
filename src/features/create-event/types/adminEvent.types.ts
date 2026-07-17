export interface CreateEventItemInput {
  name: string;
  description?: string;
  price: number;
  quantity_needed: number;
}

export interface CreateEventItem {
  item_id: string;
  name: string;
  description: string;
  price: number;
  estimated_total: number;
  quantity_needed: number;
}

export interface CreateEventData {
  post_id: string;
  report_id: string;
  request_id: string;
  event_code: string;
  name: string;
  disaster_type: string;
  image_url: string;
  address: string;
  latitude: number;
  longitude: number;
  geofence_radius: number;
  funding_target: number;
  report_status: string;
  request_status: string;
  items: CreateEventItem[];
}

export interface CreateEventResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: CreateEventData;
}
