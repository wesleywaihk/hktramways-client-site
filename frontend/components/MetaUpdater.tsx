"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useApiEndpoint } from "@/hooks/useApiEndpoint";
import { API_URL } from "@/consts";

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

export default function MetaUpdater() {
  const locale = useLocale();
  const { fetchApi } = useApiEndpoint();

  useEffect(() => {
    fetchApi
      .global()
      .then((res) => {
        const seo = res.data?.seo?.[0];
        const favicon = res.data?.favicon;

        if (seo?.metaTitle) {
          document.title = seo.metaTitle;
        }

        setMeta("description", seo?.metaDescription ?? "");
        setMeta("keywords", seo?.keywords ?? "");

        if (favicon?.url) {
          let link =
            document.querySelector<HTMLLinkElement>("link[rel='icon']");
          if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
          }
          link.href = `${API_URL}${favicon.url}`;
        }
      })
      .catch(() => null);
  }, [locale, fetchApi]);

  return null;
}
