import { useCallback } from "react";
import { useLocale } from "next-intl";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { fetchGlobal, fetchLanding } from "./api";
import type { LandingResponse, GlobalResponse } from "@/types/api";

export type { LandingBanner, Landing, LandingResponse, GlobalFavicon, GlobalSeo, GlobalData, GlobalResponse } from "@/types/api";

export function useApiEndpoint() {
  const locale = useLocale();
  const { previewMode, documentId } = useSelector(
    (state: RootState) => state.preview,
  );

  const fetchApi = {
    landing: useCallback(
      (): Promise<LandingResponse> =>
        fetchLanding(documentId ?? "", previewMode, locale),
      [previewMode, documentId, locale],
    ),

    global: useCallback((): Promise<GlobalResponse> => fetchGlobal(locale), [locale]),
  };

  return { fetchApi };
}
