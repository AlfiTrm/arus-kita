import { apiClient } from "@/shared/services/apiClient";
import type { CustodyStoreHandoffData, CustodyStoreHandoffResponse } from "../types/courierCustody.types";

export const courierCustodyService = {
  storeHandoffByQr: async (params: {
    qrPayload: string;
    latitude: number;
    longitude: number;
    idempotencyKey: string;
  }): Promise<CustodyStoreHandoffData> => {
    const res = await apiClient.post<CustodyStoreHandoffResponse>("/courier/custody/store-handoff", {
      method: "qr",
      qr_payload: params.qrPayload,
      latitude: params.latitude,
      longitude: params.longitude,
      idempotency_key: params.idempotencyKey,
    });
    return res.data;
  },

  storeHandoffByPin: async (params: {
    orderId: string;
    fallbackPin: string;
    latitude: number;
    longitude: number;
    idempotencyKey: string;
  }): Promise<CustodyStoreHandoffData> => {
    const res = await apiClient.post<CustodyStoreHandoffResponse>("/courier/custody/store-handoff", {
      method: "pin",
      order_id: params.orderId,
      fallback_pin: params.fallbackPin,
      latitude: params.latitude,
      longitude: params.longitude,
      idempotency_key: params.idempotencyKey,
    });
    return res.data;
  },
};
