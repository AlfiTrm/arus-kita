export type DistributionKind =
  | "pangan"
  | "air"
  | "tidur"
  | "kebersihan"
  | "kesehatan"
  | "bayi"
  | "peralatan"
  | "hunian";

export type DistributionStatus = "Disiapkan toko" | "Dalam perjalanan" | "Diterima posko";

export interface Distribution {
  id: string;
  post_id: string;
  post_image_url?: string;
  post_image_alt?: string;
  post_image_caption?: string;
  post_image_credit?: string;
  post_image_source_url?: string;
  title: string;
  post_name: string;
  disaster_event: "banjir" | "gempa" | "longsor" | "erupsi";
  item_summary: string;
  kind: DistributionKind;
  status: DistributionStatus;
  captured_at: string;
  total_amount: number;
  donor_count: number;
  reference_code: string;
}

export interface DistributionPostGroup {
  post_id: string;
  post_image_url?: string;
  post_image_alt?: string;
  post_image_caption?: string;
  post_image_credit?: string;
  post_image_source_url?: string;
  post_name: string;
  disaster_event: Distribution["disaster_event"];
  records: Distribution[];
  total_amount: number;
  last_updated: string;
}
