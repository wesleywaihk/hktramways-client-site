import Markdown from "react-markdown";
import { devClassName } from "@/lib/devClassName";

export interface RichTextProps {
  /** Markdown from a CMS richtext field. Raw HTML is not rendered. */
  children: string | null | undefined;
  className?: string;
}

export default function RichText({ children, className = "" }: RichTextProps) {
  if (!children) return null;

  return (
    <div
      className={`${devClassName("rich-text")}[&_a]:underline [&_li]:mt-3 [&_li]:pl-1 [&_li>p]:inline [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-4 [&_p+ul]:mt-4 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 ${className}`}
    >
      <Markdown>{children}</Markdown>
    </div>
  );
}
