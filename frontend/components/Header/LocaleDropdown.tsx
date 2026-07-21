"use client";

import { useEffect, useRef, useState } from "react";
import { useLocaleSwitcher, LOCALE_LABELS } from "@/i18n/useLocaleSwitcher";

export default function LocaleDropdown() {
  const { locale, locales, switchLocale } = useLocaleSwitcher();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
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
        className="flex items-center justify-center w-10 h-10 rounded-[14px] border-2 border-[var(--header-border)] bg-transparent text-[var(--header-fg)] font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] uppercase"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {LOCALE_LABELS[locale]}
      </button>
      {open && (
        <div
          className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 flex flex-col w-10 rounded-[14px] overflow-hidden bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-10"
          role="listbox"
        >
          {otherLocales.map((loc) => (
            <button
              key={loc}
              type="button"
              className="flex items-center justify-center py-2 bg-transparent border-none text-green font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] uppercase hover:bg-earth-light"
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
