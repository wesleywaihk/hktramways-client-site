interface FetchResult<T> {
  data: T | null;
  error: string | null;
}

export async function fetchWithErrorHandling<T>(
  fetcher: () => Promise<T>,
): Promise<FetchResult<T>> {
  try {
    const data = await fetcher();
    return { data, error: null };
  } catch (e) {
    return { data: null, error: (e as Error).message };
  }
}
