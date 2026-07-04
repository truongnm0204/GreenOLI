import type { Adapter, GeneratedAdapter } from "@payloadcms/plugin-cloud-storage/types";
import { v2 as cloudinary } from "cloudinary";

/**
 * Adapter Cloudinary custom cho @payloadcms/plugin-cloud-storage (Payload v3).
 * Plugin cộng đồng payload-cloudinary chỉ hỗ trợ Payload v2, nên tự viết adapter
 * theo interface GeneratedAdapter: upload/delete qua SDK cloudinary, URL trả về từ CDN.
 */

const FOLDER = "greenoli";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// public_id lưu trong folder greenoli, bỏ đuôi file để Cloudinary tự quản lý định dạng.
const toPublicId = (filename: string): string => {
  const base = filename.replace(/\.[^/.]+$/, "");
  return `${FOLDER}/${base}`;
};

export const cloudinaryAdapter = (): Adapter => {
  return ({ collection }): GeneratedAdapter => ({
    name: "cloudinary",

    handleUpload: async ({ file }) => {
      await new Promise<void>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: toPublicId(file.filename),
              resource_type: "auto",
              overwrite: true,
            },
            (error) => (error ? reject(error) : resolve()),
          )
          .end(file.buffer);
      });
    },

    handleDelete: async ({ filename }) => {
      await cloudinary.uploader.destroy(toPublicId(filename), {
        resource_type: "image",
        invalidate: true,
      });
    },

    generateURL: ({ filename }) =>
      cloudinary.url(toPublicId(filename), { secure: true }),

    // Ảnh phục vụ trực tiếp từ Cloudinary CDN; redirect request static sang URL đó.
    staticHandler: async (req, { params: { filename } }) => {
      const url = cloudinary.url(toPublicId(filename), { secure: true });
      return Response.redirect(url, 302);
    },
  });
};
