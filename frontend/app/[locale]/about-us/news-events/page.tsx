"use client";

import { useFetchAnnouncements } from "@/hooks/useFetchAnnouncements";

// Testing only — dumps the fetched announcements; no UI yet.
export default function NewsEventsPage() {
  const { items, loading, error } = useFetchAnnouncements();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return <pre>{JSON.stringify(items, null, 2)}</pre>;
}
