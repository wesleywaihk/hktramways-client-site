import { IMG_URL } from "@/consts";
import { ResponsiveImage } from "@/types/api";

export interface BannerProps {
  url?: string | null;
  bannerImage?: ResponsiveImage | null;
  className?: string;
  isFullScreen?: boolean;
}

export default function Banner({
  url = IMG_URL,
  bannerImage,
  className = "",
  isFullScreen = false,
}: BannerProps) {
  const imageD = bannerImage?.imageD;
  const imageM = bannerImage?.imageM;

  if (!imageD && !imageM) return null;

  const alt = bannerImage?.altText ?? "";
  const srcD = imageD?.url ? `${url}${imageD.url}` : undefined;
  const srcM = imageM?.url ? `${url}${imageM.url}` : srcD;

  const bgClass = "absolute inset-0 bg-fixed bg-no-repeat bg-center bg-cover";

  return (
    <section
      role="img"
      aria-label={alt}
      // isFullScreen false: news bar is rendered, so header + banner + newsBar = 100dvh
      // isFullScreen true: no news bar, so header + banner = 100dvh
      className={`bg-green relative borderless ${
        !isFullScreen
          ? "h-[calc(100dvh-52px)] lg:h-[calc(100dvh-160px)]"
          : "h-[100dvh] lg:h-[calc(100dvh-100px)]"
      } ${className}`}
    >
      {srcM && (
        <div
          className={`${bgClass} lg:hidden`}
          style={{
            backgroundImage: `url(${srcM})`,
          }}
        />
      )}
      {srcD && (
        <div
          className={`${bgClass} rounded-[30px] left-10 right-10 bottom-10 hidden lg:block`}
          style={{
            backgroundImage: `url(${srcD})`,
          }}
        />
      )}
    </section>
  );
}
