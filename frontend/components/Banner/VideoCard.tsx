import { useEffect, useRef, useState } from "react";
import { IMG_URL } from "@/consts";
import { ResponsiveImage } from "@/types/api";
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
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldRender, setShouldRender] = useState(isActive);
  const imageD = bannerImage?.imageD;
  const imageM = bannerImage?.imageM;
  const alt = bannerImage?.altText ?? "";
  const srcD = imageD?.url ? `${url}${imageD.url}` : undefined;
  const srcM = imageM?.url ? `${url}${imageM.url}` : srcD;

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
      {shouldRender && (srcM || srcD) && (
        <video
          className="absolute inset-0 max-h-[unset] w-full max-w-[unset] transform-gpu object-cover"
          aria-label={alt}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          style={videoStyle}
        >
          {srcD && <source src={srcD} media="(min-width: 1024px)" />}
          {srcM && <source src={srcM} />}
        </video>
      )}
    </div>
  );
}
