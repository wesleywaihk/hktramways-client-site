"use client";

import { useEffect, useRef, useState } from "react";
import { useLocaleSwitcher, LOCALE_LABELS } from "@/i18n/useLocaleSwitcher";
import styles from "./LocaleDropdown.module.scss";

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
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {LOCALE_LABELS[locale]}
      </button>
      {open && (
        <div className={styles.dropdown} role="listbox">
          {otherLocales.map((loc) => (
            <button
              key={loc}
              type="button"
              className={styles.option}
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
