"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import MobileNavOverlay from "./MobileNavOverlay";
import DesktopNavOverlay from "./DesktopNavOverlay";
import HeaderContent from "./HeaderContent";
import { useAtTop } from "./useAtTop";
import { useHeaderStyle } from "./HeaderStyle/HeaderStyleProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Header() {
  const locale = useLocale();
  const [navOpen, setNavOpen] = useState(false);
  const atTop = useAtTop();
  const { headerStyle } = useHeaderStyle();
  const { isLg, isXl, isXxl } = useMediaQuery();
  const isDesktop = isLg || isXl || isXxl;

  return (
    <>
      <header
        className={`text-green fixed top-0 z-[1002] w-full bg-white shadow-[0_3px_20px_0_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out lg:rounded-br-[clamp(1.5rem,2.0833333333vw,2.8125rem)] lg:rounded-bl-[clamp(1.5rem,2.0833333333vw,2.8125rem)] ${atTop ? "-translate-y-[102%]" : "translate-y-0"}`}
      >
        <HeaderContent
          locale={locale}
          navOpen={navOpen}
          onOpenNav={() => setNavOpen(true)}
          logoSrc="/logo-green.svg"
          // alignClassName="items-center"
          invertLangHover
        />
      </header>

      <header
        className={`bg-green flex h-[76px] w-full items-center text-white lg:h-[100px]! ${headerStyle === "transparent" ? "hidden lg:block" : ""}`}
      >
        <HeaderContent
          locale={locale}
          navOpen={navOpen}
          onOpenNav={() => setNavOpen(true)}
          logoSrc="/logo-white.svg"
          className="py-0!"
        />
      </header>

      {headerStyle === "transparent" && (
        <header className="absolute top-0 z-[1000] h-[200px] w-full bg-[linear-gradient(180deg,rgba(34,34,34,0.4)_0%,rgba(34,34,34,0)_100%)] text-white lg:hidden">
          <HeaderContent
            locale={locale}
            navOpen={navOpen}
            onOpenNav={() => setNavOpen(true)}
            logoSrc="/logo-v.svg"
            // logoClassName="h-[110px]"
            className="items-start"
          />
        </header>
      )}

      {isDesktop ? (
        <DesktopNavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
      ) : (
        <MobileNavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
      )}
    </>
  );
}
