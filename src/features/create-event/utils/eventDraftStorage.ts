const STORAGE_KEY = "aruskita_event_draft";

export interface EventDraftPhoto {
  dataUrl: string;
  latitude: number | null;
  longitude: number | null;
  capturedAt: string;
}

export interface EventDraft {
  step: number;
  photos: EventDraftPhoto[];
  name: string;
  description: string;
  disasterType: string;
  address: string;
  radiusMeters: number;
  quantities: Record<string, number>;
  wizardStartedAt: string;
}

export function saveEventDraft(draft: EventDraft) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // storage full or unavailable — draft persistence is best-effort, safe to skip
  }
}

export function loadEventDraft(): EventDraft | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as EventDraft;
  } catch {
    return null;
  }
}

export function clearEventDraft() {
  sessionStorage.removeItem(STORAGE_KEY);
}
