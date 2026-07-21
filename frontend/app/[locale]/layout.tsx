import { use } from "react";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import I18nProvider from "@/components/I18nProvider";
import MuiThemeProvider from "@/components/MuiThemeProvider";
import MetaUpdater from "@/components/MetaUpdater";
import Header from "@/components/Header/Header";
import "@/app/globals.scss";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  return (
    <I18nProvider locale={locale}>
      <MuiThemeProvider>
        <MetaUpdater />
        <Header />
        {children}
      </MuiThemeProvider>
    </I18nProvider>
  );
}
