import { getPayloadClient } from "@/lib/payload-client";

type LexNode = {
  type?: string;
  value?: unknown;
  relationTo?: string;
  children?: LexNode[];
  fields?: Record<string, unknown> | null;
  [key: string]: unknown;
};

type LexEditorState = {
  root?: LexNode;
  [key: string]: unknown;
};

function walk(node: LexNode | undefined, visit: (n: LexNode) => void) {
  if (!node || typeof node !== "object") return;
  visit(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child, visit);
  }
  // blocks: fields may nest richtext / upload relations
  if (node.fields && typeof node.fields === "object") {
    for (const v of Object.values(node.fields)) {
      if (v && typeof v === "object") {
        // gallery images array of { image: id|obj }
        if (Array.isArray(v)) {
          for (const item of v) {
            if (item && typeof item === "object") {
              walk(item as LexNode, visit);
            }
          }
        } else {
          walk(v as LexNode, visit);
        }
      }
    }
  }
}

function collectUploadIds(state: LexEditorState): Array<{
  relationTo: string;
  id: string | number;
  node: LexNode;
}> {
  const hits: Array<{ relationTo: string; id: string | number; node: LexNode }> =
    [];
  walk(state.root, (n) => {
    if (n.type !== "upload") return;
    const relationTo =
      typeof n.relationTo === "string" ? n.relationTo : "media";
    const value = n.value;
    if (value == null) return;
    if (typeof value === "object") {
      // already populated
      return;
    }
    if (typeof value === "number" || typeof value === "string") {
      hits.push({ relationTo, id: value, node: n });
    }
  });
  return hits;
}

/**
 * Khi Lexical upload node chỉ còn id (chưa populate), depth find đôi khi
 * không hydrate nested richtext. Fetch media/documents và gắn object đủ url/mime.
 */
export async function hydrateDescriptionUploads<T>(description: T): Promise<T> {
  if (!description || typeof description !== "object") return description;

  // deep clone so we don't mutate Payload cache / shared refs
  const state = JSON.parse(JSON.stringify(description)) as LexEditorState;
  if (!state.root) return description;

  const hits = collectUploadIds(state);
  if (!hits.length) return description;

  const payload = await getPayloadClient();
  const cache = new Map<string, unknown>();

  await Promise.all(
    hits.map(async ({ relationTo, id, node }) => {
      const key = `${relationTo}:${id}`;
      if (!cache.has(key)) {
        try {
          if (relationTo !== "media" && relationTo !== "documents") {
            cache.set(key, null);
          } else {
            const doc = await payload.findByID({
              collection: relationTo as "media" | "documents",
              id,
              depth: 0,
            });
            cache.set(key, doc);
          }
        } catch {
          cache.set(key, null);
        }
      }
      const doc = cache.get(key);
      if (doc && typeof doc === "object") {
        node.value = doc;
      }
    }),
  );

  return state as T;
}
