"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import type { HomeNewsBarItem } from "@/types/api";
import NewsBarEntry from "./NewsBarEntry";

export interface NewsBarProps {
  items: HomeNewsBarItem[];
  locale: string;
  /** Scroll speed in pixels per second. */
  speed?: number;
}

const MIN_ITEMS = 10;

function repeatToMinimum(items: HomeNewsBarItem[], minLength: number) {
  if (items.length === 0) return items;
  const repeated: HomeNewsBarItem[] = [];
  while (repeated.length < minLength) repeated.push(...items);
  return repeated;
}

export default function NewsBar({ items, speed = 120 }: NewsBarProps) {
  const t = useTranslations("common");
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;
    let frameId: number;
    let lastTime: number | null = null;

    const step = (time: number) => {
      if (lastTime === null) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (!pausedRef.current && halfWidth > 0) {
        offsetRef.current =
          (offsetRef.current + (speed * delta) / 1000) % halfWidth;
        track.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [speed, items]);

  return (
    <section className="borderless h-[52px] lg:h-[60px] bg-white relative overflow-visible pl-[53px] lg:pl-[92px] flex">
      <Image
        src="/home/newsBar/dingDingCat.svg"
        alt=""
        width={108}
        height={85}
        className="absolute left-[10px] lg:left-[20px] bottom-0 z-10 w-[85px] h-[67px] lg:w-[108px] lg:h-[85px]"
        aria-hidden="true"
      />
      <div
        className="flex grow items-center overflow-hidden"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        <div ref={trackRef} className="flex items-center will-change-transform">
          {items.length
            ? (() => {
                const repeated = repeatToMinimum(items, MIN_ITEMS);
                return [...repeated, ...repeated].map((item, index) => (
                  <NewsBarEntry key={index} {...item} />
                ));
              })()
            : Array.from({ length: 10 }).map((_, index) => (
                <span
                  key={index}
                  className="font-semibold text-sm lg:text-[15px] tracking-[0.02em] whitespace-nowrap text-green lg:text-black mr-10"
                >
                  {t("newsBarFallback")}
                </span>
              ))}
        </div>
      </div>
    </section>
  );
}
