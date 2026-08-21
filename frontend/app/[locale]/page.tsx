import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { fetchHome } from "@/hooks/useApiEndpoint/api";
import { generatePageMetadata, getPreviewDocumentId } from "@/lib/pageMetadata";
import type { Home } from "@/types/api";
import Banner from "@/components/Banner/Banner";
import NewsBar from "./components/NewsBar/NewsBar";
import ArcCarousel from "./components/ArcCarousel/ArcCarousel";
import TramRoute from "@/components/TramRoute/TramRoute";
import TramoramicTour from "./components/TramoramicTour/TramoramicTour";
import Souvenior from "./components/Souvenior/Souvenior";
import DownloadAppArea from "./components/DownloadAppArea/DownloadAppArea";
import PartyTram from "@/components/PartyTram/PartyTram";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
// import SetHeaderStyle from "@/components/Header/HeaderStyle/SetHeaderStyle";

interface LandingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LandingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const documentId = await getPreviewDocumentId();

  try {
    const res = await fetchHome(documentId ?? "", documentId !== null, locale);
    const home = res.data[0] ?? null;
    return generatePageMetadata(locale, home?.Title);
  } catch {
    return {};
  }
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  const documentId = await getPreviewDocumentId();

  let home: Home | null = null;
  let error: string | null = null;

  try {
    const res = await fetchHome(documentId ?? "", documentId !== null, locale);
    home = res.data[0] ?? null;
  } catch (e) {
    error = (e as Error).message;
  }

  if (error || !home) {
    return <ErrorPage message={t("noContent")} />;
  }

  return (
    <div className="pageWrapper mt-0">
      {/* <SetHeaderStyle style="transparent" /> */}
      <Banner
        bannerImage={home.bannerImage}
        // newsBar rendered: header + banner + newsBar = 100dvh
        // no newsBar: header + banner = 100dvh
        className={
          home.newsBar.length
            ? "h-[calc(100dvh-128px)] lg:h-[calc(100dvh-160px)]"
            : "h-[calc(100dvh-76px)] lg:h-[calc(100dvh-100px)]"
        }
      />
      <NewsBar items={home.newsBar} />
      <ArcCarousel locale={locale} />
      <TramRoute locale={locale} />
      <PartyTram locale={locale} />
      <TramoramicTour locale={locale} />
      <Souvenior locale={locale} />
      <DownloadAppArea locale={locale} />
    </div>
  );
}
