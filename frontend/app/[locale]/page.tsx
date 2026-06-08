"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useApiEndpoint } from "@/hooks/useApiEndpoint/";
import type { Landing } from "@/types/api";
import { API_URL } from "@/consts";

export default function LandingPage() {
  const { fetchApi } = useApiEndpoint();
  const [landing, setLanding] = useState<Landing | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi
      .landing()
      .then((res) => setLanding(res.data[0] ?? null))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchApi.landing]);

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

  if (!landing) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-zinc-500">No content available.</p>
      </main>
    );
  }

  const bannerUrl = landing.banner?.url;
  const bannerAlt = landing.banner?.alternativeText ?? "";

  return (
    <main className="flex flex-col flex-1 max-w-3xl mx-auto w-full px-6 py-12 gap-8">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
        {landing.title}
      </h1>

      {bannerUrl && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          <Image
            src={`${API_URL}${bannerUrl}`}
            alt={bannerAlt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      )}

      {landing.contents && (
        <div
          className="prose prose-zinc max-w-none text-zinc-700"
          dangerouslySetInnerHTML={{ __html: landing.contents }}
        />
      )}
    </main>
  );
}
