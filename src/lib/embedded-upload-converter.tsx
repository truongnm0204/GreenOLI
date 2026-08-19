import type { JSXConverter, SerializedLexicalNodeWithParent } from "@payloadcms/richtext-lexical/react";
import { mediaUrl } from "@/lib/map-helpers";

type UploadValue = {
  id?: string | number;
  url?: string | null;
  mimeType?: string | null;
  filename?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    thumbnail?: { url?: string | null } | null;
  } | null;
};

/**
 * Converter "upload" cho RichText storefront:
 * - Video file → <video>
 * - Documents → iframe preview
 * - Ảnh media → <figure><img> (BẮT BUỘC tự render — không return undefined
 *   vì override `upload` đã thay default converter của Payload)
 */
export const embeddedUploadConverter: JSXConverter<SerializedLexicalNodeWithParent> = ({
  node,
}) => {
  const uploadNode = node as unknown as {
    relationTo?: string;
    value?: UploadValue | number | string | null;
  };

  const value = uploadNode.value;

  // Chưa populate (chỉ còn id) → không render (tránh chèn số id)
  if (!value || typeof value !== "object") {
    return null;
  }

  const mime = (value.mimeType ?? "").toLowerCase();
  const url = mediaUrl(value);
  if (!url) {
    return null;
  }

  // Video upload trực tiếp trong editor
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

  // Tài liệu PDF/Word
  if (uploadNode.relationTo === "documents" || mime.includes("pdf") || mime.includes("word") || mime.includes("officedocument")) {
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

  // Ảnh (mặc định cho media image/* và mọi upload còn lại có URL)
  const alt = (value.alt || value.filename || "Ảnh mô tả").trim();
  const width = typeof value.width === "number" && value.width > 0 ? value.width : undefined;
  const height =
    typeof value.height === "number" && value.height > 0 ? value.height : undefined;

  return (
    <figure className="product-desc-image my-8 w-full not-prose">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="mx-auto h-auto max-h-[min(720px,80vh)] w-auto max-w-full rounded-2xl object-contain shadow-ambient ring-1 ring-border-soft/50"
      />
      {value.alt ? (
        <figcaption className="mt-2.5 text-center text-sm text-text-muted italic">
          {value.alt}
        </figcaption>
      ) : null}
    </figure>
  );
};
