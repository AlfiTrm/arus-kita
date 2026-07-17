import { StoreOrderQR } from "@/features/shop/components/StoreOrderQR";

export default async function StoreOrderQRPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <StoreOrderQR orderId={id} />;
}
