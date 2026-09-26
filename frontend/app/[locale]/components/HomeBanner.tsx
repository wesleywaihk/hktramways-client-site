import Banner from "@/components/Banner/Banner";
import type { ResponsiveImage } from "@/types/api";

export interface HomeBannerProps {
  bannerImage?: ResponsiveImage[] | null;
  /** Whether the NewsBar renders below the banner. */
  hasNewsBar?: boolean;
}

/** Home banner sized so header + banner (+ NewsBar when there are announcements) fill 100dvh. */
export default function HomeBanner({
  bannerImage,
  hasNewsBar = false,
}: HomeBannerProps) {
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
