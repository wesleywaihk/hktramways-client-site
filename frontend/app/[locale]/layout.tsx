import { use } from "react";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import I18nProvider from "@/components/I18nProvider";
import MuiThemeProvider from "@/components/MuiThemeProvider";
import { HeaderStyleProvider } from "@/components/HeaderStyleProvider";
import MetaUpdater from "@/components/MetaUpdater";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
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
        <HeaderStyleProvider>
          <MetaUpdater />
          <Header />
          <main className="flex flex-col min-h-[calc(100dvh-76px)] lg:min-h-[calc(100dvh-100px)]">
            {children}
          </main>
          <Footer />
        </HeaderStyleProvider>
      </MuiThemeProvider>
    </I18nProvider>
  );
}
