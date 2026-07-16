"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { formatRupiah } from "@/shared/utils/formatCurrency";
import type { Distribution } from "../types/distribution.types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function truncateHash(hash: string): string {
  return hash.length > 12 ? `${hash.slice(0, 6)}...${hash.slice(-4)}` : hash;
}

export function DistributionCard({ item }: { item: Distribution }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
      <div className="relative aspect-4/3 bg-secondary/40">
        {item.gps_valid && (
          <span className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-full bg-success px-2 py-1 text-[10px] font-semibold text-white">
            <ShieldCheck size={12} /> GPS VALID
          </span>
        )}

        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary external proof-photo domain, next/image needs allowlisting
          <img
            src={item.image_url}
            alt={item.title}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-xs font-medium text-main/50"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, color-mix(in srgb, var(--color-secondary) 60%, white) 0 10px, color-mix(in srgb, var(--color-secondary) 30%, white) 10px 20px)",
            }}
          >
            [ foto serah terima ]
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-black">{item.title}</h3>
        <p className="mt-1 text-xs text-black/50">
          {formatDate(item.captured_at)} · {formatRupiah(item.total_amount)} · {item.donor_count} donatur
        </p>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="font-mono text-main/70">🔗 {truncateHash(item.audit_hash)}</span>
          <a href={`/penyaluran/${item.verification_id}`} className="font-medium text-black/50 hover:text-main">
            Laporan
          </a>
        </div>
      </div>
    </div>
  );
}
