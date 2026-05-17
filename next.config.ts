import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/randompick",
  trailingSlash: true,
};

export default nextConfig;
