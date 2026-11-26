/** @type {import('next').NextConfig} */
const NOINDEX = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  async headers() {
    return [
      { source: "/dashboard/:path*", headers: NOINDEX },
      { source: "/dashboard", headers: NOINDEX },
      { source: "/login", headers: NOINDEX },
      { source: "/forgot-password", headers: NOINDEX },
    ];
  },
  async redirects() {
    return [
      { source: "/dashboard", destination: "/dashboard/discover", permanent: false },
    ];
  },
};

export default nextConfig;
