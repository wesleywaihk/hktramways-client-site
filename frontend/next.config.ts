import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(import.meta.dirname, "../shared-resources/.env.local"),
});

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  trailingSlash: true,
  env: {
    PREVIEW_SECRET: process.env.PREVIEW_SECRET ?? "",
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Dev-only. With the debug channel on, Next 16.2 reloads the page whenever
    // the navigation entry's transferSize is 0 (its "served from cache" check).
    // Firefox reports 0 while the document is still streaming, so every page
    // reloaded forever in Firefox during `next dev`.
    reactDebugChannel: false,
  },
};

export default withNextIntl(nextConfig);
