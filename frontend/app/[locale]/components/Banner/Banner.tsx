"use client";

import { useEffect, useRef, useState } from "react";
import { IMG_URL } from "@/consts";
import { ResponsiveImage } from "@/types/api";
import { isImageMedia, isVideoMedia } from "@/lib/media";
import { useElementScrollProgress } from "@/hooks/useElementScrollProgress";
import ImageCard from "./ImageCard";
import VideoCard from "./VideoCard";

export interface BannerProps {
  url?: string | null;
  bannerImage?: ResponsiveImage[] | null;
  className?: string;
  isFullScreen?: boolean;
}

const SLIDE_INTERVAL_MS = 10000;
export const SCROLL_DISTANCE = 200;
export const FADE_DURATION_MS = 1000;

// imageD and imageM must be the same media type (both image or both video),
// otherwise the pair can't be rendered consistently across breakpoints.
const isValidBanner = (banner: ResponsiveImage) =>
  (isImageMedia(banner.imageD) && isImageMedia(banner.imageM)) ||
  (isVideoMedia(banner.imageD) && isVideoMedia(banner.imageM));

export default function Banner({
  url = IMG_URL,
  bannerImage,
  className = "",
  isFullScreen = false,
}: BannerProps) {
  const banners = bannerImage?.filter(isValidBanner) ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useElementScrollProgress(sectionRef, "pageTop");

  useEffect(() => {
    if (banners.length < 2) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const transY = Math.min(
    Math.max(0, scrollProgress * SCROLL_DISTANCE),
    SCROLL_DISTANCE,
  );

  return (
    <section
      ref={sectionRef}
      // isFullScreen false: news bar is rendered, so header + banner + newsBar = 100dvh
      // isFullScreen true: no news bar, so header + banner = 100dvh
      className={`bg-green relative overflow-hidden borderless ${
        !isFullScreen
          ? "h-[calc(100dvh-52px)] lg:h-[calc(100dvh-160px)]"
          : "h-[100dvh] lg:h-[calc(100dvh-100px)]"
      } ${className}`}
    >
      {banners.map((banner, index) => {
        const cardClassName = `transition-opacity duration-1000 ease-in-out ${
          index === activeIndex ? "opacity-100" : "opacity-0"
        }`;
        const cardStyle = { transitionDuration: `${FADE_DURATION_MS}ms` };
        return isVideoMedia(banner.imageD) ? (
          <VideoCard
            key={banner.id}
            bannerImage={banner}
            url={url}
            className={cardClassName}
            isFullScreen={isFullScreen}
            isActive={index === activeIndex}
            transY={transY}
            style={cardStyle}
          />
        ) : (
          <ImageCard
            key={banner.id}
            bannerImage={banner}
            url={url}
            className={cardClassName}
            transY={transY}
            style={cardStyle}
          />
        );
      })}
    </section>
  );
}
