import { useEffect } from "react";

export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    // `html` has an explicit `overflow-x` in globals.scss, which stops
    // `body`'s overflow from propagating to the viewport — so `html` (not
    // `body`) is the actual scrolling root and must be locked too.
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [locked]);
}
