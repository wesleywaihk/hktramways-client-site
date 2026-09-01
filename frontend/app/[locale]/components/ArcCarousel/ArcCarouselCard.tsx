import { memo } from "react";
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
  onHoverMove?: (e: React.MouseEvent<HTMLDivElement>, text: string) => void;
  onHoverEnd?: () => void;
}

function ArcCarouselCard({
  item,
  cardWidth,
  cardHeight,
  transform,
  zIndex,
  hidden,
  transition,
  onClick,
  onHoverMove,
  onHoverEnd,
}: ArcCarouselCardProps) {
  const trackHover = !!item.callActionText;

  return (
    <div
      className="group absolute top-1/2 left-1/2 will-change-transform"
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
      <figure className="m-0 h-full w-full overflow-hidden transition-transform duration-150 ease-out group-hover:-translate-y-[5%]">
        <div
          className="bg-earth-light relative flex h-full w-full items-end"
          onMouseMove={
            trackHover
              ? (e) => onHoverMove?.(e, item.callActionText ?? "")
              : undefined
          }
          onMouseLeave={trackHover ? onHoverEnd : undefined}
        >
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
    </div>
  );
}

export default memo(ArcCarouselCard);
