import type { ReactNode } from "react";
import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";
import type { ResponsiveImage } from "@/types/api";

export interface PolaroidCardProps {
  image: ResponsiveImage | null;
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
      className={`absolute right-0 top-1/2 w-[71vmin] md:w-[85%] pt-[5.7vmin] px-[5.7vmin] pb-[14.6vmin] md:pt-[32px] md:px-[32px] md:pb-[94px] lg:pt-[40px] lg:px-[40px] lg:pb-[100px] bg-white [container-type:inline-size] ${className}`}
    >
      <ResponsiveImg
        bannerImage={{
          id: image?.id ?? 0,
          altText: image?.alternativeText ?? null,
          bannerD: image ?? null,
          bannerM: null,
        }}
        className="w-full aspect-square"
      />
      {children}
    </div>
  );
}
