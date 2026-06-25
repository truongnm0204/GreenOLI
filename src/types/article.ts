export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  publishedAt: string; // ISO date
  author: string;
  category: string;
  readingMinutes: number;
  tags: string[];
};
