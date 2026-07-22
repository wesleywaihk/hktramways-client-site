"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useApiEndpoint } from "@/hooks/useApiEndpoint/";
import type { Home } from "@/types/api";
import { API_URL } from "@/consts";
import { setPageTitle } from "@/store/pageTitleSlice";
import { useHeaderStyle } from "@/components/HeaderStyleProvider";

export default function LandingPage() {
  const { fetchApi } = useApiEndpoint();
  const dispatch = useDispatch();
  const { setHeaderStyle } = useHeaderStyle();
  const [home, setHome] = useState<Home | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi
      .home()
      .then((res) => {
        const homeData = res.data[0] ?? null;
        setHome(homeData);
        dispatch(setPageTitle(homeData?.Title ?? ""));
        setHeaderStyle(homeData?.headerStyle?.headerStyle ?? "default");
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchApi.home]);

  useEffect(() => {
    return () => {
      dispatch(setPageTitle(""));
      setHeaderStyle("default");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <section className="flex flex-1 items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-1 items-center justify-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  if (!home) {
    return (
      <section className="flex flex-1 items-center justify-center">
        <p className="text-zinc-500">No content available.</p>
      </section>
    );
  }

  const bannerDUrl = home.bannerImage?.bannerD?.url;
  const bannerDAlt = home.bannerImage?.bannerD?.alternativeText ?? "";
  const bannerMUrl = home.bannerImage?.bannerM?.url;
  const bannerMAlt = home.bannerImage?.bannerM?.alternativeText ?? "";

  return (
    <section className="flex flex-col flex-1 mx-auto w-full p-0 lg:px-6 lg:pb-12 gap-8 bg-green mt-[-76px] lg:mt-0">
      {(bannerDUrl || bannerMUrl) && (
        <div className="relative w-full h-[calc(100dvh-52px)] lg:h-[calc(100dvh-160px)] rounded-none lg:rounded-[30px] overflow-hidden">
          <picture>
            {bannerDUrl && (
              <source
                media="(min-width: 1024px)"
                srcSet={`${API_URL}${bannerDUrl}`}
              />
            )}
            <img
              src={`${API_URL}${bannerMUrl ?? bannerDUrl}`}
              alt={bannerMAlt || bannerDAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </picture>
        </div>
      )}
    </section>
  );
}
