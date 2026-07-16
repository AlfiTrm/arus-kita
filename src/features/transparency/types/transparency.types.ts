export interface TransparencySummary {
  total_donation_collected: number;
  total_disbursed_verified: number;
  refund_automatic: number;
  verified_fulfillment_rate: number;
}

export interface MonthlyDisbursement {
  month: string;
  total: number;
}

export interface DisasterAllocation {
  disaster_event: string;
  total_amount: number;
  percentage: number;
}

export interface LedgerEntry {
  occurred_at: string;
  event: string;
  post_name: string;
  value_label: string;
  hash: string;
}

export interface TransparencyData {
  summary: TransparencySummary;
  monthly_disbursements: MonthlyDisbursement[];
  allocation_by_disaster: DisasterAllocation[];
  latest_ledger: LedgerEntry[];
}

export interface DashboardTransparencyResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: TransparencyData;
}
