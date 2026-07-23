import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { API_URL } from "@/consts";
import { HomeBanner, HomeBannerImage } from "@/types/api";

export interface ResponsiveImgProps {
  url?: string | null;
  bannerImage?: HomeBannerImage | null;
  className?: string;
  sizes?: string;
}

function buildSrcSet(
  banner: HomeBanner | null | undefined,
  url: string | null,
) {
  if (!banner) return undefined;
  const sizes = [
    ...Object.values(banner.formats ?? {}),
    { url: banner.url, width: banner.width },
  ].sort((a, b) => a.width - b.width);
  return sizes.map((size) => `${url}${size.url} ${size.width}w`).join(", ");
}

export default function ResponsiveImg({
  url = API_URL,
  bannerImage,
  className = "",
  sizes = "100vw",
}: ResponsiveImgProps) {
  const bannerD = bannerImage?.bannerD;
  const bannerM = bannerImage?.bannerM;
  const alt = bannerImage?.altText ?? "";
  const srcD = bannerD?.url;
  const srcM = bannerM?.url;

  if (!srcD && !srcM) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-earth-light ${className}`}
      >
        <ImageNotSupportedIcon
          className="text-green-30"
          sx={{ fontSize: 44 }}
        />
      </div>
    );
  }

  const src = `${url}${srcM ?? srcD}`;
  const srcSetD = buildSrcSet(bannerD, url);
  const srcSetM = bannerM ? buildSrcSet(bannerM, url) : srcSetD;
  const thumbnail =
    bannerM?.formats?.thumbnail?.url ?? bannerD?.formats?.thumbnail?.url;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 bg-earth-light bg-cover bg-center blur-xl z-0"
        style={
          thumbnail ? { backgroundImage: `url(${url}${thumbnail})` } : undefined
        }
        aria-hidden="true"
      />
      <picture className="absolute inset-0 z-10 h-[calc(100%+2px)] w-[calc(100%+2px)] -m-[1px]">
        {bannerD && (
          <source media="(min-width: 1024px)" srcSet={srcSetD} sizes={sizes} />
        )}
        <img
          src={src}
          srcSet={srcSetM}
          sizes={sizes}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>
    </div>
  );
}
