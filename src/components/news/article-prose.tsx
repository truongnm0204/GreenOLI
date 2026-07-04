import * as React from "react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { ArticleBody } from "@/types/article";

type Props = {
  body: ArticleBody;
};

/**
 * Render nội dung bài viết từ Lexical rich text (Payload).
 * RichText của @payloadcms/richtext-lexical tự chuyển cây Lexical → HTML an toàn.
 * Styling qua wrapper prose để giữ giao diện cũ (heading, list, paragraph).
 */
export function ArticleProse({ body }: Props) {
  return (
    <div
      className="space-y-5 text-base md:text-lg leading-relaxed text-text-primary
        [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:text-text-primary [&_h2]:mt-8
        [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:text-text-primary [&_h3]:mt-6
        [&_p]:text-text-primary/90
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5 [&_ol]:marker:text-primary-dark [&_ol]:marker:font-semibold
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ul]:marker:text-primary-dark
        [&_strong]:font-semibold [&_strong]:text-text-primary
        [&_a]:text-primary-dark [&_a]:underline"
    >
      <RichText data={body as SerializedEditorState} />
    </div>
  );
}
