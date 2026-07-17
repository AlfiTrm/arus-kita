export type DisasterType = "banjir" | "gempa" | "longsor" | "erupsi" | "lainnya";

export interface EventPhoto {
  dataUrl: string;
  latitude: number | null;
  longitude: number | null;
  capturedAt: Date;
}
