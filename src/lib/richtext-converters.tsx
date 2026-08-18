import React from "react";
import type {
  JSXConverters,
  JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import Link from "next/link";
import { embeddedUploadConverter } from "@/lib/embedded-upload-converter";
import { mediaUrl } from "@/lib/map-helpers";
import {
  extractLoneVideoUrl,
  toVideoEmbedUrl,
} from "@/lib/video-embed";
import { cn } from "@/lib/cn";

/** Player 16:9 dùng chung cho block video + auto-unfurl link. */
export function VideoPlayer({
  embedUrl,
  title,
  caption,
}: {
  embedUrl: string;
  title?: string;
  caption?: string;
}) {
  return (
    <figure className="product-desc-video my-8 w-full not-prose">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/5 shadow-ambient ring-1 ring-border-soft/60">
        <iframe
          src={embedUrl}
          title={title ?? caption ?? "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2.5 text-center text-sm text-text-muted italic">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function resolveMediaSrc(image: unknown): string {
  return mediaUrl(image);
}

type LexChild = {
  type?: string;
  text?: string;
  fields?: { url?: string; linkType?: string };
  children?: LexChild[];
};

function plainTextFromChildren(children: LexChild[] | undefined): string {
  if (!children?.length) return "";
  return children
    .map((c) => {
      if (typeof c.text === "string") return c.text;
      if (c.type === "linebreak") return "\n";
      if (c.children) return plainTextFromChildren(c.children);
      return "";
    })
    .join("");
}

function loneVideoEmbedFromNode(node: {
  children?: LexChild[];
}): string | null {
  const children = node.children ?? [];
  if (children.length === 0) return null;

  if (children.length === 1 && children[0]?.type === "text") {
    const lone = extractLoneVideoUrl(children[0].text ?? "");
    return lone ? toVideoEmbedUrl(lone) : null;
  }

  if (
    children.length === 1 &&
    (children[0]?.type === "link" || children[0]?.type === "autolink")
  ) {
    const href = children[0].fields?.url ?? "";
    const fromHref = extractLoneVideoUrl(href);
    if (fromHref) return toVideoEmbedUrl(fromHref);
    const inner = plainTextFromChildren(children[0].children);
    const fromText = extractLoneVideoUrl(inner);
    return fromText ? toVideoEmbedUrl(fromText) : null;
  }

  const all = plainTextFromChildren(children).trim();
  const lone = extractLoneVideoUrl(all);
  return lone ? toVideoEmbedUrl(lone) : null;
}

const VideoEmbedConverter: JSXConverters[string] = ({
  node,
}: {
  node: Record<string, unknown>;
}) => {
  const fields = (node.fields ?? {}) as { url?: string; caption?: string };
  const embedUrl = toVideoEmbedUrl(fields.url ?? "");
  if (!embedUrl) return null;
  return (
    <VideoPlayer
      embedUrl={embedUrl}
      title={fields.caption ?? "Video"}
      caption={fields.caption}
    />
  );
};

const ImageGalleryConverter: JSXConverters[string] = ({
  node,
}: {
  node: Record<string, unknown>;
}) => {
  const fields = (node.fields ?? {}) as {
    images?: Array<{ image?: unknown; caption?: string }>;
  };
  const images = fields.images ?? [];
  if (images.length === 0) return null;

  return (
    <div
      className={`product-desc-gallery my-8 grid gap-3 not-prose ${
        images.length === 1
          ? "grid-cols-1"
          : images.length === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-2 md:grid-cols-3"
      }`}
    >
      {images.map((item, idx) => {
        const src = resolveMediaSrc(item.image);
        if (!src) return null;
        const alt =
          (typeof item.image === "object" &&
          item.image &&
          "alt" in item.image &&
          typeof (item.image as { alt?: string }).alt === "string"
            ? (item.image as { alt?: string }).alt
            : undefined) ??
          item.caption ??
          `Ảnh ${idx + 1}`;
        return (
          <figure
            key={idx}
            className="overflow-hidden rounded-2xl bg-surface-light ring-1 ring-border-soft/50"
          >
            <div
              className={`relative w-full bg-surface-light ${
                images.length === 1
                  ? "aspect-[4/3] md:aspect-[16/9]"
                  : "aspect-square"
              }`}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes={
                  images.length === 1
                    ? "(max-width: 768px) 100vw, 900px"
                    : "(max-width: 768px) 50vw, 33vw"
                }
                className="object-contain"
              />
            </div>
            {item.caption ? (
              <figcaption className="px-2 py-2 text-center text-xs text-text-muted italic">
                {item.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
};

const FullBleedImageConverter: JSXConverters[string] = ({
  node,
}: {
  node: Record<string, unknown>;
}) => {
  const fields = (node.fields ?? {}) as {
    image?: unknown;
    caption?: string;
    alt?: string;
  };
  const src = resolveMediaSrc(fields.image);
  if (!src) return null;
  const alt =
    fields.alt?.trim() ||
    fields.caption?.trim() ||
    (typeof fields.image === "object" &&
    fields.image &&
    "alt" in fields.image
      ? String((fields.image as { alt?: string }).alt ?? "Ảnh")
      : "Ảnh");

  return (
    <figure className="product-desc-fullbleed my-10 w-full not-prose">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-surface-light shadow-ambient ring-1 ring-border-soft/50 md:aspect-[21/9]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 960px"
          className="object-cover"
        />
      </div>
      {fields.caption ? (
        <figcaption className="mt-2.5 text-center text-sm text-text-muted italic">
          {fields.caption}
        </figcaption>
      ) : null}
    </figure>
  );
};

const TwoColumnConverter: JSXConverters[string] = ({
  node,
}: {
  node: Record<string, unknown>;
}) => {
  const fields = (node.fields ?? {}) as {
    layout?: "imageLeft" | "imageRight";
    image?: unknown;
    heading?: string;
    body?: string;
    imageCaption?: string;
  };
  const src = resolveMediaSrc(fields.image);
  const body = fields.body?.trim() ?? "";
  if (!src && !body) return null;

  const imageLeft = fields.layout !== "imageRight";
  const paragraphs = body
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const imageCol = src ? (
    <figure className="overflow-hidden rounded-2xl bg-surface-light ring-1 ring-border-soft/50">
      <div className="relative aspect-[4/3] w-full md:aspect-square">
        <Image
          src={src}
          alt={fields.imageCaption || fields.heading || "Ảnh minh họa"}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover"
        />
      </div>
      {fields.imageCaption ? (
        <figcaption className="px-3 py-2 text-center text-xs text-text-muted italic">
          {fields.imageCaption}
        </figcaption>
      ) : null}
    </figure>
  ) : null;

  const textCol = (
    <div className="flex flex-col justify-center space-y-3">
      {fields.heading ? (
        <h3 className="text-xl font-bold tracking-tight text-text-primary md:text-2xl">
          {fields.heading}
        </h3>
      ) : null}
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="text-base leading-relaxed text-text-primary/90 md:text-lg"
        >
          {p}
        </p>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "product-desc-two-col my-10 grid gap-6 not-prose md:grid-cols-2 md:gap-10 md:items-center",
        !imageLeft && "md:[&>*:first-child]:order-2",
      )}
    >
      {imageCol}
      {textCol}
    </div>
  );
};

const CtaBannerConverter: JSXConverters[string] = ({
  node,
}: {
  node: Record<string, unknown>;
}) => {
  const fields = (node.fields ?? {}) as {
    title?: string;
    subtitle?: string;
    buttonLabel?: string;
    buttonHref?: string;
    variant?: "primary" | "dark" | "soft";
  };
  if (!fields.title?.trim() || !fields.buttonHref?.trim()) return null;

  const href = fields.buttonHref.trim();
  const external = /^https?:\/\//i.test(href);
  const variant = fields.variant ?? "primary";

  const shell =
    variant === "dark"
      ? "bg-text-primary text-white"
      : variant === "soft"
        ? "bg-primary/10 text-text-primary ring-1 ring-primary/20"
        : "bg-primary text-on-primary";

  const btn =
    variant === "dark"
      ? "bg-white text-text-primary hover:bg-white/90"
      : variant === "soft"
        ? "bg-primary text-on-primary hover:bg-primary-dark"
        : "bg-white text-primary-dark hover:bg-white/90";

  const buttonClass = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm transition",
    btn,
  );

  const button = external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClass}
    >
      {fields.buttonLabel || "Liên hệ ngay"}
    </a>
  ) : (
    <Link href={href} className={buttonClass}>
      {fields.buttonLabel || "Liên hệ ngay"}
    </Link>
  );

  return (
    <aside
      className={cn(
        "product-desc-cta my-10 flex flex-col gap-4 rounded-3xl px-6 py-8 not-prose sm:flex-row sm:items-center sm:justify-between sm:px-8",
        shell,
      )}
    >
      <div className="min-w-0 space-y-1.5">
        <p className="text-lg font-bold tracking-tight md:text-xl">
          {fields.title}
        </p>
        {fields.subtitle?.trim() ? (
          <p
            className={cn(
              "text-sm leading-relaxed md:text-base",
              variant === "primary" ? "text-on-primary/90" : "text-current/80",
            )}
          >
            {fields.subtitle}
          </p>
        ) : null}
      </div>
      <div className="shrink-0">{button}</div>
    </aside>
  );
};

const productBlocks = {
  videoEmbed: VideoEmbedConverter,
  imageGallery: ImageGalleryConverter,
  fullBleedImage: FullBleedImageConverter,
  twoColumn: TwoColumnConverter,
  ctaBanner: CtaBannerConverter,
};

/**
 * Converters đầy đủ cho mô tả sản phẩm (blocks layout + auto YT).
 */
export const productDescriptionConverters: JSXConvertersFunction = ({
  defaultConverters,
}) => {
  const baseParagraph = defaultConverters.paragraph;
  const baseLink = defaultConverters.link;
  const baseAutolink = defaultConverters.autolink;

  return {
    ...defaultConverters,
    upload: embeddedUploadConverter,
    paragraph: (args) => {
      const embedUrl = loneVideoEmbedFromNode(
        args.node as { children?: LexChild[] },
      );
      if (embedUrl) {
        return <VideoPlayer embedUrl={embedUrl} title="Video" />;
      }
      if (typeof baseParagraph === "function") return baseParagraph(args);
      return null;
    },
    link: (args) => {
      const href =
        (args.node as { fields?: { url?: string } })?.fields?.url ?? "";
      const embedUrl = extractLoneVideoUrl(href)
        ? toVideoEmbedUrl(href)
        : null;
      if (embedUrl) {
        const label = plainTextFromChildren(
          (args.node as { children?: LexChild[] }).children,
        ).trim();
        if (!label || extractLoneVideoUrl(label) || label === href.trim()) {
          return <VideoPlayer embedUrl={embedUrl} title="Video" />;
        }
      }
      if (typeof baseLink === "function") return baseLink(args);
      return null;
    },
    autolink: (args) => {
      const href =
        (args.node as { fields?: { url?: string } })?.fields?.url ?? "";
      const embedUrl = extractLoneVideoUrl(href)
        ? toVideoEmbedUrl(href)
        : null;
      if (embedUrl) {
        const label = plainTextFromChildren(
          (args.node as { children?: LexChild[] }).children,
        ).trim();
        if (!label || extractLoneVideoUrl(label) || label === href.trim()) {
          return <VideoPlayer embedUrl={embedUrl} title="Video" />;
        }
      }
      if (typeof baseAutolink === "function") return baseAutolink(args);
      return null;
    },
    blocks: {
      ...(((defaultConverters as Record<string, unknown>).blocks as
        | Record<string, unknown>
        | undefined) ?? {}),
      ...productBlocks,
    },
  };
};

/**
 * Converters gọn cho bài viết: upload + auto YT/Vimeo (không phụ thuộc product blocks).
 */
export const articleBodyConverters: JSXConvertersFunction = ({
  defaultConverters,
}) => {
  const baseParagraph = defaultConverters.paragraph;
  const baseLink = defaultConverters.link;
  const baseAutolink = defaultConverters.autolink;

  return {
    ...defaultConverters,
    upload: embeddedUploadConverter,
    paragraph: (args) => {
      const embedUrl = loneVideoEmbedFromNode(
        args.node as { children?: LexChild[] },
      );
      if (embedUrl) {
        return <VideoPlayer embedUrl={embedUrl} title="Video" />;
      }
      if (typeof baseParagraph === "function") return baseParagraph(args);
      return null;
    },
    link: (args) => {
      const href =
        (args.node as { fields?: { url?: string } })?.fields?.url ?? "";
      const embedUrl = extractLoneVideoUrl(href)
        ? toVideoEmbedUrl(href)
        : null;
      if (embedUrl) {
        const label = plainTextFromChildren(
          (args.node as { children?: LexChild[] }).children,
        ).trim();
        if (!label || extractLoneVideoUrl(label) || label === href.trim()) {
          return <VideoPlayer embedUrl={embedUrl} title="Video" />;
        }
      }
      if (typeof baseLink === "function") return baseLink(args);
      return null;
    },
    autolink: (args) => {
      const href =
        (args.node as { fields?: { url?: string } })?.fields?.url ?? "";
      const embedUrl = extractLoneVideoUrl(href)
        ? toVideoEmbedUrl(href)
        : null;
      if (embedUrl) {
        const label = plainTextFromChildren(
          (args.node as { children?: LexChild[] }).children,
        ).trim();
        if (!label || extractLoneVideoUrl(label) || label === href.trim()) {
          return <VideoPlayer embedUrl={embedUrl} title="Video" />;
        }
      }
      if (typeof baseAutolink === "function") return baseAutolink(args);
      return null;
    },
  };
};
