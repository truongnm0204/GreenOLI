import type { Block } from "payload";
import { mediaUploadField } from "../fields/media-upload-field";

/**
 * Ảnh full bề ngang vùng mô tả (kiểu banner catalog / Shopee).
 */
export const FullBleedImageBlock: Block = {
  slug: "fullBleedImage",
  labels: {
    singular: "Ảnh full (banner)",
    plural: "Ảnh full",
  },
  fields: [
    mediaUploadField({
      name: "image",
      label: "Ảnh",
      required: true,
      admin: {
        description: "Ảnh ngang lớn — hiển thị full bề rộng khung mô tả.",
      },
    }),
    {
      name: "caption",
      type: "text",
      label: "Chú thích (tuỳ chọn)",
    },
    {
      name: "alt",
      type: "text",
      label: "Alt (SEO / trợ năng)",
      admin: {
        description: "Mô tả ngắn ảnh nếu khác chú thích.",
      },
    },
  ],
};
