"use client";

import Link from "next/link";
import { useLocaleSwitcher, LOCALE_LABELS } from "@/i18n/useLocaleSwitcher";
import { mobileNavLinks } from "./navLinks";

export default function MobileNavOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { locale, locales, switchLocale } = useLocaleSwitcher();

  return (
    <>
      <div
        className={`fixed inset-0 z-[1010] bg-black/40 transition-opacity duration-300 ease-in-out ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 right-0 bottom-0 z-[1011] w-full max-w-[393px] flex flex-col p-5 px-[30px] bg-green text-white transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {locales.map((loc) => (
              <button
                key={loc}
                type="button"
                className={`font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] uppercase text-white bg-transparent border-none ${
                  loc === locale ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => switchLocale(loc)}
              >
                {LOCALE_LABELS[loc]}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-[26px] h-[26px] bg-transparent border-none text-white"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path
                d="M5 5L21 21M21 5L5 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-7 w-full max-w-[333px] mt-[120px]">
          {mobileNavLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="flex items-center justify-between gap-2 font-sans text-[24px] leading-[118%] font-semibold tracking-[0.02em] text-white"
              onClick={onClose}
            >
              {link.label}
              {link.hasChevron && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {link.external && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 4H12V10M12 4L4 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-5 font-sans text-[13px] leading-[145%] font-normal text-white">
          Disclaimer &amp; Privacy Policy
        </div>
      </div>
    </>
  );
}
