import { useEffect, useState } from "react";

const SLIDE_INTERVAL_MS = 3000;
export const SLIDE_DURATION_MS = 500;

export type ActiveSlide = 0 | 1 | 2;

export default function useSlideShow() {
  const [activeSlide, setActiveSlide] = useState<ActiveSlide>(0);
  const [nextSlide, setNextSlide] = useState<ActiveSlide | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setNextSlide(
        () => (activeSlide !== 2 ? activeSlide + 1 : 0) as ActiveSlide,
      );
    }, SLIDE_INTERVAL_MS);
    return () => clearTimeout(id);
  }, [activeSlide]);

  useEffect(() => {
    if (nextSlide === null) return;
    const timeoutId = setTimeout(() => {
      setActiveSlide(nextSlide);
      setNextSlide(null);
    }, SLIDE_DURATION_MS);
    return () => clearTimeout(timeoutId);
  }, [nextSlide]);

  return { activeSlide, nextSlide };
}
