"use client";

import { AdminEmptyEventState } from "@/features/admin-dashboard/components/AdminEmptyEventState";
import { AdminHomeHeader } from "@/features/admin-dashboard/components/AdminHomeHeader";
import { ClosedEventItem } from "@/features/admin-dashboard/components/ClosedEventItem";
import { EventCard } from "@/features/admin-dashboard/components/EventCard";
import { useAdminDashboard } from "@/features/admin-dashboard/hooks/useAdminDashboard";

export default function AdminDashboardPage() {
  const { dashboard, isLoading, error } = useAdminDashboard();

  const hasNoEvents = dashboard && dashboard.active_events.length === 0 && dashboard.closed_events.length === 0;

  return (
    <div className="pb-8">
      <AdminHomeHeader
        name={dashboard?.greeting_name ?? ""}
        verificationText={dashboard?.verification_text ?? ""}
        isVerified={dashboard?.is_admin_verified ?? false}
        isLoading={isLoading}
      />

      {error && <p className="mx-6 mt-4 text-sm text-error">{error}</p>}

      {dashboard?.active_events.map((event) => <EventCard key={event.post_id} event={event} />)}

      {hasNoEvents && <AdminEmptyEventState />}

      {dashboard && dashboard.closed_events.length > 0 && (
        <div className="mt-2">
          {dashboard.closed_events.map((event) => (
            <ClosedEventItem key={event.post_id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
