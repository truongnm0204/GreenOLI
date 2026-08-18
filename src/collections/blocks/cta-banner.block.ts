import type { Block } from "payload";

/**
 * Banner kêu gọi hành động trong mô tả (liên hệ / xem thêm).
 */
export const CtaBannerBlock: Block = {
  slug: "ctaBanner",
  labels: {
    singular: "Banner CTA",
    plural: "Banner CTA",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Tiêu đề",
      required: true,
      admin: {
        placeholder: "Cần tư vấn quy cách phù hợp?",
      },
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Mô tả ngắn",
      admin: {
        rows: 3,
        placeholder: "Liên hệ GreenOLI để nhận báo giá và hỗ trợ kỹ thuật.",
      },
    },
    {
      name: "buttonLabel",
      type: "text",
      label: "Nhãn nút",
      defaultValue: "Liên hệ ngay",
      required: true,
      admin: { width: "50%" },
    },
    {
      name: "buttonHref",
      type: "text",
      label: "Link nút",
      required: true,
      defaultValue: "/lien-he",
      admin: {
        width: "50%",
        description: "Đường dẫn nội bộ (/lien-he) hoặc URL đầy đủ (https://...).",
        placeholder: "/lien-he",
      },
    },
    {
      name: "variant",
      type: "select",
      label: "Kiểu màu",
      defaultValue: "primary",
      options: [
        { label: "Xanh primary", value: "primary" },
        { label: "Tối (dark)", value: "dark" },
        { label: "Nhẹ (soft)", value: "soft" },
      ],
    },
  ],
};
