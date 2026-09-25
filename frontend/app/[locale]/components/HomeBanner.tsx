"use client";

import Banner from "@/components/Banner/Banner";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import type { ResponsiveImage } from "@/types/api";

export interface HomeBannerProps {
  bannerImage?: ResponsiveImage[] | null;
}

/** Home banner sized so header + banner (+ NewsBar when there are announcements) fill 100dvh. */
export default function HomeBanner({ bannerImage }: HomeBannerProps) {
  const { items, loading } = useAnnouncements();
  // Assume the NewsBar will render while loading, so the banner doesn't jump for the common case
  const hasNewsBar = loading || items.some((item) => item.title.trim());

  return (
    <Banner
      bannerImage={bannerImage}
      className={
        hasNewsBar
          ? "h-[calc(100dvh-128px)] lg:h-[calc(100dvh-160px)]"
          : "h-[calc(100dvh-76px)] lg:h-[calc(100dvh-100px)]"
      }
    />
  );
}
