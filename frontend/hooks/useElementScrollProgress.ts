"use client";

import { RefObject, useEffect, useState } from "react";

export type ScrollProgressStartFrom = "elementTop" | "pageTop";

/**
 * Tracks how far a element has scrolled past the top of the viewport, as a 0-1 progress value.
 * 0 = element top is at (or below) the viewport top, 1 = element bottom has reached the viewport top.
 *
 * startFrom controls where progress starts counting from:
 * - "elementTop" (default): progress is 0 until the element's own top reaches the viewport top.
 * - "pageTop": progress counts from the very top of the page (scrollY 0), regardless of where
 *   the element sits on the page.
 */
export function useElementScrollProgress(
  ref: RefObject<HTMLElement | null>,
  startFrom: ScrollProgressStartFrom = "elementTop",
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateProgress = () => {
      const { top, height } = element.getBoundingClientRect();
      if (height === 0) return;
      const value =
        startFrom === "pageTop" ? window.scrollY / height : -top / height;
      setProgress(Math.min(1, Math.max(0, value)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [ref, startFrom]);

  return progress;
}
