"use client";

import { useEffect, useState } from "react";

/** matches the project's md breakpoint (768px) used elsewhere for mobile/desktop layout */
const MOBILE_QUERY = "(max-width: 767.99px)";
/** between the sm and md breakpoints (640px–767.99px) */
const SM_TO_MD_QUERY = "(min-width: 640px) and (max-width: 767.99px)";
/** between the md and lg breakpoints (768px–1023.99px) */
const MD_QUERY = "(min-width: 768px) and (max-width: 1023.99px)";
/** the lg breakpoint (1024px) and above */
const LG_QUERY = "(min-width: 1024px)";
/** the xl breakpoint (1280px) and above */
const XL_QUERY = "(min-width: 1280px)";

/** Reactive `window.matchMedia` subscriptions for the project's shared breakpoints. */
export function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmToMd, setIsSmToMd] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [isXl, setIsXl] = useState(false);

  useEffect(() => {
    const mobileMq = window.matchMedia(MOBILE_QUERY);
    const smToMdMq = window.matchMedia(SM_TO_MD_QUERY);
    const mdMq = window.matchMedia(MD_QUERY);
    const lgMq = window.matchMedia(LG_QUERY);
    const xlMq = window.matchMedia(XL_QUERY);

    const updateMobile = () => setIsMobile(mobileMq.matches);
    const updateSmToMd = () => setIsSmToMd(smToMdMq.matches);
    const updateMd = () => setIsMd(mdMq.matches);
    const updateLg = () => setIsLg(lgMq.matches);
    const updateXl = () => setIsXl(xlMq.matches);

    updateMobile();
    updateSmToMd();
    updateMd();
    updateLg();
    updateXl();

    mobileMq.addEventListener("change", updateMobile);
    smToMdMq.addEventListener("change", updateSmToMd);
    mdMq.addEventListener("change", updateMd);
    lgMq.addEventListener("change", updateLg);
    xlMq.addEventListener("change", updateXl);

    return () => {
      mobileMq.removeEventListener("change", updateMobile);
      smToMdMq.removeEventListener("change", updateSmToMd);
      mdMq.removeEventListener("change", updateMd);
      lgMq.removeEventListener("change", updateLg);
      xlMq.removeEventListener("change", updateXl);
    };
  }, []);

  return { isMobile, isSmToMd, isMd, isLg, isXl };
}
