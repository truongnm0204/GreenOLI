/**
 * Helper map dữ liệu Payload → shape type cũ mà UI đang dùng.
 * Dùng chung cho các module trong src/data/* (DRY).
 */

/**
 * Lấy URL ảnh từ field media (relationship depth=1 trả object có .url).
 * Nhận unknown vì doc field từ Payload chưa được typed chặt; trả "" nếu chưa có ảnh.
 */
export const mediaUrl = (media: unknown): string => {
  if (!media) return "";
  if (typeof media === "string") return media;
  if (typeof media === "number") return "";
  if (typeof media === "object" && "url" in media) {
    return (media as { url?: string | null }).url ?? "";
  }
  return "";
};

/** Lấy mảng URL ảnh từ field upload hasMany (galleryImages). */
export const mediaUrls = (items: unknown[] | null | undefined): string[] => {
  if (!Array.isArray(items)) return [];
  return items.map(mediaUrl).filter(Boolean);
};

/**
 * Payload array field lưu dạng [{ value: string, id }] → map về string[].
 * Dùng cho tags, certifications.
 */
export const valueList = (
  items: Array<{ value: string }> | null | undefined,
): string[] => {
  if (!Array.isArray(items)) return [];
  return items.map((i) => i.value).filter(Boolean);
};

/**
 * Relationship trả về object (depth>=1) hoặc id (depth=0).
 * Lấy slug nếu là object, ngược lại chuỗi rỗng.
 */
export const relSlug = (rel: { slug?: string } | number | null | undefined): string => {
  if (!rel || typeof rel === "number") return "";
  return rel.slug ?? "";
};
