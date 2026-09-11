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
const MOBILE_DROPS = [0, 10];
const MD_DROPS = [0, 12.1];
const MOBILE_VISIBLE_RANGE = 1;
/**
 * Slot spacing for mobile: only offsets -1/0/1 are visible, so the 1st/last
 * visible card (offset = ±1) should end up ~75% off-screen:
 *   1 * gap = viewportWidth/2 + 0.25 * cardWidth = 50vw + cardWidth/4
 */
const mobileGap = (cardWidth: string) => `calc(50vw + (${cardWidth}) / 4)`;

// ---- sm→md (640–767.99px) and md (768–1279.99px) ------------------------
/**
 * Slot spacing for the sm→md range: same card size/tilt as mobile, but
 * tighter — the 1st/last visible card should sit only ~60% off-screen
 * instead of ~75%, and the gap between cards shrinks with it.
 */
const smGap = (cardWidth: string) => `calc(44vw + (${cardWidth}) / 5)`;
const mdGap = (cardWidth: string) => `calc(33vw + (${cardWidth}) / 5)`;

// ---- desktop: lg (1024–1279.99px) and xl (≥1280px) -----------------------
const DESKTOP_CARD_WIDTH = "33.6dvh";
const DESKTOP_VISIBLE_RANGE = 2;
const LG_TILT = 13;
const LG_DROPS = [0, 13.6, 52.3];
const XL_TILT = 10.8;
const XL_DROPS = [0, 13.1, 46.2];
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
/** extra px pushing the near cards (offset ±1) further from center; outer cards (offset ±2) are untouched */
const NEAR_CARD_SHIFT_LG = 20.5;
const NEAR_CARD_SHIFT_XL = 20;
/** extra rotation added to the outermost cards (offset ±2) on lg screens and up, as a % of the base tilt */
const OUTER_CARD_EXTRA_TILT_PCT = 0.3;

// ---- shared ---------------------------------------------------------------
/** matches the card transform transition duration below, used to know when a slide has settled */
const CARD_TRANSITION_MS = 550;

/** shortest looped distance from the active card (…-2,-1,0,1,2…) */
function loopedOffset(index: number, active: number, total: number) {
  let d = index - active;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

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
  const { isMobile, isSmToMd, isMd, isLg, isXl } = useMediaQuery();

  const cardWidth = isMobile ? MOBILE_CARD_WIDTH : DESKTOP_CARD_WIDTH;
  const tilt = isMobile ? MOBILE_TILT : isLg && !isXl ? LG_TILT : XL_TILT;
  const drops = isMobile
    ? MOBILE_DROPS
    : isMd && !isLg
      ? MD_DROPS
      : isLg && !isXl
        ? LG_DROPS
        : XL_DROPS;
  const visibleRange = isMobile ? MOBILE_VISIBLE_RANGE : DESKTOP_VISIBLE_RANGE;
  const isLgOrXl = !isMobile && !isSmToMd && !isMd;
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
    const gap = isSmToMd
      ? smGap(cardWidth)
      : isMobile
        ? mobileGap(cardWidth)
        : isMd
          ? mdGap(cardWidth)
          : isXl
            ? xlGap(cardWidth)
            : lgGap(cardWidth);
    // on lg/xl, nudge only the near cards (offset ±1) further from center;
    // the outer cards (offset ±2) are left untouched
    const nearCardShift =
      isLgOrXl && Math.abs(off) === 1
        ? off * (isXl ? NEAR_CARD_SHIFT_XL : NEAR_CARD_SHIFT_LG)
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
        className="relative min-h-0 grow cursor-grab touch-pan-y active:cursor-grabbing"
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
          // the outermost cards (offset ±2) tilt a bit more on lg screens and up
          const extraTilt =
            isLgOrXl && abs === maxOff
              ? off * tilt * OUTER_CARD_EXTRA_TILT_PCT
              : 0;

          return (
            <ArcCarouselCard
              key={item.id}
              item={item}
              transform={`translateX(${translateX(off)}) translateY(calc(-50% + ${dropY}%)) rotate(${off * tilt + extraTilt}deg) scale(${scale})`}
              zIndex={20 - abs}
              hidden={hidden}
              transition={
                wrapped
                  ? "none"
                  : "transform 550ms cubic-bezier(0.22,0.9,0.3,1), opacity 300ms ease"
              }
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
