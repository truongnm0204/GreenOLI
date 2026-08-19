import type { Block } from "payload";

/**
 * Lexical custom block: nhúng video YouTube / Vimeo vào mô tả sản phẩm.
 * Admin nhập URL + xem preview ngay trong form block.
 * Dán URL trần một dòng cũng được chuẩn hóa thành block khi Save (B2-lite).
 */
export const VideoEmbedBlock: Block = {
  slug: "videoEmbed",
  labels: {
    singular: "Video (YouTube/Vimeo)",
    plural: "Videos",
  },
  fields: [
    {
      name: "url",
      type: "text",
      label: "URL Video",
      required: true,
      admin: {
        description:
          "Dán link YouTube/Vimeo (watch, live, shorts, youtu.be, embed) hoặc nguyên thẻ iframe. Ví dụ: https://www.youtube.com/live/…",
        placeholder: "https://www.youtube.com/live/…",
        components: {
          Field: "/src/components/admin/video-url-field#VideoUrlField",
        },
      },
    },
    {
      name: "caption",
      type: "text",
      label: "Chú thích (tuỳ chọn)",
      admin: {
        description: "Hiện dưới player trên trang sản phẩm.",
      },
    },
  ],
};
