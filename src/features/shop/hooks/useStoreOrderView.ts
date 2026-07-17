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

  async function handleAccept() {
    if (!currentOrder) return;
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
    handleAccept
  };
}
