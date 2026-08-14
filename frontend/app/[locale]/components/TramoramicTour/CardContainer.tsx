import PolaroidCard from "./PolaroidCard";
import type { Media } from "@/types/api";
import { SLIDE_DURATION_MS } from "./useSlideShow";

export interface CardContainerProps {
  zIndexClass: string;
  animate: boolean;
  image: Media | null;
  hashTag?: string | null;
  cardClassName?: string;
}

export default function CardContainer({
  zIndexClass,
  animate,
  image,
  hashTag,
  cardClassName,
}: CardContainerProps) {
  return (
    <div
      className={`absolute left-0 top-0 w-full h-full transition-transform ease-in-out gpu-transform ${zIndexClass} ${animate ? "translate-y-[-65dvh]" : ""}`}
      style={{ transitionDuration: `${SLIDE_DURATION_MS}ms` }}
    >
      <PolaroidCard image={image} hashTag={hashTag} className={cardClassName} />
    </div>
  );
}
