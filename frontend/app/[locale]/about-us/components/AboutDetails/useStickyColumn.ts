"use client";

import { useEffect, useRef } from "react";

/**
 * Sets `top` for a `position: sticky` column in a side-by-side layout.
 *
 * The taller column fills the row, so sticky has no room to move it and it
 * scrolls normally; the shorter column sticks. When the sticky column fits in
 * the viewport it pins under the header (`offsetTop`); when it is taller it
 * pins by its bottom edge instead (negative `top`), so all of it can still be
 * scrolled into view.
 */
export function useStickyColumn<T extends HTMLElement>(
  offsetTop: number,
  offsetBottom: number,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const top = Math.min(
        offsetTop,
        window.innerHeight - el.offsetHeight - offsetBottom,
      );
      el.style.top = `${top}px`;
    };

    update();
    // Accordion expand/collapse and image loads change the column height.
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [offsetTop, offsetBottom]);

  return ref;
}
