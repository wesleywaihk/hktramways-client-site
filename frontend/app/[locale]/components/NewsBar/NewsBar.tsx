"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { AnnouncementItemData } from "@/types/api";
import NewsBarEntry from "./NewsBarEntry";

export interface NewsBarProps {
  items?: AnnouncementItemData[];
  locale: string;
  /** Scroll speed in pixels per second. */
  speed?: number;
}

const MIN_ITEMS = 10;

function repeatToMinimum(
  items: AnnouncementItemData[],
  minLength: number = MIN_ITEMS,
) {
  if (items.length === 0) return items;
  const repeated: AnnouncementItemData[] = [];
  while (repeated.length < minLength) repeated.push(...items);
  return repeated;
}

export default function NewsBar({
  items = [],
  locale,
  speed = 120,
}: NewsBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);

  const visibleItems = items.filter((item) => item.text.trim().length > 0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || visibleItems.length === 0) return;

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
  }, [speed, visibleItems]);

  if (!visibleItems.length) return null;

  return (
    <section className="borderless relative flex h-[52px] overflow-visible bg-white pl-[53px] lg:h-[60px] lg:pl-[92px]">
      <Image
        src="/home/newsBar/dingDingCat.svg"
        alt=""
        width={108}
        height={85}
        className="absolute bottom-0 left-[10px] z-10 h-[67px] w-[85px] lg:left-[20px] lg:h-[85px] lg:w-[108px]"
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
          {repeatToMinimum(visibleItems).map((item, index) => (
            <NewsBarEntry key={index} {...item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
