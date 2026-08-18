/**
 * YouTube / Vimeo URL → embed URL + detection helpers.
 * Dùng chung cho block videoEmbed và auto-unfurl link/paragraph (kiểu Notion).
 */

const YT_WATCH =
  /(?:youtube\.com\/watch\?(?:[^#]*&)?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([A-Za-z0-9_-]{11})/i;
const YT_BARE_ID = /^[A-Za-z0-9_-]{11}$/;
const VIMEO = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i;

export function isYouTubeOrVimeoUrl(raw: string): boolean {
  const url = raw.trim();
  if (!url) return false;
  return YT_WATCH.test(url) || VIMEO.test(url);
}

/** Trả embed URL; nếu không nhận diện được thì trả null (không fallback raw URL lạ). */
export function toVideoEmbedUrl(raw: string): string | null {
  const url = raw.trim();
  if (!url) return null;

  const yt = url.match(YT_WATCH);
  if (yt?.[1] && YT_BARE_ID.test(yt[1])) {
    return `https://www.youtube.com/embed/${yt[1]}`;
  }

  const vimeo = url.match(VIMEO);
  if (vimeo?.[1]) {
    return `https://player.vimeo.com/video/${vimeo[1]}`;
  }

  return null;
}

/** Text node có phải “chỉ một URL video” không (cho phép khoảng trắng quanh). */
export function extractLoneVideoUrl(text: string): string | null {
  const t = text.trim();
  if (!t || /\s/.test(t)) return null;
  return isYouTubeOrVimeoUrl(t) ? t : null;
}
