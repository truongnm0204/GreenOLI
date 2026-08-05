import React from "react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type {
  JSXConverters,
  JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import { embeddedUploadConverter } from "@/lib/embedded-upload-converter";

/**
 * Chuyển YouTube / Vimeo URL thành embed URL cho iframe.
 * Hỗ trợ: youtube.com/watch?v=, youtu.be/, vimeo.com/
 */
function toEmbedUrl(url: string): string {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

/** Converter cho block videoEmbed */
const VideoEmbedConverter: JSXConverters[string] = ({ node }: { node: Record<string, unknown> }) => {
  const fields = (node.fields ?? {}) as { url?: string; caption?: string };
  const embedUrl = toEmbedUrl(fields.url ?? "");
  if (!embedUrl) return null;
  return (
    <figure className="my-6 w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-ambient">
        <iframe
          src={embedUrl}
          title={fields.caption ?? "Video sản phẩm"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      {fields.caption && (
        <figcaption className="mt-2 text-center text-sm text-text-muted italic">
          {fields.caption}
        </figcaption>
      )}
    </figure>
  );
};

/** Converter cho block imageGallery */
const ImageGalleryConverter: JSXConverters[string] = ({ node }: { node: Record<string, unknown> }) => {
  const fields = (node.fields ?? {}) as {
    images?: Array<{
      image?: { url?: string; alt?: string };
      caption?: string;
    }>;
  };
  const images = fields.images ?? [];
  if (images.length === 0) return null;

  return (
    <div
      className={`my-6 grid gap-3 ${
        images.length === 1
          ? "grid-cols-1"
          : images.length === 2
          ? "grid-cols-2"
          : "grid-cols-2 md:grid-cols-3"
      }`}
    >
      {images.map((item, idx) => {
        const src = item.image?.url;
        if (!src) return null;
        return (
          <figure key={idx} className="overflow-hidden rounded-xl">
            <div className="relative aspect-square bg-surface-light">
              <Image
                src={src}
                alt={item.image?.alt ?? item.caption ?? `Ảnh ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
            {item.caption && (
              <figcaption className="mt-1 text-center text-xs text-text-muted italic">
                {item.caption}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
};

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  // Tài liệu nhúng (PDF/Word) render iframe preview ngay trong bài
  upload: embeddedUploadConverter,
  blocks: {
    ...((defaultConverters as Record<string, unknown>).blocks ?? {}),
    videoEmbed: VideoEmbedConverter,
    imageGallery: ImageGalleryConverter,
  },
});

type Props = {
  content: SerializedEditorState;
};

/**
 * ProductDescription — render Lexical JSON từ Payload thành React.
 * Hỗ trợ tất cả default features (heading, list, bold, italic, link, upload/image)
 * + custom blocks: videoEmbed, imageGallery.
 */
export function ProductDescription({ content }: Props) {
  if (!content) return null;

  return (
    <div
      className={[
        "prose prose-lg max-w-none",
        // Heading styles
        "prose-headings:font-bold prose-headings:text-text-primary",
        "prose-h2:text-2xl prose-h3:text-xl",
        // Body text
        "prose-p:text-text-muted prose-p:leading-relaxed",
        // Links
        "prose-a:text-primary-dark prose-a:underline hover:prose-a:text-primary",
        // Lists
        "prose-li:text-text-muted",
        // Images
        "prose-img:rounded-xl prose-img:shadow-ambient",
        // Blockquote
        "prose-blockquote:border-l-primary prose-blockquote:text-text-muted",
        // Code
        "prose-code:bg-surface-container prose-code:rounded prose-code:px-1",
      ].join(" ")}
    >
      <LexicalRichText
        data={content}
        converters={jsxConverters}
      />
    </div>
  );
}
