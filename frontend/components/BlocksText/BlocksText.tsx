import type { ReactNode } from "react";
import { devClassName } from "@/lib/devClassName";
import type { BlocksContent, BlocksInlineNode, BlocksNode } from "@/types/api";

export interface BlocksTextProps {
  /** Content from a CMS blocks field. */
  children: BlocksContent | null | undefined;
  className?: string;
}

function renderInline(node: BlocksInlineNode, key: number): ReactNode {
  if (node.type === "link") {
    return (
      <a key={key} href={node.url} className="underline">
        {node.children.map(renderInline)}
      </a>
    );
  }

  let content: ReactNode = node.text;
  if (node.bold) content = <strong className="font-semibold">{content}</strong>;
  if (node.italic) content = <em>{content}</em>;
  if (node.underline) content = <u>{content}</u>;
  if (node.strikethrough) content = <s>{content}</s>;
  if (node.code) content = <code>{content}</code>;
  return <span key={key}>{content}</span>;
}

function renderBlock(node: BlocksNode, key: number): ReactNode {
  switch (node.type) {
    case "list": {
      const List = node.format === "ordered" ? "ol" : "ul";
      return (
        <List
          key={key}
          className={`pl-5 ${node.format === "ordered" ? "list-decimal" : "list-disc"}`}
        >
          {node.children.map(renderBlock)}
        </List>
      );
    }
    case "list-item":
      return <li key={key}>{node.children.map(renderInline)}</li>;
    case "image":
      return null;
    default:
      // Paragraphs, headings, quotes and code all render as plain lines.
      // Spans rather than <p> so the global `p` typography doesn't override
      // the caller's text styles.
      return (
        <span key={key} className="block">
          {node.children.map(renderInline)}
        </span>
      );
  }
}

/** Renders a Strapi blocks field. Soft line breaks (\n) are preserved. */
export default function BlocksText({
  children,
  className = "",
}: BlocksTextProps) {
  if (!children?.length) return null;

  return (
    <div
      className={`${devClassName("blocks-text")}whitespace-pre-line ${className}`}
    >
      {children.map(renderBlock)}
    </div>
  );
}
