"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

/** debounce window after the last wheel event before treating a scroll as finished */
const WHEEL_SETTLE_MS = 150;

/**
 * Circle-that-follows-the-cursor: tracks pointer position within `containerRef`
 * and drives a directly-mutated transform on `circleRef` (bypassing React
 * render) for a jank-free follow, while `visible`/`content` stay in state to
 * drive the fade + text.
 */
export function useFloatingCircle(containerRef: RefObject<HTMLElement | null>) {
  const circleRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);
  const rafRef = useRef<number | null>(null);
  const pendingPos = useRef<{ x: number; y: number } | null>(null);
  const isHoveringRef = useRef(false);
  const lastClientPos = useRef<{ clientX: number; clientY: number } | null>(
    null,
  );
  const recheckTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onWindowMove = (e: MouseEvent) => {
      lastClientPos.current = { clientX: e.clientX, clientY: e.clientY };
    };
    window.addEventListener("mousemove", onWindowMove);
    return () => window.removeEventListener("mousemove", onWindowMove);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (recheckTimer.current != null) clearTimeout(recheckTimer.current);
    };
  }, []);

  const onHoverMove = (
    e: React.MouseEvent<HTMLElement>,
    hoverContent: React.ReactNode,
  ) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    pendingPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const isEntering = !isHoveringRef.current;
    isHoveringRef.current = true;
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const pos = pendingPos.current;
        const circle = circleRef.current;
        if (!pos || !circle) return;
        if (isEntering) {
          circle.style.transition = "none";
          circle.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(0.1)`;
          void circle.offsetWidth;
          circle.style.transition = "";
          requestAnimationFrame(() => {
            if (circleRef.current) {
              circleRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(1)`;
            }
          });
        } else {
          circle.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(1)`;
        }
      });
    }
    setVisible(true);
    setContent(hoverContent);
  };

  const onHoverEnd = () => {
    isHoveringRef.current = false;
    const pos = pendingPos.current;
    if (pos && circleRef.current) {
      circleRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(0.1)`;
    }
    setVisible(false);
  };

  /**
   * Re-derive hover state from the cursor's last known position: find
   * whatever element is now under it and replay a mousemove there, so a
   * cursor that never moved still picks the circle back up over whatever
   * landed underneath it.
   */
  const recheckAtLastPointer = useCallback(() => {
    const pos = lastClientPos.current;
    if (!pos) return;
    const el = document.elementFromPoint(pos.clientX, pos.clientY);
    el?.dispatchEvent(
      new MouseEvent("mousemove", {
        bubbles: true,
        clientX: pos.clientX,
        clientY: pos.clientY,
      }),
    );
  }, []);

  /**
   * Hide immediately (e.g. a carousel slide starts animating) and, once it
   * settles `settleMs` later, recheck the cursor's last known position.
   */
  const hideForTransition = useCallback(
    (settleMs: number) => {
      isHoveringRef.current = false;
      setVisible(false);
      if (recheckTimer.current != null) clearTimeout(recheckTimer.current);
      recheckTimer.current = setTimeout(() => {
        recheckTimer.current = null;
        recheckAtLastPointer();
      }, settleMs);
    },
    [recheckAtLastPointer],
  );

  // hide while the page is being wheel-scrolled, and recheck the cursor's
  // last position once scrolling has settled, so a stationary cursor picks
  // the circle back up over whatever ended up underneath it
  useEffect(() => {
    let wheelTimer: ReturnType<typeof setTimeout> | null = null;
    const onWheel = () => {
      isHoveringRef.current = false;
      setVisible(false);
      if (wheelTimer != null) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        wheelTimer = null;
        recheckAtLastPointer();
      }, WHEEL_SETTLE_MS);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (wheelTimer != null) clearTimeout(wheelTimer);
    };
  }, [recheckAtLastPointer]);

  return { circleRef, visible, content, onHoverMove, onHoverEnd, hideForTransition };
}
