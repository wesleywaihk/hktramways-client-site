"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import Image from "next/image";
import CloseIcon from "@/components/icons/CloseIcon";
import { devClassName } from "@/lib/devClassName";
import { asImage, mediaSrc } from "@/lib/media";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import type { NextTramDialogData } from "@/types/api";

export interface AppStoreLinks {
  appStoreLink: string | null;
  googlePlayLink: string | null;
}

export interface NextTramDialogProps extends AppStoreLinks {
  data: NextTramDialogData;
  onClose: () => void;
}

/** "Download the app" dialog opened from the station popup's Next Tram button. */
export default function NextTramDialog({
  data,
  appStoreLink,
  googlePlayLink,
  onClose,
}: NextTramDialogProps) {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);
  const image = asImage(data.image?.[0]);

  useLockBodyScroll(true);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  // Portalled: the station popup is transformed, which would trap `fixed` children inside it.
  return createPortal(
    <div
      className={`${devClassName("next-tram-dialog")}fixed inset-0 z-[1020] flex items-center justify-center bg-black/80 p-5 transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="next-tram-dialog-title"
        className={`bg-green-light relative flex max-h-full w-full max-w-[400px] flex-col items-center overflow-y-auto rounded-[21px] px-5 pt-[50px] pb-[30px] text-center text-white transition-transform duration-300 ease-in-out lg:max-w-[480px] lg:px-10 lg:pb-10 ${
          visible ? "translate-y-0" : "translate-y-2"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute top-4 right-4 cursor-pointer text-white transition-transform duration-200 ease-in-out hover:scale-110"
        >
          <CloseIcon className="h-[22px] w-[22px]" />
        </button>

        {image && (
          <Image
            src={mediaSrc(image.url)}
            alt={image.alternativeText ?? ""}
            width={image.width}
            height={image.height}
            className="h-auto w-[60%] max-w-[220px]"
          />
        )}

        <h2
          id="next-tram-dialog-title"
          className="mt-5 font-sans text-[28px] leading-[118%] font-semibold tracking-[0.02em] lg:text-[32px]"
        >
          {data.title}
        </h2>
        <p className="mt-3 text-[13px] leading-[160%] tracking-[0.02em] text-white/90 lg:text-[14px]">
          {data.desc}
        </p>

        {(appStoreLink || googlePlayLink) && (
          <div className="mt-5 flex flex-wrap justify-center gap-[10px]">
            {appStoreLink && (
              <a href={appStoreLink} target="_blank" rel="noopener noreferrer">
                <Image
                  src="/footer/appStore.png"
                  alt="Download on the App Store"
                  width={140}
                  height={46}
                  className="h-auto w-[130px]"
                />
              </a>
            )}
            {googlePlayLink && (
              <a
                href={googlePlayLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/footer/googlePlay.png"
                  alt="Get it on Google Play"
                  width={140}
                  height={46}
                  className="h-auto w-[130px]"
                />
              </a>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
