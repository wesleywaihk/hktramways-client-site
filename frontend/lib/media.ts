import { IMG_URL } from "@/consts";
import { Media } from "@/types/api";

export function isImageMedia(media: Media | null | undefined) {
  return !!media?.mime?.startsWith("image/");
}

export function isVideoMedia(media: Media | null | undefined) {
  return !!media?.mime?.startsWith("video/");
}

export function asImage(media: Media | null | undefined): Media | null {
  return isImageMedia(media) ? media! : null;
}

/** Absolute URL for a CMS media path (Strapi returns relative paths for local uploads). */
export function mediaSrc(url: string) {
  return url.startsWith("http") ? url : `${IMG_URL}${url}`;
}
