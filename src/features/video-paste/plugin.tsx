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
import { extractLoneVideoUrl } from "@/lib/video-embed";

/**
 * Chỉ chặn paste khi clipboard *chỉ* là 1 URL YT/Vimeo (hoặc iframe embed thuần).
 * Hỗ trợ watch, youtu.be, shorts, live, embed, music, và thẻ iframe.
 * Có file ảnh / HTML có <img> → để Payload UploadFeature xử lý.
 */
function shouldHandleVideoOnlyPaste(data: DataTransfer | null): string | null {
  if (!data) return null;

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
    if (/<img\b/i.test(html) || /data:image\//i.test(html)) return null;
    // Iframe-only HTML paste
    const iframeOnly = html
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<\/?(html|body|p|div|span)[^>]*>/gi, "")
      .trim();
    if (/^<iframe[\s\S]*<\/iframe>$/i.test(iframeOnly)) {
      return extractLoneVideoUrl(iframeOnly);
    }
    // Rich HTML dài → không nuốt
    const stripped = html.replace(/<[^>]+>/g, "").trim();
    if (stripped && /\s/.test(stripped)) return null;
  }

  const text = data.getData("text/plain") ?? "";
  return extractLoneVideoUrl(text);
}

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
          console.warn("[VideoPastePlugin]", err);
          return false;
        }
      },
      COMMAND_PRIORITY_HIGH,
    );
  }, [editor]);

  return null;
}
