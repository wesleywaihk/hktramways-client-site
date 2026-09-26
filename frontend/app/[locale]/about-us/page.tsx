import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { fetchAboutUs } from "@/hooks/useApiEndpoint/api";
import { fetchWithErrorHandling } from "@/hooks/fetchWithErrorHandling";
import {
  generateEntityPageMetadata,
  getEntityStructuredData,
} from "@/lib/pageMetadata";
import StructuredData from "@/components/StructuredData";
import Hero from "@/components/Hero/Hero";
import DownloadAppArea from "@/components/DownloadAppArea/DownloadAppArea";
import StoryOfHkt from "@/components/InteractiveRouteMap/InteractiveRouteMap";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import LatestNews from "@/components/LatestNews/LatestNews";
import AboutDetails from "./components/AboutDetails/AboutDetails";
import type { AboutUsResponse } from "@/types/api";

interface AboutUsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutUsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateEntityPageMetadata<AboutUsResponse["data"][number]>(
    locale,
    fetchAboutUs,
    (entity) => entity.title,
    (entity) => entity.seo,
  );
}

export default async function AboutUsPage({ params }: AboutUsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  const { data: aboutUs, loaded } =
    await fetchWithErrorHandling<AboutUsResponse>(() => fetchAboutUs(locale));

  const heroData = aboutUs?.data?.[0] ?? null;

  if (!loaded || !heroData) {
    return <ErrorPage message={t("noContent")} />;
  }

  return (
    <div className="pageWrapper mt-0">
      <StructuredData data={getEntityStructuredData(heroData, (h) => h.seo)} />
      <Hero
        title={heroData.title}
        desc={heroData.desc}
        actionButton={heroData.actionButton}
        bannerImage={heroData.bannerImage}
      />
      <AboutDetails locale={locale} />
      <StoryOfHkt
        locale={locale}
        endpoint="/api/about-uses"
        field="storyOfHKT"
      />
      <LatestNews locale={locale} endpoint="/api/about-uses" limit={3} />
      <DownloadAppArea
        locale={locale}
        endpoint="/api/about-uses"
        className="pt-[60px]"
      />
    </div>
  );
}
