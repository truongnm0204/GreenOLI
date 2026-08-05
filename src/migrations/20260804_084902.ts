import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_packaging_options_unit" AS ENUM('gói', 'kg', 'g', 'lít', 'ml', 'thùng', 'hộp', 'can');
  CREATE TABLE "products_packaging_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quantity" numeric NOT NULL,
  	"unit" "enum_products_packaging_options_unit" NOT NULL,
  	"label" varchar
  );
  
  ALTER TABLE "products" ALTER COLUMN "packaging" DROP NOT NULL;
  ALTER TABLE "products_packaging_options" ADD CONSTRAINT "products_packaging_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_packaging_options_order_idx" ON "products_packaging_options" USING btree ("_order");
  CREATE INDEX "products_packaging_options_parent_id_idx" ON "products_packaging_options" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_packaging_options" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "products_packaging_options" CASCADE;
  ALTER TABLE "products" ALTER COLUMN "packaging" SET NOT NULL;
  DROP TYPE "public"."enum_products_packaging_options_unit";`)
}
