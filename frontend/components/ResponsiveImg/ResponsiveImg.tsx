import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { IMG_URL } from "@/consts";
import { Media, ResponsiveImage } from "@/types/api";
import { asImage } from "@/lib/media";

type AutoHeight = "to-img" | "to-parent";

export interface ResponsiveImgProps {
  url?: string | null;
  bannerImage?: ResponsiveImage | null;
  className?: string;
  sizes?: string;
  useMultiImg?: boolean;
  isHero?: boolean;
  autoHeightSm?: AutoHeight;
  autoHeightMd?: AutoHeight;
  autoHeightLg?: AutoHeight;
}

function buildSrcSet(banner: Media | null | undefined, url: string | null) {
  if (!banner) return undefined;
  const sizes = [
    ...Object.values(banner.formats ?? {}),
    { url: banner.url, width: banner.width },
  ].sort((a, b) => a.width - b.width);
  return sizes.map((size) => `${url}${size.url} ${size.width}w`).join(", ");
}

export default function ResponsiveImg({
  url = IMG_URL,
  bannerImage,
  className = "",
  sizes = "100vw",
  useMultiImg = true,
  isHero = false,
}: ResponsiveImgProps) {
  const imageD = asImage(bannerImage?.imageD);
  const imageM = asImage(bannerImage?.imageM);
  const alt = bannerImage?.altText ?? "";
  const srcD = imageD?.url;
  const srcM = imageM?.url;

  if (!srcD && !srcM) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-earth-light flex items-center justify-center ${className}`}
      >
        <ImageNotSupportedIcon
          className="text-green-30"
          sx={{ fontSize: 44 }}
        />
      </div>
    );
  }

  const src = `${url}${srcM ?? srcD}`;
  const srcSetD = !useMultiImg ? `${url}${srcD}` : buildSrcSet(imageD, url);
  const srcSetM = !useMultiImg
    ? undefined
    : imageM
      ? buildSrcSet(imageM, url)
      : srcSetD;
  const thumbnail =
    imageM?.formats?.thumbnail?.url ?? imageD?.formats?.thumbnail?.url;

  return (
    <div
      className={`relative flex aspect-auto h-full w-full items-center justify-center overflow-hidden ${className}`}
    >
      <div
        className={`absolute inset-0 z-0 ${thumbnail ? "bg-cover bg-center blur-xl" : "bg-earth-light animate-pulse"}`}
        style={
          thumbnail ? { backgroundImage: `url(${url}${thumbnail})` } : undefined
        }
        aria-hidden="true"
      />

      <picture className="absolute inset-0 z-10 -m-[1px] h-[calc(100%+2px)] w-[calc(100%+2px)]">
        {imageD && (
          <source media="(min-width: 1024px)" srcSet={srcSetD} sizes={sizes} />
        )}
        <img
          src={src}
          srcSet={srcSetM}
          sizes={sizes}
          alt={alt}
          loading={isHero ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
    </div>
  );
}
