/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.nike.qa',
        pathname: '/dw/image/v2/BDVB_PRD/**',
      },
    ],
  },
};

module.exports = nextConfig;
