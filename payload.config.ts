import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import { buildConfig } from "payload";

import { collections } from "./src/collections/index.ts";
import { cloudinaryAdapter } from "./src/lib/cloudinary-adapter.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Cấu hình gốc Payload CMS.
 * - Collections nạp từ src/collections/index.ts (media, categories, products, articles,
 *   services, partners, gallery, leads, users).
 * - Media: upload lên Cloudinary qua cloudStoragePlugin + adapter custom.
 * - Postgres: DATABASE_URI. Với Neon dùng pooled connection string (PgBouncer đã gộp
 *   connection phía server), nên client pool max:10 an toàn cho cả serverless lẫn build.
 * - LƯU Ý: KHÔNG đặt max:1 — Next prerender/dev phát nhiều request đồng thời, 1 connection
 *   sẽ gây deadlock chờ nhau (timeout khi build static pages).
 */
const POOL_MAX = Number(process.env.DB_POOL_MAX) || 10;

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: "users",
  },
  collections,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      max: POOL_MAX,
    },
  }),
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter(),
          disablePayloadAccessControl: true,
        },
      },
    }),
  ],
});
