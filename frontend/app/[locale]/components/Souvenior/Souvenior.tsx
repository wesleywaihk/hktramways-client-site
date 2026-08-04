"use client";

import { useRef } from "react";
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
    <div className="flex flex-col items-center shrink-0 snap-start w-[53vw] md:w-[35vw] lg:w-[320px]">
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

export default function Souvenior({ data = undefined }: SouveniorProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef<{
    startX: number;
    startScrollLeft: number;
    dragging: boolean;
    moved: boolean;
    lastX: number;
    lastT: number;
    velocity: number;
  } | null>(null);
  const momentumFrame = useRef<number | null>(null);

  const stopMomentum = () => {
    if (momentumFrame.current !== null) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
  };

  const runMomentum = (velocity: number) => {
    const el = scrollRef.current;
    if (!el) return;
    let v = velocity;

    const step = () => {
      const node = scrollRef.current;
      if (!node || Math.abs(v) < MOMENTUM_MIN_VELOCITY) {
        momentumFrame.current = null;
        if (node) node.style.scrollSnapType = "";
        return;
      }
      node.scrollLeft -= v;
      v *= MOMENTUM_FRICTION;
      momentumFrame.current = requestAnimationFrame(step);
    };

    stopMomentum();
    momentumFrame.current = requestAnimationFrame(step);
  };

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
        ref={scrollRef}
        className="mt-10 md:mt-14 pt-[19px] lg:pt-[21px]  overflow-x-auto snap-x snap-mandatory touch-pan-x  cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onPointerDown={(e) => {
          const el = scrollRef.current;
          if (!el || e.pointerType !== "mouse") return;
          stopMomentum();
          el.style.scrollSnapType = "none";
          el.setPointerCapture(e.pointerId);
          dragState.current = {
            startX: e.clientX,
            startScrollLeft: el.scrollLeft,
            dragging: true,
            moved: false,
            lastX: e.clientX,
            lastT: e.timeStamp,
            velocity: 0,
          };
        }}
        onPointerMove={(e) => {
          const state = dragState.current;
          const el = scrollRef.current;
          if (!state?.dragging || !el) return;
          const dx = e.clientX - state.startX;
          if (Math.abs(dx) > 3) state.moved = true;
          el.scrollLeft = state.startScrollLeft - dx;

          const dt = e.timeStamp - state.lastT;
          if (dt > 0) {
            state.velocity = (e.clientX - state.lastX) / dt;
          }
          state.lastX = e.clientX;
          state.lastT = e.timeStamp;
        }}
        onPointerUp={(e) => {
          const state = dragState.current;
          const el = scrollRef.current;
          if (!state) return;
          state.dragging = false;
          el?.releasePointerCapture(e.pointerId);
          if (state.moved) {
            runMomentum(state.velocity * 16);
          } else if (el) {
            el.style.scrollSnapType = "";
          }
        }}
        onPointerLeave={() => {
          const state = dragState.current;
          const el = scrollRef.current;
          if (!state) return;
          state.dragging = false;
          if (state.moved) {
            runMomentum(state.velocity * 16);
          } else if (el) {
            el.style.scrollSnapType = "";
          }
        }}
        onClickCapture={(e) => {
          if (dragState.current?.moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div className="flex gap-[30px] ">
          {items.map((item, index) => (
            <SouveniorCard key={item.id} item={item} order={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
