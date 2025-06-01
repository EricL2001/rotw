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
  
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
