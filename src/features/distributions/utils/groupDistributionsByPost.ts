import type { Distribution, DistributionPostGroup } from "../types/distribution.types";

export function groupDistributionsByPost(records: Distribution[]): DistributionPostGroup[] {
  const recordsByPost = new Map<string, Distribution[]>();

  for (const record of records) {
    const postRecords = recordsByPost.get(record.post_id) ?? [];
    postRecords.push(record);
    recordsByPost.set(record.post_id, postRecords);
  }

  return Array.from(recordsByPost, ([post_id, postRecords]) => {
    const sortedRecords = [...postRecords].sort(
      (a, b) => new Date(b.captured_at).getTime() - new Date(a.captured_at).getTime(),
    );
    const latest = sortedRecords[0];

    return {
      post_id,
      post_image_url: latest.post_image_url,
      post_image_alt: latest.post_image_alt,
      post_image_caption: latest.post_image_caption,
      post_image_credit: latest.post_image_credit,
      post_image_source_url: latest.post_image_source_url,
      post_name: latest.post_name,
      disaster_event: latest.disaster_event,
      records: sortedRecords,
      total_amount: sortedRecords.reduce((total, record) => total + record.total_amount, 0),
      last_updated: latest.captured_at,
    };
  });
}
