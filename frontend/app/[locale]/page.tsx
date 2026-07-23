"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { useApiEndpoint } from "@/hooks/useApiEndpoint/";
import type { Home } from "@/types/api";
import { setPageTitle } from "@/store/pageTitleSlice";
import { useHeaderStyleOnMount } from "@/hooks/useHeaderStyleOnMount";
import Banner from "@/components/Banner/Banner";
import NewsBar from "@/components/NewsBar/NewsBar";
import Loading from "@/components/Loading/Loading";
import ErrorPage from "@/components/ErrorPage/ErrorPage";

export default function LandingPage() {
  const { fetchApi } = useApiEndpoint();
  const dispatch = useDispatch();
  const t = useTranslations("common");
  const [home, setHome] = useState<Home | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useHeaderStyleOnMount("transparent");

  useEffect(() => {
    fetchApi
      .home()
      .then((res) => {
        const homeData = res.data[0] ?? null;
        setHome(homeData);
        dispatch(setPageTitle(homeData?.Title ?? ""));
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchApi.home]);

  useEffect(() => {
    return () => {
      dispatch(setPageTitle(""));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error || !home) {
    return <ErrorPage message={t("noContent")} />;
  }

  return (
    <div className="pageWrapper mt-[-76px] lg:mt-0">
      <Banner
        srcD={home.bannerImage?.bannerD?.url}
        srcM={home.bannerImage?.bannerM?.url}
        alt={home.bannerImage?.altText}
        className="!h-[calc(100dvh-52px)] lg:!h-[calc(100dvh-160px)] lg:pt-0"
      />
      <NewsBar />
    </div>
  );
}
