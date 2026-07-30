"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function MetaUpdater({ metaTitle }: { metaTitle: string }) {
  const pageTitle = useSelector((state: RootState) => state.pageTitle.title);

  useEffect(() => {
    if (!metaTitle) return;
    document.title = pageTitle ? `${pageTitle} | ${metaTitle}` : metaTitle;
  }, [pageTitle, metaTitle]);

  return null;
}
