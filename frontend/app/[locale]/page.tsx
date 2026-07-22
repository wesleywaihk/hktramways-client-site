"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useApiEndpoint } from "@/hooks/useApiEndpoint/";
import type { Home } from "@/types/api";
import { API_URL } from "@/consts";

export default function LandingPage() {
  const { fetchApi } = useApiEndpoint();
  const [home, setHome] = useState<Home | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi
      .home()
      .then((res) => setHome(res.data[0] ?? null))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchApi.home]);

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

      {bannerDUrl && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden hidden md:block">
          <Image
            src={`${API_URL}${bannerDUrl}`}
            alt={bannerDAlt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      )}

      {bannerMUrl && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden md:hidden">
          <Image
            src={`${API_URL}${bannerMUrl}`}
            alt={bannerMAlt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      )}
    </main>
  );
}
