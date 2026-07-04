import type { CollectionConfig } from "payload";
import { mediaUploadField } from "./fields/media-upload-field";

/**
 * Collection categories: nhóm sản phẩm. Map 1-1 với type `Category` (src/types/category.ts).
 * heroImage là relationship tới media (Cloudinary). Public read cho site.
 */
export const Categories: CollectionConfig = {
  slug: "categories",
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
    { name: "name", type: "text", required: true, label: "Tên danh mục" },
    { name: "shortName", type: "text", label: "Tên rút gọn" },
    { name: "tagline", type: "text", required: true, label: "Khẩu hiệu" },
    { name: "description", type: "textarea", required: true, label: "Mô tả ngắn" },
    {
      name: "longDescription",
      type: "textarea",
      required: true,
      label: "Mô tả chi tiết",
    },
    mediaUploadField({
      name: "heroImage",
      required: true,
      label: "Ảnh đại diện",
    }),
    {
      name: "iconKey",
      type: "text",
      required: true,
      label: "Icon (tên lucide)",
      admin: { description: "Tên icon lucide-react để render" },
    },
  ],
};
