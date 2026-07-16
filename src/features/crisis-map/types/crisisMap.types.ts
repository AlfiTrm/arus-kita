export type PoskoStatus = "active" | "funded";

export interface Posko {
  id: string;
  name: string;
  lat: number;
  lng: number;
  fundedPercent: number;
  status: PoskoStatus;
}
