"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { desktopNavLinks } from "./navLinks";
import MobileNavOverlay from "./MobileNavOverlay";
import LocaleDropdown from "./LocaleDropdown";
import { useHeaderStyle } from "@/components/HeaderStyleProvider";
import styles from "./Header.module.scss";

export default function Header() {
  const locale = useLocale();
  const [navOpen, setNavOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const { headerStyle } = useHeaderStyle();

  useEffect(() => {
    const handleScroll = () => setAtTop(window.scrollY <= 120);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderHeaderContent = (
    logoSrc: string,
    logoClassName: string,
    alignClassName = "items-center",
  ) => (
    <div
      className={`flex ${alignClassName} justify-between p-5 lg:py-[30px] lg:px-10`}
    >
      <Link
        href={`/${locale}`}
        className={`flex items-center shrink-0 mr-5 lg:mr-10 ${logoClassName}`}
      >
        <Image
          src={logoSrc}
          alt="HK Tramways"
          width={134}
          height={40}
          priority
          className="w-full h-full"
        />
      </Link>

      <div className="hidden lg:flex lg:items-center lg:gap-10">
        <nav className="flex items-center gap-[30px]">
          {desktopNavLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] uppercase whitespace-nowrap text-[var(--header-fg)] hover:opacity-80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop: inline nav is already visible, so the language control is a dropdown, no hamburger */}
        <div className="flex items-center">
          <LocaleDropdown />
        </div>
      </div>

      {/* Mobile: collapsed to a language toggle + hamburger, both open the slide-in nav overlay */}
      <div className="flex items-center gap-5 lg:hidden">
        <button
          type="button"
          className="flex items-center justify-center w-9 h-9 rounded-xl border-2 border-[var(--header-border)] bg-transparent text-[var(--header-fg)] font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] uppercase"
          onClick={() => setNavOpen(true)}
          aria-label="Language"
        >
          {locale === "en" ? "EN" : locale === "zh-HK" ? "繁" : "简"}
        </button>
        <button
          type="button"
          className="flex flex-col justify-center items-center gap-2 w-[22px] h-9 bg-transparent border-none"
          onClick={() => setNavOpen(true)}
          aria-label="Open menu"
          aria-expanded={navOpen}
        >
          <span className="block w-full h-0.5 bg-white" />
          <span className="block w-full h-0.5 bg-white" />
          <span className="block w-full h-0.5 bg-white" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={`sticky top-0 z-[1001] w-full bg-green text-white ${styles.header} ${styles[`style-${headerStyle}`]} ${atTop ? styles.top : ""}`}
      >
        {renderHeaderContent(
          "/logo-white.svg",
          "min-w-[120.33px] h-9 lg:min-w-[133.7px] lg:h-10",
        )}
      </header>

      {headerStyle === "transparent" && (
        <header
          className={`absolute top-0 z-[1000] w-full h-[200px] text-white lg:hidden ${styles.transparentHeader}`}
        >
          {renderHeaderContent("/logo-v.svg", "h-[110px]", "items-start")}
        </header>
      )}

      <MobileNavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
    </>
  );
}
