import { useCallback } from "react";
import { useLocale } from "next-intl";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { fetchGlobal, fetchHome } from "./api";
import type { GlobalResponse, HomeResponse } from "@/types/api";

export type { GlobalFavicon, GlobalSeo, GlobalData, GlobalResponse, HomeBanner, Home, HomeResponse } from "@/types/api";

export function useApiEndpoint() {
  const locale = useLocale();
  const { previewMode, documentId } = useSelector(
    (state: RootState) => state.preview,
  );

  const fetchApi = {
    home: useCallback(
      (): Promise<HomeResponse> =>
        fetchHome(documentId ?? "", previewMode, locale),
      [previewMode, documentId, locale],
    ),

    global: useCallback((): Promise<GlobalResponse> => fetchGlobal(locale), [locale]),
  };

  return { fetchApi };
}
