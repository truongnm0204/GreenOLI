/**
 * Chuyển plain-text/markdown đơn giản (body cũ của articles) sang Lexical rich text.
 * Hỗ trợ: heading (## / ###), bullet list (- / *), numbered list (1.), đoạn văn.
 * **bold** inline được giữ dạng text thường (đủ dùng cho seed; admin có thể sửa lại sau).
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LexNode = Record<string, any>;

const textNode = (text: string): LexNode => ({
  type: "text",
  detail: 0,
  format: 0,
  mode: "normal",
  style: "",
  text: text.replace(/\*\*/g, ""),
  version: 1,
});

const paragraph = (text: string): LexNode => ({
  type: "paragraph",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  children: [textNode(text)],
});

const heading = (text: string, tag: "h2" | "h3"): LexNode => ({
  type: "heading",
  tag,
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  children: [textNode(text)],
});

const listItem = (text: string): LexNode => ({
  type: "listitem",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  value: 1,
  children: [textNode(text)],
});

const list = (items: string[], ordered: boolean): LexNode => ({
  type: "list",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  listType: ordered ? "number" : "bullet",
  start: 1,
  tag: ordered ? "ol" : "ul",
  children: items.map(listItem),
});

export function textToLexical(raw: string): LexNode {
  const lines = raw.split("\n");
  const children: LexNode[] = [];
  let listBuffer: string[] = [];
  let listOrdered = false;

  const flushList = () => {
    if (listBuffer.length) {
      children.push(list(listBuffer, listOrdered));
      listBuffer = [];
    }
  };

  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      flushList();
      continue;
    }
    if (t.startsWith("### ")) {
      flushList();
      children.push(heading(t.slice(4), "h3"));
    } else if (t.startsWith("## ")) {
      flushList();
      children.push(heading(t.slice(3), "h2"));
    } else if (/^\d+\.\s/.test(t)) {
      if (!listOrdered) flushList();
      listOrdered = true;
      listBuffer.push(t.replace(/^\d+\.\s/, ""));
    } else if (/^[-*]\s/.test(t)) {
      if (listOrdered) flushList();
      listOrdered = false;
      listBuffer.push(t.replace(/^[-*]\s/, ""));
    } else {
      flushList();
      children.push(paragraph(t));
    }
  }
  flushList();

  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: children.length ? children : [paragraph("")],
    },
  };
}
