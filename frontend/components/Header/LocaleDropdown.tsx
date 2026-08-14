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
  const wrapperRef = useRef<HTMLDivElement>(null);

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
        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-[14px] border-2 border-[var(--header-border)] bg-transparent font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] text-[var(--header-fg)] uppercase transition-colors duration-200 ease-out ${
          invertHover
            ? "hover:bg-green active:bg-green hover:text-white active:text-white"
            : "hover:text-green active:text-green hover:bg-white active:bg-white"
        }`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {LOCALE_LABELS[locale]}
      </button>
      {open && (
        <div
          className="absolute top-[calc(100%+8px)] left-1/2 z-10 flex w-10 -translate-x-1/2 flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          role="listbox"
        >
          {otherLocales.map((loc) => (
            <button
              key={loc}
              type="button"
              className="text-green flex cursor-pointer items-center justify-center border-none bg-transparent py-2 font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] uppercase transition-colors duration-200 ease-out hover:bg-[#e6f1ed]"
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
