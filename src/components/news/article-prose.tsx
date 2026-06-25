import * as React from "react";

type Props = {
  body: string;
};

/**
 * Tiny markdown-ish renderer for seed article bodies.
 * Supports h2 (## ), unordered list lines starting with "- " or "* ",
 * ordered list (1. ), bold (**text**), and paragraphs separated by blank lines.
 * Replace with `react-markdown` when CMS lands.
 */
export function ArticleProse({ body }: Props) {
  const blocks = body.trim().split(/\n\n+/);

  const renderInline = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    const regex = /\*\*(.+?)\*\*/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text))) {
      if (m.index > last) parts.push(text.slice(last, m.index));
      parts.push(
        <strong key={`${m.index}`} className="font-semibold text-text-primary">
          {m[1]}
        </strong>,
      );
      last = m.index + m[0].length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  };

  return (
    <div className="space-y-5 text-base md:text-lg leading-relaxed text-text-primary">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="font-bold text-2xl md:text-3xl text-text-primary mt-8"
            >
              {block.slice(3)}
            </h2>
          );
        }
        if (/^(\d+)\.\s/.test(block.split("\n")[0])) {
          const items = block.split("\n").map((l) => l.replace(/^\d+\.\s/, ""));
          return (
            <ol
              key={i}
              className="list-decimal pl-6 space-y-1.5 marker:text-primary-dark marker:font-semibold"
            >
              {items.map((it, j) => (
                <li key={j}>{renderInline(it)}</li>
              ))}
            </ol>
          );
        }
        if (block.startsWith("- ") || block.startsWith("* ")) {
          const items = block
            .split("\n")
            .map((l) => l.replace(/^[-*]\s/, ""));
          return (
            <ul
              key={i}
              className="list-disc pl-6 space-y-1.5 marker:text-primary-dark"
            >
              {items.map((it, j) => (
                <li key={j}>{renderInline(it)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-text-primary/90">
            {renderInline(block)}
          </p>
        );
      })}
    </div>
  );
}
