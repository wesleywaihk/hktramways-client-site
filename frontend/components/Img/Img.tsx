import { IMG_URL } from "@/consts";

export interface ImgProps {
  url?: string | null;
  src?: string | null;
  alt?: string | null;
  className?: string;
}

export default function Img({
  url = IMG_URL,
  src,
  alt = "",
  className = "",
}: ImgProps) {
  if (!src) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- intentionally unoptimized, non-responsive image
    <img
      src={`${url}${src}`}
      alt={alt ?? ""}
      loading="lazy"
      className={className}
    />
  );
}
