"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, QrCode } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import type { DashboardEvent } from "../types/adminDashboard.types";

const BADGE_VARIANT_CLASS: Record<string, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
  info: "bg-main/10 text-main",
};

export function EventCard({ event }: { event: DashboardEvent }) {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);
  const isActive = event.status === "active";

  function goToScan() {
    const params = new URLSearchParams({ title: event.title, code: event.event_code });
    router.push(`/dashboard/admin/event/${event.post_id}/scan?${params.toString()}`);
  }

  return (
    <div className="mx-6 mt-4 overflow-hidden rounded-2xl border border-black/5 bg-white">
      <div className="flex items-center justify-between px-4 pt-4">
        <span
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
            isActive ? "bg-error text-white" : "bg-black/10 text-black/50"
          }`}
        >
          {isActive && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />}
          {event.disaster_type.toUpperCase()} · {event.status_label}
        </span>
        <span className="text-xs text-black/40">{event.elapsed_text}</span>
      </div>

      <div className="relative mx-4 mt-3 aspect-video overflow-hidden rounded-xl bg-secondary/40">
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element -- external event proof photo, arbitrary storage domain
          <img
            src={event.image_url}
            alt={event.title}
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
            [ foto event ]
          </div>
        )}
      </div>

      <div className="px-4 pt-3">
        <h3 className="text-sm font-bold text-black">{event.title}</h3>
        <p className="mt-0.5 text-xs text-black/50">
          {event.event_code} · radius {event.geofence_radius} m
          {event.affected_households > 0 && ` · ${event.affected_households} KK terdampak`}
        </p>
      </div>

      <div className="mt-3 px-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-black/50">Pendanaan</span>
          <span className="font-semibold text-main">{event.funding_text}</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
          <div
            className="h-full rounded-full bg-main"
            style={{ width: `${Math.min(event.funding_percentage, 100)}%` }}
          />
        </div>
      </div>

      {event.latest_orders && event.latest_orders.length > 0 && (
        <div className="mt-3 flex flex-col gap-2 px-4">
          {event.latest_orders.map((order) => (
            <div
              key={order.order_id}
              className="flex items-center justify-between rounded-xl border border-black/5 px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-black">
                  {order.order_code}
                  {order.store_name && ` · ${order.store_name}`}
                </p>
                <p className="truncate text-[11px] text-black/50">{order.description}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  BADGE_VARIANT_CLASS[order.badge_variant] ?? "bg-black/5 text-black/50"
                }`}
              >
                {order.status_label}
              </span>
            </div>
          ))}
        </div>
      )}

      {(event.can_scan_courier_qr || event.can_add_follow_up_request) && (
        <div className="mt-3 flex flex-col gap-2 px-4 pb-4">
          {event.can_scan_courier_qr && (
            <PressButton variant="primary" className="flex w-full items-center justify-center gap-2" onClick={goToScan}>
              <QrCode size={16} /> Scan QR Kurir — Terima Barang
            </PressButton>
          )}
          {event.can_add_follow_up_request && (
            <Link
              href={`/dashboard/admin/event/${event.post_id}/tambah-kebutuhan`}
              className="flex items-center justify-center gap-1 py-1 text-xs font-semibold text-main"
            >
              <Plus size={14} /> Tambah kebutuhan susulan
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
