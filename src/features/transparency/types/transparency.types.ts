export interface TransparencySummary {
  total_donation_collected: number;
  total_disbursed: number;
  total_in_process: number;
  refund_automatic: number;
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

export type TransactionFlow = "Masuk" | "Disalurkan" | "Dikembalikan";

export interface LedgerEntry {
  occurred_at: string;
  event: string;
  post_name: string;
  value_amount: number;
  flow: TransactionFlow;
  reference_id: string;
}

export interface TransparencyData {
  summary: TransparencySummary;
  monthly_disbursements: MonthlyDisbursement[];
  allocation_by_disaster: DisasterAllocation[];
  latest_ledger: LedgerEntry[];
}
