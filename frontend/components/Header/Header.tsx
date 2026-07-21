"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { desktopNavLinks } from "./navLinks";
import MobileNavOverlay from "./MobileNavOverlay";
import LocaleDropdown from "./LocaleDropdown";
import styles from "./Header.module.scss";

export type HeaderVariant = "green" | "white";

export default function Header({ variant = "green" }: { variant?: HeaderVariant }) {
  const locale = useLocale();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className={styles.header} data-variant={variant}>
      <div className={styles.inner}>
        <Link href={`/${locale}`} className={styles.logo}>
          <Image
            src="/logo-white.svg"
            alt="HK Tramways"
            width={134}
            height={40}
            priority
          />
        </Link>

        <div className={styles.desktopRightGroup}>
          <nav className={styles.nav}>
            {desktopNavLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className={styles.navLink}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop: inline nav is already visible, so the language control is a dropdown, no hamburger */}
          <div className={styles.desktopMenuCluster}>
            <LocaleDropdown />
          </div>
        </div>

        {/* Mobile: collapsed to a language toggle + hamburger, both open the slide-in nav overlay */}
        <div className={styles.mobileMenuCluster}>
          <button
            type="button"
            className={styles.langToggle}
            onClick={() => setNavOpen(true)}
            aria-label="Language"
          >
            {locale === "en" ? "EN" : locale === "zh-HK" ? "繁" : "简"}
          </button>
          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setNavOpen(true)}
            aria-label="Open menu"
            aria-expanded={navOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <MobileNavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
    </header>
  );
}
