import type { CollectionConfig } from "payload";

/**
 * Collection leads: liên hệ từ contact form (phase 04 nối vào).
 * Bảo mật: public KHÔNG đọc được (chỉ admin authenticated). Create để ngỏ cho form gửi.
 */
export const Leads: CollectionConfig = {
  slug: "leads",
  access: {
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    create: () => true,
  },
  admin: {
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "email", "phone", "subject", "status", "createdAt"],
  },
  fields: [
    { name: "fullName", type: "text", required: true, label: "Họ tên" },
    { name: "email", type: "email", required: true, label: "Email" },
    { name: "phone", type: "text", required: true, label: "Số điện thoại" },
    { name: "subject", type: "text", label: "Tiêu đề" },
    { name: "message", type: "textarea", required: true, label: "Nội dung" },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      label: "Trạng thái",
      options: [
        { label: "Mới", value: "new" },
        { label: "Đã liên hệ", value: "contacted" },
        { label: "Đã đóng", value: "closed" },
      ],
    },
  ],
  timestamps: true,
};
