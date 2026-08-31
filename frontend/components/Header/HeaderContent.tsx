import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { desktopNavLinks } from "./navLinks";
import LocaleDropdown from "./LocaleDropdown";
import HamburgerIcon from "./HamburgerIcon";

export interface HeaderContentProps {
  locale: string;
  navOpen: boolean;
  onOpenNav: () => void;
  logoSrc: string;
  logoClassName: string;
  alignClassName?: string;
  paddingClassName?: string;
  /** true when this header sits on a white background, so the lang button's hover state must invert to stay visible */
  invertLangHover?: boolean;
}

export default function HeaderContent({
  locale,
  navOpen,
  onOpenNav,
  logoSrc,
  logoClassName,
  alignClassName = "items-center",
  paddingClassName = "p-5 lg:py-[30px] lg:px-10",
  invertLangHover = false,
}: HeaderContentProps) {
  const t = useTranslations("common");
  return (
    <div
      className={`flex ${alignClassName} justify-between ${paddingClassName}`}
    >
      <Link
        href={`/${locale}`}
        className={`mr-5 flex shrink-0 items-center lg:mr-10 ${logoClassName}`}
      >
        <Image
          src={logoSrc}
          alt="HK Tramways"
          width={134}
          height={40}
          priority
          className="h-full w-full"
        />
      </Link>

      <div className="flex items-center gap-4 lg:gap-5">
        <div className="hidden lg:flex lg:items-center lg:gap-[30px]">
          <nav className="flex items-center gap-[30px]">
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
          className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border-2 border-[var(--header-border)] bg-transparent font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] text-[var(--header-fg)] uppercase transition-colors duration-200 ease-out lg:hidden ${
            invertLangHover
              ? "hover:bg-green active:bg-green hover:text-white active:text-white"
              : "hover:text-green active:text-green hover:bg-white active:bg-white"
          }`}
          onClick={onOpenNav}
          aria-label={t("navLanguage")}
        >
          {locale === "en" ? "EN" : locale === "zh-HK" ? "繁" : "简"}
        </button>
        <button
          type="button"
          className="border-none bg-transparent"
          onClick={onOpenNav}
          aria-label={t("navOpenMenu")}
          aria-expanded={navOpen}
        >
          <HamburgerIcon open={navOpen} />
        </button>
      </div>
    </div>
  );
}
