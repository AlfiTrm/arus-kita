export type DisasterType = "banjir" | "gempa" | "longsor" | "erupsi";

export interface EventPhoto {
  dataUrl: string;
  latitude: number | null;
  longitude: number | null;
  capturedAt: Date;
}
