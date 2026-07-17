import { apiClient } from "@/shared/services/apiClient";
import type {
  AdminOrderReceivingData,
  AdminOrderReceivingResponse,
  CompleteDistributionData,
  CompleteDistributionResponse,
  UploadDistributionProofData,
  UploadDistributionProofResponse,
} from "../types/adminDistribution.types";

export const adminDistributionService = {
  getReceiving: async (orderId: string): Promise<AdminOrderReceivingData> => {
    const res = await apiClient.get<AdminOrderReceivingResponse>(`/admin/orders/${orderId}/receiving`);
    return res.data;
  },

  uploadProof: async (
    orderId: string,
    params: {
      itemId: string;
      photoBlob: Blob;
      recipientNote: string;
      distributedQuantity: number;
      latitude: number;
      longitude: number;
    },
  ): Promise<UploadDistributionProofData> => {
    const formData = new FormData();
    formData.append("item_id", params.itemId);
    formData.append("photo", params.photoBlob, "bukti-distribusi.jpg");
    formData.append("recipient_note", params.recipientNote);
    formData.append("latitude", String(params.latitude));
    formData.append("longitude", String(params.longitude));
    formData.append("distributed_quantity", String(params.distributedQuantity));

    const res = await apiClient.post<UploadDistributionProofResponse>(
      `/admin/orders/${orderId}/distribution-proofs`,
      formData,
    );
    return res.data;
  },

  complete: async (
    orderId: string,
    params: { idempotencyKey: string; latitude: number; longitude: number },
  ): Promise<CompleteDistributionData> => {
    const res = await apiClient.post<CompleteDistributionResponse>(`/admin/orders/${orderId}/complete-distribution`, {
      idempotency_key: params.idempotencyKey,
      latitude: params.latitude,
      longitude: params.longitude,
    });
    return res.data;
  },
};
