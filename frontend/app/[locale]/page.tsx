import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { fetchHome } from "@/hooks/useApiEndpoint/api";
import { generatePageMetadata, getPreviewDocumentId } from "@/lib/pageMetadata";
import type { Home } from "@/types/api";
import Banner from "./components/Banner/Banner";
import NewsBar from "./components/NewsBar/NewsBar";
import ArcCarousel from "./components/ArcCarousel/ArcCarousel";
import TramRoute from "./components/TramRoute/TramRoute";
import TramoramicTour from "./components/TramoramicTour/TramoramicTour";
import Souvenior from "./components/Souvenior/Souvenior";
import PartyTram from "./components/PartyTram/PartyTram";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import SetHeaderStyle from "@/components/SetHeaderStyle";

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
    <div className="pageWrapper mt-[-76px] lg:mt-0">
      <SetHeaderStyle style="transparent" />
      <Banner
        bannerImage={home.bannerImage}
        className="!h-[calc(100dvh-52px)] lg:!h-[calc(100dvh-160px)] lg:pt-0"
      />
      <NewsBar items={home.newsBar ?? []} locale={locale} />
      <ArcCarousel data={home.arcCarousel} />
      <TramRoute data={home.tramRoute} />
      <PartyTram />
      <TramoramicTour data={home.tramoramicTour} />
      <Souvenior data={home.souvenior} />
    </div>
  );
}
