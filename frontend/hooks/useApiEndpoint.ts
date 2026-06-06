import { useCallback } from "react";
import { useLocale } from "next-intl";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  const { previewMode, documentId } = useSelector((state: RootState) => state.preview);

  const fetchLanding = useCallback(async (): Promise<LandingResponse> => {
    if (previewMode) {
      const res = await fetch(`${API_URL}/landings/${documentId}?status=draft&populate=banner`);
      if (!res.ok) throw new Error(`Failed to fetch landing: ${res.status}`);
      const json: { data: Landing } = await res.json();
      return { data: [json.data] };
    }
    const res = await fetch(`${API_URL}/landings?populate=banner&locale=${locale}`);
    if (!res.ok) throw new Error(`Failed to fetch landing: ${res.status}`);
    return res.json();
  }, [previewMode, documentId, locale]);

  return { fetchLanding };
}
