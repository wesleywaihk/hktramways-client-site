import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(import.meta.dirname, "../shared-resources/.env.local") });

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  env: {
    PREVIEW_SECRET: process.env.PREVIEW_SECRET ?? "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
