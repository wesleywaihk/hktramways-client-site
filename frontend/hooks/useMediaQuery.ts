"use client";

import { useEffect, useState } from "react";

// Range syntax (`width < 640px`) instead of `max-width: 639px` — adjoining
// queries share an exact boundary with no gap or overlap, unlike integer or
// fractional max-width/min-width pairs which can leave sub-pixel viewport
// widths (eg. 639.5px from browser zoom) matching neither query.
/** matches the project's md breakpoint (768px) used elsewhere for mobile/desktop layout */
const MOBILE_QUERY = "(width < 640px)";
/** between the sm and md breakpoints (640px–767.99px) */
const SM_QUERY = "(640px <= width < 768px)";
/** between the md and lg breakpoints (768px–1023.99px) */
const MD_QUERY = "(768px <= width < 1024px)";
/** the lg breakpoint (1024px) and above */
const LG_QUERY = "(1024px <= width < 1280px)";
/** the xl breakpoint (1280px) and above */
const XL_QUERY = "(1280px <= width < 1536px)";
/** the xxl breakpoint (1536px, Tailwind's 2xl) and above */
const XXL_QUERY = "(width >= 1536px)";

/** Reactive `window.matchMedia` subscriptions for the project's shared breakpoints. */
export function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSm, setIsSm] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [isXl, setIsXl] = useState(false);
  const [isXxl, setIsXxl] = useState(false);

  useEffect(() => {
    const mobileMq = window.matchMedia(MOBILE_QUERY);
    const smMq = window.matchMedia(SM_QUERY);
    const mdMq = window.matchMedia(MD_QUERY);
    const lgMq = window.matchMedia(LG_QUERY);
    const xlMq = window.matchMedia(XL_QUERY);
    const xxlMq = window.matchMedia(XXL_QUERY);

    const updateMobile = () => setIsMobile(mobileMq.matches);
    const updateSm = () => setIsSm(smMq.matches);
    const updateMd = () => setIsMd(mdMq.matches);
    const updateLg = () => setIsLg(lgMq.matches);
    const updateXl = () => setIsXl(xlMq.matches);
    const updateXxl = () => setIsXxl(xxlMq.matches);

    updateMobile();
    updateSm();
    updateMd();
    updateLg();
    updateXl();
    updateXxl();

    mobileMq.addEventListener("change", updateMobile);
    smMq.addEventListener("change", updateSm);
    mdMq.addEventListener("change", updateMd);
    lgMq.addEventListener("change", updateLg);
    xlMq.addEventListener("change", updateXl);
    xxlMq.addEventListener("change", updateXxl);

    return () => {
      mobileMq.removeEventListener("change", updateMobile);
      smMq.removeEventListener("change", updateSm);
      mdMq.removeEventListener("change", updateMd);
      lgMq.removeEventListener("change", updateLg);
      xlMq.removeEventListener("change", updateXl);
      xxlMq.removeEventListener("change", updateXxl);
    };
  }, []);

  return { isMobile, isSm, isMd, isLg, isXl, isXxl };
}
