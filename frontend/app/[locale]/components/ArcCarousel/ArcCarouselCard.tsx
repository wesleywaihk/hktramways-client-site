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

export default function ArcCarouselCard({
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
      className="group absolute left-1/2 top-1/2 will-change-transform"
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
      <figure className="m-0 w-full h-full overflow-hidden shadow-lg transition-transform duration-150 ease-out group-hover:-translate-y-[5%]">
        <div
          className="w-full h-full relative flex items-end bg-earth-light"
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
