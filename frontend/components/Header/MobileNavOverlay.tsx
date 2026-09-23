"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocaleSwitcher, LOCALE_LABELS } from "@/i18n/useLocaleSwitcher";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { mobileNavLinks } from "./navLinks";
import ChevronIcon from "@/components/icons/ChevronIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import UprightArrowIco from "@/components/icons/UprightArrowIco";
import type { GlobalMainNavExtLink, Hyperlink } from "@/types/api";

export default function MobileNavOverlay({
  open,
  onClose,
  mainNavExtLink = null,
}: {
  open: boolean;
  onClose: () => void;
  mainNavExtLink?: GlobalMainNavExtLink | null;
}) {
  const t = useTranslations("common");
  const { locale, locales, switchLocale } = useLocaleSwitcher();
  const [activeParent, setActiveParent] = useState<string | null>(null);

  useLockBodyScroll(open);

  const handleClose = () => {
    setActiveParent(null);
    onClose();
  };

  const extraLinks = [
    mainNavExtLink?.extLink1?.link?.url
      ? {
          key: "extLink1",
          label: mainNavExtLink.extLink1.label ?? "",
          link: mainNavExtLink.extLink1.link,
        }
      : null,
    mainNavExtLink?.extLink2?.link?.url
      ? {
          key: "extLink2",
          label: mainNavExtLink.extLink2.label ?? "",
          link: mainNavExtLink.extLink2.link,
        }
      : null,
  ].filter(
    (link): link is { key: string; label: string; link: Hyperlink } =>
      Boolean(link),
  );

  return (
    <>
      <div
        className={`fixed inset-0 z-[1010] bg-black/80 transition-opacity duration-300 ease-in-out ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className={`bg-green fixed inset-0 z-[1011] flex w-full flex-col pt-7.5 text-white transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="flex shrink-0 items-center justify-between px-[30px]">
          <div className="flex items-center gap-3">
            {locales.map((loc) => (
              <button
                key={loc}
                type="button"
                className={`border-none bg-transparent font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] text-white uppercase transition-opacity duration-100 ${
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
            className="flex h-[26px] w-[26px] translate-x-2.5 -translate-y-[3px] cursor-pointer items-center justify-center border-none bg-transparent text-white transition-transform duration-200 ease-out hover:scale-110"
            onClick={handleClose}
            aria-label={t("navCloseMenu")}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mt-16 flex min-h-0 flex-1 flex-col overflow-y-auto px-[30px] pb-7.5">
          <nav className="flex w-full items-start">
            <div className="flex w-full max-w-[333px] flex-col gap-7">
              {mobileNavLinks.map((link) => {
                if (link.isCareersLink && !mainNavExtLink?.careersLink)
                  return null;

                const hasChildren = !!link.children?.length;
                const isActive = activeParent === link.href;
                const dimmed = !!activeParent && !isActive;
                const isExternal = link.external || link.isCareersLink;

                const content = (
                  <>
                    {t(link.labelKey)}
                    {hasChildren && (
                      <ChevronIcon
                        active={isActive}
                        className="h-[22px] w-[22px]"
                      />
                    )}
                    {isExternal && (
                      <UprightArrowIco className="h-[22px] w-[22px]" />
                    )}
                  </>
                );

                const sharedClassName = `flex items-center justify-start gap-[3px] font-sans text-[24px] leading-[118%] font-semibold tracking-[0.48px] text-white bg-transparent border-none text-left transition-opacity duration-200 ease-out cursor-pointer ${
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
                    ) : link.isCareersLink ? (
                      <a
                        href={mainNavExtLink?.careersLink ?? undefined}
                        className={sharedClassName}
                        onClick={handleClose}
                        target="_blank"
                        rel="noopener"
                      >
                        {content}
                      </a>
                    ) : (
                      <Link
                        href={`/${locale}${link.href}`}
                        className={sharedClassName}
                        onClick={handleClose}
                      >
                        {content}
                      </Link>
                    )}

                    {hasChildren && (
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="flex flex-col gap-[10px] overflow-hidden pt-3">
                          {link.children!.map((child) => (
                            <Link
                              key={child.href}
                              href={`/${locale}${child.href}`}
                              className="font-sans text-[18px] leading-[152.4%] font-normal tracking-[0.36px] text-white"
                              onClick={handleClose}
                            >
                              {t(child.labelKey)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {extraLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.link.url ?? undefined}
                  className="flex items-center justify-start gap-[3px] border-none bg-transparent text-left font-sans text-[24px] leading-[118%] font-semibold tracking-[0.48px] text-white opacity-100 transition-opacity duration-200 ease-out"
                  onClick={handleClose}
                  target={link.link.openNewWindow ? "_blank" : undefined}
                  rel={
                    link.link.openNewWindow && link.link.noRefer
                      ? "nofollow noreferrer"
                      : undefined
                  }
                >
                  {link.label}
                  <UprightArrowIco className="h-[22px] w-[22px]" />
                </a>
              ))}
            </div>
          </nav>

          <div className="mt-auto pt-5 font-sans text-[13px] leading-[145%] font-normal tracking-[0.26px] text-white">
            {t("navDisclaimerPrivacy")}
          </div>
        </div>
      </div>
    </>
  );
}
