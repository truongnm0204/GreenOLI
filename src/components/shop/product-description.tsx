import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import { productDescriptionConverters } from "@/lib/richtext-converters";

type Props = {
  content: SerializedEditorState;
};

/**
 * ProductDescription — render Lexical JSON từ Payload thành React.
 * Features: heading/list/link/upload + blocks video/gallery/fullBleed/twoColumn/cta
 * + auto-unfurl YT/Vimeo + CSS layout catalog (Shopee-like).
 */
export function ProductDescription({ content }: Props) {
  if (!content) return null;

  return (
    <div
      className={[
        "product-description max-w-none",
        "text-base md:text-lg leading-relaxed text-text-primary",
        "[&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-bold [&_h1]:text-text-primary [&_h1]:tracking-tight",
        "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-text-primary [&_h2]:tracking-tight",
        "[&_h3]:mt-8 [&_h3]:mb-2.5 [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-semibold [&_h3]:text-text-primary",
        "[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-text-primary",
        "[&_p]:my-4 [&_p]:text-text-primary/90 [&_p]:leading-[1.8]",
        "[&_a]:text-primary-dark [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary",
        "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:marker:text-primary-dark",
        "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:marker:text-primary-dark [&_ol]:marker:font-semibold",
        "[&_li]:text-text-primary/90 [&_li]:leading-relaxed",
        "[&_img]:my-6 [&_img]:h-auto [&_img]:w-full [&_img]:max-w-full [&_img]:rounded-2xl [&_img]:object-contain [&_img]:shadow-ambient [&_img]:ring-1 [&_img]:ring-border-soft/50",
        "[&_figure]:my-8 [&_figure]:w-full",
        "[&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-text-muted [&_figcaption]:italic",
        "[&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-primary/5 [&_blockquote]:px-5 [&_blockquote]:py-3 [&_blockquote]:text-text-muted",
        "[&_hr]:my-10 [&_hr]:border-border-soft",
        "[&_code]:rounded [&_code]:bg-surface-container [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm",
        "[&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm md:[&_table]:text-base",
        "[&_th]:border [&_th]:border-border-soft [&_th]:bg-surface-container [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold",
        "[&_td]:border [&_td]:border-border-soft [&_td]:px-3 [&_td]:py-2.5 [&_td]:text-text-primary/90",
        "[&_strong]:font-semibold [&_strong]:text-text-primary",
      ].join(" ")}
    >
      <LexicalRichText data={content} converters={productDescriptionConverters} />
    </div>
  );
}
