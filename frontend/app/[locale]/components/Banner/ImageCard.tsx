import { IMG_URL } from "@/consts";
import { ResponsiveImage } from "@/types/api";

export interface ImageCardProps {
  bannerImage?: ResponsiveImage | null;
  url?: string | null;
  className?: string;
}

export default function ImageCard({
  bannerImage,
  url = IMG_URL,
  className = "",
}: ImageCardProps) {
  const imageD = bannerImage?.imageD;
  const imageM = bannerImage?.imageM;
  const alt = bannerImage?.altText ?? "";
  const srcD = imageD?.url ? `${url}${imageD.url}` : undefined;
  const srcM = imageM?.url ? `${url}${imageM.url}` : srcD;

  const bgClass = "absolute inset-0 bg-fixed bg-no-repeat bg-center bg-cover";

  return (
    <div
      className={`absolute left-0 top-0 right-0 bottom-0 ${className}`}
      role="img"
      aria-label={alt}
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
    </div>
  );
}
