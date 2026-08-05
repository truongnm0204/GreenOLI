import type { Block } from "payload";

/**
 * Lexical custom block: nhúng video YouTube / Vimeo vào mô tả sản phẩm.
 * Admin nhập URL video + chú thích → frontend render iframe.
 */
export const VideoEmbedBlock: Block = {
  slug: "videoEmbed",
  labels: {
    singular: "Video",
    plural: "Videos",
  },
  fields: [
    {
      name: "url",
      type: "text",
      label: "URL Video",
      required: true,
      admin: {
        description: "YouTube hoặc Vimeo URL. Ví dụ: https://youtube.com/watch?v=...",
      },
    },
    {
      name: "caption",
      type: "text",
      label: "Chú thích (tuỳ chọn)",
    },
  ],
};
