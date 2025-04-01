import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'docs',
  basePath: '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if your project has type errors.
    ignoreBuildErrors: true,
  },

  env: {
    siteTitle: 'Tim Russell',
    siteDescription: "Tim Russell's Personal Website",
    siteUrl: 'https://timdpr.com',
  },
};

export default nextConfig;
