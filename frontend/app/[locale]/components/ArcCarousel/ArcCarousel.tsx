"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
  imageUrl?: string;
  bgClassName: string;
  caption: string;
  linkLabel?: string;
  linkUrl?: string;
}

// TODO: replace with CMS-driven data once the API contract is defined.
const DUMMY_ITEMS: ArcCarouselItem[] = [
  {
    id: "1",
    bgClassName: "bg-[#3f7a54]",
    caption: "「Visa × 叮叮」優惠延長\nTap to Pay & enjoy $1 off each ride",
  },
  {
    id: "2",
    bgClassName: "bg-[#f2e2c8]",
    caption:
      "Paul Lafayet x Hong Kong Tramways Mid-Autumn Festival Exclusive Collaboration",
    linkLabel: "ORDER NOW",
    linkUrl: "#",
  },
  {
    id: "3",
    bgClassName: "bg-[#1f3d2b]",
    caption: "新票價現已生效\nNew Fares Now Effective",
  },
  {
    id: "4",
    bgClassName: "bg-[#e0b93a]",
    caption: "KEUNG TO x Hong Kong Tramways",
  },
  {
    id: "5",
    bgClassName: "bg-[#2c5f8a]",
    caption: "Ride the Tram, See the City",
  },
];

const DESKTOP_CARD_WIDTH = "33.6dvh";
const DESKTOP_CARD_HEIGHT = "42dvh";
const DESKTOP_TILT = 7;
const DESKTOP_DROPS = [0, 20, 81];
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
const desktopGap = (cardWidth: string) => `calc(25vw + (${cardWidth}) / 8)`;

const MOBILE_CARD_WIDTH = "30.34dvmax";
const MOBILE_CARD_HEIGHT = "38dvmax";
const MOBILE_TILT = 8;
const MOBILE_DROPS = [0, 14];
const MOBILE_VISIBLE_RANGE = 1;
/**
 * Slot spacing for mobile: only offsets -1/0/1 are visible, so the 1st/last
 * visible card (offset = ±1) should end up ~75% off-screen:
 *   1 * gap = viewportWidth/2 + 0.25 * cardWidth = 50vw + cardWidth/4
 */
const mobileGap = (cardWidth: string) => `calc(50vw + (${cardWidth}) / 4)`;

/** matches the project's md breakpoint (768px) used elsewhere for mobile/desktop layout */
function useIsMobile(query = "(max-width: 767.99px)") {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return isMobile;
}

/** shortest looped distance from the active card (…-2,-1,0,1,2…) */
function loopedOffset(index: number, active: number, total: number) {
  let d = index - active;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

export interface ArcCarouselProps {
  items?: ArcCarouselItem[];
  heading?: string;
  buttonLabel?: string;
  buttonUrl?: string;
}

export default function ArcCarousel({
  items = DUMMY_ITEMS,
  heading = "HAPPENINGS",
  buttonLabel = "NEWS & EVENTS",
  buttonUrl = "#",
}: ArcCarouselProps) {
  const total = items.length;
  const maxOff = Math.floor(total / 2);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(0); // last navigation direction: 1 = next, -1 = prev
  const dragStart = useRef<number | null>(null);
  const isMobile = useIsMobile();

  const cardWidth = isMobile ? MOBILE_CARD_WIDTH : DESKTOP_CARD_WIDTH;
  const cardHeight = isMobile ? MOBILE_CARD_HEIGHT : DESKTOP_CARD_HEIGHT;
  const tilt = isMobile ? MOBILE_TILT : DESKTOP_TILT;
  const drops = isMobile ? MOBILE_DROPS : DESKTOP_DROPS;
  const visibleRange = isMobile ? MOBILE_VISIBLE_RANGE : DESKTOP_VISIBLE_RANGE;
  const active_ = items[active] ?? items[0];

  const translateX = (off: number) =>
    isMobile
      ? `calc(-50% + ${off} * ${mobileGap(cardWidth)})`
      : `calc(-50% + ${off} * ${desktopGap(cardWidth)})`;

  const prev = useCallback(() => {
    setDir(-1);
    setActive((a) => (a - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setDir(1);
    setActive((a) => (a + 1) % total);
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    if (dx > 40) prev();
    else if (dx < -40) next();
    dragStart.current = null;
  };

  return (
    <section className="bg-green relative overflow-hidden py-[10dvh] md:py-[6dvh] select-none borderless flex flex-col h-[calc(100dvh-76px)] lg:h-[calc(100dvh-100px)]">
      <div className="shrink-0 flex items-center justify-center gap-6 md:gap-16 pb-8 md:pb-10">
        <button
          type="button"
          aria-label="Previous poster"
          onClick={prev}
          className="hidden md:grid shrink-0 z-10 w-11 h-11 rounded-full md:rounded-[16px] bg-white text-green place-items-center cursor-pointer hover:-translate-x-1 hover:shadow-lg transition-all"
        >
          <ArrowBackIcon fontSize="small" />
        </button>

        <h2 className="text-white text-center font-semibold uppercase text-[40px] md:text-[56px] leading-[107%] tracking-[0.02em]">
          {heading}
        </h2>

        <button
          type="button"
          aria-label="Next poster"
          onClick={next}
          className="hidden md:grid shrink-0 z-10 w-11 h-11 rounded-full md:rounded-[16px] bg-white text-green place-items-center cursor-pointer hover:translate-x-1 hover:shadow-lg transition-all"
        >
          <ArrowForwardIcon fontSize="small" />
        </button>
      </div>

      <div
        className="relative grow min-h-0 touch-pan-y cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={() => {
          dragStart.current = null;
        }}
      >
        <button
          type="button"
          aria-label="Previous poster"
          onClick={prev}
          className="md:hidden grid absolute left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white text-green place-items-center cursor-pointer"
        >
          <ArrowBackIcon fontSize="small" />
        </button>
        <button
          type="button"
          aria-label="Next poster"
          onClick={next}
          className="md:hidden grid absolute right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white text-green place-items-center cursor-pointer"
        >
          <ArrowForwardIcon fontSize="small" />
        </button>

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
            <figure
              key={item.id}
              className="absolute left-1/2 top-1/2 m-0 overflow-hidden shadow-lg will-change-transform"
              style={{
                width: cardWidth,
                height: cardHeight,
                transform: `translateX(${translateX(off)}) translateY(calc(-50% + ${dropY}px)) rotate(${off * tilt}deg) scale(${scale})`,
                zIndex: 20 - abs,
                opacity: hidden ? 0 : 1,
                pointerEvents: hidden ? "none" : "auto",
                transition: wrapped
                  ? "none"
                  : "transform 550ms cubic-bezier(0.22,0.9,0.3,1), opacity 300ms ease",
              }}
              onClick={() => off !== 0 && (off > 0 ? next() : prev())}
            >
              <div
                className={`w-full h-full relative flex items-end p-4 ${item.bgClassName}`}
              >
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : null}
              </div>
            </figure>
          );
        })}
      </div>

      <div className="relative z-30 shrink-0 mt-6 md:mt-8 px-8 text-center">
        <p className="text-white font-semibold text-[16px] leading-[163%] tracking-[0.02em] whitespace-pre-line max-w-[520px] mx-auto">
          {active_.caption}
        </p>
        {active_.linkLabel ? (
          <a
            href={active_.linkUrl ?? "#"}
            className="inline-block mt-2 text-white text-sm underline underline-offset-4"
          >
            {active_.linkLabel}
          </a>
        ) : null}
      </div>

      <div className="shrink-0 mt-6 md:mt-8 flex justify-center">
        <a
          href={buttonUrl}
          className="inline-flex items-center gap-2 border border-white text-white rounded-[16px] px-6 py-2.5 text-sm font-semibold tracking-wide hover:bg-white hover:text-green transition-colors"
        >
          {buttonLabel}
          <ArrowForwardIcon fontSize="small" />
        </a>
      </div>
    </section>
  );
}
