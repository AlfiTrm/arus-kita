"use client";

import { Award, Share2 } from "lucide-react";
import type { CourierGoodnessCertificate } from "../types/courierGoodness.types";

export function CourierCertificateCard({ certificate }: { certificate: CourierGoodnessCertificate }) {
  function handleShare() {
    const url = `${window.location.origin}${certificate.share_url}`;
    const shareText = `Sertifikat digital ${certificate.courier_name} — ${certificate.partner_label} ${certificate.since_text}.`;
    if (navigator.share) {
      navigator.share({ title: certificate.title, text: shareText, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-main p-5 text-white">
      <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-white/5" />

      <div className="flex items-start justify-between">
        <p className="text-[11px] font-bold tracking-wide text-white/60 uppercase">{certificate.title}</p>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
          <Award size={18} />
        </span>
      </div>

      <p className="mt-1 text-lg font-bold">{certificate.courier_name}</p>
      <p className="text-xs text-white/70">
        {certificate.partner_label} · {certificate.since_text}
      </p>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        <div>
          <p className="text-lg font-extrabold">{certificate.delivery_count}</p>
          <p className="text-[10px] text-white/60">antaran sukses</p>
        </div>
        <div>
          <p className="text-lg font-extrabold">{Math.round(certificate.total_distance_km)} km</p>
          <p className="text-[10px] text-white/60">jarak kerelawanan</p>
        </div>
        <div>
          <p className="text-lg font-extrabold">
            {certificate.reputation_score > 0 ? certificate.reputation_score.toFixed(1) : "–"}
          </p>
          <p className="text-[10px] text-white/60">reputasi</p>
        </div>
        <div>
          <p className="text-lg font-extrabold">{certificate.dispute_count}</p>
          <p className="text-[10px] text-white/60">sengketa</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleShare}
        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full border border-white/30 bg-white/10 py-2.5 text-xs font-bold text-white"
      >
        <Share2 size={14} /> Bagikan tautan sertifikat
      </button>
    </div>
  );
}
