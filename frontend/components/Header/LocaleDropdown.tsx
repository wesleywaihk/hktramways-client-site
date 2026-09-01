"use client";

import { useEffect, useRef, useState } from "react";
import { useLocaleSwitcher, LOCALE_LABELS } from "@/i18n/useLocaleSwitcher";

export interface LocaleDropdownProps {
  /** true when this trigger sits on a white background, so hover must invert to stay visible */
  invertHover?: boolean;
}

export default function LocaleDropdown({
  invertHover = false,
}: LocaleDropdownProps) {
  const { locale, locales, switchLocale } = useLocaleSwitcher();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      const hideTimeout = setTimeout(() => setVisible(false), 0);
      const unmountTimeout = setTimeout(() => setMounted(false), 200);
      return () => {
        clearTimeout(hideTimeout);
        clearTimeout(unmountTimeout);
      };
    }
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const otherLocales = locales.filter((loc) => loc !== locale);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-[14px] border-2 bg-transparent font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] text-[var(--header-fg)] uppercase transition-colors duration-200 ease-out ${
          invertHover
            ? "border-green hover:bg-green active:bg-green hover:text-white active:text-white"
            : "hover:text-green active:text-green border-white hover:bg-white active:bg-white"
        }`}
        onClick={() => {
          if (!open) setMounted(true);
          setOpen((v) => !v);
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {LOCALE_LABELS[locale]}
      </button>
      {mounted && (
        <div
          className={`absolute top-[calc(100%+10px)] right-0 z-10 flex w-auto flex-col overflow-hidden rounded-[14px] bg-white py-[13px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-opacity duration-200 ease-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          role="listbox"
        >
          {otherLocales.map((loc) => (
            <button
              key={loc}
              type="button"
              className="text-green flex w-[58px] cursor-pointer items-center justify-center border-none bg-transparent px-[18px] py-[5px] font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] uppercase transition-colors duration-200 ease-out hover:bg-[#e6f1ed]"
              role="option"
              aria-selected={false}
              onClick={() => {
                switchLocale(loc);
                setOpen(false);
              }}
            >
              {LOCALE_LABELS[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
