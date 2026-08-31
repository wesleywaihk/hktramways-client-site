import { useEffect, useRef, useState } from "react";
import { IMG_URL } from "@/consts";
import { ResponsiveImage } from "@/types/api";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SCROLL_DISTANCE } from "./Banner";
import { FADE_DURATION_MS } from "./Banner";

export interface VideoCardProps {
  bannerImage?: ResponsiveImage | null;
  url?: string | null;
  className?: string;
  isFullScreen?: boolean;
  isActive?: boolean;
  transY?: number;
  style?: React.CSSProperties;
  useBorder?: boolean;
  onEnded?: () => void;
}

export default function VideoCard({
  bannerImage,
  url = IMG_URL,
  className = "",
  isFullScreen = false,
  isActive = false,
  transY = 0,
  style = {},
  useBorder = true,
  onEnded,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldRender, setShouldRender] = useState(isActive);
  const { isLg } = useMediaQuery();
  const imageD = bannerImage?.imageD;
  const imageM = bannerImage?.imageM;
  const alt = bannerImage?.altText ?? "";
  const srcD = imageD?.url ? `${url}${imageD.url}` : undefined;
  const srcM = imageM?.url ? `${url}${imageM.url}` : srcD;
  const src = isLg ? (srcD ?? srcM) : (srcM ?? srcD);

  // keep the <video> mounted through the fade-out instead of popping it out mid-transition
  if (isActive && !shouldRender) setShouldRender(true);

  useEffect(() => {
    if (isActive) return;
    const timer = setTimeout(() => {
      videoRef.current?.pause();
      setShouldRender(false);
    }, FADE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [isActive]);

  // switching `src` across the lg breakpoint reloads the element, so resume playback
  useEffect(() => {
    if (!isActive) return;
    videoRef.current?.play().catch(() => {});
  }, [src, isActive]);

  const videoStyle = {
    top: `${0 - SCROLL_DISTANCE}px`,
    height: `calc(100% + ${SCROLL_DISTANCE}px)`,
    transform: `translateY(${transY}px)`,
  };

  return (
    <div
      className={`absolute inset-0 ${
        useBorder
          ? "left-5 w-[calc(100%-40px)] rounded-[21px] lg:left-10 lg:w-[calc(100%-80px)] lg:rounded-[30px]"
          : "w-full"
      } ${
        isFullScreen
          ? "h-[calc(100dvh-96px)] lg:h-[calc(100dvh-140px)]"
          : "h-[calc(100dvh-148px)] lg:h-[calc(100dvh-200px)]"
      } overflow-hidden ${className}`}
      style={style}
      data-full-screen={isFullScreen}
    >
      {shouldRender && src && (
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 max-h-[unset] w-full max-w-[unset] transform-gpu object-cover"
          aria-label={alt}
          autoPlay
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          onEnded={isActive ? onEnded : undefined}
          style={videoStyle}
        />
      )}
    </div>
  );
}
