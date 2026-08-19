import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

type LexChild = {
  type?: string;
  text?: string;
  tag?: string;
  children?: LexChild[];
};

function plainText(nodes: LexChild[] | undefined): string {
  if (!nodes?.length) return "";
  return nodes
    .map((n) => {
      if (typeof n.text === "string") return n.text;
      if (n.children) return plainText(n.children);
      return "";
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

/**
 * Lấy mục lục H2/H3 từ Lexical JSON + gán id ổn định (slug-1, slug-2…).
 */
export function extractDescriptionToc(
  content: SerializedEditorState | null | undefined,
): TocItem[] {
  if (!content || typeof content !== "object") return [];
  const root = (content as { root?: { children?: LexChild[] } }).root;
  const children = root?.children;
  if (!Array.isArray(children)) return [];

  const used = new Map<string, number>();
  const items: TocItem[] = [];

  for (const node of children) {
    if (node?.type !== "heading") continue;
    const tag = node.tag;
    if (tag !== "h2" && tag !== "h3") continue;
    const text = plainText(node.children);
    if (!text) continue;
    const base = slugify(text) || "muc";
    const count = (used.get(base) ?? 0) + 1;
    used.set(base, count);
    const id = count === 1 ? base : `${base}-${count}`;
    items.push({
      id,
      text,
      level: tag === "h2" ? 2 : 3,
    });
  }

  return items;
}

/** Map text heading → id (cùng thuật toán extract) để converter gắn id. */
export function buildHeadingIdMap(
  content: SerializedEditorState | null | undefined,
): Map<string, string[]> {
  const toc = extractDescriptionToc(content);
  // queue → queue of ids in order (same text headings stack)
  const map = new Map<string, string[]>();
  for (const item of toc) {
    const key = `${item.level}:${item.text}`;
    const list = map.get(key) ?? [];
    list.push(item.id);
    map.set(key, list);
  }
  return map;
}
