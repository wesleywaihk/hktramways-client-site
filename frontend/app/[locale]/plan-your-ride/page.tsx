import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { fetchPlanYourRide } from "@/hooks/useApiEndpoint/api";
import { fetchWithErrorHandling } from "@/hooks/fetchWithErrorHandling";
import { generateEntityPageMetadata } from "@/lib/pageMetadata";
import Hero from "./components/Hero/Hero";
import Schedule from "./components/Schedule/Schedule";
import TramRoute from "@/components/TramRoute/TramRoute";
import DownloadAppArea from "@/components/DownloadAppArea/DownloadAppArea";
import InteractiveRouteMap from "@/components/InteractiveRouteMap/InteractiveRouteMap";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import ServiceUpdates from "../components/ServiceUpdates/ServiceUpdates";
import type { PlanYourRideResponse } from "@/types/api";

interface PlanYourRidePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PlanYourRidePageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateEntityPageMetadata<PlanYourRideResponse["data"][number]>(
    locale,
    fetchPlanYourRide,
    (entity) => entity.title,
  );
}

export default async function PlanYourRidePage({
  params,
}: PlanYourRidePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  const { data: planYourRide, loaded } =
    await fetchWithErrorHandling<PlanYourRideResponse>(() =>
      fetchPlanYourRide(locale),
    );

  const heroData = planYourRide?.data?.[0] ?? null;

  if (!loaded || !heroData) {
    return <ErrorPage message={t("noContent")} />;
  }

  return (
    <div className="pageWrapper mt-0">
      <Hero
        title={heroData.title}
        desc={heroData.desc}
        actionButton={heroData.actionButton}
        bannerImage={heroData.bannerImage}
      />
      <ServiceUpdates locale={locale} type="news" limit={3} />
      <TramRoute locale={locale} />
      <Schedule locale={locale} />
      <InteractiveRouteMap locale={locale} />
      <DownloadAppArea locale={locale} source="planYourRide" />
    </div>
  );
}
