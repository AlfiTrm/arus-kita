import { formatRupiah } from "@/shared/utils/formatCurrency";
import type { DonorProfile } from "../types/donorProfile.types";
import type { DonorTransaction } from "../types/donorTransaction.types";

export function TransactionStatsCard({
  transactions,
  profile,
}: {
  transactions: DonorTransaction[];
  profile: DonorProfile | null;
}) {
  const completed = transactions.filter((t) => t.status === "completed");
  const verifiedPercentage =
    completed.length > 0
      ? Math.round((completed.filter((t) => t.verification_image_url).length / completed.length) * 100)
      : 0;

  return (
    <div className="mx-6 mt-4 rounded-2xl bg-main p-4 text-white">
      <p className="text-xs text-white/70">Saldo donasi</p>
      <p className="mt-1 text-2xl font-bold">
        {profile ? formatRupiah(profile.undistributed_donation_amount) : "-"}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3 text-center">
        <div className="flex-1">
          <p className="text-sm font-bold">{profile?.total_donated_amount_text ?? "-"}</p>
          <p className="text-[10px] text-white/70">Total tersalurkan</p>
        </div>
        <div className="h-6 w-px bg-white/20" />
        <div className="flex-1">
          <p className="text-sm font-bold">{profile?.supported_post_count ?? "-"}</p>
          <p className="text-[10px] text-white/70">Posko dibantu</p>
        </div>
        <div className="h-6 w-px bg-white/20" />
        <div className="flex-1">
          <p className="text-sm font-bold">{verifiedPercentage}%</p>
          <p className="text-[10px] text-white/70">Terverifikasi foto</p>
        </div>
      </div>
    </div>
  );
}
