"use client";

import { useParams } from "next/navigation";
import { useFetchAnnouncement } from "@/hooks/useFetchAnnouncement";

// Testing only — dumps the fetched announcement; no UI yet.
export default function NewsEventDetailPage() {
  const { slug, locale } = useParams<{ slug: string; locale: string }>();
  const { item, loading, error } = useFetchAnnouncement(
    decodeURIComponent(slug),
    locale,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!item) return <p>Not found</p>;

  return <pre>{JSON.stringify(item, null, 2)}</pre>;
}
