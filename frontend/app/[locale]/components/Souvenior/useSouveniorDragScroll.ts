"use client";

import { useLayoutEffect, useRef } from "react";
import type { SouveniorData } from "@/types/api";

const MOMENTUM_FRICTION = 0.95;
const MOMENTUM_MIN_VELOCITY = 0.05;
const MAX_CONTAINER_WIDTH = 1280;
const GUTTER = 24;
const LG_BREAKPOINT = 1024;
const MOBILE_END_GUTTER = 20;
const WHEEL_EASE = 0.2;
const WHEEL_EASE_MIN_DELTA = 0.5;

function getStartX(viewportWidth: number) {
  return Math.max(0, (viewportWidth - MAX_CONTAINER_WIDTH) / 2) + GUTTER;
}

/**
 * Drag-to-scroll (with momentum) and horizontal wheel scroll for the
 * Souvenior card row. Bounds are recomputed against `data` so a fresh item
 * list re-clamps the row's translateX.
 */
export function useSouveniorDragScroll(data?: SouveniorData | null) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const actionButtonRef = useRef<HTMLElement | null>(null);
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
  const wheelTargetRef = useRef(0);
  const wheelFrame = useRef<number | null>(null);

  const applyX = (x: number) => {
    const { min, max } = boundsRef.current;
    const clamped = Math.min(max, Math.max(min, x));
    xRef.current = clamped;
    if (rowRef.current) {
      rowRef.current.style.transform = `translateX(${clamped}px)`;
    }
  };

  const recomputeBounds = () => {
    // documentElement.clientWidth excludes the vertical scrollbar, unlike
    // window.innerWidth, so it matches the actually visible content edge.
    const viewportWidth = document.documentElement.clientWidth;
    const rowWidth = rowRef.current?.scrollWidth ?? 0;
    const startX = getStartX(viewportWidth);

    // The row sits in normal flow after the container's left padding, so
    // translateX(0) renders its left edge at containerLeft + paddingLeft,
    // not at containerLeft. Bounds must be computed from that content edge.
    let contentLeft = 0;
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const paddingLeft = parseFloat(
        getComputedStyle(containerRef.current).paddingLeft,
      );
      contentLeft = containerRect.left + (Number.isNaN(paddingLeft) ? 0 : paddingLeft);
    }

    let minX: number;
    if (viewportWidth >= LG_BREAKPOINT && actionButtonRef.current) {
      const buttonRight = actionButtonRef.current.getBoundingClientRect().right;
      minX = Math.min(startX, buttonRight - contentLeft - rowWidth);
    } else {
      minX = Math.min(startX, viewportWidth - MOBILE_END_GUTTER - contentLeft - rowWidth);
    }

    boundsRef.current = { min: minX, max: startX };
    return startX;
  };

  const stopMomentum = () => {
    if (momentumFrame.current !== null) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
  };

  const stopWheelEase = () => {
    if (wheelFrame.current !== null) {
      cancelAnimationFrame(wheelFrame.current);
      wheelFrame.current = null;
    }
  };

  const runWheelEase = () => {
    const step = () => {
      const diff = wheelTargetRef.current - xRef.current;
      if (Math.abs(diff) < WHEEL_EASE_MIN_DELTA) {
        applyX(wheelTargetRef.current);
        wheelFrame.current = null;
        return;
      }
      applyX(xRef.current + diff * WHEEL_EASE);
      wheelFrame.current = requestAnimationFrame(step);
    };
    if (wheelFrame.current === null) {
      wheelFrame.current = requestAnimationFrame(step);
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
      stopWheelEase();
      const resetX = recomputeBounds();
      applyX(resetX);
    };
    window.addEventListener("resize", onResize);

    const el = containerRef.current;
    const onWheel = (e: WheelEvent) => {
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY)
          ? e.deltaX
          : e.shiftKey
            ? e.deltaY
            : 0;
      if (delta === 0) return;
      e.preventDefault();
      stopMomentum();
      if (wheelFrame.current === null) wheelTargetRef.current = xRef.current;
      const { min, max } = boundsRef.current;
      wheelTargetRef.current = Math.min(
        max,
        Math.max(min, wheelTargetRef.current - delta),
      );
      runWheelEase();
    };
    el?.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("resize", onResize);
      el?.removeEventListener("wheel", onWheel);
      stopWheelEase();
    };
  }, [data]);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    stopMomentum();
    stopWheelEase();
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
  };

  const onPointerMove = (e: React.PointerEvent) => {
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
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const state = dragState.current;
    const el = containerRef.current;
    if (!state) return;
    state.dragging = false;
    el?.releasePointerCapture(e.pointerId);
    if (state.moved) runMomentum(state.velocity * 16);
  };

  const onPointerLeave = () => {
    const state = dragState.current;
    if (!state) return;
    state.dragging = false;
    if (state.moved) runMomentum(state.velocity * 16);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (dragState.current?.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return {
    containerRef,
    rowRef,
    actionButtonRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave,
    onClickCapture,
  };
}
