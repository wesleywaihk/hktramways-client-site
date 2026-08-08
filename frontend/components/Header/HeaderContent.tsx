import Image from "next/image";
import Link from "next/link";
import { desktopNavLinks } from "./navLinks";
import LocaleDropdown from "./LocaleDropdown";

export interface HeaderContentProps {
  locale: string;
  navOpen: boolean;
  onOpenNav: () => void;
  logoSrc: string;
  logoClassName: string;
  alignClassName?: string;
  paddingClassName?: string;
}

export default function HeaderContent({
  locale,
  navOpen,
  onOpenNav,
  logoSrc,
  logoClassName,
  alignClassName = "items-center",
  paddingClassName = "p-5 lg:py-[30px] lg:px-10",
}: HeaderContentProps) {
  return (
    <div
      className={`flex ${alignClassName} justify-between ${paddingClassName}`}
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
              className="group relative font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] uppercase whitespace-nowrap text-[var(--header-fg)]"
            >
              {link.label}
              <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-right scale-x-0 bg-current/30 transition-transform duration-300 ease-out transform-gpu group-hover:origin-left group-hover:scale-x-100" />
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
          onClick={onOpenNav}
          aria-label="Language"
        >
          {locale === "en" ? "EN" : locale === "zh-HK" ? "繁" : "简"}
        </button>
        <button
          type="button"
          className="flex flex-col justify-center items-center gap-2 w-[22px] h-9 bg-transparent border-none"
          onClick={onOpenNav}
          aria-label="Open menu"
          aria-expanded={navOpen}
        >
          <span className="block w-full h-0.5 bg-current" />
          <span className="block w-full h-0.5 bg-current" />
          <span className="block w-full h-0.5 bg-current" />
        </button>
      </div>
    </div>
  );
}
