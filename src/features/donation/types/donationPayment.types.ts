export type PaymentMethod = "qris" | "bank_transfer";

export interface CreateDonationPaymentInput {
  request_id: string;
  amount: number;
  payment_method: PaymentMethod;
  autonomous: boolean;
}

export interface DonationPayment {
  order_id: string;
  donation_id: string;
  payment_transaction_id: string;
  request_id: string;
  amount: number;
  payment_method: string;
  payment_channel: string;
  transaction_status: string;
  qr_string: string;
  qr_url: string;
  va_number: string;
  va_bank: string;
  permata_va_number: string;
  expired_at: string;
}

export interface DonationPaymentResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: DonationPayment;
}
