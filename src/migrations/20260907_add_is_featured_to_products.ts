import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration: 20260907_add_is_featured_to_products
 * Bổ sung cột is_featured (boolean, default false) vào bảng products và tạo index.
 * Idempotent: Sử dụng DO $$ block kiểm tra IF NOT EXISTS.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'is_featured'
      ) THEN
        ALTER TABLE "products" ADD COLUMN "is_featured" boolean DEFAULT false;
        CREATE INDEX IF NOT EXISTS "products_is_featured_idx" ON "products" USING btree ("is_featured");
      END IF;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'is_featured'
      ) THEN
        DROP INDEX IF EXISTS "products_is_featured_idx";
        ALTER TABLE "products" DROP COLUMN "is_featured";
      END IF;
    END $$;
  `);
}
