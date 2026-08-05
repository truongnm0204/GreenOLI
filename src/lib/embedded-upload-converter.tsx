import type { JSXConverter, SerializedLexicalNodeWithParent } from "@payloadcms/richtext-lexical/react";

/**
 * Override converter "upload" dùng chung cho RichText:
 * - Tài liệu (PDF/Word/Excel, relationTo=documents) → render iframe preview
 *   NHÚNG ngay trong bài, thay vì chỉ là link tên file như default.
 * - Ảnh/video (media) → trả undefined để default converter của Payload xử lý.
 *
 * Node upload trong Lexical có dạng:
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
    } | number | null;
  };

  const value = uploadNode.value;

  // Chưa populate (value là id) hoặc không phải documents → để default xử lý
  if (uploadNode.relationTo !== "documents") {
    return undefined;
  }
  if (!value || typeof value !== "object" || !value.url) {
    return undefined;
  }

  // Tài liệu → iframe preview nhúng ngay trong bài
  return (
    <div className="my-6">
      <div className="flex items-center justify-between gap-3 rounded-t-xl border border-border-soft bg-surface-container px-4 py-2.5">
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-text-primary">
          {value.filename ?? "Tài liệu"}
        </span>
      </div>
      <iframe
        src={value.url}
        title={value.filename ?? "Tài liệu"}
        className="h-[70vh] w-full rounded-b-xl border border-t-0 border-border-soft"
        loading="lazy"
      />
    </div>
  );
};
