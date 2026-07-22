"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useApiEndpoint } from "@/hooks/useApiEndpoint/";
import type { Home } from "@/types/api";
import { API_URL } from "@/consts";
import { setPageTitle } from "@/store/pageTitleSlice";

export default function LandingPage() {
  const { fetchApi } = useApiEndpoint();
  const dispatch = useDispatch();
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
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  if (!home) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-zinc-500">No content available.</p>
      </main>
    );
  }

  const bannerDUrl = home.bannerImage?.bannerD?.url;
  const bannerDAlt = home.bannerImage?.bannerD?.alternativeText ?? "";
  const bannerMUrl = home.bannerImage?.bannerM?.url;
  const bannerMAlt = home.bannerImage?.bannerM?.alternativeText ?? "";

  return (
    <main className="flex flex-col flex-1 max-w-3xl mx-auto w-full px-6 py-12 gap-8">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
        {home.Title}
      </h1>

      {(bannerDUrl || bannerMUrl) && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          <picture>
            {bannerDUrl && (
              <source media="(min-width: 768px)" srcSet={`${API_URL}${bannerDUrl}`} />
            )}
            <img
              src={`${API_URL}${bannerMUrl ?? bannerDUrl}`}
              alt={bannerMAlt || bannerDAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </picture>
        </div>
      )}
    </main>
  );
}
