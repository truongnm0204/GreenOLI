/**
 * Helper map dữ liệu Payload → shape type cũ mà UI đang dùng.
 * Dùng chung cho các module trong src/data/* (DRY).
 */

/**
 * Lấy URL ảnh từ field media (relationship depth=1 trả object có .url).
 * Nhận unknown vì doc field từ Payload chưa được typed chặt; trả "" nếu chưa có ảnh.
 *
 * Production (Docker/VPS): giữ URL Payload `/api/media/file/<filename>` — handler
 * đọc disk qua staticDir. Không map sang `/media/...` vì `next start` không đảm bảo
 * serve file upload sau build (public/ chỉ tin cậy với file có lúc build).
 *
 * Absolute same-origin URLs bị rút về path tương đối để tránh lệch domain.
 * URL ngoài (Cloudinary, CDN khác) giữ nguyên.
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
 * Chuẩn hoá URL media cho frontend.
 * - `/api/media|documents/file/...` (tương đối hoặc absolute same-app) → path tương đối API
 * - URL ngoài giữ nguyên
 */
const normalizeMediaUrl = (url: string): string => {
  if (!url) return "";

  // Absolute Payload file URL → relative API path (works behind any public domain)
  const apiMatch = url.match(/\/api\/(media|documents)\/file\/(.+)$/);
  if (apiMatch) {
    return `/api/${apiMatch[1]}/file/${apiMatch[2]}`;
  }

  // Legacy static paths written when we mapped to public/ — keep working if file exists
  if (url.startsWith("/media/") || url.startsWith("/documents/")) {
    return url;
  }

  // Absolute same-host URL without /api/…/file (rare) — strip origin if it matches serverURL
  try {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      const parsed = new URL(url);
      const server = process.env.NEXT_PUBLIC_SERVER_URL;
      if (server) {
        const base = new URL(server);
        if (parsed.origin === base.origin) {
          return `${parsed.pathname}${parsed.search}`;
        }
      }
    }
  } catch {
    // ignore invalid URL
  }

  return url;
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
