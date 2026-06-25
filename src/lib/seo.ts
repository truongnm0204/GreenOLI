import type { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site-config";

type BuildMetadataInput = {
  title: string;
  description?: string;
  path?: string; // path relative to site root, e.g. "/cua-hang"
  ogImage?: string;
  noIndex?: boolean;
};

/**
 * Build a per-page Metadata object that follows Open Graph + Twitter card
 * best practices and points canonical at the absolute URL on greenoli.vn.
 */
export function buildMetadata({
  title,
  description = SITE_CONFIG.description,
  path = "/",
  ogImage,
  noIndex,
}: BuildMetadataInput): Metadata {
  const fullTitle = title.includes(SITE_CONFIG.name)
    ? title
    : `${title} | ${SITE_CONFIG.name}`;
  const url = `${SITE_CONFIG.url}${path === "/" ? "" : path}`;
  const image = ogImage ?? `${SITE_CONFIG.url}/opengraph-image`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.locale,
      siteName: SITE_CONFIG.name,
      title: fullTitle,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}
