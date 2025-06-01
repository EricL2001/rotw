import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**/**/**',
      },
    ],
  },
  // Compiler optimizations
  compiler: {
    // Remove all console.* calls except console.error
    removeConsole: {
      exclude: ['error'],
    },
  },
  // Note: Consider removing this in production
  typescript: {
    ignoreBuildErrors: true,
  },
  // Redirects configuration
  async redirects() {
    return [
      {
        source: 'https://www.recsonthewall.com/',
        destination: 'https://www.recordsonthewall.co/',
        permanent: true, // 308 status code (permanent redirect)
      },
    ];
  },
};

export default nextConfig;
