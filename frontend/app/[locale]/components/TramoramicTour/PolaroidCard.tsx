import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";
import { devClassName } from "@/lib/devClassName";
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
      className={`${devClassName("polaroid-card")}[container-type:inline-size] absolute top-1/2 right-0 w-full bg-white px-[5vmin] pt-[5vmin] pb-[14vmin] lg:px-[2.8vmin] lg:px-[40px] lg:pt-[2.8vmin] lg:pt-[40px] lg:pb-[8.3vmin] lg:pb-[100px] ${className}`}
      style={{ boxShadow: "-5px 0px 20px 0px #00000026" }}
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
        <p className="text-gold absolute right-0 bottom-[5vmin] left-0 truncate px-[40px] text-center font-sans [font-size:clamp(18px,7.3cqw,32px)] leading-[1.25em] font-semibold tracking-[0.02em] md:bottom-[2.9vmin] lg:bottom-[40px]">
          {hashTag}
        </p>
      )}
    </div>
  );
}
