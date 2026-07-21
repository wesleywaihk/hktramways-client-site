"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

export const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  "zh-HK": "繁",
  "zh-CN": "简",
};

export function useLocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: string) {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || "/");
  }

  return { locale, locales: routing.locales, switchLocale };
}
