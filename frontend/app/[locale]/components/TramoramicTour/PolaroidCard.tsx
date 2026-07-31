import type { ReactNode } from "react";
import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";
import type { Image } from "@/types/api";

export interface PolaroidCardProps {
  image: Image | null;
  className?: string;
  children?: ReactNode;
}

export default function PolaroidCard({
  image,
  className = "",
  children,
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
      {children}
    </div>
  );
}
