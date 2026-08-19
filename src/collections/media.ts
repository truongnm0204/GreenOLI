import type { CollectionConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Collection media: upload ảnh/video lên disk local (public/media).
 * URL Payload: /api/media/file/<filename>
 * Không dùng Cloudinary / cloud storage.
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "File ảnh/video",
    plural: "Kho ảnh/video (máy chủ)",
  },
  access: {
    read: () => true,
    // Admin đăng nhập mới được upload (paste ảnh / form).
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    // Không ẩn — cần để UploadFeature/drawer liệt kê được collection này khi chèn ảnh
    // vào rich text (nếu hidden, drawer upload không hiện media → không up được ảnh).
    group: "Nội dung",
    useAsTitle: "alt",
    description:
      "Kho file ảnh/video local trên máy chủ (public/media). Ảnh tải trong form sản phẩm/bài viết sẽ lưu vào đây.",
    defaultColumns: ["filename", "alt", "mimeType", "updatedAt"],
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        if (!data) return data;

        const hasAlt =
          typeof data.alt === "string" && data.alt.trim().length > 0;
        if (hasAlt) return data;

        const rawName =
          (typeof data.filename === "string" && data.filename) ||
          req?.file?.name ||
          "";

        if (!rawName) return data;

        const base = path.basename(rawName, path.extname(rawName));
        data.alt = base.replace(/[-_]+/g, " ").trim() || base;
        return data;
      },
    ],
  },
  upload: {
    staticDir: path.resolve(dirname, "../../public/media"),
    bulkUpload: true,
    adminThumbnail: "thumbnail",
    displayPreview: true,
    // Chỉ ảnh + video (đúng nhu cầu hiện tại)
    mimeTypes: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      "image/avif",
      "video/mp4",
      "video/webm",
      "video/quicktime",
      "video/x-msvideo",
    ],
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Mô tả ảnh (alt)",
      required: true,
      admin: {
        description: "Để trống khi tải lên — hệ thống tự lấy từ tên file.",
      },
    },
  ],
};
