import {
  extractLoneVideoUrl,
  isYouTubeOrVimeoUrl,
} from "@/lib/video-embed";

/**
 * Chuẩn hóa Lexical description trước khi lưu (admin):
 * - Paragraph chỉ chứa URL YouTube/Vimeo (text hoặc link/autolink)
 *   → đổi thành block `videoEmbed` (B2-lite, không cần plugin paste runtime).
 *
 * Frontend vẫn có B4 auto-unfurl cho content cũ chưa qua hook.
 */

type LexNode = {
  type?: string;
  version?: number;
  text?: string;
  fields?: Record<string, unknown> & {
    url?: string;
    blockType?: string;
    caption?: string | null;
  };
  children?: LexNode[];
  format?: string | number;
  indent?: number;
  direction?: string | null;
  textFormat?: number;
  textStyle?: string;
  [key: string]: unknown;
};

type LexEditorState = {
  root?: LexNode;
  [key: string]: unknown;
};

function plainText(children: LexNode[] | undefined): string {
  if (!children?.length) return "";
  return children
    .map((c) => {
      if (typeof c.text === "string") return c.text;
      if (c.type === "linebreak") return "\n";
      if (c.children) return plainText(c.children);
      return "";
    })
    .join("");
}

function videoUrlFromParagraph(node: LexNode): string | null {
  if (node.type !== "paragraph") return null;
  const children = node.children ?? [];
  if (children.length === 0) return null;

  if (children.length === 1 && children[0]?.type === "text") {
    return extractLoneVideoUrl(children[0].text ?? "");
  }

  if (
    children.length === 1 &&
    (children[0]?.type === "link" || children[0]?.type === "autolink")
  ) {
    const href = children[0].fields?.url ?? "";
    const fromHref = extractLoneVideoUrl(href);
    if (fromHref) return fromHref;
    return extractLoneVideoUrl(plainText(children[0].children));
  }

  return extractLoneVideoUrl(plainText(children));
}

function makeVideoEmbedBlock(url: string): LexNode {
  return {
    type: "block",
    version: 2,
    fields: {
      id: `vid_${Math.random().toString(36).slice(2, 11)}`,
      blockName: "",
      blockType: "videoEmbed",
      url,
      caption: null,
    },
    format: "",
    // Payload/Lexical block nodes typically don't need children
  };
}

function mapNode(node: LexNode): LexNode {
  if (node.type === "paragraph") {
    const url = videoUrlFromParagraph(node);
    if (url && isYouTubeOrVimeoUrl(url)) {
      return makeVideoEmbedBlock(url);
    }
  }

  if (Array.isArray(node.children) && node.children.length > 0) {
    return {
      ...node,
      children: node.children.map(mapNode),
    };
  }

  return node;
}

/**
 * @returns description đã chuẩn hóa, hoặc giá trị gốc nếu không phải Lexical object.
 */
export function normalizeDescriptionVideos(
  description: unknown,
): unknown {
  if (!description || typeof description !== "object") {
    return description;
  }

  const state = description as LexEditorState;
  if (!state.root || !Array.isArray(state.root.children)) {
    return description;
  }

  const nextRoot: LexNode = {
    ...state.root,
    children: state.root.children.map(mapNode),
  };

  return {
    ...state,
    root: nextRoot,
  };
}
