import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { fetchHome, fetchPartyTram } from "@/hooks/useApiEndpoint/api";
import { generatePageMetadata, getPreviewDocumentId } from "@/lib/pageMetadata";
import type { Home, PartyTramData } from "@/types/api";
import Banner from "./components/Banner/Banner";
import NewsBar from "./components/NewsBar/NewsBar";
import ArcCarousel from "./components/ArcCarousel/ArcCarousel";
import TramRoute from "./components/TramRoute/TramRoute";
import TramoramicTour from "./components/TramoramicTour/TramoramicTour";
import Souvenior from "./components/Souvenior/Souvenior";
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
  let partyTram: PartyTramData | null = null;

  const [homeResult, partyTramResult] = await Promise.allSettled([
    fetchHome(documentId ?? "", documentId !== null, locale),
    fetchPartyTram(locale),
  ]);

  if (homeResult.status === "fulfilled") {
    home = homeResult.value.data[0] ?? null;
  } else {
    error = (homeResult.reason as Error).message;
  }

  if (error || !home) {
    return <ErrorPage message={t("noContent")} />;
  }

  if (partyTramResult.status === "fulfilled") {
    partyTram = partyTramResult.value.data ?? null;
  }

  return (
    <div className="pageWrapper mt-0">
      {/* <SetHeaderStyle style="transparent" /> */}
      <Banner
        bannerImage={home.bannerImage}
        // isFullScreen false: news bar is rendered, so header + banner + newsBar = 100dvh
        // isFullScreen true: no news bar, so header + banner = 100dvh
        isFullScreen={!home.newsBar.length}
      />
      <NewsBar items={home.newsBar} />
      <ArcCarousel data={home.arcCarousel} />
      <TramRoute data={home.tramRoute} />
      <PartyTram data={partyTram} />
      <TramoramicTour data={home.tramoramicTour} />
      <Souvenior data={home.souvenior} />
    </div>
  );
}
