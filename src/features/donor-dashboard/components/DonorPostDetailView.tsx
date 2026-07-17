"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Share2, ShieldCheck } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { formatRupiah } from "@/shared/utils/formatCurrency";
import type { DonorPostDetail, DonorPostItem } from "../types/donorPostDetail.types";

const URGENCY_BANNER: Record<string, { label: string; className: string }> = {
  critical: { label: "SANGAT MENDESAK", className: "bg-error text-white" },
  medium: { label: "MENDESAK", className: "bg-warning text-black" },
  low: { label: "PERLU BANTUAN", className: "bg-caution text-black" },
  funded: { label: "TERDANAI PENUH", className: "bg-success text-white" },
};

function itemBadgeColor(item: DonorPostItem): string {
  if (item.quantity_fulfilled >= item.quantity_needed) return "text-success";
  if (item.quantity_fulfilled > 0) return "text-warning";
  return "text-error";
}

export function DonorPostDetailView({ post }: { post: DonorPostDetail }) {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);
  const banner = URGENCY_BANNER[post.urgency_level] ?? URGENCY_BANNER.medium;

  function handleShare() {
    const shareText = `${post.name} — ${post.address}`;
    if (navigator.share) {
      navigator.share({ title: post.name, text: shareText }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText).catch(() => {});
    }
  }

  return (
    <div className="pb-28">
      <div className="flex items-center justify-between px-6 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Kembali"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black hover:bg-black/3"
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className="text-sm font-semibold text-black">Detail Posko</h1>
        <button
          type="button"
          onClick={handleShare}
          aria-label="Bagikan"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black hover:bg-black/3"
        >
          <Share2 size={16} />
        </button>
      </div>

      <div className="mx-6 mt-4 flex items-center justify-between">
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${banner.className}`}>{banner.label}</span>
        <span className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-black/70">
          {post.disaster_type.charAt(0).toUpperCase() + post.disaster_type.slice(1)}
        </span>
      </div>

      <div className="relative mx-6 mt-3 aspect-video overflow-hidden rounded-2xl border border-dashed border-black/10">
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element -- external event proof photo, arbitrary storage domain
          <img
            src={post.image_url}
            alt={post.name}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-black/30">
            [ foto kondisi posko ]
          </div>
        )}
      </div>

      <div className="px-6 pt-4">
        <h2 className="text-lg font-bold text-black">{post.name}</h2>
        <p className="mt-1 flex items-center gap-1 text-xs text-black/50">
          <MapPin size={13} /> {post.address} · dibuat {post.elapsed_text}
        </p>

        <span
          className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${
            post.admin_verified ? "text-success" : "text-warning"
          }`}
        >
          <ShieldCheck size={12} /> {post.admin_verification_text}
        </span>
      </div>

      <div className="mx-6 mt-4 rounded-2xl border border-black/5 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black/50">Terkumpul</p>
          <span className="text-xs font-bold text-error">{post.funding_percentage}% dari target</span>
        </div>
        <div className="mt-1 flex items-baseline justify-between">
          <p className="text-2xl font-bold text-main">{formatRupiah(post.funded_amount)}</p>
          <p className="text-sm text-black/40">dari {formatRupiah(post.funding_target)}</p>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
          <div
            className="h-full rounded-full bg-error"
            style={{ width: `${Math.min(post.funding_percentage, 100)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-black/50">
          {post.donor_count} donatur · Dana dikunci ke pesanan barang, bukan tunai
        </p>
      </div>

      <div className="mx-6 mt-4">
        <h3 className="text-sm font-bold text-black">Daftar Kebutuhan</h3>
        <div className="mt-2 rounded-2xl border border-black/5">
          {post.items.map((item, i) => (
            <div
              key={item.item_id}
              className={`flex items-center justify-between p-3 ${i > 0 ? "border-t border-black/5" : ""}`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-black">{item.name}</p>
                <p className="text-xs text-black/50">
                  {item.quantity_needed} × {formatRupiah(item.price)}
                </p>
              </div>
              <span className={`shrink-0 text-sm font-bold ${itemBadgeColor(item)}`}>{item.progress_text}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 border-t border-black/5 bg-surface px-6 pt-4"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <Link href={`/dashboard/donatur/donasi?postId=${post.post_id}`}>
          <PressButton variant="primary" className="w-full py-4 text-base">
            Donasi Sekarang
          </PressButton>
        </Link>
      </div>
    </div>
  );
}
