/**
 * Helper map dữ liệu Payload → shape type cũ mà UI đang dùng.
 * Dùng chung cho các module trong src/data/* (DRY).
 */

/**
 * Lấy URL ảnh từ field media (relationship depth=1 trả object có .url).
 * Nhận unknown vì doc field từ Payload chưa được typed chặt; trả "" nếu chưa có ảnh.
 *
 * Với Vercel (deploy static): URL Payload trả về `/api/media/file/<filename>`
 * là route API đọc disk — serverless không phục vụ được file đã commit.
 * File thật nằm `public/media/<filename>` → đổi sang `/media/<filename>` (static).
 */
export const mediaUrl = (media: unknown): string => {
  if (!media) return "";
  if (typeof media === "string") return normalizeMediaUrl(media);
  if (typeof media === "number") return "";
  if (typeof media === "object" && "url" in media) {
    return normalizeMediaUrl((media as { url?: string | null }).url ?? "");
  }
  return "";
};

/**
 * Chuyển URL media Payload → URL static (public/media, public/documents).
 * Xử lý cả dạng tương đối (`/api/media/file/x`) lẫn tuyệt đối
 * (`https://domain/api/media/file/x`) vì DB có thể lưu serverURL đầy đủ
 * khi upload trên Vercel (vd `https://xxx.vercel.app/api/media/file/x`).
 * URL ngoài (Cloudinary, http khác) giữ nguyên.
 */
const normalizeMediaUrl = (url: string): string => {
  const match = url.match(/\/api\/(media|documents)\/file\/(.+)$/);
  if (!match) return url;
  const collection = match[1] === "media" ? "media" : "documents";
  const filename = match[2];
  return `/${collection}/${filename}`;
};

/** Lấy mảng URL ảnh từ field upload hasMany (galleryImages). */
export const mediaUrls = (items: unknown[] | null | undefined): string[] => {
  if (!Array.isArray(items)) return [];
  return items.map(mediaUrl).filter(Boolean);
};

/**
 * Lấy mảng GalleryItem (url + mimeType) từ field upload hasMany.
 * Dùng cho gallery có thể chứa cả ảnh lẫn video.
 */
export const mediaItems = (
  items: unknown[] | null | undefined,
): Array<{ url: string; mimeType?: string }> => {
  if (!Array.isArray(items)) return [];
  const result: Array<{ url: string; mimeType?: string }> = [];
  for (const item of items) {
    const url = mediaUrl(item);
    if (!url) continue;
    const mimeType =
      typeof item === "object" && item !== null
        ? (item as { mimeType?: string | null }).mimeType ?? undefined
        : undefined;
    result.push({ url, mimeType });
  }
  return result;
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
