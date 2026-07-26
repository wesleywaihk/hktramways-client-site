"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useSelector } from "react-redux";
import { useApiEndpoint } from "@/hooks/useApiEndpoint";
import { IMG_URL } from "@/consts";
import type { RootState } from "@/store";

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
  const pageTitle = useSelector((state: RootState) => state.pageTitle.title);
  const [metaTitle, setMetaTitle] = useState("");

  useEffect(() => {
    fetchApi
      .global()
      .then((res) => {
        const seo = res.data?.seo?.[0];
        const favicon = res.data?.favicon;

        setMetaTitle(seo?.metaTitle ?? "");
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
          link.href = `${IMG_URL}${favicon.url}`;
        }
      })
      .catch(() => null);
  }, [locale, fetchApi]);

  useEffect(() => {
    if (!metaTitle) return;
    document.title = pageTitle ? `${pageTitle} | ${metaTitle}` : metaTitle;
  }, [pageTitle, metaTitle]);

  return null;
}
