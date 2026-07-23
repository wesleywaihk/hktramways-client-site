import ImageIcon from "@mui/icons-material/Image";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { API_URL } from "@/consts";

export interface ResponsiveImgProps {
  url?: string | null;
  srcD?: string | null;
  srcM?: string | null;
  alt?: string | null;
  className?: string;
}

export default function ResponsiveImg({
  url = API_URL,
  srcD,
  srcM,
  alt,
  className = "",
}: ResponsiveImgProps) {
  if (!srcD && !srcM) {
    return (
      <div
        role="img"
        aria-label={alt ?? ""}
        className={`flex items-center justify-center bg-earth-light ${className}`}
      >
        <ImageNotSupportedIcon
          className="text-green-30"
          sx={{ fontSize: 44 }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 bg-earth-light animate-pulse z-0"
        aria-hidden="true"
      >
        <ImageIcon
          className="absolute inset-0 m-auto text-green-30"
          sx={{ fontSize: 44 }}
        />
      </div>
      <picture className="absolute inset-0 z-10 h-[calc(100%+2px)] w-[calc(100%+2px)] -m-[1px]">
        {srcD && (
          <source media="(min-width: 1024px)" srcSet={`${url}${srcD}`} />
        )}
        <img
          src={`${url}${srcM ?? srcD}`}
          alt={alt ?? ""}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>
    </div>
  );
}
