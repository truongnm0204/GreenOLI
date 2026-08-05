import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration: add_packaging_units_collection
 * Idempotent — dùng DO $$ blocks để skip nếu đã tồn tại.
 * DB state khi vào:
 *   - packaging_units: đã tạo bởi dev mode, empty
 *   - payload_locked_documents_rels.packaging_units_id + FK: đã có
 *   - products_packaging_options.unit_id/custom_label/variant_image_id: chưa có
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Tạo packaging_units nếu chưa có (dev mode đã tạo, IF NOT EXISTS an toàn)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "packaging_units" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "symbol" varchar NOT NULL,
      "sort_order" numeric DEFAULT 0,
      "is_active" boolean DEFAULT true,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE UNIQUE INDEX IF NOT EXISTS "packaging_units_symbol_idx"
      ON "packaging_units" USING btree (lower("symbol"));
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "packaging_units_updated_at_idx"
      ON "packaging_units" USING btree ("updated_at");
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "packaging_units_created_at_idx"
      ON "packaging_units" USING btree ("created_at");
  `);

  // 2. Thêm unit_id vào products_packaging_options (idempotent)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products_packaging_options' AND column_name = 'unit_id'
      ) THEN
        ALTER TABLE "products_packaging_options" ADD COLUMN "unit_id" integer;
      END IF;
    END $$;
  `);

  // 3. Thêm custom_label
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products_packaging_options' AND column_name = 'custom_label'
      ) THEN
        ALTER TABLE "products_packaging_options" ADD COLUMN "custom_label" varchar;
      END IF;
    END $$;
  `);

  // 4. Thêm variant_image_id
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products_packaging_options' AND column_name = 'variant_image_id'
      ) THEN
        ALTER TABLE "products_packaging_options" ADD COLUMN "variant_image_id" integer;
      END IF;
    END $$;
  `);

  // 5. FK unit_id → packaging_units (idempotent)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'products_packaging_options_unit_id_packaging_units_id_fk'
      ) THEN
        ALTER TABLE "products_packaging_options"
          ADD CONSTRAINT "products_packaging_options_unit_id_packaging_units_id_fk"
          FOREIGN KEY ("unit_id") REFERENCES "public"."packaging_units"("id")
          ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
  `);

  // 6. FK variant_image_id → media (idempotent)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'products_packaging_options_variant_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "products_packaging_options"
          ADD CONSTRAINT "products_packaging_options_variant_image_id_media_id_fk"
          FOREIGN KEY ("variant_image_id") REFERENCES "public"."media"("id")
          ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
  `);

  // 7. Index
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "products_packaging_options_unit_idx"
      ON "products_packaging_options" USING btree ("unit_id");
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "products_packaging_options_variant_image_idx"
      ON "products_packaging_options" USING btree ("variant_image_id");
  `);

  // 8. payload_locked_documents_rels.packaging_units_id + FK (đã có, skip)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'packaging_units_id'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels"
          ADD COLUMN "packaging_units_id" integer;
      END IF;
    END $$;
  `);

  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'payload_locked_documents_rels_packaging_units_fk'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels"
          ADD CONSTRAINT "payload_locked_documents_rels_packaging_units_fk"
          FOREIGN KEY ("packaging_units_id") REFERENCES "public"."packaging_units"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
  `);

  // 9. Seed 14 đơn vị mặc định (ON CONFLICT DO NOTHING = idempotent)
  await db.execute(sql`
    INSERT INTO "packaging_units" ("name", "symbol", "sort_order", "is_active", "updated_at", "created_at")
    VALUES
      ('Goi',      'goi',   1,  true, now(), now()),
      ('Kilogram', 'kg',    2,  true, now(), now()),
      ('Gram',     'g',     3,  true, now(), now()),
      ('Lit',      'lit',   4,  true, now(), now()),
      ('Mililit',  'ml',    5,  true, now(), now()),
      ('Thung',    'thung', 6,  true, now(), now()),
      ('Hop',      'hop',   7,  true, now(), now()),
      ('Can',      'can',   8,  true, now(), now()),
      ('Cai',      'cai',   9,  true, now(), now()),
      ('Bo',       'bo',    10, true, now(), now()),
      ('Cuon',     'cuon',  11, true, now(), now()),
      ('Chai',     'chai',  12, true, now(), now()),
      ('Tui',      'tui',   13, true, now(), now()),
      ('Bao',      'bao',   14, true, now(), now())
    ON CONFLICT DO NOTHING;
  `);

  // 10. Auto-migrate: map giá trị cột unit (text/enum) → unit_id FK
  await db.execute(sql`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products_packaging_options' AND column_name = 'unit'
      ) THEN
        UPDATE products_packaging_options po
        SET unit_id = pu.id
        FROM packaging_units pu
        WHERE lower(po.unit::text) = lower(pu.symbol)
          AND po.unit_id IS NULL;
      END IF;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "products_packaging_options"
      DROP COLUMN IF EXISTS "unit_id",
      DROP COLUMN IF EXISTS "custom_label",
      DROP COLUMN IF EXISTS "variant_image_id";
  `);
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "packaging_units_id";
  `);
  await db.execute(sql`DROP TABLE IF EXISTS "packaging_units";`);
}
