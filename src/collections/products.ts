import type { CollectionConfig } from "payload";
import { mediaUploadField } from "./fields/media-upload-field";

/**
 * Collection products: sản phẩm. Map 1-1 với type `Product` (src/types/product.ts).
 * - category: relationship tới categories (thay cho string slug cứng).
 * - heroImage/galleryImages: relationship tới media (Cloudinary).
 * - specs/certifications/tags: array. Public read cho site.
 */
export const Products: CollectionConfig = {
  slug: "products",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "category"],
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
    { name: "name", type: "text", required: true, label: "Tên sản phẩm" },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      label: "Danh mục",
    },
    {
      name: "brand",
      type: "relationship",
      relationTo: "brands",
      label: "Hãng sản xuất",
    },
    {
      name: "shortDescription",
      type: "textarea",
      required: true,
      label: "Mô tả ngắn",
    },
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
    mediaUploadField({
      name: "galleryImages",
      hasMany: true,
      label: "Bộ sưu tập ảnh",
    }),
    {
      name: "specs",
      type: "array",
      label: "Thông số kỹ thuật",
      fields: [
        { name: "label", type: "text", required: true, label: "Tên thông số" },
        { name: "value", type: "text", required: true, label: "Giá trị" },
      ],
    },
    { name: "composition", type: "textarea", required: true, label: "Thành phần" },
    { name: "usage", type: "textarea", required: true, label: "Cách dùng" },
    { name: "warning", type: "textarea", required: true, label: "Cảnh báo" },
    { name: "packaging", type: "text", required: true, label: "Quy cách đóng gói" },
    {
      name: "certifications",
      type: "array",
      label: "Chứng nhận",
      fields: [{ name: "value", type: "text", required: true, label: "Chứng nhận" }],
    },
    {
      name: "tags",
      type: "array",
      label: "Thẻ",
      fields: [{ name: "value", type: "text", required: true, label: "Thẻ" }],
    },
  ],
};
