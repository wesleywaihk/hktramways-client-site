"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocaleSwitcher, LOCALE_LABELS } from "@/i18n/useLocaleSwitcher";
import { mobileNavLinks } from "./navLinks";
import ChevronIcon from "./ChevronIcon";
import CloseIcon from "./CloseIcon";
import UprightArrowIco from "@/components/icons/UprightArrowIco";

export default function MobileNavOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { locale, locales, switchLocale } = useLocaleSwitcher();
  const [activeParent, setActiveParent] = useState<string | null>(null);

  const handleClose = () => {
    setActiveParent(null);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[1010] bg-black/40 transition-opacity duration-300 ease-in-out ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className={`bg-green fixed top-0 right-0 bottom-0 z-[1011] flex w-full max-w-[393px] flex-col p-5 px-[30px] text-white transition-transform duration-500 ease-in-out ${
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
                className={`border-none bg-transparent font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] text-white uppercase ${
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
            className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center border-none bg-transparent text-white transition-transform duration-200 ease-out hover:scale-90"
            onClick={handleClose}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="mt-16 flex w-full items-start">
          <div className="flex w-full max-w-[333px] flex-col gap-7">
            {mobileNavLinks.map((link) => {
              const hasChildren = !!link.children?.length;
              const isActive = activeParent === link.href;
              const dimmed = !!activeParent && !isActive;

              const content = (
                <>
                  {link.label}
                  {hasChildren && (
                    <ChevronIcon
                      active={isActive}
                      className="h-[22px] w-[22px]"
                    />
                  )}
                  {link.external && (
                    <UprightArrowIco className="h-[22px] w-[22px]" />
                  )}
                </>
              );

              const sharedClassName = `flex items-center justify-between gap-2 font-sans text-[24px] leading-[118%] font-semibold tracking-[0.48px] text-white bg-transparent border-none text-left transition-opacity duration-200 ease-out cursor-pointer ${
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
                    <div className="mt-3 flex flex-col gap-[10px]">
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
        </nav>

        <div className="mt-auto pt-5 font-sans text-[13px] leading-[145%] font-normal tracking-[0.26px] text-white">
          Disclaimer &amp; Privacy Policy
        </div>
      </div>
    </>
  );
}
