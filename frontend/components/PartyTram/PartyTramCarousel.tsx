"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button/Button";
import IconButton from "@/components/Button/IconButton";
import FloatingCircle from "@/components/FloatingCircle/FloatingCircle";
import { useFloatingCircle } from "@/components/FloatingCircle/useFloatingCircle";
import { useArcCarouselSwipe } from "@/app/[locale]/components/ArcCarousel/useArcCarouselSwipe";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { IMG_URL } from "@/consts";
import type { PartyTramData } from "@/types/api";

/** mobile peek-carousel: how much of the previous/next slide peeks in from each edge */
const MOBILE_SIDE_PEEK_PCT = -5;
const MOBILE_CARD_WIDTH_PCT = 100 + MOBILE_SIDE_PEEK_PCT * 2;

/** desktop peek-carousel: how much of the previous/next slide peeks in from each edge */
const LG_SIDE_PEEK_PCT = 10;
const LG_CARD_WIDTH_PCT = 50 + LG_SIDE_PEEK_PCT * 2;

/** peek-carousel: horizontal gap between cards */
const MOBILE_CARD_GAP_VW = -7;
const LG_CARD_GAP_VW = 0;

/** peek-carousel: transform transition speed/easing, and per-card stagger delay */
const CARD_TRANSITION_DURATION_MS = 1300;
const CARD_TRANSITION_EASING = "cubic-bezier(0.22,0.9,0.3,1)";
const CARD_DELAY_BASE_MS = 300;
const CARD_DELAY_STEP_MS = 110;
/** longest possible stagger rank (farthest entering card) + its transition, i.e. worst-case time for a slide to fully settle */
const CARD_MAX_RANK = 3;
const SLIDE_TOTAL_MS =
  CARD_MAX_RANK * CARD_DELAY_STEP_MS +
  CARD_DELAY_BASE_MS +
  CARD_TRANSITION_DURATION_MS;

function mediaSrc(url: string) {
  return url.startsWith("http") ? url : `${IMG_URL}${url}`;
}

/** shortest looped distance from the active card (…-2,-1,0,1,2…) */
function loopedOffset(index: number, active: number, total: number) {
  let d = index - active;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

/** stagger order along the swipe direction: exiting card first, then center, then nearest entering card, then farthest entering card last */
function cardDelayRank(off: number, dir: number) {
  return (dir || 1) * off + 1;
}

function formatCallActionNumber(n: number) {
  return `#${String(n).padStart(2, "0")}`;
}

function buildHoverContent(number: string | null, text: string | null | undefined) {
  return (
    <>
      {number && (
        <span className="font-normal text-[15px] leading-[22px] tracking-[0.02em] text-center uppercase">
          {number}
        </span>
      )}
      {text && (
        <span className="w-full max-w-[80%] mx-auto font-semibold text-[20px] leading-[24px] tracking-[0.02em] text-center uppercase text-wrap break-words">
          {text}
        </span>
      )}
    </>
  );
}

export interface PartyTramCarouselProps {
  data: PartyTramData;
}

export default function PartyTramCarousel({ data }: PartyTramCarouselProps) {
  const items = data.item;
  const total = items.length;
  const {
    active,
    dir,
    trackRef,
    prev,
    next,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
    wasDragged,
  } = useArcCarouselSwipe(total, SLIDE_TOTAL_MS);
  const { isLg } = useMediaQuery();
  const {
    circleRef,
    visible: circleVisible,
    content: hoveredContent,
    onHoverMove,
    onHoverEnd,
    hideForTransition,
  } = useFloatingCircle(trackRef);
  const [renderedActive, setRenderedActive] = useState(active);
  const [prevActive, setPrevActive] = useState(active);
  if (active !== renderedActive) {
    setPrevActive(renderedActive);
    setRenderedActive(active);
  }

  useEffect(() => {
    hideForTransition(SLIDE_TOTAL_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (!total) return null;

  const item = items[active];
  const carouselItem = item.carouselItem;
  const callAction =
    item.callActionNumber != null || item.callActionText
      ? `${item.callActionNumber != null ? `${formatCallActionNumber(item.callActionNumber)} ` : ""}${item.callActionText ?? ""}`.trim()
      : null;

  const CARD_WIDTH_PCT = isLg ? LG_CARD_WIDTH_PCT : MOBILE_CARD_WIDTH_PCT;
  const CARD_GAP_VW = isLg ? LG_CARD_GAP_VW : MOBILE_CARD_GAP_VW;

  return (
    <div className="relative z-10 flex flex-col items-center lg:items-start h-full pt-[calc(76px+8dvh)] lg:pt-[calc(76px+8dvh)] ">
      <div className="flex items-center justify-center gap-6 lg:gap-16 w-full max-screen-lg mx-auto lg:px-16">
        <IconButton
          ariaLabel="Previous tram"
          onClick={prev}
          reverse
          useArrow
          className="hidden lg:grid shrink-0 z-10 w-11! h-11! rounded-[16px]! bg-transparent! border-green! hover:bg-green! hover:border-transparent!"
        />

        <h2 className="title-text text-green text-center">{data.title}</h2>

        <IconButton
          ariaLabel="Next tram"
          onClick={next}
          useArrow
          className="hidden lg:grid shrink-0 z-10 w-11! h-11! rounded-[16px]! bg-transparent! border-green! hover:bg-green! hover:border-transparent!"
        />
      </div>

      <p className="text-black font-normal text-[15px] lg:text-[16px] leading-[163%] tracking-[0.02em] text-center mt-4 lg:px-16 block mx-auto w-full max-w-[710px] block">
        {carouselItem?.desc}
      </p>

      <div
        ref={trackRef}
        className="relative w-full flex-1 min-h-0 mt-6 lg:mt-8 touch-pan-y cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => {
          onHoverEnd();
          onPointerDown(e);
        }}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
      >
        <div className="relative w-full h-full overflow-hidden">
          {items.map((it, i) => {
            const off = loopedOffset(i, active, total);
            const hidden = Math.abs(off) > 2;
            const img = it.carouselItem?.image;
            const link = it.carouselItem?.hyperlink?.url;
            const number =
              it.callActionNumber != null
                ? formatCallActionNumber(it.callActionNumber)
                : null;
            const text = it.callActionText;
            const trackHover = off === 0 && (number != null || !!text);
            const hoverContent = buildHoverContent(number, text);

            const wrapMax = Math.floor(total / 2);
            const prevOff = loopedOffset(i, prevActive, total);
            const jumped =
              prevActive !== active &&
              Math.abs(prevOff) === wrapMax &&
              Math.abs(off) === wrapMax &&
              Math.sign(prevOff) !== Math.sign(off);

            const cardStyle: React.CSSProperties = {
              width: `${CARD_WIDTH_PCT}%`,
              aspectRatio: img ? `${img.width} / ${img.height}` : undefined,
              transform: `translateX(calc(-50% + ${off * 100}% + ${off * CARD_GAP_VW}vw))`,
              transitionDuration: jumped
                ? "0ms"
                : `${CARD_TRANSITION_DURATION_MS}ms`,
              transitionTimingFunction: CARD_TRANSITION_EASING,
              transitionDelay: jumped
                ? "0ms"
                : `${cardDelayRank(off, dir) * CARD_DELAY_STEP_MS + CARD_DELAY_BASE_MS}ms`,
              opacity: hidden ? 0 : 1,
              pointerEvents: hidden ? "none" : "auto",
            };
            const cardClassName =
              "absolute top-auto bottom-[11.5dvh] lg:bottom-[13dvh] left-1/2 overflow-hidden transition-transform";
            const imageEl = img && (
              <Image
                src={mediaSrc(img.url)}
                alt={img.alternativeText ?? ""}
                fill
                draggable={false}
                className="object-cover pointer-events-none select-none"
                sizes={`${CARD_WIDTH_PCT}vw`}
              />
            );
            const cardContent =
              off === 0 && link ? (
                <Link
                  href={link}
                  className="absolute inset-0"
                  onClick={(e) => wasDragged() && e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                >
                  {imageEl}
                </Link>
              ) : (
                imageEl
              );

            return (
              <div
                key={it.id}
                className={cardClassName}
                style={cardStyle}
                onClick={() => {
                  if (wasDragged() || off === 0) return;
                  if (off > 0) next();
                  else prev();
                }}
                onDragStart={(e) => e.preventDefault()}
                onMouseMove={
                  trackHover ? (e) => onHoverMove(e, hoverContent) : undefined
                }
                onMouseLeave={trackHover ? onHoverEnd : undefined}
              >
                {cardContent}
              </div>
            );
          })}

          <IconButton
            ariaLabel="Previous tram"
            onClick={prev}
            reverse
            useArrow
            className="grid absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10! h-10! rounded-[14px]! lg:hidden"
          />
          <IconButton
            ariaLabel="Next tram"
            onClick={next}
            useArrow
            className="grid absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10! h-10! rounded-[14px]! lg:hidden"
          />
        </div>

        <FloatingCircle
          ref={circleRef}
          visible={circleVisible}
          content={hoveredContent}
          visibleFrom="lg"
          className="bg-[#703900]! text-white! w-[190px]! h-[190px]!"
        />
      </div>

      {callAction && (
        <div className="lg:hidden mt-6 mb-8">
          <Button
            href={carouselItem?.hyperlink?.url ?? undefined}
            color="green"
            variant="solid"
            useArrow
          >
            {callAction}
          </Button>
        </div>
      )}
    </div>
  );
}
