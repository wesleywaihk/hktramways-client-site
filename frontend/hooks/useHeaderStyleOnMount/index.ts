"use client";

import { useEffect } from "react";
import { useHeaderStyle, type HeaderStyle } from "@/components/HeaderStyleProvider";

export function useHeaderStyleOnMount(style: HeaderStyle) {
  const { setHeaderStyle } = useHeaderStyle();

  useEffect(() => {
    setHeaderStyle(style);
    return () => setHeaderStyle("default");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style]);
}
