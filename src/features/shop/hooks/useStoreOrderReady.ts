import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStoreOrderDetail } from "./useStoreOrderDetail";
import { shopService } from "../services/shopService";

export function useStoreOrderReady(orderId: string) {
  const router = useRouter();
  const { data, isLoading, error } = useStoreOrderDetail(orderId);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (data && data.items) {
      const initialChecked: Record<string, boolean> = {};
      data.items.forEach((item) => {
        initialChecked[item.item_id] = false;
      });
      setCheckedItems(initialChecked);
    }
  }, [data]);

  const handleToggleItem = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalItems = data?.items?.length ?? 0;
  const allChecked = totalItems > 0 && checkedCount === totalItems;

  const handleReady = async () => {
    setIsSubmitting(true);
    try {
      const res = await shopService.markOrderReady(orderId);
      sessionStorage.setItem("store_order_qr", JSON.stringify(res.data));
      router.push(`/dashboard/toko/orders/${orderId}/qr`);
    } catch (err) {
      console.error(err);
      alert("Gagal menyiapkan barang.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    checkedItems,
    isSubmitting,
    handleToggleItem,
    checkedCount,
    totalItems,
    allChecked,
    handleReady
  };
}
