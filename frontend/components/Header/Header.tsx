"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { desktopNavLinks } from "./navLinks";
import MobileNavOverlay from "./MobileNavOverlay";
import LocaleDropdown from "./LocaleDropdown";

export type HeaderVariant = "green" | "white";

// Color scheme is driven by CSS custom properties so descendants (nav
// links, LocaleDropdown, hamburger) can pick up the right color without
// each needing a `variant` prop of their own.
const HEADER_VARS: Record<HeaderVariant, React.CSSProperties> = {
  green: {
    "--header-bg": "var(--color-green)",
    "--header-fg": "var(--color-white)",
    "--header-border": "var(--color-white)",
  } as React.CSSProperties,
  white: {
    "--header-bg": "var(--color-white)",
    "--header-fg": "var(--color-green)",
    "--header-border": "var(--color-green)",
  } as React.CSSProperties,
};

export default function Header({ variant = "green" }: { variant?: HeaderVariant }) {
  const locale = useLocale();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-[var(--header-bg)] text-[var(--header-fg)]"
      style={HEADER_VARS[variant]}
    >
      <div className="flex items-center justify-between p-5 lg:py-[30px] lg:px-10">
        <Link
          href={`/${locale}`}
          className="flex items-center shrink-0 min-w-[120.33px] h-9 mr-5 lg:min-w-[133.7px] lg:h-10 lg:mr-10"
        >
          <Image
            src="/logo-white.svg"
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
            <span className="block w-full h-0.5 bg-[var(--header-fg)]" />
            <span className="block w-full h-0.5 bg-[var(--header-fg)]" />
            <span className="block w-full h-0.5 bg-[var(--header-fg)]" />
          </button>
        </div>
      </div>

      <MobileNavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
    </header>
  );
}
