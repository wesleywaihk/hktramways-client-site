import { getGlobalData } from "@/lib/pageMetadata";
import InteractiveMap from "./InteractiveMap";
import type { AppStoreLinks } from "./components/NextTramDialog/NextTramDialog";

interface InteractiveMapPageProps {
  params: Promise<{ locale: string }>;
}

export default async function InteractiveMapPage({
  params,
}: InteractiveMapPageProps) {
  const { locale } = await params;

  // App store links live on Global's footer; the layout's fetch is memoized, so this reuses it.
  let appStoreLinks: AppStoreLinks = {
    appStoreLink: null,
    googlePlayLink: null,
  };
  try {
    const footer = (await getGlobalData(locale)).data?.footer;
    appStoreLinks = {
      appStoreLink: footer?.appStoreLink ?? null,
      googlePlayLink: footer?.googlePlayLink ?? null,
    };
  } catch {
    // Dialog just omits the store badges
  }

  return <InteractiveMap locale={locale} appStoreLinks={appStoreLinks} />;
}
