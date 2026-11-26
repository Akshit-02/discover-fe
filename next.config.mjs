/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  async redirects() {
    return [
      { source: "/dashboard", destination: "/dashboard/discover", permanent: false },
    ];
  },
};

export default nextConfig;
