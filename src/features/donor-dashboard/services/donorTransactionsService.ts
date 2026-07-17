import { apiClient } from "@/shared/services/apiClient";
import type {
  DonorTransactionDetail,
  DonorTransactionDetailResponse,
  DonorTransactionsData,
  DonorTransactionsResponse,
} from "../types/donorTransaction.types";

export const donorTransactionsService = {
  list: async (): Promise<DonorTransactionsData> => {
    const res = await apiClient.get<DonorTransactionsResponse>("/donor/donations/transactions");
    return res.data;
  },
  get: async (donationId: string): Promise<DonorTransactionDetail> => {
    const res = await apiClient.get<DonorTransactionDetailResponse>(`/donor/donations/transactions/${donationId}`);
    return res.data;
  },
};
