import { fetchLatestAnnouncement } from "@/hooks/useApiEndpoint/api";
import { fetchWithErrorHandling } from "@/hooks/fetchWithErrorHandling";
import AnnouncementList from "@/components/AnnouncementList/AnnouncementList";

interface NewsEventsPageProps {
  params: Promise<{ locale: string }>;
}

// Testing only — dumps the data; no UI yet. `latest` is for the banner and is
// left out of the list.
export default async function NewsEventsPage({ params }: NewsEventsPageProps) {
  const { locale } = await params;
  const { data: latest } = await fetchWithErrorHandling(() =>
    fetchLatestAnnouncement(locale),
  );

  return (
    <>
      <pre>{JSON.stringify(latest, null, 2)}</pre>
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      <AnnouncementList locale={locale} excludeId={latest?.id ?? null} />
    </>
  );
}
