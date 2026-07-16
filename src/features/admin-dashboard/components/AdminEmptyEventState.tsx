import Link from "next/link";
import { MapPinned } from "lucide-react";
import PressButton from "@/shared/components/PressButton";

export function AdminEmptyEventState() {
  return (
    <div className="mx-6 mt-10 flex flex-col items-center rounded-2xl border border-dashed border-black/10 px-6 py-12 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-main">
        <MapPinned size={26} />
      </span>
      <h2 className="mt-4 text-base font-semibold text-black">Belum ada event aktif</h2>
      <p className="mt-1 text-sm text-black/50">
        Buat event bencana buat mulai terima donasi & susun pesanan logistik ke posko Anda.
      </p>
      <Link href="/dashboard/admin/buat-event" className="mt-5 w-full">
        <PressButton variant="primary" className="w-full">
          Buat Event Pertama
        </PressButton>
      </Link>
    </div>
  );
}
