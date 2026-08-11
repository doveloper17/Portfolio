import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const configuredBasePath = process.env.GITHUB_PAGES_BASE_PATH ?? "/Portfolio";
const basePath = configuredBasePath === "/" ? "" : configuredBasePath.replace(/\/$/, "");

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  images: { unoptimized: true },
};

export default nextConfig;
