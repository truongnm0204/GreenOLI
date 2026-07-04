import { getPayload } from "payload";
import config from "@payload-config";

import { CATEGORIES } from "./seed-data/categories.ts";
import { PRODUCTS } from "./seed-data/products.ts";
import { ARTICLES } from "./seed-data/articles.ts";
import { SERVICES } from "./seed-data/services.ts";
import { PARTNERS } from "./seed-data/partners.ts";
import { GALLERY } from "./seed-data/gallery.ts";
import { textToLexical } from "./lib/text-to-lexical.ts";

/**
 * Seed dữ liệu tĩnh cũ vào Payload.
 * Thứ tự theo dependency: media (upload Cloudinary) → categories → products
 * → articles → services → partners → gallery.
 * Ảnh: fetch từ URL picsum cũ → upload lên Cloudinary qua Payload (media collection).
 * Idempotent: xóa sạch dữ liệu cũ trước khi seed lại.
 */

const COLLECTIONS_TO_CLEAR = [
  "gallery",
  "partners",
  "services",
  "articles",
  "products",
  "categories",
  "media",
] as const;

// Cache tránh upload trùng cùng một URL ảnh.
const mediaCache = new Map<string, number>();

async function main() {
  const payload = await getPayload({ config });

  console.log("== Xóa dữ liệu cũ ==");
  for (const slug of COLLECTIONS_TO_CLEAR) {
    await payload.delete({ collection: slug, where: {} });
  }

  // Upload 1 ảnh từ URL → trả media id (cache theo URL).
  const uploadImage = async (url: string, alt: string): Promise<number> => {
    if (mediaCache.has(url)) return mediaCache.get(url)!;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Tải ảnh thất bại: ${url} (${res.status})`);
    const buffer = Buffer.from(await res.arrayBuffer());
    // Tên file từ seed của picsum để public_id ổn định.
    const name = url.replace(/[^a-zA-Z0-9]/g, "-").slice(-40) + ".jpg";
    const doc = await payload.create({
      collection: "media",
      data: { alt },
      file: {
        data: buffer,
        mimetype: "image/jpeg",
        name,
        size: buffer.length,
      },
    });
    mediaCache.set(url, doc.id as number);
    return doc.id as number;
  };

  console.log("== Seed categories ==");
  const categoryIdBySlug = new Map<string, number>();
  for (const c of CATEGORIES) {
    const heroImage = await uploadImage(c.heroImage, c.name);
    const doc = await payload.create({
      collection: "categories",
      data: {
        slug: c.slug,
        name: c.name,
        shortName: c.shortName,
        tagline: c.tagline,
        description: c.description,
        longDescription: c.longDescription,
        heroImage,
        iconKey: c.iconKey,
      },
    });
    categoryIdBySlug.set(c.slug, doc.id as number);
  }

  console.log("== Seed products ==");
  for (const p of PRODUCTS) {
    const heroImage = await uploadImage(p.heroImage, p.name);
    const galleryImages: number[] = [];
    for (const g of p.galleryImages) {
      galleryImages.push(await uploadImage(g, p.name));
    }
    const categoryId = categoryIdBySlug.get(p.category);
    if (!categoryId) throw new Error(`Không tìm thấy category: ${p.category}`);
    await payload.create({
      collection: "products",
      data: {
        slug: p.slug,
        name: p.name,
        category: categoryId,
        shortDescription: p.shortDescription,
        longDescription: p.longDescription,
        heroImage,
        galleryImages,
        specs: p.specs.map((s) => ({ label: s.label, value: s.value })),
        composition: p.composition,
        usage: p.usage,
        warning: p.warning,
        packaging: p.packaging,
        certifications: p.certifications.map((value) => ({ value })),
        tags: p.tags.map((value) => ({ value })),
      },
    });
  }

  console.log("== Seed articles ==");
  for (const a of ARTICLES) {
    const coverImage = await uploadImage(a.coverImage, a.title);
    await payload.create({
      collection: "articles",
      data: {
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body: textToLexical(a.body) as any,
        coverImage,
        publishedAt: new Date(a.publishedAt).toISOString(),
        author: a.author,
        category: a.category,
        readingMinutes: a.readingMinutes,
        tags: a.tags.map((value) => ({ value })),
      },
    });
  }

  console.log("== Seed services ==");
  for (const s of SERVICES) {
    const image = await uploadImage(s.image, s.name);
    await payload.create({
      collection: "services",
      data: {
        slug: s.slug,
        name: s.name,
        tagline: s.tagline,
        description: s.description,
        iconKey: s.iconKey,
        image,
      },
    });
  }

  console.log("== Seed partners ==");
  for (const p of PARTNERS) {
    const logo = await uploadImage(p.logo, p.name);
    await payload.create({
      collection: "partners",
      data: { name: p.name, logo },
    });
  }

  console.log("== Seed gallery ==");
  for (const g of GALLERY) {
    const image = await uploadImage(g.src, g.alt);
    await payload.create({
      collection: "gallery",
      data: { image, caption: g.caption },
    });
  }

  console.log("== Hoàn tất seed ==");
}

// Top-level await: payload run đợi promise này hoàn thành trước khi thoát process
// (fire-and-forget main().catch() sẽ khiến process thoát sớm, không seed được gì).
try {
  await main();
} catch (err) {
  console.error("Seed lỗi:", err);
  process.exit(1);
}
