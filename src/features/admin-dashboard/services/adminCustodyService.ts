import { apiClient } from "@/shared/services/apiClient";
import type { CustodyPostHandoffData, CustodyPostHandoffResponse } from "../types/adminCustody.types";

export const adminCustodyService = {
  postHandoff: async (params: {
    qrPayload: string;
    latitude: number;
    longitude: number;
    idempotencyKey: string;
  }): Promise<CustodyPostHandoffData> => {
    const res = await apiClient.post<CustodyPostHandoffResponse>("/admin/custody/post-handoff", {
      method: "qr",
      qr_payload: params.qrPayload,
      latitude: params.latitude,
      longitude: params.longitude,
      idempotency_key: params.idempotencyKey,
    });
    return res.data;
  },
};
