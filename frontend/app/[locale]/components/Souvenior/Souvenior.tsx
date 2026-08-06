"use client";

import SouveniorCard from "./SouveniorCard";
import ActionButton from "./ActionButton";
import { useSouveniorDragScroll } from "./useSouveniorDragScroll";
import type { SouveniorData } from "@/types/api";

export interface SouveniorProps {
  data?: SouveniorData | null;
}

export default function Souvenior({ data = undefined }: SouveniorProps) {
  const {
    containerRef,
    rowRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave,
    onClickCapture,
  } = useSouveniorDragScroll(data);

  if (!data) return null;

  const title = data.title;

  const items = data.item.slice(0, 5) ?? [];
  if (!items.length) return null;

  return (
    <section className="borderless h-auto  bg-green flex flex-col justify-center py-[90px] lg:py-[120px]">
      <div className="flex items-center justify-between gap-4 w-full pageBorder max-w-screen-xl mx-auto">
        <h2 className="text-white font-semibold uppercase text-center lg:text-left text-[40px] lg:text-[56px] leading-[107%] tracking-[0.02em] px-0 mx-0 grow">
          {title}
        </h2>
        {data.actionButton && (
          <ActionButton
            {...data.actionButton}
            className="hidden! lg:inline-flex! lg:shrink-0 px-[28px]! py-[19px]!"
          />
        )}
      </div>

      <div
        ref={containerRef}
        className="mt-10 md:mt-14 pt-[34px] md:pt-[28px] lg:pt-[28px] overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        onClickCapture={onClickCapture}
      >
        <div ref={rowRef} className="flex gap-[30px] w-max">
          {items.map((item, index) => (
            <SouveniorCard key={item.id} item={item} order={index + 1} />
          ))}
        </div>
      </div>

      <div className="w-full pageBorder max-w-screen-xl mx-auto block lg:hidden mt-10 flex items-center justify-center">
        {data.actionButton && (
          <ActionButton {...data.actionButton} className="!px-6 !py-[14px]" />
        )}
      </div>
    </section>
  );
}
