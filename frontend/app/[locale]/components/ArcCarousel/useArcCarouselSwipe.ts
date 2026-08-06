"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** freeze wheel-swipe navigation for this long after a swipe triggers, so a single long trackpad gesture can't fire twice */
const WHEEL_NAV_COOLDOWN_MS = 900;

/**
 * Navigation for ArcCarousel: arrow keys, trackpad/mouse wheel horizontal
 * swipe, and pointer drag all drive the same `active` index. Wheel handling
 * also blocks the browser's edge-swipe back/forward navigation.
 */
export function useArcCarouselSwipe(total: number) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(0); // last navigation direction: 1 = next, -1 = prev
  const dragStart = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lastWheelNavAt = useRef(0);

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

  useEffect(() => {
    const el = trackRef.current;
    const onWheel = (e: WheelEvent) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (delta === 0) return;
      // prevent the browser's back/forward swipe navigation on every
      // horizontal event, not just the ones that clear the trigger threshold
      if (isHorizontal) e.preventDefault();
      if (Math.abs(delta) < 4) return; // ignore weak trackpad momentum tail
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelNavAt.current < WHEEL_NAV_COOLDOWN_MS) return; // freeze detection right after a swipe
      lastWheelNavAt.current = now;
      if (delta > 0) next();
      else prev();
    };
    el?.addEventListener("wheel", onWheel, { passive: false });
    return () => el?.removeEventListener("wheel", onWheel);
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
  const onPointerLeave = () => {
    dragStart.current = null;
  };

  return {
    active,
    dir,
    trackRef,
    prev,
    next,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
  };
}
