export type UrgencyLevel = "critical" | "medium" | "low" | "funded";

export interface Posko {
  post_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  disaster_event: string;
  latest_report_title: string;
  funding_target: number;
  funded_amount: number;
  funding_percentage: number;
  urgency_level: UrgencyLevel;
  request_count: number;
  latest_reported_at: string;
}

export interface DashboardMapResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: { items: Posko[] };
}

export interface PoskoSummaryItem {
  post_id: string;
  name: string;
  address: string;
  disaster_event: string;
  latest_report_title: string;
  funding_target: number;
  funded_amount: number;
  funding_percentage: number;
  urgency_level: UrgencyLevel;
  request_count: number;
}

export interface DashboardSummary {
  active_posko_count: number;
  total_target: number;
  total_funded: number;
  funding_percentage: number;
  items: PoskoSummaryItem[];
}

export interface DashboardSummaryResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: DashboardSummary;
}
