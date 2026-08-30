import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { fetchHome, fetchAnnouncements } from "@/hooks/useApiEndpoint/api";
import { fetchWithErrorHandling } from "@/hooks/fetchWithErrorHandling";
import {
  generateEntityPageMetadata,
  getPreviewDocumentId,
} from "@/lib/pageMetadata";
import type { Home, AnnouncementItemsResponse } from "@/types/api";
import Banner from "@/components/Banner/Banner";
import NewsBar from "./components/NewsBar/NewsBar";
import ArcCarousel from "./components/ArcCarousel/ArcCarousel";
import TramRoute from "@/components/TramRoute/TramRoute";
import TramoramicTour from "./components/TramoramicTour/TramoramicTour";
import Souvenior from "./components/Souvenior/Souvenior";
import DownloadAppArea from "@/components/DownloadAppArea/DownloadAppArea";
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

  return generateEntityPageMetadata<Home>(
    locale,
    (locale) => fetchHome(documentId ?? "", documentId !== null, locale),
    (entity) => entity.Title,
    (entity) => entity.seo,
  );
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  const documentId = await getPreviewDocumentId();

  const [{ data: res, loaded }, announcementsRes] = await Promise.all([
    fetchWithErrorHandling(() =>
      fetchHome(documentId ?? "", documentId !== null, locale),
    ),
    fetchWithErrorHandling<AnnouncementItemsResponse>(() =>
      fetchAnnouncements(),
    ),
  ]);
  const home: Home | null = res?.data[0] ?? null;
  const newsItems = announcementsRes.data?.data ?? [];

  if (!loaded || !home) {
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
          newsItems.length
            ? "h-[calc(100dvh-128px)] lg:h-[calc(100dvh-160px)]"
            : "h-[calc(100dvh-76px)] lg:h-[calc(100dvh-100px)]"
        }
      />
      <NewsBar items={newsItems} locale={locale} />
      <ArcCarousel locale={locale} documentId={documentId} />
      <TramRoute locale={locale} />
      <PartyTram locale={locale} />
      <TramoramicTour locale={locale} documentId={documentId} />
      <Souvenior locale={locale} documentId={documentId} />
      <DownloadAppArea locale={locale} source="home" documentId={documentId} />
    </div>
  );
}
