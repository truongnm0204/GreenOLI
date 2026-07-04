import type { CollectionConfig } from "payload";

/**
 * Collection media: lưu ảnh (hero, gallery, cover, logo...).
 * Upload thật lên Cloudinary qua cloud-storage plugin (cấu hình ở payload.config.ts).
 * Public read để hiển thị ảnh trên site; chỉ admin upload/sửa/xóa.
 */
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "alt",
  },
  upload: true,
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Văn bản thay thế (alt)",
      required: true,
    },
  ],
};
