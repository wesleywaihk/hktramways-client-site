"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
import IconButton from "@/components/Button/IconButton";
import { useArcCarouselSwipe } from "@/app/[locale]/components/ArcCarousel/useArcCarouselSwipe";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { IMG_URL } from "@/consts";
import type { PartyTramData } from "@/types/api";

/** mobile peek-carousel: how much of the previous/next slide peeks in from each edge */
const MOBILE_SIDE_PEEK_PCT = 5;
const MOBILE_CARD_WIDTH_PCT = 100 - MOBILE_SIDE_PEEK_PCT * 2;

/** mobile peek-carousel: transform transition speed/easing, and per-card stagger delay */
const MOBILE_CARD_TRANSITION_DURATION_MS = 1300;
const MOBILE_CARD_TRANSITION_EASING = "cubic-bezier(0.22,0.9,0.3,1)";
const MOBILE_CARD_DELAY_BASE_MS = 400;
const MOBILE_CARD_DELAY_STEP_MS = 100;
/** longest possible stagger rank (farthest entering card) + its transition, i.e. worst-case time for a slide to fully settle */
const MOBILE_CARD_MAX_RANK = 3;
const MOBILE_SLIDE_TOTAL_MS =
  MOBILE_CARD_MAX_RANK * MOBILE_CARD_DELAY_STEP_MS +
  MOBILE_CARD_DELAY_BASE_MS +
  MOBILE_CARD_TRANSITION_DURATION_MS;

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
  } = useArcCarouselSwipe(total, MOBILE_SLIDE_TOTAL_MS);
  const { isLg } = useMediaQuery();
  const [renderedActive, setRenderedActive] = useState(active);
  const [prevActive, setPrevActive] = useState(active);
  if (active !== renderedActive) {
    setPrevActive(renderedActive);
    setRenderedActive(active);
  }

  if (!total) return null;

  const item = items[active];
  const carouselItem = item.carouselItem;
  const callAction =
    item.callActionNumber != null || item.callActionText
      ? `${item.callActionNumber != null ? `#${item.callActionNumber} ` : ""}${item.callActionText ?? ""}`.trim()
      : null;

  return (
    <div className="relative z-10 flex flex-col items-center lg:items-start h-full lg:px-16 pt-[calc(76px+8dvh)] lg:pt-[10dvh]">
      <h2 className="title-text text-green text-center lg:text-left">
        {data.title}
      </h2>

      <p className="text-green font-semibold text-[16px] leading-[163%] tracking-[0.02em] text-center lg:text-left max-w-[520px] mt-4">
        {carouselItem?.desc}
      </p>

      <div
        ref={trackRef}
        className="relative w-full flex-1 min-h-0 mt-6 lg:mt-8 touch-pan-y cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
      >
        {isLg ? (
          <div className="relative w-full h-full flex items-center justify-center gap-10">
            <IconButton
              ariaLabel="Previous tram"
              onClick={prev}
              reverse
              useArrow
              className="shrink-0 z-10 w-11 h-11 rounded-[16px]"
            />

            <div
              className="relative w-full max-w-[900px]"
              style={
                carouselItem?.image
                  ? {
                      aspectRatio: `${carouselItem.image.width} / ${carouselItem.image.height}`,
                    }
                  : undefined
              }
            >
              {carouselItem?.image && (
                <Image
                  src={mediaSrc(carouselItem.image.url)}
                  alt={carouselItem.image.alternativeText ?? ""}
                  fill
                  draggable={false}
                  className="object-cover rounded-[18px] pointer-events-none select-none"
                  sizes="70vw"
                />
              )}
            </div>

            <IconButton
              ariaLabel="Next tram"
              onClick={next}
              useArrow
              className="shrink-0 z-10 w-11 h-11 rounded-[16px]"
            />
          </div>
        ) : (
          <div className="relative w-full h-full overflow-hidden">
            {items.map((it, i) => {
              const off = loopedOffset(i, active, total);
              const hidden = Math.abs(off) > 2;
              const img = it.carouselItem?.image;

              const wrapMax = Math.floor(total / 2);
              const prevOff = loopedOffset(i, prevActive, total);
              const jumped =
                prevActive !== active &&
                Math.abs(prevOff) === wrapMax &&
                Math.abs(off) === wrapMax &&
                Math.sign(prevOff) !== Math.sign(off);

              return (
                <div
                  key={it.id}
                  className="absolute top-auto bottom-[11.5dvh] left-1/2 rounded-[18px] overflow-hidden transition-transform"
                  style={{
                    width: `${MOBILE_CARD_WIDTH_PCT}%`,
                    aspectRatio: img
                      ? `${img.width} / ${img.height}`
                      : undefined,
                    transform: `translateX(calc(-50% + ${off * 100}% - ${off * 7}vw))`,
                    transitionDuration: jumped
                      ? "0ms"
                      : `${MOBILE_CARD_TRANSITION_DURATION_MS}ms`,
                    transitionTimingFunction: MOBILE_CARD_TRANSITION_EASING,
                    transitionDelay: jumped
                      ? "0ms"
                      : `${cardDelayRank(off, dir) * MOBILE_CARD_DELAY_STEP_MS + MOBILE_CARD_DELAY_BASE_MS}ms`,
                    opacity: hidden ? 0 : 1,
                    pointerEvents: hidden ? "none" : "auto",
                  }}
                  onClick={() => off !== 0 && (off > 0 ? next() : prev())}
                  onDragStart={(e) => e.preventDefault()}
                >
                  {img && (
                    <Image
                      src={mediaSrc(img.url)}
                      alt={img.alternativeText ?? ""}
                      fill
                      draggable={false}
                      className="object-cover pointer-events-none select-none"
                      sizes={`${MOBILE_CARD_WIDTH_PCT}vw`}
                    />
                  )}
                </div>
              );
            })}

            <IconButton
              ariaLabel="Previous tram"
              onClick={prev}
              reverse
              useArrow
              className="grid absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10! h-10! rounded-[14px]!"
            />
            <IconButton
              ariaLabel="Next tram"
              onClick={next}
              useArrow
              className="grid absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10! h-10! rounded-[14px]!"
            />
          </div>
        )}
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
