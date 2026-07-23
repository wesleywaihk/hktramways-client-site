import type { Metadata } from "next";
import { cookies, draftMode } from "next/headers";
import { getTranslations } from "next-intl/server";
import { fetchGlobal, fetchHome } from "@/hooks/useApiEndpoint/api";
import type { Home } from "@/types/api";
import Banner from "./components/Banner/Banner";
import NewsBar from "./components/NewsBar/NewsBar";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import SetHeaderStyle from "@/components/SetHeaderStyle";

interface LandingPageProps {
  params: Promise<{ locale: string }>;
}

async function getPreviewDocumentId() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (await cookies()).get("preview-documentId")?.value ?? null;
}

export async function generateMetadata({
  params,
}: LandingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const documentId = await getPreviewDocumentId();

  try {
    const [homeRes, globalRes] = await Promise.all([
      fetchHome(documentId ?? "", documentId !== null, locale),
      fetchGlobal(locale, { cache: "force-cache" }),
    ]);
    const home = homeRes.data[0] ?? null;
    const metaTitle = globalRes.data?.seo?.[0]?.metaTitle;

    return {
      title: home?.Title && metaTitle ? `${home.Title} | ${metaTitle}` : metaTitle,
    };
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
      <NewsBar items={home.newsBar ?? []} />
    </div>
  );
}
