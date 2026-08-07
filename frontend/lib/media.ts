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
