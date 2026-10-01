import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { fetchAnnouncements, fetchHome } from "@/hooks/useApiEndpoint/api";
import { fetchWithErrorHandling } from "@/hooks/fetchWithErrorHandling";
import {
  generateEntityPageMetadata,
  getEntityStructuredData,
  getPreviewDocumentId,
} from "@/lib/pageMetadata";
import type { AnnouncementsResponse, Home } from "@/types/api";
import StructuredData from "@/components/StructuredData";
import HomeBanner from "./components/HomeBanner";
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

  const [{ data: res, loaded }, { data: announcementsRes }] = await Promise.all(
    [
      fetchWithErrorHandling(() =>
        fetchHome(documentId ?? "", documentId !== null, locale),
      ),
      fetchWithErrorHandling<AnnouncementsResponse>(() =>
        fetchAnnouncements({ limit: 10 }),
      ),
    ],
  );
  const home: Home | null = res?.data[0] ?? null;

  if (!loaded || !home) {
    return <ErrorPage message={t("noContent")} />;
  }

  const announcements = (announcementsRes?.data ?? []).filter((item) =>
    item.title.trim(),
  );

  return (
    <div className="pageWrapper mt-0">
      <StructuredData data={getEntityStructuredData(home, (h) => h.seo)} />
      <HomeBanner
        bannerImage={home.bannerImage}
        hasNewsBar={announcements.length > 0}
      />
      <NewsBar locale={locale} items={announcements} />
      <ArcCarousel locale={locale} documentId={documentId} />
      <TramRoute locale={locale} />
      <PartyTram locale={locale} />
      <TramoramicTour locale={locale} documentId={documentId} />
      <Souvenior locale={locale} documentId={documentId} />
      <DownloadAppArea
        locale={locale}
        endpoint="/api/homes"
        documentId={documentId}
      />
    </div>
  );
}
