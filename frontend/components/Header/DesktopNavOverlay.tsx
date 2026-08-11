"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocaleSwitcher, LOCALE_LABELS } from "@/i18n/useLocaleSwitcher";
import { mobileNavLinks } from "./navLinks";
import ChevronIcon from "./ChevronIcon";
import CloseIcon from "./CloseIcon";
import UprightArrowIco from "@/components/icons/UprightArrowIco";

export default function DesktopNavOverlay({
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
        className={`fixed top-0 right-0 bottom-0 z-[1011] w-1/2 flex flex-col p-5 px-20 bg-green text-white transition-transform duration-500 ease-in-out ${
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
                  loc === locale ? "opacity-100" : "opacity-30"
                }`}
                onClick={() => switchLocale(loc)}
              >
                {LOCALE_LABELS[loc]}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-[26px] h-[26px] bg-transparent border-none text-white cursor-pointer transition-transform duration-200 ease-out hover:scale-90"
            onClick={handleClose}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav
          className="flex items-start gap-20 w-full mt-[123px]"
          onMouseLeave={() => setActiveParent(null)}
        >
          <div className="flex flex-col gap-[30px] w-[358px] shrink-0">
            {mobileNavLinks.map((link) => {
              const hasChildren = !!link.children?.length;
              const isActive = activeParent === link.href;
              const dimmed = !!activeParent && !isActive;

              const content = (
                <>
                  {link.label}
                  {hasChildren && (
                    <ChevronIcon desktop className="w-[26px] h-[26px]" />
                  )}
                  {link.external && (
                    <UprightArrowIco className="w-[26px] h-[26px]" />
                  )}
                </>
              );

              const sharedClassName = `flex items-center justify-between gap-2 font-sans text-[32px] leading-[118%] font-semibold tracking-[0.64px] text-white bg-transparent border-none text-left transition-opacity duration-200 ease-out cursor-pointer ${
                dimmed ? "opacity-30" : "opacity-100"
              }`;

              return (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className={sharedClassName}
                  onClick={handleClose}
                  onMouseEnter={() =>
                    setActiveParent(hasChildren ? link.href : null)
                  }
                >
                  {content}
                </Link>
              );
            })}
          </div>

          {activeLink?.children && (
            <div className="flex flex-col gap-5 w-[140px] shrink-0">
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
