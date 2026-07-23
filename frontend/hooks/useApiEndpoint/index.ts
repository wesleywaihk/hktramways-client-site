import { useCallback } from "react";
import { useLocale } from "next-intl";
import { fetchGlobal } from "./api";
import type { GlobalResponse } from "@/types/api";

export function useApiEndpoint() {
  const locale = useLocale();

  const fetchApi = {
    global: useCallback((): Promise<GlobalResponse> => fetchGlobal(locale), [locale]),
  };

  return { fetchApi };
}
