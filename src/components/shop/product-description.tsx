import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import { productDescriptionConverters } from "@/lib/richtext-converters";
import { extractDescriptionToc } from "@/lib/description-toc";
import { DescriptionToc } from "@/components/shop/description-toc";
import { DescriptionImageZoom } from "@/components/shop/description-image-zoom";

type Props = {
  content: SerializedEditorState;
};

/**
 * ProductDescription — Lexical → React, TOC sticky + zoom ảnh.
 */
export function ProductDescription({ content }: Props) {
  if (!content) return null;

  const toc = extractDescriptionToc(content);

  return (
    <div
      className={
        toc.length >= 2
          ? "grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]"
          : undefined
      }
    >
      {toc.length >= 2 ? <DescriptionToc items={toc} /> : null}

      <DescriptionImageZoom>
        <div
          data-product-description
          className={[
            "product-description max-w-none",
            "text-[15px] md:text-base leading-[1.75] text-text-primary",
            "[&_h1]:mt-8 [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:md:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-text-primary [&_h1]:scroll-mt-28",
            "[&_h2]:mt-8 [&_h2]:mb-2.5 [&_h2]:border-b [&_h2]:border-primary/15 [&_h2]:pb-2 [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:text-text-primary [&_h2]:scroll-mt-28",
            "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:md:text-xl [&_h3]:font-semibold [&_h3]:text-text-primary [&_h3]:scroll-mt-28",
            "[&_h4]:mt-5 [&_h4]:mb-1.5 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-text-primary",
            "[&_p]:my-3 [&_p]:text-text-primary/90 [&_p]:leading-[1.75]",
            "[&_a]:text-primary-dark [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary",
            "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:marker:text-primary-dark",
            "[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_ol]:marker:font-semibold [&_ol]:marker:text-primary-dark",
            "[&_li]:text-text-primary/90 [&_li]:leading-relaxed",
            "[&_img]:my-5 [&_img]:mx-auto [&_img]:h-auto [&_img]:w-full [&_img]:max-w-full [&_img]:rounded-2xl [&_img]:object-contain [&_img]:shadow-ambient [&_img]:ring-1 [&_img]:ring-border-soft/40",
            "[&_figure]:my-6 [&_figure]:w-full",
            "[&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:italic [&_figcaption]:text-text-muted",
            "[&_blockquote]:my-5 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-primary/5 [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:text-text-muted",
            "[&_hr]:my-8 [&_hr]:border-border-soft",
            "[&_code]:rounded [&_code]:bg-surface-container [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm",
            "[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm md:[&_table]:text-base",
            "[&_th]:border [&_th]:border-border-soft [&_th]:bg-surface-container [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold",
            "[&_td]:border [&_td]:border-border-soft [&_td]:px-3 [&_td]:py-2.5 [&_td]:text-text-primary/90",
            "[&_strong]:font-semibold [&_strong]:text-text-primary",
          ].join(" ")}
        >
          <LexicalRichText
            data={content}
            converters={productDescriptionConverters}
          />
        </div>
      </DescriptionImageZoom>
    </div>
  );
}
