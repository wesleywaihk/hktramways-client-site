import PolaroidCard from "./PolaroidCard";
import type { Media } from "@/types/api";
import { SLIDE_DURATION_MS } from "./useSlideShow";

export interface CardContainerProps {
  rootClass: string;
  animate: boolean;
  image: Media | null;
  hashTag?: string | null;
  cardClassName?: string;
}

export default function CardContainer({
  rootClass,
  animate,
  image,
  hashTag,
  cardClassName,
}: CardContainerProps) {
  return (
    <div
      className={`gpu-transform absolute top-0 left-0 h-full w-[min(76vw,520px)] translate-x-[-50%] transition-transform ease-in-out lg:w-[min(42vw,520px)] lg:translate-x-0 ${rootClass} ${animate ? "translate-x-[calc(-50%+10vw)] translate-y-[-79dvh] rotate-20 lg:translate-x-[10vw]" : ""}`}
      style={{ transitionDuration: `${SLIDE_DURATION_MS}ms` }}
    >
      <PolaroidCard image={image} hashTag={hashTag} className={cardClassName} />
    </div>
  );
}
