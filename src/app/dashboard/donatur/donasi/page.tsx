"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, MapPin } from "lucide-react";
import { DonationForm } from "@/features/donation/components/DonationForm";
import { DonationFormSkeleton } from "@/features/donation/components/DonationFormSkeleton";
import { DonationPaymentResult } from "@/features/donation/components/DonationPaymentResult";
import { DonationSuccessView } from "@/features/donation/components/DonationSuccessView";
import { donationPaymentService } from "@/features/donation/services/donationPaymentService";
import type { DonationPayment, PaymentMethod } from "@/features/donation/types/donationPayment.types";
import { DonorPoskoPicker } from "@/features/donor-dashboard/components/DonorPoskoPicker";
import { useDonorPostDetail } from "@/features/donor-dashboard/hooks/useDonorPostDetail";

function DonationPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId") ?? "";

  const { post, isLoading: isLoadingPost, error: postError } = useDonorPostDetail(postId);
  const [payment, setPayment] = useState<DonationPayment | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(amount: number, method: PaymentMethod, autonomous: boolean) {
    if (!post) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await donationPaymentService.create({
        request_id: post.request_id,
        amount,
        payment_method: method,
        autonomous,
      });
      setPayment(result);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Gagal membuat pembayaran");
    } finally {
      setIsSubmitting(false);
    }
  }

  const showHeader = !(payment && isPaid);

  return (
    <div>
      {showHeader && (
        <div className="flex items-center gap-3 px-6 pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Kembali"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black hover:bg-black/3"
          >
            <ChevronLeft size={18} />
          </button>
          <h1 className="text-base font-semibold text-black">Donasi</h1>
        </div>
      )}

      {!postId ? (
        <DonorPoskoPicker />
      ) : isLoadingPost ? (
        <DonationFormSkeleton />
      ) : postError || !post ? (
        <p className="px-6 pt-6 text-sm text-error">{postError ?? "Posko tidak ditemukan"}</p>
      ) : payment && isPaid ? (
        <DonationSuccessView
          amount={payment.amount}
          postName={post.name}
          orderId={payment.order_id}
          paymentTransactionId={payment.payment_transaction_id}
          postItems={post.items}
        />
      ) : payment ? (
        <DonationPaymentResult payment={payment} onConfirmPaid={() => setIsPaid(true)} />
      ) : (
        <>
          <div className="mx-6 mt-4 flex items-start gap-2 rounded-2xl bg-secondary/40 p-4">
            <MapPin size={16} className="mt-0.5 shrink-0 text-main" />
            <div>
              <p className="text-sm font-semibold text-black">{post.name}</p>
              <p className="text-xs text-main">Dana Anda dikunci ke pesanan barang posko ini</p>
            </div>
          </div>
          <DonationForm onSubmit={handleSubmit} isSubmitting={isSubmitting} submitError={submitError} />
        </>
      )}
    </div>
  );
}

export default function DonationPage() {
  return (
    <Suspense fallback={<DonationFormSkeleton />}>
      <DonationPageContent />
    </Suspense>
  );
}
