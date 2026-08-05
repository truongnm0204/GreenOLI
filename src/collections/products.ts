import type { CollectionConfig } from "payload";
import {
  lexicalEditor,
  FixedToolbarFeature,
  BlocksFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical";
import { mediaUploadField } from "./fields/media-upload-field";
import { VideoEmbedBlock } from "./blocks/video-embed.block";
import { ImageGalleryBlock } from "./blocks/image-gallery.block";

/**
 * Collection products: sản phẩm.
 * - packagingOptions: array quy cách đóng gói, mỗi option có:
 *   - unit: relationship tới packaging-units (thêm/sửa/xóa tự do ở collection đó)
 *   - variantImage: ảnh riêng cho quy cách (optional); nếu trống → dùng heroImage
 *   - customLabel: nhãn tùy chỉnh; nếu trống → tự sinh "{quantity} {unit.symbol}"
 */
export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: "Sản phẩm",
    plural: "Sản phẩm",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: "Sản phẩm",
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "category"],
    description: "Quản lý danh mục sản phẩm, ảnh, quy cách đóng gói và tài liệu đính kèm.",
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation }) => {
        if (!data?.packagingOptions) return data;
        // Chặn 2 option trùng (quantity + unit) trong cùng sản phẩm
        const opts = data.packagingOptions as Array<{
          quantity?: number;
          unit?: unknown;
        }>;
        const seen = new Set<string>();
        for (const opt of opts) {
          const unitId =
            typeof opt.unit === "object" && opt.unit !== null
              ? (opt.unit as { id?: unknown }).id
              : opt.unit;
          const key = `${opt.quantity}-${unitId}`;
          if (seen.has(key)) {
            throw new Error(
              `Sản phẩm có 2 quy cách trùng nhau (số lượng + đơn vị). Vui lòng kiểm tra lại.`,
            );
          }
          seen.add(key);
        }
        return data;
      },
    ],
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
    {
      name: "packagingOptions",
      type: "array",
      label: "Quy cách đóng gói",
      admin: {
        description: "Thêm từng quy cách. Nhãn hiển thị tự sinh nếu để trống. Ảnh riêng nếu để trống sẽ dùng ảnh hero.",
      },
      fields: [
        {
          name: "quantity",
          type: "number",
          label: "Số lượng (không bắt buộc)",
          min: 0.01,
          admin: {
            description: 'Có thể để trống, ví dụ chỉ đơn vị "cái", "hộp". Hoặc nhập "1", "5", "25".',
            width: "25%",
          },
        },
        {
          name: "unit",
          type: "relationship",
          relationTo: "packaging-units",
          required: true,
          label: "Đơn vị",
          admin: { width: "25%" },
          filterOptions: () => ({ isActive: { equals: true } }),
        },
        {
          name: "customLabel",
          type: "text",
          label: "Nhãn tùy chỉnh (tuỳ chọn)",
          admin: {
            description: 'Để trống → tự tạo "5 kg", "20 lít". Hoặc nhập "Túi 5 kg", "Thùng 25 kg"',
            width: "25%",
          },
        },
        {
          name: "variantImage",
          type: "upload",
          relationTo: "media",
          label: "Ảnh quy cách (tuỳ chọn)",
          admin: {
            description: "Ảnh riêng cho quy cách này. Để trống → dùng ảnh đại diện sản phẩm.",
            width: "25%",
          },
        },
      ],
    },
    // Giữ field packaging text làm ghi chú phụ
    {
      name: "packaging",
      type: "text",
      label: "Ghi chú đóng gói (phụ)",
      admin: {
        description: "Ghi chú ngắn nếu cần, ví dụ: 'Liên hệ để đặt số lượng lớn'",
      },
    },
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
    // Mô tả phong phú (Lexical) — nơi dán bài giới thiệu / catalogue dạng nội dung
    {
      name: "description",
      type: "richText",
      label: "Mô tả sản phẩm (bài giới thiệu)",
      admin: {
        description:
          "Dán/soạn bài giới thiệu có sẵn tại đây (như Word): tiêu đề, đoạn văn, danh sách, chèn ảnh/video, gallery. Không cần làm lại từ đầu — tải ảnh minh họa trực tiếp trong editor.",
      },
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          // Cho phép paste/chèn ảnh/video + tài liệu trực tiếp vào nội dung.
          // media đứng trước → paste ảnh tự vào media (tránh lỗi MIME),
          // drawer vẫn cho chọn documents khi muốn nhúng PDF/Word vào mô tả.
          UploadFeature({
            collections: {
              media: { fields: [] },
              documents: { fields: [] },
            },
            enabledCollections: ['media', 'documents'],
          }),
          BlocksFeature({
            blocks: [VideoEmbedBlock, ImageGalleryBlock],
          }),
        ],
      }),
    },
    // -------------------------------------------------------------------------
    // Tài liệu đính kèm (MSDS, Catalogue, Hướng dẫn...)
    // -------------------------------------------------------------------------
    {
      name: "attachments",
      type: "array",
      label: "Tài liệu đính kèm",
      admin: {
        description:
          "Upload file PDF/Word cho mỗi tài liệu. Hiển thị thành danh sách tải xuống trên trang sản phẩm.",
      },
      fields: [
        {
          name: "type",
          type: "select",
          required: true,
          label: "Loại tài liệu",
          options: [
            { label: "MSDS (Safety Data Sheet)", value: "msds" },
            { label: "Catalogue", value: "catalogue" },
            { label: "Hướng dẫn sử dụng", value: "manual" },
            { label: "Tài liệu kỹ thuật", value: "technical" },
            { label: "Tài liệu khác", value: "other" },
          ],
          admin: { width: "33%" },
        },
        {
          name: "label",
          type: "text",
          required: true,
          label: "Tên hiển thị",
          admin: {
            description: 'Ví dụ: "MSDS - Green Oli Degreaser 2024"',
            width: "33%",
          },
        },
        {
          name: "file",
          type: "upload",
          relationTo: "documents",
          required: true,
          label: "File tài liệu",
          admin: { width: "33%" },
        },
      ],
    },
  ],
};
