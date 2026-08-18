"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_BLOCK_COMMAND } from "@payloadcms/richtext-lexical/client";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  PASTE_COMMAND,
} from "lexical";
import { useEffect } from "react";

const YT =
  /(?:youtube\.com\/watch\?(?:[^#]*&)?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([A-Za-z0-9_-]{11})/i;
const VIMEO = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i;

function extractVideoUrl(raw: string): string | null {
  const t = raw.trim();
  if (!t || /\s/.test(t)) return null;
  if (YT.test(t) || VIMEO.test(t)) return t;
  return null;
}

/**
 * Chỉ chặn paste khi clipboard *chỉ* là 1 URL YT/Vimeo thuần.
 * Nếu có file ảnh, HTML/img, hoặc text lẫn nội dung khác → trả false
 * để Payload/Lexical (UploadFeature) xử lý bình thường — tránh "Failed to fetch"
 * / mất ảnh khi paste Word/trang web.
 */
function shouldHandleVideoOnlyPaste(data: DataTransfer | null): string | null {
  if (!data) return null;

  // Có file đính kèm (ảnh chụp màn hình, kéo thả…) → không xen vào.
  if (data.files && data.files.length > 0) return null;
  const items = data.items;
  if (items) {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (it?.kind === "file") return null;
      if (it?.type?.startsWith("image/")) return null;
    }
  }

  const html = data.getData("text/html") ?? "";
  if (html) {
    // HTML có ảnh / rich content → để editor mặc định xử lý.
    if (/<img\b/i.test(html) || /data:image\//i.test(html)) return null;
    // HTML dài hơn một link đơn → bỏ qua.
    const stripped = html.replace(/<[^>]+>/g, "").trim();
    if (stripped && /\s/.test(stripped)) return null;
  }

  const text = data.getData("text/plain") ?? "";
  return extractVideoUrl(text);
}

/**
 * Khi paste clipboard chỉ chứa 1 URL YT/Vimeo → chèn block videoEmbed ngay.
 * Ưu tiên HIGH hơn link auto-paste của Payload link feature.
 */
export function VideoPastePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      PASTE_COMMAND,
      (event: ClipboardEvent) => {
        try {
          const url = shouldHandleVideoOnlyPaste(event.clipboardData);
          if (!url) return false;

          const selection = $getSelection();
          if (!$isRangeSelection(selection)) return false;

          event.preventDefault();
          editor.dispatchCommand(INSERT_BLOCK_COMMAND, {
            blockName: "",
            blockType: "videoEmbed",
            url,
            caption: null,
          });

          return true;
        } catch (err) {
          // Không chặn paste mặc định nếu plugin lỗi.
          console.warn("[VideoPastePlugin]", err);
          return false;
        }
      },
      COMMAND_PRIORITY_HIGH,
    );
  }, [editor]);

  return null;
}
