"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createUploadNode } from "@payloadcms/richtext-lexical/client";
import { toast } from "@payloadcms/ui";
import {
  $createParagraphNode,
  $createTextNode,
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  PASTE_COMMAND,
} from "lexical";
import { useEffect } from "react";

const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif|svg)(\?|#|$)/i;

function isLikelyImageUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith("data:image/")) return true;
  if (!/^https?:\/\//i.test(url)) return false;
  if (IMAGE_EXT.test(url)) return true;
  if (/\/(?:images?|img|media|uploads|wp-content)\//i.test(url)) return true;
  return false;
}

function collectImageUrlsFromHtml(html: string): string[] {
  const urls: string[] = [];
  const re = /<img\b[^>]*?\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const src = (m[1] || m[2] || m[3] || "").trim();
    if (src && isLikelyImageUrl(src)) urls.push(src);
  }
  const srcsetRe = /<img\b[^>]*?\bsrcset\s*=\s*(?:"([^"]+)"|'([^']+)')/gi;
  while ((m = srcsetRe.exec(html))) {
    const raw = (m[1] || m[2] || "").trim();
    const first = raw.split(",")[0]?.trim().split(/\s+/)[0];
    if (first && isLikelyImageUrl(first)) urls.push(first);
  }
  return [...new Set(urls)];
}

/** Lấy text thuần theo block (p/div/li/br/h*) để dán lại khi chặn HTML mặc định. */
function plainBlocksFromHtml(html: string): string[] {
  if (!html) return [];
  let t = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<img\b[^>]*>/gi, "")
    .replace(/<\/(p|div|h[1-6]|li|tr|blockquote)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?(ul|ol|table|thead|tbody|tfoot)[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\r/g, "");
  // decode a few more entities lightly
  t = t.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
  return t
    .split("\n")
    .map((l) => l.replace(/[ \t]+/g, " ").trim())
    .filter(Boolean);
}

function collectFiles(data: DataTransfer): File[] {
  const out: File[] = [];
  if (data.files?.length) {
    for (const f of Array.from(data.files)) {
      if (f.type.startsWith("image/")) out.push(f);
    }
  }
  if (!out.length && data.items) {
    for (const it of Array.from(data.items)) {
      if (it.kind === "file" && it.type.startsWith("image/")) {
        const f = it.getAsFile();
        if (f) out.push(f);
      }
    }
  }
  return out;
}

async function uploadFileToMedia(
  file: File,
): Promise<{ id: string | number } | null> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append(
    "_payload",
    JSON.stringify({
      alt:
        file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ") ||
        "pasted image",
    }),
  );

  const res = await fetch("/api/media", {
    method: "POST",
    body: fd,
    credentials: "include",
  });
  if (!res.ok) {
    let msg = `Upload failed (${res.status})`;
    try {
      const j = await res.json();
      msg = j?.errors?.[0]?.message || j?.error || msg;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  const json = (await res.json()) as {
    doc?: { id?: string | number };
    id?: string | number;
  };
  const id = json.doc?.id ?? json.id;
  if (id == null) return null;
  return { id };
}

async function importRemoteImage(
  url: string,
): Promise<{ id: string | number } | null> {
  if (url.startsWith("data:image/")) {
    const mimeMatch = url.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/);
    const mime = mimeMatch?.[1] || "image/png";
    const b64 = url.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, "");
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const ext = mime.split("/")[1] || "png";
    const file = new File([bytes], `pasted-image.${ext}`, { type: mime });
    return uploadFileToMedia(file);
  }

  const res = await fetch("/api/admin/import-remote-image", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  const json = (await res.json()) as {
    ok?: boolean;
    error?: string;
    doc?: { id?: string | number };
  };
  if (!res.ok || !json.ok || json.doc?.id == null) {
    throw new Error(json.error || `Import failed (${res.status})`);
  }
  return { id: json.doc.id };
}

function insertUpload(
  editor: ReturnType<typeof useLexicalComposerContext>[0],
  id: string | number,
) {
  editor.update(() => {
    const node = $createUploadNode({
      data: {
        fields: {},
        relationTo: "media",
        value: id,
      },
    });
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $insertNodes([node]);
    } else {
      $insertNodes([node]);
    }
  });
}

function insertPlainParagraphs(
  editor: ReturnType<typeof useLexicalComposerContext>[0],
  lines: string[],
) {
  if (!lines.length) return;
  editor.update(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;
    const nodes = lines.map((line) => {
      const p = $createParagraphNode();
      p.append($createTextNode(line));
      return p;
    });
    $insertNodes(nodes);
  });
}

/**
 * Chặn paste HTML có <img http> (Payload sẽ tạo pending node → fetch CORS → Failed to fetch).
 * Thay bằng: dán text sạch + import ảnh qua /api/media hoặc server proxy.
 */
export function ImagePastePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      PASTE_COMMAND,
      (event: ClipboardEvent) => {
        try {
          if (!(event instanceof ClipboardEvent)) return false;
          const data = event.clipboardData;
          if (!data) return false;

          const files = collectFiles(data);
          const html = data.getData("text/html") || "";
          const text = data.getData("text/plain") || "";

          // A) File ảnh thật (screenshot / Copy image / Explorer)
          if (files.length > 0) {
            event.preventDefault();
            event.stopPropagation();

            // Nếu kèm text (hiếm với file-only) vẫn chèn text plain
            const extraText = text.trim();
            if (extraText && !html.includes("<img")) {
              insertPlainParagraphs(editor, extraText.split(/\n+/).filter(Boolean));
            }

            void (async () => {
              let ok = 0;
              for (const file of files) {
                try {
                  const doc = await uploadFileToMedia(file);
                  if (doc) {
                    insertUpload(editor, doc.id);
                    ok++;
                  }
                } catch (err) {
                  console.error("[ImagePastePlugin] file", err);
                  toast.error(
                    err instanceof Error ? err.message : "Upload ảnh thất bại",
                  );
                }
              }
              if (ok) toast.success(`Đã chèn ${ok} ảnh`);
            })();

            return true;
          }

          // B) HTML có ảnh remote / data-url — PHẢI chặn path mặc định
          const remoteUrls = html ? collectImageUrlsFromHtml(html) : [];
          if (!remoteUrls.length && isLikelyImageUrl(text.trim())) {
            remoteUrls.push(text.trim());
          }

          // Cũng bắt khi HTML có <img> dù URL không “likely” (vẫn sẽ fail CORS nếu để mặc định)
          const hasImgTag = /<img\b/i.test(html);
          if (!remoteUrls.length && hasImgTag) {
            // cố gắng lấy mọi src
            const loose = html.matchAll(
              /<img\b[^>]*?\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi,
            );
            for (const m of loose) {
              const src = (m[1] || m[2] || m[3] || "").trim();
              if (src) remoteUrls.push(src);
            }
          }

          if (remoteUrls.length > 0 || hasImgTag) {
            event.preventDefault();
            event.stopPropagation();

            // Chèn text (bỏ img) để không mất nội dung bài
            const lines = plainBlocksFromHtml(html);
            if (lines.length) {
              insertPlainParagraphs(editor, lines);
            } else if (text.trim() && !isLikelyImageUrl(text.trim())) {
              insertPlainParagraphs(
                editor,
                text
                  .split(/\n+/)
                  .map((l) => l.trim())
                  .filter(Boolean),
              );
            }

            const slice = [...new Set(remoteUrls)].slice(0, 12);
            if (!slice.length) {
              toast.error(
                "Clipboard có ảnh nhưng không lấy được URL. Hãy tải ảnh về máy rồi kéo thả / dán file.",
              );
              return true;
            }

            void (async () => {
              let ok = 0;
              toast.info(`Đang import ${slice.length} ảnh vào Media…`);
              for (const url of slice) {
                try {
                  const doc = await importRemoteImage(url);
                  if (doc) {
                    insertUpload(editor, doc.id);
                    ok++;
                  }
                } catch (err) {
                  console.error("[ImagePastePlugin] remote", url, err);
                  toast.error(
                    err instanceof Error
                      ? err.message
                      : "Không import được ảnh (thử tải về máy rồi dán file)",
                  );
                }
              }
              if (ok) toast.success(`Đã import ${ok}/${slice.length} ảnh`);
              else if (slice.length)
                toast.error(
                  "Import ảnh thất bại. Tải ảnh về máy → kéo thả vào editor.",
                );
            })();

            return true;
          }

          return false;
        } catch (err) {
          console.warn("[ImagePastePlugin]", err);
          return false;
        }
      },
      // CRITICAL: trước mọi handler paste khác (video HIGH, upload LOW)
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor]);

  return null;
}
