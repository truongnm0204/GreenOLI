// body: Lexical rich text (từ Payload). Render bằng RichText của @payloadcms/richtext-lexical.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ArticleBody = Record<string, any>;

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  body: ArticleBody;
  coverImage: string;
  publishedAt: string; // ISO date
  author: string;
  category: string;
  readingMinutes: number;
  tags: string[];
};
