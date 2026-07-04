import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

/**
 * Collection articles: bài viết/tin tức. Map với type `Article` (src/types/article.ts).
 * - body: Rich Text (Lexical) thay cho plain string — phase 03 render bằng ArticleProse.
 * - coverImage: relationship tới media. Public read cho site.
 */
export const Articles: CollectionConfig = {
  slug: "articles",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "category", "publishedAt"],
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Slug (định danh URL)",
    },
    { name: "title", type: "text", required: true, label: "Tiêu đề" },
    { name: "excerpt", type: "textarea", required: true, label: "Tóm tắt" },
    {
      name: "body",
      type: "richText",
      required: true,
      label: "Nội dung",
      editor: lexicalEditor(),
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Ảnh bìa",
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      label: "Ngày đăng",
    },
    { name: "author", type: "text", required: true, label: "Tác giả" },
    { name: "category", type: "text", required: true, label: "Chuyên mục" },
    {
      name: "readingMinutes",
      type: "number",
      required: true,
      label: "Thời gian đọc (phút)",
    },
    {
      name: "tags",
      type: "array",
      label: "Thẻ",
      fields: [{ name: "value", type: "text", required: true, label: "Thẻ" }],
    },
  ],
};
