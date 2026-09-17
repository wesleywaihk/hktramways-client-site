function getUserAgent(): string {
  return typeof navigator !== "undefined" ? navigator.userAgent : "";
}

/** User-agent based platform detection. */
export function useUserAgent() {
  const userAgent = getUserAgent();
  const isAndroid = /android/i.test(userAgent);

  return { isAndroid };
}
