import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration: add_description_and_attachments
 * Idempotent — dùng DO $$ blocks.
 * 1. Tạo bảng documents (collection PDF/tài liệu)
 * 2. Thêm cột description (jsonb) vào products
 * 3. Tạo bảng products_attachments (array field)
 * 4. Thêm payload_locked_documents_rels.documents_id
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 1. Bảng documents ───────────────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "documents" (
      "id"          serial PRIMARY KEY NOT NULL,
      "description" varchar,
      "updated_at"  timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at"  timestamp(3) with time zone DEFAULT now() NOT NULL,
      "url"         varchar,
      "thumbnail_u_r_l" varchar,
      "filename"    varchar,
      "mime_type"   varchar,
      "filesize"    numeric,
      "width"       numeric,
      "height"      numeric,
      "focal_x"     numeric,
      "focal_y"     numeric
    );
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "documents_updated_at_idx"
      ON "documents" USING btree ("updated_at");
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "documents_created_at_idx"
      ON "documents" USING btree ("created_at");
  `);
  await db.execute(sql`
    CREATE UNIQUE INDEX IF NOT EXISTS "documents_filename_idx"
      ON "documents" USING btree ("filename");
  `);

  // ── 2. Cột description (Lexical JSON) vào products ──────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'description'
      ) THEN
        ALTER TABLE "products" ADD COLUMN "description" jsonb;
      END IF;
    END $$;
  `);

  // ── 3. Enum + bảng products_attachments ─────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'enum_products_attachments_type'
      ) THEN
        CREATE TYPE "public"."enum_products_attachments_type"
          AS ENUM('msds', 'catalogue', 'manual', 'technical', 'other');
      END IF;
    END $$;
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "products_attachments" (
      "_order"      integer NOT NULL,
      "_parent_id"  integer NOT NULL,
      "id"          varchar PRIMARY KEY NOT NULL,
      "type"        "public"."enum_products_attachments_type" NOT NULL,
      "label"       varchar NOT NULL,
      "file_id"     integer NOT NULL
    );
  `);
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'products_attachments_order_parent_idx_unique'
          AND table_name = 'products_attachments'
      ) THEN
        ALTER TABLE "products_attachments"
          ADD CONSTRAINT "products_attachments_order_parent_idx_unique"
          UNIQUE ("_order", "_parent_id");
      END IF;
    END $$;
  `);
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'products_attachments__parent_id_fk'
          AND table_name = 'products_attachments'
      ) THEN
        ALTER TABLE "products_attachments"
          ADD CONSTRAINT "products_attachments__parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
  `);
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'products_attachments_file_id_documents_id_fk'
          AND table_name = 'products_attachments'
      ) THEN
        ALTER TABLE "products_attachments"
          ADD CONSTRAINT "products_attachments_file_id_documents_id_fk"
          FOREIGN KEY ("file_id") REFERENCES "public"."documents"("id")
          ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "products_attachments_order_idx"
      ON "products_attachments" USING btree ("_order");
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "products_attachments_parent_id_idx"
      ON "products_attachments" USING btree ("_parent_id");
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "products_attachments_file_idx"
      ON "products_attachments" USING btree ("file_id");
  `);

  // ── 4. payload_locked_documents_rels.documents_id ───────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'payload_locked_documents_rels'
          AND column_name = 'documents_id'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels"
          ADD COLUMN "documents_id" integer;
      END IF;
    END $$;
  `);
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'payload_locked_documents_rels_documents_fk'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels"
          ADD CONSTRAINT "payload_locked_documents_rels_documents_fk"
          FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_documents_id_idx"
      ON "payload_locked_documents_rels" USING btree ("documents_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "products_attachments";`);
  await db.execute(sql`
    DO $$ BEGIN
      IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_products_attachments_type') THEN
        DROP TYPE "public"."enum_products_attachments_type";
      END IF;
    END $$;
  `);
  await db.execute(sql`
    ALTER TABLE "products" DROP COLUMN IF EXISTS "description";
  `);
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "documents_id";
  `);
  await db.execute(sql`DROP TABLE IF EXISTS "documents";`);
}
