"use client";

import { useEffect, useRef, useState } from "react";
import { IMG_URL } from "@/consts";
import { ResponsiveImage } from "@/types/api";
import { devClassName } from "@/lib/devClassName";
import { isImageMedia, isVideoMedia } from "@/lib/media";
import { useElementScrollProgress } from "@/hooks/useElementScrollProgress";
import ImageCard from "./ImageCard";
import VideoCard from "./VideoCard";

export interface BannerProps {
  url?: string | null;
  bannerImage?: ResponsiveImage[] | null;
  className?: string;
  useBorder?: boolean;
}

const SLIDE_INTERVAL_MS = 4000;
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
  useBorder = true,
}: BannerProps) {
  const banners = bannerImage?.filter(isValidBanner) ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useElementScrollProgress(sectionRef, "pageTop");

  const activeBanner = banners[activeIndex];
  const isActiveVideo = activeBanner ? isVideoMedia(activeBanner.imageD) : false;

  useEffect(() => {
    if (banners.length < 2 || isActiveVideo) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [banners.length, activeIndex, isActiveVideo]);

  if (banners.length === 0) return null;

  const goToNextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
  };

  const transY = Math.min(
    Math.max(0, scrollProgress * SCROLL_DISTANCE),
    SCROLL_DISTANCE,
  );

  return (
    <section
      ref={sectionRef}
      className={`${devClassName("banner")}bg-green borderless relative overflow-hidden ${className}`}
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
            isActive={index === activeIndex}
            transY={transY}
            style={cardStyle}
            useBorder={useBorder}
            onEnded={index === activeIndex ? goToNextSlide : undefined}
          />
        ) : (
          <ImageCard
            key={banner.id}
            bannerImage={banner}
            url={url}
            className={cardClassName}
            transY={transY}
            style={cardStyle}
            useBorder={useBorder}
          />
        );
      })}
    </section>
  );
}
