import { IMG_URL } from "@/consts";
import { ResponsiveImage } from "@/types/api";

export interface VideoCardProps {
  bannerImage?: ResponsiveImage | null;
  url?: string | null;
  className?: string;
  isFullScreen?: boolean;
}

export default function VideoCard({
  bannerImage,
  url = IMG_URL,
  className = "",
  isFullScreen = false,
}: VideoCardProps) {
  const imageD = bannerImage?.imageD;
  const imageM = bannerImage?.imageM;
  const alt = bannerImage?.altText ?? "";
  const srcD = imageD?.url ? `${url}${imageD.url}` : undefined;
  const srcM = imageM?.url ? `${url}${imageM.url}` : srcD;

  return (
    <div
      className={`absolute left-0 top-0 right-0 bottom-0 ${className}`}
      role="img"
      aria-label={alt}
      data-full-screen={isFullScreen}
    >
      {(srcM || srcD) && (
        <video
          className={`absolute inset-0 object-cover bg-grey-200 max-w-[unset] max-h-[unset] w-full lg:w-[calc(100%-80px)] lg:left-10 lg:rounded-[30px] ${
            isFullScreen
              ? "h-[100dvh] lg:h-[calc(100dvh-140px)]"
              : "h-[calc(100dvh-52px)] lg:h-[calc(100dvh-200px)]"
          }`}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
        >
          {srcD && <source src={srcD} media="(min-width: 1024px)" />}
          {srcM && <source src={srcM} />}
        </video>
      )}
    </div>
  );
}
