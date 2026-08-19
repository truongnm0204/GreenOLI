import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vi } from "@payloadcms/translations/languages/vi";
import { buildConfig } from "payload";
import sharp from "sharp";

import { collections } from "./src/collections/index.ts";
import { viAdminOverrides } from "./src/lib/payload-i18n-vi.ts";
import { migrations } from "./src/migrations/index.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Cấu hình gốc Payload CMS.
 * - Collections: src/collections/index.ts
 * - Media: upload local public/media (KHÔNG Cloudinary)
 * - Admin i18n: tiếng Việt (fallback vi)
 * - sharp: resize thumbnail
 */
const POOL_MAX = Number(process.env.DB_POOL_MAX) || 10;

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: "users",
    meta: {
      titleSuffix: " — GreenOLI CMS",
    },
    components: {
      // Nút Đăng xuất nằm trong menu cạnh avatar (góc phải header) —
      // slot chuẩn của Payload, tránh nổi đè logo như khi dùng header
      settingsMenu: ["/src/components/admin/logout-button#LogoutButton"],
    },
  },
  i18n: {
    fallbackLanguage: "vi",
    supportedLanguages: { vi },
    translations: {
      vi: viAdminOverrides,
    },
  },
  collections,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      max: POOL_MAX,
    },
    // Production / Docker: entrypoint runs `payload migrate` — needs this list.
    // Dev still uses drizzle push when NODE_ENV !== 'production'.
    prodMigrations: migrations,
  }),
});
