"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const textStyle =
  "block text-center font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] text-green uppercase";

export interface WeChatPopupProps {
  icon: string;
  className?: string;
}

export default function WeChatPopup({
  icon,
  className = "",
}: WeChatPopupProps) {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        aria-label="WeChat"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`cursor-pointer border-0 bg-transparent ${className}`}
      >
        <Image src={icon} alt="" width={32} height={32} aria-hidden="true" />
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="WeChat QR code"
          className="absolute bottom-[calc(100%+10px)] left-1/2 z-50 box-border flex h-[214px] w-[210px] -translate-x-1/2 flex-col items-center justify-between rounded-[21px] bg-white p-5 shadow-[0px_5px_20px_0px_#00000033]"
        >
          <span className={textStyle}>{t("footerWeChatFollowUs")}</span>
          <Image
            src="/footer/wechat-qr.png"
            alt=""
            width={120}
            height={120}
            aria-hidden="true"
          />
          <span className={textStyle}>{t("footerWeChatCaption")}</span>
        </div>
      )}
    </div>
  );
}
