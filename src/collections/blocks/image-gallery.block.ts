import type { Block } from "payload";

/**
 * Lexical custom block: gallery ảnh ngay trong nội dung mô tả.
 * Admin upload nhiều ảnh + chú thích → frontend render carousel/grid.
 */
export const ImageGalleryBlock: Block = {
  slug: "imageGallery",
  labels: {
    singular: "Thư viện ảnh",
    plural: "Thư viện ảnh",
  },
  fields: [
    {
      name: "images",
      type: "array",
      label: "Ảnh",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Ảnh",
        },
        {
          name: "caption",
          type: "text",
          label: "Chú thích ảnh",
        },
      ],
    },
  ],
};
