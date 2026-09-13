import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { desktopNavLinks } from "./navLinks";
import LocaleDropdown from "./LocaleDropdown";
import HamburgerIcon from "./HamburgerIcon";
import { devClassName } from "@/lib/devClassName";

export interface HeaderContentProps {
  locale: string;
  navOpen: boolean;
  onOpenNav: () => void;
  logoSrc: string;
  logoClassName?: string;
  // alignClassName?: string;
  className?: string;
  /** true when this header sits on a white background, so the lang button's hover state must invert to stay visible */
  invertLangHover?: boolean;
}

export default function HeaderContent({
  locale,
  navOpen,
  onOpenNav,
  logoSrc,
  logoClassName = "",
  // alignClassName = "items-center",
  className = "",
  invertLangHover = false,
}: HeaderContentProps) {
  const t = useTranslations("common");
  return (
    <div
      className={`${devClassName("header-content")}flex pageBorder w-full items-center justify-between self-center py-[clamp(1rem,1.3889vw,1.875rem)] ${className}`}
    >
      <Link
        href={`/${locale}`}
        className={`flex w-[clamp(6.65rem,9.2361111111vw,12.46875rem)] shrink-0 items-center ${logoClassName}`}
        // mr-5 lg:mr-10
      >
        <Image
          src={logoSrc}
          alt="HK Tramways"
          width={134}
          height={40}
          priority
          className="h-auto w-full"
        />
      </Link>

      <div className="flex items-center gap-[clamp(1rem,1.3888888889vw,1.875rem)]">
        <div className="hidden gap-[clamp(1rem,1.3888888889vw,1.875rem)] lg:flex lg:items-center">
          <nav className="mr-[clamp(0.5rem,0.6944444444vw,0.9375rem)] flex items-center gap-[clamp(1.5rem,2.0833333333vw,2.8125rem)]">
            {desktopNavLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="group relative font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] whitespace-nowrap text-[var(--header-fg)] uppercase"
              >
                {t(link.labelKey)}
                <span className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 transform-gpu bg-current/30 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <LocaleDropdown invertHover={invertLangHover} />
          </div>
        </div>

        {/* Language toggle + hamburger, both open the slide-in nav overlay. Hamburger stays visible on desktop alongside the horizontal nav */}
        <button
          type="button"
          className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border-2 bg-transparent font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] text-[var(--header-fg)] uppercase transition-colors duration-200 ease-out lg:hidden ${
            invertLangHover
              ? "border-green hover:border-green active:border-green hover:bg-green active:bg-green hover:text-white active:text-white"
              : "hover:text-green active:text-green border-white hover:border-white hover:bg-white active:border-white active:bg-white"
          }`}
          onClick={onOpenNav}
          aria-label={t("navLanguage")}
        >
          {locale === "en" ? "EN" : locale === "zh-HK" ? "繁" : "简"}{" "}
        </button>
        <button
          type="button"
          className="h-[clamp(1.3rem,1.8055555556vw,2.4375rem)] w-[clamp(1.5rem,2.0833333333vw,2.8125rem)] transform-gpu cursor-pointer border-none bg-transparent transition-transform duration-300 ease-out hover:scale-90"
          onClick={onOpenNav}
          aria-label={t("navOpenMenu")}
          aria-expanded={navOpen}
        >
          <HamburgerIcon /*open={navOpen}*/ />
        </button>
      </div>
    </div>
  );
}
