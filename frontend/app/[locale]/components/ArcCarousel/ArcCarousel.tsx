"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import IconButton from "@/components/Button/IconButton";
import FloatingCircle from "@/components/FloatingCircle/FloatingCircle";
import { useFloatingCircle } from "@/components/FloatingCircle/useFloatingCircle";
import Loading from "@/components/Loading/Loading";
import { fetchArcCarousel } from "@/hooks/useApiEndpoint/api";
import type {
  IconEnum,
  ArcCarouselData,
  HomeArcCarouselResponse,
  Media,
} from "@/types/api";
import { devClassName } from "@/lib/devClassName";
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
      image: asImage(item.carouselItem?.image ?? null) ?? undefined,
      caption: item.carouselItem?.desc ?? "",
      linkUrl: item.carouselItem?.hyperlink?.url ?? undefined,
      callActionText: item.callActionText ?? undefined,
    })),
  };
}

// ---- mobile (<640px) ----------------------------------------------------
const MOBILE_CARD_WIDTH = "36dvmax"; //"30.34dvmax";
const MOBILE_TILT = 8;
/**
 * Slot spacing for mobile: only offsets -1/0/1 are visible. `1 * gap` pushes
 * the 1st/last visible card (offset = ±1) mostly off-screen; 40vw (rather
 * than the 50vw that would put it exactly 75% off-screen) is tuned down for
 * a tighter fan.
 */
const MOBILE_GAP = (cardWidth: string) => `calc(40vw + (${cardWidth}) / 4)`;
const MOBILE_DROPS = [0, 10.5, 34];
const MOBILE_VISIBLE_RANGE = 1;

// ---- sm→md (640–767.99px) and md (768–1023.99px) -------------------------
/**
 * Slot spacing for the sm→md range: same card size/tilt as mobile, but
 * tighter — the 1st/last visible card should sit only ~60% off-screen
 * instead of ~75%, and the gap between cards shrinks with it.
 */
const SM_GAP = (cardWidth: string) => `calc(35vw + (${cardWidth}) / 4)`;
const MD_DROPS = [0, 9.5, 32];
const MD_GAP = (cardWidth: string) => `calc(34vw + (${cardWidth}) / 5)`;

// ---- desktop: lg (1024–1279.99px), xl (1280–1535.99px), xxl (≥1536px) ----
const DESKTOP_CARD_WIDTH = "33.6dvh";
const LG_VISIBLE_RANGE = 2;
const LG_TILT = 10;
const LG_DROPS = [0, 12.5, 42.5, 100];
/**
 * Slot spacing for desktop: the edge cards (offset = ±2, the 1st/last of 5)
 * end up ~75% off-screen. Derived from wanting `off * gap` to push the
 * card's near edge to `viewportWidth/2 - 0.25 * cardWidth`:
 *   maxOff * gap = viewportWidth/2 + 0.25 * cardWidth
 *   gap = viewportWidth/(2 * maxOff) + cardWidth/(4 * maxOff)
 * For maxOff = 2 this is 25vw + cardWidth/8, so the gap scales with the
 * viewport instead of a fixed px value.
 */
const LG_GAP = (cardWidth: string) => `calc(25vw + (${cardWidth}) / 8)`;
/** extra px pushing the near cards (offset ±1) further from center; outer cards (offset ±2) are untouched */
const LG_NEAR_CARD_SHIFT = 20.5;

const XL_VISIBLE_RANGE = 2;
const XL_TILT = 8;
const XL_DROPS = [0, 12, 44, 98];
const XL_GAP = (cardWidth: string) => `calc(22vw + (${cardWidth}) / 8)`;
const XL_NEAR_CARD_SHIFT = 20.5;

const XXL_VISIBLE_RANGE = 3;
const XXL_TILT = 7.5;
const XXL_DROPS = [0, 9.7, 34.2, 75.5, 130];
/**
 * xxl shows 7 cards (offset ±3, see XXL_VISIBLE_RANGE) instead of lg/xl's 5,
 * so the edge-offset in the formula above is 3, not 2: viewportWidth/(2*3) +
 * cardWidth/(4*3) = 16.67vw + cardWidth/12 as a baseline, hand-tuned from
 * there to 19vw + cardWidth/14 for the desired snugness at this breakpoint.
 */
const XXL_GAP = (cardWidth: string) => `calc(16vw + (${cardWidth}) / 16)`;
/** extra px pushing the near cards (offset ±1) further from center on xxl */
const XXL_NEAR_CARD_SHIFT = 28;
/** extra px pushing the offset ±2 cards further from center on xxl (7-card layout only); the outermost cards (offset ±3) are untouched */
const XXL_MID_CARD_SHIFT = 18.5;

/** extra rotation added to the outermost visible cards on lg screens and up, as a % of the base tilt */
const OUTER_CARD_EXTRA_TILT_PCT = 0.3;

// ---- shared ---------------------------------------------------------------
/** matches the card transform transition duration below, used to know when a slide has settled */
const CARD_TRANSITION_MS = 550;

export interface ArcCarouselProps {
  locale: string;
  documentId?: string | null;
}

export default function ArcCarousel({ locale, documentId }: ArcCarouselProps) {
  const [data, setData] = useState<ArcCarouselData | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when `locale` changes before the refetch resolves
    setData(undefined);

    fetchArcCarousel(locale, documentId)
      .then((res: HomeArcCarouselResponse) => {
        if (!cancelled) setData(res.data?.[0]?.arcCarousel ?? null);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale, documentId]);

  if (data === undefined) {
    return (
      <section className={`${devClassName("arc-carousel")}borderless bg-green`}>
        <Loading />
      </section>
    );
  }

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
  const {
    active,
    contActive,
    trackRef,
    prev,
    next,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
  } = useArcCarouselSwipe(total);
  const { isMobile, isSm, isMd, isLg, isXl, isXxl } = useMediaQuery();

  const cardWidth = isMobile ? MOBILE_CARD_WIDTH : DESKTOP_CARD_WIDTH;
  const tilt = isXxl ? XXL_TILT : isXl ? XL_TILT : isLg ? LG_TILT : MOBILE_TILT;
  const drops = isXxl
    ? XXL_DROPS
    : isXl
      ? XL_DROPS
      : isLg
        ? LG_DROPS
        : isMd
          ? MD_DROPS
          : MOBILE_DROPS;
  const visibleRange = isXxl
    ? XXL_VISIBLE_RANGE
    : isXl
      ? XL_VISIBLE_RANGE
      : isLg
        ? LG_VISIBLE_RANGE
        : MOBILE_VISIBLE_RANGE;
  const isLgOrXl = !isMobile && !isSm && !isMd;
  const active_ = items[active] ?? items[0];

  const {
    circleRef,
    visible: circleVisible,
    content: hoveredContent,
    onHoverMove: handleHoverMove,
    onHoverEnd: handleHoverEnd,
    hideForTransition,
  } = useFloatingCircle(trackRef);

  useEffect(() => {
    hideForTransition(CARD_TRANSITION_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const translateX = (off: number) => {
    const gap = isXxl
      ? XXL_GAP(cardWidth)
      : isXl
        ? XL_GAP(cardWidth)
        : isLg
          ? LG_GAP(cardWidth)
          : isMd
            ? MD_GAP(cardWidth)
            : isSm
              ? SM_GAP(cardWidth)
              : MOBILE_GAP(cardWidth);
    // on lg/xl, nudge the near cards (offset ±1) further from center; on xl,
    // also nudge the offset ±2 cards (the outermost cards are left untouched)
    const abs = Math.abs(off);
    const nearCardShift =
      isLgOrXl && abs === 1
        ? off *
          (isXxl
            ? XXL_NEAR_CARD_SHIFT
            : isXl
              ? XL_NEAR_CARD_SHIFT
              : LG_NEAR_CARD_SHIFT)
        : isXxl && abs === 2
          ? off * XXL_MID_CARD_SHIFT
          : 0;
    return `calc(-50% + ${off} * ${gap} + ${nearCardShift}px)`;
  };

  return (
    <section
      // className={`${devClassName("arc-carousel")}borderless bg-green relative flex h-[100dvh] flex-col overflow-hidden pt-[13.5dvh] pb-[9dvh] select-none lg:pt-[16.2dvh] lg:pb-[11.43dvh] [@media(min-height:920px)]:pt-[15dvh] [@media(min-height:920px)]:pb-[10dvh] lg:[@media(min-height:920px)]:pt-[18dvh] lg:[@media(min-height:920px)]:pb-[12.7dvh]`}
      className={`${devClassName("arc-carousel")}borderless bg-green relative flex h-[100dvh] min-h-[776px] flex-col overflow-hidden pt-[15dvh] pb-[10dvh] select-none lg:min-h-[983px] lg:pt-[18dvh] lg:pb-[12.7dvh]`}
    >
      <div className="content-max-w pageBorder flex shrink-0 items-center justify-between gap-6 self-center lg:mb-10 lg:w-full lg:gap-16">
        <IconButton
          ariaLabel="Previous poster"
          onClick={prev}
          reverse
          useArrow
          shape="square"
          className="z-10 hidden shrink-0 lg:grid"
        />

        <h2 className="title-text text-center text-white">{heading}</h2>

        <IconButton
          ariaLabel="Next poster"
          onClick={next}
          useArrow
          shape="square"
          className="z-10 hidden shrink-0 lg:grid"
        />
      </div>

      <div
        ref={trackRef}
        className="sm:min-h-none relative min-h-0 min-h-[360px] grow cursor-grab touch-pan-y active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
      >
        <IconButton
          ariaLabel="Previous poster"
          onClick={prev}
          reverse
          useArrow
          shape="square"
          className="absolute top-1/2 left-4 z-30 grid h-9 w-9 -translate-y-1/2 lg:hidden"
        />
        <IconButton
          ariaLabel="Next poster"
          onClick={next}
          useArrow
          shape="square"
          className="absolute top-1/2 right-4 z-30 grid h-9 w-9 -translate-y-1/2 lg:hidden"
        />

        {/*
          `contActive` is an unbounded counterpart to `active` (see
          useArcCarouselSwipe) that never wraps, so every slot below —
          keyed by its virtual index `vIdx`, not by offset or item id —
          always slides by exactly one step per nav instead of jumping or
          swapping content abruptly. When there are fewer items than visible
          slots (eg. 5 items but XL_VISIBLE_RANGE needs 7), items simply
          repeat across virtual indices. One extra ring on each side
          (bufferRange) keeps rendering slightly past `visibleRange` so the
          outermost cards fade out while still sliding, instead of vanishing
          the instant they cross the boundary.
        */}
        {Array.from({ length: (visibleRange + 1) * 2 + 1 }, (_, idx) => {
          const off = idx - (visibleRange + 1);
          const vIdx = contActive + off;
          const itemIndex = ((vIdx % total) + total) % total;
          return { key: `slot-${vIdx}`, item: items[itemIndex], off };
        }).map(({ key, item, off }) => {
          const abs = Math.abs(off);
          const hidden = abs > visibleRange;

          const dropY = drops[Math.min(abs, drops.length - 1)];
          const scale = Math.max(1 - abs * 0.08, 0.78);
          // the outermost visible cards tilt a bit more on lg screens and up;
          // the offscreen buffer cards just past them tilt twice as much. On
          // xxl (7-card layout) there's also a mid tier (offset ±2): mid
          // tilts at the base extra amount, the edge card (±3) tilts double
          // that, and the offscreen buffer (±4) tilts triple that.
          const extraTilt = !isLgOrXl
            ? 0
            : isXxl
              ? abs === visibleRange - 1
                ? off * tilt * OUTER_CARD_EXTRA_TILT_PCT
                : abs === visibleRange
                  ? off * tilt * OUTER_CARD_EXTRA_TILT_PCT * 2
                  : abs === visibleRange + 1
                    ? off * tilt * OUTER_CARD_EXTRA_TILT_PCT * 3
                    : 0
              : abs === visibleRange
                ? off * tilt * OUTER_CARD_EXTRA_TILT_PCT
                : abs === visibleRange + 1
                  ? off * tilt * OUTER_CARD_EXTRA_TILT_PCT * 2
                  : 0;

          return (
            <ArcCarouselCard
              key={key}
              item={item}
              transform={`translateX(${translateX(off)}) translateY(calc(-50% + ${dropY}%)) rotate(${off * tilt + extraTilt}deg) scale(${scale})`}
              zIndex={20 - abs}
              hidden={hidden}
              transition="transform 550ms cubic-bezier(0.22,0.9,0.3,1), opacity 300ms ease"
              onClick={() => off !== 0 && (off > 0 ? next() : prev())}
              onHoverMove={(e, text) =>
                handleHoverMove(
                  e,
                  <span className="mx-auto w-full max-w-[80%] text-center font-sans text-[20px] leading-[24px] font-semibold tracking-[0.02em] text-wrap break-words text-current uppercase">
                    {text}
                  </span>,
                )
              }
              onHoverEnd={handleHoverEnd}
            />
          );
        })}

        <FloatingCircle
          ref={circleRef}
          visible={circleVisible}
          content={hoveredContent}
          className="pt-4"
        />
      </div>

      <div className="relative z-30 shrink-0 px-8 text-center lg:mt-8">
        <p className="mx-auto w-[76vw] max-w-[400px] text-[15px] leading-[163%] font-semibold tracking-[0.02em] whitespace-pre-line text-white lg:w-full lg:max-w-[340px] lg:text-[16px]">
          {active_.caption}
        </p>
      </div>

      {active_.linkUrl && active_.callActionText && (
        <div className="relative z-30 mt-[10px] mb-4 shrink-0 text-center lg:hidden">
          <a
            href={active_.linkUrl}
            className="border-b-2 border-white/20 pb-[3px] font-sans text-[15px] leading-[163%] font-normal tracking-[0.02em] text-white transition-colors duration-100 hover:border-white/60"
          >
            {active_.callActionText}
          </a>
        </div>
      )}

      <div className="mt-6 flex shrink-0 justify-center lg:mt-8">
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
