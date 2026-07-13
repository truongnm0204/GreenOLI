import path from "node:path";
import fs from "node:fs";

import { getPayload } from "payload";
import config from "@payload-config";
import XLSX from "xlsx";
import { slugify } from "../src/lib/slugify.ts";

const rootDir = process.cwd();
const excelPath = path.resolve(rootDir, "du-lieu-nhap-cms-oli-day-du.xlsx");

async function main() {
  if (!fs.existsSync(excelPath)) {
    throw new Error(`Không tìm thấy file Excel: ${excelPath}`);
  }

  const workbook = XLSX.readFile(excelPath);
  const specSheet = workbook.Sheets["Product_Specs"];
  if (!specSheet) {
    throw new Error(`Không tìm thấy sheet Product_Specs`);
  }

  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(specSheet, { defval: "" }).map((row) =>
    Object.fromEntries(Object.entries(row).map(([key, value]) => [key.trim(), String(value || "").trim()])),
  );

  // Extract brands
  const brandNames = new Set<string>();
  const productToBrand = new Map<string, string>(); // slug -> brandName

  for (const row of rows) {
    if (row["Tên thông số"] === "Hãng sản xuất") {
      const brandName = row["Giá trị"];
      const productSlug = row["Slug sản phẩm"];
      if (brandName) {
        brandNames.add(brandName);
        if (productSlug) {
          productToBrand.set(productSlug, brandName);
        }
      }
    }
  }

  console.log(`Tìm thấy ${brandNames.size} hãng sản xuất:`, Array.from(brandNames));

  const payload = await getPayload({ config });
  console.log("Connected to Payload!");
  
  // Create or Update Brands
  const brandIdByName = new Map<string, number>();
  
  for (const brandName of brandNames) {
    const slug = slugify(brandName);
    const existingBrands = await payload.find({
      collection: "brands",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    
    if (existingBrands.docs.length > 0) {
      brandIdByName.set(brandName, existingBrands.docs[0].id as number);
      console.log(`Đã tồn tại hãng: ${brandName}`);
    } else {
      const created = await payload.create({
        collection: "brands",
        data: {
          slug,
          name: brandName,
        },
      });
      brandIdByName.set(brandName, created.id as number);
      console.log(`Tạo mới hãng: ${brandName}`);
    }
  }

  // Update Products
  for (const [productSlug, brandName] of productToBrand.entries()) {
    const brandId = brandIdByName.get(brandName);
    if (!brandId) continue;

    const existingProducts = await payload.find({
      collection: "products",
      where: { slug: { equals: productSlug } },
      limit: 1,
    });

    if (existingProducts.docs.length > 0) {
      await payload.update({
        collection: "products",
        id: existingProducts.docs[0].id,
        data: {
          brand: brandId,
        },
      });
      console.log(`Cập nhật sản phẩm: ${productSlug} -> Hãng: ${brandName}`);
    } else {
      console.warn(`Không tìm thấy sản phẩm với slug: ${productSlug} để gán hãng.`);
    }
  }

  console.log("Hoàn tất import Brands!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Lỗi:", err);
  process.exit(1);
});
