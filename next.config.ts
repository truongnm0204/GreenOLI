import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sharp"],
  images: {
    remotePatterns: [
      // Stitch placeholder seed images we use during UI phase.
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      // Compat tạm: DB vẫn còn URL Cloudinary cũ (media.url).
      // Upload mới đã local (/api/media/file/...). Xóa dòng này sau khi re-upload hết ảnh.
      { protocol: "https", hostname: "res.cloudinary.com" },
      // Ảnh local served qua Payload API (serverURL + /api/media/file/...)
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default withPayload(nextConfig);
