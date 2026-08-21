import { getTranslations } from "next-intl/server";
import { fetchPlanYourRide } from "@/hooks/useApiEndpoint/api";
import { fetchWithErrorHandling } from "@/hooks/fetchWithErrorHandling";
import Hero from "./components/Hero/Hero";
import Schedule from "./components/Schedule/Schedule";
import TramRoute from "@/components/TramRoute/TramRoute";
import DownloadAppArea from "@/components/DownloadAppArea/DownloadAppArea";
import InteractiveRouteMap from "@/components/InteractiveRouteMap/InteractiveRouteMap";
import Loading from "@/components/Loading/Loading";
import ErrorPage from "@/components/ErrorPage/ErrorPage";

interface PlanYourRidePageProps {
  params: Promise<{ locale: string }>;
}

export default async function PlanYourRidePage({
  params,
}: PlanYourRidePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  const { data: planYourRide, error } = await fetchWithErrorHandling(() =>
    fetchPlanYourRide(locale),
  );

  if (error) {
    return <ErrorPage message={t("noContent")} />;
  }

  const heroData = planYourRide?.data?.[0];

  if (!heroData) {
    return (
      <div className="pageWrapper mt-0">
        <Loading />
      </div>
    );
  }

  return (
    <div className="pageWrapper mt-0">
      <Hero
        title={heroData.title}
        desc={heroData.desc}
        actionButton={heroData.actionButton}
        bannerImage={heroData.bannerImage}
      />
      <TramRoute locale={locale} />
      <Schedule locale={locale} />
      <InteractiveRouteMap locale={locale} />
      <DownloadAppArea locale={locale} source="planYourRide" />
    </div>
  );
}
