import Link from "next/link";
import { Flame } from "lucide-react";
import PressButton from "@/shared/components/PressButton";

export function DistributionCtaCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-main p-6 text-center text-white">
      <Flame size={28} />
      <p className="text-sm font-medium leading-6">
        Masih banyak posko yang menunggu bukti penyaluran berikutnya.
      </p>
      <Link href="/">
        <PressButton variant="secondary">Ikut Berdonasi</PressButton>
      </Link>
    </div>
  );
}
