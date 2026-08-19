import { IMG_URL } from "@/consts";
import { ResponsiveImage } from "@/types/api";
import { SCROLL_DISTANCE } from "./Banner";
export interface ImageCardProps {
  bannerImage?: ResponsiveImage | null;
  url?: string | null;
  className?: string;
  transY?: number;
  style?: React.CSSProperties;
  useBorder?: boolean;
}

export default function ImageCard({
  bannerImage,
  url = IMG_URL,
  className = "",
  transY = 0,
  style = {},
  useBorder = true,
}: ImageCardProps) {
  const imageD = bannerImage?.imageD;
  const imageM = bannerImage?.imageM;
  const alt = bannerImage?.altText ?? "";
  const srcD = imageD?.url ? `${url}${imageD.url}` : undefined;
  const srcM = imageM?.url ? `${url}${imageM.url}` : srcD;

  const bgClass =
    "absolute inset-0 bottom-0 bg-no-repeat bg-center bg-cover transform-gpu";

  const bgStyle = {
    top: `${0 - SCROLL_DISTANCE}px`,
    transform: `translateY(${transY}px)`,
  };

  return (
    <div
      className={`absolute top-0 overflow-hidden ${
        useBorder
          ? "right-5 bottom-5 left-5 rounded-[21px] lg:right-10 lg:bottom-10 lg:left-10 lg:rounded-[30px]"
          : "right-0 bottom-0 left-0"
      } ${className}`}
      role="img"
      aria-label={alt}
      style={style}
    >
      {srcM && (
        <div
          className={`${bgClass} lg:hidden`}
          style={{
            backgroundImage: `url(${srcM})`,
            ...bgStyle,
          }}
        />
      )}
      {srcD && (
        <div
          className={`${bgClass} hidden lg:block`}
          style={{
            backgroundImage: `url(${srcD})`,
            ...bgStyle,
          }}
        />
      )}
    </div>
  );
}
