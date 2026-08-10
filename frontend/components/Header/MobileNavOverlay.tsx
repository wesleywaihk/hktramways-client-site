"use client";

import { useState } from "react";
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
  const [activeParent, setActiveParent] = useState<string | null>(null);

  const activeLink = mobileNavLinks.find((link) => link.href === activeParent);

  const handleClose = () => {
    setActiveParent(null);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[1010] bg-black/40 transition-opacity duration-300 ease-in-out ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 right-0 bottom-0 z-[1011] w-full max-w-[393px] lg:max-w-none lg:w-1/2 flex flex-col p-5 px-[30px] lg:px-20 bg-green text-white transition-transform duration-500 ease-in-out ${
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
                  loc === locale ? "opacity-100" : "opacity-60 lg:opacity-30"
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
            onClick={handleClose}
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

        <nav className="flex items-start gap-16 lg:gap-20 w-full mt-16 lg:mt-[123px]">
          <div className="flex flex-col gap-7 lg:gap-[30px] w-full max-w-[333px] lg:w-[358px] lg:max-w-none lg:shrink-0">
            {mobileNavLinks.map((link) => {
              const hasChildren = !!link.children?.length;
              const isActive = activeParent === link.href;
              const dimmed = !!activeParent && !isActive;

              const content = (
                <>
                  {link.label}
                  {hasChildren && (
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`w-[22px] h-[22px] lg:w-[26px] lg:h-[26px] transition-transform duration-200 ease-out ${isActive ? "rotate-180" : ""}`}
                    >
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
                    <svg viewBox="0 0 16 16" fill="none" className="w-[22px] h-[22px] lg:w-[26px] lg:h-[26px]">
                      <path
                        d="M6 4H12V10M12 4L4 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </>
              );

              const sharedClassName = `flex items-center justify-between gap-2 font-sans text-[24px] leading-[118%] font-semibold tracking-[0.48px] lg:text-[32px] lg:leading-[118%] lg:tracking-[0.64px] text-white bg-transparent border-none text-left transition-opacity duration-200 ease-out cursor-pointer ${
                dimmed ? "opacity-30" : "opacity-100"
              }`;

              return (
                <div key={link.href} className="flex flex-col">
                  {hasChildren ? (
                    <button
                      type="button"
                      className={sharedClassName}
                      onClick={() =>
                        setActiveParent((current) =>
                          current === link.href ? null : link.href,
                        )
                      }
                      aria-expanded={isActive}
                    >
                      {content}
                    </button>
                  ) : (
                    <Link
                      href={`/${locale}${link.href}`}
                      className={sharedClassName}
                      onClick={handleClose}
                    >
                      {content}
                    </Link>
                  )}

                  {hasChildren && isActive && (
                    <div className="flex flex-col gap-[10px] mt-3 lg:hidden">
                      {link.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={`/${locale}${child.href}`}
                          className="font-sans text-[18px] leading-[152.4%] font-normal tracking-[0.36px] text-white"
                          onClick={handleClose}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {activeLink?.children && (
            <div className="hidden lg:flex lg:flex-col lg:gap-5 lg:w-[140px] lg:shrink-0">
              {activeLink.children.map((child) => (
                <Link
                  key={child.href}
                  href={`/${locale}${child.href}`}
                  className="font-sans text-[21px] leading-[152.4%] font-normal tracking-[0.42px] text-white"
                  onClick={handleClose}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </nav>

        <div className="mt-auto pt-5 font-sans text-[13px] leading-[145%] font-normal tracking-[0.26px] text-white">
          Disclaimer &amp; Privacy Policy
        </div>
      </div>
    </>
  );
}
