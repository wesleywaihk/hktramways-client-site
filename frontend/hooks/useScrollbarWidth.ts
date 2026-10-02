import { useEffect, type RefObject } from "react";

/**
 * Keeps `--scrollbar-w` on the element set to the width its vertical scrollbar
 * actually takes up: 0 for overlay scrollbars (iOS, macOS default) or when the
 * content doesn't overflow. Lets padding compensate for the scrollbar exactly
 * instead of assuming a fixed width.
 */
export function useScrollbarWidth(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const width = el.offsetWidth - el.clientWidth;
      el.style.setProperty("--scrollbar-w", `${width}px`);
    };

    update();
    // The content box shrinks when a scrollbar appears, so this also catches
    // overflow starting/stopping, not just the element resizing.
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}
