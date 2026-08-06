"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import MobileNavOverlay from "./MobileNavOverlay";
import HeaderContent from "./HeaderContent";
import { useAtTop } from "./useAtTop";
import { useHeaderStyle } from "./HeaderStyle/HeaderStyleProvider";

export default function Header() {
  const locale = useLocale();
  const [navOpen, setNavOpen] = useState(false);
  const atTop = useAtTop();
  const { headerStyle } = useHeaderStyle();

  return (
    <>
      <header
        className={`fixed top-0 z-[1002] w-full bg-white text-green shadow-md transition-transform duration-300 ease-in-out rounded-bl-[25px] rounded-br-[25px] ${atTop ? "-translate-y-full" : "translate-y-0"}`}
      >
        <HeaderContent
          locale={locale}
          navOpen={navOpen}
          onOpenNav={() => setNavOpen(true)}
          logoSrc="/logo-green.svg"
          logoClassName="min-w-[120.33px] h-9 lg:min-w-[133.7px] lg:h-10"
          alignClassName="items-center"
          paddingClassName="px-5 lg:px-10 py-5 lg:py-5"
        />
      </header>

      <header
        className={`relative w-full bg-green text-white ${headerStyle === "transparent" ? "hidden lg:block" : ""}`}
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
        <header className="absolute top-0 z-[1000] w-full h-[200px] text-white lg:hidden bg-[linear-gradient(180deg,rgba(34,34,34,0.4)_0%,rgba(34,34,34,0)_100%)]">
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

      <MobileNavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
    </>
  );
}
