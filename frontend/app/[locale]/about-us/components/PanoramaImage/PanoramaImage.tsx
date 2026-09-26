"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { fetchAboutUsPanoramaImages } from "@/hooks/useApiEndpoint/api";
import { devClassName } from "@/lib/devClassName";
import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";
import type { Media } from "@/types/api";
import "./PanoramaImage.scss";

/** Scroll speed in pixels per second (same visual speed on mobile and desktop). */
const SPEED_PX_PER_SECOND = 40;

const HEIGHT_MOBILE = 250;
const HEIGHT_DESKTOP = 550;

// The image set is repeated until one tile is at least this wide on desktop,
// so wide screens never see the end of a tile before the loop resets.
const MIN_TILE_WIDTH = 2560;

const SECTION_CLASS = `${devClassName("panorama-image")}borderless h-[250px] overflow-hidden lg:h-[550px]`;

export interface PanoramaImageProps {
  locale: string;
}

export default function PanoramaImage({ locale }: PanoramaImageProps) {
  // undefined = still loading; null = no panorama images
  const [images, setImages] = useState<Media[] | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when `locale` changes before the refetch resolves
    setImages(undefined);

    fetchAboutUsPanoramaImages(locale)
      .then((result) => {
        if (!cancelled) setImages(result);
      })
      .catch(() => {
        if (!cancelled) setImages(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  // Hold the final height while loading so the page doesn't jump.
  if (images === undefined) {
    return (
      <section
        className={`${SECTION_CLASS} bg-earth-light animate-pulse`}
        role="status"
        aria-label="Loading"
      />
    );
  }

  const valid = (images ?? []).filter(
    (image) => image?.url && image.width && image.height,
  );
  if (!valid.length) return null;

  // Width of one pass through the images at 1px height.
  const aspectSum = valid.reduce(
    (sum, image) => sum + image.width / image.height,
    0,
  );
  const repeats = Math.max(
    1,
    Math.ceil(MIN_TILE_WIDTH / (aspectSum * HEIGHT_DESKTOP)),
  );
  const tile = Array.from({ length: repeats }, () => valid).flat();

  // One loop = scrolling one tile's width; duration keeps the speed constant.
  const tileAspect = aspectSum * repeats;
  const style = {
    "--panorama-duration-m": `${(tileAspect * HEIGHT_MOBILE) / SPEED_PX_PER_SECOND}s`,
    "--panorama-duration-d": `${(tileAspect * HEIGHT_DESKTOP) / SPEED_PX_PER_SECOND}s`,
    animation: "panorama-scroll var(--panorama-duration) linear infinite",
  } as CSSProperties;

  return (
    <section className={SECTION_CLASS}>
      <div
        className="flex h-full w-max [--panorama-duration:var(--panorama-duration-m)] motion-reduce:[animation-play-state:paused]! lg:[--panorama-duration:var(--panorama-duration-d)]"
        style={style}
      >
        {[0, 1].map((copy) =>
          tile.map((image, index) => {
            // Only the first pass is announced; the repeats exist for the loop.
            const isOriginal = copy === 0 && index < valid.length;
            const aspect = image.width / image.height;
            return (
              <div
                key={`${copy}-${index}`}
                aria-hidden={isOriginal ? undefined : true}
                className="h-full shrink-0 select-none"
                style={{ aspectRatio: `${image.width} / ${image.height}` }}
              >
                <ResponsiveImg
                  bannerImage={{
                    id: image.id,
                    altText: isOriginal ? image.alternativeText : null,
                    imageD: image,
                    imageM: null,
                  }}
                  sizes={`(min-width: 1024px) ${Math.ceil(aspect * HEIGHT_DESKTOP)}px, ${Math.ceil(aspect * HEIGHT_MOBILE)}px`}
                />
              </div>
            );
          }),
        )}
      </div>
    </section>
  );
}
