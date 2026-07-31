import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import I18nProvider from "@/components/I18nProvider";
import MuiThemeProvider from "@/components/MuiThemeProvider";
import { HeaderStyleProvider } from "@/components/HeaderStyleProvider";
import MetaUpdater from "@/components/MetaUpdater";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { generateGlobalMetadata, getGlobalData } from "@/lib/pageMetadata";
import "@/app/globals.scss";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateGlobalMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  let metaTitle = "";
  try {
    const globalRes = await getGlobalData(locale);
    metaTitle = globalRes.data?.seo?.metaTitle ?? "";
  } catch {
    metaTitle = "";
  }

  return (
    <I18nProvider locale={locale}>
      <MuiThemeProvider>
        <HeaderStyleProvider>
          <MetaUpdater metaTitle={metaTitle} />
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
