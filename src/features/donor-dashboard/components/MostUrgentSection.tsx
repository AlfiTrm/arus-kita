"use client";

import { useState } from "react";
import Link from "next/link";
import { formatRupiahCompact } from "@/shared/utils/formatCurrency";
import type { DonorUrgentPost } from "../types/donorMap.types";

function PostThumbnail({ imageUrl, name }: { imageUrl: string; name: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-secondary/50">
      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element -- external event proof photo, arbitrary storage domain
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[10px] text-main/50">foto</div>
      )}
    </div>
  );
}

export function MostUrgentSection({ posts }: { posts: DonorUrgentPost[] }) {
  return (
    <div className="px-6 py-4">
      <h2 className="text-sm font-bold text-black">Paling mendesak</h2>

      <div className="mt-3 flex flex-col gap-2">
        {posts.map((post) => (
          <Link
            key={post.post_id}
            href={`/dashboard/donatur/posko/${post.post_id}`}
            className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-3"
          >
            <PostThumbnail imageUrl={post.image_url} name={post.name} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-black">{post.name}</p>
                <span className="shrink-0 rounded-full bg-error/10 px-2 py-0.5 text-[11px] font-bold text-error">
                  {post.funding_percentage}%
                </span>
              </div>
              <p className="mt-0.5 truncate text-xs text-black/50">
                {post.address} · butuh {formatRupiahCompact(post.funding_target)} · {post.elapsed_text}
              </p>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-black/5">
                <div
                  className="h-full rounded-full bg-error"
                  style={{ width: `${Math.min(post.funding_percentage, 100)}%` }}
                />
              </div>
            </div>
          </Link>
        ))}

        {posts.length === 0 && (
          <p className="rounded-2xl border border-dashed border-black/10 px-4 py-6 text-center text-sm text-black/40">
            Belum ada posko mendesak saat ini.
          </p>
        )}
      </div>
    </div>
  );
}
