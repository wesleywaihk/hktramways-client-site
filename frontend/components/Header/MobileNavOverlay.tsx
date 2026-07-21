"use client";

import Link from "next/link";
import { useLocaleSwitcher, LOCALE_LABELS } from "@/i18n/useLocaleSwitcher";
import { mobileNavLinks } from "./navLinks";
import styles from "./MobileNavOverlay.module.scss";

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
        className={`${styles.backdrop} ${open ? styles.open : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`${styles.panel} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className={styles.topRow}>
          <div className={styles.localeList}>
            {locales.map((loc) => (
              <button
                key={loc}
                type="button"
                className={`${styles.localeButton} ${loc === locale ? styles.active : ""}`}
                onClick={() => switchLocale(loc)}
              >
                {LOCALE_LABELS[loc]}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.closeButton}
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

        <nav className={styles.navList}>
          {mobileNavLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className={styles.navItem}
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

        <div className={styles.footer}>Disclaimer &amp; Privacy Policy</div>
      </div>
    </>
  );
}
