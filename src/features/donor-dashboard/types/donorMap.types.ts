export interface DonorHeatmapPoint {
  post_id: string;
  name: string;
  latitude: number;
  longitude: number;
  disaster_type: string;
  funding_percentage: number;
  urgency_level: string;
  color: string;
}

export interface DonorUrgentPost {
  post_id: string;
  name: string;
  address: string;
  image_url: string;
  funding_target: number;
  funded_amount: number;
  funding_percentage: number;
  funding_text: string;
  elapsed_text: string;
}

export interface DonorMapLegendItem {
  label: string;
  level: string;
  color: string;
}

export interface DonorDashboardMapData {
  heatmap_points: DonorHeatmapPoint[];
  urgent_posts: DonorUrgentPost[];
  legend: DonorMapLegendItem[];
}

export interface DonorDashboardMapResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: DonorDashboardMapData;
}
