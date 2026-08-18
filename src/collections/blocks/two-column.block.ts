import type { Block } from "payload";
import { mediaUploadField } from "../fields/media-upload-field";

/**
 * Khối 2 cột: ảnh + nội dung (hoặc 2 cột chữ) trong mô tả sản phẩm.
 */
export const TwoColumnBlock: Block = {
  slug: "twoColumn",
  labels: {
    singular: "Hai cột (ảnh + chữ)",
    plural: "Hai cột",
  },
  fields: [
    {
      name: "layout",
      type: "select",
      label: "Bố cục",
      defaultValue: "imageLeft",
      options: [
        { label: "Ảnh trái — chữ phải", value: "imageLeft" },
        { label: "Chữ trái — ảnh phải", value: "imageRight" },
      ],
      admin: { width: "50%" },
    },
    mediaUploadField({
      name: "image",
      label: "Ảnh cột",
      required: true,
      admin: {
        description: "Ảnh minh họa một bên.",
        width: "50%",
      },
    }),
    {
      name: "heading",
      type: "text",
      label: "Tiêu đề cột chữ",
      admin: {
        description: "Tuỳ chọn — in đậm phía trên đoạn văn.",
      },
    },
    {
      name: "body",
      type: "textarea",
      label: "Nội dung",
      required: true,
      admin: {
        description: "Có thể xuống dòng. Hỗ trợ plain text (không HTML).",
        rows: 6,
      },
    },
    {
      name: "imageCaption",
      type: "text",
      label: "Chú thích ảnh (tuỳ chọn)",
    },
  ],
};
