import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";
import type { ArcCarouselItem } from "./ArcCarousel";

export interface ArcCarouselCardProps {
  item: ArcCarouselItem;
  cardWidth: string;
  cardHeight: string;
  transform: string;
  zIndex: number;
  hidden: boolean;
  transition: string;
  onClick: () => void;
}

export default function ArcCarouselCard({
  item,
  cardWidth,
  cardHeight,
  transform,
  zIndex,
  hidden,
  transition,
  onClick,
}: ArcCarouselCardProps) {
  return (
    <figure
      className="absolute left-1/2 top-1/2 m-0 overflow-hidden shadow-lg will-change-transform"
      style={{
        width: cardWidth,
        height: cardHeight,
        transform,
        zIndex,
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
        transition,
      }}
      onClick={onClick}
    >
      <div className="w-full h-full relative flex items-end bg-earth-light">
        {item.linkUrl ? (
          <a
            href={item.linkUrl}
            className="absolute inset-0"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <ResponsiveImg
              bannerImage={{
                id: item.image?.id ?? 0,
                altText: item.image?.alternativeText ?? null,
                imageD: item.image ?? null,
                imageM: null,
              }}
              className="pointer-events-none select-none"
            />
          </a>
        ) : (
          <div
            className="absolute inset-0"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          >
            <ResponsiveImg
              bannerImage={{
                id: item.image?.id ?? 0,
                altText: item.image?.alternativeText ?? null,
                imageD: item.image ?? null,
                imageM: null,
              }}
              className="pointer-events-none select-none"
            />
          </div>
        )}
      </div>
    </figure>
  );
}
