import type { CollectionConfig } from "payload";
import { mediaUploadField } from "./fields/media-upload-field";

/**
 * Collection gallery: thư viện ảnh hoạt động. Map với type `GalleryItem` (src/data/gallery.ts).
 * image là relationship tới media; alt lấy từ chính media. Public read cho site.
 */
export const Gallery: CollectionConfig = {
  slug: "gallery",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "caption",
    defaultColumns: ["caption", "image"],
  },
  fields: [
    mediaUploadField({
      name: "image",
      required: true,
      label: "Ảnh",
    }),
    { name: "caption", type: "text", label: "Chú thích" },
  ],
};
