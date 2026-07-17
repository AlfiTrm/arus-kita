import { StoreOrderDetail } from "@/features/shop/components/StoreOrderDetail";

export default async function StoreOrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <StoreOrderDetail orderId={id} />;
}
