import { apiClient } from "@/shared/services/apiClient";
import type {
  CreateDonationPaymentInput,
  DonationPayment,
  DonationPaymentResponse,
} from "../types/donationPayment.types";

export const donationPaymentService = {
  create: async (input: CreateDonationPaymentInput): Promise<DonationPayment> => {
    const res = await apiClient.post<DonationPaymentResponse>("/donor/donations/payments", input);
    return res.data;
  },
};
