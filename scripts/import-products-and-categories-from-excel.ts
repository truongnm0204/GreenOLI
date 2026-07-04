import fs from "node:fs";
import path from "node:path";

import { getPayload } from "payload";
import config from "@payload-config";
import XLSX from "xlsx";

import type { Category, Media, Product } from "../src/payload-types.ts";

type SheetRow = Record<string, string>;
type Summary = { created: number; updated: number; unchanged: number; mediaUploaded: number; mediaReused: number };
type ParsedCategory = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  longDescription: string;
  heroImagePath: string;
  iconKey: string;
};
type ParsedProduct = {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  heroImagePath: string;
  galleryPaths: string[];
  composition: string;
  usage: string;
  warning: string;
  packaging: string;
  specs: { label: string; value: string }[];
  tags: string[];
  certifications: string[];
};

const rootDir = process.cwd();
const args = new Map<string, string | boolean>();
for (let i = 2; i < process.argv.length; i += 1) {
  const current = process.argv[i];
  if (!current.startsWith("--")) continue;
  const next = process.argv[i + 1];
  if (next && !next.startsWith("--")) {
    args.set(current, next);
    i += 1;
  } else {
    args.set(current, true);
  }
}

const apply = args.get("--apply") === true;
const excelPath = path.resolve(rootDir, String(args.get("--excel") || "du-lieu-nhap-cms-oli-day-du.xlsx"));
const imagesDir = path.resolve(rootDir, String(args.get("--images") || "."));
const allowedImageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const errors: string[] = [];
const warnings: string[] = [];
const summary: Summary = { created: 0, updated: 0, unchanged: 0, mediaUploaded: 0, mediaReused: 0 };
const mediaCache = new Map<string, number>();

const text = (value: unknown) => String(value ?? "").trim();
const splitList = (value: string) => value.split("|").map((item) => item.trim()).filter(Boolean);
const byOrder = <T extends { order: number }>(items: T[]) => [...items].sort((a, b) => a.order - b.order);
const docId = (value: number | { id: number } | null | undefined) =>
  typeof value === "number" ? value : value?.id;

function sheetRows(workbook: XLSX.WorkBook, sheetName: string): SheetRow[] {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    errors.push(`Thiếu sheet bắt buộc: ${sheetName}`);
    return [];
  }
  return XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" }).map((row) =>
    Object.fromEntries(Object.entries(row).map(([key, value]) => [key.trim(), text(value)])),
  );
}

function assertUnique(items: { slug: string; name: string }[], label: string) {
  const seenSlugs = new Set<string>();
  const seenNames = new Set<string>();
  for (const item of items) {
    if (!item.slug) errors.push(`${label} thiếu slug: ${item.name || "không tên"}`);
    if (seenSlugs.has(item.slug)) errors.push(`${label} trùng slug trong Excel: ${item.slug}`);
    if (item.name && seenNames.has(item.name)) errors.push(`${label} trùng tên trong Excel: ${item.name}`);
    seenSlugs.add(item.slug);
    seenNames.add(item.name);
  }
}

function requireFields(label: string, slug: string, fields: Record<string, string>) {
  for (const [field, value] of Object.entries(fields)) {
    if (!value) errors.push(`${label} ${slug || "không slug"} thiếu field bắt buộc: ${field}`);
  }
}

function resolveImage(filePath: string): string | undefined {
  if (!filePath) return undefined;
  const normalized = filePath.replace(/\\/g, "/").trim();
  const segments = normalized.split("/");
  if (path.isAbsolute(normalized) || segments.includes("..")) return undefined;
  if (!allowedImageExtensions.has(path.extname(normalized).toLowerCase())) return undefined;

  const candidates = [path.resolve(imagesDir, normalized), path.resolve(imagesDir, path.basename(normalized))];
  return candidates.find((candidate) => {
    const relative = path.relative(imagesDir, candidate);
    if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) return false;
    try {
      return fs.statSync(candidate).isFile();
    } catch {
      return false;
    }
  });
}

function collectGroupedRows(rows: SheetRow[], sheetName: string, valueColumn: string) {
  const grouped = new Map<string, { order: number; value: string; label?: string; filePath?: string }[]>();
  for (const [index, row] of rows.entries()) {
    const slug = text(row["Slug sản phẩm"]);
    const order = Number(text(row["Thứ tự"]) || 0);
    const item = {
      order,
      value: text(row[valueColumn]),
      label: text(row["Tên thông số"]),
      filePath: text(row["Tệp ảnh (file trong ZIP)"]),
    };
    if (!slug) {
      errors.push(`${sheetName} dòng ${index + 2} thiếu Slug sản phẩm`);
      continue;
    }
    if (!item.value) {
      errors.push(`${sheetName} dòng ${index + 2} thiếu ${valueColumn}`);
      continue;
    }
    grouped.set(slug, [...(grouped.get(slug) || []), item]);
  }
  return grouped;
}

function parseWorkbook() {
  if (!fs.existsSync(excelPath)) throw new Error(`Không tìm thấy file Excel: ${excelPath}`);
  const workbook = XLSX.readFile(excelPath);
  const categories = sheetRows(workbook, "Categories").map((row): ParsedCategory => ({
    slug: text(row["Slug (định danh URL)"]),
    name: text(row["Tên danh mục"]),
    shortName: text(row["Tên rút gọn"]),
    tagline: text(row["Khẩu hiệu"]),
    description: text(row["Mô tả ngắn"]),
    longDescription: text(row["Mô tả chi tiết"]),
    heroImagePath: text(row["Ảnh đại diện (file trong ZIP)"]),
    iconKey: text(row["Icon Lucide"]),
  }));
  const specRows = collectGroupedRows(sheetRows(workbook, "Product_Specs"), "Product_Specs", "Giá trị");
  const tagRows = collectGroupedRows(sheetRows(workbook, "Product_Tags"), "Product_Tags", "Thẻ");
  const certRows = collectGroupedRows(sheetRows(workbook, "Product_Certifications"), "Product_Certifications", "Chứng nhận");
  const galleryRows = collectGroupedRows(sheetRows(workbook, "Product_Gallery"), "Product_Gallery", "Tệp ảnh (file trong ZIP)");
  const products = sheetRows(workbook, "Products").map((row): ParsedProduct => {
    const slug = text(row["Slug (định danh URL)"]);
    const productGallery = splitList(text(row["Bộ sưu tập ảnh (tuỳ chọn)"]));
    const gallerySheet = byOrder(galleryRows.get(slug) || []).map((item) => item.filePath || item.value).filter(Boolean);
    return {
      slug,
      name: text(row["Tên sản phẩm"]),
      category: text(row["Danh mục"]),
      shortDescription: text(row["Mô tả ngắn"]),
      longDescription: text(row["Mô tả chi tiết"]),
      heroImagePath: text(row["Ảnh đại diện (file trong ZIP)"]),
      galleryPaths: [...productGallery, ...gallerySheet],
      composition: text(row["Thành phần"]),
      usage: text(row["Cách dùng"]),
      warning: text(row["Cảnh báo"]),
      packaging: text(row["Quy cách đóng gói"]),
      specs: byOrder(specRows.get(slug) || []).map((item) => ({ label: item.label || "", value: item.value })),
      tags: byOrder(tagRows.get(slug) || []).map((item) => item.value),
      certifications: byOrder(certRows.get(slug) || []).map((item) => item.value),
    };
  });
  const productSlugs = new Set(products.map((product) => product.slug).filter(Boolean));
  for (const [sheetName, grouped] of [
    ["Product_Specs", specRows],
    ["Product_Tags", tagRows],
    ["Product_Certifications", certRows],
    ["Product_Gallery", galleryRows],
  ] as const) {
    for (const slug of grouped.keys()) {
      if (!productSlugs.has(slug)) errors.push(`${sheetName} trỏ tới product slug không tồn tại: ${slug}`);
    }
  }
  return { categories, products };
}

async function findBySlug<T extends Category | Product>(payload: Awaited<ReturnType<typeof getPayload>>, collection: "categories" | "products") {
  const result = await payload.find({ collection, depth: 0, limit: 1000 });
  return new Map(result.docs.map((doc) => [(doc as T).slug, doc as T]));
}

async function findMediaByFilename(payload: Awaited<ReturnType<typeof getPayload>>, filename: string) {
  const found = await payload.find({ collection: "media", depth: 0, limit: 1, where: { filename: { equals: filename } } });
  return found.docs[0] as Media | undefined;
}

async function mediaId(payload: Awaited<ReturnType<typeof getPayload>>, filePath: string, alt: string) {
  const absolutePath = resolveImage(filePath);
  if (!absolutePath) return undefined;
  const filename = path.basename(absolutePath);
  if (mediaCache.has(filename)) return mediaCache.get(filename)!;
  const existing = await findMediaByFilename(payload, filename);
  if (existing) {
    summary.mediaReused += 1;
    mediaCache.set(filename, existing.id);
    return existing.id;
  }
  if (!apply) return 0;
  const created = await payload.create({ collection: "media", data: { alt }, filePath: absolutePath });
  summary.mediaUploaded += 1;
  mediaCache.set(filename, created.id as number);
  return created.id as number;
}

async function main() {
  const { categories, products } = parseWorkbook();
  assertUnique(categories, "Category");
  assertUnique(products, "Product");
  for (const category of categories) {
    requireFields("Category", category.slug, {
      name: category.name,
      tagline: category.tagline,
      description: category.description,
      longDescription: category.longDescription,
      iconKey: category.iconKey,
    });
  }
  for (const product of products) {
    requireFields("Product", product.slug, {
      name: product.name,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      composition: product.composition,
      usage: product.usage,
      warning: product.warning,
      packaging: product.packaging,
    });
    for (const [index, spec] of product.specs.entries()) {
      requireFields("Product spec", `${product.slug}#${index + 1}`, spec);
    }
  }
  const categoryNames = new Map(categories.map((category) => [category.name, category.slug]));
  for (const product of products) {
    if (!product.category) errors.push(`Product thiếu danh mục: ${product.slug}`);
    if (!categoryNames.has(product.category) && !categories.some((category) => category.slug === product.category)) {
      errors.push(`Product ${product.slug} trỏ tới danh mục không tồn tại trong Excel: ${product.category}`);
    }
  }

  const payload = await getPayload({ config });
  const existingCategories = await findBySlug<Category>(payload, "categories");
  const existingProducts = await findBySlug<Product>(payload, "products");

  for (const category of categories) {
    const existing = existingCategories.get(category.slug);
    if (!existing && !resolveImage(category.heroImagePath)) errors.push(`Category mới thiếu ảnh hợp lệ: ${category.slug}`);
    if (existing) summary.updated += 1;
    else summary.created += 1;
  }
  for (const product of products) {
    const existing = existingProducts.get(product.slug);
    if (!existing && !resolveImage(product.heroImagePath)) errors.push(`Product mới thiếu ảnh hợp lệ: ${product.slug}`);
    for (const galleryPath of product.galleryPaths) {
      if (!resolveImage(galleryPath)) warnings.push(`Bỏ qua ảnh gallery không tìm thấy của ${product.slug}: ${galleryPath}`);
    }
    if (existing) summary.updated += 1;
    else summary.created += 1;
  }

  if (errors.length) throw new Error(`Dry-run/import bị chặn:\n- ${errors.join("\n- ")}`);
  console.log(`Chế độ: ${apply ? "APPLY" : "DRY-RUN"}`);
  console.log(`Excel: ${excelPath}`);
  console.log(`Categories: ${categories.length}; Products: ${products.length}`);
  console.log(`Dự kiến create: ${summary.created}; update: ${summary.updated}`);
  if (warnings.length) console.warn(`Cảnh báo:\n- ${warnings.join("\n- ")}`);
  if (!apply) {
    console.log("Dry-run sạch. Thêm --apply để ghi DB.");
    return;
  }

  const categoryIdByNameOrSlug = new Map<string, number>();
  for (const category of categories) {
    const existing = existingCategories.get(category.slug);
    const heroImage = (await mediaId(payload, category.heroImagePath, category.name)) || docId(existing?.heroImage);
    if (!heroImage) throw new Error(`Category thiếu heroImage khi apply: ${category.slug}`);
    const data = {
      slug: category.slug,
      name: category.name,
      shortName: category.shortName,
      tagline: category.tagline,
      description: category.description,
      longDescription: category.longDescription,
      heroImage,
      iconKey: category.iconKey,
    };
    const saved = existing
      ? await payload.update({ collection: "categories", id: existing.id, data })
      : await payload.create({ collection: "categories", data });
    categoryIdByNameOrSlug.set(category.slug, saved.id as number);
    categoryIdByNameOrSlug.set(category.name, saved.id as number);
  }

  for (const product of products) {
    const existing = existingProducts.get(product.slug);
    const heroImage = (await mediaId(payload, product.heroImagePath, product.name)) || docId(existing?.heroImage);
    if (!heroImage) throw new Error(`Product thiếu heroImage khi apply: ${product.slug}`);
    const galleryImages: number[] = [];
    for (const galleryPath of product.galleryPaths) {
      const id = await mediaId(payload, galleryPath, product.name);
      if (id) galleryImages.push(id);
    }
    const existingGalleryImages = existing?.galleryImages?.map(docId).filter((id): id is number => Boolean(id));
    const categoryId = categoryIdByNameOrSlug.get(product.category);
    if (!categoryId) throw new Error(`Không tìm thấy category id cho product: ${product.slug}`);
    const data = {
      slug: product.slug,
      name: product.name,
      category: categoryId,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      heroImage,
      galleryImages: galleryImages.length ? galleryImages : existingGalleryImages,
      specs: product.specs,
      composition: product.composition,
      usage: product.usage,
      warning: product.warning,
      packaging: product.packaging,
      certifications: product.certifications.map((value) => ({ value })),
      tags: product.tags.map((value) => ({ value })),
    };
    if (existing) await payload.update({ collection: "products", id: existing.id, data });
    else await payload.create({ collection: "products", data });
  }

  console.log(`Hoàn tất import. Media upload: ${summary.mediaUploaded}; reuse: ${summary.mediaReused}`);
}

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
