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
      className={`gpu-transform absolute top-0 left-0 h-full w-full transition-transform ease-in-out ${zIndexClass} ${animate ? "translate-y-[-65dvh]" : ""}`}
      style={{ transitionDuration: `${SLIDE_DURATION_MS}ms` }}
    >
      <PolaroidCard image={image} hashTag={hashTag} className={cardClassName} />
    </div>
  );
}
