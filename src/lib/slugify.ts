/**
 * Convert Vietnamese title-case strings to URL-safe kebab-case slugs.
 *   "Hóa Chất Diệt Côn Trùng" → "hoa-chat-diet-con-trung"
 */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
