/**
 * YouTube / Vimeo URL → embed URL + detection helpers.
 * Dùng chung cho block videoEmbed, paste plugin, admin preview, unfurl frontend.
 */

const YT_ID = /^[A-Za-z0-9_-]{11}$/;

/** Bắt video id từ hầu hết URL YouTube phổ biến (watch, youtu.be, embed, shorts, live, music). */
const YT_PATTERNS: RegExp[] = [
  /(?:youtube\.com|youtube-nocookie\.com)\/watch\?(?:[^#]*&)?v=([A-Za-z0-9_-]{11})/i,
  /(?:youtube\.com|youtube-nocookie\.com)\/embed\/([A-Za-z0-9_-]{11})/i,
  /(?:youtube\.com|youtube-nocookie\.com)\/shorts\/([A-Za-z0-9_-]{11})/i,
  /(?:youtube\.com|youtube-nocookie\.com)\/live\/([A-Za-z0-9_-]{11})/i,
  /(?:youtube\.com|youtube-nocookie\.com)\/v\/([A-Za-z0-9_-]{11})/i,
  /(?:youtube\.com|youtube-nocookie\.com)\/music\/(?:watch|embed)\/?\?(?:[^#]*&)?v=([A-Za-z0-9_-]{11})/i,
  /youtu\.be\/([A-Za-z0-9_-]{11})/i,
];

const VIMEO =
  /(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)(\d{6,12})/i;

/** Lấy src từ thẻ iframe nếu user dán nguyên HTML. */
function extractFromIframeHtml(raw: string): string | null {
  const t = raw.trim();
  if (!t.toLowerCase().includes("<iframe")) return null;
  const srcMatch =
    t.match(/src\s*=\s*["']([^"']+)["']/i) ||
    t.match(/src\s*=\s*([^\s>]+)/i);
  if (!srcMatch?.[1]) return null;
  return srcMatch[1].replace(/&amp;/g, "&").trim();
}

/** Chuẩn hóa input: URL thuần, iframe HTML, hoặc text có URL. */
export function normalizeVideoInput(raw: string): string {
  const fromIframe = extractFromIframeHtml(raw);
  if (fromIframe) return fromIframe;

  const t = raw.trim();
  // Nếu dán cả đoạn có URL ở giữa, cố gắng bắt URL đầu tiên.
  const urlInText = t.match(
    /https?:\/\/[^\s<>"']+(?:youtube\.com|youtu\.be|vimeo\.com|youtube-nocookie\.com)[^\s<>"']*/i,
  );
  if (urlInText?.[0] && /\s/.test(t)) {
    return urlInText[0].replace(/[),.;]+$/, "");
  }
  return t;
}

export function extractYouTubeId(raw: string): string | null {
  const url = normalizeVideoInput(raw);
  if (!url) return null;

  for (const re of YT_PATTERNS) {
    const m = url.match(re);
    if (m?.[1] && YT_ID.test(m[1])) return m[1];
  }

  // Fallback: query v= trên bất kỳ host youtube
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    if (
      /youtube\.com$/i.test(u.hostname.replace(/^www\./, "")) ||
      /youtube-nocookie\.com$/i.test(u.hostname.replace(/^www\./, "")) ||
      /youtu\.be$/i.test(u.hostname.replace(/^www\./, ""))
    ) {
      const v = u.searchParams.get("v");
      if (v && YT_ID.test(v)) return v;
    }
  } catch {
    /* ignore invalid URL */
  }

  return null;
}

export function extractVimeoId(raw: string): string | null {
  const url = normalizeVideoInput(raw);
  if (!url) return null;
  const m = url.match(VIMEO);
  return m?.[1] ?? null;
}

export function isYouTubeOrVimeoUrl(raw: string): boolean {
  return Boolean(extractYouTubeId(raw) || extractVimeoId(raw));
}

/** Trả embed URL; nếu không nhận diện được thì trả null. */
export function toVideoEmbedUrl(raw: string): string | null {
  const yt = extractYouTubeId(raw);
  if (yt) return `https://www.youtube.com/embed/${yt}`;

  const vimeo = extractVimeoId(raw);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo}`;

  return null;
}

/**
 * Text node / clipboard có phải “chỉ một URL video” không
 * (cho phép khoảng trắng quanh; cho phép nguyên iframe 1 thẻ).
 */
export function extractLoneVideoUrl(text: string): string | null {
  const t = text.trim();
  if (!t) return null;

  // Iframe đơn: cho phép
  if (/^<iframe[\s\S]*<\/iframe>$/i.test(t) || /^<iframe[\s\S]*\/>$/i.test(t)) {
    return isYouTubeOrVimeoUrl(t) ? normalizeVideoInput(t) : null;
  }

  // Nhiều dòng / nhiều từ nhưng normalize ra đúng 1 video URL
  if (/\s/.test(t) && !t.toLowerCase().includes("<iframe")) {
    // Chỉ accept nếu sau normalize vẫn detect được VÀ phần còn lại gần như chỉ là URL
    const normalized = normalizeVideoInput(t);
    if (normalized !== t && isYouTubeOrVimeoUrl(normalized)) {
      // Có URL trong text dài hơn — không coi là "lone" (tránh nuốt cả đoạn paste)
      return null;
    }
    if (!/\s/.test(normalized) && isYouTubeOrVimeoUrl(normalized)) {
      return normalized;
    }
    return null;
  }

  const normalized = normalizeVideoInput(t);
  return isYouTubeOrVimeoUrl(normalized) ? normalized : null;
}
