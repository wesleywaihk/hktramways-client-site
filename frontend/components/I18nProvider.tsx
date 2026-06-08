"use client";

import { NextIntlClientProvider } from "next-intl";
import en from "../messages/en.json";
import zhHK from "../messages/zh-HK.json";
import zhCN from "../messages/zh-CN.json";

const messages: Record<string, Record<string, unknown>> = {
  en,
  "zh-HK": zhHK,
  "zh-CN": zhCN,
};

export default function I18nProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale] ?? en}>
      {children}
    </NextIntlClientProvider>
  );
}
