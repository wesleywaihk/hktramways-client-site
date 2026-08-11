import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";
import type { Media } from "@/types/api";

export interface PolaroidCardProps {
  image: Media | null;
  hashTag?: string | null;
  className?: string;
}

export default function PolaroidCard({
  image,
  hashTag,
  className = "",
}: PolaroidCardProps) {
  return (
    <div
      className={`absolute right-0 top-1/2 w-[78vmin] md:w-[86%] pt-[5vmin] px-[5vmin] pb-[14vmin] md:pt-[2.8vmin] md:px-[2.8vmin] md:pb-[8.3vmin] lg:pt-[40px] lg:px-[40px] lg:pb-[100px] bg-white [container-type:inline-size] ${className}`}
    >
      <ResponsiveImg
        bannerImage={{
          id: image?.id ?? 0,
          altText: image?.alternativeText ?? null,
          imageD: image ?? null,
          imageM: null,
        }}
        className="!aspect-square"
      />
      {hashTag && (
        <p className="absolute bottom-[5vmin] md:bottom-[2.9vmin] lg:bottom-[40px] left-0 right-0 px-[40px] text-center text-gold font-sans font-semibold truncate [font-size:clamp(0.875rem,6cqw,32px)] leading-[1.25em] tracking-[0.02em]">
          {hashTag}
        </p>
      )}
    </div>
  );
}
