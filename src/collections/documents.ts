import type { CollectionConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Collection documents: file PDF/Word/Excel (MSDS, catalogue, hướng dẫn).
 * Lưu local public/documents. Gắn vào products.attachments.
 */
export const Documents: CollectionConfig = {
  slug: "documents",
  labels: {
    singular: "Tài liệu",
    plural: "Tài liệu",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: "Nội dung",
    useAsTitle: "filename",
    description:
      "Tải PDF/Word/Excel lên máy chủ (lưu local). Dùng cho tài liệu đính kèm sản phẩm.",
    defaultColumns: ["filename", "mimeType", "filesize", "updatedAt"],
  },
  upload: {
    staticDir: path.resolve(dirname, "../../public/documents"),
    bulkUpload: true,
    displayPreview: true,
    mimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain",
    ],
  },
  fields: [
    {
      name: "description",
      type: "text",
      label: "Mô tả ngắn (tuỳ chọn)",
      admin: {
        description: "Ví dụ: MSDS phiên bản 2024, Catalogue dòng sản phẩm làm sạch",
      },
    },
  ],
};
