import type { Article, ArticleBody } from "@/types/article";
import { getPayloadClient } from "@/lib/payload-client";
import { mediaUrl, valueList } from "@/lib/map-helpers";

/**
 * Data layer articles: query Payload Local API, map về type `Article`.
 * - body: giữ nguyên object Lexical (ArticleProse render bằng RichText).
 * - coverImage (media) → url string; publishedAt → ISO string; tags → string[].
 */

type ArticleDoc = {
  slug: string;
  title: string;
  excerpt: string;
  body: ArticleBody;
  coverImage: unknown;
  publishedAt: string;
  author: string;
  category: string;
  readingMinutes: number;
  tags?: Array<{ value: string }>;
};

const toArticle = (doc: ArticleDoc): Article => ({
  slug: doc.slug,
  title: doc.title,
  excerpt: doc.excerpt,
  body: doc.body,
  coverImage: mediaUrl(doc.coverImage),
  publishedAt: doc.publishedAt,
  author: doc.author,
  category: doc.category,
  readingMinutes: doc.readingMinutes,
  tags: valueList(doc.tags),
});

export const getAllArticles = async (): Promise<Article[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "articles",
    limit: 200,
    depth: 1,
    sort: "-publishedAt",
  });
  return (docs as ArticleDoc[]).map(toArticle);
};

export const getArticleBySlug = async (
  slug: string,
): Promise<Article | undefined> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "articles",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  const doc = docs[0] as ArticleDoc | undefined;
  return doc ? toArticle(doc) : undefined;
};

export const getFeaturedArticle = async (): Promise<Article | undefined> => {
  const all = await getAllArticles();
  return all[0];
};

export const getRelatedArticles = async (
  slug: string,
  limit = 3,
): Promise<Article[]> => {
  const all = await getAllArticles();
  return all.filter((a) => a.slug !== slug).slice(0, limit);
};
