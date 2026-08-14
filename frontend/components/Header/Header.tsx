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
  const { isLg } = useMediaQuery();

  return (
    <>
      <header
        className={`text-green fixed top-0 z-[1002] w-full rounded-br-[25px] rounded-bl-[25px] bg-white shadow-md transition-transform duration-300 ease-in-out ${atTop ? "-translate-y-full" : "translate-y-0"}`}
      >
        <HeaderContent
          locale={locale}
          navOpen={navOpen}
          onOpenNav={() => setNavOpen(true)}
          logoSrc="/logo-green.svg"
          logoClassName="min-w-[120.33px] h-9 lg:min-w-[133.7px] lg:h-10"
          alignClassName="items-center"
          paddingClassName="px-5 lg:px-10 py-5 lg:py-5"
          invertLangHover
        />
      </header>

      <header
        className={`bg-green relative w-full text-white ${headerStyle === "transparent" ? "hidden lg:block" : ""}`}
      >
        <HeaderContent
          locale={locale}
          navOpen={navOpen}
          onOpenNav={() => setNavOpen(true)}
          logoSrc="/logo-white.svg"
          logoClassName="min-w-[120.33px] h-9 lg:min-w-[133.7px] lg:h-10"
        />
      </header>

      {headerStyle === "transparent" && (
        <header className="absolute top-0 z-[1000] h-[200px] w-full bg-[linear-gradient(180deg,rgba(34,34,34,0.4)_0%,rgba(34,34,34,0)_100%)] text-white lg:hidden">
          <HeaderContent
            locale={locale}
            navOpen={navOpen}
            onOpenNav={() => setNavOpen(true)}
            logoSrc="/logo-v.svg"
            logoClassName="h-[110px]"
            alignClassName="items-start"
          />
        </header>
      )}

      {isLg ? (
        <DesktopNavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
      ) : (
        <MobileNavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
      )}
    </>
  );
}
