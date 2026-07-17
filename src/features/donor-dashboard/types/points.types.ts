export interface PointReward {
  reward_id: string;
  name: string;
  description: string;
  reward_type: string;
  points_cost: number;
  stock: number;
  is_active: boolean;
  validity_days: number;
  can_claim: boolean;
}

export interface PointHistoryEntry {
  point_transaction_id: string;
  donation_id: string | null;
  reward_claim_id: string | null;
  points: number;
  transaction_type: string;
  source_type: string;
  source_id: string;
  description: string;
  expires_at: string | null;
  created_at: string;
  points_text: string;
}

export interface PointsDashboard {
  active_points: number;
  total_earned: number;
  total_redeemed: number;
  level: string;
  next_level_points: number;
  points_to_next_level: number;
  rewards: PointReward[];
  history: PointHistoryEntry[];
}

export interface PointsDashboardResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: PointsDashboard;
}
