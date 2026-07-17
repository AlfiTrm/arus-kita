import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStoreOrders } from "./useStoreOrders";
import { useStoreProfile } from "./useStoreProfile";
import { shopService } from "../services/shopService";

export function useStoreOrderView() {
  const router = useRouter();
  const [isAccepting, setIsAccepting] = useState(false);
  
  const { data: profile, isLoading: profileLoading, error: profileError } = useStoreProfile();
  const { data: orders, isLoading: ordersLoading, error: ordersError } = useStoreOrders();

  const storeName = profile?.name ?? "Toko Anda";
  const isOnline = profile?.is_online ?? true;
  const kycLabel = profile?.kyc_label ?? "KYC";
  const reputationScore = profile?.reputation_score ?? "-";

  const items = orders?.items ?? [];
  const currentOrder = items[0];
  const history = items.slice(1);

  async function handleContinueQr(orderId: string) {
    setIsAccepting(true);
    try {
      const res = await shopService.refreshHandoffToken(orderId);
      sessionStorage.setItem("store_order_qr", JSON.stringify(res.data));
      router.push(`/dashboard/toko/orders/${orderId}/qr`);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat QR");
    } finally {
      setIsAccepting(false);
    }
  }

  async function handleAccept() {
    if (!currentOrder) return;

    if (currentOrder.order_status === "ready_for_pickup") {
      return handleContinueQr(currentOrder.order_id);
    }

    if (currentOrder.order_status === "accepted") {
      router.push(`/dashboard/toko/orders/${currentOrder.order_id}`);
      return;
    }

    setIsAccepting(true);
    try {
      await shopService.acceptOrder(currentOrder.order_id);
      router.push(`/dashboard/toko/orders/${currentOrder.order_id}`);
    } catch (err) {
      console.error(err);
      alert("Gagal menyetujui pesanan");
    } finally {
      setIsAccepting(false);
    }
  }

  return {
    isAccepting,
    profileLoading,
    profileError,
    ordersLoading,
    ordersError,
    storeName,
    isOnline,
    kycLabel,
    reputationScore,
    currentOrder,
    history,
    handleAccept,
    handleContinueQr
  };
}
