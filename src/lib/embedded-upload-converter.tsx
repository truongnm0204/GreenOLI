import type { JSXConverter, SerializedLexicalNodeWithParent } from "@payloadcms/richtext-lexical/react";
import { mediaUrl } from "@/lib/map-helpers";

/**
 * Override converter "upload" dùng chung cho RichText:
 * - Tài liệu (PDF/Word/Excel, relationTo=documents) → iframe preview nhúng trong bài
 * - Video file (mime video/*, relationTo=media) → thẻ <video> full-width
 * - Ảnh (media image) → trả undefined để default converter Payload xử lý
 *
 * Node upload trong Lexical:
 *   { type: 'upload', relationTo: 'documents' | 'media', value: { url, mimeType, filename, ... } }
 */
export const embeddedUploadConverter: JSXConverter<SerializedLexicalNodeWithParent> = ({
  node,
}) => {
  const uploadNode = node as unknown as {
    relationTo?: string;
    value?: {
      url?: string;
      mimeType?: string;
      filename?: string;
      alt?: string;
    } | number | null;
  };

  const value = uploadNode.value;

  if (!value || typeof value !== "object") {
    return undefined;
  }

  const mime = value.mimeType ?? "";
  const url = mediaUrl(value);
  if (!url) {
    return undefined;
  }

  // Video upload trực tiếp trong editor (mp4/webm…) — không cần qua gallery UI riêng
  if (mime.startsWith("video/")) {
    return (
      <figure className="product-desc-video my-8 w-full not-prose">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/5 shadow-ambient ring-1 ring-border-soft/60">
          <video
            src={url}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-contain"
            aria-label={value.filename ?? value.alt ?? "Video sản phẩm"}
          >
            Trình duyệt không hỗ trợ phát video.{" "}
            <a href={url} className="underline">
              Tải xuống
            </a>
          </video>
        </div>
        {value.filename ? (
          <figcaption className="mt-2.5 text-center text-sm text-text-muted italic">
            {value.filename}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  // Tài liệu → iframe preview nhúng ngay trong bài
  if (uploadNode.relationTo === "documents") {
    return (
      <div className="my-6 not-prose">
        <div className="flex items-center justify-between gap-3 rounded-t-xl border border-border-soft bg-surface-container px-4 py-2.5">
          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-text-primary">
            {value.filename ?? "Tài liệu"}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-medium text-primary-dark underline underline-offset-2"
          >
            Mở / tải
          </a>
        </div>
        <iframe
          src={url}
          title={value.filename ?? "Tài liệu"}
          className="h-[70vh] w-full rounded-b-xl border border-t-0 border-border-soft"
          loading="lazy"
        />
      </div>
    );
  }

  // Ảnh / loại khác → default converter
  return undefined;
};
