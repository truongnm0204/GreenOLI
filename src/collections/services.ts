import type { CollectionConfig } from "payload";
import { mediaUploadField } from "./fields/media-upload-field";

/**
 * Collection services: dịch vụ. Map 1-1 với type `Service` (src/types/service.ts).
 * image là relationship tới media (Cloudinary). Public read cho site.
 */
export const Services: CollectionConfig = {
  slug: "services",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "tagline"],
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Slug (định danh URL)",
    },
    { name: "name", type: "text", required: true, label: "Tên dịch vụ" },
    { name: "tagline", type: "text", required: true, label: "Khẩu hiệu" },
    { name: "description", type: "textarea", required: true, label: "Mô tả" },
    {
      name: "iconKey",
      type: "text",
      required: true,
      label: "Icon (tên lucide)",
      admin: { description: "Tên icon lucide-react để render" },
    },
    mediaUploadField({
      name: "image",
      required: true,
      label: "Ảnh minh họa",
    }),
  ],
};
