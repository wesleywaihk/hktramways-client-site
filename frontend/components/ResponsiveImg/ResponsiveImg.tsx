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
        className={`flex items-center justify-center bg-gray-100 ${className}`}
      >
        <ImageNotSupportedIcon
          className="text-gray-300"
          sx={{ fontSize: 48 }}
        />
      </div>
    );
  }

  return (
    <picture>
      {srcD && <source media="(min-width: 1024px)" srcSet={`${url}${srcD}`} />}
      <img
        src={`${url}${srcM ?? srcD}`}
        alt={alt ?? ""}
        className={className}
      />
    </picture>
  );
}
