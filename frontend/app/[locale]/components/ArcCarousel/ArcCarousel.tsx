"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button/Button";
import IconButton from "@/components/Button/IconButton";
import ArrowIco from "@/components/icons/ArrowIco";
import type { IconEnum, ArcCarouselData, Media } from "@/types/api";
import { asImage } from "@/lib/media";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useArcCarouselSwipe } from "./useArcCarouselSwipe";
import ArcCarouselCard from "./ArcCarouselCard";

/**
 * ArcCarousel — fanned-poster carousel, cards arranged like posters fanned
 * on a table / spokes on a wheel: the active card sits upright and centered,
 * neighbours tilt outward, shrink and sink lower the further they are from
 * center. Infinite loop in both directions — the card that wraps around the
 * back has its transition disabled for that frame so it teleports instead of
 * flying across the screen.
 */

export interface ArcCarouselItem {
  id: string;
  image?: Media;
  caption: string;
  linkUrl?: string;
  callActionText?: string;
}

function mapCarouselData(data: ArcCarouselData | null | undefined) {
  const items = data?.item ?? [];
  if (!items.length) return null;

  return {
    heading: data?.title ?? "HAPPENINGS",
    buttonLabel: data?.actionButton?.label ?? undefined,
    buttonUrl: data?.actionButton?.link?.url ?? undefined,
    buttonUseArrow: data?.actionButton?.useArrow ?? undefined,
    buttonStartIcon: data?.actionButton?.startIcon?.icon ?? undefined,
    items: items.map((item) => ({
      id: String(item.id),
      image: asImage(item.image) ?? undefined,
      caption: item.desc ?? "",
      linkUrl: item.hyperlink?.url ?? undefined,
      callActionText: item.callActionText ?? undefined,
    })),
  };
}

const DESKTOP_CARD_WIDTH = "33.6dvh";
const DESKTOP_CARD_HEIGHT = "42dvh";
const DESKTOP_TILT = 7;
const DESKTOP_DROPS = [0, 37, 125];
const DESKTOP_VISIBLE_RANGE = 2;
/**
 * Slot spacing for desktop: the edge cards (offset = ±2, the 1st/last of 5)
 * end up ~75% off-screen. Derived from wanting `off * gap` to push the
 * card's near edge to `viewportWidth/2 - 0.25 * cardWidth`:
 *   maxOff * gap = viewportWidth/2 + 0.25 * cardWidth
 *   gap = viewportWidth/(2 * maxOff) + cardWidth/(4 * maxOff)
 * For maxOff = 2 this is 25vw + cardWidth/8, so the gap scales with the
 * viewport instead of a fixed px value.
 */
const lgGap = (cardWidth: string) => `calc(25vw + (${cardWidth}) / 8)`;
/** tighter than lgGap: less space between cards at xl (1280px) and above */
const xlGap = (cardWidth: string) => `calc(22vw + (${cardWidth}) / 8)`;

const MOBILE_CARD_WIDTH = "30.34dvmax";
const MOBILE_CARD_HEIGHT = "38dvmax";
const MOBILE_TILT = 8;
const MOBILE_DROPS = [0, 32];
const MOBILE_VISIBLE_RANGE = 1;
/**
 * Slot spacing for mobile: only offsets -1/0/1 are visible, so the 1st/last
 * visible card (offset = ±1) should end up ~75% off-screen:
 *   1 * gap = viewportWidth/2 + 0.25 * cardWidth = 50vw + cardWidth/4
 */
const mobileGap = (cardWidth: string) => `calc(50vw + (${cardWidth}) / 4)`;
/**
 * Slot spacing for the sm→md range (640–767.99px): same card size/tilt as
 * mobile, but tighter — the 1st/last visible card should sit only ~60%
 * off-screen instead of ~75%, and the gap between cards shrinks with it.
 */
const smGap = (cardWidth: string) => `calc(44vw + (${cardWidth}) / 5)`;

/** shortest looped distance from the active card (…-2,-1,0,1,2…) */
function loopedOffset(index: number, active: number, total: number) {
  let d = index - active;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

export interface ArcCarouselProps {
  data?: ArcCarouselData | null;
}

export default function ArcCarousel({ data }: ArcCarouselProps) {
  const mapped = mapCarouselData(data);

  return mapped ? <ArcCarouselView mapped={mapped} /> : null;
}

interface MappedArcCarousel {
  heading: string;
  buttonLabel?: string;
  buttonUrl?: string;
  buttonUseArrow?: boolean;
  buttonStartIcon?: IconEnum;
  items: ArcCarouselItem[];
}

function ArcCarouselView({ mapped }: { mapped: MappedArcCarousel }) {
  const items = mapped.items;
  const heading = mapped.heading;
  const buttonLabel = mapped.buttonLabel ?? "NEWS & EVENTS";
  const buttonUrl = mapped.buttonUrl ?? "#";
  const buttonUseArrow = mapped.buttonUseArrow ?? true;
  const buttonStartIcon = mapped.buttonStartIcon;
  const total = items.length;
  const maxOff = Math.floor(total / 2);
  const {
    active,
    dir,
    trackRef,
    prev,
    next,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
  } = useArcCarouselSwipe(total);
  const { isMobile, isSmToMd, isXl } = useMediaQuery();

  const cardWidth = isMobile ? MOBILE_CARD_WIDTH : DESKTOP_CARD_WIDTH;
  const cardHeight = isMobile ? MOBILE_CARD_HEIGHT : DESKTOP_CARD_HEIGHT;
  const tilt = isMobile ? MOBILE_TILT : DESKTOP_TILT;
  const drops = isMobile ? MOBILE_DROPS : DESKTOP_DROPS;
  const visibleRange = isMobile ? MOBILE_VISIBLE_RANGE : DESKTOP_VISIBLE_RANGE;
  const active_ = items[active] ?? items[0];

  const circleRef = useRef<HTMLDivElement>(null);
  const [circleVisible, setCircleVisible] = useState(false);
  const [hoveredText, setHoveredText] = useState("");
  const rafRef = useRef<number | null>(null);
  const pendingPos = useRef<{ x: number; y: number } | null>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleHoverMove = (
    e: React.MouseEvent<HTMLDivElement>,
    text: string,
  ) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    pendingPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const isEntering = !isHoveringRef.current;
    isHoveringRef.current = true;
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const pos = pendingPos.current;
        const circle = circleRef.current;
        if (!pos || !circle) return;
        if (isEntering) {
          circle.style.transition = "none";
          circle.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(0.1)`;
          void circle.offsetWidth;
          circle.style.transition = "";
          requestAnimationFrame(() => {
            if (circleRef.current) {
              circleRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(1)`;
            }
          });
        } else {
          circle.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(1)`;
        }
      });
    }
    setCircleVisible(true);
    setHoveredText(text);
  };

  const handleHoverEnd = () => {
    isHoveringRef.current = false;
    const pos = pendingPos.current;
    if (pos && circleRef.current) {
      circleRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(0.1)`;
    }
    setCircleVisible(false);
  };

  const translateX = (off: number) => {
    const gap = isSmToMd
      ? smGap(cardWidth)
      : isMobile
        ? mobileGap(cardWidth)
        : isXl
          ? xlGap(cardWidth)
          : lgGap(cardWidth);
    return `calc(-50% + ${off} * ${gap})`;
  };

  return (
    <section className="borderless h-[100dvh] bg-green relative overflow-hidden py-[10dvh] md:py-[6dvh] select-none flex flex-col">
      <div className="shrink-0 flex items-center justify-center gap-6 md:gap-16 pb-8 md:pb-10">
        <IconButton
          ariaLabel="Previous poster"
          onClick={prev}
          reverse
          useArrow
          className="hidden md:grid shrink-0 z-10 w-11 h-11 md:rounded-[16px]"
        />

        <h2 className="title-text text-white text-center">{heading}</h2>

        <IconButton
          ariaLabel="Next poster"
          onClick={next}
          useArrow
          className="hidden md:grid shrink-0 z-10 w-11 h-11 md:rounded-[16px]"
        />
      </div>

      <div
        ref={trackRef}
        className="relative grow min-h-0 touch-pan-y cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
      >
        <IconButton
          ariaLabel="Previous poster"
          onClick={prev}
          reverse
          useArrow
          className="md:hidden grid absolute left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9"
        />
        <IconButton
          ariaLabel="Next poster"
          onClick={next}
          useArrow
          className="md:hidden grid absolute right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9"
        />

        {items.map((item, i) => {
          const off = loopedOffset(i, active, total);
          const abs = Math.abs(off);
          const hidden = abs > visibleRange;

          // the card that wrapped around the back this move re-enters at the
          // far edge with no transition, so it teleports instead of flying by
          const wrapped =
            (dir === 1 && off === maxOff) || (dir === -1 && off === -maxOff);

          const dropY = drops[Math.min(abs, drops.length - 1)];
          const scale = Math.max(1 - abs * 0.08, 0.78);

          return (
            <ArcCarouselCard
              key={item.id}
              item={item}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              transform={`translateX(${translateX(off)}) translateY(calc(-50% + ${dropY}px)) rotate(${off * tilt}deg) scale(${scale})`}
              zIndex={20 - abs}
              hidden={hidden}
              transition={
                wrapped
                  ? "none"
                  : "transform 550ms cubic-bezier(0.22,0.9,0.3,1), opacity 300ms ease"
              }
              onClick={() => off !== 0 && (off > 0 ? next() : prev())}
              onHoverMove={handleHoverMove}
              onHoverEnd={handleHoverEnd}
            />
          );
        })}

        <div
          ref={circleRef}
          aria-hidden="true"
          className={`absolute left-0 top-0 flex flex-col items-center justify-center gap-1 w-[150px] h-[150px] rounded-full bg-white pointer-events-none z-20 will-change-transform transition-[opacity,transform] duration-150 ease-out ${
            circleVisible ? "opacity-100" : "opacity-0"
          }`}
          //backdrop-blur-xs
        >
          <span className="w-full max-w-[80%] mx-auto font-sans text-green text-[20px] font-semibold leading-[24px] tracking-[0.02em] text-center uppercase text-wrap break-words">
            {hoveredText}
          </span>
          <ArrowIco
            width={20}
            height={20}
            aria-hidden="true"
            className="shrink-0 mx-auto block text-green"
          />
        </div>
      </div>

      <div className="relative z-30 shrink-0 mt-6 md:mt-8 px-8 text-center">
        <p className="text-white font-semibold text-[16px] leading-[163%] tracking-[0.02em] whitespace-pre-line max-w-[520px] mx-auto">
          {active_.caption}
        </p>
      </div>

      <div className="shrink-0 mt-6 md:mt-8 flex justify-center">
        <Button
          href={buttonUrl}
          color="white"
          useArrow={buttonUseArrow}
          startIcon={buttonStartIcon}
        >
          {buttonLabel}
        </Button>
      </div>
    </section>
  );
}
