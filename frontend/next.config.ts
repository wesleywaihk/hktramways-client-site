import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(import.meta.dirname, "../shared-resources/.env.local") });

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  trailingSlash: true,
  env: {
    PREVIEW_SECRET: process.env.PREVIEW_SECRET ?? "",
  },
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
