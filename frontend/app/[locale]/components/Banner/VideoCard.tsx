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

  const bgClass =
    "absolute inset-0 object-cover bg-grey-200 max-w-[unset] max-h-[unset]";

  return (
    <div
      className={`absolute left-0 top-0 right-0 bottom-0 ${className}`}
      role="img"
      aria-label={alt}
      data-full-screen={isFullScreen}
    >
      {srcM && (
        <video
          className={`${bgClass} w-[100dvw] ${
            !isFullScreen ? "h-[100dvh]!" : "h-[calc(100dvh-52px)]!"
          } lg:hidden`}
          src={srcM}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
        />
      )}
      {srcD && (
        <video
          className={`${bgClass} rounded-[30px] left-10 right-10 bottom-10 w-[calc(100vw-100px)] ${
            isFullScreen ? "h-[calc(100dvh-140px)]" : "h-[calc(100dvh-200px)]"
          } hidden lg:block`}
          src={srcD}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
        />
      )}
    </div>
  );
}
