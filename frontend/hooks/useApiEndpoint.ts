import { useLocale } from "next-intl";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// zh-HK must be sent as zh-Hant-HK to the Strapi API
function toApiLocale(locale: string): string {
  if (locale === "zh-HK") return "zh-Hant-HK";
  return locale;
}

export interface LandingBanner {
  id: number;
  url: string;
  alternativeText: string | null;
}

export interface Landing {
  id: number;
  documentId: string;
  title: string;
  contents: string;
  banner: LandingBanner | null;
}

export interface LandingResponse {
  data: Landing[];
}

export function useApiEndpoint() {
  const locale = useLocale();
  const apiLocale = toApiLocale(locale);

  async function fetchLanding(): Promise<LandingResponse> {
    const res = await fetch(
      `${API_URL}/landings?populate=banner&locale=${apiLocale}`
    );
    if (!res.ok) throw new Error(`Failed to fetch landing: ${res.status}`);
    return res.json();
  }

  return { fetchLanding };
}
