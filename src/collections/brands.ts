import type { CollectionConfig } from "payload";
import { mediaUploadField } from "./fields/media-upload-field";

/**
 * Collection brands: Hãng sản xuất.
 */
export const Brands: CollectionConfig = {
  slug: "brands",
  labels: {
    singular: "Hãng sản xuất",
    plural: "Hãng sản xuất",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: "Sản phẩm",
    useAsTitle: "name",
    defaultColumns: ["name", "slug"],
    description: "Thương hiệu / hãng sản xuất gắn với sản phẩm.",
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
    { name: "name", type: "text", required: true, label: "Tên hãng" },
    { name: "tagline", type: "text", label: "Khẩu hiệu (Tagline)" },
    { name: "description", type: "textarea", label: "Mô tả" },
    mediaUploadField({
      name: "logo",
      label: "Logo hãng",
    }),
  ],
};
