/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      allowFutureImage: true,
      unoptimized: true,
    },
  },
  images: {
    domains: ['via.placeholder.com'],
  },
};

module.exports = nextConfig;
