"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminDashboard } from "@/features/admin-dashboard/hooks/useAdminDashboard";
import { CameraCaptureStep } from "@/features/create-event/components/CameraCaptureStep";
import { CameraInfoModal } from "@/features/create-event/components/CameraInfoModal";
import { EventDetailsStep } from "@/features/create-event/components/EventDetailsStep";
import { EventNeedsStep } from "@/features/create-event/components/EventNeedsStep";
import { EventStepHeader } from "@/features/create-event/components/EventStepHeader";
import { EventSuccessStep } from "@/features/create-event/components/EventSuccessStep";
import { adminEventService } from "@/features/create-event/services/adminEventService";
import { EVENT_ITEM_CATALOG } from "@/features/create-event/constants/eventItemCatalog";
import { clearEventDraft, loadEventDraft, saveEventDraft } from "@/features/create-event/utils/eventDraftStorage";
import type { CreateEventData } from "@/features/create-event/types/adminEvent.types";
import type { DisasterType, EventPhoto } from "@/features/create-event/types/createEvent.types";

type WizardStep = 1 | 2 | 3 | 4;

export default function CreateEventPage() {
  const router = useRouter();
  const { dashboard } = useAdminDashboard();

  const [step, setStep] = useState<WizardStep>(1);
  const [showInfo, setShowInfo] = useState(false);
  const [photos, setPhotos] = useState<EventPhoto[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [disasterType, setDisasterType] = useState<DisasterType>("banjir");
  const [address, setAddress] = useState("");
  const [radiusMeters, setRadiusMeters] = useState(500);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [wizardStartedAt, setWizardStartedAt] = useState(() => new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdEvent, setCreatedEvent] = useState<CreateEventData | null>(null);
  const isHydrated = useRef(false);
  const [isHydrating, setIsHydrating] = useState(true);

  useLayoutEffect(() => {
    const draft = loadEventDraft();
    if (draft) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring from sessionStorage before first paint, unavailable during SSR
      setStep(draft.step as WizardStep);
      setPhotos(draft.photos.map((p) => ({ ...p, capturedAt: new Date(p.capturedAt) })));
      setName(draft.name);
      setDescription(draft.description);
      setDisasterType(draft.disasterType as DisasterType);
      setAddress(draft.address);
      setRadiusMeters(draft.radiusMeters);
      setQuantities(draft.quantities);
      setWizardStartedAt(new Date(draft.wizardStartedAt));
    }
    isHydrated.current = true;
    setIsHydrating(false);
  }, []);

  useEffect(() => {
    if (!isHydrated.current || step === 4) return;
    saveEventDraft({
      step,
      photos: photos.map((p) => ({ ...p, capturedAt: p.capturedAt.toISOString() })),
      name,
      description,
      disasterType,
      address,
      radiusMeters,
      quantities,
      wizardStartedAt: wizardStartedAt.toISOString(),
    });
  }, [step, photos, name, description, disasterType, address, radiusMeters, quantities, wizardStartedAt]);

  const stepSubtitle =
    step === 1
      ? "Foto kondisi bencana (min. 1, maks. 3)"
      : step === 2
        ? "Data event bencana"
        : "Kebutuhan permintaan";

  function handleClose() {
    clearEventDraft();
    router.push("/dashboard/admin");
  }

  async function handleSubmitEvent() {
    const firstPhoto = photos[0];
    if (!firstPhoto) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const photoBlob = await (await fetch(firstPhoto.dataUrl)).blob();
      const result = await adminEventService.create({
        name,
        description,
        disasterType,
        address,
        latitude: firstPhoto.latitude ?? 0,
        longitude: firstPhoto.longitude ?? 0,
        geofenceRadius: radiusMeters,
        photoBlob,
        items: EVENT_ITEM_CATALOG.filter((item) => (quantities[item.id] ?? 0) > 0).map((item) => ({
          name: item.name,
          price: item.pricePerUnit,
          quantity_needed: quantities[item.id],
        })),
      });
      setCreatedEvent(result);
      setStep(4);
      clearEventDraft();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Gagal menerbitkan event");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isHydrating) {
    return <div className="h-dvh bg-black" />;
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-black">
      {step < 4 && (
        <EventStepHeader
          step={step}
          totalSteps={3}
          subtitle={stepSubtitle}
          variant={step === 1 ? "dark" : "light"}
          onClose={handleClose}
          onInfoClick={step === 1 ? () => setShowInfo(true) : undefined}
        />
      )}

      {step === 1 && (
        <CameraCaptureStep
          onNext={(photo) => {
            setPhotos((prev) => [...prev, photo]);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <EventDetailsStep
          photos={photos}
          name={name}
          onNameChange={setName}
          description={description}
          onDescriptionChange={setDescription}
          disasterType={disasterType}
          onDisasterTypeChange={setDisasterType}
          address={address}
          onAddressChange={setAddress}
          radiusMeters={radiusMeters}
          onRadiusChange={setRadiusMeters}
          onAddPhoto={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <EventNeedsStep
          quantities={quantities}
          onQuantitiesChange={setQuantities}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onSubmit={handleSubmitEvent}
        />
      )}

      {step === 4 && createdEvent && (
        <EventSuccessStep
          eventTitle={createdEvent.name}
          eventCode={createdEvent.event_code}
          targetDana={createdEvent.funding_target}
          itemCount={createdEvent.items.length}
          isAdminVerified={dashboard?.is_admin_verified ?? false}
          verificationText={dashboard?.verification_text ?? "Status tidak diketahui"}
          wizardStartedAt={wizardStartedAt}
          onGoHome={() => router.push("/dashboard/admin")}
        />
      )}

      {showInfo && <CameraInfoModal onClose={() => setShowInfo(false)} />}
    </div>
  );
}
