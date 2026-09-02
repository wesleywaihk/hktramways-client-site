import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PartyTramItem } from "@/types/api";
import { IMG_URL } from "@/consts";
import { devClassName } from "@/lib/devClassName";

function mediaSrc(url: string) {
  return url.startsWith("http") ? url : `${IMG_URL}${url}`;
}

export interface PartyTramCardProps {
  item: PartyTramItem;
  active: boolean;
  hidden: boolean;
  cardWidthPct: number;
  cardHeightOffset: string;
  transform: string;
  transitionDuration: string;
  transitionDelay: string;
  onClick: () => void;
  onHoverMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onHoverEnd?: () => void;
  onLinkClick: (e: React.MouseEvent) => void;
}

function PartyTramCard({
  item,
  active,
  hidden,
  cardWidthPct,
  cardHeightOffset,
  transform,
  transitionDuration,
  transitionDelay,
  onClick,
  onHoverMove,
  onHoverEnd,
  onLinkClick,
}: PartyTramCardProps) {
  const img = item.carouselItem?.image;
  const link = item.carouselItem?.hyperlink?.url;

  const ratio = img ? img.width / img.height : undefined;
  const style: React.CSSProperties = {
    width: ratio
      ? `min(${cardWidthPct}%, calc((100cqh - ${cardHeightOffset}) * ${ratio}))`
      : `${cardWidthPct}%`,
    height: "auto",
    aspectRatio: img ? `${img.width} / ${img.height}` : undefined,
    transform,
    transitionDuration,
    transitionTimingFunction: "cubic-bezier(0.22,0.9,0.3,1)",
    transitionDelay,
    opacity: hidden ? 0 : 1,
    pointerEvents: hidden ? "none" : "auto",
  };

  const imageEl = img && (
    <Image
      src={mediaSrc(img.url)}
      alt={img.alternativeText ?? ""}
      fill
      draggable={false}
      className="pointer-events-none object-cover select-none"
      sizes={`${cardWidthPct}vw`}
    />
  );

  return (
    <div
      className={`${devClassName("party-tram-card")}absolute top-auto bottom-[11.5dvh] left-1/2 overflow-hidden transition-transform lg:bottom-[13dvh]`}
      style={style}
      onClick={onClick}
      onDragStart={(e) => e.preventDefault()}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
    >
      {active && link ? (
        <Link
          href={link}
          className="absolute inset-0"
          onClick={onLinkClick}
          onDragStart={(e) => e.preventDefault()}
        >
          {imageEl}
        </Link>
      ) : (
        imageEl
      )}
    </div>
  );
}

export default memo(PartyTramCard);
