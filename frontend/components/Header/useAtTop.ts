"use client";

import { useEffect, useState } from "react";

const AT_TOP_SCROLL_CUTOFF = 180;

/** true while the page hasn't been scrolled past the cutoff */
export function useAtTop() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => setAtTop(window.scrollY <= AT_TOP_SCROLL_CUTOFF);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return atTop;
}
