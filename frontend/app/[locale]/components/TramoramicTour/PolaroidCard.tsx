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
      className={`[container-type:inline-size] absolute top-1/2 right-0 w-[78vmin] bg-white px-[5vmin] pt-[5vmin] pb-[14vmin] md:w-[86%] md:px-[2.8vmin] md:pt-[2.8vmin] md:pb-[8.3vmin] lg:px-[40px] lg:pt-[40px] lg:pb-[100px] ${className}`}
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
        <p className="text-gold absolute right-0 bottom-[5vmin] left-0 truncate px-[40px] text-center font-sans [font-size:clamp(0.875rem,6cqw,32px)] leading-[1.25em] font-semibold tracking-[0.02em] md:bottom-[2.9vmin] lg:bottom-[40px]">
          {hashTag}
        </p>
      )}
    </div>
  );
}
