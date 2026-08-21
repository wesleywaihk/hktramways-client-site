interface FetchResult<T> {
  data: T | null;
  error: string | null;
  loaded: boolean;
}

export async function fetchWithErrorHandling<T>(
  fetcher: () => Promise<T>,
): Promise<FetchResult<T>> {
  try {
    const data = await fetcher();
    return { data, error: null, loaded: true };
  } catch (e) {
    return { data: null, error: (e as Error).message, loaded: true };
  }
}
