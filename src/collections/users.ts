import type { CollectionConfig } from "payload";

/**
 * Collection auth cho admin panel (bắt buộc tối thiểu 1 auth collection).
 * Phase 02 sẽ thêm các collection nội dung (products, categories, articles...).
 */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    // email + password do `auth: true` tự thêm.
    {
      name: "name",
      type: "text",
      label: "Tên hiển thị",
    },
  ],
};
