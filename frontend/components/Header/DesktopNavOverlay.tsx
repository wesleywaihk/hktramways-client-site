"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocaleSwitcher, LOCALE_LABELS } from "@/i18n/useLocaleSwitcher";
import { mobileNavLinks } from "./navLinks";
import ChevronIcon from "@/components/icons/ChevronIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import UprightArrowIco from "@/components/icons/UprightArrowIco";

export default function DesktopNavOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("common");
  const { locale, locales, switchLocale } = useLocaleSwitcher();
  const [activeParent, setActiveParent] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const activeLink = mobileNavLinks.find((link) => link.href === activeParent);

  const handleClose = () => {
    setActiveParent(null);
    setHoveredLink(null);
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
        className={`bg-green fixed top-0 right-0 bottom-0 z-[1011] flex w-3/4 max-w-[800px] flex-col p-[50px] pr-15 pl-20 text-white transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <div className="-ml-2 flex items-center gap-3">
            {locales.map((loc) => (
              <button
                key={loc}
                type="button"
                className={`border-none bg-transparent px-2 font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] text-white uppercase transition-opacity duration-100 ${
                  loc === locale
                    ? "opacity-100"
                    : "cursor-pointer opacity-30 hover:opacity-100"
                }`}
                onClick={() => switchLocale(loc)}
              >
                {LOCALE_LABELS[loc]}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="flex h-[26px] w-[26px] translate-x-5 -translate-y-[3px] cursor-pointer items-center justify-center border-none bg-transparent text-white transition-transform duration-200 ease-in-out hover:scale-110"
            onClick={handleClose}
            aria-label={t("navCloseMenu")}
          >
            <CloseIcon />
          </button>
        </div>

        <nav
          className="relative mt-[90px] flex w-full items-start gap-20"
          onMouseLeave={() => {
            setActiveParent(null);
            setHoveredLink(null);
          }}
        >
          <div className="flex w-full flex-col gap-[30px]">
            {mobileNavLinks.map((link) => {
              const hasChildren = !!link.children?.length;
              const isHovered = hoveredLink === link.href;
              const dimmed = !!hoveredLink && !isHovered;

              const content = (
                <>
                  {t(link.labelKey)}
                  {hasChildren && (
                    <ChevronIcon desktop className="h-[26px] w-[26px]" />
                  )}
                  {link.external && (
                    <UprightArrowIco className="h-[26px] w-[26px]" />
                  )}
                </>
              );

              return (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className={`inline-flex w-auto max-w-[56%] shrink-0 cursor-pointer items-center gap-2 self-start border-none bg-transparent pr-4 text-left font-sans text-[32px] leading-[118%] font-semibold tracking-[0.64px] text-white transition-opacity duration-200 ease-out ${
                    dimmed ? "opacity-30" : "opacity-100"
                  }`}
                  onClick={handleClose}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onMouseEnter={() => {
                    setHoveredLink(link.href);
                    setActiveParent(hasChildren ? link.href : null);
                  }}
                >
                  {content}
                </Link>
              );
            })}
          </div>

          {activeLink?.children && (
            <div className="bg-red! absolute right-0 flex w-[34%] max-w-[222px] flex-col gap-5">
              {activeLink.children.map((child) => (
                <Link
                  key={child.href}
                  href={`/${locale}${child.href}`}
                  className="bg-red! font-sans text-[21px] leading-[152.4%] font-normal tracking-[0.42px] text-white"
                  onClick={handleClose}
                >
                  {t(child.labelKey)}
                </Link>
              ))}
            </div>
          )}
        </nav>

        <div className="mt-auto pt-5 font-sans text-[13px] leading-[145%] font-normal tracking-[0.26px] text-white">
          {t("navDisclaimerPrivacy")}
        </div>
      </div>
    </>
  );
}
