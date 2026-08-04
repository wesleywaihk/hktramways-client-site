"use client";

import { useLayoutEffect, useRef } from "react";
import Button from "@/components/Button/Button";
import IconButton from "@/components/Button/IconButton";
import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";
import RankCrownIco from "@/components/icons/RankCrownIco";
import type { SouveniorData, SouveniorItem } from "@/types/api";

export interface SouveniorProps {
  data?: SouveniorData | null;
}

function formatPrice(price: number) {
  return Number.isInteger(price) ? String(price) : price.toFixed(2);
}

function SouveniorCard({
  item,
  order,
}: {
  item: SouveniorItem;
  order: number;
}) {
  const actionUrl = item.actionButton?.link?.[0]?.url ?? undefined;

  return (
    <div className="flex flex-col items-center shrink-0 w-[53vw] md:w-[35vw] lg:w-[320px]">
      <div className="relative w-full aspect-square">
        <ResponsiveImg
          bannerImage={{
            id: item.image?.id ?? 0,
            altText: item.name,
            imageD: item.image ?? null,
            imageM: null,
          }}
          sizes="(min-width: 1024px) 258px, (min-width: 768px) 31vw, 48vw"
          className="rounded-[50%] bg-white/10 select-none pointer-events-none"
        />

        <div className="absolute z-20 top-0 left-2 pointer-events-none">
          {item.rank && (
            <RankCrownIco
              rank={item.rank}
              className="absolute z-10 left-[26px] -top-[19px] lg:-left-[15px] lg:-top-[18px]  w-[18.6px] h-[18px] -rotate-[10deg] lg:w-[23px] lg:h-[22px] lg:-rotate-[30deg]"
            />
          )}
          <span
            className="font-sans font-semibold text-[44px] lg:text-[62px] leading-none uppercase tracking-[0.05em] text-transparent"
            style={{ WebkitTextStroke: "1px white" }}
          >
            {String(order).padStart(2, "0")}
          </span>
        </div>

        {item.actionButton && (
          <IconButton
            href={actionUrl ?? "#"}
            startIcon={item.actionButton.startIcon}
            className="absolute z-10 bottom-5 right-5"
            tooltip={item.actionButton.label}
          />
        )}
      </div>

      <p className="mt-3 md:mt-4 text-white text-center text-[13px] md:text-[14px] leading-[145%] tracking-[0.02em] line-clamp-2 min-h-[2.9em]">
        {item.name}
      </p>
      <p className="mt-1 flex items-baseline gap-1.5 text-white text-[15px] md:text-[16px] font-semibold tracking-[0.02em]">
        <span>HK${formatPrice(item.pirce)}</span>
        {item.preDiscountPrice != null && (
          <span className="text-white/50 font-normal text-[12px] md:text-[13px] line-through">
            HK${formatPrice(item.preDiscountPrice)}
          </span>
        )}
      </p>
    </div>
  );
}

const MOMENTUM_FRICTION = 0.95;
const MOMENTUM_MIN_VELOCITY = 0.05;
const MAX_CONTAINER_WIDTH = 1280;
const GUTTER = 24;

function getStartX(viewportWidth: number) {
  return Math.max(0, (viewportWidth - MAX_CONTAINER_WIDTH) / 2) + GUTTER;
}

export default function Souvenior({ data = undefined }: SouveniorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const xRef = useRef(0);
  const boundsRef = useRef({ min: 0, max: 0 });
  const dragState = useRef<{
    startX: number;
    startTranslateX: number;
    dragging: boolean;
    moved: boolean;
    lastX: number;
    lastT: number;
    velocity: number;
  } | null>(null);
  const momentumFrame = useRef<number | null>(null);

  const applyX = (x: number) => {
    const { min, max } = boundsRef.current;
    const clamped = Math.min(max, Math.max(min, x));
    xRef.current = clamped;
    if (rowRef.current) {
      rowRef.current.style.transform = `translateX(${clamped}px)`;
    }
  };

  const recomputeBounds = () => {
    const viewportWidth = window.innerWidth;
    const containerWidth = containerRef.current?.clientWidth ?? viewportWidth;
    const rowWidth = rowRef.current?.scrollWidth ?? 0;
    const startX = getStartX(viewportWidth);
    const minX = Math.min(startX, containerWidth - GUTTER - rowWidth);
    boundsRef.current = { min: minX, max: startX };
    return startX;
  };

  const stopMomentum = () => {
    if (momentumFrame.current !== null) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
  };

  const runMomentum = (velocity: number) => {
    let v = velocity;
    const step = () => {
      if (Math.abs(v) < MOMENTUM_MIN_VELOCITY) {
        momentumFrame.current = null;
        return;
      }
      applyX(xRef.current + v);
      v *= MOMENTUM_FRICTION;
      momentumFrame.current = requestAnimationFrame(step);
    };
    stopMomentum();
    momentumFrame.current = requestAnimationFrame(step);
  };

  useLayoutEffect(() => {
    const startX = recomputeBounds();
    applyX(startX);

    const onResize = () => {
      stopMomentum();
      const resetX = recomputeBounds();
      applyX(resetX);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [data]);

  if (!data) return null;

  const title = data.title;
  const buttonLabel = data.actionButton?.label;
  const buttonUrl = data.actionButton?.link?.[0]?.url ?? "#";
  const buttonUseArrow = data.actionButton?.useArrow ?? true;
  const buttonStartIcon = data.actionButton?.startIcon;

  const items = data.item ?? [];
  if (!items.length) return null;

  return (
    <section className="borderless pageHeight bg-green flex flex-col justify-center py-16 md:py-20 lg:py-24">
      <div className="flex items-center justify-between gap-4 w-full pageBorder max-w-screen-xl mx-auto">
        <h2 className="text-white font-semibold uppercase text-[28px] sm:text-[36px] md:text-[48px] leading-[107%] tracking-[0.02em] px-0 mx-0">
          {title}
        </h2>
        {buttonLabel && (
          <Button
            href={buttonUrl}
            className="shrink-0 text-white !px-4 !py-2.5 md:!px-6.5 md:!py-[19px] text-[11px] md:text-[14px]"
            useArrow={buttonUseArrow}
            startIcon={buttonStartIcon}
          >
            {buttonLabel}
          </Button>
        )}
      </div>

      <div
        ref={containerRef}
        className="mt-10 md:mt-14 pt-[19px] lg:pt-[21px] overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing select-none"
        onPointerDown={(e) => {
          const el = containerRef.current;
          if (!el) return;
          stopMomentum();
          el.setPointerCapture(e.pointerId);
          dragState.current = {
            startX: e.clientX,
            startTranslateX: xRef.current,
            dragging: true,
            moved: false,
            lastX: e.clientX,
            lastT: e.timeStamp,
            velocity: 0,
          };
        }}
        onPointerMove={(e) => {
          const state = dragState.current;
          if (!state?.dragging) return;
          const dx = e.clientX - state.startX;
          if (Math.abs(dx) > 3) state.moved = true;
          applyX(state.startTranslateX + dx);

          const dt = e.timeStamp - state.lastT;
          if (dt > 0) {
            state.velocity = (e.clientX - state.lastX) / dt;
          }
          state.lastX = e.clientX;
          state.lastT = e.timeStamp;
        }}
        onPointerUp={(e) => {
          const state = dragState.current;
          const el = containerRef.current;
          if (!state) return;
          state.dragging = false;
          el?.releasePointerCapture(e.pointerId);
          if (state.moved) runMomentum(state.velocity * 16);
        }}
        onPointerLeave={() => {
          const state = dragState.current;
          if (!state) return;
          state.dragging = false;
          if (state.moved) runMomentum(state.velocity * 16);
        }}
        onClickCapture={(e) => {
          if (dragState.current?.moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div ref={rowRef} className="flex gap-[30px] w-max">
          {items.map((item, index) => (
            <SouveniorCard key={item.id} item={item} order={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
